package com.conectin.model;

import java.time.LocalDateTime;

// Currículo em PDF do candidato. O arquivo fica na pasta uploads; arquivoUrl é o caminho dele lá dentro.
public record Curriculo(String arquivoUrl, String nomeArquivo, long tamanhoBytes, LocalDateTime atualizadoEm) {
}
