# O que a equipe precisa fazer antes de entregar (20/10)

## . Preencher o que depende da máquina de vocês
- README.md: linha "Versões usadas pela equipe nos testes" (Java, Maven, MySQL).
- docs/Arquitetura_e_Tecnologias.md: versão do MySQL (traço sublinhado em "Ambiente").
- Pedir para OUTRA pessoa da equipe clonar e seguir o README do zero (critério da T14).

## . Criar a tag da entrega (por último, depois do commit final)
```
git tag entrega-20-10-2026
git push origin entrega-20-10-2026
```
Se mexer no código depois da tag, recrie a tag apontando para o commit final.

## . Ensaiar a demonstração (Passo 10 do manual)
Sequência sugerida: problema e recorte → o que mudou desde o 1º bimestre → arquitetura (diagrama) → backlog → publicar uma vaga válida → tentar publicar sem prazo e sem área (mostrar RN01 e RN03) → listagem e filtros → fechar e abrir a aplicação (persistência) → testes e pendências até 06/11.
Teste no computador que será usado e deixe o banco já com os dados de teste.
