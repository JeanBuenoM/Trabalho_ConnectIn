import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { abrirArquivo, api, type CandidaturaDoCandidato, type PerfilCandidato, type PerfilCandidatoFormulario, type StatusCandidatura } from "../api";
import { STATUS_FORMACAO, classeStatus, dataCompleta, primeiroNome, rotuloStatus, rotuloStatusFormacao, rotuloTipo, tamanhoArquivo } from "../formatos";
import { comConsulta, ir } from "../rotas";
import { useSessao } from "../sessao";
import {
  Alerta, Avatar, Badge, Button, Carregando, CompanyLogo, ErroCarregar, EscolherArquivo, Field, Icon, JobCard, PageHeader,
  SearchBar, SelectField, TextAreaField, Vazio, ZonaDeEnvio, avisar, errosDe, mensagemDe, tentar, useDados, type IconName,
} from "../ui";

export function CandidateDashboard({ naoLidas }: { naoLidas: number }) {
  const { usuario } = useSessao();
  const perfil = useDados(() => api.perfilCandidato(), []);
  const recomendadas = useDados(() => api.recomendadas(3), []);
  const areas = useDados(() => api.areas(), []);
  const [busca, setBusca] = useState("");

  const minhaArea = areas.dados?.find((area) => area.nome === perfil.dados?.areaInteresse);
  const completude = perfil.dados?.completude ?? 100;
  const filtrar = (filtro: Record<string, string | number>) => ir(comConsulta("/vagas", filtro));

  return (
    <>
      <PageHeader title={`Olá, ${primeiroNome(usuario?.nome)}!`} subtitle="Encontre oportunidades para você."
        action={
          <div className="header-actions">
            <button className="icon-btn notification" onClick={() => ir("/notificacoes")} aria-label="Notificações">
              <Icon name="bell" />
              {naoLidas > 0 && <i></i>}
            </button>
            <Avatar nome={usuario?.nome ?? ""} idUsuario={usuario?.id} temFoto={usuario?.temFoto} />
          </div>
        } />
      <section className="welcome-card">
        <div>
          <Badge><Icon name="sparkle" size={14} /> Oportunidades personalizadas</Badge>
          <h2>Onde seu talento quer chegar?</h2>
          <p>Pesquise entre as oportunidades profissionais e acadêmicas com inscrições abertas.</p>
          <SearchBar value={busca} onChange={setBusca} onBuscar={() => filtrar({ busca: busca.trim() })} />
          <div className="quick-filters">
            <span>Filtros rápidos:</span>
            {minhaArea && <button onClick={() => filtrar({ area: minhaArea.id })}>{minhaArea.nome}</button>}
            <button onClick={() => filtrar({ tipo: "estagio" })}>Estágios</button>
            <button onClick={() => filtrar({ tipo: "projeto_academico" })}>Projetos acadêmicos</button>
            <button onClick={() => filtrar({ modalidade: "remoto" })}>Remoto</button>
          </div>
        </div>
        <div className="welcome-art">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <Icon name="briefcase" size={72} />
        </div>
      </section>
      <section className="content-section">
        <div className="section-row compact">
          <div>
            <h2>Oportunidades em destaque</h2>
            <p>Selecionadas com base na sua área de interesse e nas suas habilidades</p>
          </div>
          <button onClick={() => ir("/vagas")}>Ver todas <Icon name="arrow" /></button>
        </div>
        {recomendadas.carregando ? (
          <Carregando />
        ) : recomendadas.erro ? (
          <ErroCarregar erro={recomendadas.erro} tentarDeNovo={recomendadas.recarregar} />
        ) : !recomendadas.dados?.length ? (
          <Vazio titulo="Nenhuma vaga nova para você agora" texto="Quando surgirem vagas abertas que você ainda não se candidatou, elas aparecem aqui." />
        ) : (
          <div className="jobs-grid dashboard-grid">
            {recomendadas.dados.map((vaga) => <JobCard key={vaga.id} job={vaga} onOpen={() => ir(`/vagas/${vaga.id}`)} />)}
          </div>
        )}
      </section>
      {completude < 100 && (
        <section className="profile-progress">
          <div className="progress-ring" style={{ ["--progresso" as string]: `${completude * 3.6}deg` }}>{completude}%</div>
          <div>
            <h3>{completude < 60 ? "Complete seu perfil" : "Seu perfil está quase completo"}</h3>
            <p>Formação, habilidades e currículo ajudam as empresas a encontrarem você.</p>
          </div>
          <Button variant="secondary" onClick={() => ir("/perfil/editar")}>Completar perfil</Button>
        </section>
      )}
    </>
  );
}

