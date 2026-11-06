package com.conectin.model;

// Dados da empresa ou instituição (tabelas usuario + empregador).
// Também é usado para receber os dados quando a empresa edita o perfil.
public record Empresa(int id, String nome, String email, String telefone, String fotoUrl,
        String cnpjOuCodigo, String tipoInstituicao, String descricao, boolean temFoto) {
}
