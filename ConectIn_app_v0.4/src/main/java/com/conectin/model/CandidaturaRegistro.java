package com.conectin.model;

import java.time.LocalDateTime;

public record CandidaturaRegistro(int id, int idCandidato, int idVaga, String tituloVaga, String tipoVaga,
        String status, LocalDateTime dataCandidatura) {
}
