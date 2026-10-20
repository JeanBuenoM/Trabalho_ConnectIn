package com.conectin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Ponto de entrada do ConectIn.
 * Ao iniciar, o Spring sobe o servidor web (porta 8080) e serve as telas de src/main/resources/static.
 */
@SpringBootApplication
public class ConectinApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConectinApplication.class, args);
    }
}
