# ConectIn

> Plataforma de Oportunidades Acadêmicas e Profissionais

Documento de Visão, Requisitos e Modelagem — Entregas 1 e 2

---

## Índice

**Entrega 1 — Visão e Requisitos (revisado)**
- [1. Identificação do projeto](#1-identificação-do-projeto)
- [2. Contexto e problema](#2-contexto-e-problema)
- [3. Objetivos](#3-objetivos)
- [4. Público-alvo e perfis de usuário](#4-público-alvo-e-perfis-de-usuário)
- [5. Escopo](#5-escopo)
- [6. Requisitos Funcionais](#6-requisitos-funcionais)
- [7. Requisitos Não Funcionais](#7-requisitos-não-funcionais)
- [8. Regras de Negócio](#8-regras-de-negócio)
- [9. Histórico de alterações — Entrega 1](#9-histórico-de-alterações--entrega-1)

**Entrega 2 — Modelagem do Software e do Banco de Dados**
- [10. Diagrama de Casos de Uso](#10-diagrama-de-casos-de-uso)
- [11. Especificação de Casos de Uso](#11-especificação-de-casos-de-uso)
- [12. Diagrama de Atividades](#12-diagrama-de-atividades)
- [13. Diagrama de Classes](#13-diagrama-de-classes)
- [14. Modelo Conceitual do Banco de Dados](#14-modelo-conceitual-do-banco-de-dados)
- [15. Modelo Lógico do Banco de Dados](#15-modelo-lógico-do-banco-de-dados)
- [16. Dicionário de Dados](#16-dicionário-de-dados)
- [17. Rastreabilidade](#17-rastreabilidade)

---

## 1. Identificação do projeto

**Nome provisório do projeto:** ConectIn

**Integrantes:**
- Mateus Cantelle Gomes
- Jean Carlos Bueno
- Kauã Morais
- João Passos

**Tema:** Plataforma de Oportunidades Acadêmicas e Profissionais.

**Descrição:**

Plataforma que visa amplificar a visibilidade e o acesso de vagas e oportunidades de carreira ou acadêmicas para estudantes e profissionais. Conecta instituições de ensino, empresas e candidatos em um único ambiente. Centraliza a divulgação de estágios, vagas de emprego e programas acadêmicos. Permite que estudantes criem um perfil, montem seu currículo e acompanhem suas candidaturas. Empresas ganham um canal direto para publicar oportunidades e encontrar talentos.

[⬆ Voltar ao índice](#índice)

---

## 2. Contexto e problema

Atualmente, a busca por oportunidades acadêmicas e profissionais acontece de forma fragmentada: vagas são divulgadas em murais físicos, grupos de redes sociais, sites institucionais e canais informais, sem um local único de consulta. Estudantes precisam acompanhar diversas fontes ao mesmo tempo e, com frequência, enviam currículos por e-mail sem qualquer padronização, o que dificulta tanto o acompanhamento das candidaturas por parte do estudante quanto a triagem por parte das empresas. Esse cenário gera atraso na divulgação de oportunidades, perda de prazos e retrabalho tanto para quem busca uma vaga quanto para quem a oferece.

O que motivou a criação deste projeto foi a necessidade de tornar o processo de conexão entre profissionais e respectivas vagas de emprego mais intuitivo, simples e eficiente, reunindo em um único ambiente o que hoje está disperso entre diversos canais.

**Quem enfrenta o problema:** Pessoas em busca de oportunidades no mercado de trabalho ou acadêmico, e empresas com dificuldade em centralizar e organizar suas divulgações e candidaturas.

**Por que desenvolver este aplicativo:** Desenvolver uma plataforma simples e intuitiva, que facilite o acesso das pessoas que buscam oportunidades ao meio para alcançá-las, além de tornar a busca por vagas de emprego mais rápida e acessível para todas as pessoas.

[⬆ Voltar ao índice](#índice)

---

## 3. Objetivos

**Objetivo geral:**

Desenvolver uma plataforma que centralize e facilite o acesso a vagas de emprego e oportunidades acadêmicas por meio de um software intuitivo, simples e de fácil utilização.

**Objetivos específicos:**
- Centralizar a divulgação de vagas e oportunidades em um único ambiente.
- Diminuir o tempo de procura por vagas.
- Facilitar o contato da empresa com os candidatos.

[⬆ Voltar ao índice](#índice)

---

## 4. Público-alvo e perfis de usuário

**Público-alvo:** Estudantes e profissionais em busca de oportunidades acadêmicas ou de carreira (candidatos), e empresas e instituições de ensino que oferecem essas oportunidades (empregadores).

**Necessidades:** Busca por um software de fácil acesso, simples e intuitivo, que facilite a interação entre candidatos — sejam profissionais ou estudantes buscando oportunidades acadêmicas — e as organizações que oferecem essas oportunidades.

**Responsabilidades:** Facilitar o contato entre pessoas em busca de oportunidades de trabalho ou acadêmicas e as empresas ou instituições que as oferecem.

### Permissões de cada perfil

**Candidatos (profissionais e estudantes):**
- Criar e editar seu perfil profissional/acadêmico;
- Cadastrar e atualizar o currículo (quando aplicável, ver Regra de Negócio RN04);
- Pesquisar vagas e oportunidades;
- Filtrar vagas de acordo com suas qualificações e interesses;
- Visualizar informações das vagas e oportunidades disponíveis;
- Candidatar-se às vagas de interesse;
- Acompanhar suas candidaturas.

**Empregadores (empresas e instituições de ensino):**
- Criar e editar o perfil da empresa ou instituição;
- Cadastrar e publicar vagas e oportunidades (emprego, estágio, projeto acadêmico);
- Editar ou remover vagas publicadas;
- Pesquisar e filtrar candidatos de acordo com suas necessidades;
- Visualizar currículos ou perfis dos candidatos;
- Entrar em contato com candidatos de interesse;
- Acompanhar os candidatos selecionados para cada vaga.

**Exemplos de usuários:** Estudantes universitários, pessoas em transição de carreira, pessoas que estão entrando no mercado de trabalho, equipes de Recursos Humanos, recrutadores e instituições de ensino que divulgam programas e projetos acadêmicos.

[⬆ Voltar ao índice](#índice)

---

## 5. Escopo

### Dentro do escopo
- Ferramenta de busca de vagas e oportunidades tanto para candidatos quanto para empregadores, com funcionalidades específicas de acordo com o perfil do usuário.
- Perfis de usuário nos quais será possível cadastrar currículo (quando aplicável) e definir habilidades.

### Fora do escopo
- Chats privados entre usuários: nesta versão, o contato inicial ficará restrito aos empregadores, até que medidas de segurança adequadas sejam definidas. Ainda que o tratamento de dados siga as normas da LGPD, um canal de mensagens diretas abre superfícies de risco (assédio, coleta indevida de dados de contato, engenharia social) que exigem controles de moderação e segurança mais maduros do que os previstos para esta fase inicial do projeto — por isso a decisão de mantê-lo fora do escopo permanece.

### Restrições
- O sistema não realizará verificação ou validação formal da identidade de empresas e instituições cadastradas, nem checagem antifraude das vagas publicadas nesta versão. A implementação de mecanismos de verificação de empresas fica prevista para versões futuras.
- A busca por localização é tratada como funcionalidade prevista para versões futuras (ver RF04), e não como restrição definitiva do projeto.

[⬆ Voltar ao índice](#índice)

---

## 6. Requisitos Funcionais

| Código | Requisito |
|--------|-----------|
| RF01 | O sistema deve permitir o cadastro de estudantes com dados pessoais e acadêmicos. |
| RF02 | O sistema deve permitir o cadastro de empresas com dados institucionais. |
| RF03 | O sistema deve permitir que empresas publiquem vagas (estágio, emprego, projeto acadêmico), informando título, descrição, requisitos e prazo para o fechamento das inscrições. |
| RF04 | O sistema deve permitir que estudantes pesquisem vagas por filtros (área de atuação, modalidade, tipo de vaga). |
| RF05 | O sistema deve permitir que estudantes cadastrem e anexem seus currículos ao perfil, de forma opcional para oportunidades acadêmicas (ver RN04). |
| RF06 | O sistema deve permitir que estudantes se candidatem às vagas publicadas. |
| RF07 | O sistema deve permitir que empresas visualizem e avaliem as inscrições recebidas para suas vagas. |
| RF08 | O sistema deve permitir que estudantes acompanhem o status de suas inscrições (análise, aprovado, reprovado). |
| RF09 | O sistema deve permitir que estudantes editem seu perfil e currículo a qualquer momento. |
| RF10 | O sistema deve enviar notificações aos estudantes sobre novas vagas compatíveis com suas habilidades e atualizações no status de suas inscrições. |
| RF11 | O sistema deve permitir que candidatos sem currículo cadastrado indiquem, em campo próprio do perfil, que não possuem experiência profissional e estão em busca de uma oportunidade de início de carreira. |

[⬆ Voltar ao índice](#índice)

---

## 7. Requisitos Não Funcionais

| Código | Requisito | Categoria |
|--------|-----------|-----------|
| RNF01 | O sistema deve proteger os dados pessoais dos usuários seguindo as normas da LGPD. | Segurança |
| RNF02 | A interface deve ser responsiva, funcionando em dispositivos desktop e mobile. | Usabilidade |
| RNF03 | O sistema deve possuir um tempo de resposta baixo nas buscas de vagas, mesmo com grande volume de dados. | Usabilidade |
| RNF04 | O sistema deve estar disponível 24 horas. | Disponibilidade |
| RNF05 | O sistema deve ser compatível com a maioria dos navegadores. | Usabilidade |

[⬆ Voltar ao índice](#índice)

---

## 8. Regras de Negócio

| Código | Regra |
|--------|-------|
| RN01 | Uma vaga não pode ser publicada sem uma data de encerramento das inscrições. |
| RN02 | Um estudante só pode se candidatar a uma vaga cujo prazo de inscrição ainda esteja em aberto. |
| RN03 | Toda vaga publicada deve pertencer a pelo menos uma área de atuação, usada para filtros de busca. |
| RN04 | O upload de currículo é obrigatório para se candidatar a vagas de emprego profissionais/CLT. Para oportunidades acadêmicas (estágio e projetos acadêmicos), o upload de currículo é opcional: o candidato pode, em seu lugar, marcar em seu perfil que não possui experiência profissional e está em busca de uma oportunidade inicial, informação que fica visível em espaço dedicado do perfil, no lugar do currículo. |
| RN05 | Um estudante só pode editar seu próprio perfil e currículo, estando autenticado em sua conta. |

[⬆ Voltar ao índice](#índice)

---

## 9. Histórico de alterações — Entrega 1

Registro das correções aplicadas à documentação da Entrega 1, a partir da devolutiva recebida.

| Item alterado | O que mudou | Motivo |
|---|---|---|
| Seção 4 — Público-alvo | Público-alvo ampliado de "empregados e empregadores" para incluir também estudantes e instituições de ensino em busca de oportunidades/programas acadêmicos. Perfis renomeados de "Empregados" para "Candidatos". | A definição original era mais restrita do que a proposta do projeto descrita na seção de Identificação, que já previa estágios e programas acadêmicos desde o início. |
| Seção 5 — Escopo (Restrições) | Restrição de "busca por localização" substituída por "ausência de verificação/validação de empresas e checagem antifraude nas vagas publicadas". A busca por localização passou a ser prevista como funcionalidade futura. | A restrição original não representava uma limitação técnica real da equipe nesta fase do projeto. A falta de verificação de empresas é uma limitação genuína e relevante para um MVP. |
| Seção 5 — Escopo (Fora do escopo) | Justificativa da ausência de chats privados reforçada, detalhando os riscos de segurança que motivam mantê-los fora do escopo nesta fase. | A justificativa original era breve; a devolutiva pediu maior fundamentação, mesmo mantendo a decisão original. |
| RF04 | Removida a opção de filtro por localização da busca de vagas, para manter coerência com a restrição revisada na seção de Escopo. | Consequência direta da mudança na seção de Escopo. |
| RF05 e RN04 | Currículo deixa de ser obrigatório para todas as candidaturas; passa a ser opcional para oportunidades acadêmicas (estágio/projeto acadêmico), permanecendo obrigatório para vagas profissionais/CLT. | Exigir currículo elaborado de estudantes em início de carreira é pouco realista e pode incentivar seleção enviesada por parte de recrutadores. |
| RF11 (novo) | Adicionado requisito funcional para permitir que o perfil sinalize "sem experiência profissional, em busca de oportunidade" como alternativa ao currículo. | Necessário para viabilizar a regra RN04 revisada. |

A numeração de requisitos funcionais (RF01–RF10), não funcionais (RNF01–RNF05) e regras de negócio (RN01–RN05) foi mantida integralmente; apenas o RF11 foi acrescentado como novo item ao final da lista de requisitos funcionais.

[⬆ Voltar ao índice](#índice)

---

## 10. Diagrama de Casos de Uso

**Atores:**
- **Candidato** — estudante ou profissional em busca de oportunidades acadêmicas ou de carreira.
- **Empregador** — empresa ou instituição de ensino que publica vagas e oportunidades.

### Casos de uso identificados

| Código | Caso de uso | Ator | Requisito relacionado |
|---|---|---|---|
| UC01 | Cadastrar-se | Candidato, Empregador | RF01, RF02 |
| UC02 | Editar perfil | Candidato, Empregador | RF09 |
| UC03 | Publicar vaga | Empregador | RF03 |
| UC04 | Editar/Remover vaga | Empregador | RF03 |
| UC05 | Pesquisar vagas | Candidato | RF04 |
| UC06 | Candidatar-se a vaga | Candidato | RF06 |
| UC07 | Acompanhar candidaturas | Candidato | RF08 |
| UC08 | Avaliar inscrições | Empregador | RF07 |
| UC09 | Cadastrar currículo | Candidato | RF05 |
| UC09b | Indicar sem experiência profissional | Candidato | RF11 |
| UC10 | Receber notificações | Candidato, Empregador | RF10 |
| UC11 | Pesquisar/filtrar candidatos | Empregador | RF07 |
| UC12 | Visualizar perfil/currículo do candidato | Empregador | RF07 |

### Relacionamentos entre casos de uso

- **UC06 (Candidatar-se a vaga) `<<include>>` UC05 (Pesquisar vagas):** para se candidatar, o candidato necessariamente passa pela busca/visualização da vaga.
- **UC06 `<<extend>>` UC09b:** ao se candidatar a uma oportunidade acadêmica sem currículo cadastrado, o candidato pode, de forma opcional, marcar que está sem experiência profissional (RN04).
- **UC09 (Cadastrar currículo) `<<extend>>` UC09b:** cadastrar currículo e indicar "sem experiência" são alternativas mutuamente exclusivas dentro do perfil do candidato.
- **UC08 (Avaliar inscrições) `<<include>>` UC12:** para avaliar uma inscrição, o empregador sempre visualiza o perfil/currículo do candidato.
- **UC03 (Publicar vaga) `<<include>>` UC10:** ao publicar uma vaga, o sistema dispara notificações a candidatos compatíveis.
- **UC07 (Acompanhar candidaturas) `<<include>>` UC10:** o acompanhamento de status gera notificações ao candidato.

### Observações de consistência com a Entrega 1

- Não há caso de uso de "chat privado" ou "mensagem direta entre candidato e empregador", coerente com a decisão de manter essa funcionalidade fora do escopo.
- Não há caso de uso de "verificar/validar empresa", coerente com a restrição de que o sistema não realiza validação formal de identidade de empresas nesta versão.
- Não há caso de uso de "filtrar vagas por localização", coerente com a remoção desse filtro do RF04 revisado.

[⬆ Voltar ao índice](#índice)

---

## 11. Especificação de Casos de Uso

Detalhamento das funcionalidades prioritárias do sistema, no formato ator, objetivo, pré-condições, fluxo principal, fluxos alternativos e pós-condições.

### UC01 — Publicar vaga

| Campo | Descrição |
|---|---|
| **Ator principal** | Empregador |
| **Objetivo** | Publicar uma vaga de emprego, estágio ou projeto acadêmico na plataforma |
| **Pré-condições** | O empregador deve estar cadastrado e autenticado no sistema |

**Fluxo principal:**
1. O empregador acessa a área de publicação de vagas.
2. O empregador informa título, descrição, requisitos, área de atuação e prazo de encerramento das inscrições.
3. O sistema valida o preenchimento dos campos obrigatórios, incluindo a data de encerramento (RN01).
4. O sistema associa a vaga a pelo menos uma área de atuação, usada posteriormente nos filtros de busca (RN03).
5. O sistema publica a vaga, tornando-a visível para os candidatos.

**Fluxos alternativos:**
- **A1:** Se a data de encerramento não for informada, o sistema exibe uma mensagem de erro e impede a publicação (RN01).
- **A2:** O empregador pode editar ou remover a vaga publicada a qualquer momento antes do encerramento do prazo.

**Pós-condições:** A vaga fica disponível para pesquisa e candidatura pelos candidatos até o prazo definido.

---

### UC02 — Pesquisar vagas

| Campo | Descrição |
|---|---|
| **Ator principal** | Candidato |
| **Objetivo** | Encontrar vagas compatíveis com seus interesses e qualificações |
| **Pré-condições** | Candidato autenticado no sistema |

**Fluxo principal:**
1. O candidato acessa a área de busca de vagas.
2. O candidato aplica filtros (área de atuação, modalidade, tipo de vaga).
3. O sistema retorna a lista de vagas compatíveis com os filtros aplicados.
4. O candidato seleciona uma vaga para visualizar seus detalhes.

**Fluxos alternativos:**
- **A1:** Se nenhuma vaga corresponder aos filtros, o sistema exibe uma mensagem informando a ausência de resultados e sugere ajustar os critérios.

**Pós-condições:** O candidato obtém uma lista de vagas correspondentes aos critérios informados.

> **Observação:** conforme restrição definida no escopo, a busca por localização não está disponível nesta versão.

---

### UC03 — Candidatar-se a vaga

| Campo | Descrição |
|---|---|
| **Ator principal** | Candidato |
| **Inclui** | Pesquisar vagas |
| **Estende (opcional)** | Indicar sem experiência profissional |
| **Objetivo** | Registrar a candidatura do candidato a uma vaga de interesse |
| **Pré-condições** | Candidato autenticado; vaga com prazo de inscrição em aberto (RN02) |

**Fluxo principal:**
1. O candidato visualiza os detalhes de uma vaga, encontrada por meio da pesquisa de vagas.
2. O candidato seleciona a opção de se candidatar.
3. O sistema verifica se o prazo de inscrição da vaga ainda está em aberto (RN02).
4. O sistema verifica o tipo da vaga:
   - Se for **emprego profissional/CLT**, exige que o candidato possua currículo cadastrado (RN04).
   - Se for **estágio ou projeto acadêmico**, o currículo é opcional: o candidato sem currículo pode marcar que está sem experiência profissional e em busca de uma oportunidade inicial (RF11).
5. O sistema registra a candidatura, vinculando-a ao candidato e à vaga.
6. O sistema define o status inicial da candidatura como "em análise".

**Fluxos alternativos:**
- **A1:** Se o prazo de inscrição estiver encerrado, o sistema impede a candidatura e informa o candidato (RN02).
- **A2:** Se a vaga for de emprego profissional/CLT e o candidato não possuir currículo cadastrado, o sistema bloqueia a candidatura e o direciona para completar o cadastro do currículo antes de prosseguir (RN04).
- **A3:** Se a vaga for de estágio ou projeto acadêmico e o candidato não possuir currículo, o sistema permite prosseguir com a indicação de "sem experiência profissional" no lugar do currículo (RF11).

**Pós-condições:** A candidatura é registrada e disponibilizada para avaliação do empregador responsável pela vaga.

---

### UC04 — Avaliar candidaturas

| Campo | Descrição |
|---|---|
| **Ator principal** | Empregador |
| **Objetivo** | Analisar e definir o status das candidaturas recebidas para uma vaga |
| **Pré-condições** | Empregador autenticado; vaga com candidaturas recebidas |

**Fluxo principal:**
1. O empregador acessa a lista de candidaturas recebidas para uma vaga publicada.
2. O empregador visualiza o currículo de cada candidato, quando cadastrado.
3. O empregador define o status de cada candidatura (aprovado ou reprovado).
4. O sistema atualiza o status da candidatura e notifica o candidato (RF10).

**Fluxos alternativos:**
- **A1:** O empregador pode entrar em contato diretamente com os candidatos de interesse.
- **A2:** Se o candidato não possuir currículo cadastrado (candidatura a oportunidade acadêmica), o sistema exibe, no lugar do currículo, a indicação de que o candidato está sem experiência profissional e em busca de uma oportunidade inicial (RF11).

**Pós-condições:** O status da candidatura é atualizado e o candidato é notificado da decisão.

---

### UC05 — Acompanhar inscrição

| Campo | Descrição |
|---|---|
| **Ator principal** | Candidato |
| **Objetivo** | Consultar o status atual das candidaturas realizadas |
| **Pré-condições** | Candidato autenticado; possui ao menos uma candidatura registrada |

**Fluxo principal:**
1. O candidato acessa a área "minhas candidaturas".
2. O sistema exibe a lista de candidaturas com o respectivo status (em análise, aprovado, reprovado).
3. O candidato seleciona uma candidatura para visualizar mais detalhes.

**Fluxos alternativos:**
- **A1:** O sistema envia uma notificação automática ao candidato sempre que o status de uma candidatura for atualizado (RF10).

**Pós-condições:** O candidato fica ciente do status atualizado de suas candidaturas.

[⬆ Voltar ao índice](#índice)

---

## 12. Diagrama de Atividades

Dois processos centrais do sistema foram modelados como fluxos de atividade.

### Processo 1 — Candidatar-se a uma vaga

**Início:** Candidato pesquisa/filtra vagas disponíveis (RF04).

1. Candidato visualiza os detalhes da vaga.
2. Sistema verifica se o prazo de inscrição está em aberto (RN02). Se não, exibe mensagem de inscrições encerradas e finaliza.
3. Sistema verifica o tipo da vaga (RN04):
   - **Emprego profissional/CLT:** exige currículo cadastrado; se ausente, bloqueia a candidatura e solicita o cadastro.
   - **Estágio ou projeto acadêmico:** currículo é opcional.
4. Candidato confirma a candidatura (RF06), podendo marcar "sem experiência profissional" quando aplicável (RF11).
5. Sistema registra a candidatura com status "análise" (RF08).
6. Sistema notifica o empregador sobre a nova inscrição (RF10).

### Processo 2 — Publicar uma vaga

**Início:** Empregador autenticado acessa a opção de publicar vaga.

1. Empregador preenche título, descrição, requisitos, tipo e área de atuação da vaga.
2. Sistema verifica se a data de encerramento das inscrições foi informada (RN01); se não, bloqueia e solicita a data.
3. Sistema verifica se ao menos uma área de atuação foi selecionada (RN03); se não, bloqueia e solicita a área.
4. Sistema publica a vaga (RF03).
5. Sistema disponibiliza a vaga para busca e filtros (RF04).
6. Sistema notifica candidatos com perfil/habilidades compatíveis (RF10).

[⬆ Voltar ao índice](#índice)

---

## 13. Diagrama de Classes

### Classes identificadas

- **Usuario** (superclasse): dados comuns de autenticação e cadastro (id, nome, email, senha, tipoUsuario).
- **Candidato** (especialização de Usuario): dados acadêmicos, habilidades e o atributo `semExperiencia` (RF11).
- **Empregador** (especialização de Usuario): dados institucionais (razão social, CNPJ ou código, tipo de instituição).
- **Curriculo**: relação opcional (0..1) com Candidato, refletindo a RN04 revisada.
- **Vaga**: publicada por um Empregador, com tipo, prazo e status.
- **AreaAtuacao**: classificação usada nos filtros (RN03), em relação N:N com Vaga.
- **Candidatura**: liga Candidato e Vaga, com status (análise/aprovado/reprovado).
- **Notificacao**: recebida por qualquer Usuario (candidato ou empregador).

### Relacionamentos e cardinalidades

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

[⬆ Voltar ao índice](#índice)

---

## 14. Modelo Conceitual do Banco de Dados

### Entidades

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

### Justificativas de modelagem

- **CANDIDATO e EMPREGADOR como especializações de USUARIO:** compartilham atributos de autenticação, mas possuem atributos próprios distintos.
- **Relacionamento opcional entre CANDIDATO e CURRICULO (0..1):** decorre da RN04 revisada — currículo obrigatório apenas para vagas de emprego profissional/CLT.
- **Relacionamento N:N entre VAGA e AREA_ATUACAO:** resolvido no modelo lógico por meio de uma tabela associativa (RN03).
- **CANDIDATURA como entidade associativa:** carrega atributos próprios (data e status).
- **NOTIFICACAO associada a USUARIO:** tanto candidatos quanto empregadores recebem notificações (RF10).

[⬆ Voltar ao índice](#índice)

---

## 15. Modelo Lógico do Banco de Dados

### Tabelas

O modelo conceitual foi transformado em 9 tabelas relacionais: `usuario`, `candidato`, `empregador`, `curriculo`, `vaga`, `area_atuacao`, `vaga_area` (associativa), `candidatura` e `notificacao`.

A especialização de `usuario` em `candidato` e `empregador` foi resolvida pela estratégia de **tabela por subtipo com chave compartilhada**: `id_usuario` é, ao mesmo tempo, chave primária e estrangeira nas tabelas de subtipo.

### Restrições importantes

- `usuario.email` — `UNIQUE`.
- `curriculo.id_candidato` — `UNIQUE` (relação 1:0..1).
- `candidatura (id_candidato, id_vaga)` — `UNIQUE`, impedindo candidatura duplicada.
- `vaga.status` — `DEFAULT 'aberta'`.
- `candidatura.status` — `DEFAULT 'analise'`.
- `candidato.sem_experiencia` — `BOOLEAN NOT NULL DEFAULT FALSE` (viabiliza o RF11).

[⬆ Voltar ao índice](#índice)

---

## 16. Dicionário de Dados

### usuario

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_usuario | INT | Sim | PK | Identificador único |
| nome | VARCHAR(150) | Sim | — | Nome completo |
| email | VARCHAR(150) | Sim | UNIQUE | E-mail de login |
| senha_hash | VARCHAR(255) | Sim | — | Senha criptografada |
| tipo_usuario | ENUM | Sim | — | 'candidato' ou 'empregador' |
| data_cadastro | DATETIME | Sim | — | Data de criação da conta |

### candidato

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_usuario | INT | Sim | PK, FK (usuario) | Referência ao usuário base |
| data_nascimento | DATE | Não | — | Data de nascimento |
| formacao_academica | VARCHAR(150) | Não | — | Formação do candidato |
| area_interesse | VARCHAR(100) | Não | — | Área de interesse |
| sem_experiencia | BOOLEAN | Sim (default FALSE) | — | Indica ausência de experiência profissional (RF11) |

### empregador

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_usuario | INT | Sim | PK, FK (usuario) | Referência ao usuário base |
| razao_social | VARCHAR(150) | Sim | — | Nome da empresa/instituição |
| cnpj_ou_codigo | VARCHAR(30) | Sim | — | CNPJ ou código institucional |
| tipo_instituicao | ENUM | Sim | — | 'empresa' ou 'instituicao_ensino' |

### curriculo

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_curriculo | INT | Sim | PK | Identificador único |
| id_candidato | INT | Sim | FK (candidato), UNIQUE | Candidato dono do currículo |
| arquivo_url | VARCHAR(255) | Sim | — | Local do arquivo |
| resumo | TEXT | Não | — | Resumo profissional |
| habilidades | TEXT | Não | — | Habilidades do candidato |
| data_atualizacao | DATETIME | Sim | — | Última atualização |

### vaga

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_vaga | INT | Sim | PK | Identificador único |
| id_empregador | INT | Sim | FK (empregador) | Empregador responsável |
| titulo | VARCHAR(150) | Sim | — | Título da vaga |
| descricao | TEXT | Sim | — | Descrição detalhada |
| requisitos | TEXT | Não | — | Requisitos exigidos |
| tipo | ENUM | Sim | — | 'emprego', 'estagio' ou 'projeto_academico' |
| prazo_inscricao | DATE | Sim | — | Data limite (RN01) |
| data_publicacao | DATETIME | Sim | — | Data de publicação |
| status | ENUM | Sim (default 'aberta') | — | 'aberta' ou 'encerrada' |

### area_atuacao

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_area | INT | Sim | PK | Identificador único |
| nome | VARCHAR(100) | Sim | UNIQUE | Nome da área |

### vaga_area (associativa)

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_vaga | INT | Sim | PK, FK (vaga) | Vaga associada |
| id_area | INT | Sim | PK, FK (area_atuacao) | Área associada |

### candidatura

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_candidatura | INT | Sim | PK | Identificador único |
| id_candidato | INT | Sim | FK (candidato) | Candidato inscrito |
| id_vaga | INT | Sim | FK (vaga) | Vaga alvo |
| data_candidatura | DATETIME | Sim | — | Data da candidatura |
| status | ENUM | Sim (default 'analise') | — | 'analise', 'aprovado' ou 'reprovado' |
| — | — | — | UNIQUE (id_candidato, id_vaga) | Evita duplicidade |

### notificacao

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id_notificacao | INT | Sim | PK | Identificador único |
| id_usuario | INT | Sim | FK (usuario) | Destinatário |
| tipo | ENUM | Sim | — | 'nova_vaga' ou 'status_candidatura' |
| mensagem | VARCHAR(255) | Sim | — | Texto da notificação |
| data_envio | DATETIME | Sim | — | Data de envio |
| lida | BOOLEAN | Sim (default FALSE) | — | Se já foi visualizada |

[⬆ Voltar ao índice](#índice)

---

## 17. Rastreabilidade

| Requisito | Caso de uso | Entidades envolvidas | Tela prevista |
|---|---|---|---|
| RF01 | UC01 — Cadastrar-se | usuario, candidato | Tela de cadastro de candidato |
| RF02 | UC01 — Cadastrar-se | usuario, empregador | Tela de cadastro de empregador |
| RF03 | UC03 — Publicar vaga | vaga, empregador, area_atuacao, vaga_area | Tela de nova vaga |
| RF04 | UC05 — Pesquisar vagas | vaga, area_atuacao, vaga_area | Tela de busca/listagem de vagas |
| RF05 | UC09 — Cadastrar currículo | curriculo, candidato | Tela de currículo do perfil |
| RF06 | UC06 — Candidatar-se a vaga | candidatura, candidato, vaga | Tela de detalhes da vaga |
| RF07 | UC08 — Avaliar inscrições / UC11 / UC12 | candidatura, candidato, curriculo | Tela de gestão de inscrições |
| RF08 | UC07 — Acompanhar candidaturas | candidatura, vaga | Tela "Minhas candidaturas" |
| RF09 | UC02 — Editar perfil | candidato, curriculo | Tela de edição de perfil |
| RF10 | UC10 — Receber notificações | notificacao, usuario | Central de notificações |
| RF11 | UC09b — Indicar sem experiência | candidato | Tela de currículo do perfil |

### Regras de negócio e sua aplicação

| Regra de negócio | Onde é aplicada | Entidades/campos envolvidos |
|---|---|---|
| RN01 | UC03 — Publicar vaga | vaga.prazo_inscricao |
| RN02 | UC06 — Candidatar-se a vaga | vaga.prazo_inscricao, vaga.status |
| RN03 | UC03 — Publicar vaga | vaga_area, area_atuacao |
| RN04 | UC06 / UC09b | curriculo, candidato.sem_experiencia, vaga.tipo |
| RN05 | UC02 — Editar perfil | usuario, candidato |

[⬆ Voltar ao índice](#índice)
