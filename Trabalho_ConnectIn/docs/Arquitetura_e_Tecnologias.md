# Arquitetura e Tecnologias — ConectIn

## Tecnologias escolhidas

| Camada/elemento | Tecnologia escolhida | Justificativa |
|---|---|---|
| Interface / Frontend | HTML, CSS e JavaScript | Tecnologias conhecidas pela equipe e adequadas para desenvolver uma interface web responsiva. |
| Servidor / Backend | Java (com Spring) | Linguagem estudada atualmente pela equipe; permite implementar as regras de negócio e o processamento das funcionalidades do sistema. |
| Banco de dados | MySQL | Adequado para armazenar dados estruturados, como usuários, empresas, vagas, currículos e candidaturas. |
| Hospedagem | A definir | Será escolhida posteriormente conforme custo, facilidade de configuração e viabilidade do projeto. |

## Diagrama simples de arquitetura

```
USUÁRIO → INTERFACE (HTML/CSS/JS) → BACKEND/SERVIDOR (Java + Spring) → BANCO DE DADOS (MySQL)
```

O usuário (candidato/estudante ou empregador/empresa) interage com a interface web. A interface se comunica com o backend em Java por meio de requisições HTTP (API). O backend aplica as regras de negócio (RN01–RN05) e acessa o banco de dados MySQL para persistir e consultar as informações de usuários, vagas e candidaturas.

## Relação com os requisitos não funcionais

- **RNF01 (LGPD):** tarefa T11 do backlog — proteção dos dados dos usuários, concentrada no backend.
- **RNF02 (Responsividade):** tarefa T12 do backlog — adaptação da interface para desktop e mobile.
- **RNF03, RNF04, RNF05 (Tempo de resposta, disponibilidade, compatibilidade):** tarefa T13 do backlog — otimização geral do sistema.
