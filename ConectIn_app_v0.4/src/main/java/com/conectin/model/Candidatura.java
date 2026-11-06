package com.conectin.model;

import java.time.LocalDateTime;
import java.util.List;

// Uma candidatura vista pela EMPRESA (lista de candidatos e detalhe).
// "candidato" só é preenchido quando a empresa abre o detalhe de uma candidatura.
public record Candidatura(int id, int idVaga, String tituloVaga, String tipoVaga, int idCandidato, String nome,
        String curso, String instituicao, List<String> habilidades, boolean semExperiencia, boolean temCurriculo,
        boolean temFoto, String status, LocalDateTime dataCandidatura, Candidato candidato) {
}
