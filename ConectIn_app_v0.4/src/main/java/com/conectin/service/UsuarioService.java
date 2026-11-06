package com.conectin.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.conectin.erro.ErroApi;
import com.conectin.model.ArquivoBaixado;
import com.conectin.model.CadastroRequest;
import com.conectin.model.Candidato;
import com.conectin.model.Curriculo;
import com.conectin.model.Empresa;
import com.conectin.model.PerfilCandidatoRequest;
import com.conectin.model.Usuario;
import com.conectin.model.UsuarioResposta;
import com.conectin.repository.CandidatoRepository;
import com.conectin.repository.CurriculoRepository;
import com.conectin.repository.EmpregadorRepository;
import com.conectin.repository.UsuarioRepository;
import com.conectin.seguranca.TokenService;
import com.conectin.util.Textos;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarios;
    private final CandidatoRepository candidatos;
    private final EmpregadorRepository empregadores;
    private final CurriculoRepository curriculos;
    private final PasswordEncoder senhas;
    private final TokenService tokens;
    private final Path pastaUploads;

    public UsuarioService(UsuarioRepository usuarios, CandidatoRepository candidatos, EmpregadorRepository empregadores,
                          CurriculoRepository curriculos, PasswordEncoder senhas, TokenService tokens,
                          @Value("${conectin.uploads.pasta:uploads}") String pasta) {
        this.usuarios = usuarios;
        this.candidatos = candidatos;
        this.empregadores = empregadores;
        this.curriculos = curriculos;
        this.senhas = senhas;
        this.tokens = tokens;
        this.pastaUploads = Paths.get(pasta).toAbsolutePath();
    }

    // CADASTRO E LOGIN

    @Transactional
    public Map<String, Object> cadastrar(CadastroRequest pedido) {
        Map<String, String> erros = new HashMap<>();

        boolean ehEmpresa = "empregador".equals(pedido.tipo());
        boolean ehCandidato = "candidato".equals(pedido.tipo());
        if (!ehEmpresa && !ehCandidato) {
            erros.put("tipo", "Escolha se você é candidato ou empregador.");
        }

        String nome = Textos.obrigatorio(pedido.nome(), 150, "nome", "Informe o nome.", erros);
        String email = validarEmail(pedido.email(), null, erros);

        if (pedido.senha() == null || pedido.senha().length() < 8) {
            erros.put("senha", "A senha precisa ter pelo menos 8 caracteres.");
        }

        String cnpj = null;
        if (ehEmpresa) {
            cnpj = Textos.obrigatorio(pedido.cnpjOuCodigo(), 30, "cnpjOuCodigo", "Informe o CNPJ ou o código da instituição.", erros);
            if (pedido.tipoInstituicao() == null) {
                erros.put("tipoInstituicao", "Escolha se é uma empresa ou uma instituição de ensino.");
            }
        }

        if (!erros.isEmpty()) {
            throw ErroApi.validacao("A conta não foi criada. Corrija os campos indicados.", erros);
        }

        // a senha é guardada criptografada
        String senhaCriptografada = senhas.encode(pedido.senha());
        int id = usuarios.inserir(nome, email, senhaCriptografada, pedido.tipo());

        if (ehEmpresa) {
            empregadores.inserir(id, nome, cnpj, pedido.tipoInstituicao());
        } else {
            candidatos.inserir(id);
        }

        Usuario usuario = usuarios.buscarPorId(id).orElseThrow();
        return respostaDeLogin(usuario);
    }

    public Map<String, Object> entrar(CadastroRequest pedido) {
        String email = Textos.email(pedido.email());
        Usuario usuario = null;
        if (email != null) {
            usuario = usuarios.buscarPorEmail(email).orElse(null);
        }

        boolean senhaCerta = usuario != null && pedido.senha() != null
                && senhas.matches(pedido.senha(), usuario.senhaHash());
        if (!senhaCerta) {
            throw new ErroApi(HttpStatus.UNAUTHORIZED, "E-mail ou senha incorretos.");
        }

        return respostaDeLogin(usuario);
    }

    public UsuarioResposta usuarioLogado(int id) {
        return UsuarioResposta.de(buscarUsuario(id));
    }

    // PERFIL DO CANDIDATO

    public Candidato perfilCandidato(int id) {
        Candidato c = candidatos.buscar(id)
                .orElseThrow(() -> ErroApi.naoEncontrado("Candidato não encontrado."));
        List<String> habilidades = candidatos.habilidades(id);

        Curriculo curriculo = curriculos.buscar(id).orElse(null);

        // Sistema de porcentagem do cadastro completo, cada campo preenchido vale 10%
        int completude = 0;
        if (c.nome() != null) completude += 10;
        if (c.email() != null) completude += 10;
        if (c.telefone() != null) completude += 10;
        if (c.curso() != null) completude += 10;
        if (c.instituicao() != null) completude += 10;
        if (c.statusFormacao() != null) completude += 10;
        if (c.areaInteresse() != null) completude += 10;
        if (c.sobre() != null) completude += 10;
        if (!habilidades.isEmpty()) completude += 10;
        if (curriculo != null || c.semExperiencia()) completude += 10;

        return new Candidato(c.id(), c.nome(), c.email(), c.telefone(), c.fotoUrl(), c.curso(), c.instituicao(),
                c.statusFormacao(), c.anoConclusao(), c.areaInteresse(), c.sobre(), c.semExperiencia(),
                habilidades, curriculo, c.fotoUrl() != null, completude);
    }

    @Transactional
    public Candidato atualizarCandidato(int id, PerfilCandidatoRequest pedido) {
        Map<String, String> erros = new HashMap<>();

        String nome = Textos.obrigatorio(pedido.nome(), 150, "nome", "Informe seu nome completo.", erros);
        String email = validarEmail(pedido.email(), id, erros);
        String telefone = Textos.opcional(pedido.telefone(), 20, "telefone", erros);
        String curso = Textos.obrigatorio(pedido.curso(), 150, "curso", "Informe o curso.", erros);
        String instituicao = Textos.obrigatorio(pedido.instituicao(), 150, "instituicao", "Informe a instituição de ensino.", erros);
        String statusFormacao = Textos.obrigatorio(pedido.statusFormacao(), 20, "statusFormacao", "Escolha o status da formação.", erros);
        String areaInteresse = Textos.obrigatorio(pedido.areaInteresse(), 100, "areaInteresse", "Escolha sua área de interesse.", erros);
        String sobre = Textos.opcional(pedido.sobre(), 2000, "sobre", erros);

        Integer anoConclusao = null;
        String ano = Textos.limpar(pedido.anoConclusao());
        if (ano != null) {
            try {
                anoConclusao = Integer.valueOf(ano);
            } catch (NumberFormatException e) {
                erros.put("anoConclusao", "Informe o ano com 4 dígitos, por exemplo 2026.");
            }
        }

        // tira espaços, linhas vazias e habilidades repetidas
        List<String> habilidades = new ArrayList<>();
        if (pedido.habilidades() != null) {
            for (String h : pedido.habilidades()) {
                String limpa = Textos.limpar(h);
                if (limpa != null && !habilidades.contains(limpa)) {
                    habilidades.add(limpa);
                }
            }
        }

        if (!erros.isEmpty()) {
            throw ErroApi.validacao("O perfil não foi salvo. Corrija os campos indicados.", erros);
        }

        boolean semExperiencia = Boolean.TRUE.equals(pedido.semExperiencia());
        usuarios.atualizarContato(id, nome, email, telefone);
        candidatos.atualizar(id, curso, instituicao, statusFormacao, anoConclusao, areaInteresse, sobre, semExperiencia);
        candidatos.substituirHabilidades(id, habilidades);
        return perfilCandidato(id);
    }

    // PERFIL DA EMPRESA

    public Empresa perfilEmpresa(int id) {
        return empregadores.buscar(id)
                .orElseThrow(() -> ErroApi.naoEncontrado("Empresa não encontrada."));
    }

    @Transactional
    public Empresa atualizarEmpresa(int id, Empresa pedido) {
        Map<String, String> erros = new HashMap<>();

        String nome = Textos.obrigatorio(pedido.nome(), 150, "nome", "Informe o nome da empresa ou instituição.", erros);
        String email = validarEmail(pedido.email(), id, erros);
        String telefone = Textos.opcional(pedido.telefone(), 20, "telefone", erros);
        String cnpj = Textos.obrigatorio(pedido.cnpjOuCodigo(), 30, "cnpjOuCodigo", "Informe o CNPJ ou o código da instituição.", erros);
        String descricao = Textos.opcional(pedido.descricao(), 2000, "descricao", erros);
        if (pedido.tipoInstituicao() == null) {
            erros.put("tipoInstituicao", "Escolha se é uma empresa ou uma instituição de ensino.");
        }

        if (!erros.isEmpty()) {
            throw ErroApi.validacao("O perfil não foi salvo. Corrija os campos indicados.", erros);
        }

        usuarios.atualizarContato(id, nome, email, telefone);
        empregadores.atualizar(id, nome, cnpj, pedido.tipoInstituicao(), descricao);
        return perfilEmpresa(id);
    }

    // CURRÍCULO (PDF)

    public Curriculo enviarCurriculo(int id, MultipartFile arquivo) {
        String nomeOriginal = arquivo.getOriginalFilename();
        if (nomeOriginal == null || !nomeOriginal.toLowerCase().endsWith(".pdf")) {
            throw ErroApi.validacao(Map.of("arquivo", "Envie o currículo em PDF."));
        }

        // apaga ocurriculo antigo para colocar o novo
        curriculos.buscar(id).ifPresent(antigo -> apagarArquivo(antigo.arquivoUrl()));

        String caminho = salvarArquivo("curriculos", arquivo, ".pdf");
        curriculos.salvar(id, caminho, nomeOriginal, arquivo.getSize());
        return curriculos.buscar(id).orElseThrow();
    }

    public ArquivoBaixado curriculo(int id) {
        Curriculo c = curriculos.buscar(id)
                .orElseThrow(() -> ErroApi.naoEncontrado("Nenhum currículo cadastrado."));
        return new ArquivoBaixado(carregarArquivo(c.arquivoUrl()), c.nomeArquivo(), "application/pdf");
    }

    public void removerCurriculo(int id) {
        curriculos.buscar(id).ifPresent(c -> apagarArquivo(c.arquivoUrl()));
        curriculos.remover(id);
    }

    // FOTO DE PERFIL

    public void enviarFoto(int id, MultipartFile arquivo) {
        String nome = arquivo.getOriginalFilename() == null ? "" : arquivo.getOriginalFilename().toLowerCase();
        String extensao;
        if (nome.endsWith(".png")) {
            extensao = ".png";
        } else if (nome.endsWith(".jpg") || nome.endsWith(".jpeg")) {
            extensao = ".jpg";
        } else {
            throw ErroApi.validacao(Map.of("arquivo", "Envie uma imagem JPG ou PNG."));
        }

        Usuario usuario = buscarUsuario(id);
        apagarArquivo(usuario.fotoUrl()); // apaga a foto antiga, se tiver

        String caminho = salvarArquivo("fotos", arquivo, extensao);
        usuarios.atualizarFoto(id, caminho);
    }

    public ArquivoBaixado foto(int id) {
        Usuario usuario = buscarUsuario(id);
        if (usuario.fotoUrl() == null) {
            throw ErroApi.naoEncontrado("Foto não encontrada.");
        }
        String tipo = usuario.fotoUrl().endsWith(".png") ? "image/png" : "image/jpeg";
        return new ArquivoBaixado(carregarArquivo(usuario.fotoUrl()), "foto", tipo);
    }

    public void removerFoto(int id) {
        Usuario usuario = buscarUsuario(id);
        apagarArquivo(usuario.fotoUrl());
        usuarios.atualizarFoto(id, null);
    }

    // MÉTODOS DE AJUDA

    private Map<String, Object> respostaDeLogin(Usuario usuario) {
        return Map.of("token", tokens.gerar(usuario), "usuario", UsuarioResposta.de(usuario));
    }

    private Usuario buscarUsuario(int id) {
        return usuarios.buscarPorId(id).orElseThrow(() -> ErroApi.naoEncontrado("Usuário não encontrado."));
    }

    // confere se o e-mail foi preenchido, tem formato válido e não é de outra conta
    private String validarEmail(String valor, Integer idDoDono, Map<String, String> erros) {
        String email = Textos.email(valor);
        if (email == null) {
            erros.put("email", "Informe o e-mail.");
        } else if (!Textos.emailValido(email)) {
            erros.put("email", "Informe um e-mail válido.");
        } else if (usuarios.emailEmUso(email, idDoDono)) {
            erros.put("email", "Este e-mail já está cadastrado.");
        }
        return email;
    }

    private String salvarArquivo(String subpasta, MultipartFile arquivo, String extensao) {
        String caminho = subpasta + "/" + UUID.randomUUID() + extensao;
        try {
            Path destino = pastaUploads.resolve(caminho);
            Files.createDirectories(destino.getParent());
            arquivo.transferTo(destino);
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível salvar o arquivo.", e);
        }
        return caminho;
    }

    private FileSystemResource carregarArquivo(String caminho) {
        Path arquivo = pastaUploads.resolve(caminho);
        if (!Files.exists(arquivo)) {
            throw ErroApi.naoEncontrado("O arquivo não foi encontrado no servidor.");
        }
        return new FileSystemResource(arquivo);
    }

    private void apagarArquivo(String caminho) {
        if (caminho == null) return;
        try {
            Files.deleteIfExists(pastaUploads.resolve(caminho));
        } catch (IOException e) {

    }
}
