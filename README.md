# ConectIn

> Plataforma de Oportunidades Acadêmicas e Profissionais

## Problema

A busca por oportunidades acadêmicas e profissionais acontece hoje de forma fragmentada: vagas são divulgadas em murais físicos, grupos de redes sociais, sites institucionais e canais informais, sem um local único de consulta. Estudantes precisam acompanhar diversas fontes ao mesmo tempo e, com frequência, enviam currículos por e-mail sem padronização, o que dificulta o acompanhamento das candidaturas e a triagem por parte das empresas.

## Objetivo

Desenvolver uma plataforma que centralize e facilite o acesso a vagas de emprego e oportunidades acadêmicas por meio de um software intuitivo, simples e de fácil utilização, conectando candidatos (estudantes e profissionais) a empregadores (empresas e instituições de ensino) em um único ambiente.

## Equipe

- Mateus Cantelle Gomes
- Jean Carlos Bueno
- Kauã Morais
- João Passos

## Principais funcionalidades

- Cadastro de candidatos (estudantes/profissionais) e empregadores (empresas/instituições)
- Publicação de vagas (emprego, estágio, projeto acadêmico) com prazo de inscrição
- Pesquisa e filtro de vagas por área de atuação, modalidade e tipo
- Candidatura a vagas, com currículo obrigatório apenas para vagas profissionais/CLT (opcional para estágio/projeto acadêmico, ver RN04)
- Edição de perfil e currículo pelo próprio candidato, a qualquer momento
- Acompanhamento de status de candidaturas (análise, aprovado, reprovado)
- Avaliação de candidaturas pelo empregador, com acesso ao perfil/currículo do candidato
- Notificações de novas vagas compatíveis e mudanças de status

## Tecnologias previstas

- **Interface:** HTML, CSS e JavaScript
- **Backend/servidor:** Java com Spring
- **Banco de dados:** MySQL
- **Hospedagem:** a definir

Justificativa completa e diagrama simples de arquitetura em [`docs/Arquitetura_e_Tecnologias.md`](docs/Arquitetura_e_Tecnologias.md).

## MVP

A primeira versão funcional cobre o fluxo essencial: cadastro de candidato e empregador, publicação de vaga, busca/filtro de vagas, candidatura (com a regra de currículo obrigatório/opcional conforme o tipo de vaga) e avaliação/acompanhamento do status da candidatura. Edição de perfil e notificações ficam como desejáveis para esta etapa. Detalhes completos, classificação por funcionalidade e o fluxo completo selecionado em [`docs/MVP.md`](docs/MVP.md).

## Organização do projeto

| Pasta/arquivo | Conteúdo |
|---|---|
| `docs/` | Documento de visão, requisitos, regras de negócio, histórico de alterações, backlog, arquitetura, MVP e apresentação |
| `diagramas/` | Casos de uso, atividades, classes e arquitetura |
| `banco-de-dados/` | Modelo conceitual, modelo lógico, script SQL e dicionário de dados |
| `prototipos/` | Mapa de navegação e protótipos de alta fidelidade das 13 telas do MVP (candidato e empregador) |
| `src/` | Código-fonte (quando a implementação estiver iniciada) |

## Backlog

O quadro de tarefas do projeto está em [`docs/Backlog.md`](docs/Backlog.md), com tarefas, requisito relacionado, prioridade, responsável e status (A fazer, Em progresso, Completo). As tarefas de maior prioridade — login/cadastro, publicação de vaga, busca/filtros, currículo e candidatura (T01-T05) — já estão concluídas; segue em andamento o restante do fluxo (avaliação de inscrições, edição de perfil, notificações e requisitos não funcionais).

## Apresentação

Roteiro e divisão de falas da equipe para a apresentação da 3ª entrega em [`docs/Apresentacao.md`](docs/Apresentacao.md).
