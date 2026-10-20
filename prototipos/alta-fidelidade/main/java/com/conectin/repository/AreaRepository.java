package com.conectin.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.conectin.model.AreaAtuacao;

/** Acesso à tabela area_atuacao. */
@Repository
public class AreaRepository {

    private final JdbcTemplate jdbc;

    public AreaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<AreaAtuacao> listar() {
        return jdbc.query(
                "SELECT id_area, nome FROM area_atuacao ORDER BY nome",
                (rs, n) -> new AreaAtuacao(rs.getInt("id_area"), rs.getString("nome")));
    }
}
