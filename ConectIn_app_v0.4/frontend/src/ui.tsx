import { useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { api, ErroApi, type VagaResumo } from "./api";
import { corDe, dataCurta, iniciais, rotuloModalidade, rotuloTipo } from "./formatos";
import { ir } from "./rotas";

const paths = {
  home: <path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  file: <path d="M6 2h8l4 4v16H6zM14 2v5h4M9 12h6M9 16h6" />,
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
  users: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M16 5a4 4 0 0 1 0 7M17 15a6 6 0 0 1 5 6" /></>,
  building: <path d="M4 22V4h11v18M15 9h5v13M8 8h3M8 12h3M8 16h3M2 22h20" />,
  arrow: <path d="m9 18 6-6-6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  logout: <path d="M10 17l5-5-5-5M15 12H3M14 4h7v16h-7" />,
  graduation: <path d="m2 9 10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5M22 9v6" />,
  sparkle: <path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" />,
  shield: <path d="M12 2 20 5v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5zm-3.5 10 2 2 5-5" />,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2" />,
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function Logo({ destino = "/" }: { destino?: string }) {
  return (
    <button className="logo" onClick={() => ir(destino)} aria-label="ConectIn — início">
      <span className="logo-mark">C</span>
      <span>Conect<span>In</span></span>
    </button>
  );
}

type Variante = "primary" | "secondary" | "danger" | "ghost";

export function Button({ children, variant = "primary", onClick, icon, type = "button", disabled = false, carregando = false }: {
  children: ReactNode; variant?: Variante; onClick?: () => void; icon?: IconName; type?: "button" | "submit";
  disabled?: boolean; carregando?: boolean;
}) {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick} disabled={disabled || carregando}>
      {carregando ? <span className="spinner spinner-small" /> : icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

export const CompanyLogo = ({ nome, id }: { nome: string; id: number }) => (
  <div className={`company-logo logo-${corDe(id)}`}>{iniciais(nome)}</div>
);

export const Badge = ({ children, status }: { children: ReactNode; status?: string }) => (
  <span className={`badge ${status ? `status-${status}` : ""}`}>{children}</span>
);

// a foto vem da API (precisa do token), por isso vira blob
export function Avatar({ nome, idUsuario, temFoto = false, grande = false, empresa = false, versao = 0 }: {
  nome: string; idUsuario?: number; temFoto?: boolean; grande?: boolean; empresa?: boolean; versao?: number;
}) {
  const [foto, setFoto] = useState<string | null>(null);
  useEffect(() => {
    setFoto(null);
    if (!temFoto || idUsuario === undefined) return;
    let endereco = "";
    let ativo = true;
    api.foto(idUsuario).then((arquivo) => {
      if (!ativo) return;
      endereco = URL.createObjectURL(arquivo);
      setFoto(endereco);
    }).catch(() => setFoto(null));
    return () => {
      ativo = false;
      if (endereco) URL.revokeObjectURL(endereco);
    };
  }, [idUsuario, temFoto, versao]);
  return (
    <div className={`avatar ${grande ? "avatar-large" : ""} ${empresa ? "company-avatar" : ""}`}>
      {foto ? <img src={foto} alt="" /> : iniciais(nome)}
    </div>
  );
}

function Campo({ label, required, erro, children }: { label: string; required?: boolean; erro?: string; children: ReactNode }) {
  return (
    <label className={`field ${erro ? "has-error" : ""}`}>
      <span>{label}{required && <b> *</b>}</span>
      {children}
      {erro && <small className="field-error">{erro}</small>}
    </label>
  );
}

type PropsCampo = { label: string; value: string; onChange: (valor: string) => void; required?: boolean; erro?: string };

export function Field({ label, value, onChange, required, erro, ...resto }: PropsCampo & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <Campo label={label} required={required} erro={erro}>
      <input {...resto} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={erro ? true : undefined} />
    </Campo>
  );
}

export function TextAreaField({ label, value, onChange, required, erro, placeholder, rows = 4, maxLength }: PropsCampo & {
  placeholder?: string; rows?: number; maxLength?: number;
}) {
  return (
    <Campo label={label} required={required} erro={erro}>
      <textarea placeholder={placeholder} rows={rows} value={value} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} />
    </Campo>
  );
}

export type Opcao = { value: string; label: string };

// com "todas" a primeira opcao (vazia) pode ser escolhida, usado nos filtros
export function SelectField({ label, placeholder, value, onChange, options, required, todas = false, erro }: PropsCampo & {
  placeholder: string; options: Opcao[]; todas?: boolean;
}) {
  return (
    <Campo label={label} required={required} erro={erro}>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled={!todas}>{placeholder}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Campo>
  );
}

export function SearchBar({ value, onChange, onBuscar }: { value: string; onChange: (valor: string) => void; onBuscar: () => void }) {
  return (
    <form className="search-bar" role="search" onSubmit={(e) => { e.preventDefault(); onBuscar(); }}>
      <Icon name="search" />
      <input placeholder="Cargo, área ou palavra-chave" value={value} onChange={(e) => onChange(e.target.value)} aria-label="Buscar oportunidades" />
      <button type="submit">Buscar</button>
    </form>
  );
}

export function Alerta({ tipo = "erro", children }: { tipo?: "erro" | "sucesso" | "info"; children: ReactNode }) {
  if (!children) return null;
  return (
    <div className={`form-alert ${tipo}`} role={tipo === "erro" ? "alert" : "status"}>
      <Icon name={tipo === "sucesso" ? "check" : "alert"} size={18} />
      <div>{children}</div>
    </div>
  );
}

export const Carregando = ({ texto = "Carregando..." }: { texto?: string }) => (
  <div className="loading" role="status"><span className="spinner" />{texto}</div>
);

export function Vazio({ icone = "search", titulo, texto, acao }: { icone?: IconName; titulo: string; texto?: string; acao?: ReactNode }) {
  return (
    <div className="empty-state">
      <div className="feature-icon"><Icon name={icone} /></div>
      <h3>{titulo}</h3>
      {texto && <p>{texto}</p>}
      {acao}
    </div>
  );
}

export function ErroCarregar({ erro, tentarDeNovo }: { erro: unknown; tentarDeNovo?: () => void }) {
  const naoEncontrado = erro instanceof ErroApi && erro.status === 404;
  return (
    <Vazio icone="alert" titulo={naoEncontrado ? "Não encontramos esta página" : "Não foi possível carregar"} texto={mensagemDe(erro)}
      acao={naoEncontrado ? <Button variant="secondary" onClick={() => history.back()}>Voltar</Button>
        : tentarDeNovo && <Button variant="secondary" onClick={tentarDeNovo}>Tentar de novo</Button>} />
  );
}

export const mensagemDe = (erro: unknown) => (erro instanceof Error ? erro.message : "Algo deu errado. Tente de novo.");
export const errosDe = (erro: unknown): Record<string, string> => (erro instanceof ErroApi ? erro.erros : {});

export function JobCard({ job, detail = false, onOpen }: { job: VagaResumo; detail?: boolean; onOpen: () => void }) {
  return (
    <article className={`job-card ${detail ? "job-row" : ""}`}>
      <div className="job-top"><CompanyLogo nome={job.empresa} id={job.idEmpresa} /></div>
      <div>
        <p className="eyebrow">{rotuloTipo(job.tipo)}</p>
        <h3>{job.titulo}</h3>
        <p className="muted">{job.empresa}</p>
      </div>
      <div className="tags">
        {job.areas.slice(0, 2).map((area) => <Badge key={area}>{area}</Badge>)}
        <Badge>{rotuloModalidade(job.modalidade)}</Badge>
      </div>
      <div className="job-footer">
        <span><Icon name="clock" size={16} /> Até {dataCurta(job.prazoInscricao)}</span>
        <Button variant={detail ? "secondary" : "primary"} onClick={onOpen}>{detail ? "Ver detalhes" : "Ver vaga"}</Button>
      </div>
    </article>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}

// area de "arraste ou clique" pra enviar arquivo, ja confere tipo e tamanho
export function ZonaDeEnvio({ aceitar, titulo, dica, enviando, aoEscolher }: {
  aceitar: "pdf" | "imagem"; titulo: string; dica: string; enviando: boolean; aoEscolher: (arquivo: File) => void;
}) {
  const entrada = useRef<HTMLInputElement>(null);
  const [arrastando, setArrastando] = useState(false);
  const [erro, setErro] = useState("");

  const conferir = (arquivo?: File) => {
    if (!arquivo) return;
    const pdf = aceitar === "pdf";
    const tipoCerto = pdf ? arquivo.type === "application/pdf" || arquivo.name.toLowerCase().endsWith(".pdf") : ["image/jpeg", "image/png"].includes(arquivo.type);
    if (!tipoCerto) return setErro(pdf ? "Envie um arquivo PDF." : "Envie uma imagem JPG ou PNG.");
    if (arquivo.size > 5 * 1024 * 1024) return setErro("O arquivo pode ter no máximo 5 MB.");
    setErro("");
    aoEscolher(arquivo);
  };

  return (
    <>
      <button type="button" className={`upload-zone ${arrastando ? "dragging" : ""}`} disabled={enviando}
        onClick={() => entrada.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
        onDragLeave={() => setArrastando(false)}
        onDrop={(e) => { e.preventDefault(); setArrastando(false); conferir(e.dataTransfer.files[0]); }}>
        <span>{enviando ? <span className="spinner" /> : <Icon name="file" size={27} />}</span>
        <strong>{enviando ? "Enviando..." : titulo}</strong>
        <small>{dica}</small>
      </button>
      <input ref={entrada} type="file" hidden accept={aceitar === "pdf" ? "application/pdf,.pdf" : "image/jpeg,image/png"}
        onChange={(e) => { conferir(e.target.files?.[0]); e.target.value = ""; }} />
      {erro && <small className="field-error">{erro}</small>}
    </>
  );
}

export function EscolherArquivo({ aceitar, aoEscolher, children, variant, carregando = false }: {
  aceitar: string; aoEscolher: (arquivo: File) => void; children: ReactNode; variant?: Variante; carregando?: boolean;
}) {
  const entrada = useRef<HTMLInputElement>(null);
  const abrir = () => entrada.current?.click();
  return (
    <>
      {variant ? <Button variant={variant} onClick={abrir} carregando={carregando}>{children}</Button>
        : <button type="button" onClick={abrir} disabled={carregando}>{children}</button>}
      <input ref={entrada} type="file" hidden accept={aceitar} onChange={(e) => {
        const arquivo = e.target.files?.[0];
        e.target.value = "";
        if (arquivo) aoEscolher(arquivo);
      }} />
    </>
  );
}

// carrega dados da API quando a tela abre
export function useDados<T>(carregar: () => Promise<T>, dependencias: unknown[]) {
  const [dados, setDados] = useState<T | null>(null);
  const [erro, setErro] = useState<unknown>(null);
  const [carregando, setCarregando] = useState(true);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro(null);
    carregar()
      .then((resultado) => ativo && setDados(resultado))
      .catch((falha) => ativo && setErro(falha))
      .finally(() => ativo && setCarregando(false));
    return () => { ativo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, versao]);

  return { dados, erro, carregando, recarregar: () => setVersao((v) => v + 1), setDados };
}

// roda uma acao mostrando o erro num aviso, e liga/desliga o "carregando"
export async function tentar(acao: () => Promise<unknown>, ocupado?: (valor: boolean) => void) {
  ocupado?.(true);
  try {
    await acao();
  } catch (falha) {
    avisar(mensagemDe(falha));
  } finally {
    ocupado?.(false);
  }
}

let mostrarAviso: ((texto: string) => void) | null = null;
export const avisar = (texto: string) => mostrarAviso?.(texto);

export function Avisos() {
  const [texto, setTexto] = useState("");
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    mostrarAviso = (novo) => {
      setTexto(novo);
      clearTimeout(timer);
      timer = setTimeout(() => setTexto(""), 3500);
    };
    return () => { mostrarAviso = null; clearTimeout(timer); };
  }, []);
  return texto ? <div className="toast" role="status">{texto}</div> : null;
}
