package com.conectin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.conectin.erro.ErroApi;
import com.conectin.model.Notificacao;
import com.conectin.repository.NotificacaoRepository;
import com.conectin.seguranca.UsuarioLogado;
import com.conectin.service.FotoService;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    private final NotificacaoRepository notificacoes;
    private final FotoService fotos;

    public UsuarioController(NotificacaoRepository notificacoes, FotoService fotos) {
        this.notificacoes = notificacoes;
        this.fotos = fotos;
    }

    @GetMapping("/notificacoes")
    public List<Notificacao> notificacoes(@AuthenticationPrincipal Jwt jwt) {
        return notificacoes.listar(UsuarioLogado.id(jwt), 50);
    }

    @GetMapping("/notificacoes/nao-lidas")
    public Map<String, Integer> naoLidas(@AuthenticationPrincipal Jwt jwt) {
        return Map.of("total", notificacoes.contarNaoLidas(UsuarioLogado.id(jwt)));
    }

    @PostMapping("/notificacoes/{id}/lida")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void marcarLida(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id) {
        if (!notificacoes.marcarLida(id, UsuarioLogado.id(jwt))) throw ErroApi.naoEncontrado("Notificação não encontrada.");
    }

    @PostMapping("/notificacoes/marcar-todas")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void marcarTodas(@AuthenticationPrincipal Jwt jwt) {
        notificacoes.marcarTodasLidas(UsuarioLogado.id(jwt));
    }

    @PostMapping("/usuario/foto")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void enviarFoto(@AuthenticationPrincipal Jwt jwt, @RequestParam("arquivo") MultipartFile arquivo) {
        fotos.enviar(UsuarioLogado.id(jwt), arquivo);
    }

    @DeleteMapping("/usuario/foto")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerFoto(@AuthenticationPrincipal Jwt jwt) {
        fotos.remover(UsuarioLogado.id(jwt));
    }

    @GetMapping("/usuarios/{id}/foto")
    public ResponseEntity<Resource> foto(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id) {
        return Arquivos.resposta(fotos.foto(UsuarioLogado.id(jwt), id));
    }
}
