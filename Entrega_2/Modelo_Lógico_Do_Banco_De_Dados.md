# 7. Modelo Lógico do Banco de Dados

## Transformação das entidades em tabelas

O modelo conceitual foi transformado em 9 tabelas relacionais:

| Tabela | Origem |
|---|---|
| usuario | Entidade USUARIO |
| candidato | Entidade CANDIDATO (especialização, com FK para usuario) |
| empregador | Entidade EMPREGADOR (especialização, com FK para usuario) |
| curriculo | Entidade CURRICULO |
| vaga | Entidade VAGA |
| area_atuacao | Entidade AREA_ATUACAO |
| vaga_area | Tabela associativa criada para resolver o relacionamento N:N entre vaga e area_atuacao |
| candidatura | Entidade associativa CANDIDATURA |
| notificacao | Entidade NOTIFICACAO |

## Estratégia de especialização (herança)

A especialização de `usuario` em `candidato` e `empregador` foi resolvida pela estratégia de **tabela por subtipo com chave compartilhada**: as tabelas `candidato` e `empregador` possuem `id_usuario` como chave primária e, ao mesmo tempo, chave estrangeira para `usuario`. Essa abordagem evita colunas nulas em excesso (que ocorreriam em uma tabela única) e mantém a integridade referencial entre o usuário genérico e seu perfil específico.

## Chaves primárias e estrangeiras

| Tabela | Chave primária (PK) | Chaves estrangeiras (FK) |
|---|---|---|
| usuario | id_usuario | — |
| candidato | id_usuario | id_usuario → usuario.id_usuario |
| empregador | id_usuario | id_usuario → usuario.id_usuario |
| curriculo | id_curriculo | id_candidato → candidato.id_usuario |
| vaga | id_vaga | id_empregador → empregador.id_usuario |
| area_atuacao | id_area | — |
| vaga_area | (id_vaga, id_area) | id_vaga → vaga.id_vaga; id_area → area_atuacao.id_area |
| candidatura | id_candidatura | id_candidato → candidato.id_usuario; id_vaga → vaga.id_vaga |
| notificacao | id_notificacao | id_usuario → usuario.id_usuario |

## Resolução do relacionamento muitos-para-muitos

O relacionamento N:N entre `vaga` e `area_atuacao` (RN03: toda vaga deve pertencer a pelo menos uma área de atuação) foi resolvido pela tabela associativa **vaga_area**, com chave primária composta por `id_vaga` e `id_area`, cada um também atuando como chave estrangeira para as respectivas tabelas de origem.

## Restrições importantes implementadas

- **usuario.email** — `UNIQUE`, para impedir cadastros duplicados com o mesmo e-mail.
- **curriculo.id_candidato** — `UNIQUE`, garantindo que cada candidato tenha no máximo um currículo (relacionamento 1:0..1).
- **candidatura (id_candidato, id_vaga)** — `UNIQUE`, impedindo que um mesmo candidato se candidate duas vezes à mesma vaga.
- **vaga.status** — `DEFAULT 'aberta'`, refletindo que toda vaga nasce com inscrições abertas até o prazo definido (RN01).
- **candidatura.status** — `DEFAULT 'analise'`, refletindo que toda nova candidatura começa em análise (RF08).
- **candidato.sem_experiencia** — `BOOLEAN NOT NULL DEFAULT FALSE`, campo que viabiliza o RF11.

## Coerência com as regras de negócio

| Regra de negócio | Implementação no modelo lógico |
|---|---|
| RN01 — Vaga não pode ser publicada sem data de encerramento | `vaga.prazo_inscricao DATE NOT NULL` |
| RN02 — Candidatura só em vaga com prazo em aberto | Validada na aplicação a partir de `vaga.prazo_inscricao` e `vaga.status` |
| RN03 — Toda vaga deve pertencer a ao menos uma área de atuação | Tabela associativa `vaga_area`, validada na aplicação para exigir ao menos um registro por vaga |
| RN04 — Currículo obrigatório apenas para vagas de emprego/CLT | `curriculo` com relação opcional (0..1) a `candidato`; validação condicionada a `vaga.tipo` na aplicação |
| RN05 — Estudante só edita seu próprio perfil/currículo, autenticado | Controlado por autenticação e vínculo de `id_candidato`/`id_usuario` na camada de aplicação |
