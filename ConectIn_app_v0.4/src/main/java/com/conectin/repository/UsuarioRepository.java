package com.conectin.repository;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import com.conectin.model.Usuario;

@Repository
public class UsuarioRepository {

    private static final String SELECT = "SELECT id_usuario, nome, email, senha_hash, tipo_usuario, telefone, foto_url, data_cadastro FROM usuario";

    private static final RowMapper<Usuario> MAPA = (rs, n) -> new Usuario(rs.getInt("id_usuario"), rs.getString("nome"),
            rs.getString("email"), rs.getString("senha_hash"), rs.getString("tipo_usuario"), rs.getString("telefone"),
            rs.getString("foto_url"), rs.getObject("data_cadastro", LocalDateTime.class));

    private final JdbcTemplate jdbc;
    private final SimpleJdbcInsert insert;

    public UsuarioRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
        this.insert = new SimpleJdbcInsert(jdbc).withTableName("usuario")
                .usingColumns("nome", "email", "senha_hash", "tipo_usuario").usingGeneratedKeyColumns("id_usuario");
    }

    public Optional<Usuario> buscarPorId(int id) {
        return jdbc.query(SELECT + " WHERE id_usuario = ?", MAPA, id).stream().findFirst();
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return jdbc.query(SELECT + " WHERE email = ?", MAPA, email).stream().findFirst();
    }

    public boolean emailEmUso(String email, Integer idIgnorado) {
        Integer total = jdbc.queryForObject("SELECT COUNT(*) FROM usuario WHERE email = ? AND id_usuario <> ?",
                Integer.class, email, idIgnorado == null ? -1 : idIgnorado);
        return total != null && total > 0;
    }

    public int inserir(String nome, String email, String senhaHash, String tipo) {
        return insert.executeAndReturnKey(Map.of("nome", nome, "email", email, "senha_hash", senhaHash, "tipo_usuario", tipo)).intValue();
    }

    public void atualizarContato(int id, String nome, String email, String telefone) {
        jdbc.update("UPDATE usuario SET nome = ?, email = ?, telefone = ? WHERE id_usuario = ?", nome, email, telefone, id);
    }

    public void atualizarFoto(int id, String fotoUrl) {
        jdbc.update("UPDATE usuario SET foto_url = ? WHERE id_usuario = ?", fotoUrl, id);
    }

    public int contarPorTipo(String tipo) {
        Integer total = jdbc.queryForObject("SELECT COUNT(*) FROM usuario WHERE tipo_usuario = ?", Integer.class, tipo);
        return total == null ? 0 : total;
    }
}
