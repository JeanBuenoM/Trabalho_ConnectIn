// Tela de publicação de vaga (RF03).
// A validação de verdade fica no servidor (VagaService); aqui só enviamos os dados e mostramos as mensagens.

const form = document.getElementById('form-vaga');
const botao = document.getElementById('botao-publicar');
const caixaMensagem = document.getElementById('mensagem');
const caixaAreas = document.getElementById('opcoes-areas');

const CAMPOS_COM_ERRO = ['titulo', 'tipo', 'modalidade', 'prazoInscricao', 'areas', 'descricao'];

function mostrarMensagem(texto, classe) {
  caixaMensagem.textContent = texto;
  caixaMensagem.className = 'aviso ' + classe;
  caixaMensagem.hidden = false;
}

function limparErros() {
  caixaMensagem.hidden = true;
  for (const campo of CAMPOS_COM_ERRO) {
    const p = document.getElementById('erro-' + campo);
    if (p) p.textContent = '';
    const entrada = document.getElementById(campo);
    if (entrada) entrada.classList.remove('campo-invalido');
  }
}

function mostrarErrosDosCampos(erros) {
  for (const [campo, texto] of Object.entries(erros)) {
    const p = document.getElementById('erro-' + campo);
    if (p) p.textContent = texto;
    const entrada = document.getElementById(campo);
    if (entrada) entrada.classList.add('campo-invalido');
  }
}

async function carregarAreas() {
  try {
    const resposta = await fetch('/api/areas');
    if (!resposta.ok) throw new Error('Falha ao carregar as áreas');
    const areas = await resposta.json();
    caixaAreas.textContent = '';
    if (areas.length === 0) {
      caixaAreas.textContent = 'Nenhuma área cadastrada. Rode banco-de-dados/dados-teste.sql.';
      return;
    }
    for (const area of areas) {
      const rotulo = document.createElement('label');
      const caixa = document.createElement('input');
      caixa.type = 'checkbox';
      caixa.name = 'areas';
      caixa.value = area.id;
      rotulo.append(caixa, ' ' + area.nome);
      caixaAreas.append(rotulo);
    }
  } catch (e) {
    caixaAreas.textContent = 'Não foi possível carregar as áreas de atuação.';
  }
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  limparErros();

  const areasMarcadas = Array.from(form.querySelectorAll('input[name="areas"]:checked'))
    .map((caixa) => Number(caixa.value));

  const dados = {
    titulo: form.titulo.value,
    descricao: form.descricao.value,
    requisitos: form.requisitos.value,
    tipo: form.tipo.value,
    modalidade: form.modalidade.value,
    prazoInscricao: form.prazoInscricao.value,
    areas: areasMarcadas,
  };

  botao.disabled = true;
  try {
    const resposta = await fetch('/api/vagas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    const corpo = await resposta.json().catch(() => ({}));

    if (resposta.status === 201) {
      form.reset();
      mostrarMensagem(corpo.mensagem || 'Vaga publicada com sucesso.', 'sucesso');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (resposta.status === 400) {
      mostrarMensagem(corpo.mensagem || 'A vaga não foi publicada.', 'erro-geral');
      mostrarErrosDosCampos(corpo.erros || {});
    } else {
      mostrarMensagem(corpo.mensagem || 'Erro no servidor. Tente novamente.', 'erro-geral');
    }
  } catch (e) {
    mostrarMensagem('Não foi possível falar com o servidor. Confira se a aplicação está rodando.', 'erro-geral');
  } finally {
    botao.disabled = false;
  }
});

carregarAreas();
