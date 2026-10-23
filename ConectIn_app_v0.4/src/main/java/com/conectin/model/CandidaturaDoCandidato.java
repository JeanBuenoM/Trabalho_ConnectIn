package com.conectin.model;

import java.time.LocalDateTime;

public record CandidaturaDoCandidato(int id, int idVaga, String titulo, int idEmpresa, String empresa,
        String tipo, LocalDateTime dataCandidatura, String status) {
}