export function Applications() {
  const { dados, erro, carregando, recarregar } = useDados(() => api.minhasCandidaturas(), []);
  const [filtro, setFiltro] = useState<StatusCandidatura | "todas">("todas");

  if (carregando) return <Carregando />;
  if (erro || !dados) return <ErroCarregar erro={erro} tentarDeNovo={recarregar} />;

  const contar = (status: StatusCandidatura) => dados.filter((item) => item.status === status).length;
  const visiveis = filtro === "todas" ? dados : dados.filter((item) => item.status === filtro);
  const abas: [StatusCandidatura | "todas", string, number][] = [
    ["todas", "Todas", dados.length],
    ["analise", "Em análise", contar("analise")],
    ["aprovado", "Aprovadas", contar("aprovado")],
    ["reprovado", "Reprovadas", contar("reprovado")],
  ];

  return (
    <>
      <PageHeader title="Minhas candidaturas" subtitle="Acompanhe o andamento das oportunidades em que se candidatou." />
      <div className="stat-row">
        <Estatistica icone="file" cor="blue" valor={dados.length} rotulo="Total de candidaturas" />
        <Estatistica icone="clock" cor="yellow" valor={contar("analise")} rotulo="Em análise" />
        <Estatistica icone="check" cor="green" valor={contar("aprovado")} rotulo={contar("aprovado") === 1 ? "Aprovada" : "Aprovadas"} />
      </div>
      <Abas abas={abas} atual={filtro} escolher={setFiltro} />
      {dados.length === 0 ? (
        <Vazio icone="file" titulo="Você ainda não se candidatou" texto="Encontre uma oportunidade e envie sua candidatura em poucos cliques."
          acao={<Button onClick={() => ir("/vagas")}>Buscar oportunidades</Button>} />
      ) : visiveis.length === 0 ? (
        <Vazio icone="file" titulo="Nenhuma candidatura com este status" />
      ) : (
        <div className="application-list">{visiveis.map((item) => <ItemCandidatura key={item.id} item={item} />)}</div>
      )}
    </>
  );
}

export function Abas<T extends string>({ abas, atual, escolher }: { abas: [T, string, number][]; atual: T; escolher: (valor: T) => void }) {
  return (
    <div className="tab-row" role="tablist">
      {abas.map(([valor, rotulo, total]) => (
        <button key={valor} role="tab" aria-selected={atual === valor} className={atual === valor ? "active" : ""} onClick={() => escolher(valor)}>
          {rotulo} {total > 0 && <span>{total}</span>}
        </button>
      ))}
    </div>
  );
}

function ItemCandidatura({ item }: { item: CandidaturaDoCandidato }) {
  return (
    <article>
      <CompanyLogo nome={item.empresa} id={item.idEmpresa} />
      <div className="application-info">
        <h3>{item.titulo}</h3>
        <p>{item.empresa} • {rotuloTipo(item.tipo)}</p>
        <small>Candidatura enviada em {dataCompleta(item.dataCandidatura)}</small>
      </div>
      <Badge status={classeStatus(item.status)}>{rotuloStatus(item.status)}</Badge>
      <button className="icon-btn" onClick={() => ir(`/vagas/${item.idVaga}`)} aria-label={`Ver a vaga ${item.titulo}`}><Icon name="arrow" /></button>
    </article>
  );
}

