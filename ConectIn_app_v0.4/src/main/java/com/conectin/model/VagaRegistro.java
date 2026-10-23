package com.conectin.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record VagaRegistro(int id, int idEmpregador, String titulo, String descricao, String requisitos,
        String tipo, String modalidade, LocalDate prazoInscricao, LocalDateTime dataPublicacao, String status,
        String empresa, String tipoInstituicao, String descricaoEmpresa) {

    public boolean inscricoesAbertas() {
        return "aberta".equals(status) && !prazoInscricao.isBefore(LocalDate.now());
    }
}
