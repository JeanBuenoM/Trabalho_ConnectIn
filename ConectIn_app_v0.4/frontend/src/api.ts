export type TipoUsuario = "candidato" | "empregador";
export type TipoVaga = "emprego" | "estagio" | "projeto_academico";
export type Modalidade = "presencial" | "hibrido" | "remoto";
export type StatusCandidatura = "analise" | "aprovado" | "reprovado";
export type StatusFormacao = "cursando" | "concluido" | "trancado";
export type TipoInstituicao = "empresa" | "instituicao_ensino";

export type Usuario = { id: number; nome: string; email: string; tipo: TipoUsuario; telefone: string | null; temFoto: boolean };
export type AuthResposta = { token: string; usuario: Usuario };
export type Area = { id: number; nome: string };
export type Pagina<T> = { itens: T[]; total: number; pagina: number; tamanho: number };

export type VagaResumo = {
  id: number; titulo: string; descricao: string; requisitos: string | null; tipo: TipoVaga; modalidade: Modalidade;
  prazoInscricao: string; dataPublicacao: string | null; idEmpresa: number; empresa: string; areas: string[];
};

export type VagaDetalhe = {
  id: number; titulo: string; descricao: string; requisitos: string | null; tipo: TipoVaga; modalidade: Modalidade;
  prazoInscricao: string; dataPublicacao: string | null; status: "aberta" | "encerrada"; inscricoesAbertas: boolean;
  idEmpresa: number; empresa: string; tipoInstituicao: TipoInstituicao; descricaoEmpresa: string | null; areas: Area[];
  idCandidatura: number | null; statusCandidatura: StatusCandidatura | null;
};

export type VagaEmpresa = {
  id: number; titulo: string; tipo: TipoVaga; modalidade: Modalidade; prazoInscricao: string; dataPublicacao: string | null;
  status: "aberta" | "encerrada"; inscricoesAbertas: boolean; areas: string[]; candidaturas: number; emAnalise: number;
};

export type VagaFormulario = {
  titulo: string; descricao: string; requisitos: string; tipo: string; modalidade: string; prazoInscricao: string; areas: number[];
};

export type Curriculo = { nomeArquivo: string; tamanhoBytes: number; atualizadoEm: string | null };

export type PerfilCandidato = {
  id: number; nome: string; email: string; telefone: string | null; curso: string | null; instituicao: string | null;
  statusFormacao: StatusFormacao | null; anoConclusao: number | null; areaInteresse: string | null; sobre: string | null;
  semExperiencia: boolean; habilidades: string[]; curriculo: Curriculo | null; temFoto: boolean; completude: number;
};

export type PerfilCandidatoFormulario = {
  nome: string; email: string; telefone: string; curso: string; instituicao: string; statusFormacao: string;
  anoConclusao: string; areaInteresse: string; sobre: string; semExperiencia: boolean; habilidades: string[];
};

export type CandidaturaDoCandidato = {
  id: number; idVaga: number; titulo: string; idEmpresa: number; empresa: string; tipo: TipoVaga;
  dataCandidatura: string; status: StatusCandidatura;
};

export type CandidaturaRecebida = {
  id: number; idVaga: number; tituloVaga: string; idCandidato: number; nome: string; curso: string | null;
  instituicao: string | null; habilidades: string[]; semExperiencia: boolean; temCurriculo: boolean; temFoto: boolean;
  status: StatusCandidatura; dataCandidatura: string;
};

export type CandidaturaDetalhe = {
  id: number; status: StatusCandidatura; dataCandidatura: string; idVaga: number; tituloVaga: string; tipoVaga: TipoVaga;
  candidato: PerfilCandidato;
};

export type PerfilEmpresa = {
  id: number; nome: string; email: string; telefone: string | null; cnpjOuCodigo: string; tipoInstituicao: TipoInstituicao;
  descricao: string | null; temFoto: boolean;
};

export type PerfilEmpresaFormulario = {
  nome: string; email: string; telefone: string; cnpjOuCodigo: string; tipoInstituicao: string; descricao: string;
};

export type PainelEmpresa = {
  vagasPublicadas: number; vagasAbertas: number; vagasNoMes: number; totalCandidaturas: number;
  candidaturasNaSemana: number; aprovados: number; recentes: VagaEmpresa[];
};

