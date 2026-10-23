package com.conectin.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.conectin.model.Notificacao;
import com.conectin.util.Textos;

@Repository
public class NotificacaoRepository {

    private static final String INSERT = "INSERT INTO notificacao (id_usuario, tipo, mensagem, data_envio, id_referencia) VALUES (?, ?, ?, ?, ?)";

    private final JdbcTemplate jdbc;

    public NotificacaoRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void criar(int idUsuario, String tipo, String mensagem, Integer idReferencia) {
        jdbc.update(INSERT, idUsuario, tipo, Textos.cortar(mensagem, 255), LocalDateTime.now(), idReferencia);
    }

    public void criarParaVarios(List<Integer> idsUsuarios, String tipo, String mensagem, Integer idReferencia) {
        String texto = Textos.cortar(mensagem, 255);
        LocalDateTime agora = LocalDateTime.now();
        jdbc.batchUpdate(INSERT, idsUsuarios.stream().map(id -> new Object[] {id, tipo, texto, agora, idReferencia}).toList());
    }

    // avisa candidatos com a area da vaga ou com alguma habilidade citada no titulo/requisitos
    public int notificarCandidatosCompativeis(int idVaga, String textoDaVaga, String mensagem) {
        return jdbc.update("""
                INSERT INTO notificacao (id_usuario, tipo, mensagem, data_envio, id_referencia)
                SELECT c.id_usuario, 'nova_vaga', ?, ?, ?
                FROM candidato c
                WHERE c.area_interesse IN (
                          SELECT a.nome FROM vaga_area va JOIN area_atuacao a ON a.id_area = va.id_area WHERE va.id_vaga = ?)
                   OR EXISTS (
                          SELECT 1 FROM habilidade_candidato h
                          WHERE h.id_candidato = c.id_usuario AND CHAR_LENGTH(h.nome) >= 2 AND LOCATE(LOWER(h.nome), LOWER(?)) > 0)
                """, Textos.cortar(mensagem, 255), LocalDateTime.now(), idVaga, idVaga, textoDaVaga);
    }

    public List<Notificacao> listar(int idUsuario, int limite) {
        return jdbc.query("""
                SELECT id_notificacao, tipo, mensagem, data_envio, lida, id_referencia
                FROM notificacao WHERE id_usuario = ? ORDER BY data_envio DESC, id_notificacao DESC LIMIT ?
                """,
                (rs, n) -> new Notificacao(rs.getInt("id_notificacao"), rs.getString("tipo"), rs.getString("mensagem"),
                        rs.getObject("data_envio", LocalDateTime.class), rs.getBoolean("lida"), rs.getObject("id_referencia", Integer.class)),
                idUsuario, limite);
    }

    public int contarNaoLidas(int idUsuario) {
        Integer total = jdbc.queryForObject("SELECT COUNT(*) FROM notificacao WHERE id_usuario = ? AND lida = FALSE", Integer.class, idUsuario);
        return total == null ? 0 : total;
    }

    public boolean marcarLida(int idNotificacao, int idUsuario) {
        return jdbc.update("UPDATE notificacao SET lida = TRUE WHERE id_notificacao = ? AND id_usuario = ?", idNotificacao, idUsuario) > 0;
    }

    public void marcarTodasLidas(int idUsuario) {
        jdbc.update("UPDATE notificacao SET lida = TRUE WHERE id_usuario = ? AND lida = FALSE", idUsuario);
    }
}
