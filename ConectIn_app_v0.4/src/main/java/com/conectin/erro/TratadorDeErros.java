package com.conectin.erro;

import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@RestControllerAdvice
public class TratadorDeErros {

    private static final Logger log = LoggerFactory.getLogger(TratadorDeErros.class);

    @ExceptionHandler(ErroApi.class)
    public ResponseEntity<Map<String, Object>> erroApi(ErroApi e) {
        Map<String, Object> corpo = new LinkedHashMap<>();
        corpo.put("mensagem", e.getMessage());
        if (e.getErros() != null) corpo.put("erros", e.getErros());
        if (e.getCodigo() != null) corpo.put("codigo", e.getCodigo());
        return ResponseEntity.status(e.getStatus()).body(corpo);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Map<String, Object>> duplicado(Exception e) {
        return resposta(HttpStatus.CONFLICT, "Este registro já existe.");
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class,
            MissingServletRequestParameterException.class})
    public ResponseEntity<Map<String, Object>> corpoIlegivel(Exception e) {
        return resposta(HttpStatus.BAD_REQUEST, "Os dados enviados não puderam ser lidos.");
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> arquivoGrande(Exception e) {
        return resposta(HttpStatus.PAYLOAD_TOO_LARGE, "O arquivo pode ter no máximo 5 MB.");
    }

    @ExceptionHandler({MissingServletRequestPartException.class, MultipartException.class})
    public ResponseEntity<Map<String, Object>> semArquivo(Exception e) {
        return resposta(HttpStatus.BAD_REQUEST, "Escolha um arquivo para enviar.");
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, Object>> banco(DataAccessException e) {
        log.error("Erro ao acessar o banco de dados", e);
        return resposta(HttpStatus.INTERNAL_SERVER_ERROR,
                "Não foi possível acessar o banco de dados. Tente de novo em instantes.");
    }

    private static ResponseEntity<Map<String, Object>> resposta(HttpStatus status, String mensagem) {
        return ResponseEntity.status(status).body(Map.of("mensagem", mensagem));
    }
}
