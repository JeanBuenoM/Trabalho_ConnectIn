package com.conectin.repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import com.conectin.model.CandidatoRegistro;

@Repository
public class CandidatoRepository {

    private final JdbcTemplate jdbc;

    public CandidatoRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void inserir(int idUsuario) {
        jdbc.update("INSERT INTO candidato (id_usuario) VALUES (?)", idUsuario);
    }

    public Optional<CandidatoRegistro> buscar(int id) {
        return jdbc.query("""
                SELECT u.id_usuario, u.nome, u.email, u.telefone, u.foto_url, c.formacao_academica, c.instituicao,
                       c.status_formacao, c.ano_conclusao, c.area_interesse, c.sobre, c.sem_experiencia
                FROM candidato c JOIN usuario u ON u.id_usuario = c.id_usuario
                WHERE c.id_usuario = ?
                """,
                (rs, n) -> new CandidatoRegistro(rs.getInt("id_usuario"), rs.getString("nome"), rs.getString("email"),
                        rs.getString("telefone"), rs.getString("foto_url"), rs.getString("formacao_academica"),
                        rs.getString("instituicao"), rs.getString("status_formacao"), rs.getObject("ano_conclusao", Integer.class),
                        rs.getString("area_interesse"), rs.getString("sobre"), rs.getBoolean("sem_experiencia")),
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

    public Map<Integer, List<String>> habilidadesDe(Collection<Integer> ids) {
        Map<Integer, List<String>> resultado = new HashMap<>();
        if (ids.isEmpty()) return resultado;
        String marcadores = String.join(",", Collections.nCopies(ids.size(), "?"));
        jdbc.query("SELECT id_candidato, nome FROM habilidade_candidato WHERE id_candidato IN (" + marcadores + ") ORDER BY nome",
                (RowCallbackHandler) rs -> resultado.computeIfAbsent(rs.getInt("id_candidato"), k -> new ArrayList<>()).add(rs.getString("nome")),
                ids.toArray());
        return resultado;
    }
}