function Estatistica({ icone, cor, valor, rotulo }: { icone: IconName; cor: string; valor: number; rotulo: string }) {
  return (
    <div>
      <span className={`stat-icon ${cor}`}><Icon name={icone} /></span>
      <div><strong>{valor}</strong><small>{rotulo}</small></div>
    </div>
  );
}

// pedacos usados tambem na tela da empresa que ve o candidato
export function Formacao({ perfil, vazio }: { perfil: PerfilCandidato; vazio: string }) {
  if (!perfil.curso) return <p className="muted">{vazio}</p>;
  return (
    <div className="timeline-item">
      <span><Icon name="graduation" /></span>
      <div>
        <strong>{perfil.curso}</strong>
        <p>{[perfil.instituicao, rotuloStatusFormacao(perfil.statusFormacao)].filter(Boolean).join(" • ")}</p>
        {perfil.anoConclusao && <small>Conclusão em {perfil.anoConclusao}</small>}
      </div>
    </div>
  );
}

export function Habilidades({ lista, vazio }: { lista: string[]; vazio: string }) {
  if (lista.length === 0) return <p className="muted">{vazio}</p>;
  return <div className="skill-tags">{lista.map((h) => <span key={h}>{h}</span>)}</div>;
}

export function CartaoArquivo({ titulo, nome, detalhe, vertical = false, children }: {
  titulo: string; nome: string; detalhe: string; vertical?: boolean; children?: ReactNode;
}) {
  return (
    <section className={`resume-card ${vertical ? "vertical" : ""}`}>
      <div className="file-icon"><Icon name="file" /></div>
      <div>
        <small>{titulo}</small>
        <strong>{nome}</strong>
        <span>{detalhe}</span>
      </div>
      {children}
    </section>
  );
}

export function Profile() {
  const { usuario } = useSessao();
  const { dados: perfil, erro, carregando, recarregar } = useDados(() => api.perfilCandidato(), []);
  const [abrindo, setAbrindo] = useState(false);

  if (carregando) return <Carregando />;
  if (erro || !perfil) return <ErroCarregar erro={erro} tentarDeNovo={recarregar} />;
  const curriculo = perfil.curriculo;

  return (
    <>
      <PageHeader title="Meu perfil" subtitle="Mantenha suas informações atualizadas para se destacar."
        action={<Button onClick={() => ir("/perfil/editar")}>Editar perfil</Button>} />
      <div className="profile-cover"></div>
      <section className="profile-identity">
        <Avatar nome={perfil.nome} idUsuario={perfil.id} temFoto={usuario?.temFoto ?? perfil.temFoto} grande />
        <div>
          <h2>{perfil.nome}</h2>
          <p>{perfil.curso ? `Estudante de ${perfil.curso}` : "Complete sua formação acadêmica"}</p>
        </div>
        <div className="completion">
          <small>Perfil completo</small>
          <strong>{perfil.completude}%</strong>
          <div><i style={{ width: `${perfil.completude}%` }}></i></div>
        </div>
      </section>
      <div className="profile-layout">
        <div className="profile-main">
          <section className="info-card">
            <h3>Sobre mim</h3>
            <p>{perfil.sobre ?? "Conte um pouco sobre você, seus objetivos e o que procura."}</p>
            {perfil.semExperiencia && (
              <label className="experience-flag"><input type="checkbox" checked readOnly disabled /> Sem experiência profissional, em busca de oportunidade.</label>
            )}
          </section>
          <section className="info-card">
            <h3>Formação acadêmica</h3>
            <Formacao perfil={perfil} vazio="Nenhuma formação cadastrada." />
          </section>
          <section className="info-card">
            <h3>Habilidades</h3>
            <Habilidades lista={perfil.habilidades} vazio="Adicione habilidades para receber vagas compatíveis." />
          </section>
        </div>
        <aside>
          <section className="info-card">
            <h3>Informações</h3>
            <dl className="profile-dl">
              <div><dt>Área de interesse</dt><dd>{perfil.areaInteresse ?? "—"}</dd></div>
              <div><dt>E-mail</dt><dd>{perfil.email}</dd></div>
              <div><dt>Telefone</dt><dd>{perfil.telefone ?? "—"}</dd></div>
            </dl>
          </section>
          <CartaoArquivo titulo="CURRÍCULO" nome={curriculo ? curriculo.nomeArquivo : "Nenhum currículo"}
            detalhe={curriculo ? `PDF • ${tamanhoArquivo(curriculo.tamanhoBytes)}` : "Obrigatório só para vagas de emprego"}>
            {curriculo ? (
              <Button variant="secondary" onClick={() => tentar(() => abrirArquivo(api.meuCurriculo), setAbrindo)} carregando={abrindo}>Visualizar</Button>
            ) : (
              <Button variant="secondary" onClick={() => ir("/perfil/editar")}>Adicionar currículo</Button>
            )}
          </CartaoArquivo>
        </aside>
      </div>
    </>
  );
}

