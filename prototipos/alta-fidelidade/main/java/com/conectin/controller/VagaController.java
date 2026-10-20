package com.conectin.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.conectin.model.AreaAtuacao;
import com.conectin.model.VagaRequest;
import com.conectin.model.VagaResumo;
import com.conectin.service.VagaService;

/** Recebe as requisições das telas e repassa para o service. Não tem regra de negócio. */
@RestController
@RequestMapping("/api")
public class VagaController {

    private final VagaService vagaService;

    public VagaController(VagaService vagaService) {
        this.vagaService = vagaService;
    }

    /** RF03: publicar vaga. Devolve 201 quando salva e 400 (ver TratadorDeErros) quando recusada. */
    @PostMapping("/vagas")
    public ResponseEntity<Map<String, Object>> publicar(@RequestBody VagaRequest pedido) {
        int id = vagaService.publicar(pedido);
        Map<String, Object> corpo = new LinkedHashMap<>();
        corpo.put("id", id);
        corpo.put("mensagem", "Vaga publicada com sucesso.");
        return ResponseEntity.status(HttpStatus.CREATED).body(corpo);
    }

    /** RF04: lista as vagas abertas, com filtros opcionais. */
    @GetMapping("/vagas")
    public List<VagaResumo> listar(
            @RequestParam(name = "tipo", required = false) String tipo,
            @RequestParam(name = "modalidade", required = false) String modalidade,
            @RequestParam(name = "area", required = false) Integer area) {
        return vagaService.listarAbertas(tipo, modalidade, area);
    }

    /** Áreas de atuação, para montar a escolha na publicação e o filtro na listagem. */
    @GetMapping("/areas")
    public List<AreaAtuacao> areas() {
        return vagaService.listarAreas();
    }
}
