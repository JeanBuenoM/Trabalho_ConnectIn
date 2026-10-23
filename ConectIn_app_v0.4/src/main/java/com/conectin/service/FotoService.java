package com.conectin.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.conectin.erro.ErroApi;
import com.conectin.model.ArquivoBaixado;
import com.conectin.model.Usuario;
import com.conectin.repository.CandidaturaRepository;
import com.conectin.repository.UsuarioRepository;

@Service
public class FotoService {

    private final UsuarioRepository usuarios;
    private final CandidaturaRepository candidaturas;
    private final ArmazenamentoService armazenamento;

    public FotoService(UsuarioRepository usuarios, CandidaturaRepository candidaturas, ArmazenamentoService armazenamento) {
        this.usuarios = usuarios;
        this.candidaturas = candidaturas;
        this.armazenamento = armazenamento;
    }

    @Transactional
    public void enviar(int id, MultipartFile arquivo) {
        Usuario usuario = buscar(id);
        String caminho = armazenamento.salvarImagem("fotos", arquivo);
        try {
            usuarios.atualizarFoto(id, caminho);
        } catch (RuntimeException e) {
            armazenamento.apagar(caminho);
            throw e;
        }
        armazenamento.apagar(usuario.fotoUrl());
    }

    // foto de candidato so aparece pra ele mesmo e pras empresas onde ele se candidatou
    public ArquivoBaixado foto(int idSolicitante, int id) {
        Usuario usuario = buscar(id);
        boolean podeVer = idSolicitante == id || "empregador".equals(usuario.tipo())
                || candidaturas.candidatoSeInscreveuComEmpregador(id, idSolicitante);
        if (!podeVer || usuario.fotoUrl() == null) throw ErroApi.naoEncontrado("Foto não encontrada.");
        return new ArquivoBaixado(armazenamento.carregar(usuario.fotoUrl()), "foto", armazenamento.tipoDeConteudo(usuario.fotoUrl()));
    }

    @Transactional
    public void remover(int id) {
        Usuario usuario = buscar(id);
        usuarios.atualizarFoto(id, null);
        armazenamento.apagar(usuario.fotoUrl());
    }

    private Usuario buscar(int id) {
        return usuarios.buscarPorId(id).orElseThrow(() -> ErroApi.naoEncontrado("Usuário não encontrado."));
    }
}
