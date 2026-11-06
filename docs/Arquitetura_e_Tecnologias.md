# Arquitetura e Tecnologias

## 1. Visão geral

O ConectIn utiliza uma arquitetura web cliente-servidor. A interface React é executada no navegador e se comunica por HTTP com uma API REST desenvolvida em Spring Boot. O backend concentra as regras de negócio, a autenticação, a autorização e o acesso aos dados persistidos no MySQL.

```text
NAVEGADOR
   │
   ▼
FRONTEND — React 19 + TypeScript + Vite + Tailwind CSS
   │  HTTP / JSON / multipart-form-data
   ▼
BACKEND — Java 21 + Spring Boot 3.3.5
   ├── Controllers REST
   ├── Services — regras de negócio
   ├── Repositories — acesso a dados com JdbcTemplate
   ├── Spring Security — autenticação e autorização JWT
   ├── Flyway — migrações do banco
   └── Armazenamento local de arquivos
   │
   ▼
MYSQL 8
```

A interface pode ser compilada pelo Vite. O resultado do build é colocado em `src/main/resources/static`, de onde a aplicação Spring Boot pode servir os recursos estáticos. Durante o desenvolvimento do frontend, o Vite disponibiliza o servidor local em `http://localhost:5173`.

## 2. Backend

| Item | Tecnologia ou configuração |
|---|---|
| Linguagem | Java 21 |
| Framework | Spring Boot 3.3.5 |
| Build | Maven |
| Artefato | `com.conectin:conectin:0.2.0` |
| API HTTP | Spring Web |
| Persistência | Spring JDBC e `JdbcTemplate` |
| Banco | MySQL Connector/J |
| Migrações | Flyway Core e Flyway MySQL |
| Segurança | Spring Security e OAuth2 Resource Server com JWT |
| Hash de senhas | BCrypt |

O código Java está organizado em pacotes que separam responsabilidades, incluindo `controller`, `service`, `repository`, `model`, `seguranca`, `config`, `erro` e `util`.

O fluxo de uma operação normalmente segue esta sequência:

1. Um controller recebe a requisição HTTP e obtém os parâmetros ou o corpo enviado pelo cliente.
2. O service executa as validações e aplica as regras do domínio.
3. Um repository realiza a consulta ou alteração no banco por meio do JDBC.
4. O controller devolve o resultado no formato definido pelo modelo de resposta.

## 3. Frontend

O frontend está em `frontend/` e utiliza:

- React 19 e React DOM;
- TypeScript 5.7;
- Vite 8;
- Tailwind CSS 4;
- plugin React para Vite.

Os comandos disponíveis no `package.json` são:

| Comando | Finalidade |
|---|---|
| `npm run dev` | Iniciar o servidor de desenvolvimento |
| `npm run build` | Compilar a interface |
| `npm run preview` | Visualizar localmente o build gerado |

## 4. Banco de dados e persistência

O sistema utiliza MySQL 8. O acesso aos dados é implementado com `JdbcTemplate` e transações do Spring.

As alterações estruturais do banco são gerenciadas pelo Flyway. Os scripts de migração ficam em `src/main/resources/db/migration` e são aplicados durante a inicialização da aplicação, de acordo com a configuração local.

A configuração JDBC documentada utiliza o banco `conectin` em `localhost:3306`. O parâmetro `createDatabaseIfNotExist=true` permite a criação do banco quando o servidor MySQL e o usuário configurado possuem as permissões necessárias.

## 5. Autenticação e autorização

A API utiliza tokens JWT e política de sessão stateless. O token identifica a conta autenticada e contém o papel utilizado para autorização das rotas.

| Área | Permissão |
|---|---|
| Cadastro e login | Público |
| Consulta de vagas, detalhes, áreas e estatísticas | Público |
| `/api/candidato/**` | Papel `CANDIDATO` |
| `/api/empresa/**` | Papel `EMPREGADOR` |
| Demais rotas `/api/**` | Exigem autenticação |

As senhas são armazenadas usando BCrypt. A configuração JWT é feita por `conectin.jwt.segredo` e `conectin.jwt.validade-horas`. O segredo deve ser forte, privado e possuir pelo menos 32 caracteres.

A API utiliza `401 Unauthorized` para requisições sem autenticação válida e `403 Forbidden` para contas autenticadas sem a permissão necessária.

## 6. Armazenamento de arquivos

O serviço `ArmazenamentoService` mantém arquivos no sistema de arquivos local, dentro da pasta configurada por `conectin.uploads.pasta` (por padrão, `uploads`).

Os tipos tratados pelo serviço são:

- Currículos em PDF;
- Imagens JPG e PNG utilizadas pelos fluxos que solicitam imagens.

O serviço limita arquivos a 5 MB, verifica a assinatura do conteúdo para confirmar o formato e gera nomes internos aleatórios. Os caminhos são normalizados para impedir que uma referência de arquivo saia do diretório de armazenamento configurado.

O `application.properties` de referência também configura o limite de requisição multipart em 6 MB.

## 7. Configuração da aplicação

O arquivo local `src/main/resources/application.properties` reúne as propriedades de execução, incluindo:

- `spring.datasource.url`;
- `spring.datasource.username`;
- `spring.datasource.password`;
- `conectin.jwt.segredo`;
- `conectin.jwt.validade-horas`;
- `conectin.uploads.pasta`.

O backend utiliza a porta `8080` por padrão. O frontend em modo de desenvolvimento utiliza a porta `5173`.

## 8. Execução e implantação

O procedimento de execução documentado é local: MySQL, backend Spring Boot e frontend React compilado. O armazenamento de arquivos também é local ao servidor. Para uma implantação distribuída, é necessário definir infraestrutura para persistência compartilhada dos arquivos, gestão de segredos, backups, monitoramento e demais requisitos operacionais.
