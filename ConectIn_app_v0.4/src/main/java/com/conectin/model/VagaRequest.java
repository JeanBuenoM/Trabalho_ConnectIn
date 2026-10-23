package com.conectin.model;

import java.util.List;

public record VagaRequest(String titulo, String descricao, String requisitos, String tipo, String modalidade,
        String prazoInscricao, List<Integer> areas) {
}
