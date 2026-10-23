import { useEffect, useState, type ReactNode } from "react";
import { api, type Usuario } from "./api";
import { Applications, CandidateDashboard, PerfilForm, Profile } from "./paginas/Candidato";
import { EVENTO_NOTIFICACOES, Notifications } from "./paginas/Comum";
import { CandidateView, Candidates, CompanyDashboard, CompanyJobs, CompanyProfile, VagaForm } from "./paginas/Empresa";
import { Landing, Login, Register } from "./paginas/Publico";
import { ApplyPage, JobDetail, SearchPage } from "./paginas/Vagas";
import { comConsulta, ir, substituir, useRota, type Rota } from "./rotas";
import { SessaoProvider, inicioDe, useSessao } from "./sessao";
import { Avatar, Avisos, Button, Carregando, Icon, Logo, Vazio, type IconName } from "./ui";

type ItemMenu = { label: string; icon: IconName; caminho: string };

const menuCandidato: ItemMenu[] = [
  { label: "Início", icon: "home", caminho: "/inicio" },
  { label: "Buscar oportunidades", icon: "search", caminho: "/vagas" },
  { label: "Minhas candidaturas", icon: "file", caminho: "/candidaturas" },
  { label: "Notificações", icon: "bell", caminho: "/notificacoes" },
  { label: "Meu perfil", icon: "user", caminho: "/perfil" },
];

const menuEmpresa: ItemMenu[] = [
  { label: "Início", icon: "home", caminho: "/empresa" },
  { label: "Publicar vaga", icon: "plus", caminho: "/empresa/publicar" },
  { label: "Minhas vagas", icon: "briefcase", caminho: "/empresa/vagas" },
  { label: "Candidatos", icon: "users", caminho: "/empresa/candidatos" },
  { label: "Notificações", icon: "bell", caminho: "/notificacoes" },
  { label: "Meu perfil", icon: "building", caminho: "/empresa/perfil" },
];

const menuVisitante: ItemMenu[] = [
  { label: "Início", icon: "home", caminho: "/" },
  { label: "Buscar oportunidades", icon: "search", caminho: "/vagas" },
];

// o item do menu tambem fica ativo nas telas "filhas" (/vagas/3 ativa "Buscar oportunidades")
function estaAtivo(item: string, atual: string) {
  if (item === atual) return true;
  if (item === "/empresa/candidatos" && atual.startsWith("/empresa/candidaturas/")) return true;
  if (["/", "/inicio", "/empresa"].includes(item)) return false;
  return atual.startsWith(`${item}/`);
}

