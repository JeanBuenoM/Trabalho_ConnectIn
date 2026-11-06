# ConectIn

**Plataforma de oportunidades acadêmicas e profissionais.**

O ConectIn conecta estudantes e profissionais a empresas e instituições de ensino por meio de uma plataforma para divulgação de oportunidades, busca de vagas, envio de currículos e acompanhamento de candidaturas.

## Funcionalidades

- Cadastro e autenticação de candidatos e empregadores.
- Consulta pública de oportunidades de emprego, estágio e projetos acadêmicos.
- Pesquisa de vagas por texto, tipo, modalidade e área de atuação.
- Perfis de candidatos com formação, habilidades e informações profissionais.
- Envio e gerenciamento de currículo em PDF.
- Candidaturas e acompanhamento de seus status.
- Recomendações de vagas de acordo com a área de interesse e as habilidades do candidato.
- Área de empresas para publicação e gerenciamento de vagas.
- Consulta e avaliação das candidaturas recebidas.
- Notificações internas relacionadas a vagas e candidaturas.

## Tecnologias

| Componente | Tecnologias |
|---|---|
| Backend | Java 21, Spring Boot 3.3.5 e Maven |
| Frontend | React 19, TypeScript, Vite 8 e Tailwind CSS 4 |
| API | Spring Web / REST |
| Banco de dados | MySQL 8 e `JdbcTemplate` |
| Migrações | Flyway |
| Segurança | Spring Security, JWT e BCrypt |

## Estrutura do repositório

```text
Trabalho_ConnectIn/
├── ConectIn_app_v0.4/       # Aplicação web: backend e frontend
│   ├── frontend/            # Interface React
│   ├── src/main/java/       # Código Java
│   ├── src/main/resources/  # Configuração, migrações e recursos estáticos
│   └── pom.xml              # Configuração Maven
├── banco-de-dados/          # Materiais relacionados ao banco de dados
├── diagramas/               # Diagramas do projeto
├── docs/                    # Documentação
└── prototipos/               # Materiais de prototipação
```

## Requisitos para execução

- JDK 21;
- Maven 3.9 ou superior;
- MySQL 8;
- Node.js e npm;
- Git.

## Executar localmente

Os comandos Maven devem ser executados dentro de `ConectIn_app_v0.4/`, onde está o `pom.xml`.

1. Clone o repositório e entre na pasta da aplicação:

   ```powershell
   git clone https://github.com/JeanBuenoM/Trabalho_ConnectIn.git
   cd Trabalho_ConnectIn\ConectIn_app_v0.4
   ```

2. Crie `src/main/resources/application.properties` com os dados locais do MySQL e a configuração JWT. O modelo está em [`docs/Guia_de_Execucao.md`](docs/Guia_de_Execucao.md).
3. Compile a interface:

   ```powershell
   cd frontend
   npm.cmd install
   npm.cmd run build
   cd ..
   ```

4. Gere o JAR:

   ```powershell
   mvn clean package -DskipTests
   ```

5. Inicie a aplicação:

   ```powershell
   java -jar target\conectin-0.2.0.jar
   ```

6. Acesse `http://localhost:8080`.

O comando Maven acima utiliza `-DskipTests`, portanto não executa os testes automatizados. Consulte [`docs/Plano_de_Testes.md`](docs/Plano_de_Testes.md) para os cenários de validação funcional.

## Documentação

- [Arquitetura e tecnologias](docs/Arquitetura_e_Tecnologias.md)
- [MVP e escopo funcional](docs/MVP.md)
- [Funcionalidades do sistema](docs/Funcionalidades_do_Sistema.md)
- [Regras de negócio](docs/Regras_de_Negocio.md)
- [Rotas da API REST](docs/Rotas_da_API.md)
- [Guia de execução local](docs/Guia_de_Execucao.md)
- [Plano de testes](docs/Plano_de_Testes.md)

## Configuração e segurança

As credenciais do banco, o segredo JWT e outras configurações locais devem permanecer no arquivo `application.properties`, que não deve ser enviado ao repositório. Utilize dados fictícios durante desenvolvimento e testes. Não versione senhas, tokens, currículos, imagens ou arquivos da pasta de uploads.
