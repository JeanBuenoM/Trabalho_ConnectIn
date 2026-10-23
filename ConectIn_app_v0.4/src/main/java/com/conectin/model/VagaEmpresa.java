package com.conectin.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record VagaEmpresa(int id, String titulo, String tipo, String modalidade, LocalDate prazoInscricao,
        LocalDateTime dataPublicacao, String status, boolean inscricoesAbertas, List<String> areas,
        int candidaturas, int emAnalise) {
}
