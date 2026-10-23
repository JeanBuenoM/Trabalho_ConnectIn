package com.conectin.model;

import java.time.LocalDateTime;

public record CurriculoInfo(String nomeArquivo, long tamanhoBytes, LocalDateTime atualizadoEm) {
}
