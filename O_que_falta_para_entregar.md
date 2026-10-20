# O que falta para a entrega de 20/10 — ConectIn

Repositório: https://github.com/JeanBuenoM/Trabalho_ConnectIn
Manual: "Manual da primeira entrega do segundo bimestre" (Fábrica de Software, prof.ª Sabine Cassol)

## Onde as coisas estão hoje

| Item | Estado |
|---|---|
| Documentação (revisão, MVP, arquitetura, backlog, histórico, requisitos) | Pronta no repositório |
| Código Java/Spring de publicar e listar vagas (RF03, RF04) | No repositório. Nunca foi executado de ponta a ponta |
| `schema.sql` e `dados-teste.sql` | Conferidos em MySQL 8 com banco vazio: rodam sem erro |
| Consultas SQL do `VagaRepository` | Conferidas em MySQL 8: dão o resultado esperado (filtros, vaga encerrada, lista vazia) |
| Protótipo de alta fidelidade (versão limpa e versão original) | Os dois instalam e compilam (`pnpm install` e `pnpm build`) |
| Casos de teste CT01 a CT11 | Escritos, todos "Não executado" |
| Tag da entrega | Não existe |

Ainda não está provado que o app Spring sobe e responde. Esse é o ponto principal que falta.

## Antes de tudo (5 min)

- [ ] Descompactar `ajustes-entrega-20-10.zip` na raiz do repositório (cria `scripts/testes-api.mjs` e `docs/Roteiro_Final_20-10.md`).
- [ ] Descompactar `prototipo-original-para-repo.zip` na raiz (cria `prototipos/alta-fidelidade-original/`).
- [ ] Acrescentar duas linhas na tabela "Organização do projeto" do `README.md`: `scripts/` (script de testes pela API) e `prototipos/alta-fidelidade-original/` (protótipo original do Figma Make).
- [ ] Conferir com `git status` que NÃO aparecem `application.properties`, `target/` nem `node_modules/`.

## 1. Rodar o sistema (quem: Mateus, T14/T15)

- [ ] Instalar/conferir Java 21, Maven 3.9+, MySQL 8 e Git (`java -version`, `mvn -v`, `mysql --version`).
- [ ] Criar o banco: `mysql -u root -p < banco-de-dados/schema.sql` e depois `mysql -u root -p < banco-de-dados/dados-teste.sql`.
- [ ] Copiar `application-example.properties` para `application.properties` e colocar a senha do MySQL.
- [ ] `mvn spring-boot:run` e abrir http://localhost:8080.
- [ ] Se der erro, guardar o texto completo do erro e corrigir (ou me mandar). Erros mais prováveis: senha ou porta do MySQL, versão do Java diferente de 21.
- [ ] Se algum erro precisar de correção no código, anotar como defeito em `docs/Casos_de_Teste.md` (seção "Defeitos encontrados").

## 2. Executar os testes (quem: Jean, T17; os outros ajudam)

Seguir a ordem de `docs/Roteiro_Final_20-10.md` (o CT09 vem primeiro, com o banco sem vagas).

- [ ] CT09 listagem sem vagas
- [ ] CT01 publicar vaga válida
- [ ] CT02 sem prazo (RN01)
- [ ] CT03 sem área (RN03)
- [ ] CT04 sem título
- [ ] CT05 sem descrição
- [ ] CT06 vaga recusada não fica no banco (consulta no MySQL)
- [ ] CT07 só vagas abertas aparecem (muda o status no MySQL)
- [ ] CT10 filtro por tipo
- [ ] CT11 filtro por área (e área sem vagas)
- [ ] CT08 fechar e abrir a aplicação, vagas continuam
- [ ] Extra: `node scripts/testes-api.mjs --md` (complemento; só vale com o app de vocês rodando)
- [ ] Uma captura de tela por caso em `docs/evidencias/`, com o nome do caso (ex.: `CT02-prazo-obrigatorio.png`)

Regra do manual: não marcar como aprovado o que não foi executado. Se algum teste falhar, registrar o defeito, corrigir, repetir o teste e atualizar o resultado.

## 3. Preencher os documentos com o resultado real

