package com.conectin.model;

public record EmpregadorRegistro(int id, String nome, String email, String telefone, String fotoUrl,
        String cnpjOuCodigo, String tipoInstituicao, String descricao) {
}
