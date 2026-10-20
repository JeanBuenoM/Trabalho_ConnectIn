package com.conectin.model;

import java.time.LocalDate;
import java.util.List;

/** Vaga como aparece na listagem (RF04). */
public record VagaResumo(
        int id,
        String titulo,
        String descricao,
        String requisitos,
        String tipo,
        String modalidade,
        LocalDate prazoInscricao,
        String empresa,
        List<String> areas) {
}
