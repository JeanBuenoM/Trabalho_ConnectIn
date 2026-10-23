import { useState, type FormEvent, type ReactNode } from "react";
import { api, type TipoUsuario } from "../api";
import { TIPOS_INSTITUICAO } from "../formatos";
import { ir, substituir } from "../rotas";
import { useSessao } from "../sessao";
import { Alerta, Badge, Button, CompanyLogo, Field, Icon, JobCard, Logo, SelectField, errosDe, mensagemDe, useDados, type IconName } from "../ui";

const BENEFICIOS: { icone: IconName; cor: string; titulo: string; texto: string }[] = [
  { icone: "search", cor: "", titulo: "Encontre oportunidades", texto: "Descubra vagas e projetos que realmente combinam com seus objetivos." },
  { icone: "user", cor: "purple", titulo: "Organize seu perfil", texto: "Apresente suas habilidades, formação e currículo de forma profissional." },
  { icone: "file", cor: "green", titulo: "Acompanhe candidaturas", texto: "Visualize cada etapa dos seus processos com clareza e praticidade." },
];

// os links do topo so rolam a pagina (o # ja e usado pelas rotas)
const rolarPara = (id: string) => (e: { preventDefault: () => void }) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Landing() {
  const destaques = useDados(() => api.vagas({ tamanho: 3 }), []);
  const numeros = useDados(() => api.estatisticas(), []).dados;
  const vagas = destaques.dados?.itens ?? [];
  const maisRecente = vagas[0];
  const talentos = numeros?.candidatos ?? 0;

  return (
    <div className="landing">
      <header className="topbar">
        <Logo />
        <nav>
          <a href="#inicio" onClick={rolarPara("inicio")}>Início</a>
          <a href="#oportunidades" onClick={rolarPara("oportunidades")}>Oportunidades</a>
          <a href="#sobre" onClick={rolarPara("sobre")}>Sobre</a>
        </nav>
        <div className="top-actions">
          <Button variant="ghost" onClick={() => ir("/entrar")}>Entrar</Button>
          <Button onClick={() => ir("/cadastro")}>Criar conta</Button>
        </div>
      </header>
      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <Badge><Icon name="sparkle" size={15} /> Seu futuro começa aqui</Badge>
            <h1>Encontre sua próxima <span>oportunidade</span></h1>
            <p>Vagas, estágios e oportunidades acadêmicas em um só lugar. Conecte seu talento às melhores possibilidades.</p>
            <div className="hero-actions">
              <Button onClick={() => ir("/vagas")}>Buscar oportunidades <Icon name="arrow" /></Button>
              <Button variant="secondary" onClick={() => ir("/cadastro")}>Criar minha conta</Button>
            </div>
            <div className="hero-trust">
              <div className="avatar-stack"><span>KM</span><span>JS</span><span>AL</span></div>
              <p>
                <strong>{talentos > 0 ? `${talentos} ${talentos === 1 ? "talento" : "talentos"}` : "Seja um dos primeiros"}</strong>
                <br />
                {talentos > 0 ? "já conectados" : "talentos conectados"}
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1690378820474-b468b8ee64d3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200"
                alt="Jovens profissionais colaborando em um ambiente de trabalho" />
            </div>
            <div className="float-card float-top">
              <span className="success-icon"><Icon name="check" size={17} /></span>
              <div>
                <strong>Inscrições abertas</strong>
                <small>{numeros ? `${numeros.vagasAbertas} ${numeros.vagasAbertas === 1 ? "vaga" : "vagas"} esperando você` : "Vagas, estágios e projetos"}</small>
              </div>
            </div>
            {maisRecente && (
              <div className="float-card float-bottom">
                <CompanyLogo nome={maisRecente.empresa} id={maisRecente.idEmpresa} />
                <div><strong>Nova oportunidade</strong><small>{maisRecente.titulo}</small></div>
              </div>
            )}
            <div className="dot-pattern"></div>
          </div>
        </section>
        <section className="benefits" id="sobre">
          <div className="section-heading">
            <span>UMA PLATAFORMA, MUITAS POSSIBILIDADES</span>
            <h2>Tudo o que você precisa para avançar</h2>
            <p>Uma jornada simples, organizada e feita para conectar você ao próximo passo.</p>
          </div>
          <div className="benefit-grid">
            {BENEFICIOS.map((b, i) => (
              <article key={b.titulo}>
                <div className={`feature-icon ${b.cor}`}><Icon name={b.icone} /></div>
                <span>0{i + 1}</span>
                <h3>{b.titulo}</h3>
                <p>{b.texto}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="featured" id="oportunidades">
          <div className="section-row">
            <div>
              <span>OPORTUNIDADES EM DESTAQUE</span>
              <h2>Seu próximo passo pode estar aqui</h2>
            </div>
            <button onClick={() => ir("/vagas")}>Ver todas <Icon name="arrow" /></button>
          </div>
          {destaques.carregando ? null : vagas.length === 0 ? (
            <p className="muted">Nenhuma vaga aberta no momento. Volte em breve!</p>
          ) : (
            <div className="jobs-grid">
              {vagas.map((vaga) => <JobCard key={vaga.id} job={vaga} onOpen={() => ir(`/vagas/${vaga.id}`)} />)}
            </div>
          )}
        </section>
        <section className="cta">
          <div>
            <span>PRONTO PARA COMEÇAR?</span>
            <h2>Conecte-se hoje às oportunidades de amanhã.</h2>
          </div>
          <Button onClick={() => ir("/cadastro")}>Criar conta gratuitamente <Icon name="arrow" /></Button>
        </section>
      </main>
      <footer>
        <Logo />
        <p>Conectando talentos, empresas e instituições.</p>
        <span>© {new Date().getFullYear()} ConectIn</span>
      </footer>
    </div>
  );
}

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Logo />
        <div>
          <span className="auth-kicker">CONECTE. CRESÇA. REALIZE.</span>
          <h1>O próximo passo da sua jornada começa aqui.</h1>
          <p>Oportunidades profissionais e acadêmicas feitas para o seu perfil.</p>
        </div>
        <div className="auth-proof">
          <Icon name="shield" />
          <span>
            <strong>Ambiente seguro e gratuito</strong>
            <small>Senhas criptografadas e currículos visíveis só para quem você se candidatar</small>
          </span>
        </div>
      </div>
      <div className="auth-panel">{children}</div>
    </div>
  );
}

// depois de entrar volta pra tela que pediu o login (?voltar=), se for do mesmo tipo de conta
function destinoDepoisDoLogin(voltar: string | null, tipo: TipoUsuario) {
  if (voltar?.startsWith("/") && !voltar.startsWith("//")) {
    if ((tipo === "empregador") === voltar.startsWith("/empresa") || voltar.startsWith("/notificacoes")) return voltar;
  }
  return tipo === "empregador" ? "/empresa" : "/inicio";
}

export function Login({ voltar }: { voltar: string | null }) {
  const { entrar } = useSessao();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(true);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !senha) return setErro("Informe seu e-mail e sua senha.");
    setErro("");
    setEnviando(true);
    try {
      const resposta = await api.entrar(email, senha);
      entrar(resposta, lembrar);
      substituir(destinoDepoisDoLogin(voltar, resposta.usuario.tipo));
    } catch (falha) {
      setErro(mensagemDe(falha));
      setEnviando(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-box">
        <button className="back-link" onClick={() => ir("/")}>← Voltar ao início</button>
        <div className="mobile-auth-logo"><Logo /></div>
        <h2>Boas-vindas de volta</h2>
        <p className="muted">{voltar ? "Entre na sua conta para continuar de onde parou." : "Entre na sua conta para continuar."}</p>
        <form onSubmit={enviar} noValidate>
          <Alerta>{erro}</Alerta>
          <Field label="E-mail" placeholder="seuemail@exemplo.com" type="email" value={email} onChange={setEmail} autoComplete="email" inputMode="email" />
          <Field label="Senha" placeholder="Digite sua senha" type="password" value={senha} onChange={setSenha} autoComplete="current-password" />
          <div className="form-helper">
            <label><input type="checkbox" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} /> Lembrar de mim</label>
          </div>
          <Button type="submit" carregando={enviando}>Entrar</Button>
        </form>
        <div className="divider"><span>ou</span></div>
        <p className="auth-switch">Ainda não possui uma conta? <button onClick={() => ir("/cadastro")}>Criar conta</button></p>
      </div>
    </AuthLayout>
  );
}

