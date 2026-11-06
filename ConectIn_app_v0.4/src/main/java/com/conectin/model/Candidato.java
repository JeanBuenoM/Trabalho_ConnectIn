package com.conectin.model;

import java.util.List;

// Dados do candidato (tabelas usuario + candidato).
// Os últimos campos (habilidades, curriculo, temFoto e completude) são preenchidos pelo UsuarioService.
public record Candidato(int id, String nome, String email, String telefone, String fotoUrl,
        String curso, String instituicao, String statusFormacao, Integer anoConclusao, String areaInteresse,
        String sobre, boolean semExperiencia, List<String> habilidades, Curriculo curriculo, boolean temFoto,
        int completude) {
}
