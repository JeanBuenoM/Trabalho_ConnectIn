# ConectIn

**Plataforma de oportunidades acadêmicas e profissionais.**

🌐 **Acesse:** [conectin.online](https://conectin.online)

O ConectIn reúne em um só lugar vagas de emprego, estágios e projetos acadêmicos. Candidatos (estudantes e profissionais) buscam oportunidades, montam o perfil, enviam currículo e acompanham suas candidaturas. Empresas e instituições de ensino publicam vagas, analisam os inscritos e aprovam ou reprovam cada candidatura.

Projeto desenvolvido para a disciplina de Imersão Profissional (2026).

## Equipe

- Mateus Cantelle Gomes
- Jean Carlos Bueno
- Kauã Morais
- João Passos

## Problema e objetivo

Hoje as oportunidades para estudantes ficam espalhadas em murais, grupos de mensagens e e-mails, e os currículos chegam às empresas sem padrão. O objetivo do ConectIn é centralizar essas oportunidades em um ambiente simples, que conecte candidatos a empregadores e organize todo o processo, da publicação da vaga até o resultado da candidatura.

## Funcionalidades

**Candidato**

- Cadastro e login (RF01).
- Busca de vagas por palavra-chave, área de atuação, tipo e modalidade, com ordenação e paginação (RF04).
- Perfil com formação, habilidades, área de interesse, foto e currículo em PDF (RF05, RF09).
- Opção "sem experiência profissional" para quem ainda não tem currículo (RF11).
- Candidatura direta às vagas (RF06) e acompanhamento do status: em análise, aprovado ou reprovado (RF08).
- Vagas recomendadas de acordo com a área de interesse e as habilidades.

**Empresa ou instituição de ensino**

- Cadastro e login com CNPJ ou código da instituição (RF02).
- Painel com vagas publicadas, candidatos recebidos e aprovados.
- Publicação, edição, encerramento, reabertura e exclusão de vagas (RF03).
- Lista de candidatos por vaga e por status, perfil completo e download do currículo (RF07).
- Aprovação e reprovação de candidaturas.

**Para todos**

- Página inicial e busca de vagas públicas, sem precisar de conta.
- Notificações dentro do sistema: nova vaga na área de interesse, mudança de status e nova candidatura (RF10).
- Interface adaptada para computador e celular (RNF02).

## Regras de negócio

| Regra | Descrição |
|---|---|
| RN01 | Uma vaga não pode ser publicada sem data de encerramento das inscrições. |
| RN02 | Só é possível se candidatar a vagas com o prazo de inscrição aberto. |
| RN03 | Toda vaga precisa ter pelo menos uma área de atuação. |
| RN04 | O currículo é obrigatório para vagas de emprego. Para estágios e projetos acadêmicos é opcional: o candidato pode indicar que está sem experiência profissional. |
| RN05 | Cada usuário só pode alterar os próprios dados, estando autenticado. |

## Tecnologias

| Componente | Tecnologias |
|---|---|
| Backend | Java 21, Spring Boot 3.3.5 e Maven |
| Frontend | React 19, TypeScript, Vite 8 e Tailwind CSS 4 |
| API | REST com Spring Web |
| Banco de dados | MySQL 8 com `JdbcTemplate` |
| Migrações | Flyway |
| Segurança | Spring Security, JWT e BCrypt |
| Publicação | Docker, Railway e domínio próprio com HTTPS |

A interface React é compilada para dentro do backend, então um único programa Spring Boot entrega as telas e a API no mesmo endereço.

## Estrutura do repositório

```text
Trabalho_ConnectIn/
├── ConectIn_app_v0.4/          # Aplicação web (backend + frontend)
│   ├── frontend/               # Interface React + TypeScript
│   ├── src/main/java/          # Código Java (controllers, services, repositories)
│   ├── src/main/resources/     # Configuração e migrações do banco (db/migration)
│   ├── Dockerfile              # Imagem usada na publicação
│   ├── README.md               # Passo a passo detalhado para rodar a aplicação
│   └── pom.xml                 # Configuração Maven
├── banco-de-dados/             # Modelo conceitual, modelo lógico e schema.sql
├── diagramas/                  # Casos de uso, classes, atividades e arquitetura
├── docs/                       # Requisitos, MVP, arquitetura, backlog e testes
└── prototipos/                 # Protótipos de tela do 1º bimestre
```

## Como rodar localmente

**Requisitos:** JDK 21, Maven 3.9 ou superior, MySQL 8 em execução, Node.js com npm e Git.

Os comandos Maven são executados dentro de `ConectIn_app_v0.4/`, onde está o `pom.xml`.

1. Clone o repositório e entre na pasta da aplicação:

   ```powershell
   git clone https://github.com/JeanBuenoM/Trabalho_ConnectIn.git
   cd Trabalho_ConnectIn\ConectIn_app_v0.4
   ```

2. Crie o arquivo `src/main/resources/application.properties` com a senha do seu MySQL e um segredo JWT. O modelo completo está no [README da aplicação](ConectIn_app_v0.4/README.md). Esse arquivo não vai para o GitHub.

3. Compile a interface:

   ```powershell
   cd frontend
   npm.cmd install
   npm.cmd run build
   cd ..
   ```

4. Gere o `.jar`:

   ```powershell
   mvn clean package -DskipTests
   ```

5. Inicie a aplicação:

   ```powershell
   java -jar target\conectin-0.2.0.jar
   ```

6. Acesse `http://localhost:8080`.

O banco `conectin` e as tabelas são criados automaticamente na primeira execução, pelas migrações do Flyway. O comando Maven acima usa `-DskipTests`, então não executa testes automatizados; os testes funcionais estão em [`docs/Casos_de_Teste.md`](docs/Casos_de_Teste.md).

## Publicação

A versão on-line roda na [Railway](https://railway.com), a partir deste repositório:

- **Root Directory** do serviço: `ConectIn_app_v0.4` (a Railway encontra o `Dockerfile` sozinha).
- O `Dockerfile` compila o React e o Java e inicia o sistema com o perfil `prod`, que usa o arquivo `application-prod.properties`. Esse arquivo não tem nenhuma senha escrita; tudo vem de variáveis de ambiente.
- Variáveis do serviço: `MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER` e `MYSQLPASSWORD` (referências ao serviço MySQL da Railway, no formato `${{MySQL.MYSQLHOST}}`), além de `JWT_SEGREDO` (texto aleatório com mais de 32 caracteres) e `PORT=8080`.
- O domínio `conectin.online` aponta para a Railway por um registro CNAME na Cloudflare.

## Documentação

- [Visão, requisitos e modelagem](docs/Visao_e_Requisitos.md)
- [MVP e escopo funcional](docs/MVP.md)
- [Arquitetura e tecnologias](docs/Arquitetura_e_Tecnologias.md)
- [Backlog](docs/Backlog.md)
- [Casos de teste](docs/Casos_de_Teste.md) e [evidências](docs/evidencias/)
- [Histórico de alterações](docs/Historico_de_Alteracoes.md)

## Configuração e segurança

As credenciais do banco e o segredo JWT ficam apenas no `application.properties` local ou nas variáveis da Railway, nunca no repositório. As senhas dos usuários são guardadas criptografadas com BCrypt. Use dados fictícios durante o desenvolvimento e os testes, e não versione currículos, fotos ou a pasta `uploads/`.
