# O que a equipe precisa fazer antes de entregar (20/10)

## 1. Subir a pasta para o repositório
1. Clone o repositório: `git clone https://github.com/JeanBuenoM/Trabalho_ConnectIn.git`
2. Copie o conteúdo da pasta `entrega_conectin` POR CIMA do clone (aceite substituir README.md, docs/ e src/README.md). Não apague nada do que já existe.
3. `git add .` e confira com `git status` que NÃO aparece `application.properties` nem `target/`.
4. `git commit -m "Implementa publicação e listagem de vagas (RF03, RF04) e atualiza a documentação"` e `git push`.

## 2. Rodar de verdade (o código nunca foi executado com MySQL)
Siga o README: criar o banco, copiar o `application.properties`, `mvn spring-boot:run`, abrir http://localhost:8080.

Se der erro, o mais provável é: senha do MySQL errada no `application.properties`, porta 3306 diferente, ou o Maven reclamando da versão do Java (precisa ser 21). Se aparecer algum erro de compilação, me mande o texto completo do erro que eu corrijo.

## 3. Executar os 11 casos de teste e escrever os resultados (só vocês podem)
Em `docs/Casos_de_Teste.md`, para cada CT01 a CT11:
- Trocar "Observado: (preencher após executar)" pelo que realmente aconteceu.
- Trocar "Situação: Não executado" por Aprovado ou Reprovado, conforme o resultado real.
- No topo: data, quem executou e o commit testado (`git rev-parse --short HEAD`).
- Tirar uma captura de tela de cada teste e salvar em `docs/evidencias/` com o nome do caso (ex.: `CT02-prazo-obrigatorio.png`).
- Se algum falhar, preencher a seção "Defeitos encontrados", corrigir e repetir o teste.
- CT06, CT07 e CT08 mexem direto no banco: use o MySQL Workbench ou `mysql -u root -p conectin`.

## 4. Preencher o que depende da máquina de vocês
- README.md: linha "Versões usadas pela equipe nos testes" (Java, Maven, MySQL).
- docs/Arquitetura_e_Tecnologias.md: versão do MySQL (traço sublinhado em "Ambiente").
- Pedir para OUTRA pessoa da equipe clonar e seguir o README do zero (critério da T14).

## 5. Atualizar o Backlog com a verdade
Em `docs/Backlog.md`, trocar "Em progresso" por "Completo" só nas tarefas cujos critérios vocês conferiram. T17 só fica Completo depois dos testes e da tag. Confirmar também os responsáveis de T14 a T17.

## 6. Criar a tag da entrega (por último, depois do commit final)
```
git tag entrega-20-10-2026
git push origin entrega-20-10-2026
```
Se mexer no código depois da tag, recrie a tag apontando para o commit final.

## 7. Conferir o acesso da professora
Repositório público, ou professora adicionada como colaboradora. Abra o link numa aba anônima para confirmar.

## 8. Divisão do trabalho (o manual exige contribuição identificável de cada um)
No histórico do GitHub só aparecem Jean e Kauã. Mateus e João precisam fazer pelo menos um commit próprio (uma correção, um teste, um item do backlog) com o usuário deles. Cada um precisa conseguir explicar a sua parte na apresentação: leiam o código da sua tarefa (T14/T15 Mateus, T02 Kauã, T16 Jean, T03 João) antes de apresentar.

## 9. Ensaiar a demonstração (Passo 10 do manual)
Sequência sugerida: problema e recorte → o que mudou desde o 1º bimestre → arquitetura (diagrama) → backlog → publicar uma vaga válida → tentar publicar sem prazo e sem área (mostrar RN01 e RN03) → listagem e filtros → fechar e abrir a aplicação (persistência) → testes e pendências até 06/11.
Teste no computador que será usado e deixe o banco já com os dados de teste.
