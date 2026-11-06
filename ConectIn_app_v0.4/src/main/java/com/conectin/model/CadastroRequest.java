package com.conectin.model;

// Dados enviados no cadastro. No login só vêm o email e a senha (os outros campos ficam vazios).
public record CadastroRequest(String tipo, String nome, String email, String senha, String cnpjOuCodigo,
        String tipoInstituicao) {
}
