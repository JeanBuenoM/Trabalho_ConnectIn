# O que a equipe precisa fazer antes de entregar (20/10)

## . Rodar de verdade (o código nunca foi executado com MySQL)
Siga o README: criar o banco, copiar o `application.properties`, `mvn spring-boot:run`, abrir http://localhost:8080.

Se der erro, o mais provável é: senha do MySQL errada no `application.properties`, porta 3306 diferente, ou o Maven reclamando da versão do Java (precisa ser 21). Se aparecer algum erro de compilação, me mande o texto completo do erro que eu corrijo.

## . Executar os 11 casos de teste e escrever os resultados (só vocês podem)
Em `docs/Casos_de_Teste.md`, para cada CT01 a CT11:
- Trocar "Observado: (preencher após executar)" pelo que realmente aconteceu.
- Trocar "Situação: Não executado" por Aprovado ou Reprovado, conforme o resultado real.
- No topo: data, quem executou e o commit testado (`git rev-parse --short HEAD`).
- Tirar uma captura de tela de cada teste e salvar em `docs/evidencias/` com o nome do caso (ex.: `CT02-prazo-obrigatorio.png`).
- Se algum falhar, preencher a seção "Defeitos encontrados", corrigir e repetir o teste.
- CT06, CT07 e CT08 mexem direto no banco: use o MySQL Workbench ou `mysql -u root -p conectin`.

## . Preencher o que depende da máquina de vocês
- README.md: linha "Versões usadas pela equipe nos testes" (Java, Maven, MySQL).
- docs/Arquitetura_e_Tecnologias.md: versão do MySQL (traço sublinhado em "Ambiente").
- Pedir para OUTRA pessoa da equipe clonar e seguir o README do zero (critério da T14).

## . Atualizar o Backlog com a verdade
Em `docs/Backlog.md`, trocar "Em progresso" por "Completo" só nas tarefas cujos critérios vocês conferiram. T17 só fica Completo depois dos testes e da tag. Confirmar também os responsáveis de T14 a T17.

## . Criar a tag da entrega (por último, depois do commit final)
```
git tag entrega-20-10-2026
git push origin entrega-20-10-2026
```
Se mexer no código depois da tag, recrie a tag apontando para o commit final.

## . Ensaiar a demonstração (Passo 10 do manual)
Sequência sugerida: problema e recorte → o que mudou desde o 1º bimestre → arquitetura (diagrama) → backlog → publicar uma vaga válida → tentar publicar sem prazo e sem área (mostrar RN01 e RN03) → listagem e filtros → fechar e abrir a aplicação (persistência) → testes e pendências até 06/11.
Teste no computador que será usado e deixe o banco já com os dados de teste.
