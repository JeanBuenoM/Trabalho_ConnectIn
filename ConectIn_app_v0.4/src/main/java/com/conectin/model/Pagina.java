package com.conectin.model;

import java.util.List;

public record Pagina<T>(List<T> itens, int total, int pagina, int tamanho) {
}
