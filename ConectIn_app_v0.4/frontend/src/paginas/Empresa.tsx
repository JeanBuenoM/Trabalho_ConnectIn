import { useEffect, useState, type FormEvent } from "react";
import { abrirArquivo, api, type PerfilEmpresa, type PerfilEmpresaFormulario, type StatusCandidatura, type VagaEmpresa, type VagaFormulario } from "../api";
import { MODALIDADES, STATUS_CANDIDATURA, TIPOS_INSTITUICAO, TIPOS_VAGA, classeStatus, dataCompleta, dataCurta, hojeIso, primeiroNome, rotuloModalidade, rotuloStatus, rotuloTipo, tamanhoArquivo } from "../formatos";
import { comConsulta, ir, substituir, voltarOu, type Rota } from "../rotas";
import { useSessao } from "../sessao";
import { Alerta, Avatar, Badge, Button, Carregando, CompanyLogo, ErroCarregar, Field, Icon, PageHeader, SelectField, TextAreaField, Vazio, avisar, errosDe, mensagemDe, tentar, useDados } from "../ui";
import { Abas, CartaoArquivo, EditorDeFoto, Formacao, Habilidades, Secao } from "./Candidato";

const verCandidatos = (idVaga: number) => ir(comConsulta("/empresa/candidatos", { vaga: idVaga }));
const BotaoPublicar = () => <Button icon="plus" onClick={() => ir("/empresa/publicar")}>Publicar vaga</Button>;
const plural = (n: number, um: string, varios: string) => (n === 1 ? um : varios);

function SituacaoVaga({ vaga }: { vaga: VagaEmpresa }) {
  if (vaga.inscricoesAbertas) return <Badge status="active">Ativa</Badge>;
  return <Badge status="neutral">{vaga.status === "encerrada" ? "Encerrada" : "Prazo encerrado"}</Badge>;
}

