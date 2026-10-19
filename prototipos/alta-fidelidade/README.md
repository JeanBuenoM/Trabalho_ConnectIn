# Protótipo de alta fidelidade — ConectIn

Protótipo navegável das telas (React, Vite e Tailwind). Ele mostra como as telas devem ficar e como o usuário navega entre elas. Não é o sistema: não tem servidor, não tem banco e nada é salvo. Os dados são de exemplo e ficam escritos dentro do código.

Origem: o design veio de um arquivo exportado do Figma Make. Em 18/10/2026 todo o código foi reescrito do zero em arquivos novos, sem aproveitar nenhum arquivo do original. As dependências foram instaladas de novo e o arquivo `pnpm-lock.yaml` foi gerado de novo. O resultado foi comparado com o original em 22 telas, no computador e no celular: 43 das 44 capturas ficaram idênticas, e a outra tem diferença de 1 ponto de cor na borda arredondada de alguns campos.

## Como abrir

Precisa de Node 20.19 ou mais novo (testado com Node 22) e do pnpm.

1. Entrar nesta pasta: `cd prototipos/alta-fidelidade`
2. Instalar: `pnpm install`
3. Iniciar: `pnpm dev`
4. Abrir no navegador: http://localhost:5173

O comando `pnpm build` gera a versão final na pasta `dist`. Em 18/10/2026 o `pnpm install`, o `pnpm dev` e o `pnpm build` foram testados e funcionaram.

## Conexões externas

O protótipo só se conecta a dois endereços, e os dois são opcionais para ele funcionar:
- Google Fonts, para a fonte Inter. Sem internet, o navegador usa outra fonte.
- Unsplash, para a foto da página inicial e do fundo da tela de confirmar candidatura. Sem internet, a foto não aparece.

Não há nenhum outro endereço no código, nem rastreamento, nem envio de dados.

## Telas

Sem login de verdade, a navegação é feita pelos botões. Na tela de entrar, o botão "Acessar demonstração do empregador" abre a área da empresa.

Candidato: página inicial, entrar, criar conta, completar perfil, início, buscar oportunidades, detalhes da vaga, confirmar candidatura, minhas candidaturas, meu perfil, editar perfil e currículo, notificações.

Empresa: início, publicar vaga, minhas vagas, candidatos de uma vaga, perfil de um candidato com os botões de aprovar e reprovar.

As capturas das telas de publicar vaga e de busca estão em `capturas/`.

## O que já está de acordo com os requisitos

- A tela de publicar vaga tem título, tipo, área, modalidade, descrição, requisitos e data de encerramento. A modalidade confirma a mudança feita no banco em 18/10/2026.
- A busca tem filtros por área, tipo e modalidade (RF04).
- A candidatura tem a opção "sem experiência profissional" (RF11).
- O perfil e a edição de perfil têm currículo e habilidades (RF05, RF09).
- Minhas candidaturas mostra os status em análise, aprovado e reprovado (RF08).
- A empresa aprova ou reprova no perfil do candidato (RF07).

## O que não bate com os requisitos ou ainda está errado

O código foi reescrito igual ao original, então esses erros do design continuam aqui.

Tela de publicar vaga e de busca (as que entram em 20/10):
- Os campos Tipo e Modalidade mostram as mesmas opções do campo Área (Tecnologia, Administração, Educação, Cursando, Concluído e Trancado). As opções corretas são emprego, estágio e projeto acadêmico no Tipo, e presencial, híbrido e remoto na Modalidade. É um erro do protótipo.
- O campo Requisitos está marcado como obrigatório, mas no dicionário de dados ele é opcional.
- Só dá para escolher uma área. A regra RN03 pede pelo menos uma, e o banco aceita várias.
- Nenhuma validação funciona. Publicar com tudo vazio não mostra mensagem nenhuma, então a mensagem da RN01 (prazo obrigatório) ainda precisa ser desenhada.
- Não há tela de vaga publicada com sucesso nem de lista vazia.

Itens que aparecem no protótipo mas não existem nos requisitos. Podem ficar como visual, mas não devem ser apresentados como funcionalidade:
- Salvar vaga (ícone de marcador), Configurações, Esqueci minha senha e Lembrar de mim
- "Perfil verificado" no perfil do candidato. O escopo diz que não há verificação nesta versão
- "+2.500 talentos já conectados" e "Seu perfil combina 92%" na página inicial, que são números inventados
- Notificação de "perfil visualizado", que não está no RF10
