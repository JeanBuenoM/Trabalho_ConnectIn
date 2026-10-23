package com.conectin.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record VagaDetalhe(int id, String titulo, String descricao, String requisitos, String tipo,
        String modalidade, LocalDate prazoInscricao, LocalDateTime dataPublicacao, String status,
        boolean inscricoesAbertas, int idEmpresa, String empresa, String tipoInstituicao,
        String descricaoEmpresa, List<AreaAtuacao> areas, Integer idCandidatura, String statusCandidatura) {
}