export type Notificacao = {
  id: number; tipo: "nova_vaga" | "status_candidatura" | "nova_candidatura"; mensagem: string; dataEnvio: string;
  lida: boolean; idReferencia: number | null;
};

export type Estatisticas = { vagasAbertas: number; candidatos: number; empresas: number };

export type CadastroFormulario = {
  tipo: TipoUsuario; nome: string; email: string; senha: string; cnpjOuCodigo?: string; tipoInstituicao?: string;
};

export type FiltrosVagas = {
  busca?: string; tipo?: string; modalidade?: string; area?: string; ordem?: string; pagina?: number; tamanho?: number;
};

// token do login: localStorage se "lembrar de mim", senao sessionStorage
const CHAVE_TOKEN = "conectin.token";

export const tokenAtual = () => localStorage.getItem(CHAVE_TOKEN) ?? sessionStorage.getItem(CHAVE_TOKEN);

export function salvarToken(token: string, lembrar: boolean) {
  limparToken();
  (lembrar ? localStorage : sessionStorage).setItem(CHAVE_TOKEN, token);
}

export function limparToken() {
  localStorage.removeItem(CHAVE_TOKEN);
  sessionStorage.removeItem(CHAVE_TOKEN);
}

let aoExpirarSessao: (() => void) | null = null;
export const quandoSessaoExpirar = (funcao: () => void) => (aoExpirarSessao = funcao);

export class ErroApi extends Error {
  constructor(public status: number, mensagem: string, public erros: Record<string, string> = {}, public codigo?: string) {
    super(mensagem);
  }
}

function mensagemPadrao(status: number) {
  if (status === 404) return "Não encontramos o que você procurou.";
  if (status === 403) return "Esta ação não está disponível para o seu tipo de conta.";
  if (status === 401) return "Faça login para continuar.";
  if (status === 413) return "O arquivo pode ter no máximo 5 MB.";
  return "Algo deu errado no servidor. Tente de novo em instantes.";
}

async function requisicao<T>(metodo: string, caminho: string, corpo?: unknown, comoArquivo = false): Promise<T> {
  const token = tokenAtual();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  let body: BodyInit | undefined;
  if (corpo instanceof FormData) body = corpo;
  else if (corpo !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(corpo);
  }

  let resposta: Response;
  try {
    resposta = await fetch(caminho, { method: metodo, headers, body });
  } catch {
    throw new ErroApi(0, "Não foi possível falar com o servidor. Verifique sua conexão e se o backend está rodando.");
  }

  if (resposta.status === 401 && token) {
    limparToken();
    aoExpirarSessao?.();
    // rota publica: tenta de novo sem o token vencido
    if (metodo === "GET" && /^\/api\/(vagas|areas|estatisticas)/.test(caminho)) return requisicao<T>(metodo, caminho, corpo, comoArquivo);
  }

  if (!resposta.ok) {
    const dados = await resposta.json().catch(() => ({}));
    throw new ErroApi(resposta.status, dados.mensagem ?? mensagemPadrao(resposta.status), dados.erros ?? {}, dados.codigo);
  }
  if (comoArquivo) return (await resposta.blob()) as T;
  const texto = await resposta.text();
  return (texto ? JSON.parse(texto) : undefined) as T;
}

export function consulta(parametros: Record<string, string | number | undefined | null>) {
  const busca = new URLSearchParams();
  for (const [chave, valor] of Object.entries(parametros)) {
    if (valor !== undefined && valor !== null && valor !== "") busca.set(chave, String(valor));
  }
  return busca.toString() ? `?${busca}` : "";
}

function comArquivo(arquivo: File) {
  const dados = new FormData();
  dados.append("arquivo", arquivo);
  return dados;
}

const get = <T>(caminho: string) => requisicao<T>("GET", caminho);
const arquivo = (caminho: string) => requisicao<Blob>("GET", caminho, undefined, true);

