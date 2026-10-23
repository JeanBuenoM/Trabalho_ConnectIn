package com.conectin.model;

import java.time.LocalDateTime;

public record Usuario(int id, String nome, String email, String senhaHash, String tipo, String telefone,
        String fotoUrl, LocalDateTime dataCadastro) {
}
