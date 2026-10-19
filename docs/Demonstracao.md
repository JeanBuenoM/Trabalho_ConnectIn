# Roteiro da Demonstração — Entrega de 20/10/2026

O tempo e o formato seguem a orientação da professora. Este roteiro mostra a evolução do projeto na ordem pedida no manual. Os slides e protótipos ajudam, mas a parte funcional tem que ser mostrada no próprio sistema.

## Sequência

1. Problema e recorte (cerca de 1 minuto)
- O problema: vagas espalhadas em vários canais, sem um lugar único.
- O recorte desta entrega: publicar vagas e consultar vagas.
- Dizer com clareza o que ainda não existe (login, candidatura, avaliação) e que isso está no plano de 06/11 e 27/11.

2. O que mudou desde o 1º bimestre
- Os requisitos e as regras continuam os mesmos.
- Corrigimos o backlog, que marcava tarefas como completas sem ter código.
- Acrescentamos o campo modalidade na vaga, que o filtro da busca precisava.
- Alinhamos a numeração dos casos de uso.

3. Arquitetura e escolhas técnicas
- Mostrar o diagrama: navegador, servidor Java com Spring e banco MySQL.
- Explicar por que cada tecnologia foi escolhida e onde ficam as pastas.

4. Backlog e divisão das tarefas
- Mostrar `Backlog.md` (ou o quadro da equipe) com quem ficou com cada tarefa e a situação real.

5. Execução no sistema
- Abrir a listagem de vagas (vazia ou só com vagas de teste).
- Publicar uma vaga válida e mostrar que ela aparece na listagem.
- Tentar publicar sem prazo de inscrição e mostrar a mensagem de erro (RN01).
- Tentar publicar sem área de atuação e mostrar a mensagem de erro (RN03).
- Fechar e abrir a aplicação e mostrar que a vaga continua lá.
- Se o filtro estiver pronto, filtrar por tipo ou por área.
- Dizer o que está "em desenvolvimento".

6. Testes, resultados e pendências
- Mostrar `Casos_de_Teste.md` com os resultados reais e as evidências.
- Contar os defeitos que apareceram e o que foi corrigido.
- Apresentar o plano até 06/11.

## Quem fala o quê (sugestão, ajustar conforme as tarefas)

- Mateus: arquitetura, banco e como rodar o projeto (T14, T15)
- Kauã: tela de publicação de vaga (T02)
- João: listagem e filtros (T03)
- Jean: validações no servidor, testes e resultados (T16, T17)

Todos precisam conseguir explicar a situação do projeto e a própria contribuição. Na apresentação final de 27/11 a participação de todos é obrigatória.

## Preparação

- Rodar a demonstração inteira no computador que será usado, seguindo só o README, antes do dia.
- Ter os dados fictícios prontos e o banco limpo para começar do zero.
- Deixar abertos: a aplicação, o banco, o repositório no GitHub e este roteiro.
- Ter prints ou uma gravação de tela do fluxo funcionando, para o caso de algo falhar na hora.
- Ensaiar uma vez com cronômetro.
