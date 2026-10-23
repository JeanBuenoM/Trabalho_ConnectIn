package com.conectin.model;

import java.time.LocalDateTime;
import java.util.List;

public record CandidaturaRecebida(int id, int idVaga, String tituloVaga, int idCandidato, String nome,
        String curso, String instituicao, List<String> habilidades, boolean semExperiencia,
        boolean temCurriculo, boolean temFoto, String status, LocalDateTime dataCandidatura) {
}
