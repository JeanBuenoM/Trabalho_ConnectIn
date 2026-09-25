# MVP e Fluxo Completo — ConectIn

## O que é o MVP

O MVP do ConectIn cobre o ciclo essencial: cadastro, publicação de vaga, busca, candidatura e acompanhamento de status. O que não é indispensável para esse ciclo funcionar fica para versões futuras. A classificação abaixo foi cruzada com o backlog real da equipe (`Backlog.md`).

## Funcionalidades e classificação

| Funcionalidade | Requisito | Classificação | Faz parte do MVP? | Status no backlog |
|---|---|---|---|---|
| Cadastro de candidato/estudante | RF01 | Indispensável | Sim | Completo (T01) |
| Cadastro de empregador/empresa | RF02 | Indispensável | Sim | Completo (T01) |
| Publicar vaga | RF03 | Indispensável | Sim | Completo (T02) |
| Pesquisar/filtrar vagas | RF04 | Indispensável | Sim | Completo (T03) |
| Cadastrar currículo | RF05 | Indispensável | Sim | Completo (T04) |
| Candidatar-se a vaga | RF06 | Indispensável | Sim | Completo (T05) |
| Avaliar candidaturas | RF07 | Indispensável | Sim | Não iniciado (T06, T07) |
| Acompanhar status de candidatura | RF08 | Indispensável | Sim | Em progresso (T08) |
| Editar perfil/currículo | RF09 | Desejável | Não | Em progresso (T09) |
| Notificações | RF10 | Desejável | Não | Não iniciado (T10) |
| Indicar sem experiência profissional | RF11 | Indispensável | Sim | Incluído no fluxo de candidatura (T05) |

## Fluxo completo selecionado

**Candidato se cadastra → pesquisa vaga → candidata-se → Empregador avalia → Candidato acompanha o status**

1. Candidato se cadastra (RF01).
2. Candidato pesquisa e filtra vagas (RF04).
3. Candidato se candidata a uma vaga (RF06), aplicando a regra RN04 (currículo obrigatório ou "sem experiência", conforme o tipo de vaga).
4. Sistema registra a candidatura com status "análise" (RF08).
5. Empregador avalia a candidatura e define o status (RF07).
6. Candidato acompanha e visualiza o status atualizado (RF08).

Esse fluxo é o mais indicado para demonstração porque já tem a maior parte das etapas concluída no backlog (T01-T05), faltando apenas fechar a ponta de avaliação (T06, T07) e status (T08).

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

- Edição completa de perfil e currículo a qualquer momento (RF09 — em progresso, mas não bloqueia o fluxo principal)
- Notificações automáticas (RF10)
- Requisitos não funcionais amplos (LGPD, responsividade e otimização — T11-T13), que seguem em desenvolvimento em paralelo
- Verificação/validação de empresas
- Busca por localização
