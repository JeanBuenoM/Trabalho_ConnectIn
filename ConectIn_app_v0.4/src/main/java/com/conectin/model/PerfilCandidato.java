package com.conectin.model;

import java.util.List;

public record PerfilCandidato(int id, String nome, String email, String telefone, String curso,
        String instituicao, String statusFormacao, Integer anoConclusao, String areaInteresse, String sobre,
        boolean semExperiencia, List<String> habilidades, CurriculoInfo curriculo, boolean temFoto,
        int completude) {
}
