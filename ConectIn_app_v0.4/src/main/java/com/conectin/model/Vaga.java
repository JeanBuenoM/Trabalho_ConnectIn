package com.conectin.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

// Uma vaga. Serve para a lista de vagas, para as vagas da empresa e para uso interno dos services.
// Nem toda consulta preenche todos os campos (por exemplo, "candidaturas" só vem na lista da empresa).
public record Vaga(int id, int idEmpresa, String titulo, String descricao, String requisitos, String tipo,
        String modalidade, LocalDate prazoInscricao, LocalDateTime dataPublicacao, String status,
        boolean inscricoesAbertas, String empresa, String tipoInstituicao, String descricaoEmpresa,
        List<String> areas, int candidaturas, int emAnalise) {
}
