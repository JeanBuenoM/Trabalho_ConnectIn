# 2. Diagrama de Casos de Uso

## Atores

| Ator | Descrição |
|---|---|
| **Candidato** | Estudante ou profissional em busca de oportunidades acadêmicas ou de carreira. |
| **Empregador** | Empresa ou instituição de ensino que publica vagas e oportunidades. |

## Casos de uso

| Código | Caso de uso | Ator | Requisito relacionado |
|---|---|---|---|
| UC01 | Cadastrar-se | Candidato, Empregador | RF01, RF02 |
| UC02 | Editar perfil | Candidato, Empregador | RF09 |
| UC03 | Publicar vaga | Empregador | RF03 |
| UC04 | Editar/Remover vaga | Empregador | RF03 |
| UC05 | Pesquisar vagas | Candidato | RF04 |
| UC06 | Candidatar-se a vaga | Candidato | RF06 |
| UC07 | Acompanhar candidaturas | Candidato | RF08 |
| UC08 | Avaliar inscrições | Empregador | RF07 |
| UC09 | Cadastrar currículo | Candidato | RF05 |
| UC09b | Indicar sem experiência profissional | Candidato | RF11 |
| UC10 | Receber notificações | Candidato, Empregador | RF10 |
| UC11 | Pesquisar/filtrar candidatos | Empregador | RF07 |
| UC12 | Visualizar perfil/currículo do candidato | Empregador | RF07 |

## Relacionamentos entre casos de uso

- **UC06 (Candidatar-se a vaga) `<<include>>` UC05 (Pesquisar vagas):** para se candidatar, o candidato necessariamente passa pela busca/visualização da vaga.
- **UC06 `<<extend>>` UC09b:** ao se candidatar a uma oportunidade acadêmica sem currículo cadastrado, o candidato pode, de forma opcional, marcar que está sem experiência profissional (RN04).
- **UC09 (Cadastrar currículo) `<<extend>>` UC09b:** cadastrar currículo e indicar "sem experiência" são alternativas mutuamente exclusivas dentro do perfil do candidato.
- **UC08 (Avaliar inscrições) `<<include>>` UC12:** para avaliar uma inscrição, o empregador sempre visualiza o perfil/currículo do candidato.
- **UC03 (Publicar vaga) `<<include>>` UC10:** ao publicar uma vaga, o sistema dispara notificações a candidatos compatíveis.
- **UC07 (Acompanhar candidaturas) `<<include>>` UC10:** o acompanhamento de status gera notificações ao candidato.

## Observações de consistência com a Entrega 1

- Não há caso de uso de "chat privado" ou "mensagem direta entre candidato e empregador".
- Não há caso de uso de "verificar/validar empresa".
- Não há caso de uso de "filtrar vagas por localização".
