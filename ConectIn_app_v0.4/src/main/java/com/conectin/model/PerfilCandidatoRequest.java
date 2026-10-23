package com.conectin.model;

import java.util.List;

public record PerfilCandidatoRequest(String nome, String email, String telefone, String curso,
        String instituicao, String statusFormacao, String anoConclusao, String areaInteresse, String sobre,
        Boolean semExperiencia, List<String> habilidades) {
}
