# ConectIn

> Plataforma de Oportunidades Acadêmicas e Profissionais

## Problema

A busca por oportunidades acadêmicas e profissionais acontece hoje de forma fragmentada: vagas são divulgadas em murais físicos, grupos de redes sociais, sites institucionais e canais informais, sem um local único de consulta. Estudantes precisam acompanhar diversas fontes ao mesmo tempo e, com frequência, enviam currículos por e-mail sem padronização, o que dificulta o acompanhamento das candidaturas e a triagem por parte das empresas.

## Objetivo

Desenvolver uma plataforma que centralize e facilite o acesso a vagas de emprego e oportunidades acadêmicas por meio de um software intuitivo, simples e de fácil utilização, conectando candidatos (estudantes e profissionais) a empregadores (empresas e instituições de ensino) em um único ambiente.

Repositório: https://github.com/JeanBuenoM/Trabalho_ConnectIn

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

- **Interface:** HTML, CSS e JavaScript simples, servidos pelo próprio Spring
- **Backend/servidor:** Java 21 com Spring Boot 3.3.5 (Maven)
- **Banco de dados:** MySQL 8, acessado com `JdbcTemplate`
- **Hospedagem:** a definir (por enquanto roda na máquina de cada integrante)

Os esboços das telas estão em `prototipos/` (imagens PNG).

Justificativa completa e diagrama simples de arquitetura em [`docs/Arquitetura_e_Tecnologias.md`](docs/Arquitetura_e_Tecnologias.md).

## MVP

A primeira versão funcional cobre o fluxo essencial: cadastro de candidato e empregador, publicação de vaga, busca/filtro de vagas, candidatura (com a regra de currículo obrigatório/opcional conforme o tipo de vaga) e avaliação/acompanhamento do status da candidatura. Edição de perfil e notificações ficam como desejáveis para esta etapa. Detalhes completos, classificação por funcionalidade e o fluxo completo selecionado em [`docs/MVP.md`](docs/MVP.md).

## Situação atual (2º bimestre)

Entrega de 20/10/2026. Recorte escolhido: **publicar vagas e consultar vagas** (RF03 e RF04).

**Já está no repositório (o funcionamento ainda precisa ser confirmado pelos testes):**
- Tela de publicação de vaga (`publicar-vaga.html`) com título, descrição, requisitos, tipo, modalidade, prazo de inscrição e áreas de atuação. A vaga é gravada no MySQL.
- Regras aplicadas no servidor: prazo de inscrição obrigatório (RN01), pelo menos uma área de atuação (RN03), título e descrição obrigatórios. Uma vaga recusada não é gravada e a tela mostra qual campo corrigir.
- Tela de listagem (`vagas.html`) que mostra só vagas abertas, com filtros por tipo, área e modalidade e a mensagem "Nenhuma vaga encontrada".
- Script do banco (`banco-de-dados/schema.sql`) e dados fictícios de teste (`banco-de-dados/dados-teste.sql`).
- Esboços das telas em `prototipos/` (imagens PNG).

**Em desenvolvimento (não está disponível nesta entrega):** cadastro e login de candidato e empregador, currículo, candidatura, avaliação, acompanhamento de status, edição de perfil e notificações. Enquanto não há login, as vagas são publicadas por um empregador de teste cadastrado em `dados-teste.sql`.

**Testes:** [`docs/Casos_de_Teste.md`](docs/Casos_de_Teste.md) tem 16 casos, em duas partes.
- Protótipo de alta fidelidade em React (5 casos executados em 20/10; o código do protótipo não está neste repositório): 3 aprovados (CT07, CT08, CT09) e 2 reprovados (CT01, CT12). Os defeitos D01 a D03 estão registrados no documento.
- Sistema Java/Spring (11 casos: CT02 a CT06, CT10, CT11 e CT13 a CT16): ainda não executados. O RF03 e o RF04 estão implementados no código, mas só constarão como testados depois dessa execução.

## Como executar

### Sistema (Java/Spring + MySQL)

Precisa de: Java 21, Maven 3.9 ou mais novo, MySQL 8 e Git.

1. Clonar o repositório e entrar na pasta: `git clone https://github.com/JeanBuenoM/Trabalho_ConnectIn.git` e `cd Trabalho_ConnectIn`
2. Criar o banco e os dados de teste, em um banco vazio (a senha do MySQL será pedida):
   - `mysql -u root -p < banco-de-dados/schema.sql`
   - `mysql -u root -p < banco-de-dados/dados-teste.sql`
   - Para recomeçar do zero: `mysql -u root -p -e "DROP DATABASE conectin"` e repetir os dois comandos acima.
