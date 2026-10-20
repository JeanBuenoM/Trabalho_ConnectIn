import { useState, type ReactNode } from "react";

type Page =
  | "landing"
  | "login"
  | "register"
  | "dashboard"
  | "search"
  | "job"
  | "apply"
  | "applications"
  | "profile"
  | "profile-setup"
  | "profile-edit"
  | "notifications"
  | "company"
  | "publish"
  | "jobs"
  | "candidates"
  | "candidate";

type IconName =
  | "home"
  | "search"
  | "file"
  | "bell"
  | "user"
  | "settings"
  | "plus"
  | "briefcase"
  | "users"
  | "building"
  | "arrow"
  | "check"
  | "clock"
  | "bookmark"
  | "menu"
  | "logout"
  | "graduation"
  | "sparkle"
  | "shield";

const paths: Record<IconName, ReactNode> = {
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  file: <><path d="M6 2h8l4 4v16H6zM14 2v5h4M9 12h6M9 16h6" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19 13.5v-3l-2-.6-.7-1.7 1-1.8-2.1-2.1-1.8 1-1.7-.7-.6-2h-3l-.6 2-1.7.7-1.8-1-2.1 2.1 1 1.8-.7 1.7-2 .6v3l2 .6.7 1.7-1 1.8 2.1 2.1 1.8-1 1.7.7.6 2h3l.6-2 1.7-.7 1.8 1 2.1-2.1-1-1.8.7-1.7z" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
  users: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M16 5a4 4 0 0 1 0 7M17 15a6 6 0 0 1 5 6" /></>,
  building: <><path d="M4 22V4h11v18M15 9h5v13M8 8h3M8 12h3M8 16h3M2 22h20" /></>,
  arrow: <path d="m9 18 6-6-6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  logout: <><path d="M10 17l5-5-5-5M15 12H3M14 4h7v16h-7" /></>,
  graduation: <><path d="m2 9 10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5M22 9v6" /></>,
  sparkle: <><path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" /></>,
  shield: <><path d="M12 2 20 5v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" /><path d="m8.5 12 2 2 5-5" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <button className="logo" onClick={() => location.reload()} aria-label="ConectIn — início"><span className="logo-mark">C</span>{!compact && <span>Conect<span>In</span></span>}</button>;
}

const jobs = [
  { title: "Desenvolvedor Java Jr.", company: "Empresa XYZ", area: "Tecnologia", type: "Emprego", mode: "Híbrido", deadline: "18 jun", logo: "XY", color: "blue" },
  { title: "Estágio em Desenvolvimento", company: "Empresa ABC", area: "Tecnologia", type: "Estágio", mode: "Presencial", deadline: "24 jun", logo: "AB", color: "purple" },
  { title: "Projeto de Pesquisa em IA", company: "Instituto Horizonte", area: "Pesquisa", type: "Projeto acadêmico", mode: "Remoto", deadline: "30 jun", logo: "IH", color: "green" },
  { title: "Analista de Dados Jr.", company: "Nexora Labs", area: "Dados", type: "Emprego", mode: "Remoto", deadline: "04 jul", logo: "NL", color: "orange" },
];

function Button({ children, variant = "primary", onClick, icon, type = "button" }: { children: ReactNode; variant?: "primary" | "secondary" | "danger" | "ghost"; onClick?: () => void; icon?: IconName; type?: "button" | "submit" }) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick}>{icon && <Icon name={icon} size={18} />}{children}</button>;
}

function CompanyLogo({ letters, color = "blue" }: { letters: string; color?: string }) {
  return <div className={`company-logo logo-${color}`}>{letters}</div>;
}

function Badge({ children, status }: { children: ReactNode; status?: string }) {
  return <span className={`badge ${status ? `status-${status}` : ""}`}>{children}</span>;
}

function Field({ label, placeholder, type = "text", required = false, defaultValue }: { label: string; placeholder: string; type?: string; required?: boolean; defaultValue?: string }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span><input type={type} placeholder={placeholder} defaultValue={defaultValue} /></label>;
}

function SelectField({ label, placeholder, required = false, defaultValue = "" }: { label: string; placeholder: string; required?: boolean; defaultValue?: string }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span><select defaultValue={defaultValue}><option value="" disabled>{placeholder}</option><option>Tecnologia</option><option>Administração</option><option>Educação</option><option>Cursando</option><option>Concluído</option><option>Trancado</option></select></label>;
}

function SearchBar({ action }: { action?: () => void }) {
  return <div className="search-bar"><Icon name="search" /><input placeholder="Cargo, área ou palavra-chave" /><button onClick={action}>Buscar</button></div>;
}

function JobCard({ job, detail = false, onOpen }: { job: typeof jobs[0]; detail?: boolean; onOpen: () => void }) {
  return <article className={`job-card ${detail ? "job-row" : ""}`}>
    <div className="job-top"><CompanyLogo letters={job.logo} color={job.color} /><button className="icon-btn" aria-label="Salvar vaga"><Icon name="bookmark" size={19} /></button></div>
    <div><p className="eyebrow">{job.type}</p><h3>{job.title}</h3><p className="muted">{job.company}</p></div>
    <div className="tags"><Badge>{job.area}</Badge><Badge>{job.mode}</Badge></div>
    <div className="job-footer"><span><Icon name="clock" size={16} /> Até {job.deadline}</span><Button variant={detail ? "secondary" : "primary"} onClick={onOpen}>{detail ? "Ver detalhes" : "Ver vaga"}</Button></div>
  </article>;
}

