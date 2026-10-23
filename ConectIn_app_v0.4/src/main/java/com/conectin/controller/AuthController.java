package com.conectin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conectin.model.AuthResposta;
import com.conectin.model.CadastroRequest;
import com.conectin.model.LoginRequest;
import com.conectin.model.UsuarioResposta;
import com.conectin.seguranca.UsuarioLogado;
import com.conectin.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResposta cadastrar(@RequestBody(required = false) CadastroRequest pedido) {
        return auth.cadastrar(pedido);
    }

    @PostMapping("/login")
    public AuthResposta entrar(@RequestBody(required = false) LoginRequest pedido) {
        return auth.entrar(pedido);
    }

    @GetMapping("/eu")
    public UsuarioResposta eu(@AuthenticationPrincipal Jwt jwt) {
        return auth.usuarioLogado(UsuarioLogado.id(jwt));
    }
}
