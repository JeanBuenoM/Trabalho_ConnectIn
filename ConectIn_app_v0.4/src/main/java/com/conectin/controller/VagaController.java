package com.conectin.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conectin.model.AreaAtuacao;
import com.conectin.model.Estatisticas;
import com.conectin.model.Pagina;
import com.conectin.model.VagaDetalhe;
import com.conectin.model.VagaResumo;
import com.conectin.repository.AreaRepository;
import com.conectin.seguranca.UsuarioLogado;
import com.conectin.service.VagaService;

@RestController
@RequestMapping("/api")
public class VagaController {

    private final VagaService vagas;
    private final AreaRepository areas;

    public VagaController(VagaService vagas, AreaRepository areas) {
        this.vagas = vagas;
        this.areas = areas;
    }

    @GetMapping("/vagas")
    public Pagina<VagaResumo> listar(@RequestParam(required = false) String busca, @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String modalidade, @RequestParam(required = false) Integer area,
            @RequestParam(required = false) String ordem, @RequestParam(required = false) Integer pagina,
            @RequestParam(required = false) Integer tamanho) {
        return vagas.listarAbertas(busca, tipo, modalidade, area, ordem, pagina, tamanho);
    }

    @GetMapping("/vagas/{id}")
    public VagaDetalhe detalhe(@PathVariable("id") int id, @AuthenticationPrincipal Jwt jwt) {
        return vagas.detalhe(id, UsuarioLogado.candidatoOuNulo(jwt));
    }

    @GetMapping("/areas")
    public List<AreaAtuacao> areas() {
        return areas.listar();
    }

    @GetMapping("/estatisticas")
    public Estatisticas estatisticas() {
        return vagas.estatisticas();
    }
}
