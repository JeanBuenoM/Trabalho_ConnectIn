# Histórico de Alterações

## Entrega 1 → Revisão

| Item alterado | O que mudou | Motivo |
|---|---|---|
| Seção 4 — Público-alvo | Público-alvo ampliado de "empregados e empregadores" para incluir também estudantes e instituições de ensino em busca de oportunidades/programas acadêmicos. Perfis renomeados de "Empregados" para "Candidatos". | A definição original era mais restrita do que a proposta do projeto descrita na seção de Identificação, que já previa estágios e programas acadêmicos desde o início. |
| Seção 5 — Escopo (Restrições) | Restrição de "busca por localização" substituída por "ausência de verificação/validação de empresas e checagem antifraude nas vagas publicadas". A busca por localização passou a ser prevista como funcionalidade futura. | A restrição original não representava uma limitação técnica real da equipe nesta fase do projeto. A falta de verificação de empresas é uma limitação genuína e relevante para um MVP. |
| Seção 5 — Escopo (Fora do escopo) | Justificativa da ausência de chats privados reforçada, detalhando os riscos de segurança que motivam mantê-los fora do escopo nesta fase. | A devolutiva pediu maior fundamentação, mesmo mantendo a decisão original. |
| RF04 | Removida a opção de filtro por localização da busca de vagas, para manter coerência com a restrição revisada na seção de Escopo. | Consequência direta da mudança na seção de Escopo. |
| RF05 e RN04 | Currículo deixa de ser obrigatório para todas as candidaturas; passa a ser opcional para oportunidades acadêmicas (estágio/projeto acadêmico), permanecendo obrigatório para vagas profissionais/CLT. | Exigir currículo elaborado de estudantes em início de carreira é pouco realista e pode incentivar seleção enviesada por parte de recrutadores. |
| RF11 (novo) | Adicionado requisito funcional para permitir que o perfil sinalize "sem experiência profissional, em busca de oportunidade" como alternativa ao currículo. | Necessário para viabilizar a regra RN04 revisada. |

A numeração de requisitos funcionais (RF01–RF10), não funcionais (RNF01–RNF05) e regras de negócio (RN01–RN05) foi mantida integralmente; apenas o RF11 foi acrescentado como novo item ao final da lista de requisitos funcionais.

## Entrega 2 — Modelagem

Adicionados: diagrama de casos de uso, especificação de casos de uso, diagrama de atividades, diagrama de classes, modelo conceitual, modelo lógico, dicionário de dados e matriz de rastreabilidade. Sem alterações nos requisitos já fechados na Entrega 1 revisada.

## Entrega 3 — GitHub, Protótipos e MVP

- Repositório reorganizado seguindo a estrutura sugerida no manual (`docs/`, `diagramas/`, `banco-de-dados/`, `prototipos/`, `src/`).
- README atualizado com problema, objetivo, equipe, funcionalidades, tecnologias e MVP.
- Definidas as tecnologias: HTML/CSS/JavaScript (frontend), Java (backend), MySQL (banco de dados).
- Definido o MVP e o fluxo completo (cadastro → busca → candidatura → avaliação → acompanhamento).
- Criado mapa de navegação e esboços das telas do MVP.
- Backlog e arquitetura atualizados com os dados reais do quadro de gestão já usado pela equipe (13 tarefas, responsáveis e status).
- Levantamento de telas ampliado para refletir o quadro real da equipe: adicionadas as telas de perfil do estudante, perfil da empresa, candidatos inscritos e notificações.

Pendências desta entrega que continuam abertas: atualizar `modelo-logico.pdf`, `diagrama-classes.pdf` e o esboço "RF03 Criação-publicação de vaga" com o campo modalidade (item 3), e decidir onde ficam as habilidades do candidato (item 7).

## 2º bimestre — Revisão da base (18/10/2026)

A revisão foi feita lendo todos os documentos e o repositório do 1º bimestre, antes de começar a implementação. O problema, os objetivos, os usuários e o escopo continuam válidos. Os requisitos RF01 a RF11, RNF01 a RNF05 e as regras RN01 a RN05 foram mantidos, e nenhum requisito foi removido. Os ajustes abaixo corrigem diferenças entre os documentos e o que existe no repositório.

### 1. Status das tarefas no Backlog e no MVP
- O que mudou: T01 a T05 estavam como "Completo" e T06 a T10 como "Em progresso", mas o repositório não tem código. A pasta src/ só tem um README dizendo que a implementação ainda não foi iniciada. Todas as tarefas passaram para "Não iniciado". Os protótipos das telas continuam prontos.
- Motivo: o status precisa mostrar o que realmente existe no repositório.
- Impacto: Backlog.md, MVP.md, README.md e prototipos/README.md foram atualizados. O trecho do MVP que dizia que a maior parte do fluxo já estava concluída foi corrigido.

### 2. Prioridades de T07, T08 e T09
- O que mudou: T07 (avaliar inscrições, RF07) e T08 (acompanhar status, RF08) passaram de Média para Alta. T09 (edição de perfil, RF09) passou de Alta para Média.
- Motivo: o MVP classifica o RF07 e o RF08 como indispensáveis e o RF09 como desejável, mas o backlog dizia o contrário.
- Impacto: apenas Backlog.md.