- [ ] `docs/Casos_de_Teste.md`: data, quem executou, commit testado (`git rev-parse --short HEAD`), "Observado" e "Situação" de cada caso.
- [ ] `docs/Casos_de_Teste.md`: seção "Rastreabilidade" (trocar "ainda não testado" pelo estado real) e a frase "Nenhum defeito registrado..." se houve defeito.
- [ ] `README.md`: linha "Versões usadas pela equipe nos testes" (Java, Maven, MySQL).
- [ ] `README.md`: seção "Situação atual". A frase "o funcionamento ainda precisa ser confirmado pelos testes" deve passar a dizer o que foi confirmado.
- [ ] `docs/Arquitetura_e_Tecnologias.md`: versão do MySQL em "Ambiente".
- [ ] `docs/Backlog.md`: trocar "Em progresso" por "Completo" só nas tarefas cujos critérios foram conferidos. T17 só fica Completo depois dos testes e da tag. Confirmar os responsáveis de T14 a T17.
- [ ] `docs/Historico_de_Alteracoes.md`: se algum defeito levou a mudança no código ou nos requisitos, registrar (data, item, motivo, impacto).
- [ ] Opcional: atualizar `modelo-logico.pdf`, `diagrama-classes.pdf` e o esboço de publicar vaga com o campo modalidade. Já consta como pendência no histórico e no README.

## 4. Verificar que outra pessoa consegue rodar (critério da T14)

- [ ] Alguém que não escreveu o código clona o repositório em outra pasta e segue o README do zero.
- [ ] Se travar em algum passo, corrigir o README.

## 5. Contribuição de cada integrante

- [ ] Mateus faz pelo menos um commit com o próprio usuário (ex.: preencher as versões no README, ou o resultado de um teste).
- [ ] João faz pelo menos um commit com o próprio usuário (ex.: um caso de teste, ou o status de T03 no backlog).
- [ ] Cada um lê o código da sua parte (perguntas sugeridas no `Roteiro_Final_20-10.md`, seção 4).

## 6. Fechar o repositório

- [ ] Apagar o `O_QUE_FALTA.md` da raiz (é uma lista interna e fala que o código nunca foi executado).
- [ ] Commit final com mensagem clara, por exemplo: "Registra resultados dos testes e atualiza a documentação (entrega 20/10)".
- [ ] Criar a tag no último commit: `git tag entrega-20-10-2026` e `git push origin entrega-20-10-2026`. Se mexer no código depois, recriar a tag.
- [ ] Abrir o link do repositório em aba anônima. Se for privado, adicionar a professora como colaboradora.
- [ ] Enviar pelo canal que a professora indicou (link do repositório e da tag).

## 7. Ensaiar a demonstração

- [ ] Banco com os dados de teste e app rodando no computador que será usado.
- [ ] Ensaiar a sequência de `docs/Roteiro_Final_20-10.md`, seção 4: problema e recorte, o que mudou, arquitetura, backlog, publicar vaga válida, recusar sem prazo e sem área, listagem e filtros, fechar e abrir o app, testes e plano até 06/11.
- [ ] Deixar claro na fala o que está "em desenvolvimento": cadastro, login, currículo, candidatura, avaliação, perfil e notificações.
- [ ] Ter o plano até 06/11 na ponta da língua: cadastro e login (RF01, RF02, RN05), currículo (RF05, RF11), candidatura (RF06, RN02, RN04) e área da empresa para ver inscrições (RF07).

## Checklist do manual, mapeado

| Item do checklist do manual | Situação | Onde fechar |
|---|---|---|
| Mantivemos o projeto e o repositório do 1º bimestre | Ok | — |
| Revisamos a documentação e registramos as mudanças | Ok | Histórico, seção 2º bimestre |
| Definimos prioridades e o recorte de 20/10 | Ok | `docs/MVP.md` |
| Confirmamos tecnologias e arquitetura com justificativas | Quase: falta a versão do MySQL | Seção 3 |
| Organizamos tarefas, responsáveis, prazos e critérios | Ok, confirmar T14 a T17 | Seção 3 |
| O código da entrega está integrado ao repositório | Ok | — |
| Conseguimos executar a aplicação seguindo o README | Falta fazer | Seções 1 e 4 |
| Conseguimos demonstrar uma interação funcional real | Falta fazer | Seções 1, 2 e 7 |
| Preparamos o armazenamento inicial | Ok (scripts conferidos em MySQL 8) | — |
| Executamos os testes e registramos resultados reais | Falta fazer | Seção 2 |
| Registramos defeitos, correções e pendências | Depende dos testes | Seções 2 e 3 |
| Atualizamos os documentos afetados e a rastreabilidade | Depende dos testes | Seção 3 |
| Identificamos a versão ou commit da entrega | Falta (tag) | Seção 6 |
| Verificamos o acesso da professora ao repositório | Falta | Seção 6 |
| Preparamos os dados fictícios e ensaiamos a demonstração | Dados ok; ensaio falta | Seção 7 |
| Cada integrante consegue explicar sua contribuição | Falta (commits de Mateus e João) | Seção 5 |
| Definimos os próximos passos até 06/11 | Ok no README | Conferir na fala |
