package com.conectin.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conectin.erro.ErroApi;
import com.conectin.model.ArquivoBaixado;
import com.conectin.model.CandidatoRegistro;
import com.conectin.model.CandidaturaDetalhe;
import com.conectin.model.CandidaturaDoCandidato;
import com.conectin.model.CandidaturaRecebida;
import com.conectin.model.CandidaturaRegistro;
import com.conectin.model.CandidaturaRequest;
import com.conectin.model.VagaRegistro;
import com.conectin.repository.CandidatoRepository;
import com.conectin.repository.CandidaturaRepository;
import com.conectin.repository.CurriculoRepository;
import com.conectin.repository.NotificacaoRepository;
import com.conectin.util.Textos;

@Service
public class CandidaturaService {

    private static final Set<String> STATUS = Set.of("analise", "aprovado", "reprovado");

    private final CandidaturaRepository candidaturas;
    private final CandidatoRepository candidatos;
    private final CurriculoRepository curriculos;
    private final NotificacaoRepository notificacoes;
    private final VagaService vagas;
    private final PerfilCandidatoService perfis;

    public CandidaturaService(CandidaturaRepository candidaturas, CandidatoRepository candidatos, CurriculoRepository curriculos,
                              NotificacaoRepository notificacoes, VagaService vagas, PerfilCandidatoService perfis) {
        this.candidaturas = candidaturas;
        this.candidatos = candidatos;
        this.curriculos = curriculos;
        this.notificacoes = notificacoes;
        this.vagas = vagas;
        this.perfis = perfis;
    }

    @Transactional
    public CandidaturaDoCandidato candidatar(int idCandidato, CandidaturaRequest pedido) {
        if (pedido == null || pedido.idVaga() == null) throw ErroApi.validacao(Map.of("idVaga", "Informe a vaga."));
        VagaRegistro vaga = vagas.buscar(pedido.idVaga());

        // RN02 prazo, duplicidade e RN04 curriculo obrigatorio para emprego
        if (!vaga.inscricoesAbertas()) throw ErroApi.regra("INSCRICOES_ENCERRADAS", "As inscrições para esta vaga estão encerradas.");
        if (candidaturas.buscarDoCandidato(idCandidato, vaga.id()).isPresent()) {
            throw new ErroApi(HttpStatus.CONFLICT, "Você já se candidatou a esta vaga.");
        }
        if ("emprego".equals(vaga.tipo()) && curriculos.buscar(idCandidato).isEmpty()) {
            throw ErroApi.regra("CURRICULO_OBRIGATORIO", "Para vagas de emprego, é preciso ter um currículo em PDF no seu perfil.");
        }
        if (Boolean.TRUE.equals(pedido.semExperiencia())) candidatos.marcarSemExperiencia(idCandidato, true);

        int id = candidaturas.inserir(idCandidato, vaga.id());
        String nome = candidatos.buscar(idCandidato).map(CandidatoRegistro::nome).orElse("Um candidato");
        notificacoes.criar(vaga.idEmpregador(), "nova_candidatura", nome + " se candidatou à vaga " + vaga.titulo() + ".", id);
        return candidaturas.listarDoCandidato(idCandidato).stream().filter(c -> c.id() == id).findFirst().orElseThrow();
    }

    public List<CandidaturaDoCandidato> doCandidato(int idCandidato) {
        return candidaturas.listarDoCandidato(idCandidato);
    }

    public List<CandidaturaRecebida> recebidas(int idEmpregador, Integer idVaga, String status, String busca) {
        String filtro = Textos.limpar(status);
        if (filtro != null && !STATUS.contains(filtro)) filtro = null;
        List<CandidaturaRepository.Recebida> linhas = candidaturas.listarDoEmpregador(idEmpregador, idVaga, filtro, Textos.limpar(busca));
        Map<Integer, List<String>> habilidades = candidatos.habilidadesDe(linhas.stream().map(CandidaturaRepository.Recebida::idCandidato).distinct().toList());
        return linhas.stream()
                .map(l -> new CandidaturaRecebida(l.id(), l.idVaga(), l.tituloVaga(), l.idCandidato(), l.nome(), l.curso(),
                        l.instituicao(), habilidades.getOrDefault(l.idCandidato(), List.of()), l.semExperiencia(),
                        l.temCurriculo(), l.temFoto(), l.status(), l.dataCandidatura()))
                .toList();
    }

    public CandidaturaDetalhe detalheParaEmpregador(int idEmpregador, int idCandidatura) {
        CandidaturaRegistro c = buscarParaEmpregador(idEmpregador, idCandidatura);
        return new CandidaturaDetalhe(c.id(), c.status(), c.dataCandidatura(), c.idVaga(), c.tituloVaga(), c.tipoVaga(), perfis.perfil(c.idCandidato()));
    }

    public ArquivoBaixado curriculoParaEmpregador(int idEmpregador, int idCandidatura) {
        return perfis.curriculo(buscarParaEmpregador(idEmpregador, idCandidatura).idCandidato());
    }

    @Transactional
    public CandidaturaDetalhe avaliar(int idEmpregador, int idCandidatura, String novoStatus) {
        if (novoStatus == null || !STATUS.contains(novoStatus)) throw ErroApi.validacao(Map.of("status", "Escolha aprovar ou reprovar."));
        CandidaturaRegistro c = buscarParaEmpregador(idEmpregador, idCandidatura);
        if (!novoStatus.equals(c.status())) {
            candidaturas.atualizarStatus(c.id(), novoStatus);
            String mensagem = switch (novoStatus) {
                case "aprovado" -> "Sua candidatura para " + c.tituloVaga() + " foi aprovada! A empresa pode entrar em contato com você.";
                case "reprovado" -> "Sua candidatura para " + c.tituloVaga() + " não foi aprovada desta vez.";
                default -> "Sua candidatura para " + c.tituloVaga() + " voltou para análise.";
            };
            notificacoes.criar(c.idCandidato(), "status_candidatura", mensagem, c.idVaga());
        }
        return detalheParaEmpregador(idEmpregador, idCandidatura);
    }

    private CandidaturaRegistro buscarParaEmpregador(int idEmpregador, int idCandidatura) {
        return candidaturas.buscarParaEmpregador(idCandidatura, idEmpregador).orElseThrow(() -> ErroApi.naoEncontrado("Candidatura não encontrada."));
    }
}
