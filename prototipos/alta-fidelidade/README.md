# Protótipo de alta fidelidade — versão original (Figma Make)

Esta é a versão original do protótipo, como foi exportada do Figma Make, sem alterações no código. A versão reescrita pela equipe continua em `../alta-fidelidade/`.

Como o resto do protótipo, ela é só a interface: não tem servidor, não tem banco e nada é salvo. Os dados são de exemplo, escritos dentro do código.

## Como abrir

Precisa de Node 20.19 ou mais novo e do pnpm.

1. `cd prototipos/alta-fidelidade-original`
2. `pnpm install`
3. `pnpm dev`
4. Abrir http://localhost:8443 (a porta é diferente da outra versão, que usa a 5173)

`pnpm build` gera a versão final na pasta `dist`.

## Observações

- A pasta `.figma/`, o `CLAUDE.md` e o `AGENTS.md` são arquivos da ferramenta Figma Make e podem ser ignorados.
- O título da página (em `.figma/make/site.json`) está escrito "Conectlin", e a tela inicial do candidato tem o nome "Kauã" fixo no código, como exemplo.
- O `.gitattributes` do zip original (regras do Git LFS) não foi incluído.
