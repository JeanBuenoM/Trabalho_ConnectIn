# Entrega de 20/10/2026 — Índice

Fábrica de Software, 2º bimestre. Professora Sabine Cassol.

## Identificação

- Projeto: ConectIn — Plataforma de Oportunidades Acadêmicas e Profissionais
- Equipe: Mateus Cantelle Gomes, Jean Carlos Bueno, Kauã Morais e João Passos
- Repositório (o mesmo do 1º bimestre): https://github.com/JeanBuenoM/Trabalho_ConnectIn
- Versão avaliada: tag `entrega-20-10-2026` (criar depois que o código estiver na main)

## Onde encontrar cada item

- Resumo da revisão e das alterações desde o 1º bimestre: [`Historico_de_Alteracoes.md`](Historico_de_Alteracoes.md), seção "2º bimestre"
- Escopo priorizado do bimestre e recorte desta entrega: [`MVP.md`](MVP.md)
- Tecnologias, justificativas, diagrama e organização das pastas: [`Arquitetura_e_Tecnologias.md`](Arquitetura_e_Tecnologias.md) e [`../diagramas/diagrama-arquitetura.svg`](../diagramas/diagrama-arquitetura.svg)
- Backlog com prioridades, responsáveis, prazos e situação: [`Backlog.md`](Backlog.md)
- Código e instruções para executar: pasta [`../src/`](../src/) e o [`README.md`](../README.md) da raiz
- Casos de teste, resultados, defeitos, evidências e rastreabilidade: [`Casos_de_Teste.md`](Casos_de_Teste.md)
- Roteiro da demonstração: [`Demonstracao.md`](Demonstracao.md)
- Requisitos, regras de negócio, modelagem e dicionário de dados (atualizados): [`Visao_e_Requisitos.md`](Visao_e_Requisitos.md)
- Protótipo de alta fidelidade e suas diferenças em relação aos requisitos: [`../prototipos/alta-fidelidade/README.md`](../prototipos/alta-fidelidade/README.md)

## Pendências para a entrega de 06/11

- Cadastro de candidato e de empregador com login (T01)
- Currículo e candidatura, com as regras RN02 e RN04 (T04, T05)
- Área da empresa para ver as inscrições (T06)
- Filtros completos da busca, se não entrarem em 20/10
- Atualizar `modelo-logico.pdf`, `diagrama-classes.pdf` e o esboço em PNG da tela de publicar vaga com o campo modalidade (o protótipo de alta fidelidade já tem)
- Decidir se a interface fica em HTML, CSS e JavaScript simples ou em React, como o protótipo de alta fidelidade
- Decidir onde ficam as habilidades do candidato (hoje na tabela curriculo, que é opcional)

## Como marcar a versão da entrega

Depois que o código da entrega estiver na `main`, rodar no computador:

```
git checkout main
git pull
git tag entrega-20-10-2026
git push origin entrega-20-10-2026
```

O desenvolvimento pode continuar depois, e a tag continua apontando para a versão avaliada.

Sobre o acesso da professora: o repositório está público (uma clonagem sem login funcionou em 18/10/2026), então ela consegue abrir sem convite. Se a equipe tornar o repositório privado, é preciso convidá-la.

## Situação do checklist do manual em 18/10/2026

Já feito nos arquivos (falta enviar ao GitHub):
- Mantivemos o projeto e o repositório do 1º bimestre.
- Revisamos a documentação e registramos as mudanças.
- Definimos as prioridades e o recorte demonstrável de 20/10.
- Confirmamos tecnologias e arquitetura com justificativas (itens "confirmar" ainda precisam do aval da equipe).
- Organizamos tarefas, responsáveis, prazos e critérios de conclusão (responsáveis das tarefas novas ainda precisam ser confirmados).
- Registramos a rastreabilidade e deixamos os casos de teste prontos para executar.

Depende do código, ainda pendente:
- O código da entrega está integrado ao repositório.
- Conseguimos executar a aplicação seguindo o README.
- Conseguimos demonstrar uma interação funcional real.
- Preparamos o armazenamento inicial (script e dados fictícios).
- Executamos os testes e registramos resultados reais.
- Registramos defeitos, correções e pendências.
- Identificamos a versão ou commit da entrega (tag).
- Preparamos os dados fictícios e ensaiamos a demonstração.
- Cada integrante consegue explicar sua contribuição.

Ainda a combinar:
- Verificar o canal de entrega indicado pela professora.
- Definir os próximos passos até 06/11 (já listados acima, falta a equipe validar).
