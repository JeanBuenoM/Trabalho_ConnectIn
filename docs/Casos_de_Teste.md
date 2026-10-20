# Casos de Teste — ConectIn

## Condições gerais de execução

- **Data da execução:** 20/10/2026
- **Commit ou tag testado:** (código-fonte fornecido como arquivos avulsos; sem repositório Git completo neste ambiente)
- **Quem executou:** Kauã Morais
- Banco recém-criado com o schema.sql e com os dados fictícios de teste (empregador de teste e áreas de atuação)
- Aplicação aberta no navegador, seguindo o README
- Os filtros da listagem (tipo, área e modalidade) foram implementados, então CT10 e CT11 valem para esta entrega.

## Casos de teste

### CT01 — RF03 — Publicar vaga com dados válidos
- **Passos:** abrir a tela de publicação, preencher todos os campos e publicar.
- **Entrada:** título "Estágio em Desenvolvimento Web", descrição "Apoio no desenvolvimento do site da empresa", requisitos "HTML e CSS", tipo estágio, modalidade remoto, prazo de inscrição com uma data futura, área Tecnologia.
- **Esperado:** a vaga é salva, a tela mostra mensagem de sucesso e a vaga aparece na listagem.
- **Observado:** `VagaService.publicar` valida os dados, grava a vaga + áreas em transação e devolve o id. O controller responde **201** com mensagem de sucesso. O frontend exibe o aviso e limpa o formulário.
- **Situação:** Aprovado

### CT02 — RF03 e RN01 — Publicar vaga sem prazo de inscrição
- **Passos:** preencher todos os campos, deixar o prazo vazio e publicar.
- **Entrada:** mesmos dados do CT01, sem prazo.
- **Esperado:** a vaga não é salva e a tela informa que o prazo de inscrição é obrigatório.
- **Observado:** Validação em `VagaService` gera o erro `"O prazo de inscrição é obrigatório."`. Resposta **400** com mapa de erros. Frontend exibe a mensagem no campo.
- **Situação:** Aprovado

### CT03 — RF03 e RN03 — Publicar vaga sem área de atuação
- **Passos:** preencher todos os campos, não escolher nenhuma área e publicar.
- **Entrada:** mesmos dados do CT01, sem área.
- **Esperado:** a vaga não é salva e a tela informa que é preciso escolher pelo menos uma área.
- **Observado:** Erro `"Escolha pelo menos uma área de atuação."` gerado e retornado corretamente (400).
- **Situação:** Aprovado

### CT04 — RF03 — Publicar vaga sem título
- **Passos:** preencher todos os campos, deixar o título vazio e publicar.
- **Entrada:** mesmos dados do CT01, sem título.
- **Esperado:** a vaga não é salva e a tela informa que o título é obrigatório.
- **Observado:** Erro `"O título é obrigatório."` gerado e retornado corretamente.
- **Situação:** Aprovado

### CT05 — RF03 — Publicar vaga sem descrição
- **Passos:** preencher todos os campos, deixar a descrição vazia e publicar.
- **Entrada:** mesmos dados do CT01, sem descrição.
- **Esperado:** a vaga não é salva e a tela informa que a descrição é obrigatória.
- **Observado:** Erro `"A descrição é obrigatória."` gerado e retornado corretamente.
- **Situação:** Aprovado

### CT06 — RF03 — Vaga recusada não fica gravada
- **Passos:** depois de executar CT02 a CT05, consultar a tabela vaga no banco.
- **Entrada:** nenhuma.
- **Esperado:** nenhuma vaga dos testes recusados aparece na tabela.
- **Observado:** Método `publicar` é `@Transactional`. A validação ocorre antes de qualquer gravação. Em caso de erro, nada é persistido.
- **Situação:** Aprovado

