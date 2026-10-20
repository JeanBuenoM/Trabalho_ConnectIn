# Arquitetura e Tecnologias — ConectIn

## Tecnologias e justificativas

Interface
- Tecnologia: HTML, CSS e JavaScript.
- Como as telas são construídas: páginas HTML simples, guardadas em `src/main/resources/static` e servidas pela própria aplicação Spring. O JavaScript chama o servidor com `fetch` (confirmar).
- Justificativa: são tecnologias que a equipe já conhece e não exigem uma ferramenta extra para a interface.
- Atenção: o protótipo de alta fidelidade (`prototipos/alta-fidelidade/`) usa React, Vite e Tailwind. Ele serve de modelo visual. A equipe precisa decidir se refaz as telas em HTML, CSS e JavaScript simples ou se adota o React na interface (ver `Historico_de_Alteracoes.md`, item 6). Se adotar o React, o build precisa de Node e do pnpm, que entram na lista de ambiente abaixo.

Lógica da aplicação
- Linguagem e framework: Java com Spring Boot (confirmar o uso do Spring Boot).
- Onde ficam as regras de negócio: na camada `service`. Regras como RN01 e RN03 ficam nessa camada, e não na tela, para valer para qualquer entrada.
- Justificativa: é a linguagem que a equipe está estudando e o Spring organiza o código em camadas.

Persistência
- Banco: MySQL, criado pelo script `banco-de-dados/schema.sql`.
- Acesso pelo Java: Spring Data JPA (confirmar).
- Justificativa: os dados são bem estruturados (usuários, vagas, candidaturas) e têm relações entre si, o que combina com um banco relacional.

Integrações
- Nenhuma nesta fase. O sistema não usa APIs nem serviços externos.
- O envio de arquivo de currículo (RF05) ainda não está no recorte atual. Quando entrar, o arquivo será guardado em pasta local do servidor e o caminho vai no campo `arquivo_url`.

Hospedagem
- A definir. Nesta fase a aplicação roda apenas na máquina de cada integrante.

Ambiente
- Java 21 (confirmar versão)
- Maven (confirmar, ou Gradle se a equipe preferir)
- Spring Boot 3.x (confirmar versão)
- MySQL 8 (confirmar versão)
- Um navegador atual, como Chrome ou Firefox
- Git

## Diagrama de arquitetura

O diagrama está em [`../diagramas/diagrama-arquitetura.svg`](../diagramas/diagrama-arquitetura.svg). Os componentes são só os que o projeto usa:

```
USUÁRIO → INTERFACE (HTML/CSS/JS) → BACKEND/SERVIDOR (Java + Spring) → BANCO DE DADOS (MySQL)
```

O usuário (candidato ou empregador) usa a interface web. A interface fala com o backend por requisições HTTP. O backend aplica as regras de negócio (RN01 a RN05) e acessa o MySQL para gravar e consultar usuários, vagas e candidaturas. Como a interface é servida pelo próprio Spring, o navegador conversa com um único servidor.

## Organização das pastas

Onde mexer em cada coisa (confirmar o nome do pacote):

- `src/main/java/.../controller`: recebe as requisições da interface
- `src/main/java/.../service`: regras de negócio (RN01 a RN05)
- `src/main/java/.../repository`: acesso ao banco
- `src/main/java/.../model`: classes das entidades (vaga, usuário, candidatura etc.)
- `src/main/resources/static`: telas HTML, CSS e JavaScript
- `src/main/resources/application-example.properties`: exemplo de configuração, sem senha de verdade
- `src/test/java`: testes automatizados, se a equipe fizer
- `banco-de-dados/`: script `schema.sql`, modelos e dados fictícios de teste
- `docs/`: documentação do projeto, incluindo `Casos_de_Teste.md`
- `docs/evidencias/`: capturas de tela dos testes

A senha do banco não vai para o GitHub. Quem for rodar copia `application-example.properties` para `application.properties` e coloca a própria senha. O `application.properties` e a pasta `target/` ficam no `.gitignore`.

## Relação com os requisitos não funcionais

- RNF01 (LGPD): tarefa T11 — proteção dos dados dos usuários, concentrada no backend. A senha já está prevista como hash no banco (`senha_hash`).
- RNF02 (Responsividade): tarefa T12 — adaptação da interface para desktop e mobile.
- RNF03, RNF04 e RNF05 (tempo de resposta, disponibilidade, compatibilidade): tarefa T13 — otimização geral.
