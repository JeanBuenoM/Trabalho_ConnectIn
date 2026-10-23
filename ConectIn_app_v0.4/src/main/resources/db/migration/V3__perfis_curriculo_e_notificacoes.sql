-- ConectIn — V3: campos que as telas do protótipo de alta fidelidade usam e que faltavam no banco.

-- Contato e foto (candidato e empregador)
ALTER TABLE usuario
    ADD COLUMN telefone VARCHAR(20) NULL AFTER email,
    ADD COLUMN foto_url VARCHAR(255) NULL AFTER telefone;

-- Formação acadêmica completa e "sobre mim" (RF01, RF09).
-- O nome do curso continua em formacao_academica.
ALTER TABLE candidato
    ADD COLUMN instituicao VARCHAR(150) NULL AFTER formacao_academica,
    ADD COLUMN status_formacao ENUM('cursando', 'concluido', 'trancado') NULL AFTER instituicao,
    ADD COLUMN ano_conclusao SMALLINT NULL AFTER status_formacao,
    ADD COLUMN sobre TEXT NULL AFTER area_interesse;

-- Habilidades do candidato (RF05, RF10). Ficam no candidato, e não no currículo,
-- porque o currículo é opcional para oportunidades acadêmicas (RN04).
CREATE TABLE habilidade_candidato (
    id_candidato INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_candidato, nome),
    FOREIGN KEY (id_candidato) REFERENCES candidato(id_usuario) ON DELETE CASCADE
);

-- Nome original e tamanho do PDF enviado (o arquivo fica na pasta de uploads do servidor)
ALTER TABLE curriculo
    ADD COLUMN nome_arquivo VARCHAR(255) NULL AFTER arquivo_url,
    ADD COLUMN tamanho_bytes BIGINT NULL AFTER nome_arquivo;

-- Apresentação da empresa ou instituição (RF02, RF09)
ALTER TABLE empregador
    ADD COLUMN descricao TEXT NULL;

-- Quando a empresa mudou o status da candidatura (RF07, RF08)
ALTER TABLE candidatura
    ADD COLUMN data_atualizacao DATETIME NULL;

-- O empregador também é avisado de novas candidaturas (diagrama de atividades, processo 1, passo 6).
-- id_referencia aponta para a vaga ou a candidatura que a notificação menciona.
ALTER TABLE notificacao
    MODIFY COLUMN tipo ENUM('nova_vaga', 'status_candidatura', 'nova_candidatura') NOT NULL,
    ADD COLUMN id_referencia INT NULL;

-- Índices para a busca de vagas continuar rápida com muitos dados (RNF03)
CREATE INDEX idx_vaga_status_prazo ON vaga (status, prazo_inscricao);
CREATE INDEX idx_vaga_publicacao ON vaga (data_publicacao);
CREATE INDEX idx_candidatura_vaga_status ON candidatura (id_vaga, status);
CREATE INDEX idx_notificacao_usuario_lida ON notificacao (id_usuario, lida);