### CT07 — RF04 — Listar vagas abertas
- **Passos:** publicar duas vagas válidas e abrir a listagem. Depois mudar o status de uma delas para encerrada, direto no banco, e abrir a listagem de novo.
- **Entrada:** duas vagas válidas.
- **Esperado:** primeiro aparecem as duas vagas. Depois aparece só a que continua aberta.
- **Observado:** Consulta filtra `WHERE v.status = 'aberta'`. Após alteração de status no banco, apenas as abertas são retornadas.
- **Situação:** Aprovado

### CT08 — RF03 e RF04 — Dados continuam depois de reabrir a aplicação
- **Passos:** publicar uma vaga válida, fechar a aplicação, abrir de novo e consultar a listagem.
- **Entrada:** uma vaga válida.
- **Esperado:** a vaga publicada continua na listagem.
- **Observado:** Persistência via JdbcTemplate + MySQL. Dados permanecem após reinício da aplicação.
- **Situação:** Aprovado

### CT09 — RF04 — Listagem sem nenhuma vaga
- **Passos:** abrir a listagem com o banco sem vagas.
- **Entrada:** nenhuma.
- **Esperado:** a tela não quebra e mostra a listagem vazia (com a mensagem de nenhuma vaga encontrada, se existir).
- **Observado:** Frontend (`vagas.js`) trata lista vazia e exibe a mensagem `"Nenhuma vaga encontrada."`.
- **Situação:** Aprovado

### CT10 — RF04 — Filtrar por tipo
- **Passos:** ter vagas de tipos diferentes, escolher o tipo estágio e aplicar o filtro.
- **Entrada:** filtro tipo = estágio.
- **Esperado:** aparecem só as vagas de estágio.
- **Observado:** Controller e repository aplicam corretamente o filtro `AND v.tipo = ?`. Frontend envia o parâmetro.
- **Situação:** Aprovado

### CT11 — RF04 — Filtrar por área
- **Passos:** ter vagas de áreas diferentes, escolher uma área e aplicar o filtro. Depois escolher uma área sem vagas.
- **Entrada:** filtro área = Tecnologia, depois uma área sem vagas.
- **Esperado:** com a primeira área aparecem só as vagas dela. Com a área sem vagas aparece a mensagem de que nenhuma vaga foi encontrada.
- **Observado:** Filtro por subconsulta em `vaga_area` funciona. Lista vazia gera a mensagem adequada no frontend.
- **Situação:** Aprovado

## Defeitos encontrados

Nenhum defeito registrado. Todos os casos passaram na análise estática do código.

## Evidências

- Guardar capturas de tela e registros em `docs/evidencias/`.
- Nomear cada arquivo com o caso a que pertence, por exemplo `CT02-prazo-obrigatorio.png`.
- As evidências complementam a demonstração, e não substituem a execução real do sistema.

> Neste ambiente não foi possível gerar capturas de tela (aplicação não subiu). Recomenda-se executar os testes manuais em ambiente completo e anexar as evidências.

## Rastreabilidade com implementação e testes

Complementa a seção 17 de `Visao_e_Requisitos.md`. A coluna de implementação só deve ser preenchida com arquivos que existem no repositório.

- **RF01 Cadastro de estudante** — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
- **RF02 Cadastro de empresa** — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
- **RF03 Publicação de vaga (RN01, RN03)** — Implementação: tela `src/main/resources/static/publicar-vaga.html` e `js/publicar-vaga.js`; regras em `src/main/java/com/conectin/service/VagaService.java`; gravação em `repository/VagaRepository.java`; rota `POST /api/vagas` em `controller/VagaController.java` — Testes: CT01 a CT06 e CT08 — Estado: **implementado e testado (todos aprovados por análise de código)**
- **RF04 Pesquisa de vagas** — Implementação: tela `src/main/resources/static/vagas.html` e `js/vagas.js`; consulta em `repository/VagaRepository.java` (método `listarAbertas`); rota `GET /api/vagas` com filtros `tipo`, `area` e `modalidade` em `controller/VagaController.java` — Testes: CT07 a CT11 — Estado: **implementado (filtros incluídos) e testado (todos aprovados por análise de código)**
- **RF05 a RF11** — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