export const api = {
  entrar: (email: string, senha: string) => requisicao<AuthResposta>("POST", "/api/auth/login", { email, senha }),
  cadastrar: (dados: CadastroFormulario) => requisicao<AuthResposta>("POST", "/api/auth/cadastro", dados),
  eu: () => get<Usuario>("/api/auth/eu"),

  areas: () => get<Area[]>("/api/areas"),
  estatisticas: () => get<Estatisticas>("/api/estatisticas"),
  vagas: (filtros: FiltrosVagas = {}) => get<Pagina<VagaResumo>>("/api/vagas" + consulta(filtros)),
  vaga: (id: number) => get<VagaDetalhe>(`/api/vagas/${id}`),

  perfilCandidato: () => get<PerfilCandidato>("/api/candidato/perfil"),
  salvarPerfilCandidato: (dados: PerfilCandidatoFormulario) => requisicao<PerfilCandidato>("PUT", "/api/candidato/perfil", dados),
  enviarCurriculo: (a: File) => requisicao<Curriculo>("POST", "/api/candidato/curriculo", comArquivo(a)),
  removerCurriculo: () => requisicao<void>("DELETE", "/api/candidato/curriculo"),
  meuCurriculo: () => arquivo("/api/candidato/curriculo"),
  minhasCandidaturas: () => get<CandidaturaDoCandidato[]>("/api/candidato/candidaturas"),
  candidatar: (idVaga: number, semExperiencia: boolean) =>
    requisicao<CandidaturaDoCandidato>("POST", "/api/candidato/candidaturas", { idVaga, semExperiencia }),
  recomendadas: (limite = 3) => get<VagaResumo[]>(`/api/candidato/vagas-recomendadas?limite=${limite}`),

  notificacoes: () => get<Notificacao[]>("/api/notificacoes"),
  naoLidas: () => get<{ total: number }>("/api/notificacoes/nao-lidas"),
  marcarLida: (id: number) => requisicao<void>("POST", `/api/notificacoes/${id}/lida`),
  marcarTodasLidas: () => requisicao<void>("POST", "/api/notificacoes/marcar-todas"),
  enviarFoto: (a: File) => requisicao<void>("POST", "/api/usuario/foto", comArquivo(a)),
  removerFoto: () => requisicao<void>("DELETE", "/api/usuario/foto"),
  foto: (idUsuario: number) => arquivo(`/api/usuarios/${idUsuario}/foto`),

  painelEmpresa: () => get<PainelEmpresa>("/api/empresa/painel"),
  perfilEmpresa: () => get<PerfilEmpresa>("/api/empresa/perfil"),
  salvarPerfilEmpresa: (dados: PerfilEmpresaFormulario) => requisicao<PerfilEmpresa>("PUT", "/api/empresa/perfil", dados),
  minhasVagas: () => get<VagaEmpresa[]>("/api/empresa/vagas"),
  publicarVaga: (dados: VagaFormulario) => requisicao<{ id: number; mensagem: string }>("POST", "/api/empresa/vagas", dados),
  vagaDaEmpresa: (id: number) => get<VagaDetalhe>(`/api/empresa/vagas/${id}`),
  editarVaga: (id: number, dados: VagaFormulario) => requisicao<VagaDetalhe>("PUT", `/api/empresa/vagas/${id}`, dados),
  encerrarVaga: (id: number) => requisicao<VagaDetalhe>("POST", `/api/empresa/vagas/${id}/encerrar`),
  reabrirVaga: (id: number) => requisicao<VagaDetalhe>("POST", `/api/empresa/vagas/${id}/reabrir`),
  removerVaga: (id: number) => requisicao<void>("DELETE", `/api/empresa/vagas/${id}`),
  candidaturasRecebidas: (filtros: { vaga?: string; status?: string } = {}) =>
    get<CandidaturaRecebida[]>("/api/empresa/candidaturas" + consulta(filtros)),
  candidaturaRecebida: (id: number) => get<CandidaturaDetalhe>(`/api/empresa/candidaturas/${id}`),
  curriculoDaCandidatura: (id: number) => arquivo(`/api/empresa/candidaturas/${id}/curriculo`),
  avaliarCandidatura: (id: number, status: StatusCandidatura) =>
    requisicao<CandidaturaDetalhe>("PUT", `/api/empresa/candidaturas/${id}/status`, { status }),
};

// o PDF precisa do token, entao baixa como blob e abre numa aba nova
export async function abrirArquivo(baixar: () => Promise<Blob>) {
  const aba = window.open("", "_blank");
  try {
    const endereco = URL.createObjectURL(await baixar());
    if (aba) aba.location.href = endereco;
    else window.location.href = endereco;
    setTimeout(() => URL.revokeObjectURL(endereco), 60_000);
  } catch (erro) {
    aba?.close();
    throw erro;
  }
}
