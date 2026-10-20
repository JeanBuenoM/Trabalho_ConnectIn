package com.conectin.erro;

import java.util.Map;

/**
 * Lançada quando a vaga não respeita as regras de negócio ou os campos obrigatórios.
 * Carrega uma mensagem por campo, para a tela mostrar o erro no lugar certo.
 */
public class ValidacaoException extends RuntimeException {

    private final Map<String, String> erros;

    public ValidacaoException(Map<String, String> erros) {
        super("Dados inválidos.");
        this.erros = erros;
    }

    public Map<String, String> getErros() {
        return erros;
    }
}
