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

O protótipo navegável das telas usa React com Vite. A tecnologia da interface do sistema ainda será confirmada pela equipe.

Justificativa completa e diagrama simples de arquitetura em [`docs/Arquitetura_e_Tecnologias.md`](docs/Arquitetura_e_Tecnologias.md).

## MVP

A primeira versão funcional cobre o fluxo essencial: cadastro de candidato e empregador, publicação de vaga, busca/filtro de vagas, candidatura (com a regra de currículo obrigatório/opcional conforme o tipo de vaga) e avaliação/acompanhamento do status da candidatura. Edição de perfil e notificações ficam como desejáveis para esta etapa. Detalhes completos, classificação por funcionalidade e o fluxo completo selecionado em [`docs/MVP.md`](docs/MVP.md).

## Situação atual (2º bimestre)

- A documentação do 1º bimestre está pronta: requisitos, modelagem, banco de dados, protótipos, MVP, backlog e arquitetura.
- O recorte da entrega de 20/10 é **publicar vagas e consultar vagas** (RF03 e parte do RF04).
- Já existe no repositório o **protótipo de alta fidelidade** das telas, navegável, em [`prototipos/alta-fidelidade/`](prototipos/alta-fidelidade/). Ele é só a interface: não valida campos e não salva dados.
- O sistema com servidor (Java/Spring) e banco de dados (MySQL) **está em desenvolvimento** e ainda não foi enviado para a pasta `src/`.
- O script de criação do banco já está pronto em [`banco-de-dados/schema.sql`](banco-de-dados/schema.sql).

## Como executar

### Protótipo das telas

Precisa de Node 20.19 ou mais novo e do pnpm.

1. Entrar na pasta: `cd prototipos/alta-fidelidade`
2. Instalar as dependências: `pnpm install`
3. Iniciar: `pnpm dev`
4. Abrir no navegador: http://localhost:5173

Mais detalhes, e o que ainda difere dos requisitos, em [`prototipos/alta-fidelidade/README.md`](prototipos/alta-fidelidade/README.md).

### Sistema (Java/Spring + MySQL)

Em desenvolvimento. O banco já pode ser criado rodando `banco-de-dados/schema.sql` no MySQL. As instruções para iniciar o servidor serão adicionadas aqui quando o código for enviado para `src/`.

## Documentação da entrega

- Requisitos, regras de negócio, modelagem e dicionário de dados: [`docs/Visao_e_Requisitos.md`](docs/Visao_e_Requisitos.md)
- Revisão e alterações desde o 1º bimestre: [`docs/Historico_de_Alteracoes.md`](docs/Historico_de_Alteracoes.md)
- Escopo priorizado e recorte da entrega: [`docs/MVP.md`](docs/MVP.md)
- Tecnologias e arquitetura: [`docs/Arquitetura_e_Tecnologias.md`](docs/Arquitetura_e_Tecnologias.md)
- Backlog com prioridades, responsáveis, prazos e situação: [`docs/Backlog.md`](docs/Backlog.md)
- Casos de teste e rastreabilidade: [`docs/Casos_de_Teste.md`](docs/Casos_de_Teste.md)
- Roteiro da demonstração: [`docs/Demonstracao.md`](docs/Demonstracao.md)

## Organização do projeto

| Pasta/arquivo | Conteúdo |
|---|---|
| `docs/` | Documento de visão, requisitos, regras de negócio, histórico de alterações, backlog, arquitetura, MVP, casos de teste e roteiro da demonstração |
| `diagramas/` | Casos de uso, atividades, classes e arquitetura |
| `banco-de-dados/` | Modelo conceitual, modelo lógico, script SQL e dicionário de dados |
| `prototipos/` | Mapa de navegação, esboços das telas do MVP (candidato e empregador) e protótipo de alta fidelidade navegável (`alta-fidelidade/`) |
| `src/` | Código-fonte do sistema, em desenvolvimento |

## Backlog

O quadro de tarefas do projeto está em [`docs/Backlog.md`](docs/Backlog.md), com tarefas, requisito relacionado, prioridade, responsável, prazo e situação (Não iniciado, Em progresso, Completo). As tarefas T02, T03 e T14 a T17 formam o recorte da entrega de 20/10.

## Próximos passos

- Entrega de 20/10: publicar e consultar vagas, com testes registrados.
- Entrega de 06/11: cadastro e login, currículo, candidatura e início da avaliação.
- Entrega de 27/11: avaliação, status, edição de perfil, notificações, ajustes finais e apresentação de todos os integrantes.
