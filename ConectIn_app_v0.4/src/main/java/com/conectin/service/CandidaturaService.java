package com.conectin.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conectin.erro.ErroApi;
import com.conectin.model.ArquivoBaixado;
import com.conectin.model.Candidato;
import com.conectin.model.Candidatura;
import com.conectin.model.CandidaturaDoCandidato;
import com.conectin.model.CandidaturaRequest;
import com.conectin.model.Vaga;
import com.conectin.repository.CandidatoRepository;
import com.conectin.repository.CandidaturaRepository;
import com.conectin.repository.CurriculoRepository;
import com.conectin.repository.NotificacaoRepository;
import com.conectin.util.Textos;

/**
 * Tudo sobre CANDIDATURAS:
 * - o candidato se candidata e vê as candidaturas dele
 * - a empresa vê quem se candidatou e aprova ou reprova
 */
@Service
public class CandidaturaService {

    private final CandidaturaRepository candidaturas;
    private final CandidatoRepository candidatos;
    private final CurriculoRepository curriculos;
    private final NotificacaoRepository notificacoes;
    private final VagaService vagaService;
    private final UsuarioService usuarioService;

    public CandidaturaService(CandidaturaRepository candidaturas, CandidatoRepository candidatos, CurriculoRepository curriculos,
                              NotificacaoRepository notificacoes, VagaService vagaService, UsuarioService usuarioService) {
        this.candidaturas = candidaturas;
        this.candidatos = candidatos;
        this.curriculos = curriculos;
        this.notificacoes = notificacoes;
        this.vagaService = vagaService;
        this.usuarioService = usuarioService;
    }

    // =========================================================
    // PARA O CANDIDATO
    // =========================================================

    // RF06: candidatar-se a uma vaga
    @Transactional
    public CandidaturaDoCandidato candidatar(int idCandidato, CandidaturaRequest pedido) {
        if (pedido.idVaga() == null) {
            throw ErroApi.validacao(Map.of("idVaga", "Informe a vaga."));
        }
        Vaga vaga = vagaService.buscarVaga(pedido.idVaga());

        // RN02: só pode se candidatar dentro do prazo
        if (!vaga.inscricoesAbertas()) {
            throw ErroApi.regra("INSCRICOES_ENCERRADAS", "As inscrições para esta vaga estão encerradas.");
        }

        // não pode se candidatar duas vezes na mesma vaga
        if (candidaturas.buscarDoCandidato(idCandidato, vaga.id()).isPresent()) {
            throw new ErroApi(HttpStatus.CONFLICT, "Você já se candidatou a esta vaga.");
        }

        // RN04: vaga de emprego exige currículo (estágio e projeto acadêmico não)
        if (vaga.tipo().equals("emprego") && curriculos.buscar(idCandidato).isEmpty()) {
            throw ErroApi.regra("CURRICULO_OBRIGATORIO", "Para vagas de emprego, é preciso ter um currículo em PDF no seu perfil.");
        }

        // RF11: o candidato pode marcar "sem experiência, em busca de oportunidade"
        if (Boolean.TRUE.equals(pedido.semExperiencia())) {
            candidatos.marcarSemExperiencia(idCandidato, true);
        }

        int idCandidatura = candidaturas.inserir(idCandidato, vaga.id());

        // avisa a empresa que chegou uma candidatura nova
        String nome = candidatos.buscar(idCandidato).map(c -> c.nome()).orElse("Um candidato");
        notificacoes.criar(vaga.idEmpresa(), "nova_candidatura",
                nome + " se candidatou à vaga " + vaga.titulo() + ".", idCandidatura);

        // devolve a candidatura que acabou de ser criada
        for (CandidaturaDoCandidato c : candidaturas.listarDoCandidato(idCandidato)) {
            if (c.id() == idCandidatura) return c;
        }
        throw ErroApi.naoEncontrado("Candidatura não encontrada.");
    }

    // RF08: "Minhas candidaturas"
    public List<CandidaturaDoCandidato> doCandidato(int idCandidato) {
        return candidaturas.listarDoCandidato(idCandidato);
    }

    // PARA A EMPRESA

    // RF07: candidaturas que a empresa recebeu (dá para filtrar por vaga, status e nome)
    public List<Candidatura> recebidas(int idEmpregador, Integer idVaga, String status, String busca) {
        return candidaturas.listarDoEmpregador(idEmpregador, idVaga, Textos.limpar(status), Textos.limpar(busca));
    }

    // a empresa abre uma candidatura e vê o perfil completo do candidato
    public Candidatura detalheParaEmpregador(int idEmpregador, int idCandidatura) {
        Candidatura c = buscarDaEmpresa(idEmpregador, idCandidatura);
        Candidato candidato = usuarioService.perfilCandidato(c.idCandidato());
        return new Candidatura(c.id(), c.idVaga(), c.tituloVaga(), c.tipoVaga(), c.idCandidato(), candidato.nome(),
                candidato.curso(), candidato.instituicao(), candidato.habilidades(), candidato.semExperiencia(),
                candidato.curriculo() != null, candidato.temFoto(), c.status(), c.dataCandidatura(), candidato);
    }

    public ArquivoBaixado curriculoParaEmpregador(int idEmpregador, int idCandidatura) {
        Candidatura c = buscarDaEmpresa(idEmpregador, idCandidatura);
        return usuarioService.curriculo(c.idCandidato());
    }

    // a empresa muda o status ("analise", "aprovado" ou "reprovado") e o candidato é avisado
    @Transactional
    public Candidatura avaliar(int idEmpregador, int idCandidatura, String novoStatus) {
        if (novoStatus == null) {
            throw ErroApi.validacao(Map.of("status", "Escolha aprovar ou reprovar."));
        }
        Candidatura c = buscarDaEmpresa(idEmpregador, idCandidatura);
        candidaturas.atualizarStatus(c.id(), novoStatus);

        String mensagem;
        if (novoStatus.equals("aprovado")) {
            mensagem = "Sua candidatura para " + c.tituloVaga() + " foi aprovada! A empresa pode entrar em contato com você.";
        } else if (novoStatus.equals("reprovado")) {
            mensagem = "Sua candidatura para " + c.tituloVaga() + " não foi aprovada desta vez.";
        } else {
            mensagem = "Sua candidatura para " + c.tituloVaga() + " voltou para análise.";
        }
        notificacoes.criar(c.idCandidato(), "status_candidatura", mensagem, c.idVaga());

        return detalheParaEmpregador(idEmpregador, idCandidatura);
    }

    // MÉTODO DE AJUDA

    // a empresa só pode ver candidaturas das vagas dela
    private Candidatura buscarDaEmpresa(int idEmpregador, int idCandidatura) {
        return candidaturas.buscarParaEmpregador(idCandidatura, idEmpregador)
                .orElseThrow(() -> ErroApi.naoEncontrado("Candidatura não encontrada."));
    }
}