const candidateNav: { label: string; icon: IconName; page: Page }[] = [
  { label: "Início", icon: "home", page: "dashboard" },
  { label: "Buscar oportunidades", icon: "search", page: "search" },
  { label: "Minhas candidaturas", icon: "file", page: "applications" },
  { label: "Notificações", icon: "bell", page: "notifications" },
  { label: "Meu perfil", icon: "user", page: "profile" },
  { label: "Configurações", icon: "settings", page: "profile" },
];

const companyNav: { label: string; icon: IconName; page: Page }[] = [
  { label: "Início", icon: "home", page: "company" },
  { label: "Publicar vaga", icon: "plus", page: "publish" },
  { label: "Minhas vagas", icon: "briefcase", page: "jobs" },
  { label: "Candidatos", icon: "users", page: "candidates" },
  { label: "Notificações", icon: "bell", page: "notifications" },
  { label: "Meu perfil", icon: "building", page: "company" },
];

function AppShell({ children, page, setPage, company = false }: { children: ReactNode; page: Page; setPage: (page: Page) => void; company?: boolean }) {
  const nav = company ? companyNav : candidateNav;
  return <div className="app-shell">
    <aside className="sidebar">
      <Logo />
      <div className="side-profile">
        <div className={`avatar ${company ? "company-avatar" : ""}`}>{company ? "XY" : "KM"}</div>
        <div><strong>{company ? "Empresa XYZ" : "Kauã Morais"}</strong><span>{company ? "Conta empresarial" : "Candidato"}</span></div>
      </div>
      <nav>{nav.map((item) => <button key={item.label} className={page === item.page ? "active" : ""} onClick={() => setPage(item.page)}><Icon name={item.icon} />{item.label}{item.label === "Notificações" && <i>3</i>}</button>)}</nav>
      <button className="exit" onClick={() => setPage("landing")}><Icon name="logout" />Sair</button>
    </aside>
    <div className="shell-main">
      <header className="mobile-header"><Logo /><button className="icon-btn"><Icon name="bell" /></button></header>
      <main>{children}</main>
      <nav className="bottom-nav">{nav.slice(0, 5).map((item) => <button key={item.label} className={page === item.page ? "active" : ""} onClick={() => setPage(item.page)}><Icon name={item.icon} /><span>{item.label.split(" ")[0]}</span></button>)}</nav>
    </div>
  </div>;
}

function Landing({ setPage }: { setPage: (page: Page) => void }) {
  return <div className="landing">
    <header className="topbar"><Logo /><nav><a href="#inicio">Início</a><a href="#oportunidades">Oportunidades</a><a href="#sobre">Sobre</a></nav><div className="top-actions"><Button variant="ghost" onClick={() => setPage("login")}>Entrar</Button><Button onClick={() => setPage("register")}>Criar conta</Button></div></header>
    <main>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <Badge><Icon name="sparkle" size={15} /> Seu futuro começa aqui</Badge>
          <h1>Encontre sua próxima <span>oportunidade</span></h1>
          <p>Vagas, estágios e oportunidades acadêmicas em um só lugar. Conecte seu talento às melhores possibilidades.</p>
          <div className="hero-actions"><Button onClick={() => setPage("search")}>Buscar oportunidades <Icon name="arrow" /></Button><Button variant="secondary" onClick={() => setPage("register")}>Criar minha conta</Button></div>
          <div className="hero-trust"><div className="avatar-stack"><span>KM</span><span>JS</span><span>AL</span></div><p><strong>+2.500 talentos</strong><br />já conectados</p></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image"><img src="https://images.unsplash.com/photo-1690378820474-b468b8ee64d3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200" alt="Jovens profissionais colaborando em um ambiente de trabalho" /></div>
          <div className="float-card float-top"><span className="success-icon"><Icon name="check" size={17} /></span><div><strong>Match perfeito!</strong><small>Seu perfil combina 92%</small></div></div>
          <div className="float-card float-bottom"><CompanyLogo letters="NL" color="purple" /><div><strong>Nova oportunidade</strong><small>Analista de Dados Jr.</small></div></div>
          <div className="dot-pattern"></div>
        </div>
      </section>
      <section className="benefits" id="sobre">
        <div className="section-heading"><span>UMA PLATAFORMA, MUITAS POSSIBILIDADES</span><h2>Tudo o que você precisa para avançar</h2><p>Uma jornada simples, organizada e feita para conectar você ao próximo passo.</p></div>
        <div className="benefit-grid">
          <article><div className="feature-icon"><Icon name="search" /></div><span>01</span><h3>Encontre oportunidades</h3><p>Descubra vagas e projetos que realmente combinam com seus objetivos.</p></article>
          <article><div className="feature-icon purple"><Icon name="user" /></div><span>02</span><h3>Organize seu perfil</h3><p>Apresente suas habilidades, formação e currículo de forma profissional.</p></article>
          <article><div className="feature-icon green"><Icon name="file" /></div><span>03</span><h3>Acompanhe candidaturas</h3><p>Visualize cada etapa dos seus processos com clareza e praticidade.</p></article>
        </div>
      </section>
      <section className="featured" id="oportunidades"><div className="section-row"><div><span>OPORTUNIDADES EM DESTAQUE</span><h2>Seu próximo passo pode estar aqui</h2></div><button onClick={() => setPage("search")}>Ver todas <Icon name="arrow" /></button></div><div className="jobs-grid">{jobs.slice(0,3).map((job) => <JobCard key={job.title} job={job} onOpen={() => setPage("job")} />)}</div></section>
      <section className="cta"><div><span>PRONTO PARA COMEÇAR?</span><h2>Conecte-se hoje às oportunidades de amanhã.</h2></div><Button onClick={() => setPage("register")}>Criar conta gratuitamente <Icon name="arrow" /></Button></section>
    </main>
    <footer><Logo /><p>Conectando talentos, empresas e instituições.</p><span>© 2025 ConectIn</span></footer>
  </div>;
}

