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
