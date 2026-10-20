# Código-fonte

Implementação do recorte da entrega de 20/10: publicar e consultar vagas (ver `docs/MVP.md`). Como rodar: seção "Como executar" do `README.md` da raiz.

## Organização

- Backend (Java/Spring), pacote base `com.conectin`, em `src/main/java`:
  - `ConectinApplication`: ponto de entrada
  - `controller`: recebe as requisições da interface (`VagaController`: `POST /api/vagas`, `GET /api/vagas`, `GET /api/areas`)
  - `service`: regras de negócio (`VagaService`: RN01, RN03 e campos obrigatórios)
  - `repository`: acesso ao banco com `JdbcTemplate` (`VagaRepository`, `AreaRepository`)
  - `model`: objetos trocados entre as camadas
  - `erro`: validação e conversão dos erros em respostas JSON que a tela mostra
- Frontend (HTML/CSS/JS) em `src/main/resources/static`: `index.html`, `publicar-vaga.html`, `vagas.html`, `css/estilo.css` e `js/`
- Configuração: `src/main/resources/application-example.properties` (sem senha). O `application.properties` com a senha real fica fora do GitHub.
- Testes automatizados (`src/test/java`): ainda não existem. Os testes manuais estão em `docs/Casos_de_Teste.md`.

## Como as requisições funcionam

- `POST /api/vagas` recebe JSON com `titulo`, `descricao`, `requisitos`, `tipo`, `modalidade`, `prazoInscricao` (AAAA-MM-DD) e `areas` (lista de ids). Responde `201` quando salva e `400` com uma mensagem por campo quando recusa.
- `GET /api/vagas` lista só vagas abertas; aceita `tipo`, `modalidade` e `area` (id) como filtros opcionais.
- `GET /api/areas` lista as áreas de atuação.
