
-- Contato e foto (candidato e empregador)
ALTER TABLE usuario
    ADD COLUMN telefone VARCHAR(20) NULL AFTER email,
    ADD COLUMN foto_url VARCHAR(255) NULL AFTER telefone;


ALTER TABLE candidato
    ADD COLUMN instituicao VARCHAR(150) NULL AFTER formacao_academica,
    ADD COLUMN status_formacao ENUM('cursando', 'concluido', 'trancado') NULL AFTER instituicao,
    ADD COLUMN ano_conclusao SMALLINT NULL AFTER status_formacao,
    ADD COLUMN sobre TEXT NULL AFTER area_interesse;


CREATE TABLE habilidade_candidato (
    id_candidato INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_candidato, nome),
    FOREIGN KEY (id_candidato) REFERENCES candidato(id_usuario) ON DELETE CASCADE
);


ALTER TABLE curriculo
    ADD COLUMN nome_arquivo VARCHAR(255) NULL AFTER arquivo_url,
    ADD COLUMN tamanho_bytes BIGINT NULL AFTER nome_arquivo;


ALTER TABLE empregador
    ADD COLUMN descricao TEXT NULL;


ALTER TABLE candidatura
    ADD COLUMN data_atualizacao DATETIME NULL;


ALTER TABLE notificacao
    MODIFY COLUMN tipo ENUM('nova_vaga', 'status_candidatura', 'nova_candidatura') NOT NULL,
    ADD COLUMN id_referencia INT NULL;

CREATE INDEX idx_vaga_status_prazo ON vaga (status, prazo_inscricao);
CREATE INDEX idx_vaga_publicacao ON vaga (data_publicacao);
CREATE INDEX idx_candidatura_vaga_status ON candidatura (id_vaga, status);
CREATE INDEX idx_notificacao_usuario_lida ON notificacao (id_usuario, lida);
