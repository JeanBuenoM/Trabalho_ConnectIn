# Protótipo de alta fidelidade

Esta é a versão original do protótipo, como foi exportada do Figma Make.

Como o resto do protótipo, ela é só a interface: não tem servidor, não tem banco e nada é salvo. Os dados são de exemplo, escritos dentro do código.

## Como abrir

Precisa de Node 20.19 ou mais novo e do pnpm.

1. `cd prototipos/alta-fidelidade-original`
2. `pnpm install`
3. `pnpm dev`
4. Abrir http://localhost:8443 (a porta é diferente da outra versão, que usa a 5173)

`pnpm build` gera a versão final na pasta `dist`.

## Conferência de segurança (20/10/2026)

O código e a configuração foram lidos antes de entrar no repositório:
- O código de `src/` não usa `eval`, `fetch`, armazenamento do navegador, cookies, `innerHTML` nem código ofuscado.
- As únicas conexões externas são o Google Fonts (fonte Inter) e o Unsplash (foto da página inicial).
- O `package.json` tem só React, Vite, Tailwind, TypeScript e ferramentas conhecidas, sem scripts de instalação. O `pnpm-lock.yaml` tem hash de integridade e todos os pacotes vêm do registro oficial do npm.
- A pasta `.figma/make/` tem scripts de shell da plataforma Figma Make (`pnpm install`, `pnpm run dev`, `figma make deploy`). Eles não são executados por `pnpm dev` nem por `pnpm build`. Só o `site.json` dessa pasta é lido pelo `vite.config.ts`.
- `pnpm install --frozen-lockfile` e `pnpm build` foram executados e funcionaram.

Essa conferência é uma leitura do código, não uma garantia absoluta. Rode `pnpm install` normalmente, sem `sudo`.

## Observações

- A pasta `.figma/`, o `CLAUDE.md` e o `AGENTS.md` são arquivos da ferramenta Figma Make e podem ser ignorados.
- O título da página (em `.figma/make/site.json`) está escrito "Conectlin", e a tela inicial do candidato tem o nome "Kauã" fixo no código, como exemplo.
- O `.gitattributes` do zip original (regras do Git LFS) não foi incluído.
