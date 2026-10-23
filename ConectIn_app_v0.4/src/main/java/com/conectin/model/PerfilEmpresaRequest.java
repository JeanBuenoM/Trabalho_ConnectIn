package com.conectin.model;

public record PerfilEmpresaRequest(String nome, String email, String telefone, String cnpjOuCodigo,
        String tipoInstituicao, String descricao) {
}
