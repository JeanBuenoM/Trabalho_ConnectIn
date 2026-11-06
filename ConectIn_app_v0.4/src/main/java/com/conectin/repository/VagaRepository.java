package com.conectin.repository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import com.conectin.model.Vaga;
import com.conectin.util.Textos;

@Repository
public class VagaRepository {

    // nomes das areas numa coluna so, separados por |
    private static final String AREAS_DA_VAGA = """
            (SELECT GROUP_CONCAT(a.nome ORDER BY a.nome SEPARATOR '|')
             FROM vaga_area va JOIN area_atuacao a ON a.id_area = va.id_area
             WHERE va.id_vaga = v.id_vaga) AS areas
            """;

    private final JdbcTemplate jdbc;
    private final SimpleJdbcInsert insert;

    public VagaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
        this.insert = new SimpleJdbcInsert(jdbc).withTableName("vaga")
                .usingColumns("id_empregador", "titulo", "descricao", "requisitos", "tipo", "modalidade", "prazo_inscricao")
                .usingGeneratedKeyColumns("id_vaga");
    }

    public int inserirVaga(int idEmpregador, String titulo, String descricao, String requisitos, String tipo, String modalidade, LocalDate prazo) {
        Map<String, Object> colunas = new HashMap<>();
        colunas.put("id_empregador", idEmpregador);
        colunas.put("titulo", titulo);
        colunas.put("descricao", descricao);
        colunas.put("requisitos", requisitos);
        colunas.put("tipo", tipo);
        colunas.put("modalidade", modalidade);
        colunas.put("prazo_inscricao", Date.valueOf(prazo));
        return insert.executeAndReturnKey(colunas).intValue();
    }

    public void atualizarVaga(int idVaga, String titulo, String descricao, String requisitos, String tipo, String modalidade, LocalDate prazo) {
        jdbc.update("UPDATE vaga SET titulo = ?, descricao = ?, requisitos = ?, tipo = ?, modalidade = ?, prazo_inscricao = ? WHERE id_vaga = ?",
                titulo, descricao, requisitos, tipo, modalidade, Date.valueOf(prazo), idVaga);
    }

    public void ligarArea(int idVaga, int idArea) {
        jdbc.update("INSERT INTO vaga_area (id_vaga, id_area) VALUES (?, ?)", idVaga, idArea);
    }

    public void desligarAreas(int idVaga) {
        jdbc.update("DELETE FROM vaga_area WHERE id_vaga = ?", idVaga);
    }

    public void alterarStatus(int idVaga, String status) {
        jdbc.update("UPDATE vaga SET status = ? WHERE id_vaga = ?", status, idVaga);
    }

    public void remover(int idVaga) {
        jdbc.update("DELETE FROM vaga WHERE id_vaga = ?", idVaga);
    }

    public Optional<Vaga> buscarPorId(int idVaga) {
        return jdbc.query("""
                SELECT v.*, e.razao_social, e.tipo_instituicao, e.descricao AS descricao_empresa,
                """ + AREAS_DA_VAGA + """
                FROM vaga v JOIN empregador e ON e.id_usuario = v.id_empregador
                WHERE v.id_vaga = ?
                """,
                (rs, n) -> {
                    LocalDate prazo = rs.getDate("prazo_inscricao").toLocalDate();
                    String status = rs.getString("status");
                    return new Vaga(rs.getInt("id_vaga"), rs.getInt("id_empregador"), rs.getString("titulo"),
                            rs.getString("descricao"), rs.getString("requisitos"), rs.getString("tipo"), rs.getString("modalidade"),
                            prazo, rs.getObject("data_publicacao", LocalDateTime.class), status, estaAberta(status, prazo),
                            rs.getString("razao_social"), rs.getString("tipo_instituicao"), rs.getString("descricao_empresa"),
                            separarAreas(rs.getString("areas")), 0, 0);
                },
                idVaga).stream().findFirst();
    }

    // vagas abertas com os filtros da tela; devolve só a página pedida
    public List<Vaga> listarAbertas(String busca, String tipo, String modalidade, Integer area, String ordem, int pagina, int tamanho) {
        List<Object> args = new ArrayList<>();
        String where = filtros(busca, tipo, modalidade, area, args);

        String ordenarPor = " ORDER BY v.data_publicacao DESC, v.id_vaga DESC";
        if ("prazo".equals(ordem)) {
            ordenarPor = " ORDER BY v.prazo_inscricao ASC, v.id_vaga DESC";
        }
        args.add(tamanho);
        args.add(pagina * tamanho);

        return jdbc.query("""
                SELECT v.id_vaga, v.titulo, v.descricao, v.requisitos, v.tipo, v.modalidade, v.prazo_inscricao,
                       v.data_publicacao, v.status, v.id_empregador, e.razao_social AS empresa, e.tipo_instituicao,
                """ + AREAS_DA_VAGA
                + " FROM vaga v JOIN empregador e ON e.id_usuario = v.id_empregador" + where + ordenarPor + " LIMIT ? OFFSET ?",
                (rs, n) -> new Vaga(rs.getInt("id_vaga"), rs.getInt("id_empregador"), rs.getString("titulo"),
                        rs.getString("descricao"), rs.getString("requisitos"), rs.getString("tipo"), rs.getString("modalidade"),
                        rs.getDate("prazo_inscricao").toLocalDate(), rs.getObject("data_publicacao", LocalDateTime.class),
                        rs.getString("status"), true, rs.getString("empresa"), rs.getString("tipo_instituicao"), null,
                        separarAreas(rs.getString("areas")), 0, 0),
                args.toArray());
    }

    // quantas vagas abertas existem com esses filtros (para mostrar o total e as páginas)
    public int contarAbertas(String busca, String tipo, String modalidade, Integer area) {
        List<Object> args = new ArrayList<>();
        String where = filtros(busca, tipo, modalidade, area, args);
        Integer total = jdbc.queryForObject("SELECT COUNT(*) FROM vaga v JOIN empregador e ON e.id_usuario = v.id_empregador" + where,
                Integer.class, args.toArray());
        return total == null ? 0 : total;
    }

    // vagas da empresa, com quantas candidaturas cada uma recebeu
    public List<Vaga> listarDoEmpregador(int idEmpregador) {
        return jdbc.query("""
                SELECT v.*,
                       (SELECT COUNT(*) FROM candidatura c WHERE c.id_vaga = v.id_vaga) AS total_candidaturas,
                       (SELECT COUNT(*) FROM candidatura c WHERE c.id_vaga = v.id_vaga AND c.status = 'analise') AS em_analise,
                """ + AREAS_DA_VAGA + """
                FROM vaga v WHERE v.id_empregador = ? ORDER BY v.data_publicacao DESC, v.id_vaga DESC
                """,
                (rs, n) -> {
                    LocalDate prazo = rs.getDate("prazo_inscricao").toLocalDate();
                    String status = rs.getString("status");
                    return new Vaga(rs.getInt("id_vaga"), rs.getInt("id_empregador"), rs.getString("titulo"),
                            rs.getString("descricao"), rs.getString("requisitos"), rs.getString("tipo"), rs.getString("modalidade"),
                            prazo, rs.getObject("data_publicacao", LocalDateTime.class), status, estaAberta(status, prazo),
                            null, null, null, separarAreas(rs.getString("areas")),
                            rs.getInt("total_candidaturas"), rs.getInt("em_analise"));
                },
                idEmpregador);
    }

    // total de vagas abertas no site (página inicial)
    public int contarAbertas() {
        return contarAbertas(null, null, null, null);
    }

    // monta o WHERE da busca de vagas e coloca os valores em "args"
    private String filtros(String busca, String tipo, String modalidade, Integer area, List<Object> args) {
        String where = " WHERE v.status = 'aberta' AND v.prazo_inscricao >= ?";
        args.add(Date.valueOf(LocalDate.now()));

        if (busca != null) {
            where += " AND (v.titulo LIKE ? OR v.descricao LIKE ? OR v.requisitos LIKE ? OR e.razao_social LIKE ?)";
            String padrao = Textos.paraLike(busca);
            args.add(padrao);
            args.add(padrao);
            args.add(padrao);
            args.add(padrao);
        }
        if (tipo != null) {
            where += " AND v.tipo = ?";
            args.add(tipo);
        }
        if (modalidade != null) {
            where += " AND v.modalidade = ?";
            args.add(modalidade);
        }
        if (area != null) {
            where += " AND v.id_vaga IN (SELECT id_vaga FROM vaga_area WHERE id_area = ?)";
            args.add(area);
        }
        return where;
    }

    // a vaga aceita inscrições se está "aberta" e o prazo ainda não passou
    private static boolean estaAberta(String status, LocalDate prazo) {
        return "aberta".equals(status) && !prazo.isBefore(LocalDate.now());
    }

    private static List<String> separarAreas(String areas) {
        if (areas == null || areas.isBlank()) return List.of();
        return List.of(areas.split("\\|"));
    }
}
