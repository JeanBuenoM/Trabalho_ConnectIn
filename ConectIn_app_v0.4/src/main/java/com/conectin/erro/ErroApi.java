package com.conectin.erro;

import java.util.Map;

import org.springframework.http.HttpStatus;

public class ErroApi extends RuntimeException {

    private final HttpStatus status;
    private final Map<String, String> erros;
    private final String codigo;

    public ErroApi(HttpStatus status, String mensagem, Map<String, String> erros, String codigo) {
        super(mensagem);
        this.status = status;
        this.erros = erros;
        this.codigo = codigo;
    }

    public ErroApi(HttpStatus status, String mensagem) {
        this(status, mensagem, null, null);
    }

    public static ErroApi naoEncontrado(String mensagem) {
        return new ErroApi(HttpStatus.NOT_FOUND, mensagem);
    }

    public static ErroApi validacao(String mensagem, Map<String, String> erros) {
        return new ErroApi(HttpStatus.BAD_REQUEST, mensagem, erros, null);
    }

    public static ErroApi validacao(Map<String, String> erros) {
        return validacao("Corrija os campos indicados.", erros);
    }

    public static ErroApi regra(String codigo, String mensagem) {
        return new ErroApi(HttpStatus.UNPROCESSABLE_ENTITY, mensagem, null, codigo);
    }

    public HttpStatus getStatus() {
        return status;
    }

    public Map<String, String> getErros() {
        return erros;
    }

    public String getCodigo() {
        return codigo;
    }
}
