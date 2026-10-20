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

## . Fechar o repositório

- [ ] Apagar o `O_QUE_FALTA.md` da raiz (é uma lista interna e fala que o código nunca foi executado).
- [ ] Commit final com mensagem clara, por exemplo: "Registra resultados dos testes e atualiza a documentação (entrega 20/10)".
- [ ] Criar a tag no último commit: `git tag entrega-20-10-2026` e `git push origin entrega-20-10-2026`. Se mexer no código depois, recriar a tag.
- [ ] Abrir o link do repositório em aba anônima. Se for privado, adicionar a professora como colaboradora.
- [ ] Enviar pelo canal que a professora indicou (link do repositório e da tag).

## . Ensaiar a demonstração

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
