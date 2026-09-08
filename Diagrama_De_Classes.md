# 5. Diagrama de Classes

O diagrama completo está disponível no arquivo **ConectIn_Diagramas_Entrega2.pdf** (página 5).

## 5.1 Classes identificadas

### Usuario (superclasse)
Representa os dados comuns a qualquer pessoa cadastrada no sistema.

| Atributo | Descrição |
|---|---|
| id | Identificador único |
| nome | Nome do usuário |
| email | E-mail de acesso (único) |
| senhaHash | Senha criptografada |
| dataCadastro | Data de criação da conta |

**Métodos:** autenticar(), editarPerfil()

### Candidato (especialização de Usuario)
Representa estudantes e profissionais em busca de oportunidades.

| Atributo | Descrição |
|---|---|
| dataNascimento | Data de nascimento |
| formacaoAcademica | Formação do candidato |
| areaInteresse | Área de interesse profissional/acadêmica |
| semExperiencia | Indica se o candidato optou por sinalizar ausência de experiência profissional (RF11) |

**Métodos:** cadastrarCurriculo(), candidatarSe(vaga), acompanharCandidaturas(), marcarSemExperiencia()

### Empregador (especialização de Usuario)
Representa empresas e instituições de ensino.

| Atributo | Descrição |
|---|---|
| razaoSocial | Nome da empresa/instituição |
| cnpjOuCodigoInstituicao | Identificação institucional |
| tipoInstituicao | Empresa ou instituição de ensino |

**Métodos:** publicarVaga(), editarVaga(), removerVaga(), avaliarInscricao()

### Curriculo
Relacionado a um candidato, de forma opcional (0..1), refletindo a RN04 revisada.

| Atributo | Descrição |
|---|---|
| id | Identificador único |
| arquivoUrl | Localização do arquivo de currículo |
| resumo | Resumo profissional |
| experiencias | Experiências anteriores |
| habilidades | Habilidades do candidato |
| dataAtualizacao | Última atualização |

### Vaga
Publicada por um empregador, associada a uma ou mais áreas de atuação.

| Atributo | Descrição |
|---|---|
| id | Identificador único |
| titulo | Título da vaga |
| descricao | Descrição da vaga |
| requisitos | Requisitos exigidos |
| tipo | emprego / estágio / projeto acadêmico |
| prazoInscricao | Data limite de inscrição (RN01) |
| dataPublicacao | Data de publicação |
| status | aberta / encerrada |

**Métodos:** publicar(), encerrarInscricoes()

### AreaAtuacao
Classificação usada para os filtros de busca (RN03), associada às vagas em relação N:N.

| Atributo | Descrição |
|---|---|
| id | Identificador único |
| nome | Nome da área de atuação |

### Candidatura
Liga um Candidato a uma Vaga.

| Atributo | Descrição |
|---|---|
| id | Identificador único |
| dataCandidatura | Data em que a candidatura foi realizada |
| status | análise / aprovado / reprovado |

**Métodos:** atualizarStatus()

### Notificacao
Recebida por qualquer usuário (candidato ou empregador).

| Atributo | Descrição |
|---|---|
| id | Identificador único |
| tipo | nova vaga / status de candidatura |
| mensagem | Conteúdo da notificação |
| dataEnvio | Data de envio |
| lida | Indica se já foi visualizada |

## 5.2 Relacionamentos e cardinalidades

| Classe A | Relacionamento | Classe B | Cardinalidade |
|---|---|---|---|
| Usuario | herda para | Candidato | 1:1 (generalização) |
| Usuario | herda para | Empregador | 1:1 (generalização) |
| Candidato | possui | Curriculo | 1 : 0..1 |
| Empregador | publica | Vaga | 1 : 0..* |
| Candidato | realiza | Candidatura | 1 : 0..* |
| Vaga | recebe | Candidatura | 1 : 0..* |
| Vaga | classificada em | AreaAtuacao | 1..* : 1..* (N:N) |
| Usuario | recebe | Notificacao | 1 : 0..* |

## 5.3 Coerência com a Entrega 1

- O relacionamento **Candidato–Curriculo com cardinalidade 0..1** reflete diretamente a RN04 revisada: o currículo não é obrigatório para todo candidato, apenas para quem se candidata a vagas de emprego profissional/CLT.
- O atributo **semExperiencia** em Candidato viabiliza o RF11 (novo).
- A relação N:N entre **Vaga e AreaAtuacao** reflete a RN03 (toda vaga deve pertencer a pelo menos uma área de atuação, usada nos filtros do RF04).
