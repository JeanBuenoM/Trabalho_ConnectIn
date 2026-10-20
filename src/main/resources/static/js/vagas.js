// Tela de listagem de vagas abertas (RF04), com filtros por tipo, área e modalidade.

const ROTULOS_TIPO = { emprego: 'Emprego', estagio: 'Estágio', projeto_academico: 'Projeto acadêmico' };
const ROTULOS_MODALIDADE = { presencial: 'Presencial', hibrido: 'Híbrido', remoto: 'Remoto' };

const formFiltros = document.getElementById('form-filtros');
const selectTipo = document.getElementById('filtro-tipo');
const selectArea = document.getElementById('filtro-area');
const selectModalidade = document.getElementById('filtro-modalidade');
const caixaMensagem = document.getElementById('mensagem');
const listaVagas = document.getElementById('lista-vagas');

function mostrarMensagem(texto, classe) {
  caixaMensagem.textContent = texto;
  caixaMensagem.className = 'aviso ' + classe;
  caixaMensagem.hidden = false;
}

function formatarData(textoIso) {
  // textoIso vem como AAAA-MM-DD; montamos a data sem fuso para não "voltar um dia".
  const [ano, mes, dia] = textoIso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function criarElemento(tag, texto, classe) {
  const elemento = document.createElement(tag);
  if (texto !== undefined) elemento.textContent = texto;
  if (classe) elemento.className = classe;
  return elemento;
}

function desenharVaga(vaga) {
  const cartao = criarElemento('article', undefined, 'cartao vaga');
  cartao.append(criarElemento('h2', vaga.titulo));
  cartao.append(criarElemento('p', vaga.empresa, 'empresa'));

  const etiquetas = criarElemento('ul', undefined, 'etiquetas');
  etiquetas.append(criarElemento('li', ROTULOS_TIPO[vaga.tipo] || vaga.tipo));
  etiquetas.append(criarElemento('li', ROTULOS_MODALIDADE[vaga.modalidade] || vaga.modalidade));
  for (const area of vaga.areas) {
    etiquetas.append(criarElemento('li', area));
  }
  cartao.append(etiquetas);

  cartao.append(criarElemento('p', vaga.descricao));
  if (vaga.requisitos) {
    cartao.append(criarElemento('p', 'Requisitos: ' + vaga.requisitos));
  }
  cartao.append(criarElemento('p', 'Inscrições até ' + formatarData(vaga.prazoInscricao), 'prazo'));
  return cartao;
}

async function carregarAreas() {
  try {
    const resposta = await fetch('/api/areas');
    if (!resposta.ok) return;
    for (const area of await resposta.json()) {
      const opcao = document.createElement('option');
      opcao.value = area.id;
      opcao.textContent = area.nome;
      selectArea.append(opcao);
    }
  } catch (e) {
    // Sem as áreas, o filtro por área fica só com "Todas"; a listagem continua funcionando.
  }
}

async function carregarVagas() {
  caixaMensagem.hidden = true;
  listaVagas.textContent = '';

  const parametros = new URLSearchParams();
  if (selectTipo.value) parametros.set('tipo', selectTipo.value);
  if (selectArea.value) parametros.set('area', selectArea.value);
  if (selectModalidade.value) parametros.set('modalidade', selectModalidade.value);
  const consulta = parametros.toString();

  try {
    const resposta = await fetch('/api/vagas' + (consulta ? '?' + consulta : ''));
    if (!resposta.ok) throw new Error('Falha ao consultar');
    const vagas = await resposta.json();

    if (vagas.length === 0) {
      mostrarMensagem('Nenhuma vaga encontrada.', 'info');
      return;
    }
    for (const vaga of vagas) {
      listaVagas.append(desenharVaga(vaga));
    }
  } catch (e) {
    mostrarMensagem('Não foi possível carregar as vagas. Confira se a aplicação e o banco estão rodando.', 'erro-geral');
  }
}

formFiltros.addEventListener('submit', (evento) => {
  evento.preventDefault();
  carregarVagas();
});

document.getElementById('limpar-filtros').addEventListener('click', () => {
  selectTipo.value = '';
  selectArea.value = '';
  selectModalidade.value = '';
  carregarVagas();
});

carregarAreas().then(carregarVagas);
