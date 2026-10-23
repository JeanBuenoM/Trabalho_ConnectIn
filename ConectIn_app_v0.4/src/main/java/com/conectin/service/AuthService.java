package com.conectin.service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conectin.erro.ErroApi;
import com.conectin.model.AuthResposta;
import com.conectin.model.CadastroRequest;
import com.conectin.model.LoginRequest;
import com.conectin.model.Usuario;
import com.conectin.model.UsuarioResposta;
import com.conectin.repository.CandidatoRepository;
import com.conectin.repository.EmpregadorRepository;
import com.conectin.repository.UsuarioRepository;
import com.conectin.seguranca.TokenService;
import com.conectin.util.Textos;

@Service
public class AuthService {

    static final Set<String> TIPOS_INSTITUICAO = Set.of("empresa", "instituicao_ensino");

    private final UsuarioRepository usuarios;
    private final CandidatoRepository candidatos;
    private final EmpregadorRepository empregadores;
    private final PasswordEncoder senhas;
    private final TokenService tokens;

    public AuthService(UsuarioRepository usuarios, CandidatoRepository candidatos, EmpregadorRepository empregadores,
                       PasswordEncoder senhas, TokenService tokens) {
        this.usuarios = usuarios;
        this.candidatos = candidatos;
        this.empregadores = empregadores;
        this.senhas = senhas;
        this.tokens = tokens;
    }

    @Transactional
    public AuthResposta cadastrar(CadastroRequest p) {
        if (p == null) throw ErroApi.validacao(Map.of("tipo", "Escolha se você é candidato ou empregador."));
        Map<String, String> erros = new LinkedHashMap<>();
        boolean empregador = "empregador".equals(p.tipo());
        if (!empregador && !"candidato".equals(p.tipo())) erros.put("tipo", "Escolha se você é candidato ou empregador.");

        String nome = Textos.obrigatorio(p.nome(), 150, "nome",
                empregador ? "Informe o nome da empresa ou instituição." : "Informe seu nome completo.", erros);
        String email = validarEmail(p.email(), null, erros);
        // o BCrypt so usa os primeiros 72 bytes
        if (p.senha() == null || p.senha().length() < 8) erros.put("senha", "A senha precisa ter pelo menos 8 caracteres.");
        else if (p.senha().length() > 72) erros.put("senha", "A senha pode ter no máximo 72 caracteres.");

        String cnpj = null;
        if (empregador) {
            cnpj = Textos.obrigatorio(p.cnpjOuCodigo(), 30, "cnpjOuCodigo", "Informe o CNPJ ou o código da instituição.", erros);
            validarTipoInstituicao(p.tipoInstituicao(), erros);
        }
        if (!erros.isEmpty()) throw ErroApi.validacao("A conta não foi criada. Corrija os campos indicados.", erros);

        int id = usuarios.inserir(nome, email, senhas.encode(p.senha()), p.tipo());
        if (empregador) empregadores.inserir(id, nome, cnpj, p.tipoInstituicao());
        else candidatos.inserir(id);
        return resposta(usuarios.buscarPorId(id).orElseThrow());
    }

    public AuthResposta entrar(LoginRequest p) {
        String email = p == null ? null : Textos.email(p.email());
        Usuario usuario = email == null ? null : usuarios.buscarPorEmail(email).orElse(null);
        if (usuario == null || p.senha() == null || !senhas.matches(p.senha(), usuario.senhaHash())) {
            throw new ErroApi(HttpStatus.UNAUTHORIZED, "E-mail ou senha incorretos.");
        }
        return resposta(usuario);
    }

    public UsuarioResposta usuarioLogado(int id) {
        return usuarios.buscarPorId(id).map(UsuarioResposta::de).orElseThrow(() -> ErroApi.naoEncontrado("Conta não encontrada."));
    }

    String validarEmail(String valor, Integer idDoDono, Map<String, String> erros) {
        String email = Textos.email(valor);
        if (email == null) erros.put("email", "Informe o e-mail.");
        else if (!Textos.emailValido(email)) erros.put("email", "Informe um e-mail válido.");
        else if (usuarios.emailEmUso(email, idDoDono)) erros.put("email", "Este e-mail já está cadastrado.");
        return email;
    }

    static void validarTipoInstituicao(String tipo, Map<String, String> erros) {
        if (tipo == null || !TIPOS_INSTITUICAO.contains(tipo)) erros.put("tipoInstituicao", "Escolha se é uma empresa ou uma instituição de ensino.");
    }

    private AuthResposta resposta(Usuario usuario) {
        return new AuthResposta(tokens.gerar(usuario), UsuarioResposta.de(usuario));
    }
}
