# 6. Modelo Conceitual do Banco de Dados

O diagrama entidade-relacionamento completo está disponível no arquivo **ConectIn_Diagramas_Entrega2.pdf** (página 6).

## 6.1 Entidades

| Entidade | Descrição |
|---|---|
| USUARIO | Entidade genérica que representa qualquer pessoa cadastrada (candidato ou empregador) |
| CANDIDATO | Especialização de USUARIO: estudantes e profissionais |
| EMPREGADOR | Especialização de USUARIO: empresas e instituições de ensino |
| CURRICULO | Currículo vinculado a um candidato |
| VAGA | Oportunidade publicada por um empregador |
| AREA_ATUACAO | Classificação temática usada para filtros de busca |
| CANDIDATURA | Registro de inscrição de um candidato em uma vaga |
| NOTIFICACAO | Mensagem enviada a um usuário |

## 6.2 Relacionamentos e cardinalidades

| Relacionamento | Entidades envolvidas | Cardinalidade |
|---|---|---|
| é um tipo de | USUARIO — CANDIDATO | 1:1 |
| é um tipo de | USUARIO — EMPREGADOR | 1:1 |
| possui | CANDIDATO — CURRICULO | 1 : 0..1 |
| publica | EMPREGADOR — VAGA | 1 : 0..* |
| realiza | CANDIDATO — CANDIDATURA | 1 : 0..* |
| referente a | VAGA — CANDIDATURA | 1 : 0..* |
| classificada em | VAGA — AREA_ATUACAO | 1..* : 1..* |
| recebe | USUARIO — NOTIFICACAO | 1 : 0..* |

## 6.3 Justificativas de modelagem

- **CANDIDATO e EMPREGADOR como especializações de USUARIO:** ambos compartilham atributos de autenticação e cadastro básico (nome, e-mail, senha), mas possuem atributos próprios distintos, o que justifica a generalização/especialização em vez de uma única entidade genérica.
- **Relacionamento opcional entre CANDIDATO e CURRICULO (0..1):** decorre diretamente da RN04 revisada — currículo obrigatório apenas para vagas de emprego profissional/CLT, opcional para oportunidades acadêmicas.
- **Relacionamento N:N entre VAGA e AREA_ATUACAO:** uma vaga pode pertencer a mais de uma área (ex.: "Tecnologia" e "Administração"), e uma área agrega várias vagas; esse relacionamento é resolvido no modelo lógico por meio de uma tabela associativa (RN03).
- **CANDIDATURA como entidade associativa entre CANDIDATO e VAGA:** carrega atributos próprios (data e status), o que justifica sua modelagem como entidade e não apenas como relacionamento simples.
- **NOTIFICACAO associada a USUARIO (e não separadamente a CANDIDATO/EMPREGADOR):** tanto candidatos quanto empregadores recebem notificações (RF10), portanto o relacionamento é modelado na entidade genérica.
