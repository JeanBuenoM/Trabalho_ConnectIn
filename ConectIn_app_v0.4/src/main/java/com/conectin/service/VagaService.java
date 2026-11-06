package com.conectin.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conectin.erro.ErroApi;
import com.conectin.model.Candidato;
import com.conectin.model.Candidatura;
import com.conectin.model.CandidaturaDoCandidato;
import com.conectin.model.Vaga;
import com.conectin.model.VagaDetalhe;
import com.conectin.model.VagaRequest;
import com.conectin.repository.AreaRepository;
import com.conectin.repository.CandidatoRepository;
import com.conectin.repository.CandidaturaRepository;
import com.conectin.repository.NotificacaoRepository;
import com.conectin.repository.UsuarioRepository;
import com.conectin.repository.VagaRepository;
import com.conectin.util.Textos;


@Service
public class VagaService {

    private final VagaRepository vagas;
    private final AreaRepository areas;
    private final CandidaturaRepository candidaturas;
    private final CandidatoRepository candidatos;
    private final NotificacaoRepository notificacoes;
    private final UsuarioRepository usuarios;

    public VagaService(VagaRepository vagas, AreaRepository areas, CandidaturaRepository candidaturas,
                       CandidatoRepository candidatos, NotificacaoRepository notificacoes, UsuarioRepository usuarios) {
        this.vagas = vagas;
        this.areas = areas;
        this.candidaturas = candidaturas;
        this.candidatos = candidatos;
        this.notificacoes = notificacoes;
        this.usuarios = usuarios;
    }

    // PARA QUALQUER USUARIO

    // busca as vagas abertas com os filtros
    public Map<String, Object> listarAbertas(String busca, String tipo, String modalidade, Integer area,
                                             String ordem, Integer pagina, Integer tamanho) {
        if (pagina == null || pagina < 0) pagina = 0;
        if (tamanho == null || tamanho < 1) tamanho = 12;
        busca = Textos.limpar(busca);
        tipo = Textos.limpar(tipo);
        modalidade = Textos.limpar(modalidade);

        List<Vaga> itens = vagas.listarAbertas(busca, tipo, modalidade, area, Textos.limpar(ordem), pagina, tamanho);
        int total = vagas.contarAbertas(busca, tipo, modalidade, area);

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("itens", itens);
        resposta.put("total", total);
        resposta.put("pagina", pagina);
        resposta.put("tamanho", tamanho);
        return resposta;
    }

    public VagaDetalhe detalhe(int idVaga, Integer idCandidato) {
        Vaga vaga = buscarVaga(idVaga);

        Candidatura candidatura = null;
        if (idCandidato != null) {
            candidatura = candidaturas.buscarDoCandidato(idCandidato, idVaga).orElse(null);
        }
        return montarDetalhe(vaga, candidatura);
    }

    public Map<String, Object> estatisticas() {
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("vagasAbertas", vagas.contarAbertas());
        resposta.put("candidatos", usuarios.contarPorTipo("candidato"));
        resposta.put("empresas", usuarios.contarPorTipo("empregador"));
        return resposta;
    }

    // PARA O CANDIDATO

    // vagas abertas em que ele ainda não se candidatou; as da área de interesse dele vêm primeiro
    public List<Vaga> recomendadas(int idCandidato, int limite) {
        Candidato candidato = candidatos.buscar(idCandidato)
                .orElseThrow(() -> ErroApi.naoEncontrado("Candidato não encontrado."));

        List<Integer> vagasQueJaSeCandidatou = new ArrayList<>();
        for (CandidaturaDoCandidato c : candidaturas.listarDoCandidato(idCandidato)) {
            vagasQueJaSeCandidatou.add(c.idVaga());
        }

        List<Vaga> daArea = new ArrayList<>();
        List<Vaga> outras = new ArrayList<>();
        List<Vaga> abertas = vagas.listarAbertas(null, null, null, null, "recentes", 0, 100);
        for (Vaga vaga : abertas) {
            if (vagasQueJaSeCandidatou.contains(vaga.id())) continue;

            String area = candidato.areaInteresse(); // pode estar vazia se o perfil ainda não foi preenchido
            if (area != null && vaga.areas().contains(area)) {
                daArea.add(vaga);
            } else {
                outras.add(vaga);
            }
        }

        List<Vaga> resultado = new ArrayList<>(daArea);
        resultado.addAll(outras);
        if (resultado.size() > limite) {
            return resultado.subList(0, limite);
        }
        return resultado;
    }

    // PARA A EMPRESA

    // publica a vaga
    @Transactional
    public int publicar(int idEmpregador, VagaRequest pedido) {
        LocalDate prazo = validar(pedido, "A vaga não foi publicada. Corrija os campos indicados.");

        int idVaga = vagas.inserirVaga(idEmpregador, pedido.titulo().trim(), pedido.descricao().trim(),
                Textos.limpar(pedido.requisitos()), pedido.tipo(), pedido.modalidade(), prazo);
        for (Integer idArea : pedido.areas()) {
            vagas.ligarArea(idVaga, idArea);
        }
        return idVaga;
    }