function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="auth-page"><div className="auth-brand"><Logo /><div><span className="auth-kicker">CONECTE. CRESÇA. REALIZE.</span><h1>O próximo passo da sua jornada começa aqui.</h1><p>Oportunidades profissionais e acadêmicas feitas para o seu perfil.</p></div><div className="auth-proof"><Icon name="shield" /><span><strong>Ambiente seguro e gratuito</strong><small>Seus dados sempre protegidos</small></span></div></div><div className="auth-panel">{children}</div></div>;
}

function Login({ setPage }: { setPage: (page: Page) => void }) {
  return <AuthLayout><div className="auth-box"><button className="back-link" onClick={() => setPage("landing")}>← Voltar ao início</button><div className="mobile-auth-logo"><Logo /></div><h2>Boas-vindas de volta</h2><p className="muted">Entre na sua conta para continuar.</p><form onSubmit={(e) => { e.preventDefault(); setPage("dashboard"); }}><Field label="E-mail" placeholder="seuemail@exemplo.com" type="email" /><Field label="Senha" placeholder="Digite sua senha" type="password" /><div className="form-helper"><label><input type="checkbox" /> Lembrar de mim</label><button type="button">Esqueci minha senha</button></div><Button type="submit">Entrar</Button></form><div className="divider"><span>ou</span></div><p className="auth-switch">Ainda não possui uma conta? <button onClick={() => setPage("register")}>Criar conta</button></p><button className="employer-shortcut" onClick={() => setPage("company")}><Icon name="building" />Acessar demonstração do empregador</button></div></AuthLayout>;
}

function Register({ setPage }: { setPage: (page: Page) => void }) {
  const [role, setRole] = useState<"candidate" | "company" | null>(null);
  return <AuthLayout><div className="auth-box register-box"><button className="back-link" onClick={() => role ? setRole(null) : setPage("landing")}>← Voltar</button><h2>{role ? "Crie sua conta" : "Como você deseja utilizar o ConectIn?"}</h2><p className="muted">{role ? "Preencha os dados abaixo para começar." : "Escolha o perfil que melhor representa você."}</p>
    {!role ? <div className="role-cards"><button onClick={() => setRole("candidate")}><span className="role-icon"><Icon name="user" size={26} /></span><div><strong>Sou candidato</strong><small>Quero encontrar oportunidades</small></div><Icon name="arrow" /></button><button onClick={() => setRole("company")}><span className="role-icon purple"><Icon name="building" size={26} /></span><div><strong>Sou empregador</strong><small>Quero publicar oportunidades</small></div><Icon name="arrow" /></button></div> :
    <form onSubmit={(e) => { e.preventDefault(); setPage(role === "candidate" ? "profile-setup" : "company"); }}><Field label={role === "candidate" ? "Nome completo" : "Nome da empresa ou instituição"} placeholder={role === "candidate" ? "Seu nome completo" : "Nome da organização"} /><Field label="E-mail" placeholder="seuemail@exemplo.com" type="email" /><div className="form-grid"><Field label="Senha" placeholder="Crie uma senha" type="password" /><Field label="Confirmar senha" placeholder="Repita a senha" type="password" /></div><label className="terms"><input type="checkbox" /> Li e aceito os Termos de Uso e a Política de Privacidade.</label><Button type="submit">Criar minha conta</Button></form>}
    <p className="auth-switch">Já possui uma conta? <button onClick={() => setPage("login")}>Entrar</button></p></div></AuthLayout>;
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <header className="page-header"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</header>;
}

