package com.conectin.service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conectin.erro.ValidacaoException;
import com.conectin.model.AreaAtuacao;
import com.conectin.model.VagaRequest;
import com.conectin.model.VagaResumo;
import com.conectin.repository.AreaRepository;
import com.conectin.repository.VagaRepository;

/**
 * Regras de negócio da publicação e da consulta de vagas (RF03, RF04).
 * As regras ficam aqui, e não na tela, para valerem para qualquer entrada.
 */
@Service
public class VagaService {

    private static final Set<String> TIPOS = Set.of("emprego", "estagio", "projeto_academico");
    private static final Set<String> MODALIDADES = Set.of("presencial", "remoto", "hibrido");
    private static final int TAMANHO_MAXIMO_TITULO = 150;

    private final VagaRepository vagaRepository;
    private final AreaRepository areaRepository;
    private final int idEmpregadorTeste;

    public VagaService(VagaRepository vagaRepository,
                       AreaRepository areaRepository,
                       @Value("${conectin.empregador-teste-id:1}") int idEmpregadorTeste) {
        this.vagaRepository = vagaRepository;
        this.areaRepository = areaRepository;
        this.idEmpregadorTeste = idEmpregadorTeste;
    }

    /**
     * Publica uma vaga. Toda a validação acontece antes de gravar qualquer coisa, e a gravação da vaga
     * e das suas áreas é uma única transação: uma vaga recusada nunca fica no banco.
     */
    @Transactional
    public int publicar(VagaRequest pedido) {
        Map<String, String> erros = new LinkedHashMap<>();
        LocalDate prazo = validar(pedido, erros);
        if (!erros.isEmpty()) {
            throw new ValidacaoException(erros);
        }

        // Sem login (previsto para 06/11), a vaga é publicada pelo empregador de teste.
        if (!vagaRepository.empregadorExiste(idEmpregadorTeste)) {
            throw new IllegalStateException(
                    "O empregador de teste não existe no banco. Rode banco-de-dados/dados-teste.sql.");
        }

        int idVaga = vagaRepository.inserirVaga(
                idEmpregadorTeste,
                pedido.titulo().trim(),
                pedido.descricao().trim(),
                textoOuNulo(pedido.requisitos()),
                pedido.tipo(),
                pedido.modalidade(),
                prazo);

        for (Integer idArea : new LinkedHashSet<>(pedido.areas())) {
            vagaRepository.ligarArea(idVaga, idArea);
        }
        return idVaga;
    }

    /** Vagas abertas, com filtros opcionais por tipo, modalidade e área (RF04). */
    public List<VagaResumo> listarAbertas(String tipo, String modalidade, Integer idArea) {
        return vagaRepository.listarAbertas(textoOuNulo(tipo), textoOuNulo(modalidade), idArea);
    }

    public List<AreaAtuacao> listarAreas() {
        return areaRepository.listar();
    }

    /** Preenche "erros" com uma mensagem por campo inválido e devolve o prazo já convertido. */
    private LocalDate validar(VagaRequest pedido, Map<String, String> erros) {
        if (pedido == null) {
            erros.put("titulo", "O título é obrigatório.");
            erros.put("descricao", "A descrição é obrigatória.");
            erros.put("prazoInscricao", "O prazo de inscrição é obrigatório.");
            erros.put("areas", "Escolha pelo menos uma área de atuação.");
            return null;
        }

        if (vazio(pedido.titulo())) {
            erros.put("titulo", "O título é obrigatório.");
        } else if (pedido.titulo().trim().length() > TAMANHO_MAXIMO_TITULO) {
            erros.put("titulo", "O título pode ter no máximo " + TAMANHO_MAXIMO_TITULO + " caracteres.");
        }

        if (vazio(pedido.descricao())) {
            erros.put("descricao", "A descrição é obrigatória.");
        }

        if (pedido.tipo() == null || !TIPOS.contains(pedido.tipo())) {
            erros.put("tipo", "Escolha o tipo da vaga.");
        }

        if (pedido.modalidade() == null || !MODALIDADES.contains(pedido.modalidade())) {
            erros.put("modalidade", "Escolha a modalidade da vaga.");
        }

        // RN01: uma vaga não pode ser publicada sem data de encerramento das inscrições.
        LocalDate prazo = null;
        if (vazio(pedido.prazoInscricao())) {
            erros.put("prazoInscricao", "O prazo de inscrição é obrigatório.");
        } else {
            try {
                prazo = LocalDate.parse(pedido.prazoInscricao().trim());
                if (prazo.isBefore(LocalDate.now())) {
                    erros.put("prazoInscricao", "O prazo de inscrição não pode ser uma data que já passou.");
                }
            } catch (DateTimeParseException e) {
                erros.put("prazoInscricao", "O prazo de inscrição não é uma data válida.");
            }
        }

        // RN03: toda vaga deve pertencer a pelo menos uma área de atuação.
        if (pedido.areas() == null || pedido.areas().isEmpty()) {
            erros.put("areas", "Escolha pelo menos uma área de atuação.");
        } else {
            Set<Integer> areasExistentes = areaRepository.listar().stream()
                    .map(AreaAtuacao::id)
                    .collect(Collectors.toSet());
            if (pedido.areas().stream().anyMatch(id -> id == null || !areasExistentes.contains(id))) {
                erros.put("areas", "Alguma das áreas escolhidas não existe.");
            }
        }

        return prazo;
    }

    private static boolean vazio(String texto) {
        return texto == null || texto.isBlank();
    }

    private static String textoOuNulo(String texto) {
        return vazio(texto) ? null : texto.trim();
    }
}
