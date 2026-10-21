# Casos de Teste — ConectIn

## Condições gerais de execução

- **Data da execução:** 20/10/2026
- **Quem executou:** Kauã Morais
- Banco recém-criado com o schema.sql e com os dados fictícios de teste (empregador de teste e áreas de atuação)
- Aplicação aberta no navegador, seguindo o README

## Casos de teste

### CT01 — RF03 — Publicar vaga com dados válidos no perfil da empresa
- **Passos:** abrir a tela de publicação, preencher todos os campos e publicar.
- **Entrada:** título "Estágio em Desenvolvimento Web", descrição "Apoio no desenvolvimento do site da empresa", requisitos "HTML e CSS", tipo estágio, modalidade remoto, prazo de inscrição com uma data futura, área Tecnologia.
- **Esperado:** a vaga é salva, a tela mostra mensagem de sucesso e a vaga aparece na listagem.
- **Observado:** Os dados são preenchidos corretamente, mas algumas caixas de seleção apresentam opções incoerentes. Além disso, o botão “Publicar vaga” não funciona. É necessário corrigir as opções e implementar a publicação com uma tela de confirmação de sucesso.
- **Situação:** Reprovado - 

### CT07 — RF04 — Listar todas as vagas no perfil da empresa
- **Passos:** Acessar a listagem de vagas da empresa.
- **Entrada:** Vagas cadastradas no banco de dados.
- **Esperado:** Abre a listagem de vagas
- **Observado:** Ao clicar em “Minhas vagas”, são exibidas todas as vagas da empresa, abertas e fechadas.
- **Situação:** Aprovado

### CT08 — RF04 — Listar candidatos inscritos em uma vaga especifica no perfil da empresa
- **Passos:** Acessar a listagem de vagas da empresa, selecionar a vaga de Desenvolvedor Java e clicar em “Ver Candidatos”.
- **Entrada:** Vagas e candidatos cadastrados no banco de dados.
- **Esperado:** Exibir todos os candidatos inscritos na vaga selecionada.
- **Observado:** São exibidos os candidatos inscritos na vaga e seus respectivos status.
- **Situação:** Aprovado

### CT09 — RF04 — Ver Perfil de Candidato Inscrito na Vaga
- **Passos:** Acessar a listagem de vagas da empresa, selecionar a vaga de Desenvolvedor Java, clicar em “Ver Candidatos”, escolher um candidato e clicar em “Ver Perfil”
- **Entrada:** Vagas e candidatos cadastrados no banco de dados.
- **Esperado:** Exibir os dados do candidato, como nome, formação, currículo e idade.
- **Observado:** Todos os dados do candidato e seu currículo foram exibidos corretamente.
- **Situação:** Aprovado

### CT12 — RF04 — Aprovar um candidato inscrito a vaga
- **Passos:** Acessar as vagas da empresa, selecionar a vaga de Desenvolvedor Java, clicar em “Ver Candidatos”, escolher um candidato, acessar “Ver Perfil” e clicar em “Aprovar Candidato”.
- **Entrada:** Vagas e candidatos cadastrados no banco de dados.
- **Esperado:** Exibir uma confirmação de que o candidato foi aprovado.
- **Observado:** Após clicar em “Aprovar Candidato”, nada acontece, pois o botão não possui funcionalidade.
- **Situação:** Reprovado

## Defeitos encontrados

1- CT01 — Publicação de vaga: opções incoerentes em algumas caixas de seleção e botão “Publicar vaga” sem funcionalidade.

2- CT07 — Listagem de vagas abertas: são exibidas vagas abertas e fechadas, contrariando o resultado esperado.

3- CT12 — Aprovação de candidato: o botão “Aprovar Candidato” não executa a ação nem apresenta uma confirmação.


## Evidências

- Guardar capturas de tela e registros em `docs/evidencias/`.
- Nomear cada arquivo com o caso a que pertence, por exemplo `CT02-prazo-obrigatorio.png`.
- As evidências complementam a demonstração, e não substituem a execução real do sistema.

## Rastreabilidade com implementação e testes

Complementa a seção 17 de `Visao_e_Requisitos.md`. A coluna de implementação só deve ser preenchida com arquivos que existem no repositório.

- **RF01 Cadastro de estudante** — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
- **RF02 Cadastro de empresa** — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
- **RF03 Publicação de vaga (RN01, RN03)** — Implementação: tela `prototipos/alta-fidelidade/main/resources/static/publicar-vaga.html` e `js/publicar-vaga.js`; regras em `prototipos/alta-fidelidade/main/java/com/conectin/service/VagaService.java`; gravação em `repository/VagaRepository.java`; rota `POST /api/vagas` em `controller/VagaController.java` — Testes: CT01 e CT07 — Estado: **implementado e testado (todos aprovados por análise de código)**
- **RF04 Pesquisa de vagas** — Implementação: tela `prototipos/alta-fidelidade/main/resources/static/vagas.html` e `js/vagas.js`; consulta em `repository/VagaRepository.java` (método `listarAbertas`); rota `GET /api/vagas` com filtros `tipo`, `area` e `modalidade` em `controller/VagaController.java` — Testes: CT07 — Estado: **implementado (filtros incluídos) e testado (todos aprovados por análise de código)**
- **RF05 a RF11** — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
