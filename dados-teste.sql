-- ConectIn — Dados fictícios de teste (T15)
-- Rodar DEPOIS do schema.sql. Pode ser executado mais de uma vez sem duplicar os dados.
-- Não contém senhas nem dados reais.

USE conectin;

-- Empregador de teste, usado para publicar vagas enquanto não existe login (ver docs/MVP.md)
INSERT IGNORE INTO usuario (id_usuario, nome, email, senha_hash, tipo_usuario)
VALUES (1, 'Empresa Teste', 'empresa.teste@conectin.example', 'SENHA-FICTICIA-NAO-USAR', 'empregador');

INSERT IGNORE INTO empregador (id_usuario, razao_social, cnpj_ou_codigo, tipo_instituicao)
VALUES (1, 'Empresa Teste Ltda', '00.000.000/0000-00', 'empresa');

-- Áreas de atuação usadas nos filtros (RN03)
INSERT IGNORE INTO area_atuacao (nome)
VALUES ('Tecnologia'), ('Administração'), ('Educação'), ('Saúde'), ('Engenharia');
