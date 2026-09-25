# Protótipos — ConectIn

## Mapa de navegação

```
LOGIN/CADASTRO
   ↘ (estudante) PERFIL DO ESTUDANTE → PERFIL E CURRÍCULO → BUSCA DE VAGAS → DETALHES DA VAGA/CANDIDATURA → MINHAS CANDIDATURAS
   ↘ (empresa)   PERFIL DA EMPRESA → PUBLICAR VAGA → CANDIDATOS INSCRITOS
```

A tela "Candidatos inscritos" atualiza o status, refletido em "Minhas candidaturas" do estudante e disparando uma notificação (RF10).

## Telas do levantamento (conforme quadro da equipe)

| Requisito | Tela | Perfil que utiliza |
|---|---|---|
| RF01 | Cadastro de estudante | Estudante |
| RF01 | Perfil do estudante | Estudante |
| RF02 | Cadastro de empresa | Empresa |
| RF02 | Perfil da empresa | Empresa |
| RF03 | Criação/publicação de vaga | Empresa |
| RF04 | Busca e listagem de vagas | Estudante |
| RF05, RF11 | Perfil e currículo | Estudante |
| RF06, RN02, RN04 | Detalhes da vaga e candidatura | Estudante |
| RF07 | Candidatos inscritos | Empresa |
| RF08 | Minhas candidaturas | Estudante |
| RF09 | Edição de perfil | Estudante, Empresa |
| RF10 | Notificações | Estudante, Empresa |

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
