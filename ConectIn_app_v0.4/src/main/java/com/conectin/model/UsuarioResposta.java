package com.conectin.model;

public record UsuarioResposta(int id, String nome, String email, String tipo, String telefone,
        boolean temFoto) {

    public static UsuarioResposta de(Usuario usuario) {
        return new UsuarioResposta(usuario.id(), usuario.nome(), usuario.email(), usuario.tipo(),
                usuario.telefone(), usuario.fotoUrl() != null);
    }
}
