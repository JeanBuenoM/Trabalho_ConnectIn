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
- O protótipo de alta fidelidade (`prototipos/alta-fidelidade/`) já tem o campo modalidade na tela de publicar vaga.
- Pendente: atualizar modelo-logico.pdf, diagrama-classes.pdf e o esboço em PNG "RF03 Criação-publicação de vaga". Esses arquivos não foram alterados.

### 4. Numeração dos casos de uso
- O que mudou: na seção 10 do documento de requisitos os casos de uso vão de UC01 a UC12, mas a seção 11 (especificação) recomeçava a contagem (UC01 era Publicar vaga, por exemplo). A seção 11 passou a usar a mesma numeração da seção 10: Publicar vaga é UC03, Pesquisar vagas é UC05, Candidatar-se é UC06, Acompanhar inscrição é UC07 e Avaliar candidaturas é UC08.
- Motivo: a rastreabilidade usa a numeração da seção 10, então os dois trechos se contradiziam.
- Impacto: apenas Visao_e_Requisitos.md.

### 5. Login sem requisito próprio
- O que mudou: nada na numeração. A tarefa T01 e a regra RN05 dependem de autenticação, mas nenhum requisito cobre o login. Ele passou a ser tratado como dependência técnica de RF01, RF02 e RN05.
- Decisão para a entrega de 20/10: a publicação de vaga usa um empregador fictício já cadastrado no banco. O login de verdade fica para a entrega de 06/11.
- Impacto: MVP.md e Backlog.md.

### 6. Protótipo de alta fidelidade e tecnologia da interface
- O que mudou: o repositório passou a ter o protótipo de alta fidelidade em `prototipos/alta-fidelidade/`. Ele foi feito em React, Vite e Tailwind, mas a arquitetura do projeto prevê HTML, CSS e JavaScript simples servidos pelo Spring.
- Segurança: como não havia certeza de que o arquivo recebido estava limpo, o código do protótipo foi reescrito do zero em arquivos novos e as dependências foram instaladas de novo. Nenhum arquivo do original foi aproveitado. O README da pasta do protótipo explica como isso foi conferido.
- Decisão pendente da equipe: ou as telas são refeitas em HTML, CSS e JavaScript simples seguindo o protótipo, ou o protótipo em React passa a ser a interface do sistema, com o build servido pelo Spring. Enquanto isso não for decidido, `Arquitetura_e_Tecnologias.md` continua com HTML, CSS e JavaScript.
- Diferenças entre o protótipo e os requisitos: estão no README da pasta do protótipo.

### 7. Pendência que não bloqueia: habilidades do candidato
- O RF10 usa as habilidades do candidato para avisar sobre vagas compatíveis, mas as habilidades ficam na tabela curriculo, que é opcional (RN04). Um candidato sem currículo não teria habilidades cadastradas.
- Nada foi alterado ainda. A equipe precisa decidir até 06/11 se as habilidades passam para a tabela candidato.
