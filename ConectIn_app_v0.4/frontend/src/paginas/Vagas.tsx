import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { api, ErroApi, type PerfilCandidato, type VagaDetalhe, type VagaResumo } from "../api";
import { MODALIDADES, TIPOS_VAGA, classeStatus, dataCompleta, dataLonga, linhas, primeiroNome, rotuloModalidade, rotuloStatus, rotuloTipo, tamanhoArquivo } from "../formatos";
import { comConsulta, ir, substituir, voltarOu, type Rota } from "../rotas";
import { useSessao } from "../sessao";
import { Alerta, Badge, Button, Carregando, CompanyLogo, ErroCarregar, EscolherArquivo, Icon, JobCard, PageHeader, SearchBar, SelectField, Vazio, ZonaDeEnvio, avisar, mensagemDe, tentar, useDados } from "../ui";

const POR_PAGINA = 12;

export function SearchPage({ rota }: { rota: Rota }) {
  const q = rota.query;
  const filtros = { busca: q.get("busca") ?? "", area: q.get("area") ?? "", tipo: q.get("tipo") ?? "", modalidade: q.get("modalidade") ?? "", ordem: q.get("ordem") ?? "recentes" };
  const areas = useDados(() => api.areas(), []);
  const [texto, setTexto] = useState(filtros.busca);
  const [vagas, setVagas] = useState<VagaResumo[]>([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState<unknown>(null);

  useEffect(() => setTexto(filtros.busca), [filtros.busca]);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro(null);
    api.vagas({ ...filtros, pagina: 0, tamanho: POR_PAGINA })
      .then((r) => {
        if (!ativo) return;
        setVagas(r.itens);
        setTotal(r.total);
        setPagina(0);
      })
      .catch((falha) => ativo && setErro(falha))
      .finally(() => ativo && setCarregando(false));
    return () => { ativo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  const mudar = (campo: keyof typeof filtros, valor: string) => substituir(comConsulta("/vagas", { ...filtros, [campo]: valor }));
  const limpar = () => substituir("/vagas");

  const carregarMais = () => tentar(async () => {
    const r = await api.vagas({ ...filtros, pagina: pagina + 1, tamanho: POR_PAGINA });
    setVagas((atuais) => [...atuais, ...r.itens]);
    setTotal(r.total);
    setPagina(pagina + 1);
  }, setCarregandoMais);

  const temFiltro = filtros.busca || filtros.area || filtros.tipo || filtros.modalidade;

  return (
    <>
      <PageHeader title="Buscar oportunidades" subtitle="Encontre a oportunidade ideal para o seu momento." />
      <div className="search-panel">
        <SearchBar value={texto} onChange={setTexto} onBuscar={() => mudar("busca", texto.trim())} />
        <div className="filter-row">
          <SelectField label="Área de atuação" placeholder="Todas as áreas" todas value={filtros.area} onChange={(v) => mudar("area", v)}
            options={(areas.dados ?? []).map((a) => ({ value: String(a.id), label: a.nome }))} />
          <SelectField label="Tipo de vaga" placeholder="Todos os tipos" todas value={filtros.tipo} onChange={(v) => mudar("tipo", v)} options={TIPOS_VAGA} />
          <SelectField label="Modalidade" placeholder="Todas" todas value={filtros.modalidade} onChange={(v) => mudar("modalidade", v)} options={MODALIDADES} />
          <button className="clear-filter" onClick={limpar} disabled={!temFiltro}>Limpar filtros</button>
        </div>
      </div>
      <div className="results-title">
        <div>
          <h2>Oportunidades encontradas</h2>
          <span>{carregando ? "Buscando..." : `${total} ${total === 1 ? "resultado" : "resultados"}`}</span>
        </div>
        <select value={filtros.ordem} onChange={(e) => mudar("ordem", e.target.value)} aria-label="Ordenar">
          <option value="recentes">Mais recentes</option>
          <option value="prazo">Prazo próximo</option>
        </select>
      </div>
      {carregando ? (
        <Carregando texto="Buscando oportunidades..." />
      ) : erro ? (
        <ErroCarregar erro={erro} tentarDeNovo={() => substituir(comConsulta("/vagas", filtros))} />
      ) : vagas.length === 0 ? (
        <Vazio titulo="Nenhuma vaga encontrada"
          texto={temFiltro ? "Tente outros filtros ou palavras-chave." : "Ainda não há vagas com inscrições abertas. Volte em breve!"}
          acao={temFiltro && <Button variant="secondary" onClick={limpar}>Limpar filtros</Button>} />
      ) : (
        <>
          <div className="results-list">
            {vagas.map((vaga) => <JobCard detail key={vaga.id} job={vaga} onOpen={() => ir(`/vagas/${vaga.id}`)} />)}
          </div>
          {vagas.length < total && (
            <div className="load-more">
              <Button variant="secondary" onClick={carregarMais} carregando={carregandoMais}>Carregar mais oportunidades</Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

function AcaoCandidatura({ vaga }: { vaga: VagaDetalhe }) {
  const { usuario } = useSessao();
  const candidatar = `/vagas/${vaga.id}/candidatar`;
  if (usuario?.tipo === "empregador") {
    return usuario.id === vaga.idEmpresa ? <Button variant="secondary" onClick={() => ir(`/empresa/vagas/${vaga.id}/editar`)}>Editar vaga</Button> : null;
  }
  if (vaga.statusCandidatura) return <Button variant="secondary" icon="check" onClick={() => ir("/candidaturas")}>Candidatura enviada</Button>;
  if (!vaga.inscricoesAbertas) return <Button disabled>Inscrições encerradas</Button>;
  if (!usuario) return <Button onClick={() => ir(comConsulta("/entrar", { voltar: candidatar }))}>Entrar para se candidatar</Button>;
  return <Button onClick={() => ir(candidatar)}>Candidatar-se</Button>;
}

export function JobDetail({ idVaga }: { idVaga: number }) {
  const { usuario } = useSessao();
  const { dados: vaga, erro, carregando, recarregar } = useDados(() => api.vaga(idVaga), [idVaga, usuario?.id]);

  if (carregando) return <Carregando />;
  if (erro || !vaga) return <ErroCarregar erro={erro} tentarDeNovo={recarregar} />;

  const requisitos = linhas(vaga.requisitos);
  const tipo = rotuloTipo(vaga.tipo);
  const modalidade = rotuloModalidade(vaga.modalidade);

  return (
    <>
      <button className="back-link page-back" onClick={() => voltarOu("/vagas")}>← Voltar para oportunidades</button>
      <div className="job-detail-header">
        <div className="job-title-block">
          <CompanyLogo nome={vaga.empresa} id={vaga.idEmpresa} />
          <div>
            <p className="eyebrow">OPORTUNIDADE</p>
            <h1>{vaga.titulo}</h1>
            <p>{vaga.empresa}</p>
          </div>
        </div>
        <AcaoCandidatura vaga={vaga} />
      </div>
      <div className="detail-tags">
        <Badge>{tipo}</Badge>
        <Badge>{modalidade}</Badge>
        {vaga.areas.map((area) => <Badge key={area.id}>{area.nome}</Badge>)}
        {vaga.statusCandidatura && <Badge status={classeStatus(vaga.statusCandidatura)}>{rotuloStatus(vaga.statusCandidatura)}</Badge>}
        <span>
          <Icon name="clock" size={17} />{" "}
          {vaga.inscricoesAbertas ? `Inscrições até ${dataLonga(vaga.prazoInscricao)}` : `Inscrições encerradas (prazo: ${dataLonga(vaga.prazoInscricao)})`}
        </span>
      </div>
      <div className="detail-layout">
        <div className="detail-content">
          <section>
            <h2>Sobre a oportunidade</h2>
            {linhas(vaga.descricao).map((p, i) => <p key={i}>{p}</p>)}
          </section>
          {requisitos.length > 0 && (
            <section>
              <h2>Requisitos</h2>
              <ul>{requisitos.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </section>
          )}
          <section>
            <h2>Área de atuação</h2>
            {vaga.areas.map((area) => (
              <div className="area-card" key={area.id}>
                <div className="feature-icon"><Icon name="briefcase" /></div>
                <div>
                  <strong>{area.nome}</strong>
                  <p>{tipo} • {modalidade}</p>
                </div>
              </div>
            ))}
          </section>
          {vaga.descricaoEmpresa && (
            <section>
              <h2>Sobre {vaga.empresa}</h2>
              <p>{vaga.descricaoEmpresa}</p>
            </section>
          )}
        </div>
        <aside className="detail-aside">
          <h3>Resumo da oportunidade</h3>
          <dl>
            <div><dt>Tipo</dt><dd>{tipo}</dd></div>
            <div><dt>Modalidade</dt><dd>{modalidade}</dd></div>
            <div><dt>Área</dt><dd>{vaga.areas.map((a) => a.nome).join(", ")}</dd></div>
            <div><dt>Prazo</dt><dd>{dataLonga(vaga.prazoInscricao)}</dd></div>
          </dl>
          <AcaoCandidatura vaga={vaga} />
          {usuario?.tipo !== "empregador" && (
            <small>
              {vaga.tipo === "emprego"
                ? "Para vagas de emprego é preciso ter um currículo em PDF no perfil."
                : "Currículo opcional: você pode indicar que busca sua primeira oportunidade."}
            </small>
          )}
        </aside>
      </div>
    </>
  );
}

const Modal = ({ children }: { children: ReactNode }) => (
  <div className="modal-page"><div className="application-modal">{children}</div></div>
);

export function ApplyPage({ idVaga }: { idVaga: number }) {
  const carregamento = useDados(() => Promise.all([api.vaga(idVaga), api.perfilCandidato()]), [idVaga]);
  const [perfil, setPerfil] = useState<PerfilCandidato | null>(null);
  const [confirmo, setConfirmo] = useState(false);
  const [semExperiencia, setSemExperiencia] = useState(false);
  const [enviandoCurriculo, setEnviandoCurriculo] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [feito, setFeito] = useState(false);

  useEffect(() => {
    if (!carregamento.dados) return;
    setPerfil(carregamento.dados[1]);
    setSemExperiencia(carregamento.dados[1].semExperiencia);
  }, [carregamento.dados]);

  const fechar = () => voltarOu(`/vagas/${idVaga}`);

  if (carregamento.carregando || (carregamento.dados && !perfil)) return <Modal><Carregando /></Modal>;
  if (carregamento.erro || !carregamento.dados || !perfil) {
    return <Modal><ErroCarregar erro={carregamento.erro} tentarDeNovo={carregamento.recarregar} /></Modal>;
  }

  const vaga = carregamento.dados[0];
  const academica = vaga.tipo !== "emprego";
  const precisaCurriculo = !academica && !perfil.curriculo;

  const enviarCurriculo = async (arquivo: File) => {
    setEnviandoCurriculo(true);
    setErro("");
    try {
      setPerfil({ ...perfil, curriculo: await api.enviarCurriculo(arquivo) });
      avisar("Currículo enviado.");
    } catch (falha) {
      setErro(mensagemDe(falha));
    } finally {
      setEnviandoCurriculo(false);
    }
  };

  const confirmar = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirmo) return setErro("Marque a confirmação para enviar a candidatura.");
    setErro("");
    setEnviando(true);
    try {
      await api.candidatar(vaga.id, academica && semExperiencia);
      setFeito(true);
    } catch (falha) {
      // 409 = ja tinha se candidatado
      if (falha instanceof ErroApi && falha.status === 409) setFeito(true);
      else setErro(mensagemDe(falha));
    } finally {
      setEnviando(false);
    }
  };

  const bloqueio = vaga.statusCandidatura ? "Você já se candidatou a esta vaga." : !vaga.inscricoesAbertas ? "As inscrições para esta vaga estão encerradas." : "";

  if (feito) {
    return (
      <Modal>
        <div className="success-state">
          <span><Icon name="check" size={30} /></span>
          <h2>Candidatura enviada!</h2>
          <p>Boa sorte, {primeiroNome(perfil.nome)}! A empresa foi avisada e você pode acompanhar o andamento em Minhas candidaturas.</p>
          <Button onClick={() => substituir("/candidaturas")}>Acompanhar candidatura</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <form onSubmit={confirmar}>
        <div className="modal-head">
          <div>
            <span>CONFIRMAR CANDIDATURA</span>
            <h2>{vaga.titulo}</h2>
            <p>{vaga.empresa} • {rotuloTipo(vaga.tipo)}</p>
          </div>
          <button type="button" onClick={fechar} aria-label="Fechar">×</button>
        </div>
        {bloqueio ? (
          <>
            <Alerta tipo="info">{bloqueio}</Alerta>
            <div className="modal-actions">
              <Button variant="ghost" onClick={fechar}>Voltar para a vaga</Button>
              <Button onClick={() => ir("/candidaturas")}>Minhas candidaturas</Button>
            </div>
          </>
        ) : (
          <>
            <Alerta>{erro}</Alerta>
            {perfil.curriculo ? (
              <div className="selected-resume">
                <div className="file-icon"><Icon name="file" /></div>
                <div>
                  <small>CURRÍCULO SELECIONADO</small>
                  <strong>{perfil.curriculo.nomeArquivo}</strong>
                  <span>
                    {tamanhoArquivo(perfil.curriculo.tamanhoBytes)}
                    {perfil.curriculo.atualizadoEm && ` • Atualizado em ${dataCompleta(perfil.curriculo.atualizadoEm)}`}
                  </span>
                </div>
                <EscolherArquivo aceitar="application/pdf,.pdf" aoEscolher={enviarCurriculo} variant="secondary" carregando={enviandoCurriculo}>
                  Alterar currículo
                </EscolherArquivo>
              </div>
            ) : precisaCurriculo ? (
              <div className="resume-required">
                <Alerta tipo="info">Vagas de emprego exigem currículo. Envie seu currículo em PDF para continuar.</Alerta>
                <ZonaDeEnvio aceitar="pdf" titulo="Arraste seu currículo aqui ou clique para selecionar" dica="Formato PDF • Tamanho máximo de 5 MB"
                  enviando={enviandoCurriculo} aoEscolher={enviarCurriculo} />
              </div>
            ) : (
              <Alerta tipo="info">Você ainda não tem currículo no perfil. Para {rotuloTipo(vaga.tipo).toLowerCase()} ele é opcional.</Alerta>
            )}
            <label className="check-row">
              <input type="checkbox" checked={confirmo} onChange={(e) => setConfirmo(e.target.checked)} />{" "}
              <span>
                <strong>Confirmo que desejo me candidatar</strong>
                <small>Ao continuar, seu perfil e currículo serão compartilhados com a empresa.</small>
              </span>
            </label>
            {academica && (
              <div className="academic-note">
                <strong>Não possui experiência profissional?</strong>
                <label>
                  <input type="checkbox" checked={semExperiencia} onChange={(e) => setSemExperiencia(e.target.checked)} /> Estou em busca da minha primeira oportunidade.
                </label>
              </div>
            )}
            <div className="modal-actions">
              <Button variant="ghost" onClick={fechar}>Cancelar</Button>
              <Button type="submit" carregando={enviando} disabled={precisaCurriculo}>Confirmar candidatura</Button>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
}