function CandidateDashboard({ setPage }: { setPage: (page: Page) => void }) {
  return <><PageHeader title="Olá, Kauã!" subtitle="Encontre oportunidades para você." action={<div className="header-actions"><button className="icon-btn notification"><Icon name="bell" /><i></i></button><div className="avatar">KM</div></div>} />
    <section className="welcome-card"><div><Badge><Icon name="sparkle" size={14} /> Oportunidades personalizadas</Badge><h2>Onde seu talento quer chegar?</h2><p>Pesquise entre centenas de oportunidades profissionais e acadêmicas.</p><SearchBar action={() => setPage("search")} /><div className="quick-filters"><span>Filtros rápidos:</span><button>Área</button><button>Tipo de vaga</button><button>Modalidade</button></div></div><div className="welcome-art"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><Icon name="briefcase" size={72} /></div></section>
    <section className="content-section"><div className="section-row compact"><div><h2>Oportunidades em destaque</h2><p>Selecionadas com base no seu perfil</p></div><button onClick={() => setPage("search")}>Ver todas <Icon name="arrow" /></button></div><div className="jobs-grid dashboard-grid">{jobs.slice(0,3).map((job) => <JobCard key={job.title} job={job} onOpen={() => setPage("job")} />)}</div></section>
    <section className="profile-progress"><div className="progress-ring">75%</div><div><h3>Seu perfil está quase completo</h3><p>Adicione suas experiências para aumentar suas chances.</p></div><Button variant="secondary" onClick={() => setPage("profile")}>Completar perfil</Button></section>
  </>;
}

function SearchPage({ setPage }: { setPage: (page: Page) => void }) {
  return <><PageHeader title="Buscar oportunidades" subtitle="Encontre a oportunidade ideal para o seu momento." /><div className="search-panel"><SearchBar /><div className="filter-row"><SelectField label="Área de atuação" placeholder="Todas as áreas" /><SelectField label="Tipo de vaga" placeholder="Todos os tipos" /><SelectField label="Modalidade" placeholder="Todas" /><button className="clear-filter">Limpar filtros</button></div></div><div className="results-title"><div><h2>Oportunidades encontradas</h2><span>48 resultados</span></div><select><option>Mais recentes</option><option>Prazo próximo</option></select></div><div className="results-list">{jobs.map((job) => <JobCard detail key={job.title} job={job} onOpen={() => setPage("job")} />)}</div></>;
}

function JobDetail({ setPage }: { setPage: (page: Page) => void }) {
  return <><button className="back-link page-back" onClick={() => setPage("search")}>← Voltar para oportunidades</button><div className="job-detail-header"><div className="job-title-block"><CompanyLogo letters="XY" /><div><p className="eyebrow">OPORTUNIDADE</p><h1>Desenvolvedor Java Jr.</h1><p>Empresa XYZ</p></div></div><Button onClick={() => setPage("apply")}>Candidatar-se</Button></div><div className="detail-tags"><Badge>Emprego</Badge><Badge>Híbrido</Badge><Badge>Tecnologia</Badge><span><Icon name="clock" size={17} /> Inscrições até 18 de junho</span></div><div className="detail-layout"><div className="detail-content"><section><h2>Sobre a oportunidade</h2><p>Buscamos uma pessoa desenvolvedora Java em início de carreira para integrar nosso time de tecnologia. Você participará do desenvolvimento de soluções modernas, colaborando com profissionais experientes em um ambiente que valoriza aprendizado e inovação.</p></section><section><h2>Requisitos</h2><ul><li>Conhecimentos em Java e orientação a objetos</li><li>Noções de bancos de dados relacionais e SQL</li><li>Conhecimento básico de Git</li><li>Boa comunicação e vontade de aprender</li></ul></section><section><h2>Área de atuação</h2><div className="area-card"><div className="feature-icon"><Icon name="briefcase" /></div><div><strong>Tecnologia da Informação</strong><p>Desenvolvimento de software</p></div></div></section></div><aside className="detail-aside"><h3>Resumo da oportunidade</h3><dl><div><dt>Tipo</dt><dd>Emprego</dd></div><div><dt>Modalidade</dt><dd>Híbrido</dd></div><div><dt>Área</dt><dd>Tecnologia</dd></div><div><dt>Prazo</dt><dd>18 de junho</dd></div></dl><Button onClick={() => setPage("apply")}>Candidatar-se agora</Button><small>Revise seu perfil antes de se candidatar.</small></aside></div></>;
}

function ApplyPage({ setPage }: { setPage: (page: Page) => void }) {
  const [done, setDone] = useState(false);
  return <div className="modal-page"><div className="application-modal">{done ? <div className="success-state"><span><Icon name="check" size={30} /></span><h2>Candidatura enviada!</h2><p>Boa sorte, Kauã! Você pode acompanhar o andamento em Minhas candidaturas.</p><Button onClick={() => setPage("applications")}>Acompanhar candidatura</Button></div> : <><div className="modal-head"><div><span>CONFIRMAR CANDIDATURA</span><h2>Desenvolvedor Java Jr.</h2><p>Empresa XYZ</p></div><button onClick={() => setPage("job")}>×</button></div><div className="selected-resume"><div className="file-icon"><Icon name="file" /></div><div><small>CURRÍCULO SELECIONADO</small><strong>curriculo_kaua_morais.pdf</strong><span>Atualizado há 5 dias</span></div><Button variant="secondary">Alterar currículo</Button></div><label className="check-row"><input type="checkbox" /> <span><strong>Confirmo que desejo me candidatar</strong><small>Ao continuar, seu perfil e currículo serão compartilhados com a empresa.</small></span></label><div className="academic-note"><strong>Não possui experiência profissional?</strong><label><input type="checkbox" /> Estou em busca da minha primeira oportunidade.</label></div><div className="modal-actions"><Button variant="ghost" onClick={() => setPage("job")}>Cancelar</Button><Button onClick={() => setDone(true)}>Confirmar candidatura</Button></div></>}</div></div>;
}

