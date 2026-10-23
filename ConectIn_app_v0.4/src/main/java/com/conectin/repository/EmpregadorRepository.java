package com.conectin.repository;

import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.conectin.model.EmpregadorRegistro;

@Repository
public class EmpregadorRepository {

    private final JdbcTemplate jdbc;

    public EmpregadorRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void inserir(int idUsuario, String razaoSocial, String cnpjOuCodigo, String tipoInstituicao) {
        jdbc.update("INSERT INTO empregador (id_usuario, razao_social, cnpj_ou_codigo, tipo_instituicao) VALUES (?, ?, ?, ?)",
                idUsuario, razaoSocial, cnpjOuCodigo, tipoInstituicao);
    }

    public Optional<EmpregadorRegistro> buscar(int id) {
        return jdbc.query("""
                SELECT u.id_usuario, e.razao_social, u.email, u.telefone, u.foto_url, e.cnpj_ou_codigo, e.tipo_instituicao, e.descricao
                FROM empregador e JOIN usuario u ON u.id_usuario = e.id_usuario
                WHERE e.id_usuario = ?
                """,
                (rs, n) -> new EmpregadorRegistro(rs.getInt("id_usuario"), rs.getString("razao_social"), rs.getString("email"),
                        rs.getString("telefone"), rs.getString("foto_url"), rs.getString("cnpj_ou_codigo"),
                        rs.getString("tipo_instituicao"), rs.getString("descricao")),
                id).stream().findFirst();
    }

    public void atualizar(int id, String razaoSocial, String cnpjOuCodigo, String tipoInstituicao, String descricao) {
        jdbc.update("UPDATE empregador SET razao_social = ?, cnpj_ou_codigo = ?, tipo_instituicao = ?, descricao = ? WHERE id_usuario = ?",
                razaoSocial, cnpjOuCodigo, tipoInstituicao, descricao, id);
    }
}
