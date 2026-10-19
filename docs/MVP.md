# MVP e Fluxo Completo — ConectIn

## O que é o MVP

O MVP do ConectIn cobre o ciclo essencial: cadastro, publicação de vaga, busca, candidatura e acompanhamento de status. O que não é indispensável para esse ciclo funcionar fica para versões futuras. A classificação abaixo foi cruzada com o backlog da equipe (`Backlog.md`).

## Funcionalidades e classificação

| Funcionalidade | Requisito | Classificação | Faz parte do MVP? | Situação (18/10/2026) |
|---|---|---|---|---|
| Cadastro de candidato/estudante | RF01 | Indispensável | Sim | Não iniciado (T01) |
| Cadastro de empregador/empresa | RF02 | Indispensável | Sim | Não iniciado (T01) |
| Publicar vaga | RF03 | Indispensável | Sim | Recorte de 20/10 (T02, T14 a T16) |
| Pesquisar/filtrar vagas | RF04 | Indispensável | Sim | Recorte de 20/10 (T03) |
| Cadastrar currículo | RF05 | Indispensável | Sim | Não iniciado (T04) |
| Candidatar-se a vaga | RF06 | Indispensável | Sim | Não iniciado (T05) |
| Avaliar candidaturas | RF07 | Indispensável | Sim | Não iniciado (T06, T07) |
| Acompanhar status de candidatura | RF08 | Indispensável | Sim | Não iniciado (T08) |
| Editar perfil/currículo | RF09 | Desejável | Não | Não iniciado (T09) |
| Notificações | RF10 | Desejável | Não | Não iniciado (T10) |
| Indicar sem experiência profissional | RF11 | Indispensável | Sim | Não iniciado (parte de T05) |

Todas as telas já têm protótipo em `prototipos/`. O que ainda não existe é o código.

## Fluxo completo selecionado

**Candidato se cadastra → pesquisa vaga → candidata-se → Empregador avalia → Candidato acompanha o status**

1. Candidato se cadastra (RF01).
2. Candidato pesquisa e filtra vagas (RF04).
3. Candidato se candidata a uma vaga (RF06), aplicando a regra RN04 (currículo obrigatório ou "sem experiência", conforme o tipo de vaga).
4. Sistema registra a candidatura com status "análise" (RF08).
5. Empregador avalia a candidatura e define o status (RF07).
6. Candidato acompanha e visualiza o status atualizado (RF08).

Esse é o fluxo que será demonstrado na apresentação final de 27/11. Ele depende de vagas publicadas, por isso a construção começa pela publicação e pela consulta de vagas.

### Requisitos, telas e entidades envolvidos no fluxo

| Requisito | Caso de uso | Entidades | Tela | No MVP? |
|---|---|---|---|---|
| RF01 | UC01 — Cadastrar-se | usuario, candidato | Cadastro de estudante | Sim |
| RF04 | UC05 — Pesquisar vagas | vaga, area_atuacao, vaga_area | Busca e listagem de vagas | Sim |
| RF06 | UC06 — Candidatar-se a vaga | candidatura, candidato, vaga | Detalhes da vaga e candidatura | Sim |
| RF11 | UC09b — Indicar sem experiência | candidato | Perfil e currículo | Sim |
| RF08 | UC07 — Acompanhar candidaturas | candidatura, vaga | Minhas candidaturas | Sim |
| RF07 | UC08 — Avaliar inscrições | candidatura, candidato, curriculo | Candidatos inscritos | Sim |

## Fora do MVP (funcionalidades futuras)

- Edição completa de perfil e currículo a qualquer momento (RF09)
- Notificações automáticas (RF10)
- Requisitos não funcionais amplos (LGPD, responsividade e otimização — T11 a T13), que seguem em paralelo
- Verificação/validação de empresas
- Busca por localização

## Prioridades do 2º bimestre

Essenciais (sem elas o fluxo não funciona):
- Publicar vaga e consultar vagas (RF03, RF04)
- Cadastro de candidato e de empregador, com login (RF01, RF02)
- Currículo e "sem experiência" (RF05, RF11)
- Candidatura (RF06)
- Avaliação pela empresa e acompanhamento do status (RF07, RF08)

Importantes (entram se o tempo permitir antes de 27/11):
- Edição de perfil e currículo (RF09)
- Notificações (RF10)
- Proteção dos dados e interface responsiva (RNF01, RNF02)

Complementares (ficam para depois do bimestre):
- Otimização de desempenho, disponibilidade e compatibilidade (RNF03 a RNF05)
- Verificação de empresas, busca por localização, chat

### Dependências que definem a ordem

- Uma vaga só existe se houver um empregador cadastrado.
- Uma candidatura só existe se houver uma vaga publicada e um candidato cadastrado.
- A avaliação só existe se houver candidatura.
- O login serve de base para RF01, RF02 e RN05. Não tem requisito próprio (ver `Historico_de_Alteracoes.md`).

Ordem de construção prevista: base do projeto e banco, depois empregador e vagas (20/10), depois candidato, login, busca e candidatura (até 06/11), depois avaliação, status e acabamento (até 27/11).

## Recorte da entrega de 20/10

Recorte escolhido: **publicar vagas e consultar vagas** (RF03 e a parte inicial do RF04).

O que deve funcionar no dia da entrega:
- Uma tela HTML de publicação de vaga com título, descrição, requisitos, tipo, modalidade, prazo de inscrição e área de atuação.
- A vaga publicada é gravada no MySQL.
- Regras aplicadas: prazo de inscrição obrigatório (RN01), pelo menos uma área de atuação (RN03), título e descrição obrigatórios.
- Se algum campo obrigatório faltar, a vaga não é salva e a tela informa qual campo falta.
- Uma tela de listagem mostra as vagas abertas, e a vaga recém-publicada aparece nela.
- Depois de fechar e abrir a aplicação de novo, as vagas continuam lá.
- Se der tempo: filtro da listagem por tipo e por área, e mensagem "nenhuma vaga encontrada" quando o filtro não retorna nada.

Como ainda não há login, a publicação usa um empregador fictício já cadastrado no banco, com dados de teste.

O que fica para as próximas entregas:
- 06/11: cadastro de candidato e de empregador com login, currículo, candidatura, filtros completos e começo da avaliação.
- 27/11: avaliação, acompanhamento de status, edição de perfil, notificações, responsividade e proteção dos dados, mais a apresentação final.

Recursos incompletos serão apresentados como "em desenvolvimento".