### 3. Modalidade da vaga (RF03 e RF04)
- O que mudou: o RF04 prevê filtro por modalidade, mas a tabela vaga não tinha esse campo e o RF03 não pedia essa informação. Foi acrescentado o campo modalidade (presencial, remoto ou híbrido) na vaga e no RF03.
- Motivo: sem esse campo não dá para implementar o filtro previsto no RF04.
- Impacto: RF03 e dicionário de dados em Visao_e_Requisitos.md, schema.sql, tela de publicar vaga (campo novo), filtro da busca e testes.
- Pendente: atualizar modelo-logico.pdf, diagrama-classes.pdf e o esboço em PNG "RF03 Criação-publicação de vaga". Esses arquivos não foram alterados.

### 4. Numeração dos casos de uso
- O que mudou: na seção 10 do documento de requisitos os casos de uso vão de UC01 a UC12, mas a seção 11 (especificação) recomeçava a contagem (UC01 era Publicar vaga, por exemplo). A seção 11 passou a usar a mesma numeração da seção 10: Publicar vaga é UC03, Pesquisar vagas é UC05, Candidatar-se é UC06, Acompanhar inscrição é UC07 e Avaliar candidaturas é UC08.
- Motivo: a rastreabilidade usa a numeração da seção 10, então os dois trechos se contradiziam.
- Impacto: apenas Visao_e_Requisitos.md.

### 5. Login sem requisito próprio
- O que mudou: nada na numeração. A tarefa T01 e a regra RN05 dependem de autenticação, mas nenhum requisito cobre o login. Ele passou a ser tratado como dependência técnica de RF01, RF02 e RN05.
- Decisão para a entrega de 20/10: a publicação de vaga usa um empregador fictício já cadastrado no banco. O login de verdade fica para a entrega de 06/11.
- Impacto: MVP.md e Backlog.md.

### 6. Tecnologia da interface
- O que mudou: as telas do sistema (`publicar-vaga.html` e `vagas.html`) foram feitas em HTML, CSS e JavaScript simples, servidas pelo Spring, como prevê a arquitetura do projeto.
- Motivo: é a tecnologia já prevista na arquitetura e não exige Node nem pnpm para rodar o sistema.
- Impacto: `README.md` e `Arquitetura_e_Tecnologias.md`. A equipe pode rever a decisão até 06/11.
- Os esboços das telas continuam em `prototipos/` (imagens PNG).

### 7. Pendência que não bloqueia: habilidades do candidato
- O RF10 usa as habilidades do candidato para avisar sobre vagas compatíveis, mas as habilidades ficam na tabela curriculo, que é opcional (RN04). Um candidato sem currículo não teria habilidades cadastradas.
- Nada foi alterado ainda. A equipe precisa decidir até 06/11 se as habilidades passam para a tabela candidato.

## 2º bimestre — Implementação e testes (20/10/2026)

| Item | O que mudou | Motivo | Impacto |
|---|---|---|---|
| Código do recorte | O repositório passou a ter o código do recorte da entrega: publicação de vaga (RF03, com RN01 e RN03) e listagem de vagas abertas com filtros por tipo, área e modalidade (RF04). Fica em `prototipos/alta-fidelidade/main/`: Java/Spring em `java/com/conectin/` (controller, service, repository, model e erro) e telas HTML, CSS e JavaScript em `resources/static/`. | Primeira implementação executável prevista no MVP. | RF03 e RF04; tarefas T02, T03, T14 e T16. |
| Dados de teste | `banco-de-dados/dados-teste.sql` cria um empregador de teste e cinco áreas de atuação fictícias. | O login só entra em 06/11, então a vaga é publicada por um empregador de teste (item 5 acima). | T15. |
| Persistência | O acesso ao MySQL usa `JdbcTemplate` (SQL explícito), e não Spring Data JPA. | SQL visível, alinhado ao `schema.sql` e simples de explicar. | `Arquitetura_e_Tecnologias.md`. |
| Filtros da listagem | O filtro por tipo, área e modalidade entrou no recorte, que antes o tratava como "se der tempo". | A consulta já suporta os três filtros do RF04 e a modalidade já existe no banco. | RF04. |
| Casos de teste | O Kauã executou 5 casos em 20/10 (CT01, CT07, CT08, CT09 e CT12): 3 aprovados (CT07, CT08, CT09) e 2 reprovados (CT01 e CT12). As capturas de CT07, CT08 e CT09 estão em `docs/evidencias/`. | Execução real dos testes, com resultado registrado, como pede o manual (Passo 7). | `Casos_de_Teste.md`, tarefa T17. |
| Defeitos | Registrados 3 defeitos: D01 (CT01), opções incoerentes nas caixas de seleção e botão "Publicar vaga" sem ação; D02 (CT07), a listagem mostra vagas abertas e fechadas; D03 (CT12), o botão "Aprovar Candidato" não faz nada. | O manual pede o registro dos defeitos encontrados. | `Casos_de_Teste.md`. |
| Backlog e MVP | No `Backlog.md`, T14, T15, T02, T16, T03 e T17 passaram de "Finalizado" (estado que não existe na legenda) para "Completo". No `MVP.md`, a coluna de situação passou a refletir o recorte de 20/10: RF03 e RF04 constam como "Finalizado", e RF07 e RF11 como "Não iniciado". | O status precisa mostrar o que existe e foi executado. | `Backlog.md`, `MVP.md`. |
