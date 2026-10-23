package com.conectin.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conectin.erro.ErroApi;
import com.conectin.model.AreaAtuacao;
import com.conectin.model.CandidaturaRegistro;
import com.conectin.model.CandidatoRegistro;
import com.conectin.model.Estatisticas;
import com.conectin.model.FiltroVagas;
import com.conectin.model.Pagina;
import com.conectin.model.PainelEmpresa;
import com.conectin.model.VagaDetalhe;
import com.conectin.model.VagaEmpresa;
import com.conectin.model.VagaRegistro;
import com.conectin.model.VagaRequest;
import com.conectin.model.VagaResumo;
import com.conectin.repository.AreaRepository;
import com.conectin.repository.CandidatoRepository;
import com.conectin.repository.CandidaturaRepository;
import com.conectin.repository.NotificacaoRepository;
import com.conectin.repository.UsuarioRepository;
import com.conectin.repository.VagaRepository;
import com.conectin.util.Textos;

@Service
public class VagaService {

    private static final Set<String> TIPOS = Set.of("emprego", "estagio", "projeto_academico");
    private static final Set<String> MODALIDADES = Set.of("presencial", "remoto", "hibrido");

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

    public Pagina<VagaResumo> listarAbertas(String busca, String tipo, String modalidade, Integer area,
                                           String ordem, Integer pagina, Integer tamanho) {
        int p = pagina == null || pagina < 0 ? 0 : pagina;
        int t = tamanho == null || tamanho < 1 ? 12 : Math.min(tamanho, 50);
        String texto = Textos.limpar(busca);
        if (texto != null && texto.length() > 100) texto = texto.substring(0, 100);
        return vagas.listarAbertas(new FiltroVagas(texto, Textos.limpar(tipo), Textos.limpar(modalidade), area, Textos.limpar(ordem), p, t));
    }

    public VagaDetalhe detalhe(int idVaga, Integer idCandidato) {
        VagaRegistro vaga = buscar(idVaga);
        CandidaturaRegistro candidatura = idCandidato == null ? null : candidaturas.buscarDoCandidato(idCandidato, idVaga).orElse(null);
        return paraDetalhe(vaga, candidatura);
    }

    public Estatisticas estatisticas() {
        return new Estatisticas(vagas.contarAbertas(), usuarios.contarPorTipo("candidato"), usuarios.contarPorTipo("empregador"));
    }

    // vagas da area de interesse e que citam as habilidades do candidato aparecem primeiro
    public List<VagaResumo> recomendadas(int idCandidato, int limite) {
        CandidatoRegistro candidato = candidatos.buscar(idCandidato).orElseThrow(() -> ErroApi.naoEncontrado("Candidato não encontrado."));
        List<String> habilidades = candidatos.habilidades(idCandidato).stream()
                .filter(h -> h.length() >= 2).map(h -> h.toLowerCase(Locale.ROOT)).toList();
        Set<Integer> jaCandidatou = candidaturas.listarDoCandidato(idCandidato).stream().map(c -> c.idVaga()).collect(Collectors.toSet());
        return vagas.listarAbertas(new FiltroVagas(null, null, null, null, "recentes", 0, 200)).itens().stream()
                .filter(v -> !jaCandidatou.contains(v.id()))
                .sorted(Comparator.comparingInt((VagaResumo v) -> -pontuacao(v, candidato.areaInteresse(), habilidades)))
                .limit(Math.max(1, Math.min(limite, 12)))
                .toList();
    }

    @Transactional
    public int publicar(int idEmpregador, VagaRequest pedido) {
        DadosValidos d = validar(pedido, "A vaga não foi publicada. Corrija os campos indicados.");
        int idVaga = vagas.inserirVaga(idEmpregador, d.titulo(), d.descricao(), d.requisitos(), d.tipo(), d.modalidade(), d.prazo());
        d.areas().forEach(idArea -> vagas.ligarArea(idVaga, idArea));
        VagaRegistro vaga = buscar(idVaga);
        String texto = vaga.titulo() + " " + (vaga.requisitos() == null ? "" : vaga.requisitos());
        notificacoes.notificarCandidatosCompativeis(idVaga, texto,
                "Nova vaga compatível com seu perfil: " + vaga.titulo() + " — " + vaga.empresa() + ".");
        return idVaga;
    }

    @Transactional
    public VagaDetalhe editar(int idEmpregador, int idVaga, VagaRequest pedido) {
        VagaRegistro atual = buscarDoEmpregador(idEmpregador, idVaga);
        DadosValidos d = validar(pedido, "A vaga não foi salva. Corrija os campos indicados.");
        vagas.atualizarVaga(atual.id(), d.titulo(), d.descricao(), d.requisitos(), d.tipo(), d.modalidade(), d.prazo());
        vagas.desligarAreas(atual.id());
        d.areas().forEach(idArea -> vagas.ligarArea(atual.id(), idArea));
        return paraDetalhe(buscar(atual.id()), null);
    }

    @Transactional
    public VagaDetalhe mudarStatus(int idEmpregador, int idVaga, String status) {
        VagaRegistro vaga = buscarDoEmpregador(idEmpregador, idVaga);
        if ("aberta".equals(status) && vaga.prazoInscricao().isBefore(LocalDate.now())) {
            throw ErroApi.validacao("O prazo de inscrição já passou. Edite a vaga e escolha um novo prazo.",
                    Map.of("prazoInscricao", "O prazo de inscrição já passou."));
        }
        vagas.alterarStatus(vaga.id(), status);
        return paraDetalhe(buscar(vaga.id()), null);
    }

