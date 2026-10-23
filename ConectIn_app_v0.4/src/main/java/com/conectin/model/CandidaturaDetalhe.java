package com.conectin.model;

import java.time.LocalDateTime;

public record CandidaturaDetalhe(int id, String status, LocalDateTime dataCandidatura, int idVaga,
        String tituloVaga, String tipoVaga, PerfilCandidato candidato) {
}
