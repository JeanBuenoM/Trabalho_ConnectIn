import { api, type Notificacao } from "../api";
import { tempoRelativo } from "../formatos";
import { ir } from "../rotas";
import { useSessao } from "../sessao";
import { Button, Carregando, ErroCarregar, Icon, PageHeader, Vazio, tentar, useDados, type IconName } from "../ui";

// o menu escuta esse evento pra atualizar o numero de nao lidas
export const EVENTO_NOTIFICACOES = "conectin:notificacoes";
export const avisarMudancaNotificacoes = () => window.dispatchEvent(new Event(EVENTO_NOTIFICACOES));

const APARENCIA: Record<Notificacao["tipo"], { titulo: string; icone: IconName }> = {
  nova_vaga: { titulo: "Nova oportunidade compatível", icone: "briefcase" },
  status_candidatura: { titulo: "Atualização de candidatura", icone: "check" },
  nova_candidatura: { titulo: "Nova candidatura recebida", icone: "users" },
};

export function Notifications() {
  const { usuario } = useSessao();
  const { dados, erro, carregando, recarregar, setDados } = useDados(() => api.notificacoes(), []);
  const lista = dados ?? [];

  const marcarTodas = () => tentar(async () => {
    await api.marcarTodasLidas();
    setDados(lista.map((item) => ({ ...item, lida: true })));
    avisarMudancaNotificacoes();
  });

  const abrir = (item: Notificacao) => {
    if (!item.lida) {
      api.marcarLida(item.id).then(avisarMudancaNotificacoes).catch(() => undefined);
      setDados(lista.map((n) => (n.id === item.id ? { ...n, lida: true } : n)));
    }
    if (item.idReferencia === null) return;
    if (item.tipo === "nova_candidatura") ir(`/empresa/candidaturas/${item.idReferencia}`);
    else if (item.tipo === "status_candidatura" && usuario?.tipo === "candidato") ir("/candidaturas");
    else ir(`/vagas/${item.idReferencia}`);
  };

  return (
    <>
      <PageHeader title="Notificações" subtitle="Acompanhe novidades e atualizações importantes."
        action={lista.some((item) => !item.lida) && <button className="text-button" onClick={marcarTodas}>Marcar todas como lidas</button>} />
      {carregando ? (
        <Carregando />
      ) : erro ? (
        <ErroCarregar erro={erro} tentarDeNovo={recarregar} />
      ) : lista.length === 0 ? (
        <Vazio icone="bell" titulo="Nenhuma notificação por enquanto"
          texto={usuario?.tipo === "empregador"
            ? "Você será avisado aqui quando alguém se candidatar às suas vagas."
            : "Você será avisado aqui sobre vagas compatíveis com seu perfil e mudanças nas suas candidaturas."}
          acao={usuario?.tipo === "candidato" && <Button variant="secondary" onClick={() => ir("/perfil/editar")}>Completar meu perfil</Button>} />
      ) : (
        <div className="notification-list">
          {lista.map((item) => (
            <article key={item.id} className={`${item.lida ? "" : "unread"} ${item.idReferencia !== null ? "clickable" : ""}`}
              onClick={() => abrir(item)} tabIndex={item.idReferencia !== null ? 0 : undefined}
              onKeyDown={(e) => e.key === "Enter" && abrir(item)}>
              <span className="notification-icon"><Icon name={APARENCIA[item.tipo].icone} /></span>
              <div>
                <h3>{APARENCIA[item.tipo].titulo}</h3>
                <p>{item.mensagem}</p>
                <small>{tempoRelativo(item.dataEnvio)}</small>
              </div>
              {!item.lida && <i aria-label="Não lida"></i>}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