const applications = [
  { title: "Desenvolvedor Java Jr.", company: "Empresa XYZ", date: "12 de junho de 2025", status: "analysis", label: "Em análise", logo: "XY", color: "blue" },
  { title: "Estágio em Desenvolvimento", company: "Empresa ABC", date: "08 de junho de 2025", status: "approved", label: "Aprovado", logo: "AB", color: "purple" },
  { title: "Assistente de Tecnologia", company: "TechWave", date: "28 de maio de 2025", status: "rejected", label: "Reprovado", logo: "TW", color: "orange" },
];

function Applications() {
  return <><PageHeader title="Minhas candidaturas" subtitle="Acompanhe o andamento das oportunidades em que se candidatou." /><div className="stat-row"><div><span className="stat-icon blue"><Icon name="file" /></span><div><strong>3</strong><small>Total de candidaturas</small></div></div><div><span className="stat-icon yellow"><Icon name="clock" /></span><div><strong>1</strong><small>Em análise</small></div></div><div><span className="stat-icon green"><Icon name="check" /></span><div><strong>1</strong><small>Aprovada</small></div></div></div><div className="tab-row"><button className="active">Todas <span>3</span></button><button>Em análise</button><button>Aprovadas</button><button>Reprovadas</button></div><div className="application-list">{applications.map((app) => <article key={app.title}><CompanyLogo letters={app.logo} color={app.color} /><div className="application-info"><h3>{app.title}</h3><p>{app.company}</p><small>Candidatura enviada em {app.date}</small></div><Badge status={app.status}>{app.label}</Badge><button className="icon-btn"><Icon name="arrow" /></button></article>)}</div></>;
}

function Profile({ setPage }: { setPage: (page: Page) => void }) {
  return <><PageHeader title="Meu perfil" subtitle="Mantenha suas informações atualizadas para se destacar." action={<Button onClick={() => setPage("profile-edit")}>Editar perfil</Button>} /><div className="profile-cover"></div><section className="profile-identity"><div className="avatar avatar-large">KM</div><div><h2>Kauã Morais</h2><p>Estudante de Análise e Desenvolvimento de Sistemas</p><span><Icon name="check" size={15} /> Perfil verificado</span></div><div className="completion"><small>Perfil completo</small><strong>75%</strong><div><i></i></div></div></section><div className="profile-layout"><div className="profile-main"><section className="info-card"><h3>Sobre mim</h3><p>Estudante apaixonado por tecnologia, buscando minha primeira oportunidade para aplicar conhecimentos e crescer profissionalmente.</p><label className="experience-flag"><input type="checkbox" defaultChecked /> Sem experiência profissional, em busca de oportunidade.</label></section><section className="info-card"><h3>Formação acadêmica</h3><div className="timeline-item"><span><Icon name="graduation" /></span><div><strong>Análise e Desenvolvimento de Sistemas</strong><p>Faculdade de Tecnologia • Cursando</p><small>2023 — 2026</small></div></div></section><section className="info-card"><h3>Habilidades</h3><div className="skill-tags">{["Java", "SQL", "Git", "HTML", "CSS"].map(x => <span key={x}>{x}</span>)}</div></section></div><aside><section className="info-card"><h3>Informações</h3><dl className="profile-dl"><div><dt>Área de interesse</dt><dd>Tecnologia</dd></div><div><dt>Disponibilidade</dt><dd>Imediata</dd></div><div><dt>Modalidade</dt><dd>Híbrido ou remoto</dd></div></dl></section><section className="resume-card"><div className="file-icon"><Icon name="file" /></div><div><small>CURRÍCULO</small><strong>curriculo.pdf</strong><span>PDF • 1,2 MB</span></div><Button variant="secondary">Visualizar</Button></section></aside></div></>;
}

function ProfileAvatarEditor() {
  return <div className="avatar-editor"><div className="avatar avatar-large">KM</div><div><strong>Foto do perfil</strong><p>JPG ou PNG. Tamanho máximo de 5 MB.</p><button type="button">Alterar foto</button></div></div>;
}

function SkillsEditor({ editable = false }: { editable?: boolean }) {
  const [skills, setSkills] = useState(["Java", "SQL", "Git", "HTML", "CSS"]);
  const [skill, setSkill] = useState("");
  const addSkill = () => {
    const value = skill.trim();
    if (value && !skills.includes(value)) setSkills([...skills, value]);
    setSkill("");
  };
  return <div className="skills-editor"><span className="field-label">Habilidades</span><div className="editable-tags">{skills.map((item) => <span key={item}>{item}{editable && <button type="button" aria-label={`Remover ${item}`} onClick={() => setSkills(skills.filter((current) => current !== item))}>×</button>}</span>)}</div><div className="skill-input"><input value={skill} onChange={(event) => setSkill(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addSkill(); } }} placeholder="Digite uma habilidade" /><button type="button" onClick={addSkill}><Icon name="plus" size={16} /> Adicionar</button></div></div>;
}

