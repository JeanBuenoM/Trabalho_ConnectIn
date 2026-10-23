package com.conectin.model;

public record CadastroRequest(String tipo, String nome, String email, String senha, String cnpjOuCodigo,
        String tipoInstituicao) {
}
