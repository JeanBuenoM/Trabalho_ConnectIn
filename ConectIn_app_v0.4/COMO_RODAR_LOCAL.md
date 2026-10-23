**ConectIn**

Plataforma de oportunidades acadêmicas e profissionais (vagas, estágios e projetos). Backend em Spring Boot (Java 21) + MySQL, frontend em React.

**Requisitos**
Java 21 (JDK)
Maven 3.9+
MySQL 8 rodando
Node.js (só se for mexer no frontend)
Banco de dados
O sistema cria as tabelas sozinho ao iniciar. Se preferir criar o banco na mão (por exemplo em outro PC), rode o criar-banco.sql no MySQL Workbench ou pelo terminal:

cmd /c "mysql -u root -p < criar-banco.sql"
A senha do MySQL fica em src\main\resources\application.properties (spring.datasource.password).

Como rodar
1. Configurar Java e Maven no PowerShell (toda vez que abrir uma janela nova):

$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot"; $env:Path = "$env:JAVA_HOME\bin;$env:USERPROFILE\apache-maven\apache-maven-3.9.9\bin;" + $env:Path
2. Entrar na pasta do projeto:

Entrar na pasta ConectLn_2.0 no powershell, cmd ou terminal
3. Rodar:

java -jar target\conectin-0.2.0.jar
Quando aparecer Started ConectinApplication, abra http://localhost:8080. Para parar: Ctrl+C no terminal.

Depois de alterar o código
Recompilar antes de rodar:

cd frontend; npm.cmd run build; cd ..
mvn clean package -DskipTests
Para mexer só no visual com atualização na hora: deixe o java -jar rodando e, em outro terminal, rode npm.cmd run dev dentro de frontend e abra http://localhost:5173.

Problemas comuns
Port 8080 was already in use: outra execução está aberta. Feche ou rode em outra porta: java -jar target\conectin-0.2.0.jar --server.port=8081
mvn ou java não é reconhecido: faltou o passo 1.
Erro de conexão com o banco: confira se o MySQL está ligado e se a senha no application.properties está certa.