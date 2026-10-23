package com.conectin.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.conectin.erro.ErroApi;

// guarda curriculos (PDF) e fotos (JPG/PNG) na pasta de uploads, conferindo o tipo pelos primeiros bytes
@Service
public class ArmazenamentoService {

    private static final Logger log = LoggerFactory.getLogger(ArmazenamentoService.class);
    private static final byte[] PDF = {0x25, 0x50, 0x44, 0x46, 0x2D};
    private static final byte[] PNG = {(byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A};
    private static final byte[] JPG = {(byte) 0xFF, (byte) 0xD8, (byte) 0xFF};

    private final Path raiz;

    public ArmazenamentoService(@Value("${conectin.uploads.pasta:uploads}") String pasta) throws IOException {
        raiz = Paths.get(pasta).toAbsolutePath().normalize();
        Files.createDirectories(raiz);
        log.info("Arquivos enviados serão guardados em {}", raiz);
    }

    public String salvarPdf(String subpasta, MultipartFile arquivo) {
        if (!comeca(lerInicio(arquivo), PDF)) throw ErroApi.validacao(Map.of("arquivo", "Envie o currículo em PDF."));
        return gravar(subpasta, arquivo, ".pdf");
    }

    public String salvarImagem(String subpasta, MultipartFile arquivo) {
        byte[] inicio = lerInicio(arquivo);
        if (comeca(inicio, PNG)) return gravar(subpasta, arquivo, ".png");
        if (comeca(inicio, JPG)) return gravar(subpasta, arquivo, ".jpg");
        throw ErroApi.validacao(Map.of("arquivo", "Envie uma imagem JPG ou PNG."));
    }

    public Resource carregar(String caminho) {
        Path arquivo = resolver(caminho);
        if (!Files.isRegularFile(arquivo)) throw ErroApi.naoEncontrado("O arquivo não foi encontrado no servidor.");
        return new FileSystemResource(arquivo);
    }

    public String tipoDeConteudo(String caminho) {
        if (caminho.endsWith(".png")) return "image/png";
        if (caminho.endsWith(".jpg")) return "image/jpeg";
        return caminho.endsWith(".pdf") ? "application/pdf" : "application/octet-stream";
    }

    public void apagar(String caminho) {
        if (caminho == null) return;
        try {
            Files.deleteIfExists(resolver(caminho));
        } catch (IOException | RuntimeException e) {
            log.warn("Não foi possível apagar o arquivo {}", caminho, e);
        }
    }

    private byte[] lerInicio(MultipartFile arquivo) {
        if (arquivo == null || arquivo.isEmpty()) throw ErroApi.validacao(Map.of("arquivo", "Escolha um arquivo para enviar."));
        if (arquivo.getSize() > 5L * 1024 * 1024) throw ErroApi.validacao(Map.of("arquivo", "O arquivo pode ter no máximo 5 MB."));
        try (InputStream entrada = arquivo.getInputStream()) {
            return entrada.readNBytes(8);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private String gravar(String subpasta, MultipartFile arquivo, String extensao) {
        String relativo = subpasta + "/" + UUID.randomUUID() + extensao;
        Path destino = resolver(relativo);
        try (InputStream entrada = arquivo.getInputStream()) {
            Files.createDirectories(destino.getParent());
            Files.copy(entrada, destino, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
        return relativo;
    }

    // impede caminhos tipo ../../ de sair da pasta
    private Path resolver(String caminho) {
        Path p = raiz.resolve(caminho).normalize();
        if (!p.startsWith(raiz)) throw ErroApi.naoEncontrado("O arquivo não foi encontrado no servidor.");
        return p;
    }

    private static boolean comeca(byte[] dados, byte[] assinatura) {
        return dados.length >= assinatura.length && Arrays.equals(Arrays.copyOf(dados, assinatura.length), assinatura);
    }
}
