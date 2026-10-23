package com.conectin.model;

import org.springframework.core.io.Resource;

public record ArquivoBaixado(Resource recurso, String nome, String tipoConteudo) {
}