function AppShell({ children, rota, usuario, naoLidas }: { children: ReactNode; rota: Rota; usuario: Usuario | null; naoLidas: number }) {
  const { sair } = useSessao();
  const empresa = usuario?.tipo === "empregador";
  const menu = !usuario ? menuVisitante : empresa ? menuEmpresa : menuCandidato;
  const inicio = inicioDe(usuario);
  const entrar = () => ir(comConsulta("/entrar", { voltar: rota.caminho }));
  const sairDaConta = () => {
    sair();
    substituir("/");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Logo destino={inicio} />
        {usuario ? (
          <div className="side-profile">
            <Avatar nome={usuario.nome} idUsuario={usuario.id} temFoto={usuario.temFoto} empresa={empresa} />
            <div>
              <strong>{usuario.nome}</strong>
              <span>{empresa ? "Conta empresarial" : "Candidato"}</span>
            </div>
          </div>
        ) : (
          <div className="side-profile side-visitor">
            <div><strong>Bem-vindo(a)!</strong><span>Entre para se candidatar</span></div>
          </div>
        )}
        <nav>
          {menu.map((item) => (
            <button key={item.caminho} className={estaAtivo(item.caminho, rota.caminho) ? "active" : ""} onClick={() => ir(item.caminho)}>
              <Icon name={item.icon} />
              {item.label}
              {item.caminho === "/notificacoes" && naoLidas > 0 && <i>{naoLidas > 99 ? "99+" : naoLidas}</i>}
            </button>
          ))}
        </nav>
        {usuario ? (
          <button className="exit" onClick={sairDaConta}><Icon name="logout" />Sair</button>
        ) : (
          <div className="visitor-actions">
            <Button onClick={entrar}>Entrar</Button>
            <Button variant="secondary" onClick={() => ir("/cadastro")}>Criar conta</Button>
          </div>
        )}
      </aside>
      <div className="shell-main">
        <header className="mobile-header">
          <Logo destino={inicio} />
          {usuario ? (
            <div className="mobile-header-actions">
              <button className="icon-btn notification" onClick={() => ir("/notificacoes")} aria-label="Notificações">
                <Icon name="bell" />
                {naoLidas > 0 && <i></i>}
              </button>
              <button className="icon-btn" onClick={sairDaConta} aria-label="Sair"><Icon name="logout" /></button>
            </div>
          ) : (
            <Button onClick={entrar}>Entrar</Button>
          )}
        </header>
        <main>{children}</main>
        <nav className="bottom-nav">
          {menu.slice(0, 5).map((item) => (
            <button key={item.caminho} className={estaAtivo(item.caminho, rota.caminho) ? "active" : ""} onClick={() => ir(item.caminho)}>
              <Icon name={item.icon} />
              <span>{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// numero de notificacoes nao lidas: atualiza ao trocar de tela, a cada minuto e quando uma e lida
function useNaoLidas(usuario: Usuario | null, caminho: string) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!usuario) return setTotal(0);
    let ativo = true;
    const atualizar = () => api.naoLidas().then((r) => ativo && setTotal(r.total)).catch(() => undefined);
    atualizar();
    const intervalo = setInterval(atualizar, 60_000);
    window.addEventListener(EVENTO_NOTIFICACOES, atualizar);
    return () => {
      ativo = false;
      clearInterval(intervalo);
      window.removeEventListener(EVENTO_NOTIFICACOES, atualizar);
    };
  }, [usuario, caminho]);
  return total;
}

function Redirecionar({ para }: { para: string }) {
  useEffect(() => substituir(para), [para]);
  return null;
}

function NaoEncontrada() {
  const { usuario } = useSessao();
  return (
    <Vazio titulo="Página não encontrada" texto="O endereço pode ter mudado ou a página foi removida."
      acao={<Button onClick={() => ir(inicioDe(usuario))}>Ir para o início</Button>} />
  );
}

function numero(texto?: string) {
  const valor = Number(texto);
  return Number.isInteger(valor) && valor > 0 ? valor : null;
}

type Tela = { conteudo: ReactNode; exige?: "candidato" | "empregador"; semMenu?: boolean };

function escolherTela(rota: Rota, naoLidas: number): Tela | null {
  const [primeira, segunda, terceira, quarta] = rota.partes;
  const id = numero(segunda);
  const candidato = (conteudo: ReactNode): Tela => ({ conteudo, exige: "candidato" });
  const empresa = (conteudo: ReactNode): Tela => ({ conteudo, exige: "empregador" });

  if (!primeira) return { conteudo: <Landing />, semMenu: true };
  if (primeira === "entrar") return { conteudo: <Login voltar={rota.query.get("voltar")} />, semMenu: true };
  if (primeira === "cadastro") return { conteudo: <Register tipoInicial={rota.query.get("tipo")} />, semMenu: true };
  if (primeira === "notificacoes") return { conteudo: <Notifications /> };
  if (primeira === "inicio") return candidato(<CandidateDashboard naoLidas={naoLidas} />);
  if (primeira === "candidaturas") return candidato(<Applications />);

  if (primeira === "vagas") {
    if (!segunda) return { conteudo: <SearchPage rota={rota} /> };
    if (id && terceira === "candidatar") return { conteudo: <ApplyPage idVaga={id} />, exige: "candidato", semMenu: true };
    if (id && !terceira) return { conteudo: <JobDetail idVaga={id} /> };
  }
  if (primeira === "perfil") {
    if (!segunda) return candidato(<Profile />);
    if (segunda === "completar" || segunda === "editar") return candidato(<PerfilForm modo={segunda} key={segunda} />);
  }
  if (primeira === "empresa") {
    const idSub = numero(terceira);
    if (!segunda) return empresa(<CompanyDashboard />);
    if (segunda === "publicar") return empresa(<VagaForm />);
    if (segunda === "vagas" && !terceira) return empresa(<CompanyJobs />);
    if (segunda === "vagas" && idSub && quarta === "editar") return empresa(<VagaForm idVaga={idSub} key={idSub} />);
    if (segunda === "candidatos") return empresa(<Candidates rota={rota} />);
    if (segunda === "candidaturas" && idSub) return empresa(<CandidateView idCandidatura={idSub} />);
    if (segunda === "perfil") return empresa(<CompanyProfile />);
  }
  return null;
}

function Rotas() {
  const rota = useRota();
  const { usuario, carregando } = useSessao();
  const naoLidas = useNaoLidas(usuario, rota.caminho);

  if (carregando) return <Carregando texto="Abrindo o ConectIn..." />;

  // quem ja entrou nao precisa da pagina inicial, de entrar nem de criar conta
  const publica = !rota.partes[0] || rota.partes[0] === "entrar" || rota.partes[0] === "cadastro";
  if (usuario && publica) return <Redirecionar para={inicioDe(usuario)} />;

  const tela: Tela = escolherTela(rota, naoLidas) ?? { conteudo: <NaoEncontrada /> };
  if ((tela.exige || rota.partes[0] === "notificacoes") && !usuario) {
    const atual = rota.query.toString() ? `${rota.caminho}?${rota.query}` : rota.caminho;
    return <Redirecionar para={comConsulta("/entrar", { voltar: atual })} />;
  }
  if (tela.exige && usuario && usuario.tipo !== tela.exige) return <Redirecionar para={inicioDe(usuario)} />;
  if (tela.semMenu) return <>{tela.conteudo}</>;
  return <AppShell rota={rota} usuario={usuario} naoLidas={naoLidas}>{tela.conteudo}</AppShell>;
}

export default function App() {
  return (
    <SessaoProvider>
      <Rotas />
      <Avisos />
    </SessaoProvider>
  );
}
