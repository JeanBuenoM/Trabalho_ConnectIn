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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.conectin.model.CandidaturaDetalhe;
import com.conectin.model.CandidaturaRecebida;
import com.conectin.model.PainelEmpresa;
import com.conectin.model.PerfilEmpresa;
import com.conectin.model.PerfilEmpresaRequest;
import com.conectin.model.StatusRequest;
import com.conectin.model.VagaDetalhe;
import com.conectin.model.VagaEmpresa;
import com.conectin.model.VagaRequest;
import com.conectin.seguranca.UsuarioLogado;
import com.conectin.service.CandidaturaService;
import com.conectin.service.EmpresaService;
import com.conectin.service.VagaService;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaController {

    private final EmpresaService empresas;
    private final VagaService vagas;
    private final CandidaturaService candidaturas;

    public EmpresaController(EmpresaService empresas, VagaService vagas, CandidaturaService candidaturas) {
        this.empresas = empresas;
        this.vagas = vagas;
        this.candidaturas = candidaturas;
    }

    @GetMapping("/painel")
    public PainelEmpresa painel(@AuthenticationPrincipal Jwt jwt) {
        return vagas.painel(UsuarioLogado.id(jwt));
    }

    @GetMapping("/perfil")
    public PerfilEmpresa perfil(@AuthenticationPrincipal Jwt jwt) {
        return empresas.perfil(UsuarioLogado.id(jwt));
    }

    @PutMapping("/perfil")
    public PerfilEmpresa atualizarPerfil(@AuthenticationPrincipal Jwt jwt, @RequestBody(required = false) PerfilEmpresaRequest pedido) {
        return empresas.atualizar(UsuarioLogado.id(jwt), pedido);
    }

    @GetMapping("/vagas")
    public List<VagaEmpresa> minhasVagas(@AuthenticationPrincipal Jwt jwt) {
        return vagas.listarDoEmpregador(UsuarioLogado.id(jwt));
    }

    @PostMapping("/vagas")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> publicar(@AuthenticationPrincipal Jwt jwt, @RequestBody(required = false) VagaRequest pedido) {
        return Map.of("id", vagas.publicar(UsuarioLogado.id(jwt), pedido), "mensagem", "Vaga publicada com sucesso.");
    }

    @GetMapping("/vagas/{id}")
    public VagaDetalhe vaga(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id) {
        return vagas.detalheDoEmpregador(UsuarioLogado.id(jwt), id);
    }

    @PutMapping("/vagas/{id}")
    public VagaDetalhe editar(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id, @RequestBody(required = false) VagaRequest pedido) {
        return vagas.editar(UsuarioLogado.id(jwt), id, pedido);
    }

    @PostMapping("/vagas/{id}/encerrar")
    public VagaDetalhe encerrar(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id) {
        return vagas.mudarStatus(UsuarioLogado.id(jwt), id, "encerrada");
    }

    @PostMapping("/vagas/{id}/reabrir")
    public VagaDetalhe reabrir(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id) {
        return vagas.mudarStatus(UsuarioLogado.id(jwt), id, "aberta");
    }

    @DeleteMapping("/vagas/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id) {
        vagas.remover(UsuarioLogado.id(jwt), id);
    }

    @GetMapping("/candidaturas")
    public List<CandidaturaRecebida> candidaturas(@AuthenticationPrincipal Jwt jwt, @RequestParam(required = false) Integer vaga,
            @RequestParam(required = false) String status, @RequestParam(required = false) String busca) {
        return candidaturas.recebidas(UsuarioLogado.id(jwt), vaga, status, busca);
    }

    @GetMapping("/candidaturas/{id}")
    public CandidaturaDetalhe candidatura(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id) {
        return candidaturas.detalheParaEmpregador(UsuarioLogado.id(jwt), id);
    }

    @GetMapping("/candidaturas/{id}/curriculo")
    public ResponseEntity<Resource> curriculo(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id) {
        return Arquivos.resposta(candidaturas.curriculoParaEmpregador(UsuarioLogado.id(jwt), id));
    }

    @PutMapping("/candidaturas/{id}/status")
    public CandidaturaDetalhe avaliar(@AuthenticationPrincipal Jwt jwt, @PathVariable("id") int id,
            @RequestBody(required = false) StatusRequest pedido) {
        return candidaturas.avaliar(UsuarioLogado.id(jwt), id, pedido == null ? null : pedido.status());
    }
}
