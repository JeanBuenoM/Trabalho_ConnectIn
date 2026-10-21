# Histórico de Alterações

## Entrega 1 → Revisão

| Item alterado | O que mudou | Motivo |
|---|---|---|
| Seção 4 — Público-alvo | Público-alvo ampliado de "empregados e empregadores" para incluir também estudantes e instituições de ensino em busca de oportunidades e programas acadêmicos. O perfil "Empregados" foi renomeado para "Candidatos". | A definição original era mais restrita do que a proposta do projeto, que já previa estágios e programas acadêmicos desde o início. |
| Seção 5 — Escopo (Restrições) | A restrição de busca por localização foi substituída pela ausência de verificação e validação de empresas e de mecanismos antifraude nas vagas publicadas. A busca por localização passou a ser prevista como funcionalidade futura. | A restrição original não representava uma limitação técnica real da equipe nesta fase do projeto. A falta de verificação de empresas é uma limitação relevante para o MVP. |
| Seção 5 — Escopo (Fora do escopo) | A justificativa da ausência de chats privados foi reforçada, detalhando os riscos de segurança que motivam manter essa funcionalidade fora do escopo nesta fase. | A devolutiva solicitou maior fundamentação, mantendo a decisão original. |
| RF04 | Removida a opção de filtro por localização da busca de vagas, mantendo a coerência com a restrição revisada na seção de Escopo. | Consequência direta da mudança na seção de Escopo. |
| RF05 e RN04 | O currículo deixou de ser obrigatório para todas as candidaturas e passou a ser opcional para oportunidades acadêmicas, como estágios e projetos acadêmicos, permanecendo obrigatório para vagas profissionais e CLT. | Exigir um currículo elaborado de estudantes em início de carreira é pouco realista e pode incentivar uma seleção enviesada por parte dos recrutadores. |
| RF11 (novo) | Adicionado requisito funcional para permitir que o perfil sinalize "sem experiência profissional, em busca de oportunidade" como alternativa ao currículo. | Necessário para viabilizar a regra RN04 revisada. |

A numeração dos requisitos funcionais (RF01–RF10), não funcionais (RNF01–RNF05) e das regras de negócio (RN01–RN05) foi mantida integralmente. Apenas o RF11 foi acrescentado ao final da lista de requisitos funcionais.

## Entrega 2 — Modelagem

Foram adicionados o diagrama de casos de uso, as especificações de casos de uso, o diagrama de atividades, o diagrama de classes, o modelo conceitual, o modelo lógico, o dicionário de dados e a matriz de rastreabilidade.

Os requisitos definidos na Entrega 1 revisada foram mantidos.

## Entrega 3 — GitHub, Protótipos e MVP

- Repositório reorganizado seguindo a estrutura sugerida no manual: `docs/`, `diagramas/`, `banco-de-dados/`, `prototipos/` e `src/`.
- README atualizado com problema, objetivo, equipe, funcionalidades, tecnologias e MVP.
- Tecnologias definidas: HTML, CSS e JavaScript no frontend, Java no backend e MySQL no banco de dados.
- MVP e fluxo principal definidos: cadastro → busca → candidatura → avaliação → acompanhamento.
- Mapa de navegação e esboços das telas do MVP criados.
- Backlog e arquitetura atualizados com os dados do quadro de gestão utilizado pela equipe, incluindo 13 tarefas, responsáveis e status.
- Levantamento de telas ampliado para incluir perfil do estudante, perfil da empresa, candidatos inscritos e notificações.

**Pendências desta entrega:** atualizar `modelo-logico.pdf`, `diagrama-classes.pdf` e o esboço "RF03 Criação-publicação de vaga" para incluir o campo modalidade, além de decidir onde serão armazenadas as habilidades do candidato.

## 2º bimestre — Implementação e testes (20/10/2026)

| Item | O que mudou | Motivo | Impacto |
|---|---|---|---|
| Código do recorte | O repositório passou a conter a implementação inicial da publicação de vagas (RF03, com RN01 e RN03) e da listagem de vagas abertas, com filtros por tipo, área e modalidade (RF04). O código Java com Spring está em `prototipos/alta-fidelidade/main/java/com/connectin/`, e as telas HTML, CSS e JavaScript estão em `resources/static/`. | Implementação do primeiro recorte funcional previsto no MVP. | RF03 e RF04; tarefas T02, T03, T14 e T16. |
| Dados de teste | Criado o arquivo `banco-de-dados/dados-teste.sql`, responsável por cadastrar um empregador de teste e cinco áreas de atuação fictícias. | Permitir testar a publicação de vagas sem depender da implementação do login nesta etapa. | T15. |
| Persistência | O acesso ao MySQL utiliza `JdbcTemplate`, com comandos SQL explícitos, em vez de Spring Data JPA. | Facilitar a visualização e a compreensão das consultas SQL, mantendo o alinhamento com o `schema.sql`. | `Arquitetura_e_Tecnologias.md`. |
| Filtros da listagem | Implementados os filtros por tipo, área e modalidade na listagem de vagas. | Disponibilizar os filtros previstos no RF04. | RF04. |
| Casos de teste | Executados cinco casos de teste em 20/10: CT01, CT07, CT08, CT09 e CT12. Três foram aprovados (CT07, CT08 e CT09) e dois foram reprovados (CT01 e CT12). As capturas de CT07, CT08 e CT09 estão em `docs/evidencias/`. | Registrar os resultados da execução real dos testes, conforme as orientações do Passo 7 do manual. | `Casos_de_Teste.md` e tarefa T17. |
| Defeitos | Registrados três defeitos: D01 (CT01), relacionado a opções incoerentes nas caixas de seleção e ao botão "Publicar vaga" sem ação; D02 (CT07), relacionado à exibição de vagas abertas e fechadas na listagem; e D03 (CT12), relacionado ao botão "Aprovar Candidato" sem ação. | Documentar os problemas encontrados durante os testes para orientar as correções. | `Casos_de_Teste.md`. |
| Backlog e MVP | No `Backlog.md`, as tarefas T14, T15, T02, T16, T03 e T17 passaram de "Finalizado" para "Completo", conforme a legenda de status. No `MVP.md`, a situação foi atualizada para refletir o recorte implementado: RF03 e RF04 constam como "Finalizado", enquanto RF07 e RF11 constam como "Não iniciado". | Manter o planejamento coerente com o estado atual da implementação. | `Backlog.md` e `MVP.md`. |
