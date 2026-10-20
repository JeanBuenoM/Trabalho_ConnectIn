# Arquitetura e Tecnologias — ConectIn

## Tecnologias e justificativas

Interface
- Tecnologia: HTML, CSS e JavaScript.
- Como as telas são construídas: páginas HTML simples, guardadas em `src/main/resources/static` e servidas pela própria aplicação Spring. O JavaScript (`static/js`) chama o servidor com `fetch` e mostra na tela as mensagens de erro devolvidas por ele. O estilo fica em `static/css/estilo.css`.
- Justificativa: são tecnologias que a equipe já conhece e não exigem uma ferramenta extra para a interface.
- Decisão desta entrega: o protótipo de alta fidelidade (`prototipos/alta-fidelidade/`) usa React, Vite e Tailwind e serve só de modelo visual. As telas do sistema foram feitas em HTML, CSS e JavaScript simples, sem Node nem pnpm para rodar o sistema (ver `Historico_de_Alteracoes.md`, item 6). A equipe pode rever essa decisão até 06/11.

Lógica da aplicação
- Linguagem e framework: Java 21 com Spring Boot 3.3.5 (versão fixada no `pom.xml`), usando `spring-boot-starter-web`.
- Onde ficam as regras de negócio: na camada `service`. Regras como RN01 e RN03 ficam nessa camada, e não na tela, para valer para qualquer entrada.
- Justificativa: é a linguagem que a equipe está estudando e o Spring organiza o código em camadas.

Persistência
- Banco: MySQL, criado pelo script `banco-de-dados/schema.sql`.
- Acesso pelo Java: `JdbcTemplate` do Spring (`spring-boot-starter-jdbc`) com SQL escrito à mão nas classes `repository`. Foi escolhido em vez de JPA porque o SQL fica visível, combina com o `schema.sql` e é mais simples de explicar.
- Justificativa: os dados são bem estruturados (usuários, vagas, candidaturas) e têm relações entre si, o que combina com um banco relacional.

Integrações
- Nenhuma nesta fase. O sistema não usa APIs nem serviços externos.
- O envio de arquivo de currículo (RF05) ainda não está no recorte atual. Quando entrar, o arquivo será guardado em pasta local do servidor e o caminho vai no campo `arquivo_url`.

Hospedagem
- A definir. Nesta fase a aplicação roda apenas na máquina de cada integrante.

Ambiente
- Java 21 (o `pom.xml` exige essa versão)
- Maven 3.9 ou mais novo
- Spring Boot 3.3.5 (baixado pelo Maven)
- MySQL 8 — **a equipe deve escrever aqui a versão exata instalada** (`mysql --version`): ______
- Um navegador atual, como Chrome ou Firefox
- Git

## Diagrama de arquitetura

O diagrama está em [`../diagramas/diagrama-arquitetura.svg`](../diagramas/diagrama-arquitetura.svg). Os componentes são só os que o projeto usa:

```
USUÁRIO → INTERFACE (HTML/CSS/JS) → BACKEND/SERVIDOR (Java + Spring) → BANCO DE DADOS (MySQL)
```

O usuário (candidato ou empregador) usa a interface web. A interface fala com o backend por requisições HTTP. O backend aplica as regras de negócio (RN01 a RN05) e acessa o MySQL para gravar e consultar usuários, vagas e candidaturas. Como a interface é servida pelo próprio Spring, o navegador conversa com um único servidor.

## Organização das pastas

Onde mexer em cada coisa (pacote base `com.conectin`):

- `src/main/java/com/conectin/controller`: recebe as requisições da interface (`VagaController`)
- `src/main/java/com/conectin/service`: regras de negócio (RN01 a RN05); hoje `VagaService`, com RN01 e RN03
- `src/main/java/com/conectin/repository`: acesso ao banco (`VagaRepository`, `AreaRepository`)
- `src/main/java/com/conectin/model`: dados trocados entre as camadas (`VagaRequest`, `VagaResumo`, `AreaAtuacao`)
- `src/main/java/com/conectin/erro`: validação e conversão dos erros em respostas para a tela
- `src/main/resources/static`: telas HTML, CSS e JavaScript
- `src/main/resources/application-example.properties`: exemplo de configuração, sem senha de verdade
- `src/test/java`: testes automatizados (ainda não existem; os testes desta entrega são manuais, em `docs/Casos_de_Teste.md`)
- `banco-de-dados/`: `schema.sql`, `dados-teste.sql` (dados fictícios) e os modelos
- `docs/`: documentação do projeto, incluindo `Casos_de_Teste.md`
- `docs/evidencias/`: capturas de tela dos testes

A senha do banco não vai para o GitHub. Quem for rodar copia `application-example.properties` para `application.properties` e coloca a própria senha. O `application.properties` e a pasta `target/` ficam no `.gitignore`.

## Relação com os requisitos não funcionais

- RNF01 (LGPD): tarefa T11 — proteção dos dados dos usuários, concentrada no backend. A senha já está prevista como hash no banco (`senha_hash`).
- RNF02 (Responsividade): tarefa T12 — adaptação da interface para desktop e mobile.
- RNF03, RNF04 e RNF05 (tempo de resposta, disponibilidade, compatibilidade): tarefa T13 — otimização geral.
