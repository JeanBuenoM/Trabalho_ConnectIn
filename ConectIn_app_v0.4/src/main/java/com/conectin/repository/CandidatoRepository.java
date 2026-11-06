package com.conectin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.conectin.model.Candidato;

@Repository
public class CandidatoRepository {

    private final JdbcTemplate jdbc;

    public CandidatoRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void inserir(int idUsuario) {
        jdbc.update("INSERT INTO candidato (id_usuario) VALUES (?)", idUsuario);
    }

    public Optional<Candidato> buscar(int id) {
        return jdbc.query("""
                SELECT u.id_usuario, u.nome, u.email, u.telefone, u.foto_url, c.formacao_academica, c.instituicao,
                       c.status_formacao, c.ano_conclusao, c.area_interesse, c.sobre, c.sem_experiencia
                FROM candidato c JOIN usuario u ON u.id_usuario = c.id_usuario
                WHERE c.id_usuario = ?
                """,
                (rs, n) -> new Candidato(rs.getInt("id_usuario"), rs.getString("nome"), rs.getString("email"),
                        rs.getString("telefone"), rs.getString("foto_url"), rs.getString("formacao_academica"),
                        rs.getString("instituicao"), rs.getString("status_formacao"), rs.getObject("ano_conclusao", Integer.class),
                        rs.getString("area_interesse"), rs.getString("sobre"), rs.getBoolean("sem_experiencia"),
                        List.of(), null, rs.getString("foto_url") != null, 0),
                id).stream().findFirst();
    }

    public void atualizar(int id, String curso, String instituicao, String statusFormacao, Integer anoConclusao,
                          String areaInteresse, String sobre, boolean semExperiencia) {
        jdbc.update("""
                UPDATE candidato SET formacao_academica = ?, instituicao = ?, status_formacao = ?, ano_conclusao = ?,
                       area_interesse = ?, sobre = ?, sem_experiencia = ?
                WHERE id_usuario = ?
                """, curso, instituicao, statusFormacao, anoConclusao, areaInteresse, sobre, semExperiencia, id);
    }

    public void marcarSemExperiencia(int id, boolean semExperiencia) {
        jdbc.update("UPDATE candidato SET sem_experiencia = ? WHERE id_usuario = ?", semExperiencia, id);
    }

    public List<String> habilidades(int id) {
        return jdbc.queryForList("SELECT nome FROM habilidade_candidato WHERE id_candidato = ? ORDER BY nome", String.class, id);
    }

    public void substituirHabilidades(int id, List<String> habilidades) {
        jdbc.update("DELETE FROM habilidade_candidato WHERE id_candidato = ?", id);
        jdbc.batchUpdate("INSERT INTO habilidade_candidato (id_candidato, nome) VALUES (?, ?)",
                habilidades.stream().map(h -> new Object[] {id, h}).toList());
    }
}
