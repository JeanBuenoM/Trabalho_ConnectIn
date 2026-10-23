package com.conectin.model;

import java.util.List;

public record PainelEmpresa(int vagasPublicadas, int vagasAbertas, int vagasNoMes, int totalCandidaturas,
        int candidaturasNaSemana, int aprovados, List<VagaEmpresa> recentes) {
}
