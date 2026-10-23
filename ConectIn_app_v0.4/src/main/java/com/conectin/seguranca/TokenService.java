package com.conectin.seguranca;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.conectin.model.Usuario;

@Service
public class TokenService {

    private final JwtEncoder encoder;
    private final long validadeHoras;

    public TokenService(JwtEncoder encoder, @Value("${conectin.jwt.validade-horas:168}") long validadeHoras) {
        this.encoder = encoder;
        this.validadeHoras = validadeHoras;
    }

    public String gerar(Usuario usuario) {
        Instant agora = Instant.now();
        JwtClaimsSet dados = JwtClaimsSet.builder()
                .issuer("conectin")
                .issuedAt(agora)
                .expiresAt(agora.plus(validadeHoras, ChronoUnit.HOURS))
                .subject(String.valueOf(usuario.id()))
                .claim("papel", usuario.tipo().toUpperCase(Locale.ROOT))
                .build();
        JwsHeader cabecalho = JwsHeader.with(MacAlgorithm.HS256).build();
        return encoder.encode(JwtEncoderParameters.from(cabecalho, dados)).getTokenValue();
    }
}
