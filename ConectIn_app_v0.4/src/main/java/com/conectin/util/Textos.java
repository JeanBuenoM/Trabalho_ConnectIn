package com.conectin.util;

import java.util.Locale;
import java.util.Map;

public final class Textos {

    private Textos() {
    }

    public static String limpar(String texto) {
        return texto == null || texto.isBlank() ? null : texto.trim();
    }

    public static String email(String texto) {
        String limpo = limpar(texto);
        return limpo == null ? null : limpo.toLowerCase(Locale.ROOT);
    }

    public static boolean emailValido(String email) {
        return email != null && email.length() <= 150 && email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    }

    public static String cortar(String texto, int maximo) {
        return texto == null || texto.length() <= maximo ? texto : texto.substring(0, maximo - 1) + "…";
    }

    public static String obrigatorio(String valor, int maximo, String campo, String mensagemVazio, Map<String, String> erros) {
        String limpo = limpar(valor);
        if (limpo == null) erros.put(campo, mensagemVazio);
        else if (limpo.length() > maximo) erros.put(campo, "Use no máximo " + maximo + " caracteres.");
        return limpo;
    }

    public static String opcional(String valor, int maximo, String campo, Map<String, String> erros) {
        String limpo = limpar(valor);
        if (limpo != null && limpo.length() > maximo) erros.put(campo, "Use no máximo " + maximo + " caracteres.");
        return limpo;
    }

    public static String paraLike(String texto) {
        return "%" + texto.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_") + "%";
    }
}
