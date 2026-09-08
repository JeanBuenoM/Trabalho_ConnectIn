# 8. Dicionário de Dados

## Tabela: usuario

Armazena os dados comuns a qualquer pessoa cadastrada no sistema.

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_usuario | INT | — | Sim | PK | Identificador único do usuário |
| nome | VARCHAR | 150 | Sim | — | Nome completo do usuário |
| email | VARCHAR | 150 | Sim | UNIQUE | E-mail de acesso, usado no login |
| senha_hash | VARCHAR | 255 | Sim | — | Senha criptografada |
| tipo_usuario | ENUM('candidato','empregador') | — | Sim | — | Define o tipo de perfil associado |
| data_cadastro | DATETIME | — | Sim | — | Data e hora de criação da conta |

## Tabela: candidato

Dados específicos de candidatos (estudantes e profissionais).

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_usuario | INT | — | Sim | PK, FK (usuario) | Referência ao usuário base |
| data_nascimento | DATE | — | Não | — | Data de nascimento do candidato |
| formacao_academica | VARCHAR | 150 | Não | — | Curso ou formação do candidato |
| area_interesse | VARCHAR | 100 | Não | — | Área de interesse profissional/acadêmica |
| sem_experiencia | BOOLEAN | — | Sim (default FALSE) | — | Indica se o candidato sinalizou ausência de experiência profissional (RF11) |

## Tabela: empregador

Dados específicos de empresas e instituições de ensino.

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_usuario | INT | — | Sim | PK, FK (usuario) | Referência ao usuário base |
| razao_social | VARCHAR | 150 | Sim | — | Nome da empresa ou instituição |
| cnpj_ou_codigo | VARCHAR | 30 | Sim | — | CNPJ (empresa) ou código institucional (instituição de ensino) |
| tipo_instituicao | ENUM('empresa','instituicao_ensino') | — | Sim | — | Classifica o empregador |

## Tabela: curriculo

Currículo vinculado a um candidato (relação opcional, conforme RN04 revisada).

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_curriculo | INT | — | Sim | PK | Identificador único do currículo |
| id_candidato | INT | — | Sim | FK (candidato), UNIQUE | Candidato ao qual o currículo pertence (1 currículo por candidato) |
| arquivo_url | VARCHAR | 255 | Sim | — | Local de armazenamento do arquivo de currículo |
| resumo | TEXT | — | Não | — | Resumo profissional do candidato |
| habilidades | TEXT | — | Não | — | Lista de habilidades do candidato |
| data_atualizacao | DATETIME | — | Sim | — | Data da última atualização do currículo |

## Tabela: vaga

Oportunidades publicadas pelos empregadores.

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_vaga | INT | — | Sim | PK | Identificador único da vaga |
| id_empregador | INT | — | Sim | FK (empregador) | Empregador responsável pela publicação |
| titulo | VARCHAR | 150 | Sim | — | Título da vaga |
| descricao | TEXT | — | Sim | — | Descrição detalhada da vaga |
| requisitos | TEXT | — | Não | — | Requisitos exigidos dos candidatos |
| tipo | ENUM('emprego','estagio','projeto_academico') | — | Sim | — | Tipo da oportunidade |
| prazo_inscricao | DATE | — | Sim | — | Data limite para candidaturas (RN01) |
| data_publicacao | DATETIME | — | Sim | — | Data de publicação da vaga |
| status | ENUM('aberta','encerrada') | — | Sim (default 'aberta') | — | Situação atual da vaga |

## Tabela: area_atuacao

Áreas usadas para classificar vagas e alimentar os filtros de busca (RN03).

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_area | INT | — | Sim | PK | Identificador único da área |
| nome | VARCHAR | 100 | Sim | UNIQUE | Nome da área de atuação (ex.: Tecnologia, Administração) |

## Tabela: vaga_area (tabela associativa)

Resolve o relacionamento muitos-para-muitos entre vaga e area_atuacao.

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_vaga | INT | — | Sim | PK, FK (vaga) | Vaga associada |
| id_area | INT | — | Sim | PK, FK (area_atuacao) | Área de atuação associada |

## Tabela: candidatura

Registra a inscrição de um candidato em uma vaga.

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_candidatura | INT | — | Sim | PK | Identificador único da candidatura |
| id_candidato | INT | — | Sim | FK (candidato) | Candidato que se inscreveu |
| id_vaga | INT | — | Sim | FK (vaga) | Vaga à qual se candidatou |
| data_candidatura | DATETIME | — | Sim | — | Data e hora da candidatura |
| status | ENUM('analise','aprovado','reprovado') | — | Sim (default 'analise') | — | Situação da candidatura |
| — | — | — | — | UNIQUE (id_candidato, id_vaga) | Impede candidatura duplicada do mesmo candidato na mesma vaga |

## Tabela: notificação

Mensagens enviadas aos usuários (candidatos e empregadores).

| Campo | Tipo | Tamanho | Obrigatório | Chave | Descrição |
|---|---|---|---|---|---|
| id_notificacao | INT | — | Sim | PK | Identificador único da notificação |
| id_usuario | INT | — | Sim | FK (usuario) | Usuário destinatário da notificação |
| tipo | ENUM('nova_vaga','status_candidatura') | — | Sim | — | Categoria da notificação |
| mensagem | VARCHAR | 255 | Sim | — | Texto da notificação |
| data_envio | DATETIME | — | Sim | — | Data e hora de envio |
| lida | BOOLEAN | — | Sim (default FALSE) | — | Indica se a notificação já foi visualizada |
