# Protótipos — ConectIn

## Mapa de navegação

Ver [`mapa-de-navegacao.svg`](mapa-de-navegacao.svg).

```
LOGIN/CADASTRO
   ↘ (estudante) PERFIL DO ESTUDANTE → PERFIL E CURRÍCULO → BUSCA DE VAGAS → DETALHES DA VAGA/CANDIDATURA → MINHAS CANDIDATURAS
   ↘ (empresa)   PERFIL DA EMPRESA → PUBLICAR VAGA → CANDIDATOS INSCRITOS
```

A tela "Candidatos inscritos" atualiza o status, refletido em "Minhas candidaturas" do estudante e disparando uma notificação (RF10).

## Telas do levantamento (conforme quadro da equipe)

| Requisito | Tela | Perfil que utiliza | Arquivo |
|---|---|---|---|
| RF01 | Cadastro de estudante | Estudante | [`01-tela-login.svg`](01-tela-login.svg) |
| RF01 | Perfil do estudante | Estudante | [`07-tela-perfil-estudante.svg`](07-tela-perfil-estudante.svg) |
| RF02 | Cadastro de empresa | Empresa | [`01-tela-login.svg`](01-tela-login.svg) |
| RF02 | Perfil da empresa | Empresa | [`08-tela-perfil-empresa.svg`](08-tela-perfil-empresa.svg) |
| RF03 | Criação/publicação de vaga | Empresa | [`05-tela-publicar-vaga.svg`](05-tela-publicar-vaga.svg) |
| RF04 | Busca e listagem de vagas | Estudante | [`02-tela-busca-vagas.svg`](02-tela-busca-vagas.svg) |
| RF05, RF11 | Perfil e currículo | Estudante | [`07-tela-perfil-estudante.svg`](07-tela-perfil-estudante.svg) |
| RF06, RN02, RN04 | Detalhes da vaga e candidatura | Estudante | [`03-tela-detalhes-vaga.svg`](03-tela-detalhes-vaga.svg) |
| RF07 | Candidatos inscritos | Empresa | [`06-tela-gestao-inscricoes.svg`](06-tela-gestao-inscricoes.svg) |
| RF08 | Minhas candidaturas | Estudante | [`04-tela-minhas-candidaturas.svg`](04-tela-minhas-candidaturas.svg) |
| RF09 | Edição de perfil | Estudante, Empresa | Reaproveita `07` / `08` com campos editáveis |
| RF10 | Notificações | Estudante, Empresa | [`09-tela-notificacoes.svg`](09-tela-notificacoes.svg) |

## Estados e mensagens representados

- **Validação de campo obrigatório:** tela de publicar vaga, ao faltar a data de encerramento (RN01).
- **Feedback de ação concluída:** tela de publicar vaga, após publicação bem-sucedida.
- **Estado vazio:** tela de busca de vagas ("nenhuma vaga encontrada") e tela de candidatos inscritos ("nenhuma candidatura recebida").
- **Bloqueio de regra de negócio:** tela de detalhes da vaga, quando falta currículo obrigatório em vaga CLT (RN04).
- **Alternativa opcional:** tela de perfil do estudante, indicação de "sem experiência profissional" para vagas acadêmicas (RF11).
- **Notificação lida/não lida:** tela de notificações, distinção visual entre itens novos e já visualizados.

## Padronização visual

- Tipografia: Arial/sans-serif em todas as telas.
- Paleta: neutro para estrutura, verde para ações do estudante, laranja/terracota para ações da empresa, âmbar para notificações, vermelho para erros/reprovações.
- Botões primários sempre preenchidos; botões secundários com borda.

## Relação com o backlog

As telas correspondentes a T01-T05 (login, publicar vaga, busca/filtros, currículo, candidatura) já estão concluídas segundo o backlog da equipe. As telas de candidatos inscritos (T06, T07) e notificações (T10) ainda estão pendentes — os esboços aqui servem de referência para essa implementação.

> Esboços em baixa fidelidade (wireframes). Podem ser refeitos em média/alta fidelidade no Figma ou Canva antes da apresentação, mantendo os mesmos campos, estados e fluxo.
