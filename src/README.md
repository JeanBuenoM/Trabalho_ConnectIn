# Código-fonte

A implementação está começando. O recorte da entrega de 20/10 é publicar e consultar vagas (ver `docs/MVP.md`).

## Organização prevista

- Backend (Java/Spring): pacotes por camada, seguindo as entidades do `banco-de-dados/schema.sql`
  - `controller`: recebe as requisições da interface
  - `service`: regras de negócio (RN01 a RN05)
  - `repository`: acesso ao banco
  - `model`: classes das entidades
- Frontend (HTML/CSS/JS): em `src/main/resources/static`, uma página por tela, espelhando os protótipos de `prototipos/`
- Configuração: `src/main/resources/application-example.properties` (sem senha). O arquivo `application.properties` com a senha real fica fora do GitHub.
- Testes automatizados, se a equipe fizer: `src/test/java`

Os testes manuais documentados ficam em `docs/Casos_de_Teste.md`.
