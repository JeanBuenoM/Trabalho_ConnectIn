package com.conectin.controller;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.conectin.model.CandidaturaDoCandidato;
import com.conectin.model.CandidaturaRequest;
import com.conectin.model.Candidato;
import com.conectin.model.Curriculo;
import com.conectin.model.PerfilCandidatoRequest;
import com.conectin.model.Vaga;
import com.conectin.seguranca.UsuarioLogado;
import com.conectin.service.CandidaturaService;
import com.conectin.service.UsuarioService;
import com.conectin.service.VagaService;

@RestController
@RequestMapping("/api/candidato")
public class CandidatoController {

    private final UsuarioService usuarioService;
    private final CandidaturaService candidaturas;
    private final VagaService vagas;

    public CandidatoController(UsuarioService usuarioService, CandidaturaService candidaturas, VagaService vagas) {
        this.usuarioService = usuarioService;
        this.candidaturas = candidaturas;
        this.vagas = vagas;
    }

    @GetMapping("/perfil")
    public Candidato perfil(@AuthenticationPrincipal Jwt jwt) {
        return usuarioService.perfilCandidato(UsuarioLogado.id(jwt));
    }

    @PutMapping("/perfil")
    public Candidato atualizar(@AuthenticationPrincipal Jwt jwt, @RequestBody(required = false) PerfilCandidatoRequest pedido) {
        return usuarioService.atualizarCandidato(UsuarioLogado.id(jwt), pedido);
    }

    @PostMapping("/curriculo")
    public Curriculo enviarCurriculo(@AuthenticationPrincipal Jwt jwt, @RequestParam("arquivo") MultipartFile arquivo) {
        return usuarioService.enviarCurriculo(UsuarioLogado.id(jwt), arquivo);
    }

    @GetMapping("/curriculo")
    public ResponseEntity<Resource> curriculo(@AuthenticationPrincipal Jwt jwt) {
        return Arquivos.resposta(usuarioService.curriculo(UsuarioLogado.id(jwt)));
    }

    @DeleteMapping("/curriculo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerCurriculo(@AuthenticationPrincipal Jwt jwt) {
        usuarioService.removerCurriculo(UsuarioLogado.id(jwt));
    }

    @GetMapping("/candidaturas")
    public List<CandidaturaDoCandidato> candidaturas(@AuthenticationPrincipal Jwt jwt) {
        return candidaturas.doCandidato(UsuarioLogado.id(jwt));
    }

    @PostMapping("/candidaturas")
    @ResponseStatus(HttpStatus.CREATED)
    public CandidaturaDoCandidato candidatar(@AuthenticationPrincipal Jwt jwt, @RequestBody(required = false) CandidaturaRequest pedido) {
        return candidaturas.candidatar(UsuarioLogado.id(jwt), pedido);
    }

    @GetMapping("/vagas-recomendadas")
    public List<Vaga> recomendadas(@AuthenticationPrincipal Jwt jwt, @RequestParam(defaultValue = "3") int limite) {
        return vagas.recomendadas(UsuarioLogado.id(jwt), limite);
    }
}
