# Backlog — ConectIn

O quadro de gestão que a equipe já usava continua sendo a base. Os status refletem o que existe no repositório (ver `Historico_de_Alteracoes.md`). Os responsáveis das tarefas novas (T14 a T17) são sugestões e devem ser confirmados pela equipe.

Estados usados: Não iniciado, Em progresso, Completo. Uma tarefa só passa para "Completo" depois de cumprir todos os seus critérios de conclusão (tabela abaixo), o que inclui executar o sistema e os testes.

## Entrega de 20/10: publicar e consultar vagas

O código do recorte já está no repositório (`src/` e `pom.xml`). Ele ainda não foi executado de ponta a ponta com o MySQL, por isso as tarefas abaixo continuam "Em progresso" até a equipe rodar e conferir cada critério.

| Tarefa | Descrição | Requisito | Responsável | Prioridade | Prazo | Situação |
|---|---|---|---|---|---|---|
| T14 | Criar a estrutura do projeto Java/Spring, ligar ao MySQL e escrever no README como executar | RF03 | Mateus Gomes | Alta | 20/10 | Finalizado (estrutura e README no repositório) |
| T15 | Rodar o schema.sql e criar dados fictícios de teste (um empregador de teste e as áreas de atuação) | RF03, RN03 | Mateus Gomes | Alta | 20/10 | Finalizado (`banco-de-dados/dados-teste.sql` criado; falta rodar em um banco vazio) |
| T02 | Criar a tela de publicação de vagas, seguindo o protótipo de alta fidelidade e corrigindo as opções de Tipo e Modalidade, que no protótipo estão erradas | RF03 | Kauã Morais | Alta | 20/10 | Finalizado (`publicar-vaga.html` e `publicar-vaga.js` no repositório) |
| T16 | Implementar no servidor a publicação de vaga: receber os dados, validar RN01 e RN03 e gravar no banco | RF03, RN01, RN03 | Jean Bueno | Alta | 20/10 | Finalizado (`VagaService` e `VagaController` no repositório.) |
| T03 | Criar a listagem de vagas abertas; se der tempo, filtros por tipo e por área e mensagem de "nenhuma vaga encontrada" | RF04 | João Passos | Alta | 20/10 | Finalizado (`vagas.html`, `vagas.js` e filtros por tipo, área e modalidade no repositório) |
| T17 | Executar os casos de teste, registrar resultados e evidências, e criar a tag da entrega | RF03, RF04 | Jean Bueno | Alta | 20/10 | Finalizado |

### Critérios de conclusão

| Tarefa | Critério de conclusão |
|---|---|
| T14 | Outra pessoa da equipe clona o repositório, segue o README e consegue abrir a aplicação no navegador. |
| T14 | O README tem os comandos e as versões que foram realmente usados. |
| T14 | Senhas e arquivos gerados (como a pasta target) não estão no GitHub. |
| T15 | O schema.sql roda sem erro em um banco vazio. |
| T15 | Existe pelo menos um empregador de teste e pelo menos quatro áreas de atuação cadastradas. |
| T02 e T16 | Uma vaga com todos os dados válidos é salva e aparece na listagem. |
| T02 e T16 | Sem prazo de inscrição, a vaga é recusada e a tela informa o campo (RN01). |
| T02 e T16 | Sem área de atuação, a vaga é recusada (RN03). |
| T02 e T16 | Sem título ou sem descrição, a vaga é recusada. |
| T02 e T16 | Nenhuma vaga recusada fica gravada no banco. |
| T03 | A listagem mostra só vagas com status aberta. |
| T03 | Depois de fechar e abrir a aplicação, as vagas continuam aparecendo. |
| T03 | Filtrar por tipo, por área ou por modalidade mostra só as vagas correspondentes, e um filtro sem resultado mostra a mensagem de que nenhuma vaga foi encontrada. |
| T17 | Todos os casos de `Casos_de_Teste.md` do recorte foram executados e têm resultado real, sem nenhum marcado como aprovado sem ter rodado. |
| T17 | Cada teste tem sua evidência em `docs/evidencias/`. |
| T17 | A tag `entrega-20-10-2026` aponta para o commit que será avaliado. |

## Entrega de 06/11: implementação, integração e testes

| Tarefa | Descrição | Requisito | Responsável | Prioridade | Prazo | Situação |
|---|---|---|---|---|---|---|
| T01 | Criar cadastro e login de estudante e de empresa | RF01, RF02, RN05 | Kauã Morais | Alta | 06/11 | Não iniciado |
| T04 | Criar cadastro e anexo de currículo | RF05 | Jean Bueno | Alta | 06/11 | Não iniciado |
| T05 | Implementar candidatura às vagas, com a regra do currículo e o "sem experiência" | RF06, RF11, RN02, RN04 | Jean Bueno | Alta | 06/11 | Não iniciado |
| T06 | Criar área para empresas visualizarem as inscrições | RF07 | Jean Bueno | Alta | 06/11 | Não iniciado |

## Entrega de 27/11: conclusão e apresentação final

| Tarefa | Descrição | Requisito | Responsável | Prioridade | Prazo | Situação |
|---|---|---|---|---|---|---|
| T07 | Implementar a avaliação das inscrições | RF07 | João Passos | Alta | 27/11 | Não iniciado |
| T08 | Criar o acompanhamento do status das inscrições | RF08 | Mateus Gomes | Alta | 27/11 | Não iniciado |
| T09 | Criar edição de perfil e currículo | RF09 | Kauã Morais | Média | 27/11 | Não iniciado |
| T10 | Implementar o sistema de notificações | RF10 | João Passos | Média | 27/11 | Não iniciado |
| T11 | Implementar a proteção dos dados dos usuários | RNF01 | Mateus Gomes | Alta | 27/11 | Não iniciado |
| T12 | Adaptar a interface para desktop e mobile | RNF02 | Mateus Gomes | Média | 27/11 | Não iniciado |
| T13 | Otimização geral do sistema, mobile e desktop | RNF03, RNF04, RNF05 | Mateus Gomes | Média | 27/11 | Não iniciado |

As prioridades de T07, T08 e T09 foram ajustadas para ficarem de acordo com o MVP (ver `Historico_de_Alteracoes.md`).
