package com.conectin.model;

import java.time.LocalDateTime;

public record CurriculoRegistro(String arquivoUrl, String nomeArquivo, long tamanhoBytes,
        LocalDateTime atualizadoEm) {

    public CurriculoInfo info() {
        return new CurriculoInfo(nomeArquivo, tamanhoBytes, atualizadoEm);
    }
}
