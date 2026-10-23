import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, limparToken, quandoSessaoExpirar, salvarToken, tokenAtual, type AuthResposta, type Usuario } from "./api";

type Sessao = {
  usuario: Usuario | null;
  carregando: boolean;
  entrar: (resposta: AuthResposta, lembrar: boolean) => void;
  sair: () => void;
  recarregarUsuario: () => Promise<void>;
};

const ContextoSessao = createContext<Sessao>(null!);

export function SessaoProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(() => tokenAtual() !== null);

  useEffect(() => {
    quandoSessaoExpirar(() => setUsuario(null));
    if (!tokenAtual()) return;
    api.eu().then(setUsuario).catch(limparToken).finally(() => setCarregando(false));
  }, []);

  const sessao: Sessao = {
    usuario,
    carregando,
    entrar: (resposta, lembrar) => {
      salvarToken(resposta.token, lembrar);
      setUsuario(resposta.usuario);
    },
    sair: () => {
      limparToken();
      setUsuario(null);
    },
    recarregarUsuario: async () => {
      if (tokenAtual()) setUsuario(await api.eu());
    },
  };
  return <ContextoSessao.Provider value={sessao}>{children}</ContextoSessao.Provider>;
}

export const useSessao = () => useContext(ContextoSessao);

export const inicioDe = (usuario: Usuario | null) => (!usuario ? "/" : usuario.tipo === "empregador" ? "/empresa" : "/inicio");
