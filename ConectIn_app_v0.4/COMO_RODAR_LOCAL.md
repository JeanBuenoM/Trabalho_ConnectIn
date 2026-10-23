# ConectIn

Plataforma de oportunidades acadêmicas e profissionais (vagas, estágios e projetos).
Backend em Spring Boot (Java 21) + MySQL, frontend em React.

## Requisitos

- Java 21 (JDK)
- Maven 3.9+
- MySQL 8 ligado
- Node.js (necessário para compilar a interface)

## O que não vem no repositório

O repositório tem só o código-fonte. Estas coisas não vêm e precisam ser criadas em cada PC (passos abaixo):

- `src/main/resources/application.properties` (tem a senha do banco, por isso não vai para o GitHub)
- `frontend/node_modules` e `src/main/resources/static` (a interface compilada)
- `target/` (o `.jar` do sistema)

Por isso, depois de baixar o projeto, o `java -jar` só funciona depois dos passos 1 a 4.

## Como rodar (primeira vez)

Todos os comandos são no PowerShell, dentro da pasta do projeto (a que tem o `pom.xml`).

**1. Configurar Java e Maven** (toda vez que abrir um PowerShell novo; ajuste os caminhos para os do seu PC):

```
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot"; $env:Path = "$env:JAVA_HOME\bin;$env:USERPROFILE\apache-maven\apache-maven-3.9.9\bin;" + $env:Path
```

**2. Criar o `src/main/resources/application.properties`** com este conteúdo, trocando `SUA_SENHA` pela senha do seu MySQL:

```
spring.application.name=conectin
server.port=8080

spring.datasource.url=jdbc:mysql://localhost:3306/conectin?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Sao_Paulo&characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=SUA_SENHA

spring.flyway.baseline-on-migrate=true
spring.flyway.baseline-version=3

spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=6MB
server.tomcat.max-swallow-size=20MB

conectin.jwt.segredo=troque-por-um-texto-longo-e-aleatorio-com-mais-de-32-letras
conectin.jwt.validade-horas=168
conectin.uploads.pasta=uploads
```

O banco `conectin` e as tabelas são criados sozinhos na primeira vez que o sistema inicia.

**3. Compilar a interface React:**

```
cd frontend
npm.cmd install
npm.cmd run build
cd ..
```

**4. Gerar o `.jar`:**

```
mvn clean package -DskipTests
```

**5. Rodar:**

```
java -jar target\conectin-0.2.0.jar
```

Quando aparecer `Started ConectinApplication`, abra http://localhost:8080.
Para parar: `Ctrl+C` no terminal.

## Nas próximas vezes

Se não alterou o código, basta o passo 1 e o passo 5.

Se alterou, recompile antes de rodar (passos 3 e 4):

```
cd frontend; npm.cmd run build; cd ..
mvn clean package -DskipTests
```

Para mexer só no visual com atualização na hora: deixe o `java -jar` rodando e, em outro terminal,
rode `npm.cmd run dev` dentro de `frontend` e abra http://localhost:5173.

## Problemas comuns

- **`Unable to access jarfile target\conectin-0.2.0.jar`**: o `.jar` ainda não foi gerado. Faça os passos 3 e 4.
- **`Port 8080 was already in use`**: outra execução está aberta. Feche ou rode em outra porta:
  `java -jar target\conectin-0.2.0.jar --server.port=8081`
- **`mvn`, `java` ou `npm.cmd` não é reconhecido**: faltou o passo 1 ou instalar o Node.js.
- **Erro de conexão com o banco**: confira se o MySQL está ligado e se a senha no `application.properties` está certa.
- **`Could not resolve placeholder 'conectin.jwt.segredo'`**: faltou criar o `application.properties` (passo 2).
