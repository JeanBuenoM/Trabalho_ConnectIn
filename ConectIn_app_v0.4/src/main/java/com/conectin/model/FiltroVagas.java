package com.conectin.model;

public record FiltroVagas(String busca, String tipo, String modalidade, Integer area, String ordem, int pagina,
        int tamanho) {
}