function SkillsEditor({ skills, setSkills, erro }: { skills: string[]; setSkills: (lista: string[]) => void; erro?: string }) {
  const [skill, setSkill] = useState("");
  const adicionar = () => {
    const valor = skill.trim().slice(0, 50);
    if (valor && !skills.some((s) => s.toLowerCase() === valor.toLowerCase())) setSkills([...skills, valor]);
    setSkill("");
  };
  return (
    <div className="skills-editor">
      <span className="field-label">Habilidades</span>
      {skills.length > 0 && (
        <div className="editable-tags">
          {skills.map((item) => (
            <span key={item}>
              {item}
              <button type="button" aria-label={`Remover ${item}`} onClick={() => setSkills(skills.filter((s) => s !== item))}>×</button>
            </span>
          ))}
        </div>
      )}
      <div className="skill-input">
        <input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Digite uma habilidade e tecle Enter" maxLength={50}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              adicionar();
            }
          }} />
        <button type="button" onClick={adicionar}><Icon name="plus" size={16} /> Adicionar</button>
      </div>
      {erro && <small className="field-error">{erro}</small>}
    </div>
  );
}

export function Secao({ icon, title, description, children }: { icon: IconName; title: string; description: string; children: ReactNode }) {
  return (
    <section className="profile-form-section">
      <header>
        <span><Icon name={icon} /></span>
        <div><h2>{title}</h2><p>{description}</p></div>
      </header>
      <div className="profile-form-content">{children}</div>
    </section>
  );
}

export function EditorDeFoto({ nome, empresa = false }: { nome: string; empresa?: boolean }) {
  const { usuario, recarregarUsuario } = useSessao();
  const [enviando, setEnviando] = useState(false);
  const [versao, setVersao] = useState(0);

  const trocar = (arquivo: File) => {
    if (!["image/jpeg", "image/png"].includes(arquivo.type)) return avisar("Envie uma imagem JPG ou PNG.");
    if (arquivo.size > 5 * 1024 * 1024) return avisar("A imagem pode ter no máximo 5 MB.");
    tentar(async () => {
      await api.enviarFoto(arquivo);
      await recarregarUsuario();
      setVersao((v) => v + 1);
      avisar(empresa ? "Logotipo atualizado." : "Foto atualizada.");
    }, setEnviando);
  };

  const remover = () => tentar(async () => {
    await api.removerFoto();
    await recarregarUsuario();
    avisar(empresa ? "Logotipo removido." : "Foto removida.");
  }, setEnviando);

  return (
    <div className="avatar-editor">
      <Avatar nome={nome} idUsuario={usuario?.id} temFoto={usuario?.temFoto} grande empresa={empresa} versao={versao} />
      <div>
        <strong>{empresa ? "Logotipo" : "Foto do perfil"}</strong>
        <p>JPG ou PNG. Tamanho máximo de 5 MB.</p>
        <EscolherArquivo aceitar="image/jpeg,image/png" aoEscolher={trocar} carregando={enviando}>
          {enviando ? "Enviando..." : usuario?.temFoto ? "Alterar foto" : "Adicionar foto"}
        </EscolherArquivo>
        {usuario?.temFoto && !enviando && <button type="button" className="link-danger" onClick={remover}>Remover</button>}
      </div>
    </div>
  );
}

