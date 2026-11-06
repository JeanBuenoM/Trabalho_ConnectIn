package com.conectin.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conectin.model.CadastroRequest;
import com.conectin.model.UsuarioResposta;
import com.conectin.seguranca.UsuarioLogado;
import com.conectin.service.UsuarioService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> cadastrar(@RequestBody(required = false) CadastroRequest pedido) {
        return usuarioService.cadastrar(pedido);
    }

    @PostMapping("/login")
    public Map<String, Object> entrar(@RequestBody(required = false) CadastroRequest pedido) {
        return usuarioService.entrar(pedido);
    }

    @GetMapping("/eu")
    public UsuarioResposta eu(@AuthenticationPrincipal Jwt jwt) {
        return usuarioService.usuarioLogado(UsuarioLogado.id(jwt));
    }
}
