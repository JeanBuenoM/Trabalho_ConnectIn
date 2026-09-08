# 9. Rastreabilidade

Ligação entre os requisitos definidos na Entrega 1 e os artefatos de modelagem desta entrega, demonstrando que cada requisito está refletido em um caso de uso, em uma estrutura de dados e em uma tela prevista.

| Requisito | Caso de uso | Entidades envolvidas | Tela prevista |
|---|---|---|---|
| RF01 | UC01 — Cadastrar-se | usuario, candidato | Tela de cadastro de candidato |
| RF02 | UC01 — Cadastrar-se | usuario, empregador | Tela de cadastro de empregador |
| RF03 | UC03 — Publicar vaga | vaga, empregador, area_atuacao, vaga_area | Tela de nova vaga |
| RF04 | UC05 — Pesquisar vagas | vaga, area_atuacao, vaga_area | Tela de busca/listagem de vagas |
| RF05 | UC09 — Cadastrar currículo | curriculo, candidato | Tela de currículo do perfil |
| RF06 | UC06 — Candidatar-se a vaga | candidatura, candidato, vaga | Tela de detalhes da vaga (botão candidatar-se) |
| RF07 | UC08 — Avaliar inscrições / UC11 — Pesquisar candidatos / UC12 — Visualizar perfil | candidatura, candidato, curriculo | Tela de gestão de inscrições da vaga |
| RF08 | UC07 — Acompanhar candidaturas | candidatura, vaga | Tela "Minhas candidaturas" |
| RF09 | UC02 — Editar perfil | candidato, curriculo | Tela de edição de perfil |
| RF10 | UC10 — Receber notificações | notificacao, usuario | Tela/central de notificações |
| RF11 | UC09b — Indicar sem experiência profissional | candidato | Tela de currículo do perfil (campo "sem experiência") |

## 9.1 Regras de negócio e sua aplicação

| Regra de negócio | Onde é aplicada | Entidades/campos envolvidos |
|---|---|---|
| RN01 — Vaga não pode ser publicada sem data de encerramento | UC03 — Publicar vaga | vaga.prazo_inscricao |
| RN02 — Candidatura só em vaga com prazo em aberto | UC06 — Candidatar-se a vaga | vaga.prazo_inscricao, vaga.status |
| RN03 — Toda vaga deve pertencer a ao menos uma área de atuação | UC03 — Publicar vaga | vaga_area, area_atuacao |
| RN04 — Currículo obrigatório apenas para vagas de emprego/CLT | UC06 — Candidatar-se a vaga / UC09b | curriculo, candidato.sem_experiencia, vaga.tipo |
| RN05 — Candidato só edita seu próprio perfil, autenticado | UC02 — Editar perfil | usuario, candidato |

## 9.2 Consistência geral

- Todos os 11 requisitos funcionais (RF01–RF11) da Entrega 1 possuem caso de uso, entidade e tela correspondentes.
- Todas as 5 regras de negócio (RN01–RN05) estão refletidas em pelo menos um caso de uso e em uma restrição do modelo de dados (seção 7.6 do Modelo Lógico).
- Nenhuma funcionalidade fora do escopo definido na Entrega 1 (chat privado, verificação formal de empresas, filtro por localização) foi introduzida nos artefatos de modelagem desta entrega.
