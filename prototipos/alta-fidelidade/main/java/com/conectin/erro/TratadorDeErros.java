package com.conectin.erro;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/** Transforma as exceções em respostas JSON que a tela consegue mostrar. */
@RestControllerAdvice
public class TratadorDeErros {

    /** Campo obrigatório faltando ou regra de negócio violada (RN01, RN03...). */
    @ExceptionHandler(ValidacaoException.class)
    public ResponseEntity<Map<String, Object>> validacao(ValidacaoException e) {
        Map<String, Object> corpo = new LinkedHashMap<>();
        corpo.put("mensagem", "A vaga não foi publicada. Corrija os campos indicados.");
        corpo.put("erros", e.getErros());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(corpo);
    }

    /** JSON malformado ou com tipo errado (por exemplo, uma área que não é número). */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> corpoIlegivel(HttpMessageNotReadableException e) {
        Map<String, Object> corpo = new LinkedHashMap<>();
        corpo.put("mensagem", "Os dados enviados não puderam ser lidos.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(corpo);
    }

    /** Problema de configuração, por exemplo o empregador de teste que não foi criado no banco. */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> configuracao(IllegalStateException e) {
        Map<String, Object> corpo = new LinkedHashMap<>();
        corpo.put("mensagem", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(corpo);
    }
}