export function CompanyDashboard() {
  const { usuario } = useSessao();
  const { dados: painel, erro, carregando, recarregar } = useDados(() => api.painelEmpresa(), []);

  if (carregando) return <Carregando />;
  if (erro || !painel) return <ErroCarregar erro={erro} tentarDeNovo={recarregar} />;

  return (
    <>
      <PageHeader title={`Olá, ${usuario?.nome ?? ""}!`} subtitle="Veja o desempenho das suas oportunidades." action={<BotaoPublicar />} />
      <div className="company-stats">
        <div>
          <span className="stat-icon blue"><Icon name="briefcase" /></span>
          <p><strong>{painel.vagasPublicadas}</strong><small>{plural(painel.vagasPublicadas, "Vaga publicada", "Vagas publicadas")}</small></p>
          {painel.vagasNoMes > 0 && <em>+{painel.vagasNoMes} este mês</em>}
        </div>
        <div>
          <span className="stat-icon purple"><Icon name="users" /></span>
          <p><strong>{painel.totalCandidaturas}</strong><small>Total de candidatos</small></p>
          {painel.candidaturasNaSemana > 0 && <em>+{painel.candidaturasNaSemana} esta semana</em>}
        </div>
        <div>
          <span className="stat-icon green"><Icon name="check" /></span>
          <p><strong>{painel.aprovados}</strong><small>{plural(painel.aprovados, "Candidato aprovado", "Candidatos aprovados")}</small></p>
        </div>
      </div>
      <section className="content-section">
        <div className="section-row compact">
          <div>
            <h2>Suas oportunidades</h2>
            <p>Acompanhe as vagas publicadas recentemente</p>
          </div>
          {painel.recentes.length > 0 && <button onClick={() => ir("/empresa/vagas")}>Ver todas <Icon name="arrow" /></button>}
        </div>
        {painel.recentes.length === 0 ? (
          <Vazio icone="briefcase" titulo="Você ainda não publicou vagas"
            texto="Publique sua primeira oportunidade e receba candidaturas de estudantes e profissionais." acao={<BotaoPublicar />} />
        ) : (
          <div className="company-job-list">
            {painel.recentes.map((vaga) => (
              <article key={vaga.id}>
                <div className="company-job-title">
                  <CompanyLogo nome={usuario?.nome ?? ""} id={usuario?.id ?? 0} />
                  <div>
                    <h3>{vaga.titulo}</h3>
                    <p>{rotuloTipo(vaga.tipo)} • {vaga.areas.join(", ")}</p>
                  </div>
                </div>
                <SituacaoVaga vaga={vaga} />
                <div className="applicant-count">
                  <Icon name="users" />
                  <strong>{vaga.candidaturas}</strong>
                  <span>{plural(vaga.candidaturas, "candidatura", "candidaturas")}</span>
                </div>
                <Button variant="secondary" onClick={() => verCandidatos(vaga.id)}>Ver candidatos</Button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

const VAGA_VAZIA: VagaFormulario = { titulo: "", descricao: "", requisitos: "", tipo: "", modalidade: "", prazoInscricao: "", areas: [] };

export function VagaForm({ idVaga }: { idVaga?: number }) {
  const edicao = idVaga !== undefined;
  const areas = useDados(() => api.areas(), []);
  const existente = useDados(() => (idVaga !== undefined ? api.vagaDaEmpresa(idVaga) : Promise.resolve(null)), [idVaga]);
  const [form, setForm] = useState<VagaFormulario>(VAGA_VAZIA);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [publicada, setPublicada] = useState<number | null>(null);

  useEffect(() => {
    const v = existente.dados;
    if (v) setForm({ titulo: v.titulo, descricao: v.descricao, requisitos: v.requisitos ?? "", tipo: v.tipo, modalidade: v.modalidade,
      prazoInscricao: v.prazoInscricao, areas: v.areas.map((a) => a.id) });
  }, [existente.dados]);

  if (areas.carregando || existente.carregando) return <Carregando />;
  if (areas.erro || existente.erro) {
    return <ErroCarregar erro={areas.erro ?? existente.erro} tentarDeNovo={() => { areas.recarregar(); existente.recarregar(); }} />;
  }

  const mudar = <K extends keyof VagaFormulario>(campo: K) => (valor: VagaFormulario[K]) => {
    setForm({ ...form, [campo]: valor });
    if (erros[campo]) setErros({ ...erros, [campo]: "" });
  };
  const alternarArea = (id: number) => mudar("areas")(form.areas.includes(id) ? form.areas.filter((a) => a !== id) : [...form.areas, id]);

  const salvar = async (e: FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setErros({});
    setErroGeral("");
    try {
      if (idVaga !== undefined) {
        await api.editarVaga(idVaga, form);
        avisar("Vaga atualizada.");
        ir("/empresa/vagas");
      } else {
        setPublicada((await api.publicarVaga(form)).id);
      }
    } catch (falha) {
      setErros(errosDe(falha));
      setErroGeral(mensagemDe(falha));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSalvando(false);
    }
  };

  if (publicada !== null) {
    return (
      <div className="publish-success">
        <div className="success-state">
          <span><Icon name="check" size={30} /></span>
          <h2>Vaga publicada!</h2>
          <p>“{form.titulo}” já aparece na busca de oportunidades, e os candidatos com perfil compatível foram notificados.</p>
          <div className="success-actions">
            <Button variant="secondary" onClick={() => ir(`/vagas/${publicada}`)}>Ver como candidato</Button>
            <Button variant="secondary" onClick={() => ir("/empresa/vagas")}>Minhas vagas</Button>
            <Button icon="plus" onClick={() => { setForm(VAGA_VAZIA); setPublicada(null); }}>Publicar outra</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {edicao && <button className="back-link page-back" onClick={() => voltarOu("/empresa/vagas")}>← Voltar para minhas vagas</button>}
      <PageHeader title={edicao ? "Editar oportunidade" : "Publicar oportunidade"} subtitle="Preencha as informações para encontrar os talentos certos." />
      <form className="publish-form" onSubmit={salvar} noValidate>
        <Alerta>{erroGeral}</Alerta>
        <section>
          <h2>Informações da oportunidade</h2>
          <p>Conte os principais detalhes da vaga.</p>
          <Field label="Título da vaga" placeholder="Ex.: Desenvolvedor Java Jr." value={form.titulo} onChange={mudar("titulo")} erro={erros.titulo}
            required maxLength={150} />
          <div className="form-grid">
            <SelectField label="Tipo" placeholder="Emprego, estágio ou projeto acadêmico" value={form.tipo} onChange={mudar("tipo")}
              options={TIPOS_VAGA} erro={erros.tipo} required />
            <SelectField label="Modalidade" placeholder="Presencial, híbrido ou remoto" value={form.modalidade} onChange={mudar("modalidade")}
              options={MODALIDADES} erro={erros.modalidade} required />
          </div>
          <div className={`field ${erros.areas ? "has-error" : ""}`}>
            <span className="field-label">Áreas de atuação <b className="obrigatorio">*</b></span>
            <div className="area-chips" role="group" aria-label="Áreas de atuação">
              {(areas.dados ?? []).map((area) => {
                const marcada = form.areas.includes(area.id);
                return (
                  <button type="button" key={area.id} className={marcada ? "selected" : ""} aria-pressed={marcada} onClick={() => alternarArea(area.id)}>
                    {marcada && <Icon name="check" size={13} />} {area.nome}
                  </button>
                );
              })}
            </div>
            <small className={erros.areas ? "field-error" : "field-hint"}>{erros.areas || "Escolha uma ou mais áreas. Elas são usadas nos filtros de busca."}</small>
          </div>
        </section>
        <section>
          <h2>Descrição e requisitos</h2>
          <p>Ajude os candidatos a entenderem a oportunidade.</p>
          <TextAreaField label="Descrição" placeholder="Descreva as atividades e responsabilidades da vaga..." rows={5} value={form.descricao}
            onChange={mudar("descricao")} erro={erros.descricao} required maxLength={5000} />
          <TextAreaField label="Requisitos" placeholder="Um requisito por linha. Ex.: Conhecimentos em Java" rows={4} value={form.requisitos}
            onChange={mudar("requisitos")} erro={erros.requisitos} maxLength={5000} />
        </section>
        <section>
          <h2>Prazo de inscrição</h2>
          <p>Defina até quando as candidaturas serão recebidas.</p>
          <Field label="Data de encerramento" placeholder="dd/mm/aaaa" type="date" value={form.prazoInscricao} onChange={mudar("prazoInscricao")}
            erro={erros.prazoInscricao} min={hojeIso()} required />
        </section>
        <div className="form-actions">
          <Button variant="ghost" onClick={() => voltarOu(edicao ? "/empresa/vagas" : "/empresa")}>Cancelar</Button>
          <Button type="submit" carregando={salvando}>{edicao ? "Salvar alterações" : "Publicar vaga"}</Button>
        </div>
      </form>
    </>
  );
}

type FiltroVagas = "todas" | "ativas" | "encerradas";

export function CompanyJobs() {
  const { dados, erro, carregando, recarregar } = useDados(() => api.minhasVagas(), []);
  const [filtro, setFiltro] = useState<FiltroVagas>("todas");
  const [confirmando, setConfirmando] = useState<number | null>(null);
  const [ocupada, setOcupada] = useState<number | null>(null);

  if (carregando) return <Carregando />;
  if (erro || !dados) return <ErroCarregar erro={erro} tentarDeNovo={recarregar} />;

  const ativas = dados.filter((v) => v.inscricoesAbertas);
  const encerradas = dados.filter((v) => !v.inscricoesAbertas);
  const visiveis = filtro === "ativas" ? ativas : filtro === "encerradas" ? encerradas : dados;

  const executar = (vaga: VagaEmpresa, acao: () => Promise<unknown>, mensagem: string) => tentar(async () => {
    await acao();
    avisar(mensagem);
    setConfirmando(null);
    recarregar();
  }, (ocupado) => setOcupada(ocupado ? vaga.id : null));

  return (
    <>
      <PageHeader title="Minhas vagas" subtitle="Gerencie todas as oportunidades da sua organização." action={<BotaoPublicar />} />
      <Abas abas={[["todas", "Todas", dados.length], ["ativas", "Ativas", ativas.length], ["encerradas", "Encerradas", encerradas.length]]}
        atual={filtro} escolher={setFiltro} />
      {dados.length === 0 ? (
        <Vazio icone="briefcase" titulo="Nenhuma vaga publicada" texto="Publique sua primeira oportunidade para começar a receber candidaturas."
          acao={<BotaoPublicar />} />
      ) : visiveis.length === 0 ? (
        <Vazio icone="briefcase" titulo="Nenhuma vaga nesta aba" />
      ) : (
        <div className="managed-jobs">
          {visiveis.map((vaga) => (
            <article key={vaga.id}>
              <div className="managed-main">
                <div>
                  <SituacaoVaga vaga={vaga} />
                  <h3>{vaga.titulo}</h3>
                  <p>{rotuloTipo(vaga.tipo)} • {rotuloModalidade(vaga.modalidade)} • {vaga.areas.join(", ")}</p>
                </div>
              </div>
              <div className="managed-meta">
                <span>
                  <Icon name="users" /> <strong>{vaga.candidaturas}</strong> {plural(vaga.candidaturas, "candidatura", "candidaturas")}
                  {vaga.emAnalise > 0 && ` (${vaga.emAnalise} em análise)`}
                </span>
                <span><Icon name="clock" /> Prazo: {dataCurta(vaga.prazoInscricao)}</span>
              </div>
              {confirmando === vaga.id ? (
                <div className="managed-actions confirm-inline">
                  <span>
                    Remover a vaga e {vaga.candidaturas === 1 ? "a candidatura recebida" : `as ${vaga.candidaturas} candidaturas`}? Os candidatos serão avisados.
                  </span>
                  <Button variant="ghost" onClick={() => setConfirmando(null)}>Cancelar</Button>
                  <Button variant="danger" carregando={ocupada === vaga.id} onClick={() => executar(vaga, () => api.removerVaga(vaga.id), "Vaga removida.")}>
                    Sim, remover
                  </Button>
                </div>
              ) : (
                <div className="managed-actions">
                  <Button variant="ghost" onClick={() => ir(`/empresa/vagas/${vaga.id}/editar`)}>Editar</Button>
                  <Button variant="secondary" onClick={() => verCandidatos(vaga.id)}>Ver candidatos</Button>
                  {vaga.status !== "aberta" ? (
                    <Button variant="ghost" carregando={ocupada === vaga.id} onClick={() => executar(vaga, () => api.reabrirVaga(vaga.id), "Inscrições reabertas.")}>
                      Reabrir
                    </Button>
                  ) : vaga.inscricoesAbertas && (
                    <Button variant="ghost" carregando={ocupada === vaga.id} onClick={() => executar(vaga, () => api.encerrarVaga(vaga.id), "Inscrições encerradas.")}>
                      Encerrar inscrições
                    </Button>
                  )}
                  <Button variant="danger" onClick={() => setConfirmando(vaga.id)}>Remover</Button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export function Candidates({ rota }: { rota: Rota }) {
  const idVaga = rota.query.get("vaga") ?? "";
  const status = rota.query.get("status") ?? "";
  const vagas = useDados(() => api.minhasVagas(), []);
  const lista = useDados(() => api.candidaturasRecebidas({ vaga: idVaga, status }), [idVaga, status]);
  const [busca, setBusca] = useState("");

  const vagaAtual = vagas.dados?.find((v) => String(v.id) === idVaga);
  const termo = busca.trim().toLowerCase();
  const visiveis = (lista.dados ?? []).filter((item) => !termo || item.nome.toLowerCase().includes(termo));
  const total = lista.dados?.length ?? 0;
  const filtrar = (campo: "vaga" | "status", valor: string) => substituir(comConsulta("/empresa/candidatos", { vaga: idVaga, status, [campo]: valor }));

  return (
    <>
      {idVaga && <button className="back-link page-back" onClick={() => voltarOu("/empresa/vagas")}>← Voltar para minhas vagas</button>}
      <PageHeader title={vagaAtual ? vagaAtual.titulo : "Candidatos"}
        subtitle={lista.carregando ? "Carregando..." : `${total} ${plural(total, "candidatura", "candidaturas")}${vagaAtual ? "" : " em todas as vagas"}`} />
      <div className="candidate-tools">
        <div className="mini-search">
          <Icon name="search" />
          <input placeholder="Buscar candidato" value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <select value={idVaga} onChange={(e) => filtrar("vaga", e.target.value)} aria-label="Filtrar por vaga">
          <option value="">Todas as vagas</option>
          {(vagas.dados ?? []).map((v) => <option key={v.id} value={v.id}>{v.titulo}</option>)}
        </select>
        <select value={status} onChange={(e) => filtrar("status", e.target.value)} aria-label="Filtrar por status">
          <option value="">Todos os status</option>
          {STATUS_CANDIDATURA.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      {lista.carregando ? (
        <Carregando />
      ) : lista.erro ? (
        <ErroCarregar erro={lista.erro} tentarDeNovo={lista.recarregar} />
      ) : visiveis.length === 0 ? (
        <Vazio icone="users" titulo={termo || status ? "Nenhum candidato encontrado" : "Nenhuma candidatura recebida"}
          texto={termo || status ? "Tente outro nome ou status." : "Quando alguém se candidatar, você recebe uma notificação e a candidatura aparece aqui."} />
      ) : (
        <div className="candidate-list">
          {visiveis.map((item) => (
            <article key={item.id}>
              <Avatar nome={item.nome} idUsuario={item.idCandidato} temFoto={item.temFoto} />
              <div className="candidate-name">
                <h3>{item.nome}</h3>
                <p>{item.curso ?? "Formação não informada"}{!vagaAtual && ` • ${item.tituloVaga}`}</p>
              </div>
              <div className="skill-tags">
                {item.habilidades.slice(0, 4).map((h) => <span key={h}>{h}</span>)}
                {item.habilidades.length === 0 && item.semExperiencia && <span>Primeira oportunidade</span>}
              </div>
              <Badge status={classeStatus(item.status)}>{rotuloStatus(item.status)}</Badge>
              <Button variant="secondary" onClick={() => ir(`/empresa/candidaturas/${item.id}`)}>Ver perfil</Button>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export function CandidateView({ idCandidatura }: { idCandidatura: number }) {
  const { dados, erro, carregando, recarregar, setDados } = useDados(() => api.candidaturaRecebida(idCandidatura), [idCandidatura]);
  const [decidindo, setDecidindo] = useState<StatusCandidatura | null>(null);
  const [abrindo, setAbrindo] = useState(false);

  if (carregando) return <Carregando />;
  if (erro || !dados) return <ErroCarregar erro={erro} tentarDeNovo={recarregar} />;
  const candidato = dados.candidato;
  const nome = primeiroNome(candidato.nome);

  const decidir = (status: StatusCandidatura) => tentar(async () => {
    setDados(await api.avaliarCandidatura(dados.id, status));
    avisar(status === "aprovado" ? `${nome} foi aprovado(a) e será notificado(a).`
      : status === "reprovado" ? `${nome} foi reprovado(a) e será notificado(a).` : "A candidatura voltou para análise.");
  }, (ocupado) => setDecidindo(ocupado ? status : null));

  const botaoDecisao = (status: StatusCandidatura, texto: string, variant?: "ghost" | "danger") =>
    dados.status !== status && <Button variant={variant} onClick={() => decidir(status)} carregando={decidindo === status}>{texto}</Button>;

  return (
    <>
      <button className="back-link page-back" onClick={() => voltarOu(comConsulta("/empresa/candidatos", { vaga: dados.idVaga }))}>← Voltar para candidatos</button>
      <div className="candidate-profile-head">
        <Avatar nome={candidato.nome} idUsuario={candidato.id} temFoto={candidato.temFoto} grande />
        <div>
          <h1>{candidato.nome}</h1>
          <p>{candidato.curso ? `Estudante de ${candidato.curso}` : "Formação não informada"}</p>
          <Badge status={classeStatus(dados.status)}>{rotuloStatus(dados.status)}</Badge>
        </div>
      </div>
      <p className="muted candidate-context">
        Candidatura para <strong>{dados.tituloVaga}</strong> ({rotuloTipo(dados.tipoVaga)}) enviada em {dataCompleta(dados.dataCandidatura)}.
      </p>
      <div className="candidate-profile-grid">
        <div>
          <section className="info-card">
            <h3>Formação</h3>
            <Formacao perfil={candidato} vazio="O candidato ainda não informou a formação." />
          </section>
          <section className="info-card">
            <h3>Área de interesse</h3>
            <p>{candidato.areaInteresse ?? "Não informada."}</p>
          </section>
          {candidato.sobre && (
            <section className="info-card">
              <h3>Sobre</h3>
              <p>{candidato.sobre}</p>
            </section>
          )}
          <section className="info-card">
            <h3>Habilidades</h3>
            <Habilidades lista={candidato.habilidades} vazio="Nenhuma habilidade cadastrada." />
          </section>
        </div>
        <aside>
          {candidato.curriculo ? (
            <CartaoArquivo vertical titulo="CURRÍCULO DO CANDIDATO" nome={candidato.curriculo.nomeArquivo} detalhe={`PDF • ${tamanhoArquivo(candidato.curriculo.tamanhoBytes)}`}>
              <Button variant="secondary" carregando={abrindo}
                onClick={() => tentar(() => abrirArquivo(() => api.curriculoDaCandidatura(dados.id)), setAbrindo)}>Visualizar currículo</Button>
            </CartaoArquivo>
          ) : (
            <CartaoArquivo vertical titulo="CURRÍCULO DO CANDIDATO" nome={candidato.semExperiencia ? "Em busca da primeira oportunidade" : "Sem currículo"}
              detalhe={candidato.semExperiencia ? "O candidato indicou que não possui experiência profissional." : "Currículo opcional para esta oportunidade."} />
          )}
          <section className="info-card contact-card">
            <h3>Contato</h3>
            <a href={`mailto:${candidato.email}`}><Icon name="mail" size={16} /> {candidato.email}</a>
            {candidato.telefone && <a href={`tel:${candidato.telefone.replace(/[^\d+]/g, "")}`}><Icon name="phone" size={16} /> {candidato.telefone}</a>}
          </section>
        </aside>
      </div>
      <div className="decision-bar">
        <div>
          <strong>Decisão da candidatura</strong>
          <span>
            {dados.status === "analise" ? "O candidato será notificado sobre a atualização."
              : `Decisão atual: ${rotuloStatus(dados.status).toLowerCase()}. Você pode mudar se precisar.`}
          </span>
        </div>
        {botaoDecisao("analise", "Voltar para análise", "ghost")}
        {botaoDecisao("reprovado", "Reprovar", "danger")}
        {botaoDecisao("aprovado", "Aprovar")}
      </div>
    </>
  );
}

const formularioEmpresa = (p: PerfilEmpresa): PerfilEmpresaFormulario => ({
  nome: p.nome, email: p.email, telefone: p.telefone ?? "", cnpjOuCodigo: p.cnpjOuCodigo, tipoInstituicao: p.tipoInstituicao, descricao: p.descricao ?? "",
});

export function CompanyProfile() {
  const { recarregarUsuario } = useSessao();
  const carregamento = useDados(() => api.perfilEmpresa(), []);
  const [form, setForm] = useState<PerfilEmpresaFormulario | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (carregamento.dados) setForm(formularioEmpresa(carregamento.dados));
  }, [carregamento.dados]);

  if (carregamento.carregando || (carregamento.dados && !form)) return <Carregando />;
  if (carregamento.erro || !form) return <ErroCarregar erro={carregamento.erro} tentarDeNovo={carregamento.recarregar} />;

  const mudar = (campo: keyof PerfilEmpresaFormulario) => (valor: string) => setForm({ ...form, [campo]: valor });

  const salvar = async (e: FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setErros({});
    setErroGeral("");
    try {
      setForm(formularioEmpresa(await api.salvarPerfilEmpresa(form)));
      await recarregarUsuario();
      avisar("Perfil da empresa salvo.");
    } catch (falha) {
      setErros(errosDe(falha));
      setErroGeral(mensagemDe(falha));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <>
      <PageHeader title="Perfil da organização" subtitle="Essas informações aparecem para os candidatos nas suas vagas." />
      <form className="profile-form" onSubmit={salvar} noValidate>
        <Alerta>{erroGeral}</Alerta>
        <Secao icon="building" title="Dados institucionais" description="Nome, contato e identificação da empresa ou instituição.">
          <EditorDeFoto nome={form.nome} empresa />
          <div className="form-grid">
            <Field label="Nome da empresa ou instituição" placeholder="Nome da organização" value={form.nome} onChange={mudar("nome")} erro={erros.nome}
              required maxLength={150} />
            <Field label="E-mail" placeholder="contato@empresa.com" type="email" value={form.email} onChange={mudar("email")} erro={erros.email} required />
            <Field label="Telefone" placeholder="(00) 0000-0000" type="tel" value={form.telefone} onChange={mudar("telefone")} erro={erros.telefone} maxLength={20} />
            <Field label="CNPJ ou código da instituição" placeholder="00.000.000/0000-00" value={form.cnpjOuCodigo} onChange={mudar("cnpjOuCodigo")}
              erro={erros.cnpjOuCodigo} required maxLength={30} />
            <SelectField label="Tipo de organização" placeholder="Selecione" value={form.tipoInstituicao} onChange={mudar("tipoInstituicao")}
              options={TIPOS_INSTITUICAO} erro={erros.tipoInstituicao} required />
          </div>
          <TextAreaField label="Sobre a organização" placeholder="Conte o que a empresa ou instituição faz e o que oferece aos candidatos."
            value={form.descricao} onChange={mudar("descricao")} erro={erros.descricao} rows={5} maxLength={2000} />
        </Secao>
        <div className="profile-form-actions">
          <Button variant="ghost" onClick={() => ir("/empresa")}>Cancelar</Button>
          <Button type="submit" carregando={salvando}>Salvar alterações</Button>
        </div>
      </form>
    </>
  );
}
