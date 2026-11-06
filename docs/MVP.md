# MVP e Escopo Funcional

## 1. Objetivo

O MVP do ConectIn oferece um ambiente único para que candidatos encontrem oportunidades acadêmicas e profissionais e para que empresas e instituições de ensino publiquem vagas e acompanhem as inscrições recebidas.

O sistema contempla três tipos de oportunidade: emprego, estágio e projeto acadêmico.

## 2. Perfis de usuário

### Candidato

Pessoa que utiliza a plataforma para construir seu perfil, consultar oportunidades, registrar currículo e acompanhar suas candidaturas. O perfil contempla estudantes e profissionais.

### Empregador

Empresa ou instituição de ensino que utiliza a plataforma para manter seus dados institucionais, publicar oportunidades e administrar candidaturas.

## 3. Funcionalidades do MVP

### 3.1 Conta e autenticação

- Cadastro de conta como candidato ou empregador.
- Login com e-mail e senha.
- Emissão e validação de JWT.
- Consulta dos dados da conta autenticada.
- Autorização das áreas de candidato e empregador conforme o papel da conta.

### 3.2 Consulta de oportunidades

- Listagem pública de vagas com inscrições abertas.
- Busca textual.
- Filtros por tipo, modalidade e área de atuação.
- Ordenação e paginação dos resultados.
- Consulta dos detalhes de uma vaga.
- Consulta das áreas de atuação e de estatísticas públicas.

### 3.3 Área do candidato

- Consulta e atualização do perfil.
- Registro de telefone, curso, instituição, situação da formação, ano de conclusão, área de interesse e descrição pessoal.
- Cadastro de habilidades.
- Indicação de ausência de experiência profissional.
- Envio, consulta e remoção de currículo em PDF.
- Candidatura a oportunidades.
- Consulta das próprias candidaturas e dos respectivos status.
- Consulta de vagas recomendadas a partir da área de interesse e das habilidades cadastradas.

### 3.4 Área do empregador

- Consulta e atualização do perfil institucional.
- Painel com indicadores de vagas e candidaturas.
- Listagem das próprias vagas.
- Publicação e edição de vagas.
- Encerramento e reabertura de inscrições.
- Remoção de vagas.
- Consulta das candidaturas recebidas.
- Filtros de candidaturas por vaga, status e texto.
- Consulta dos detalhes da candidatura e do currículo associado.
- Atualização do status de uma candidatura.

### 3.5 Notificações internas

O backend registra notificações relacionadas à publicação de vagas compatíveis, ao recebimento de candidaturas, à alteração de status e à remoção de oportunidades. A API dos controllers consultados não expõe uma rota dedicada para listar ou administrar uma caixa de entrada de notificações.

## 4. Fluxo principal do candidato

1. Criar uma conta do tipo candidato.
2. Entrar na plataforma.
3. Completar o perfil e cadastrar habilidades.
4. Enviar um currículo quando necessário.
5. Consultar e filtrar as oportunidades disponíveis.
6. Abrir os detalhes de uma vaga e realizar a candidatura.
7. Acompanhar o status da inscrição na área do candidato.

## 5. Fluxo principal do empregador

1. Criar uma conta do tipo empregador, informando os dados institucionais.
2. Entrar na plataforma.
3. Completar o perfil da empresa ou instituição.
4. Publicar uma vaga com tipo, modalidade, prazo e áreas de atuação.
5. Consultar as candidaturas recebidas.
6. Analisar o perfil e o currículo dos candidatos.
7. Atualizar o status das candidaturas.

## 6. Regras centrais do escopo

- As vagas possuem tipo, modalidade, prazo de inscrição e pelo menos uma área de atuação.
- As candidaturas só podem ser feitas enquanto as inscrições estiverem abertas.
- Um candidato não pode se candidatar duas vezes à mesma vaga.
- O currículo em PDF é obrigatório para oportunidades do tipo `emprego`.
- O empregador só administra vagas e candidaturas vinculadas à própria conta.
- Os status disponíveis para uma candidatura são `analise`, `aprovado` e `reprovado`.

As validações e os valores aceitos estão descritos em [Regras de Negócio](Regras_de_Negocio.md).

## 7. Escopo técnico

O backend é disponibilizado como API REST em Spring Boot. O frontend é desenvolvido em React e pode ser compilado para ser servido pela própria aplicação. Os dados são persistidos em MySQL e as alterações do esquema são controladas pelo Flyway.

A configuração de execução descrita no projeto é local. O armazenamento de arquivos utiliza o sistema de arquivos do servidor.
