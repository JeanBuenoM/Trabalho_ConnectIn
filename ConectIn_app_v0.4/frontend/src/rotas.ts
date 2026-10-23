// navegacao pelo # da url (#/vagas/12), assim o voltar do navegador funciona e o Spring nao precisa saber das rotas
import { useEffect, useState } from "react";
import { consulta } from "./api";

export type Rota = { caminho: string; partes: string[]; query: URLSearchParams };

function lerRota(): Rota {
  const [bruto, busca = ""] = (window.location.hash.replace(/^#/, "") || "/").split("?");
  const caminho = bruto.startsWith("/") ? bruto : `/${bruto}`;
  return { caminho, partes: caminho.split("/").filter(Boolean), query: new URLSearchParams(busca) };
}

let navegouNoApp = false;
let substituindo = false;

export function voltarOu(caminho: string) {
  if (navegouNoApp) history.back();
  else ir(caminho);
}

export function useRota(): Rota {
  const [rota, setRota] = useState(lerRota);
  useEffect(() => {
    const aoMudar = () => {
      if (substituindo) substituindo = false;
      else navegouNoApp = true;
      setRota((anterior) => {
        const nova = lerRota();
        if (nova.caminho !== anterior.caminho) window.scrollTo(0, 0);
        return nova;
      });
    };
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);
  return rota;
}

export function ir(caminho: string) {
  if (`#${caminho}` !== window.location.hash) window.location.hash = caminho;
}

// troca a tela sem criar historico
export function substituir(caminho: string) {
  history.replaceState(null, "", `#${caminho}`);
  substituindo = true;
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export const comConsulta = (caminho: string, parametros: Record<string, string | number | null | undefined>) =>
  caminho + consulta(parametros);
