# 3. Especificação de Casos de Uso

Detalhamento das funcionalidades prioritárias do sistema, no formato ator, objetivo, pré-condições, fluxo principal, fluxos alternativos e pós-condições.

---

## UC01 — Cadastrar-se

**Ator principal:** Candidato ou Empregador

**Objetivo:** Permitir que um novo usuário crie uma conta no sistema, como candidato (estudante/profissional) ou como empregador (empresa/instituição de ensino).

**Pré-condições:** O usuário não possui cadastro prévio com o mesmo e-mail.

**Fluxo principal:**
1. O usuário acessa a tela de cadastro.
2. O usuário seleciona o tipo de perfil: Candidato ou Empregador.
3. O usuário informa os dados obrigatórios (nome, e-mail, senha e, conforme o perfil, dados pessoais/acadêmicos ou dados institucionais).
4. O sistema valida os dados informados.
5. O sistema cria a conta e autentica o usuário automaticamente.

**Fluxos alternativos:**
- **3a. E-mail já cadastrado:** o sistema exibe mensagem de erro e solicita outro e-mail ou recuperação de senha.
- **4a. Dados obrigatórios ausentes ou inválidos:** o sistema destaca os campos pendentes e impede o avanço até a correção.

**Pós-condições:** Usuário cadastrado e autenticado no sistema, com perfil (Candidato ou Empregador) definido.

**Requisitos relacionados:** RF01, RF02.

---

## UC03 — Publicar vaga

**Ator principal:** Empregador

**Objetivo:** Permitir que um empregador publique uma nova oportunidade (emprego, estágio ou projeto acadêmico).

**Pré-condições:** O empregador está autenticado no sistema e possui perfil institucional cadastrado.

**Fluxo principal:**
1. O empregador acessa a opção "Publicar vaga".
2. O empregador preenche título, descrição, requisitos, tipo da vaga (emprego, estágio ou projeto acadêmico) e ao menos uma área de atuação.
3. O empregador informa a data de encerramento das inscrições.
4. O sistema valida se a data de encerramento e a área de atuação foram informadas.
5. O sistema publica a vaga, tornando-a disponível para pesquisa.
6. O sistema notifica candidatos com perfil/habilidades compatíveis.

**Fluxos alternativos:**
- **4a. Data de encerramento não informada:** o sistema bloqueia a publicação e solicita a data (RN01).
- **4b. Nenhuma área de atuação selecionada:** o sistema bloqueia a publicação e solicita ao menos uma área (RN03).

**Pós-condições:** Vaga publicada, visível nas buscas e disponível para candidaturas até o prazo definido.

**Requisitos relacionados:** RF03, RF04, RF10. **Regras de negócio:** RN01, RN03.

---

## UC06 — Candidatar-se a vaga

**Ator principal:** Candidato

**Objetivo:** Permitir que um candidato se inscreva em uma vaga de interesse.

**Pré-condições:** O candidato está autenticado; a vaga está publicada e com inscrições em aberto.

**Fluxo principal:**
1. O candidato pesquisa e visualiza os detalhes de uma vaga (inclui UC05).
2. O candidato seleciona a opção "Candidatar-se".
3. O sistema verifica se o prazo de inscrição está em aberto.
4. O sistema verifica o tipo da vaga:
   - Se for emprego profissional/CLT, o sistema exige currículo cadastrado.
   - Se for estágio ou projeto acadêmico, o currículo é opcional.
5. O sistema registra a candidatura com status "análise".
6. O sistema notifica o empregador sobre a nova inscrição.

**Fluxos alternativos:**
- **3a. Prazo de inscrição encerrado:** o sistema impede a candidatura e informa que as inscrições estão encerradas (RN02).
- **4a. Vaga de emprego/CLT sem currículo cadastrado:** o sistema bloqueia a candidatura e solicita o cadastro do currículo (RN04).
- **4b. Vaga acadêmica sem currículo cadastrado:** o sistema permite que o candidato marque, em seu perfil, que está sem experiência profissional e em busca de uma oportunidade inicial (estende para UC09b), e a candidatura prossegue (RF11).

**Pós-condições:** Candidatura registrada com status "análise"; empregador notificado.

**Requisitos relacionados:** RF04, RF05, RF06, RF08, RF10, RF11. **Regras de negócio:** RN02, RN04.

---

## UC08 — Avaliar inscrições

**Ator principal:** Empregador

**Objetivo:** Permitir que o empregador analise as candidaturas recebidas para uma vaga publicada e atualize seu status.

**Pré-condições:** O empregador está autenticado e possui ao menos uma vaga com candidaturas recebidas.

**Fluxo principal:**
1. O empregador acessa a lista de candidaturas de uma vaga publicada.
2. O empregador visualiza o perfil e/ou currículo de cada candidato (inclui UC12).
3. O empregador seleciona uma candidatura e atualiza seu status para "aprovado" ou "reprovado".
4. O sistema registra a alteração de status.
5. O sistema notifica o candidato sobre a atualização.

**Fluxos alternativos:**
- **2a. Candidato sem currículo cadastrado (oportunidade acadêmica):** o sistema exibe, no lugar do currículo, a indicação de que o candidato está sem experiência profissional e em busca de uma oportunidade inicial (RF11).

**Pós-condições:** Status da candidatura atualizado; candidato notificado.

**Requisitos relacionados:** RF07, RF08, RF10.

---

## UC09 / UC09b — Cadastrar currículo ou indicar sem experiência profissional

**Ator principal:** Candidato

**Objetivo:** Permitir que o candidato registre seu currículo no perfil ou, alternativamente, sinalize que não possui experiência profissional.

**Pré-condições:** O candidato está autenticado.

**Fluxo principal:**
1. O candidato acessa a área de currículo do seu perfil.
2. O candidato anexa/preenche as informações do currículo (experiências, habilidades, formação).
3. O sistema salva o currículo, associando-o ao perfil do candidato.

**Fluxos alternativos:**
- **2a. Candidato sem experiência profissional:** em vez de preencher o currículo, o candidato marca, em campo próprio do perfil, que está sem experiência profissional e em busca de uma oportunidade de início de carreira (UC09b). Essa informação passa a ser exibida no espaço dedicado do perfil, no lugar do currículo.

**Pós-condições:** Currículo cadastrado e vinculado ao perfil, ou indicação de "sem experiência" registrada.

**Requisitos relacionados:** RF05, RF09, RF11. **Regras de negócio:** RN04, RN05.