    @Transactional
    public VagaDetalhe editar(int idEmpregador, int idVaga, VagaRequest pedido) {
        Vaga vaga = buscarVagaDaEmpresa(idEmpregador, idVaga);
        LocalDate prazo = validar(pedido, "A vaga não foi salva. Corrija os campos indicados.");

        vagas.atualizarVaga(vaga.id(), pedido.titulo().trim(), pedido.descricao().trim(),
                Textos.limpar(pedido.requisitos()), pedido.tipo(), pedido.modalidade(), prazo);

        vagas.desligarAreas(vaga.id());
        for (Integer idArea : pedido.areas()) {
            vagas.ligarArea(vaga.id(), idArea);
        }
        return montarDetalhe(buscarVaga(vaga.id()), null);
    }

    // encerrarou ou reabrira vaga
    public VagaDetalhe mudarStatus(int idEmpregador, int idVaga, String status) {
        Vaga vaga = buscarVagaDaEmpresa(idEmpregador, idVaga);
        vagas.alterarStatus(vaga.id(), status);
        return montarDetalhe(buscarVaga(vaga.id()), null);
    }

    // exclui a vaga e avisa quem tinha se candidatado
    @Transactional
    public void remover(int idEmpregador, int idVaga) {
        Vaga vaga = buscarVagaDaEmpresa(idEmpregador, idVaga);
        List<Integer> inscritos = candidaturas.candidatosDaVaga(vaga.id());

        vagas.remover(vaga.id());
        notificacoes.criarParaVarios(inscritos, "status_candidatura",
                "A vaga " + vaga.titulo() + " (" + vaga.empresa() + ") foi removida pela empresa.", null);
    }

    public VagaDetalhe detalheDoEmpregador(int idEmpregador, int idVaga) {
        return montarDetalhe(buscarVagaDaEmpresa(idEmpregador, idVaga), null);
    }

    public List<Vaga> listarDoEmpregador(int idEmpregador) {
        return vagas.listarDoEmpregador(idEmpregador);
    }

    // números que aparecem no painel da empresa
    public Map<String, Object> painel(int idEmpregador) {
        List<Vaga> todas = vagas.listarDoEmpregador(idEmpregador);
        LocalDateTime inicioDoMes = LocalDate.now().withDayOfMonth(1).atStartOfDay();

        int abertas = 0;
        int publicadasNoMes = 0;
        for (Vaga vaga : todas) {
            if (vaga.inscricoesAbertas()) abertas++;
            if (vaga.dataPublicacao() != null && vaga.dataPublicacao().isAfter(inicioDoMes)) publicadasNoMes++;
        }

        // contagens de candidaturas: [total, dos últimos 7 dias, aprovadas]
        int[] contagens = candidaturas.contagensDoEmpregador(idEmpregador, LocalDateTime.now().minusDays(7));

        List<Vaga> ultimas = todas.size() > 3 ? todas.subList(0, 3) : todas;
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("vagasPublicadas", todas.size());
        resposta.put("vagasAbertas", abertas);
        resposta.put("vagasNoMes", publicadasNoMes);
        resposta.put("totalCandidaturas", contagens[0]);
        resposta.put("candidaturasNaSemana", contagens[1]);
        resposta.put("aprovados", contagens[2]);
        resposta.put("recentes", ultimas);
        return resposta;
    }

    // MÉTODOS DE AJUDA

    Vaga buscarVaga(int idVaga) {
        return vagas.buscarPorId(idVaga).orElseThrow(() -> ErroApi.naoEncontrado("Vaga não encontrada."));
    }

    // a empresa só pode mexer nas vagas que ela mesma publicou
    private Vaga buscarVagaDaEmpresa(int idEmpregador, int idVaga) {
        Vaga vaga = buscarVaga(idVaga);
        if (vaga.idEmpresa() != idEmpregador) {
            throw ErroApi.naoEncontrado("Vaga não encontrada.");
        }
        return vaga;
    }

    private VagaDetalhe montarDetalhe(Vaga v, Candidatura c) {
        Integer idCandidatura = c == null ? null : c.id();
        String statusCandidatura = c == null ? null : c.status();
        return new VagaDetalhe(v.id(), v.titulo(), v.descricao(), v.requisitos(), v.tipo(), v.modalidade(),
                v.prazoInscricao(), v.dataPublicacao(), v.status(), v.inscricoesAbertas(), v.idEmpresa(),
                v.empresa(), v.tipoInstituicao(), v.descricaoEmpresa(), areas.daVaga(v.id()),
                idCandidatura, statusCandidatura);
    }

    // confere os campos da vaga e devolve o prazo já convertido para data
    private LocalDate validar(VagaRequest pedido, String mensagem) {
        Map<String, String> erros = new HashMap<>();

        Textos.obrigatorio(pedido.titulo(), 150, "titulo", "O título é obrigatório.", erros);
        Textos.obrigatorio(pedido.descricao(), 5000, "descricao", "A descrição é obrigatória.", erros);
        if (pedido.tipo() == null) erros.put("tipo", "Escolha o tipo da vaga.");
        if (pedido.modalidade() == null) erros.put("modalidade", "Escolha a modalidade da vaga.");

        // RN01: a vaga precisa de prazo de inscrição
        LocalDate prazo = null;
        if (Textos.limpar(pedido.prazoInscricao()) == null) {
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

        // RN03: pelo menos uma área de atuação
        if (pedido.areas() == null || pedido.areas().isEmpty()) {
            erros.put("areas", "Escolha pelo menos uma área de atuação.");
        }

        if (!erros.isEmpty()) {
            throw ErroApi.validacao(mensagem, erros);
        }
        return prazo;
    }
}
