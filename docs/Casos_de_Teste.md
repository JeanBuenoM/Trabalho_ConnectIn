# Casos de Teste — ConectIn

## Condições gerais de execução

- Data da execução: (preencher)
- Commit ou tag testado: (preencher, por exemplo entrega-20-10-2026)
- Quem executou: (preencher)
- Banco recém-criado com o schema.sql e com os dados fictícios de teste (empregador de teste e áreas de atuação)
- Aplicação aberta no navegador, seguindo o README
- Os testes CT10 e CT11 só valem se o filtro entrar no recorte

## Casos de teste

CT01 — RF03 — Publicar vaga com dados válidos
- Passos: abrir a tela de publicação, preencher todos os campos e publicar.
- Entrada: título "Estágio em Desenvolvimento Web", descrição "Apoio no desenvolvimento do site da empresa", requisitos "HTML e CSS", tipo estágio, modalidade remoto, prazo de inscrição com uma data futura, área Tecnologia.
- Esperado: a vaga é salva, a tela mostra mensagem de sucesso e a vaga aparece na listagem.
- Observado: (preencher após executar)
- Situação: Não executado

CT02 — RF03 e RN01 — Publicar vaga sem prazo de inscrição
- Passos: preencher todos os campos, deixar o prazo vazio e publicar.
- Entrada: mesmos dados do CT01, sem prazo.
- Esperado: a vaga não é salva e a tela informa que o prazo de inscrição é obrigatório.
- Observado: (preencher após executar)
- Situação: Não executado

CT03 — RF03 e RN03 — Publicar vaga sem área de atuação
- Passos: preencher todos os campos, não escolher nenhuma área e publicar.
- Entrada: mesmos dados do CT01, sem área.
- Esperado: a vaga não é salva e a tela informa que é preciso escolher pelo menos uma área.
- Observado: (preencher após executar)
- Situação: Não executado

CT04 — RF03 — Publicar vaga sem título
- Passos: preencher todos os campos, deixar o título vazio e publicar.
- Entrada: mesmos dados do CT01, sem título.
- Esperado: a vaga não é salva e a tela informa que o título é obrigatório.
- Observado: (preencher após executar)
- Situação: Não executado

CT05 — RF03 — Publicar vaga sem descrição
- Passos: preencher todos os campos, deixar a descrição vazia e publicar.
- Entrada: mesmos dados do CT01, sem descrição.
- Esperado: a vaga não é salva e a tela informa que a descrição é obrigatória.
- Observado: (preencher após executar)
- Situação: Não executado

CT06 — RF03 — Vaga recusada não fica gravada
- Passos: depois de executar CT02 a CT05, consultar a tabela vaga no banco.
- Entrada: nenhuma.
- Esperado: nenhuma vaga dos testes recusados aparece na tabela.
- Observado: (preencher após executar)
- Situação: Não executado

CT07 — RF04 — Listar vagas abertas
- Passos: publicar duas vagas válidas e abrir a listagem. Depois mudar o status de uma delas para encerrada, direto no banco, e abrir a listagem de novo.
- Entrada: duas vagas válidas.
- Esperado: primeiro aparecem as duas vagas. Depois aparece só a que continua aberta.
- Observado: (preencher após executar)
- Situação: Não executado

CT08 — RF03 e RF04 — Dados continuam depois de reabrir a aplicação
- Passos: publicar uma vaga válida, fechar a aplicação, abrir de novo e consultar a listagem.
- Entrada: uma vaga válida.
- Esperado: a vaga publicada continua na listagem.
- Observado: (preencher após executar)
- Situação: Não executado

CT09 — RF04 — Listagem sem nenhuma vaga
- Passos: abrir a listagem com o banco sem vagas.
- Entrada: nenhuma.
- Esperado: a tela não quebra e mostra a listagem vazia (com a mensagem de nenhuma vaga encontrada, se existir).
- Observado: (preencher após executar)
- Situação: Não executado

CT10 — RF04 — Filtrar por tipo (somente se o filtro entrar)
- Passos: ter vagas de tipos diferentes, escolher o tipo estágio e aplicar o filtro.
- Entrada: filtro tipo = estágio.
- Esperado: aparecem só as vagas de estágio.
- Observado: (preencher após executar)
- Situação: Não executado

CT11 — RF04 — Filtrar por área (somente se o filtro entrar)
- Passos: ter vagas de áreas diferentes, escolher uma área e aplicar o filtro. Depois escolher uma área sem vagas.
- Entrada: filtro área = Tecnologia, depois uma área sem vagas.
- Esperado: com a primeira área aparecem só as vagas dela. Com a área sem vagas aparece a mensagem de que nenhuma vaga foi encontrada.
- Observado: (preencher após executar)
- Situação: Não executado

## Defeitos encontrados

Quando um teste falhar, registrar aqui um item para cada defeito:

- Identificação: D01 (e seguintes)
- Teste que falhou: (CT)
- Como reproduzir: (passos)
- Esperado: (o que deveria acontecer)
- Observado: (o que aconteceu)
- Responsável pela correção: (nome)
- Situação: Aberto, Corrigido ou Reteste feito

Depois da correção, repetir o teste e atualizar o resultado e a situação do caso.

Nenhum defeito registrado até agora, porque nenhum teste foi executado.

## Evidências

- Guardar capturas de tela e registros em `docs/evidencias/`.
- Nomear cada arquivo com o caso a que pertence, por exemplo `CT02-prazo-obrigatorio.png`.
- As evidências complementam a demonstração, e não substituem a execução real do sistema.

## Rastreabilidade com implementação e testes

Complementa a seção 17 de `Visao_e_Requisitos.md`. A coluna de implementação só deve ser preenchida com arquivos que existem no repositório.

- RF01 Cadastro de estudante — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
- RF02 Cadastro de empresa — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
- RF03 Publicação de vaga (RN01, RN03) — Implementação: (indicar o arquivo da tela e da classe de serviço quando existirem) — Testes: CT01 a CT06 e CT08 — Estado: recorte de 20/10, não implementado
- RF04 Pesquisa de vagas — Implementação: (indicar o arquivo da tela e do controlador quando existirem) — Testes: CT07 a CT09, e CT10 e CT11 se o filtro entrar — Estado: recorte de 20/10, não implementado
- RF05 a RF11 — Implementação: ainda não existe — Testes: nenhum ainda — Estado: não iniciado