function ResumeUpload() {
  const [uploaded, setUploaded] = useState(false);
  return <><button type="button" className="upload-zone" onClick={() => setUploaded(true)}><span><Icon name="file" size={27} /></span><strong>Arraste seu currículo aqui ou clique para selecionar</strong><small>Formato PDF • Tamanho máximo de 5 MB</small></button>{uploaded && <div className="uploaded-file"><span className="pdf-icon">PDF</span><div><strong>curriculo_kaua_morais.pdf</strong><small>Arquivo PDF • 1,2 MB</small></div><Button variant="secondary">Visualizar</Button><Button variant="danger" onClick={() => setUploaded(false)}>Remover</Button></div>}</>;
}

function ProfileFormSection({ icon, title, description, children }: { icon: IconName; title: string; description: string; children: ReactNode }) {
  return <section className="profile-form-section"><header><span><Icon name={icon} /></span><div><h2>{title}</h2><p>{description}</p></div></header><div className="profile-form-content">{children}</div></section>;
}

function ProfileSetup({ setPage }: { setPage: (page: Page) => void }) {
  return <><PageHeader title="Complete seu perfil" subtitle="Preencha seus dados e adicione seu currículo para aumentar suas oportunidades." /><form className="profile-form" onSubmit={(event) => { event.preventDefault(); setPage("profile"); }}>
    <ProfileFormSection icon="user" title="Dados pessoais" description="Conte-nos um pouco mais sobre você."><ProfileAvatarEditor /><div className="form-grid"><Field label="Nome completo" placeholder="Digite seu nome completo" required /><Field label="E-mail" placeholder="seuemail@exemplo.com" type="email" required /><Field label="Telefone" placeholder="(00) 00000-0000" /></div></ProfileFormSection>
    <ProfileFormSection icon="graduation" title="Formação acadêmica" description="Adicione sua formação mais recente."><div className="form-grid"><Field label="Curso" placeholder="Ex.: Análise e Desenvolvimento de Sistemas" required /><Field label="Instituição de ensino" placeholder="Nome da instituição" required /><SelectField label="Status da formação" placeholder="Selecione o status" required /><Field label="Ano de conclusão" placeholder="Ex.: 2026" /></div></ProfileFormSection>
    <ProfileFormSection icon="briefcase" title="Perfil profissional" description="Ajude empresas a encontrarem seu perfil."><SelectField label="Área de interesse" placeholder="Selecione sua área" required /><SkillsEditor /></ProfileFormSection>
    <ProfileFormSection icon="file" title="Anexe seu currículo" description="Envie um arquivo atualizado com sua formação e experiências."><ResumeUpload /><label className="experience-check"><input type="checkbox" /> <span><strong>Sem experiência profissional, em busca de oportunidade.</strong><small>Marque esta opção se estiver buscando sua primeira experiência.</small></span></label></ProfileFormSection>
    <div className="profile-form-actions"><Button variant="ghost" onClick={() => setPage("register")}>Voltar</Button><Button type="submit">Salvar perfil e currículo</Button></div>
  </form></>;
}

function ProfileEdit({ setPage }: { setPage: (page: Page) => void }) {
  return <><PageHeader title="Editar perfil e currículo" subtitle="Atualize seus dados, informações profissionais e currículo." /><form className="profile-form" onSubmit={(event) => { event.preventDefault(); setPage("profile"); }}>
    <ProfileFormSection icon="user" title="Dados pessoais" description="Mantenha seus dados de contato atualizados."><ProfileAvatarEditor /><div className="form-grid"><Field label="Nome completo" placeholder="Digite seu nome completo" defaultValue="Kauã Morais" required /><Field label="E-mail" placeholder="seuemail@exemplo.com" type="email" defaultValue="kaua.morais@email.com" required /><Field label="Telefone" placeholder="(00) 00000-0000" defaultValue="(11) 98765-4321" /></div></ProfileFormSection>
    <ProfileFormSection icon="graduation" title="Formação acadêmica" description="Atualize as informações da sua formação."><div className="form-grid"><Field label="Curso" placeholder="Nome do curso" defaultValue="Análise e Desenvolvimento de Sistemas" required /><Field label="Instituição de ensino" placeholder="Nome da instituição" defaultValue="Faculdade de Tecnologia" required /><SelectField label="Status da formação" placeholder="Selecione o status" defaultValue="Cursando" required /><Field label="Ano de conclusão" placeholder="Ex.: 2026" defaultValue="2026" /></div></ProfileFormSection>
    <ProfileFormSection icon="briefcase" title="Informações profissionais" description="Edite seus interesses e principais competências."><SelectField label="Área de interesse" placeholder="Selecione sua área" defaultValue="Tecnologia" required /><SkillsEditor editable /><label className="experience-check"><input type="checkbox" defaultChecked /> <span><strong>Sem experiência profissional, em busca de oportunidade.</strong><small>Marque esta opção se estiver buscando sua primeira experiência.</small></span></label></ProfileFormSection>
    <ProfileFormSection icon="file" title="Currículo" description="Gerencie o currículo atualmente cadastrado."><div className="current-resume"><span className="pdf-icon">PDF</span><div><strong>curriculo.pdf</strong><span>Arquivo PDF • 1,2 MB</span><small>Atualizado em 12 de junho de 2025</small></div><div><Button variant="secondary">Visualizar currículo</Button><Button variant="secondary">Substituir currículo</Button><Button variant="danger">Remover currículo</Button></div></div></ProfileFormSection>
    <div className="profile-form-actions"><Button variant="ghost" onClick={() => setPage("profile")}>Cancelar</Button><Button type="submit">Salvar alterações</Button></div>
  </form></>;
}