export function Register({ tipoInicial }: { tipoInicial: string | null }) {
  const { entrar } = useSessao();
  const [role, setRole] = useState<TipoUsuario | null>(tipoInicial === "empregador" || tipoInicial === "candidato" ? tipoInicial : null);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", confirmacao: "", cnpj: "", tipoInstituicao: "" });
  const [aceite, setAceite] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);
  const mudar = (campo: keyof typeof form) => (valor: string) => setForm({ ...form, [campo]: valor });
  const candidato = role === "candidato";

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (!role) return;
    const locais: Record<string, string> = {};
    if (form.senha && form.confirmacao !== form.senha) locais.confirmacao = "As senhas não são iguais.";
    if (!aceite) locais.aceite = "Para criar a conta, aceite os Termos de Uso e a Política de Privacidade.";
    setErros(locais);
    setErroGeral("");
    if (Object.keys(locais).length > 0) return;

    setEnviando(true);
    try {
      const { nome, email, senha, cnpj, tipoInstituicao } = form;
      const resposta = await api.cadastrar({ tipo: role, nome, email, senha, ...(candidato ? {} : { cnpjOuCodigo: cnpj, tipoInstituicao }) });
      entrar(resposta, true);
      substituir(candidato ? "/perfil/completar" : "/empresa");
    } catch (falha) {
      setErros(errosDe(falha));
      setErroGeral(mensagemDe(falha));
      setEnviando(false);
    }
  };

  const opcaoPerfil = (tipo: TipoUsuario, icone: IconName, titulo: string, texto: string) => (
    <button onClick={() => setRole(tipo)}>
      <span className={`role-icon ${tipo === "empregador" ? "purple" : ""}`}><Icon name={icone} size={26} /></span>
      <div><strong>{titulo}</strong><small>{texto}</small></div>
      <Icon name="arrow" />
    </button>
  );

  return (
    <AuthLayout>
      <div className="auth-box register-box">
        <button className="back-link" onClick={() => (role ? setRole(null) : ir("/"))}>← Voltar</button>
        <h2>{role ? "Crie sua conta" : "Como você deseja utilizar o ConectIn?"}</h2>
        <p className="muted">{role ? "Preencha os dados abaixo para começar." : "Escolha o perfil que melhor representa você."}</p>
        {!role ? (
          <div className="role-cards">
            {opcaoPerfil("candidato", "user", "Sou candidato", "Quero encontrar oportunidades")}
            {opcaoPerfil("empregador", "building", "Sou empregador", "Quero publicar oportunidades")}
          </div>
        ) : (
          <form onSubmit={enviar} noValidate>
            <Alerta>{erroGeral}</Alerta>
            <Field label={candidato ? "Nome completo" : "Nome da empresa ou instituição"} placeholder={candidato ? "Seu nome completo" : "Nome da organização"}
              value={form.nome} onChange={mudar("nome")} erro={erros.nome} autoComplete={candidato ? "name" : "organization"} maxLength={150} />
            <Field label="E-mail" placeholder="seuemail@exemplo.com" type="email" value={form.email} onChange={mudar("email")} erro={erros.email}
              autoComplete="email" inputMode="email" />
            {!candidato && (
              <div className="form-grid">
                <Field label="CNPJ ou código da instituição" placeholder="00.000.000/0000-00" value={form.cnpj} onChange={mudar("cnpj")}
                  erro={erros.cnpjOuCodigo} maxLength={30} />
                <SelectField label="Tipo de organização" placeholder="Selecione" value={form.tipoInstituicao} onChange={mudar("tipoInstituicao")}
                  options={TIPOS_INSTITUICAO} erro={erros.tipoInstituicao} />
              </div>
            )}
            <div className="form-grid">
              <Field label="Senha" placeholder="Mínimo de 8 caracteres" type="password" value={form.senha} onChange={mudar("senha")}
                erro={erros.senha} autoComplete="new-password" />
              <Field label="Confirmar senha" placeholder="Repita a senha" type="password" value={form.confirmacao} onChange={mudar("confirmacao")}
                erro={erros.confirmacao} autoComplete="new-password" />
            </div>
            <label className="terms">
              <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} /> Li e aceito os Termos de Uso e a Política de Privacidade.
            </label>
            {erros.aceite && <small className="field-error terms-error">{erros.aceite}</small>}
            <Button type="submit" carregando={enviando}>Criar minha conta</Button>
          </form>
        )}
        <p className="auth-switch">Já possui uma conta? <button onClick={() => ir("/entrar")}>Entrar</button></p>
      </div>
    </AuthLayout>
  );
}
