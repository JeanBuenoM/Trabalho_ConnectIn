package com.conectin.model;

import java.util.List;

/**
 * Dados enviados pela tela de publicação de vaga (RF03).
 * O prazo chega como texto (AAAA-MM-DD) para que o serviço possa devolver uma mensagem
 * clara quando ele estiver vazio (RN01) ou inválido.
 */
public record VagaRequest(
        String titulo,
        String descricao,
        String requisitos,
        String tipo,
        String modalidade,
        String prazoInscricao,
        List<Integer> areas) {
}