function Notifications() {
  const items = [{ icon: "briefcase" as IconName, title: "Nova oportunidade compatível", text: "Desenvolvedor Java Jr. combina com seu perfil.", time: "Há 12 minutos", unread: true }, { icon: "check" as IconName, title: "Atualização de candidatura", text: "Sua candidatura foi aprovada.", time: "Há 2 horas", unread: true }, { icon: "sparkle" as IconName, title: "Nova oportunidade", text: "Estágio em TI foi publicado pela Empresa ABC.", time: "Ontem", unread: true }, { icon: "file" as IconName, title: "Perfil visualizado", text: "Uma empresa visualizou seu currículo.", time: "12 de junho", unread: false }];
  return <><PageHeader title="Notificações" subtitle="Acompanhe novidades e atualizações importantes." action={<button className="text-button">Marcar todas como lidas</button>} /><div className="notification-list">{items.map((item, i) => <article className={item.unread ? "unread" : ""} key={i}><span className="notification-icon"><Icon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p><small>{item.time}</small></div>{item.unread && <i></i>}</article>)}</div></>;
}

const companyJobs = [
  { title: "Desenvolvedor Java Jr.", status: "Ativa", applicants: 15, deadline: "18 jun", type: "Emprego", area: "Tecnologia" },
  { title: "Estágio em Desenvolvimento", status: "Ativa", applicants: 8, deadline: "24 jun", type: "Estágio", area: "Tecnologia" },
  { title: "Analista de Suporte", status: "Encerrada", applicants: 22, deadline: "02 jun", type: "Emprego", area: "Suporte" },
];

function CompanyDashboard({ setPage }: { setPage: (page: Page) => void }) {
  return <><PageHeader title="Olá, Empresa XYZ!" subtitle="Veja o desempenho das suas oportunidades." action={<Button icon="plus" onClick={() => setPage("publish")}>Publicar vaga</Button>} /><div className="company-stats"><div><span className="stat-icon blue"><Icon name="briefcase" /></span><p><strong>3</strong><small>Vagas publicadas</small></p><em>+1 este mês</em></div><div><span className="stat-icon purple"><Icon name="users" /></span><p><strong>45</strong><small>Total de candidatos</small></p><em>+12 esta semana</em></div><div><span className="stat-icon green"><Icon name="check" /></span><p><strong>4</strong><small>Candidatos aprovados</small></p></div></div><section className="content-section"><div className="section-row compact"><div><h2>Suas oportunidades</h2><p>Acompanhe as vagas publicadas recentemente</p></div><button onClick={() => setPage("jobs")}>Ver todas <Icon name="arrow" /></button></div><div className="company-job-list">{companyJobs.slice(0,2).map((job) => <article key={job.title}><div className="company-job-title"><CompanyLogo letters="XY" /><div><h3>{job.title}</h3><p>{job.type} • {job.area}</p></div></div><Badge status="active">{job.status}</Badge><div className="applicant-count"><Icon name="users" /><strong>{job.applicants}</strong><span>candidaturas</span></div><Button variant="secondary" onClick={() => setPage("candidates")}>Ver candidatos</Button></article>)}</div></section></>;
}

function Publish() {
  return <><PageHeader title="Publicar oportunidade" subtitle="Preencha as informações para encontrar os talentos certos." /><form className="publish-form"><section><h2>Informações da oportunidade</h2><p>Conte os principais detalhes da vaga.</p><Field label="Título da vaga" placeholder="Ex.: Desenvolvedor Java Jr." required /><div className="form-grid"><SelectField label="Tipo" placeholder="Emprego, estágio ou projeto acadêmico" required /><SelectField label="Área de atuação" placeholder="Selecione a área" required /></div><SelectField label="Modalidade" placeholder="Presencial, híbrido ou remoto" required /></section><section><h2>Descrição e requisitos</h2><p>Ajude os candidatos a entenderem a oportunidade.</p><label className="field"><span>Descrição <b>*</b></span><textarea placeholder="Descreva as atividades e responsabilidades da vaga..." rows={5}></textarea></label><label className="field"><span>Requisitos <b>*</b></span><textarea placeholder="Liste os conhecimentos e habilidades esperados..." rows={4}></textarea></label></section><section><h2>Prazo de inscrição</h2><p>Defina até quando as candidaturas serão recebidas.</p><Field label="Data de encerramento" placeholder="dd/mm/aaaa" type="date" required /></section><div className="form-actions"><Button variant="ghost">Cancelar</Button><Button>Publicar vaga</Button></div></form></>;
}

