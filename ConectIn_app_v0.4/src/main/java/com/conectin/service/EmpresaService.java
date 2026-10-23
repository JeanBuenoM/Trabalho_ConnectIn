package com.conectin.service;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.conectin.erro.ErroApi;
import com.conectin.model.PerfilEmpresa;
import com.conectin.model.PerfilEmpresaRequest;
import com.conectin.repository.EmpregadorRepository;
import com.conectin.repository.UsuarioRepository;
import com.conectin.util.Textos;

@Service
public class EmpresaService {

    private final UsuarioRepository usuarios;
    private final EmpregadorRepository empregadores;
    private final AuthService auth;

    public EmpresaService(UsuarioRepository usuarios, EmpregadorRepository empregadores, AuthService auth) {
        this.usuarios = usuarios;
        this.empregadores = empregadores;
        this.auth = auth;
    }

    public PerfilEmpresa perfil(int id) {
        return empregadores.buscar(id).map(PerfilEmpresa::de).orElseThrow(() -> ErroApi.naoEncontrado("Empresa não encontrada."));
    }

    @Transactional
    public PerfilEmpresa atualizar(int id, PerfilEmpresaRequest p) {
        if (p == null) throw ErroApi.validacao(Map.of("nome", "Informe o nome da empresa ou instituição."));
        Map<String, String> erros = new LinkedHashMap<>();
        String nome = Textos.obrigatorio(p.nome(), 150, "nome", "Informe o nome da empresa ou instituição.", erros);
        String email = auth.validarEmail(p.email(), id, erros);
        String telefone = Textos.opcional(p.telefone(), 20, "telefone", erros);
        String cnpj = Textos.obrigatorio(p.cnpjOuCodigo(), 30, "cnpjOuCodigo", "Informe o CNPJ ou o código da instituição.", erros);
        AuthService.validarTipoInstituicao(p.tipoInstituicao(), erros);
        String descricao = Textos.opcional(p.descricao(), 2000, "descricao", erros);
        if (!erros.isEmpty()) throw ErroApi.validacao("O perfil não foi salvo. Corrija os campos indicados.", erros);

        usuarios.atualizarContato(id, nome, email, telefone);
        empregadores.atualizar(id, nome, cnpj, p.tipoInstituicao(), descricao);
        return perfil(id);
    }
}
