# ConectIn

> Plataforma de Oportunidades Acadêmicas e Profissionais

Documento de Visão e Requisitos — Entrega 1

---

## Índice

- [1. Identificação do projeto](https://github.com/JeanBuenoM/Trabalho-Imers-o-Profissional/blob/main/Entrega_1/Identifica%C3%A7%C3%A3o.md)
- [2. Contexto e problema](https://github.com/JeanBuenoM/Trabalho-Imers-o-Profissional/blob/main/Contexto_e_Problema.md)
- [3. Objetivos](https://github.com/JeanBuenoM/Trabalho-Imers-o-Profissional/blob/main/Objetivos.md)
- [4. Público-alvo e perfis de usuário](https://github.com/JeanBuenoM/Trabalho-Imers-o-Profissional/blob/main/P%C3%BAblico-alvo.md)
- [5. Escopo](https://github.com/JeanBuenoM/Trabalho-Imers-o-Profissional/blob/main/Escopo.md)
- [6. Requisitos Funcionais](https://github.com/JeanBuenoM/Trabalho-Imers-o-Profissional/blob/main/Requisitos_Funcionais.md)
- [7. Requisitos Não Funcionais](https://github.com/JeanBuenoM/Trabalho-Imers-o-Profissional/blob/main/Requisitos_N%C3%A3o_Funcionais.md)
- [8. Regras de Negócio](https://github.com/JeanBuenoM/Trabalho-Imers-o-Profissional/blob/main/Regras_de_Neg%C3%B3cio.md)

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

**Público-alvo:** Possíveis empregados e empregadores.

**Necessidades:** Busca por um software de fácil acesso, simples e intuitivo, que facilite a interação entre profissionais e empresas.

**Responsabilidades:** Facilitar o contato entre profissionais em busca de oportunidades de trabalho e empresas que procuram novos funcionários.

### Permissões de cada perfil

**Empregados:**
- Criar e editar seu perfil profissional;
- Cadastrar e atualizar o currículo;
- Pesquisar vagas de emprego;
- Filtrar vagas de acordo com suas qualificações e interesses;
- Visualizar informações das vagas disponíveis;
- Candidatar-se às vagas de interesse;
- Acompanhar suas candidaturas.

**Empregadores:**
- Criar e editar o perfil da empresa;
- Cadastrar e publicar vagas de emprego;
- Editar ou remover vagas publicadas;
- Pesquisar e filtrar candidatos de acordo com suas necessidades;
- Visualizar currículos dos candidatos;
- Entrar em contato com candidatos de interesse;
- Acompanhar os candidatos selecionados para cada vaga.

**Exemplos de usuários:** Estudantes universitários, pessoas em transição de carreira, pessoas que estão entrando no mercado de trabalho, equipes de Recursos Humanos e recrutadores.

[⬆ Voltar ao índice](#índice)

---

## 5. Escopo

### Dentro do escopo
- Ferramenta de busca de vagas e oportunidades tanto para empregados quanto para empregadores, com funcionalidades específicas de acordo com o perfil do usuário.
- Perfis de usuário nos quais será possível cadastrar currículo e definir habilidades.

### Fora do escopo
- Chats privados entre usuários: nesta versão, o contato inicial ficará restrito aos empregadores, até que medidas de segurança adequadas sejam definidas.

### Restrições
- Devido à falta de tecnologias disponíveis no início do projeto, opções de busca com base em localização não estarão disponíveis nesta versão.

[⬆ Voltar ao índice](#índice)

---

## 6. Requisitos Funcionais

| Código | Requisito |
|--------|-----------|
| RF01 | O sistema deve permitir o cadastro de estudantes com dados pessoais e acadêmicos. |
| RF02 | O sistema deve permitir o cadastro de empresas com dados institucionais. |
| RF03 | O sistema deve permitir que empresas publiquem vagas (estágio, emprego, projeto acadêmico), informando título, descrição, requisitos e prazo para o fechamento das inscrições. |
| RF04 | O sistema deve permitir que estudantes pesquisem vagas por filtros (área de atuação, modalidade, localização, tipo de vaga). |
| RF05 | O sistema deve permitir que estudantes cadastrem e anexem seus currículos ao perfil. |
| RF06 | O sistema deve permitir que estudantes se candidatem às vagas publicadas. |
| RF07 | O sistema deve permitir que empresas visualizem e avaliem as inscrições recebidas para suas vagas. |
| RF08 | O sistema deve permitir que estudantes acompanhem o status de suas inscrições (análise, aprovado, reprovado). |
| RF09 | O sistema deve permitir que estudantes editem seu perfil e currículo a qualquer momento. |
| RF10 | O sistema deve enviar notificações aos estudantes sobre novas vagas compatíveis com suas habilidades e atualizações no status de suas inscrições. |

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
| RN04 | O candidato só pode se candidatar a uma vaga se tiver um currículo cadastrado na plataforma. |
| RN05 | Um estudante só pode editar seu próprio perfil e currículo, estando autenticado em sua conta. |

[⬆ Voltar ao índice](#índice)
