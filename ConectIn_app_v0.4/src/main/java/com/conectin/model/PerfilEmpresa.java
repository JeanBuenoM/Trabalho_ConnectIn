package com.conectin.model;

public record PerfilEmpresa(int id, String nome, String email, String telefone, String cnpjOuCodigo,
        String tipoInstituicao, String descricao, boolean temFoto) {

    public static PerfilEmpresa de(EmpregadorRegistro e) {
        return new PerfilEmpresa(e.id(), e.nome(), e.email(), e.telefone(), e.cnpjOuCodigo(),
                e.tipoInstituicao(), e.descricao(), e.fotoUrl() != null);
    }
}