    @Transactional
    public void remover(int idEmpregador, int idVaga) {
        VagaRegistro vaga = buscarDoEmpregador(idEmpregador, idVaga);
        List<Integer> inscritos = candidaturas.candidatosDaVaga(vaga.id());
        vagas.remover(vaga.id());
        notificacoes.criarParaVarios(inscritos, "status_candidatura",
                "A vaga " + vaga.titulo() + " (" + vaga.empresa() + ") foi removida pela empresa.", null);
    }

    public VagaDetalhe detalheDoEmpregador(int idEmpregador, int idVaga) {
        return paraDetalhe(buscarDoEmpregador(idEmpregador, idVaga), null);
    }

    public List<VagaEmpresa> listarDoEmpregador(int idEmpregador) {
        return vagas.listarDoEmpregador(idEmpregador);
    }

    public PainelEmpresa painel(int idEmpregador) {
        List<VagaEmpresa> todas = vagas.listarDoEmpregador(idEmpregador);
        LocalDateTime inicioDoMes = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        int abertas = (int) todas.stream().filter(VagaEmpresa::inscricoesAbertas).count();
        int noMes = (int) todas.stream().filter(v -> v.dataPublicacao() != null && !v.dataPublicacao().isBefore(inicioDoMes)).count();
        int[] c = candidaturas.contagensDoEmpregador(idEmpregador, LocalDateTime.now().minusDays(7));
        return new PainelEmpresa(todas.size(), abertas, noMes, c[0], c[1], c[2], todas.stream().limit(3).toList());
    }

    VagaRegistro buscar(int idVaga) {
        return vagas.buscarPorId(idVaga).orElseThrow(() -> ErroApi.naoEncontrado("Vaga não encontrada."));
    }

    private VagaRegistro buscarDoEmpregador(int idEmpregador, int idVaga) {
        VagaRegistro vaga = buscar(idVaga);
        if (vaga.idEmpregador() != idEmpregador) throw ErroApi.naoEncontrado("Vaga não encontrada.");
        return vaga;
    }

    private VagaDetalhe paraDetalhe(VagaRegistro v, CandidaturaRegistro c) {
        return new VagaDetalhe(v.id(), v.titulo(), v.descricao(), v.requisitos(), v.tipo(), v.modalidade(),
                v.prazoInscricao(), v.dataPublicacao(), v.status(), v.inscricoesAbertas(), v.idEmpregador(),
                v.empresa(), v.tipoInstituicao(), v.descricaoEmpresa(), areas.daVaga(v.id()),
                c == null ? null : c.id(), c == null ? null : c.status());
    }

    private static int pontuacao(VagaResumo vaga, String areaInteresse, List<String> habilidades) {
        int pontos = areaInteresse != null && vaga.areas().contains(areaInteresse) ? 3 : 0;
        String texto = (vaga.titulo() + " " + (vaga.requisitos() == null ? "" : vaga.requisitos())).toLowerCase(Locale.ROOT);
        for (String h : habilidades) {
            if (texto.contains(h)) pontos++;
        }
        return pontos;
    }

    private record DadosValidos(String titulo, String descricao, String requisitos, String tipo, String modalidade,
                                LocalDate prazo, Set<Integer> areas) {
    }

    private DadosValidos validar(VagaRequest pedido, String mensagem) {
        Map<String, String> erros = new LinkedHashMap<>();
        if (pedido == null) pedido = new VagaRequest(null, null, null, null, null, null, null);

        String titulo = Textos.obrigatorio(pedido.titulo(), 150, "titulo", "O título é obrigatório.", erros);
        String descricao = Textos.obrigatorio(pedido.descricao(), 5000, "descricao", "A descrição é obrigatória.", erros);
        String requisitos = Textos.opcional(pedido.requisitos(), 5000, "requisitos", erros);
        if (pedido.tipo() == null || !TIPOS.contains(pedido.tipo())) erros.put("tipo", "Escolha o tipo da vaga.");
        if (pedido.modalidade() == null || !MODALIDADES.contains(pedido.modalidade())) erros.put("modalidade", "Escolha a modalidade da vaga.");

        // RN01: a vaga precisa de prazo de inscricao
        LocalDate prazo = null;
        String prazoTexto = Textos.limpar(pedido.prazoInscricao());
        if (prazoTexto == null) {
            erros.put("prazoInscricao", "O prazo de inscrição é obrigatório.");
        } else {
            try {
                prazo = LocalDate.parse(prazoTexto);
                if (prazo.isBefore(LocalDate.now())) erros.put("prazoInscricao", "O prazo de inscrição não pode ser uma data que já passou.");
            } catch (DateTimeParseException e) {
                erros.put("prazoInscricao", "O prazo de inscrição não é uma data válida.");
            }
        }

        // RN03: pelo menos uma area
        Set<Integer> idsAreas = new LinkedHashSet<>();
        if (pedido.areas() == null || pedido.areas().isEmpty()) {
            erros.put("areas", "Escolha pelo menos uma área de atuação.");
        } else {
            Set<Integer> existentes = areas.listar().stream().map(AreaAtuacao::id).collect(Collectors.toSet());
            for (Integer id : pedido.areas()) {
                if (id == null || !existentes.contains(id)) {
                    erros.put("areas", "Alguma das áreas escolhidas não existe.");
                    break;
                }
                idsAreas.add(id);
            }
        }

        if (!erros.isEmpty()) throw ErroApi.validacao(mensagem, erros);
        return new DadosValidos(titulo, descricao, requisitos, pedido.tipo(), pedido.modalidade(), prazo, idsAreas);
    }
}
