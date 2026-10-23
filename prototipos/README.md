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

Todas as telas aqui são protótipos: nenhuma delas foi implementada em código ainda (situação em 18/10/2026). Para a entrega de 20/10, as telas de publicar vaga (T02) e de busca e listagem de vagas (T03) são as primeiras a serem implementadas. Os esboços servem de referência para as demais.

Protótipo de alta fidelidade: a pasta [`ConectIn_app_v0.4/`](ConectIn_app_v0.4/) tem o protótipo navegável das telas (React, Vite e Tailwind), com a tela de publicar vaga já com o campo modalidade. As diferenças entre ele e os requisitos estão no README da pasta. As imagens PNG desta pasta (`RF03 Criação-publicação de vaga.png` e as outras) são os esboços anteriores e não têm o campo modalidade.

