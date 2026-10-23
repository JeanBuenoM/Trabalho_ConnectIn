package com.conectin.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.conectin.model.CurriculoRegistro;

@Repository
public class CurriculoRepository {

    private final JdbcTemplate jdbc;

    public CurriculoRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public Optional<CurriculoRegistro> buscar(int idCandidato) {
        return jdbc.query("SELECT arquivo_url, nome_arquivo, tamanho_bytes, data_atualizacao FROM curriculo WHERE id_candidato = ?",
                (rs, n) -> new CurriculoRegistro(rs.getString("arquivo_url"),
                        rs.getString("nome_arquivo") == null ? "curriculo.pdf" : rs.getString("nome_arquivo"),
                        rs.getLong("tamanho_bytes"), rs.getObject("data_atualizacao", LocalDateTime.class)),
                idCandidato).stream().findFirst();
    }

    public void salvar(int idCandidato, String arquivoUrl, String nomeArquivo, long tamanhoBytes) {
        jdbc.update("""
                INSERT INTO curriculo (id_candidato, arquivo_url, nome_arquivo, tamanho_bytes, data_atualizacao) VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE arquivo_url = VALUES(arquivo_url), nome_arquivo = VALUES(nome_arquivo),
                                        tamanho_bytes = VALUES(tamanho_bytes), data_atualizacao = VALUES(data_atualizacao)
                """, idCandidato, arquivoUrl, nomeArquivo, tamanhoBytes, LocalDateTime.now());
    }

    public void remover(int idCandidato) {
        jdbc.update("DELETE FROM curriculo WHERE id_candidato = ?", idCandidato);
    }
}
