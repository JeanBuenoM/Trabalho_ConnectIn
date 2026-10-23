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

import com.conectin.model.FiltroVagas;
import com.conectin.model.Pagina;
import com.conectin.model.VagaEmpresa;
import com.conectin.model.VagaRegistro;
import com.conectin.model.VagaResumo;
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

    public Optional<VagaRegistro> buscarPorId(int idVaga) {
        return jdbc.query("""
                SELECT v.*, e.razao_social, e.tipo_instituicao, e.descricao AS descricao_empresa
                FROM vaga v JOIN empregador e ON e.id_usuario = v.id_empregador
                WHERE v.id_vaga = ?
                """,
                (rs, n) -> new VagaRegistro(rs.getInt("id_vaga"), rs.getInt("id_empregador"), rs.getString("titulo"),
                        rs.getString("descricao"), rs.getString("requisitos"), rs.getString("tipo"), rs.getString("modalidade"),
                        rs.getDate("prazo_inscricao").toLocalDate(), rs.getObject("data_publicacao", LocalDateTime.class),
                        rs.getString("status"), rs.getString("razao_social"), rs.getString("tipo_instituicao"),
                        rs.getString("descricao_empresa")),
                idVaga).stream().findFirst();
    }

    public Pagina<VagaResumo> listarAbertas(FiltroVagas f) {
        StringBuilder where = new StringBuilder(" WHERE v.status = 'aberta' AND v.prazo_inscricao >= ?");
        List<Object> args = new ArrayList<>(List.of(Date.valueOf(LocalDate.now())));
        if (f.busca() != null) {
            where.append(" AND (v.titulo LIKE ? OR v.descricao LIKE ? OR v.requisitos LIKE ? OR e.razao_social LIKE ?)");
            String padrao = Textos.paraLike(f.busca());
            args.addAll(List.of(padrao, padrao, padrao, padrao));
        }
        if (f.tipo() != null) {
            where.append(" AND v.tipo = ?");
            args.add(f.tipo());
        }
        if (f.modalidade() != null) {
            where.append(" AND v.modalidade = ?");
            args.add(f.modalidade());
        }
        if (f.area() != null) {
            where.append(" AND v.id_vaga IN (SELECT id_vaga FROM vaga_area WHERE id_area = ?)");
            args.add(f.area());
        }

        String origem = " FROM vaga v JOIN empregador e ON e.id_usuario = v.id_empregador" + where;
        Integer total = jdbc.queryForObject("SELECT COUNT(*)" + origem, Integer.class, args.toArray());
        String ordem = "prazo".equals(f.ordem())
                ? " ORDER BY v.prazo_inscricao ASC, v.id_vaga DESC"
                : " ORDER BY v.data_publicacao DESC, v.id_vaga DESC";
        args.add(f.tamanho());
        args.add(f.pagina() * f.tamanho());

        List<VagaResumo> itens = jdbc.query("""
                SELECT v.id_vaga, v.titulo, v.descricao, v.requisitos, v.tipo, v.modalidade, v.prazo_inscricao,
                       v.data_publicacao, v.id_empregador, e.razao_social AS empresa,
                """ + AREAS_DA_VAGA + origem + ordem + " LIMIT ? OFFSET ?",
                (rs, n) -> new VagaResumo(rs.getInt("id_vaga"), rs.getString("titulo"), rs.getString("descricao"),
                        rs.getString("requisitos"), rs.getString("tipo"), rs.getString("modalidade"),
                        rs.getDate("prazo_inscricao").toLocalDate(), rs.getObject("data_publicacao", LocalDateTime.class),
                        rs.getInt("id_empregador"), rs.getString("empresa"), separarAreas(rs.getString("areas"))),
                args.toArray());
        return new Pagina<>(itens, total == null ? 0 : total, f.pagina(), f.tamanho());
    }

    public List<VagaEmpresa> listarDoEmpregador(int idEmpregador) {
        LocalDate hoje = LocalDate.now();
        return jdbc.query("""
                SELECT v.id_vaga, v.titulo, v.tipo, v.modalidade, v.prazo_inscricao, v.data_publicacao, v.status,
                       (SELECT COUNT(*) FROM candidatura c WHERE c.id_vaga = v.id_vaga) AS total_candidaturas,
                       (SELECT COUNT(*) FROM candidatura c WHERE c.id_vaga = v.id_vaga AND c.status = 'analise') AS em_analise,
                """ + AREAS_DA_VAGA + """
                FROM vaga v WHERE v.id_empregador = ? ORDER BY v.data_publicacao DESC, v.id_vaga DESC
                """,
                (rs, n) -> {
                    LocalDate prazo = rs.getDate("prazo_inscricao").toLocalDate();
                    String status = rs.getString("status");
                    return new VagaEmpresa(rs.getInt("id_vaga"), rs.getString("titulo"), rs.getString("tipo"),
                            rs.getString("modalidade"), prazo, rs.getObject("data_publicacao", LocalDateTime.class), status,
                            "aberta".equals(status) && !prazo.isBefore(hoje), separarAreas(rs.getString("areas")),
                            rs.getInt("total_candidaturas"), rs.getInt("em_analise"));
                },
                idEmpregador);
    }

    public int contarAbertas() {
        Integer total = jdbc.queryForObject("SELECT COUNT(*) FROM vaga WHERE status = 'aberta' AND prazo_inscricao >= ?",
                Integer.class, Date.valueOf(LocalDate.now()));
        return total == null ? 0 : total;
    }

    private static List<String> separarAreas(String areas) {
        return areas == null || areas.isBlank() ? List.of() : List.of(areas.split("\\|"));
    }
}
