package com.conectin.seguranca;

import org.springframework.security.oauth2.jwt.Jwt;

public final class UsuarioLogado {

    private UsuarioLogado() {
    }

    public static int id(Jwt jwt) {
        return Integer.parseInt(jwt.getSubject());
    }

    public static Integer candidatoOuNulo(Jwt jwt) {
        if (jwt == null || !"CANDIDATO".equals(jwt.getClaimAsString("papel"))) {
            return null;
        }
        return id(jwt);
    }
}
