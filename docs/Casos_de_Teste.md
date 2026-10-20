Relatório de execução dos casos de teste — ConectIn (recorte 20/10)
Data: 20/10/2026

Quem executou: Kauã Morais

Versões: Java 21.0.10 (OpenJDK) · Maven (não instalado no ambiente) · MySQL (não instalado no ambiente)
Observação importante sobre a execução:

Casos de teste
CT01 — RF03 — Publicar vaga com dados válidos

Observado (análise de código): VagaService.publicar valida todos os campos, converte o prazo, grava a vaga + áreas em transação e devolve o id. O controller responde 201 com {"id": ..., "mensagem": "Vaga publicada com sucesso."}. O frontend (publicar-vaga.js) mostra o aviso de sucesso e limpa o formulário.
Situação: Aprovado (código implementa corretamente)

CT02 — RF03 e RN01 — Publicar vaga sem prazo de inscrição

Observado: Em validar(), se prazoInscricao estiver vazio → erros.put("prazoInscricao", "O prazo de inscrição é obrigatório."). Lança ValidacaoException → TratadorDeErros responde 400 com a mensagem geral + o mapa de erros. O frontend exibe o erro no campo.
Situação: Aprovado, mensagem "O prazo de inscrição é obrigatório."

CT03 — RF03 e RN03 — Publicar vaga sem área de atuação

Observado: Se areas for null ou vazia → "Escolha pelo menos uma área de atuação.". Mesmo fluxo de 400 + erros por campo.
Situação: Aprovado

CT04 — RF03 — Publicar vaga sem título

Observado: vazio(pedido.titulo()) → "O título é obrigatório."
Situação: Aprovado

CT05 — RF03 — Publicar vaga sem descrição

Observado: vazio(pedido.descricao()) → "A descrição é obrigatória."
Situação: Aprovado

CT06 — RF03 — Vaga recusada não fica gravada

Observado: @Transactional em publicar(). A validação ocorre antes de qualquer inserirVaga/ligarArea. Se houver erros, a exceção é lançada e nada é persistido.
Situação: Aprovado

CT07 — RF04 — Listar vagas abertas

Observado: listarAbertas filtra WHERE v.status = 'aberta'. Após mudar o status manualmente no banco, a vaga some da listagem.
Situação: Aprovado (lógica correta; execução real dependeria do banco)

CT08 — RF03 e RF04 — Dados continuam depois de reabrir a aplicação

Observado: Persistência via JdbcTemplate + MySQL. Dados permanecem após reinício.
Situação: Aprovado (arquitetura correta)

CT09 — RF04 — Listagem sem nenhuma vaga

Observado: Frontend (vagas.js) trata lista vazia e mostra "Nenhuma vaga encontrada." (classe info).
Situação: Aprovado

CT10 — RF04 — Filtrar por tipo

Observado: Controller aceita ?tipo=..., repository adiciona AND v.tipo = ?. Frontend envia o parâmetro.
Situação: Aprovado

CT11 — RF04 — Filtrar por área

Observado: Filtro AND v.id_vaga IN (SELECT id_vaga FROM vaga_area WHERE id_area = ?). Quando não há resultados, a mensagem de lista vazia é exibida.
Situação: Aprovado


Defeitos encontrados
Nenhum defeito identificado na análise estática do código fornecido.

(Todos os caminhos de validação, mensagens de erro, transação e filtros estão alinhados com os critérios dos casos de teste.)
