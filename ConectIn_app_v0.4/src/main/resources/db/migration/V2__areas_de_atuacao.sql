-- ConectIn — V2: áreas de atuação usadas na publicação de vagas, nos filtros (RN03) e no perfil do candidato.
-- INSERT IGNORE: não duplica as áreas que o dados-teste.sql já tenha criado.

INSERT IGNORE INTO area_atuacao (nome) VALUES
    ('Tecnologia'),
    ('Dados'),
    ('Pesquisa'),
    ('Administração'),
    ('Educação'),
    ('Saúde'),
    ('Engenharia'),
    ('Design'),
    ('Marketing'),
    ('Suporte');
