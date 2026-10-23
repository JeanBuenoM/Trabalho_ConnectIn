package com.conectin.model;

public record CandidatoRegistro(int id, String nome, String email, String telefone, String fotoUrl,
        String curso, String instituicao, String statusFormacao, Integer anoConclusao, String areaInteresse,
        String sobre, boolean semExperiencia) {
}
