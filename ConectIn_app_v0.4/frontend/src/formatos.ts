import type { StatusCandidatura } from "./api";

type Opcao = { value: string; label: string };

export const TIPOS_VAGA: Opcao[] = [
  { value: "emprego", label: "Emprego" },
  { value: "estagio", label: "Estágio" },
  { value: "projeto_academico", label: "Projeto acadêmico" },
];

export const MODALIDADES: Opcao[] = [
  { value: "presencial", label: "Presencial" },
  { value: "hibrido", label: "Híbrido" },
  { value: "remoto", label: "Remoto" },
];

export const STATUS_FORMACAO: Opcao[] = [
  { value: "cursando", label: "Cursando" },
  { value: "concluido", label: "Concluído" },
  { value: "trancado", label: "Trancado" },
];

export const TIPOS_INSTITUICAO: Opcao[] = [
  { value: "empresa", label: "Empresa" },
  { value: "instituicao_ensino", label: "Instituição de ensino" },
];

export const STATUS_CANDIDATURA = [
  { value: "analise", label: "Em análise", classe: "analysis" },
  { value: "aprovado", label: "Aprovado", classe: "approved" },
  { value: "reprovado", label: "Reprovado", classe: "rejected" },
];

const rotulo = (lista: Opcao[], valor: string | null | undefined) => lista.find((item) => item.value === valor)?.label ?? valor ?? "";

export const rotuloTipo = (tipo: string | null | undefined) => rotulo(TIPOS_VAGA, tipo);
export const rotuloModalidade = (modalidade: string | null | undefined) => rotulo(MODALIDADES, modalidade);
export const rotuloStatusFormacao = (status: string | null | undefined) => rotulo(STATUS_FORMACAO, status);
export const rotuloStatus = (status: StatusCandidatura) => rotulo(STATUS_CANDIDATURA, status);
export const classeStatus = (status: StatusCandidatura) => STATUS_CANDIDATURA.find((item) => item.value === status)?.classe ?? "neutral";

// "2026-11-30" lido como data local (new Date() usaria UTC e mostraria o dia anterior)
function lerData(iso: string) {
  const [data, hora = "0:0:0"] = iso.split("T");
  const [ano, mes, dia] = data.split("-").map(Number);
  const [h, m, s] = hora.split(":").map((parte) => Number.parseFloat(parte) || 0);
  return new Date(ano, mes - 1, dia, h, m, Math.floor(s));
}

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function dataCurta(iso: string) {
  const data = lerData(iso);
  return `${String(data.getDate()).padStart(2, "0")} ${MESES[data.getMonth()].slice(0, 3)}`;
}

export function dataLonga(iso: string) {
  const data = lerData(iso);
  const ano = data.getFullYear() !== new Date().getFullYear() ? ` de ${data.getFullYear()}` : "";
  return `${data.getDate()} de ${MESES[data.getMonth()]}${ano}`;
}

export function dataCompleta(iso: string) {
  const data = lerData(iso);
  return `${data.getDate()} de ${MESES[data.getMonth()]} de ${data.getFullYear()}`;
}

export function tempoRelativo(iso: string) {
  const data = lerData(iso);
  const minutos = Math.floor((Date.now() - data.getTime()) / 60000);
  if (minutos < 1) return "Agora mesmo";
  if (minutos < 60) return `Há ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `Há ${horas} ${horas === 1 ? "hora" : "horas"}`;
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  return data.toDateString() === ontem.toDateString() ? "Ontem" : dataLonga(iso.slice(0, 10));
}

export function hojeIso() {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
}

export function iniciais(nome: string | null | undefined) {
  const partes = (nome ?? "").trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export const primeiroNome = (nome: string | null | undefined) => (nome ?? "").trim().split(/\s+/)[0] ?? "";

export const corDe = (id: number) => ["blue", "purple", "green", "orange"][Math.abs(id) % 4];

export function tamanhoArquivo(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

export const linhas = (texto: string | null | undefined) =>
  (texto ?? "").split(/\r?\n/).map((linha) => linha.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
