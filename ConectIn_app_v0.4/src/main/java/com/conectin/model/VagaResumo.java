package com.conectin.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record VagaResumo(int id, String titulo, String descricao, String requisitos, String tipo,
        String modalidade, LocalDate prazoInscricao, LocalDateTime dataPublicacao, int idEmpresa,
        String empresa, List<String> areas) {
}
