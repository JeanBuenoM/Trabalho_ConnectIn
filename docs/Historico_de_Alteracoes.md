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

## 2º bimestre — Implementação e testes (20/10/2026)

| Item | O que mudou | Motivo | Impacto |
|---|---|---|---|
| Publicação de vagas (RF03) | Implementação da funcionalidade de publicação de vagas, incluindo validações dos dados informados e integração com o backend. | Permitir que empregadores cadastrem oportunidades na plataforma. | Estabelece a base para disponibilizar novas oportunidades, mas ainda existem problemas registrados nos testes que precisam ser corrigidos. |
| Consulta de vagas (RF04) | Implementação da consulta de vagas, com suporte à recuperação dos registros e à aplicação de filtros. | Permitir que os usuários consultem as oportunidades disponíveis. | Disponibiliza a estrutura inicial de consulta, sendo necessário considerar os resultados dos testes e corrigir os comportamentos identificados. |
| Backend | Desenvolvimento dos componentes responsáveis pelas operações relacionadas às vagas e pela comunicação com o banco de dados. | Organizar as regras de negócio e o acesso aos dados da aplicação. | Estrutura a implementação das funcionalidades contempladas nesta etapa. |
| Banco de dados | Utilização da estrutura definida nos scripts SQL e de dados de teste para apoiar o desenvolvimento e a verificação das funcionalidades. | Disponibilizar a estrutura e os registros necessários para a execução local do sistema. | Permite trabalhar com dados persistidos durante o desenvolvimento. |
| Testes funcionais | Execução e registro dos casos de teste definidos para a entrega, conforme documentado em `docs/Casos_de_Teste.md`. | Verificar o comportamento das funcionalidades e identificar problemas que precisam de correção. | Foram registrados cinco casos de teste: CT07, CT08 e CT09 aprovados; CT01 e CT12 reprovados. Os resultados originais permanecem documentados no arquivo de casos de teste. |
| Registro de defeitos | Documentação dos problemas identificados durante a verificação, classificados como D01, D02 e D03. | Facilitar o acompanhamento das correções necessárias. | Os defeitos passam a servir como referência para as próximas atividades de correção e validação. |
| Documentação do projeto | Atualização dos registros relacionados à implementação, ao planejamento e à entrega. | Manter a documentação alinhada ao desenvolvimento realizado. | Facilita o acompanhamento do estado do projeto e das atividades pendentes. |
| Defeitos | Registrados três defeitos: D01 (CT01), relacionado a opções incoerentes nas caixas de seleção e ao botão "Publicar vaga" sem ação; D02 (CT07), relacionado à exibição de vagas abertas e fechadas na listagem; e D03 (CT12), relacionado ao botão "Aprovar Candidato" sem ação. | Documentar os problemas encontrados durante os testes para orientar as correções. | `Casos_de_Teste.md`. |
