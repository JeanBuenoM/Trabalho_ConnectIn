package com.conectin.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.conectin.erro.ErroApi;
import com.conectin.model.ArquivoBaixado;
import com.conectin.model.CandidatoRegistro;
import com.conectin.model.CurriculoInfo;
import com.conectin.model.CurriculoRegistro;
import com.conectin.model.PerfilCandidato;
import com.conectin.model.PerfilCandidatoRequest;
import com.conectin.repository.AreaRepository;
import com.conectin.repository.CandidatoRepository;
import com.conectin.repository.CurriculoRepository;
import com.conectin.repository.UsuarioRepository;
import com.conectin.util.Textos;

@Service
public class PerfilCandidatoService {

    private static final Set<String> STATUS_FORMACAO = Set.of("cursando", "concluido", "trancado");

    private final UsuarioRepository usuarios;
    private final CandidatoRepository candidatos;
    private final CurriculoRepository curriculos;
    private final AreaRepository areas;
    private final ArmazenamentoService armazenamento;
    private final AuthService auth;

    public PerfilCandidatoService(UsuarioRepository usuarios, CandidatoRepository candidatos, CurriculoRepository curriculos,
                                  AreaRepository areas, ArmazenamentoService armazenamento, AuthService auth) {
        this.usuarios = usuarios;
        this.candidatos = candidatos;
        this.curriculos = curriculos;
        this.areas = areas;
        this.armazenamento = armazenamento;
        this.auth = auth;
    }

    public PerfilCandidato perfil(int id) {
        CandidatoRegistro c = candidatos.buscar(id).orElseThrow(() -> ErroApi.naoEncontrado("Candidato não encontrado."));
        List<String> habilidades = candidatos.habilidades(id);
        CurriculoInfo curriculo = curriculos.buscar(id).map(CurriculoRegistro::info).orElse(null);
        // porcentagem de campos preenchidos para o "perfil completo"
        long preenchidos = Stream.of(c.nome(), c.email(), c.telefone(), c.curso(), c.instituicao(), c.statusFormacao(),
                c.areaInteresse(), c.sobre()).filter(v -> v != null).count();
        if (!habilidades.isEmpty()) preenchidos++;
        if (curriculo != null || c.semExperiencia()) preenchidos++;
        return new PerfilCandidato(c.id(), c.nome(), c.email(), c.telefone(), c.curso(), c.instituicao(),
                c.statusFormacao(), c.anoConclusao(), c.areaInteresse(), c.sobre(), c.semExperiencia(),
                habilidades, curriculo, c.fotoUrl() != null, Math.round(preenchidos * 10f));
    }

    @Transactional
    public PerfilCandidato atualizar(int id, PerfilCandidatoRequest p) {
        if (p == null) throw ErroApi.validacao(Map.of("nome", "Informe seu nome completo."));
        Map<String, String> erros = new LinkedHashMap<>();
        String nome = Textos.obrigatorio(p.nome(), 150, "nome", "Informe seu nome completo.", erros);
        String email = auth.validarEmail(p.email(), id, erros);
        String telefone = Textos.opcional(p.telefone(), 20, "telefone", erros);
        String curso = Textos.obrigatorio(p.curso(), 150, "curso", "Informe o curso.", erros);
        String instituicao = Textos.obrigatorio(p.instituicao(), 150, "instituicao", "Informe a instituição de ensino.", erros);

        String statusFormacao = Textos.limpar(p.statusFormacao());
        if (statusFormacao == null || !STATUS_FORMACAO.contains(statusFormacao)) erros.put("statusFormacao", "Escolha o status da formação.");

        Integer anoConclusao = null;
        String ano = Textos.limpar(p.anoConclusao());
        if (ano != null) {
            try {
                anoConclusao = Integer.valueOf(ano);
                if (anoConclusao < 1950 || anoConclusao > 2100) erros.put("anoConclusao", "Informe um ano entre 1950 e 2100.");
            } catch (NumberFormatException e) {
                erros.put("anoConclusao", "Informe o ano com 4 dígitos, por exemplo 2026.");
            }
        }

        String areaInteresse = Textos.limpar(p.areaInteresse());
        if (areaInteresse == null || areas.listar().stream().noneMatch(a -> a.nome().equals(areaInteresse))) {
            erros.put("areaInteresse", "Escolha sua área de interesse.");
        }
        String sobre = Textos.opcional(p.sobre(), 2000, "sobre", erros);
        List<String> habilidades = limparHabilidades(p.habilidades(), erros);

        if (!erros.isEmpty()) throw ErroApi.validacao("O perfil não foi salvo. Corrija os campos indicados.", erros);

        usuarios.atualizarContato(id, nome, email, telefone);
        candidatos.atualizar(id, curso, instituicao, statusFormacao, anoConclusao, areaInteresse, sobre, Boolean.TRUE.equals(p.semExperiencia()));
        candidatos.substituirHabilidades(id, habilidades);
        return perfil(id);
    }

    @Transactional
    public CurriculoInfo enviarCurriculo(int id, MultipartFile arquivo) {
        Optional<CurriculoRegistro> anterior = curriculos.buscar(id);
        String caminho = armazenamento.salvarPdf("curriculos", arquivo);
        try {
            curriculos.salvar(id, caminho, nomeDoArquivo(arquivo.getOriginalFilename()), arquivo.getSize());
        } catch (RuntimeException e) {
            armazenamento.apagar(caminho);
            throw e;
        }
        anterior.ifPresent(c -> armazenamento.apagar(c.arquivoUrl()));
        return curriculos.buscar(id).map(CurriculoRegistro::info).orElseThrow();
    }

    public ArquivoBaixado curriculo(int id) {
        CurriculoRegistro c = curriculos.buscar(id).orElseThrow(() -> ErroApi.naoEncontrado("Nenhum currículo cadastrado."));
        return new ArquivoBaixado(armazenamento.carregar(c.arquivoUrl()), c.nomeArquivo(), "application/pdf");
    }

    @Transactional
    public void removerCurriculo(int id) {
        Optional<CurriculoRegistro> atual = curriculos.buscar(id);
        curriculos.remover(id);
        atual.ifPresent(c -> armazenamento.apagar(c.arquivoUrl()));
    }

    private static List<String> limparHabilidades(List<String> recebidas, Map<String, String> erros) {
        List<String> resultado = new ArrayList<>();
        Set<String> vistas = new HashSet<>();
        for (String bruta : recebidas == null ? List.<String>of() : recebidas) {
            String h = Textos.limpar(bruta);
            if (h == null) continue;
            if (h.length() > 50) erros.put("habilidades", "Cada habilidade pode ter no máximo 50 caracteres.");
            else if (vistas.add(h.toLowerCase(Locale.ROOT))) resultado.add(h);
        }
        if (resultado.size() > 30) erros.put("habilidades", "Cadastre no máximo 30 habilidades.");
        return resultado;
    }

    private static String nomeDoArquivo(String original) {
        String nome = original == null ? "" : original.replace('\\', '/');
        nome = nome.substring(nome.lastIndexOf('/') + 1).trim();
        return Textos.cortar(nome.isEmpty() ? "curriculo.pdf" : nome, 255);
    }
}
