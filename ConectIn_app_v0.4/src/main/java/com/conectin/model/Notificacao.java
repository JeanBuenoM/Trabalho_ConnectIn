package com.conectin.model;

import java.time.LocalDateTime;

public record Notificacao(int id, String tipo, String mensagem, LocalDateTime dataEnvio, boolean lida,
        Integer idReferencia) {
}
