package com.conectin.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import com.conectin.model.CandidaturaDoCandidato;
import com.conectin.model.Candidatura;
import com.conectin.util.Textos;

@Repository
public class CandidaturaRepository {

    private static final String SELECT_REGISTRO = """
            SELECT c.id_candidatura, c.id_candidato, c.id_vaga, v.titulo, v.tipo, c.status, c.data_candidatura
            FROM candidatura c JOIN vaga v ON v.id_vaga = c.id_vaga
            """;

    private static final RowMapper<Candidatura> MAPA = (rs, n) -> new Candidatura(rs.getInt("id_candidatura"), rs.getInt("id_vaga"),
            rs.getString("titulo"), rs.getString("tipo"), rs.getInt("id_candidato"), null, null, null, List.of(),
            false, false, false, rs.getString("status"), rs.getObject("data_candidatura", LocalDateTime.class), null);

    private final JdbcTemplate jdbc;
    private final SimpleJdbcInsert insert;

    public CandidaturaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
        this.insert = new SimpleJdbcInsert(jdbc).withTableName("candidatura")
                .usingColumns("id_candidato", "id_vaga").usingGeneratedKeyColumns("id_candidatura");
    }

    public int inserir(int idCandidato, int idVaga) {
        return insert.executeAndReturnKey(Map.of("id_candidato", idCandidato, "id_vaga", idVaga)).intValue();
    }

    public Optional<Candidatura> buscarDoCandidato(int idCandidato, int idVaga) {
        return jdbc.query(SELECT_REGISTRO + " WHERE c.id_candidato = ? AND c.id_vaga = ?", MAPA, idCandidato, idVaga).stream().findFirst();
    }

    public Optional<Candidatura> buscarParaEmpregador(int idCandidatura, int idEmpregador) {
        return jdbc.query(SELECT_REGISTRO + " WHERE c.id_candidatura = ? AND v.id_empregador = ?", MAPA, idCandidatura, idEmpregador)
                .stream().findFirst();
    }

    public List<CandidaturaDoCandidato> listarDoCandidato(int idCandidato) {
        return jdbc.query("""
                SELECT c.id_candidatura, c.id_vaga, v.titulo, v.id_empregador, e.razao_social, v.tipo, c.data_candidatura, c.status
                FROM candidatura c
                JOIN vaga v ON v.id_vaga = c.id_vaga
                JOIN empregador e ON e.id_usuario = v.id_empregador
                WHERE c.id_candidato = ?
                ORDER BY c.data_candidatura DESC, c.id_candidatura DESC
                """,
                (rs, n) -> new CandidaturaDoCandidato(rs.getInt("id_candidatura"), rs.getInt("id_vaga"), rs.getString("titulo"),
                        rs.getInt("id_empregador"), rs.getString("razao_social"), rs.getString("tipo"),
                        rs.getObject("data_candidatura", LocalDateTime.class), rs.getString("status")),
                idCandidato);
    }

    // candidaturas que a empresa recebeu (lista de candidatos)
    public List<Candidatura> listarDoEmpregador(int idEmpregador, Integer idVaga, String status, String busca) {
        StringBuilder sql = new StringBuilder("""
                SELECT c.id_candidatura, c.id_vaga, v.titulo, v.tipo, c.id_candidato, u.nome, ca.formacao_academica,
                       ca.instituicao, ca.sem_experiencia, (cu.id_curriculo IS NOT NULL) AS tem_curriculo,
                       (u.foto_url IS NOT NULL) AS tem_foto, c.status, c.data_candidatura
                FROM candidatura c
                JOIN vaga v ON v.id_vaga = c.id_vaga
                JOIN candidato ca ON ca.id_usuario = c.id_candidato
                JOIN usuario u ON u.id_usuario = c.id_candidato
                LEFT JOIN curriculo cu ON cu.id_candidato = c.id_candidato
                WHERE v.id_empregador = ?
                """);
        List<Object> args = new ArrayList<>(List.of(idEmpregador));
        if (idVaga != null) {
            sql.append(" AND c.id_vaga = ?");
            args.add(idVaga);
        }
        if (status != null) {
            sql.append(" AND c.status = ?");
            args.add(status);
        }
        if (busca != null) {
            sql.append(" AND u.nome LIKE ?");
            args.add(Textos.paraLike(busca));
        }
        sql.append(" ORDER BY c.data_candidatura DESC, c.id_candidatura DESC");

        return jdbc.query(sql.toString(),
                (rs, n) -> new Candidatura(rs.getInt("id_candidatura"), rs.getInt("id_vaga"), rs.getString("titulo"),
                        rs.getString("tipo"), rs.getInt("id_candidato"), rs.getString("nome"), rs.getString("formacao_academica"),
                        rs.getString("instituicao"), habilidadesDo(rs.getInt("id_candidato")), rs.getBoolean("sem_experiencia"),
                        rs.getBoolean("tem_curriculo"), rs.getBoolean("tem_foto"), rs.getString("status"),
                        rs.getObject("data_candidatura", LocalDateTime.class), null),
                args.toArray());
    }

    // habilidades de um candidato (aparecem na lista de candidatos da empresa)
    private List<String> habilidadesDo(int idCandidato) {
        return jdbc.queryForList("SELECT nome FROM habilidade_candidato WHERE id_candidato = ? ORDER BY nome", String.class, idCandidato);
    }

    public void atualizarStatus(int idCandidatura, String status) {
        jdbc.update("UPDATE candidatura SET status = ?, data_atualizacao = ? WHERE id_candidatura = ?", status, LocalDateTime.now(), idCandidatura);
    }

    public boolean candidatoSeInscreveuComEmpregador(int idCandidato, int idEmpregador) {
        Integer total = jdbc.queryForObject("""
                SELECT COUNT(*) FROM candidatura c JOIN vaga v ON v.id_vaga = c.id_vaga
                WHERE c.id_candidato = ? AND v.id_empregador = ?
                """, Integer.class, idCandidato, idEmpregador);
        return total != null && total > 0;
    }

    public List<Integer> candidatosDaVaga(int idVaga) {
        return jdbc.queryForList("SELECT id_candidato FROM candidatura WHERE id_vaga = ?", Integer.class, idVaga);
    }

    // total, recebidas desde a data e aprovadas
    public int[] contagensDoEmpregador(int idEmpregador, LocalDateTime desde) {
        return jdbc.queryForObject("""
                SELECT COUNT(*) AS total, COALESCE(SUM(c.data_candidatura >= ?), 0) AS recentes,
                       COALESCE(SUM(c.status = 'aprovado'), 0) AS aprovados
                FROM candidatura c JOIN vaga v ON v.id_vaga = c.id_vaga
                WHERE v.id_empregador = ?
                """,
                (rs, n) -> new int[] {rs.getInt("total"), rs.getInt("recentes"), rs.getInt("aprovados")},
                desde, idEmpregador);
    }
}
