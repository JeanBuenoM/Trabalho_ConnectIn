package com.conectin.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.conectin.model.AreaAtuacao;

@Repository
public class AreaRepository {

    private static final RowMapper<AreaAtuacao> MAPA = (rs, n) -> new AreaAtuacao(rs.getInt("id_area"), rs.getString("nome"));

    private final JdbcTemplate jdbc;

    public AreaRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<AreaAtuacao> listar() {
        return jdbc.query("SELECT id_area, nome FROM area_atuacao ORDER BY nome", MAPA);
    }

    public List<AreaAtuacao> daVaga(int idVaga) {
        return jdbc.query("""
                SELECT a.id_area, a.nome FROM vaga_area va JOIN area_atuacao a ON a.id_area = va.id_area
                WHERE va.id_vaga = ? ORDER BY a.nome
                """, MAPA, idVaga);
    }
}
