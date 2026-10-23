
-- rodar no MySQL Workbench ou: mysql -u root -p < criar-banco.sql


CREATE DATABASE conectin CHARACTER SET utf8mb4;
USE conectin;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20) NULL,
    foto_url VARCHAR(255) NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('candidato', 'empregador') NOT NULL,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidato (
    id_usuario INT PRIMARY KEY,
    formacao_academica VARCHAR(150),
    instituicao VARCHAR(150) NULL,
    status_formacao ENUM('cursando', 'concluido', 'trancado') NULL,
    ano_conclusao SMALLINT NULL,
    area_interesse VARCHAR(100),
    sobre TEXT NULL,
    sem_experiencia BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE empregador (
    id_usuario INT PRIMARY KEY,
    razao_social VARCHAR(150) NOT NULL,
    cnpj_ou_codigo VARCHAR(30) NOT NULL,
    tipo_instituicao ENUM('empresa', 'instituicao_ensino') NOT NULL,
    descricao TEXT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE curriculo (
    id_curriculo INT AUTO_INCREMENT PRIMARY KEY,
    id_candidato INT NOT NULL UNIQUE,
    arquivo_url VARCHAR(255) NOT NULL,
    nome_arquivo VARCHAR(255) NULL,
    tamanho_bytes BIGINT NULL,
    data_atualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_candidato) REFERENCES candidato(id_usuario) ON DELETE CASCADE
);

CREATE TABLE habilidade_candidato (
    id_candidato INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_candidato, nome),
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
    FOREIGN KEY (id_empregador) REFERENCES empregador(id_usuario) ON DELETE CASCADE,
    INDEX idx_vaga_status_prazo (status, prazo_inscricao),
    INDEX idx_vaga_publicacao (data_publicacao)
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
    data_atualizacao DATETIME NULL,
    status ENUM('analise', 'aprovado', 'reprovado') NOT NULL DEFAULT 'analise',
    UNIQUE (id_candidato, id_vaga),
    FOREIGN KEY (id_candidato) REFERENCES candidato(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_vaga) REFERENCES vaga(id_vaga) ON DELETE CASCADE,
    INDEX idx_candidatura_vaga_status (id_vaga, status)
);

CREATE TABLE notificacao (
    id_notificacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo ENUM('nova_vaga', 'status_candidatura', 'nova_candidatura') NOT NULL,
    mensagem VARCHAR(255) NOT NULL,
    data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN NOT NULL DEFAULT FALSE,
    id_referencia INT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    INDEX idx_notificacao_usuario_lida (id_usuario, lida)
);

INSERT INTO area_atuacao (nome) VALUES
    ('Tecnologia'), ('Dados'), ('Pesquisa'), ('Administração'), ('Educação'),
    ('Saúde'), ('Engenharia'), ('Design'), ('Marketing'), ('Suporte');


CREATE TABLE flyway_schema_history (
    installed_rank INT NOT NULL PRIMARY KEY,
    version VARCHAR(50) DEFAULT NULL,
    description VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL,
    script VARCHAR(1000) NOT NULL,
    checksum INT DEFAULT NULL,
    installed_by VARCHAR(100) NOT NULL,
    installed_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    execution_time INT NOT NULL,
    success TINYINT(1) NOT NULL,
    KEY flyway_schema_history_s_idx (success)
);

INSERT INTO flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, execution_time, success)
VALUES (1, '3', '<< Flyway Baseline >>', 'BASELINE', '<< Flyway Baseline >>', NULL, 'root', 0, 1);
