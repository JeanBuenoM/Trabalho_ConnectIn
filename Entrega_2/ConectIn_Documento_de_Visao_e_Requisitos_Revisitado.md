# ConectIn

> Plataforma de Oportunidades Acadêmicas e Profissionais

Documento de Visão e Requisitos — Entrega 1 (Revisado)

---

## Índice

- [1. Identificação do projeto](#1-identificação-do-projeto)
- [2. Contexto e problema](#2-contexto-e-problema)
- [3. Objetivos](#3-objetivos)
- [4. Público-alvo e perfis de usuário](#4-público-alvo-e-perfis-de-usuário)
- [5. Escopo](#5-escopo)
- [6. Requisitos Funcionais](#6-requisitos-funcionais)
- [7. Requisitos Não Funcionais](#7-requisitos-não-funcionais)
- [8. Regras de Negócio](#8-regras-de-negócio)
- [9. Histórico de alterações](#9-histórico-de-alterações)

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

**Público-alvo:** Estudantes e profissionais em busca de oportunidades acadêmicas ou de carreira (empregados/candidatos), empresas e instituições de ensino que oferecem essas oportunidades (empregadores).

**Revisão:** a versão anterior restringia o público-alvo a "empregados e empregadores", o que contrariava a proposta original do projeto descrita na própria seção de Identificação como uma plataforma que também atende ao meio acadêmico (estágios, programas e projetos acadêmicos). A definição foi ampliada para refletir isso.

**Necessidades:** Busca por um software de fácil acesso, simples e intuitivo, que facilite a interação entre candidatos — sejam profissionais ou estudantes buscando oportunidades acadêmicas — e as organizações que oferecem essas oportunidades.

**Responsabilidades:** Facilitar o contato entre pessoas em busca de oportunidades de trabalho ou acadêmicas e as empresas ou instituições que as oferecem.

### Perfis de usuário

**Candidatos (profissionais e estudantes):**
- Criar e editar seu perfil profissional/acadêmico;
- Cadastrar e atualizar o currículo (quando aplicável — ver Regra de Negócio RN04 revisada);
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
- **(Revisado)** O sistema não realizará verificação ou validação formal da identidade de empresas e instituições cadastradas, nem checagem antifraude das vagas publicadas nesta versão. A ausência de um processo de verificação é uma limitação real do projeto nesta fase — diferente da restrição de busca por localização definida anteriormente, que era evitável e não refletia uma limitação técnica genuína da equipe. A implementação de mecanismos de verificação de empresas fica prevista para versões futuras.
- A busca por localização passa a ser tratada como funcionalidade prevista para versões futuras (ver RF04 revisado), e não mais como restrição do projeto.

[⬆ Voltar ao índice](#índice)

---

## 6. Requisitos Funcionais

| Código | Requisito |
|--------|-----------|
| RF01 | O sistema deve permitir o cadastro de estudantes com dados pessoais e acadêmicos. |
| RF02 | O sistema deve permitir o cadastro de empresas com dados institucionais. |
| RF03 | O sistema deve permitir que empresas publiquem vagas (estágio, emprego, projeto acadêmico), informando título, descrição, requisitos e prazo para o fechamento das inscrições. |
| RF04 | O sistema deve permitir que estudantes pesquisem vagas por filtros (área de atuação, modalidade, tipo de vaga). *(Revisado: filtro de localização removido desta entrega — ver seção de Escopo.)* |
| RF05 | O sistema deve permitir que estudantes cadastrem e anexem seus currículos ao perfil, de forma opcional para oportunidades acadêmicas *(ver RN04 revisado)*. |
| RF06 | O sistema deve permitir que estudantes se candidatem às vagas publicadas. |
| RF07 | O sistema deve permitir que empresas visualizem e avaliem as inscrições recebidas para suas vagas. |
| RF08 | O sistema deve permitir que estudantes acompanhem o status de suas inscrições (análise, aprovado, reprovado). |
| RF09 | O sistema deve permitir que estudantes editem seu perfil e currículo a qualquer momento. |
| RF10 | O sistema deve enviar notificações aos estudantes sobre novas vagas compatíveis com suas habilidades e atualizações no status de suas inscrições. |
| RF11 | *(Novo)* O sistema deve permitir que candidatos sem currículo cadastrado indiquem, em campo próprio do perfil, que não possuem experiência profissional e estão em busca de uma oportunidade de início de carreira. |

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
| RN04 | **(Revisado)** O upload de currículo é obrigatório para se candidatar a vagas de emprego profissionais/CLT. Para oportunidades acadêmicas (estágio e projetos acadêmicos), o upload de currículo é opcional: o candidato pode, em seu lugar, marcar em seu perfil que não possui experiência profissional e está em busca de uma oportunidade inicial — informação que fica visível em espaço dedicado do perfil, no lugar do currículo. |
| RN05 | Um estudante só pode editar seu próprio perfil e currículo, estando autenticado em sua conta. |

[⬆ Voltar ao índice](#índice)

---

## 9. Histórico de alterações

| Item alterado | O que mudou | Motivo |
|---|---|---|
| Seção 4 — Público-alvo | Público-alvo ampliado de "empregados e empregadores" para incluir também estudantes e instituições de ensino em busca de oportunidades/programas acadêmicos. Perfis renomeados de "Empregados" para "Candidatos" para refletir esse escopo. | A definição original era mais restrita do que a proposta do projeto descrita na seção de Identificação, que já previa estágios e programas acadêmicos desde o início. |
| Seção 5 — Escopo (Restrições) | Restrição de "busca por localização" substituída por "ausência de verificação/validação de empresas e checagem antifraude nas vagas publicadas". A busca por localização passou a ser prevista como funcionalidade futura. | A restrição original não representava uma limitação técnica real da equipe nesta fase do projeto. A falta de verificação de empresas é uma limitação genuína e relevante para um MVP. |
| Seção 5 — Escopo (Fora do escopo) | Justificativa da ausência de chats privados reforçada, detalhando os riscos de segurança que motivam mantê-los fora do escopo nesta fase. | A justificativa original era breve; a devolutiva pediu maior fundamentação, mesmo mantendo a decisão original. |
| RF04 | Removida a opção de filtro por localização da busca de vagas, para manter coerência com a restrição revisada na seção de Escopo. | Consequência direta da mudança na seção de Escopo. |
| RF05 e RN04 | Currículo deixa de ser obrigatório para todas as candidaturas; passa a ser opcional para oportunidades acadêmicas (estágio/projeto acadêmico), permanecendo obrigatório para vagas profissionais/CLT. | Exigir currículo elaborado de estudantes em início de carreira é pouco realista e pode incentivar seleção enviesada ("cherry-picking") por parte de recrutadores. |
| RF11 (novo) | Adicionado requisito funcional para permitir que o perfil sinalize "sem experiência profissional, em busca de oportunidade" como alternativa ao currículo. | Necessário para viabilizar a regra RN04 revisada. |

[⬆ Voltar ao índice](#índice)