3. Criar o arquivo de configuração a partir do exemplo e colocar a sua senha do MySQL:
   - Linux/macOS: `cp prototipos/alta-fidelidade/main/resources/application-example.properties prototipos/alta-fidelidade/main/resources/application.properties`
   - Windows (PowerShell): `Copy-Item prototipos/alta-fidelidade/main/resources/application-example.properties prototipos/alta-fidelidade/main/resources/application.properties`
   - Abrir o `application.properties` e trocar `COLOQUE_A_SUA_SENHA_AQUI`. Esse arquivo não vai para o GitHub.
4. Iniciar: `mvn spring-boot:run`
5. Abrir no navegador: http://localhost:8080

Para parar a aplicação, `Ctrl+C` no terminal.

Variáveis de configuração (todas em `application.properties`, nomes no arquivo de exemplo): `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password` e `conectin.empregador-teste-id`.

**Versões usadas pela equipe nos testes** (preencher com o resultado de `java -version`, `mvn -v` e `mysql --version`): Java ____ · Maven ____ · MySQL ____

## Índice da entrega de 20/10/2026

Versão avaliada: tag `entrega-20-10-2026`.

| O que a entrega precisa mostrar | Onde está |
|---|---|
| Equipe, projeto e repositório | Início deste README |
| Revisão e alterações desde o 1º bimestre | [`docs/Historico_de_Alteracoes.md`](docs/Historico_de_Alteracoes.md) |
| Escopo priorizado e recorte da entrega | [`docs/MVP.md`](docs/MVP.md) |
| Tecnologias justificadas e arquitetura | [`docs/Arquitetura_e_Tecnologias.md`](docs/Arquitetura_e_Tecnologias.md) e [`diagramas/diagrama-arquitetura.svg`](diagramas/diagrama-arquitetura.svg) |
| Backlog com prioridades, responsáveis, prazos e situação | [`docs/Backlog.md`](docs/Backlog.md) |
| Código integrado e como executar | `prototipos/alta-fidelidade/main/`, `pom.xml` e a seção "Como executar" acima |
| Casos de teste, resultados e evidências | [`docs/Casos_de_Teste.md`](docs/Casos_de_Teste.md) e `docs/evidencias/` |
| Requisitos, regras de negócio, modelagem e dicionário de dados | [`docs/Visao_e_Requisitos.md`](docs/Visao_e_Requisitos.md) |
| Pendências e plano até 06/11 | Seção "Próximos passos" abaixo |

## Próximos passos (até 06/11)

- Cadastro e login de candidato e de empregador (RF01, RF02, RN05), que substituem o empregador de teste.
- Currículo e opção "sem experiência" (RF05, RF11), candidatura (RF06, RN02, RN04) e área da empresa para ver as inscrições (RF07).
- Atualizar `modelo-logico.pdf`, `diagrama-classes.pdf` e o esboço de publicar vaga com o campo modalidade.
- Decidir onde ficam as habilidades do candidato (RF10) e se a interface continua em HTML/JS simples.
- Executar no sistema os casos da Parte B de `docs/Casos_de_Teste.md` e anexar as evidências em `docs/evidencias/`.
- Corrigir os defeitos D01 a D03 e repetir os testes.
- Criar testes automatizados para as regras do `VagaService`, se houver tempo.

## Organização do projeto

| Pasta/arquivo | Conteúdo |
|---|---|
| `docs/` | Documento de visão, requisitos, regras de negócio, histórico de alterações, backlog, arquitetura, MVP, casos de teste e `evidencias/` |
| `diagramas/` | Casos de uso, atividades, classes e arquitetura |
| `banco-de-dados/` | Modelo conceitual, modelo lógico, `schema.sql` e `dados-teste.sql` (o dicionário de dados está em `docs/Visao_e_Requisitos.md`) |
| `prototipos/` | Mapa de navegação e esboços das telas do MVP (candidato e empregador) |
| `prototipos/alta-fidelidade/main/` | Código-fonte do sistema: Java/Spring em `java/`, telas e configuração em `resources/` (o `pom.xml` aponta o Maven para esta pasta) |
| `pom.xml` | Configuração do Maven: versões do Java e do Spring Boot e dependências |

## Backlog

O quadro de tarefas do projeto está em [`docs/Backlog.md`](docs/Backlog.md), com tarefas, requisito relacionado, prioridade, responsável, prazo e situação (Não iniciado, Em progresso, Completo). As tarefas T02, T03 e T14 a T17 formam o recorte da entrega de 20/10; as de T01 e T04 em diante ficam para 06/11 e 27/11.
