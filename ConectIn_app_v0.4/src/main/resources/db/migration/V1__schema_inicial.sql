-- ConectIn — V1: tabelas iniciais (igual a banco-de-dados/schema.sql, sem CREATE DATABASE/USE).
-- Quem já criou o banco rodando o schema.sql à mão não roda isto de novo: o Flyway marca esta versão como base.

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('candidato', 'empregador') NOT NULL,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidato (
    id_usuario INT PRIMARY KEY,
    data_nascimento DATE,
    formacao_academica VARCHAR(150),
    area_interesse VARCHAR(100),
    sem_experiencia BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE empregador (
    id_usuario INT PRIMARY KEY,
    razao_social VARCHAR(150) NOT NULL,
    cnpj_ou_codigo VARCHAR(30) NOT NULL,
    tipo_instituicao ENUM('empresa', 'instituicao_ensino') NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE curriculo (
    id_curriculo INT AUTO_INCREMENT PRIMARY KEY,
    id_candidato INT NOT NULL UNIQUE,
    arquivo_url VARCHAR(255) NOT NULL,
    resumo TEXT,
    habilidades TEXT,
    data_atualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_candidato) REFERENCES candidato(id_usuario) ON DELETE CASCADE
);

CREATE TABLE vaga (
    id_vaga INT AUTO_INCREMENT PRIMARY KEY,
    id_empregador INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    requisitos TEXT,
    tipo ENUM('emprego', 'estagio', 'projeto_academico') NOT NULL,
    modalidade ENUM('presencial', 'remoto', 'hibrido') NOT NULL,
    prazo_inscricao DATE NOT NULL,
    data_publicacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('aberta', 'encerrada') NOT NULL DEFAULT 'aberta',
    FOREIGN KEY (id_empregador) REFERENCES empregador(id_usuario) ON DELETE CASCADE
);

CREATE TABLE area_atuacao (
    id_area INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE vaga_area (
    id_vaga INT NOT NULL,
    id_area INT NOT NULL,
    PRIMARY KEY (id_vaga, id_area),
    FOREIGN KEY (id_vaga) REFERENCES vaga(id_vaga) ON DELETE CASCADE,
    FOREIGN KEY (id_area) REFERENCES area_atuacao(id_area) ON DELETE CASCADE
);

CREATE TABLE candidatura (
    id_candidatura INT AUTO_INCREMENT PRIMARY KEY,
    id_candidato INT NOT NULL,
    id_vaga INT NOT NULL,
    data_candidatura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('analise', 'aprovado', 'reprovado') NOT NULL DEFAULT 'analise',
    UNIQUE (id_candidato, id_vaga),
    FOREIGN KEY (id_candidato) REFERENCES candidato(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_vaga) REFERENCES vaga(id_vaga) ON DELETE CASCADE
);

CREATE TABLE notificacao (
    id_notificacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo ENUM('nova_vaga', 'status_candidatura') NOT NULL,
    mensagem VARCHAR(255) NOT NULL,
    data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);