const formularioDe = (p: PerfilCandidato): PerfilCandidatoFormulario => ({
  nome: p.nome ?? "", email: p.email ?? "", telefone: p.telefone ?? "", curso: p.curso ?? "", instituicao: p.instituicao ?? "",
  statusFormacao: p.statusFormacao ?? "", anoConclusao: p.anoConclusao ? String(p.anoConclusao) : "", areaInteresse: p.areaInteresse ?? "",
  sobre: p.sobre ?? "", semExperiencia: p.semExperiencia, habilidades: p.habilidades,
});

export function PerfilForm({ modo }: { modo: "completar" | "editar" }) {
  const { recarregarUsuario } = useSessao();
  const carregamento = useDados(() => Promise.all([api.perfilCandidato(), api.areas()]), []);
  const [form, setForm] = useState<PerfilCandidatoFormulario | null>(null);
  const [perfil, setPerfil] = useState<PerfilCandidato | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [confirmarRemocao, setConfirmarRemocao] = useState(false);
  const completar = modo === "completar";

  useEffect(() => {
    if (!carregamento.dados) return;
    setPerfil(carregamento.dados[0]);
    setForm(formularioDe(carregamento.dados[0]));
  }, [carregamento.dados]);

  if (carregamento.carregando || (carregamento.dados && !form)) return <Carregando />;
  if (carregamento.erro || !carregamento.dados || !form || !perfil) return <ErroCarregar erro={carregamento.erro} tentarDeNovo={carregamento.recarregar} />;

  const areas = carregamento.dados[1];
  const mudar = <K extends keyof PerfilCandidatoFormulario>(campo: K) => (valor: PerfilCandidatoFormulario[K]) => setForm({ ...form, [campo]: valor });
  const curriculo = perfil.curriculo;

  const enviarCurriculo = (arquivo: File) => tentar(async () => {
    setPerfil({ ...perfil, curriculo: await api.enviarCurriculo(arquivo) });
    avisar("Currículo salvo.");
  }, setOcupado);

  const removerCurriculo = () => tentar(async () => {
    await api.removerCurriculo();
    setPerfil({ ...perfil, curriculo: null });
    setConfirmarRemocao(false);
    avisar("Currículo removido.");
  }, setOcupado);

  const salvar = async (e: FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setErros({});
    setErroGeral("");
    try {
      await api.salvarPerfilCandidato(form);
      await recarregarUsuario();
      avisar("Perfil salvo.");
      ir("/perfil");
    } catch (falha) {
      setErros(errosDe(falha));
      setErroGeral(mensagemDe(falha));
      setSalvando(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <PageHeader title={completar ? "Complete seu perfil" : "Editar perfil e currículo"}
        subtitle={completar ? "Preencha seus dados e adicione seu currículo para aumentar suas oportunidades." : "Atualize seus dados, informações profissionais e currículo."} />
      <form className="profile-form" onSubmit={salvar} noValidate>
        <Alerta>{erroGeral}</Alerta>
        <Secao icon="user" title="Dados pessoais" description="Mantenha seus dados de contato atualizados.">
          <EditorDeFoto nome={form.nome} />
          <div className="form-grid">
            <Field label="Nome completo" placeholder="Digite seu nome completo" value={form.nome} onChange={mudar("nome")} erro={erros.nome}
              required autoComplete="name" maxLength={150} />
            <Field label="E-mail" placeholder="seuemail@exemplo.com" type="email" value={form.email} onChange={mudar("email")} erro={erros.email}
              required autoComplete="email" />
            <Field label="Telefone" placeholder="(00) 00000-0000" type="tel" value={form.telefone} onChange={mudar("telefone")} erro={erros.telefone}
              autoComplete="tel" maxLength={20} />
          </div>
        </Secao>
        <Secao icon="graduation" title="Formação acadêmica" description="Adicione sua formação mais recente.">
          <div className="form-grid">
            <Field label="Curso" placeholder="Ex.: Análise e Desenvolvimento de Sistemas" value={form.curso} onChange={mudar("curso")} erro={erros.curso}
              required maxLength={150} />
            <Field label="Instituição de ensino" placeholder="Nome da instituição" value={form.instituicao} onChange={mudar("instituicao")}
              erro={erros.instituicao} required maxLength={150} />
            <SelectField label="Status da formação" placeholder="Selecione o status" value={form.statusFormacao} onChange={mudar("statusFormacao")}
              options={STATUS_FORMACAO} erro={erros.statusFormacao} required />
            <Field label="Ano de conclusão" placeholder="Ex.: 2026" value={form.anoConclusao} erro={erros.anoConclusao} inputMode="numeric"
              onChange={(v) => mudar("anoConclusao")(v.replace(/\D/g, "").slice(0, 4))} />
          </div>
        </Secao>
        <Secao icon="briefcase" title="Perfil profissional" description="Ajude empresas a encontrarem seu perfil.">
          <SelectField label="Área de interesse" placeholder="Selecione sua área" value={form.areaInteresse} onChange={mudar("areaInteresse")}
            options={areas.map((a) => ({ value: a.nome, label: a.nome }))} erro={erros.areaInteresse} required />
          <SkillsEditor skills={form.habilidades} setSkills={mudar("habilidades")} erro={erros.habilidades} />
          <TextAreaField label="Sobre mim" placeholder="Conte seus objetivos, interesses e o que você procura." value={form.sobre}
            onChange={mudar("sobre")} erro={erros.sobre} maxLength={2000} />
        </Secao>
        <Secao icon="file" title={completar ? "Anexe seu currículo" : "Currículo"}
          description="Obrigatório para vagas de emprego; opcional para estágios e projetos acadêmicos.">
          {curriculo ? (
            <div className="current-resume">
              <span className="pdf-icon">PDF</span>
              <div>
                <strong>{curriculo.nomeArquivo}</strong>
                <span>Arquivo PDF • {tamanhoArquivo(curriculo.tamanhoBytes)}</span>
                {curriculo.atualizadoEm && <small>Atualizado em {dataCompleta(curriculo.atualizadoEm)}</small>}
              </div>
              <div>
                <Button variant="secondary" onClick={() => tentar(() => abrirArquivo(api.meuCurriculo))}>Visualizar currículo</Button>
                <EscolherArquivo aceitar="application/pdf,.pdf" aoEscolher={enviarCurriculo} variant="secondary" carregando={ocupado}>Substituir currículo</EscolherArquivo>
                {confirmarRemocao
                  ? <Button variant="danger" onClick={removerCurriculo} carregando={ocupado}>Confirmar remoção</Button>
                  : <Button variant="danger" onClick={() => setConfirmarRemocao(true)}>Remover currículo</Button>}
              </div>
            </div>
          ) : (
            <ZonaDeEnvio aceitar="pdf" titulo="Arraste seu currículo aqui ou clique para selecionar" dica="Formato PDF • Tamanho máximo de 5 MB"
              enviando={ocupado} aoEscolher={enviarCurriculo} />
          )}
          <label className="experience-check">
            <input type="checkbox" checked={form.semExperiencia} onChange={(e) => mudar("semExperiencia")(e.target.checked)} />{" "}
            <span>
              <strong>Sem experiência profissional, em busca de oportunidade.</strong>
              <small>Marque esta opção se estiver buscando sua primeira experiência.</small>
            </span>
          </label>
        </Secao>
        <div className="profile-form-actions">
          <Button variant="ghost" onClick={() => ir(completar ? "/inicio" : "/perfil")}>{completar ? "Fazer depois" : "Cancelar"}</Button>
          <Button type="submit" carregando={salvando}>{completar ? "Salvar perfil e currículo" : "Salvar alterações"}</Button>
        </div>
      </form>
    </>
  );
}
