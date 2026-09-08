# 4. Diagrama de Atividades / Fluxo de Processo

## Processo 1 — Candidatar-se a uma vaga

**Início:** Candidato pesquisa/filtra vagas disponíveis (RF04).

**Fluxo:**
1. Candidato visualiza os detalhes da vaga.
2. Sistema verifica se o prazo de inscrição está em aberto (RN02).
   - Se **não**, exibe mensagem de inscrições encerradas e o processo é finalizado.
3. Se o prazo está em aberto, o sistema verifica o tipo da vaga (RN04):
   - Se é **emprego profissional/CLT**, verifica se o candidato possui currículo cadastrado:
     - Se **não**, bloqueia a candidatura e solicita o cadastro do currículo (fim do processo).
     - Se **sim**, segue para a confirmação da candidatura.
   - Se é **estágio ou projeto acadêmico**, segue diretamente para a confirmação da candidatura, independentemente de haver currículo.
4. Candidato confirma a candidatura (RF06). Caso não possua currículo (situação permitida apenas para vagas acadêmicas), pode marcar a opção "sem experiência profissional, em busca de oportunidade" (RF11).
5. Sistema registra a candidatura com status "análise" (RF08).
6. Sistema notifica o empregador sobre a nova inscrição (RF10).

**Fim:** Candidatura registrada e empregador notificado.

## Processo 2 — Publicar uma vaga

**Início:** Empregador autenticado acessa a opção de publicar vaga.

**Fluxo:**
1. Empregador preenche título, descrição, requisitos, tipo e área de atuação da vaga.
2. Sistema verifica se a data de encerramento das inscrições foi informada (RN01):
   - Se **não**, bloqueia a publicação e solicita a data; o empregador retorna ao preenchimento.
3. Sistema verifica se ao menos uma área de atuação foi selecionada (RN03):
   - Se **não**, bloqueia a publicação e solicita a área; o empregador retorna ao preenchimento.
4. Sistema publica a vaga (RF03).
5. Sistema disponibiliza a vaga para busca e filtros (RF04).
6. Sistema notifica candidatos com perfil/habilidades compatíveis (RF10).

**Fim:** Vaga publicada, visível nas buscas e candidatos notificados.

## Relação com os requisitos e regras de negócio

| Processo | Requisitos funcionais envolvidos | Regras de negócio envolvidas |
|---|---|---|
| Candidatar-se a uma vaga | RF04, RF05, RF06, RF08, RF10, RF11 | RN02, RN04 |
| Publicar uma vaga | RF03, RF04, RF10 | RN01, RN03 |