function CompanyJobs({ setPage }: { setPage: (page: Page) => void }) {
  return <><PageHeader title="Minhas vagas" subtitle="Gerencie todas as oportunidades da sua organização." action={<Button icon="plus" onClick={() => setPage("publish")}>Publicar vaga</Button>} /><div className="tab-row"><button className="active">Todas <span>3</span></button><button>Ativas <span>2</span></button><button>Encerradas <span>1</span></button></div><div className="managed-jobs">{companyJobs.map((job, i) => <article key={job.title}><div className="managed-main"><div><Badge status={i === 2 ? "neutral" : "active"}>{job.status}</Badge><h3>{job.title}</h3><p>{job.type} • {job.area}</p></div><button className="icon-btn">•••</button></div><div className="managed-meta"><span><Icon name="users" /> <strong>{job.applicants}</strong> candidaturas</span><span><Icon name="clock" /> Prazo: {job.deadline}</span></div><div className="managed-actions"><Button variant="ghost">Editar</Button><Button variant="secondary" onClick={() => setPage("candidates")}>Ver candidatos</Button><Button variant="danger">Remover</Button></div></article>)}</div></>;
}

const candidates = [
  { name: "João Silva", initials: "JS", skills: ["Java", "SQL", "Git"], status: "Em análise", code: "analysis" },
  { name: "Mariana Costa", initials: "MC", skills: ["Java", "Spring", "Git"], status: "Em análise", code: "analysis" },
  { name: "Lucas Almeida", initials: "LA", skills: ["Java", "MySQL", "HTML"], status: "Aprovado", code: "approved" },
  { name: "Beatriz Santos", initials: "BS", skills: ["Java", "SQL", "CSS"], status: "Em análise", code: "analysis" },
];

function Candidates({ setPage }: { setPage: (page: Page) => void }) {
  return <><button className="back-link page-back" onClick={() => setPage("jobs")}>← Voltar para minhas vagas</button><PageHeader title="Desenvolvedor Java Jr." subtitle="15 candidatos" /><div className="candidate-tools"><div className="mini-search"><Icon name="search" /><input placeholder="Buscar candidato" /></div><select><option>Todos os status</option><option>Em análise</option><option>Aprovado</option></select></div><div className="candidate-list">{candidates.map((c) => <article key={c.name}><div className="avatar">{c.initials}</div><div className="candidate-name"><h3>{c.name}</h3><p>Análise e Desenvolvimento de Sistemas</p></div><div className="skill-tags">{c.skills.map(s => <span key={s}>{s}</span>)}</div><Badge status={c.code}>{c.status}</Badge><Button variant="secondary" onClick={() => setPage("candidate")}>Ver perfil</Button></article>)}</div></>;
}

function CandidateView({ setPage }: { setPage: (page: Page) => void }) {
  return <><button className="back-link page-back" onClick={() => setPage("candidates")}>← Voltar para candidatos</button><div className="candidate-profile-head"><div className="avatar avatar-large">JS</div><div><h1>João Silva</h1><p>Estudante de Ciência da Computação</p><Badge status="analysis">Em análise</Badge></div></div><div className="candidate-profile-grid"><div><section className="info-card"><h3>Formação</h3><div className="timeline-item"><span><Icon name="graduation" /></span><div><strong>Ciência da Computação</strong><p>Universidade Metropolitana • Cursando</p><small>2022 — 2026</small></div></div></section><section className="info-card"><h3>Área de interesse</h3><p>Desenvolvimento de software e engenharia de sistemas.</p></section><section className="info-card"><h3>Habilidades</h3><div className="skill-tags">{["Java", "SQL", "Git", "Spring", "HTML"].map(s => <span key={s}>{s}</span>)}</div></section></div><aside><section className="resume-card vertical"><div className="file-icon"><Icon name="file" /></div><div><small>CURRÍCULO DO CANDIDATO</small><strong>curriculo_joao_silva.pdf</strong><span>PDF • 842 KB</span></div><Button variant="secondary">Visualizar currículo</Button></section></aside></div><div className="decision-bar"><div><strong>Decisão da candidatura</strong><span>O candidato será notificado sobre a atualização.</span></div><Button variant="danger">Reprovar</Button><Button>Aprovar</Button></div></>;
}

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  if (page === "landing") return <Landing setPage={setPage} />;
  if (page === "login") return <Login setPage={setPage} />;
  if (page === "register") return <Register setPage={setPage} />;
  if (page === "apply") return <ApplyPage setPage={setPage} />;
  const companyPages: Page[] = ["company", "publish", "jobs", "candidates", "candidate"];
  const company = companyPages.includes(page);
  let content: ReactNode;
  switch (page) {
    case "dashboard": content = <CandidateDashboard setPage={setPage} />; break;
    case "search": content = <SearchPage setPage={setPage} />; break;
    case "job": content = <JobDetail setPage={setPage} />; break;
    case "applications": content = <Applications />; break;
    case "profile": content = <Profile setPage={setPage} />; break;
    case "profile-setup": content = <ProfileSetup setPage={setPage} />; break;
    case "profile-edit": content = <ProfileEdit setPage={setPage} />; break;
    case "notifications": content = <Notifications />; break;
    case "company": content = <CompanyDashboard setPage={setPage} />; break;
    case "publish": content = <Publish />; break;
    case "jobs": content = <CompanyJobs setPage={setPage} />; break;
    case "candidates": content = <Candidates setPage={setPage} />; break;
    case "candidate": content = <CandidateView setPage={setPage} />; break;
    default: content = null;
  }
  return <AppShell page={page} setPage={setPage} company={company}>{content}</AppShell>;
}
