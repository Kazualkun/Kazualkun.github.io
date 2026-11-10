/* ===========================================================
   CONTEÚDO DA PÁGINA
   Tudo que é texto ou dado editável mora aqui.
   O main.js só contém lógica — não precisa ser aberto para
   mudar nada do que aparece na tela.
   =========================================================== */

/* -----------------------------------------------------------
   1. TRAJETÓRIA
   Ordem reversa, da etapa mais recente para a mais antiga.
   "tipo" aceita "trabalho" ou "formacao" — muda só o marcador.
   "atual: true" marca a etapa em andamento.
   ----------------------------------------------------------- */
const TRAJETORIA = [
  {
    periodo: { pt: 'fev 2024 — atual', en: 'Feb 2024 — now' },
    atual: true,
    tipo: 'trabalho',
    org: 'Grupo São Francisco',
    cargo: { pt: 'Analista de sistemas', en: 'Systems analyst' },
    pontos: {
      pt: [
        'Criei e hospedei sozinho a intranet do hospital, hoje usada todos os dias por turno.',
        'Respondo pela TI de um hospital de porte médio há dois anos, e hoje lidero um estagiário.',
        'Infraestrutura de rede, hardware de servidor, CFTV com câmeras e DVR Intelbras, e automações.'
      ],
      en: [
        'Built and hosted the hospital intranet on my own; it is now used every day, across shifts.',
        'I have run IT for a mid-sized hospital for two years, and now lead an intern.',
        'Network infrastructure, server hardware, CCTV with Intelbras cameras and DVRs, and automation.'
      ]
    }
  },
  {
    periodo: { pt: 'jan 2026 — atual', en: 'Jan 2026 — now' },
    atual: true,
    tipo: 'trabalho',
    org: 'Autônomo — IMACARDIOS e Torii Tech',
    cargo: { pt: 'Desenvolvedor full-stack', en: 'Full-stack developer' },
    pontos: {
      pt: [
        'Construí o IMACARDIOS de ponta a ponta para o Dr. Yanquel Bazan, da infraestrutura ao site no ar, em três meses.',
        'Mais de 50 clínicas atendidas no país e mais de 4.000 laudos assinados por mês.',
        'Backend em Node.js e TypeScript, frontend em Angular, modelagem de banco e integrações de API.',
        'A Torii Tech é o estúdio onde sigo criando produtos próprios.'
      ],
      en: [
        'Built IMACARDIOS end to end for Dr. Yanquel Bazan, from the infrastructure to the live site, in three months.',
        'Over 50 clinics served across Brazil and more than 4,000 signed reports a month.',
        'Node.js and TypeScript on the backend, Angular on the frontend, database modelling and API integrations.',
        'Torii Tech is the studio where I keep building products of my own.'
      ]
    }
  },
  {
    periodo: { pt: 'jun — out 2026', en: 'Jun — Oct 2026' },
    tipo: 'formacao',
    org: 'Anhanguera Educacional',
    cargo: { pt: 'Pós-graduação em Ciência de Dados', en: 'Postgraduate degree in Data Science' },
    pontos: { pt: [], en: [] }
  },
  {
    periodo: { pt: 'dez 2025 — jun 2026', en: 'Dec 2025 — Jun 2026' },
    tipo: 'formacao',
    org: 'Anhanguera Educacional',
    cargo: { pt: 'Pós-graduação em Inteligência Artificial e Machine Learning', en: 'Postgraduate degree in Artificial Intelligence and Machine Learning' },
    pontos: { pt: [], en: [] }
  },
  {
    periodo: { pt: '2022 — 2025', en: '2022 — 2025' },
    tipo: 'formacao',
    org: 'FATEC São Roque',
    cargo: { pt: 'Tecnólogo em Sistemas para Internet', en: 'Technologist in Internet Systems' },
    pontos: { pt: [], en: [] }
  },
  {
    periodo: { pt: 'mar 2023 — fev 2024', en: 'Mar 2023 — Feb 2024' },
    tipo: 'trabalho',
    org: 'Supermercados Mairinque',
    cargo: { pt: 'Assistente de TI — infraestrutura', en: 'IT assistant — infrastructure' },
    pontos: {
      pt: [
        'Atendia dois supermercados de grande porte, muitas vezes sozinho.',
        'Responsável por todo o parque eletrônico: balanças, coletores, VR Software e hardware.',
        'Compras de TI, melhorias de sistema e organização dos processos internos.'
      ],
      en: [
        'Covered two large supermarkets, often on my own.',
        'Responsible for the whole electronics estate: scales, data collectors, VR Software and hardware.',
        'IT purchasing, system improvements and internal process organisation.'
      ]
    }
  }
];

/* -----------------------------------------------------------
   2. O QUE OS SISTEMAS ENTREGAM
   Um cartão por sistema que já tem número para mostrar.
   ----------------------------------------------------------- */
const IMPACTO = [
  {
    sistema: 'IMACARDIOS',
    marca: 'imacardios',
    numeros: [
      { valor: { pt: '4.000+', en: '4,000+' }, rotulo: { pt: 'laudos por mês', en: 'reports a month' } },
      { valor: '50+', rotulo: { pt: 'clínicas em todo o país', en: 'clinics across Brazil' } }
    ],
    nota: {
      pt: 'Cada laudo sai com assinatura digital e um QR code que serve de comprovante.',
      en: 'Every report carries a digital signature and a QR code that works as proof.'
    }
  },
  {
    sistema: 'Intranet HSF',
    marca: 'hsf',
    numeros: [
      { valor: '5', rotulo: { pt: 'unidades do Grupo São Francisco', en: 'Grupo São Francisco units' } }
    ],
    nota: {
      pt: 'Banco de documentos protegido pela LGPD, dashboards e linhas do tempo, no trabalho de todas as áreas e de todos os colaboradores.',
      en: 'An LGPD-protected document library, dashboards and timelines, used across every department and by every member of staff.'
    }
  }
];

/* -----------------------------------------------------------
   3. DESCRIÇÕES DOS REPOSITÓRIOS
   Substituem o texto que vem do GitHub, quando houver.
   ----------------------------------------------------------- */
const NOTAS_REPO = {
  'Blindagemjuridica': {
    pt: 'Skill para o Claude que revisa um site em busca de risco jurídico, falha de LGPD e brecha de segurança.',
    en: 'A Claude skill that reviews a website for legal risk, data-protection gaps and security holes.'
  },
  'AI-PC-optimizer': {
    pt: 'Skill para o Claude que melhora o desempenho do Windows e organiza os arquivos da máquina.',
    en: 'A Claude skill that tunes Windows performance and tidies up the files on the machine.'
  }
};

/* -----------------------------------------------------------
   4. TEXTOS DA INTERFACE
   O português já está escrito direto no index.html, então a
   página funciona sem JavaScript. Estas chaves são usadas para
   trocar de idioma nos dois sentidos.
   ----------------------------------------------------------- */
const TEXTOS = {
  pt: {
    'doc.titulo': 'Gustavo Kazuo Momma — Cientista de dados, engenheiro de IA e desenvolvedor full-stack',

    'nav.sistemas': 'Sistemas',
    'nav.stack': 'Stack',
    'nav.codigo': 'Código aberto',
    'nav.impacto': 'Entregas',
    'nav.trajetoria': 'Trajetória',
    'nav.contato': 'Contato',
    'nav.abrir': 'Abrir menu',
    'nav.fechar': 'Fechar menu',
    'nav.secoes': 'Seções da página',
    'nav.idioma': 'Mudar idioma',

    'tema.escuro': 'Tema escuro',
    'tema.claro': 'Tema claro',

    'pular': 'Pular para o conteúdo',

    'hero.titulo': 'Sistemas que entram em produção e continuam de pé.',
    'hero.texto': 'Cientista de dados, engenheiro de IA e desenvolvedor full-stack. Trabalho em telemedicina, infraestrutura hospitalar e produtos SaaS — do modelo de dados ao domínio que atende em produção.',
    'hero.ver': 'Ver os sistemas',
    'hero.indice': 'Sistemas em produção',

    'ix.imacardios.papel': 'Telecardiologia e laudos remotos',
    'ix.imacardios.escopo': 'Backend, frontend, banco e APIs',
    'ix.intranet.papel': 'Intranet hospitalar',
    'ix.intranet.escopo': 'Sistemas e infraestrutura crítica',
    'ix.toriitech.papel': 'Estúdio de produtos digitais',
    'ix.toriitech.escopo': 'Site institucional e ecossistema',
    'ix.studio.papel': 'SaaS de conteúdo com IA',
    'ix.studio.escopo': 'Contas, painel e assistente',
    'ix.wardpoint.papel': 'SaaS de análise de partidas',
    'ix.wardpoint.escopo': 'Web, assinatura e app desktop',

    'resumo.rotulo': 'Resumo',
    'resumo.p1': 'Comecei pela engenharia de software e segui para dados e IA, e hoje trabalho nos dois lados da mesma entrega: o modelo que decide e o sistema que coloca essa decisão na frente de quem precisa dela.',
    'resumo.p2': 'Na prática isso significa treinar modelos preditivos e de linguagem, escrever o backend, modelar o banco, desenhar as APIs, construir a interface e cuidar do DNS, do certificado e do domínio que sustentam tudo isso. Meu dia a dia é em ambiente hospitalar, onde um sistema fora do ar tem custo real, então trato disponibilidade, privacidade de dados e acessibilidade como parte do requisito, não como ajuste posterior.',
    'resumo.p3': 'Português nativo e inglês fluente. Aberto a trabalho remoto.',

    'per.imacardios': 'mar — jun 2026',
    'per.intranet': 'jun 2026',
    'per.torii': 'jul 2026 — atual',

    'sis.rotulo': 'Sistemas em produção',
    'sis.nota': 'Cinco aplicações no ar, com domínio próprio e usuários reais.',

    'sis.imacardios.sobre': 'Plataforma de telecardiologia que construí de ponta a ponta para o Dr. Yanquel Bazan, da infraestrutura ao site no ar. Atende mais de 50 clínicas no país e fecha mais de 4.000 laudos assinados por mês, entre ECG, Holter, MAPA 24h e espirometria. Backend em Node.js e TypeScript, frontend em Angular, modelagem do banco e as APIs que movem exame, laudo e assinatura entre as pontas.',
    'sis.intranet.sobre': 'Portal do colaborador que criei e hospedei sozinho, reunindo convênios, exames, ramais, ponto eletrônico, manuais, protocolos, POPs, transferência de paciente e ficha anestésica em um só lugar. É infraestrutura corporativa crítica: usada todos os dias, por turno, dentro do hospital.',
    'sis.toriitech.sobre': 'Estúdio de produtos digitais e a base do ecossistema: sistemas, IA, automação, aplicativos e sites construídos a partir da operação que o cliente já tem. Daqui saem o Studio e o WardPoint, cada um no seu subdomínio.',
    'sis.studio.sobre': 'SaaS que monta o mês de campanhas e posts de um negócio a partir da marca, do público e das objeções de venda dele. Tem cadastro, painel mensal por pacote e um assistente que responde só com o que está na página, em vez de inventar.',
    'sis.wardpoint.sobre': 'Produto de assinatura que revisa cada partida do jogador e aponta, no segundo exato do replay, o erro que custou a vitória. Envolve análise sobre dados de partida, aplicação desktop para Windows e o fluxo de cobrança recorrente.',

    'tag.telecardiologia': 'Telecardiologia',
    'tag.apis': 'APIs',
    'tag.banco': 'Modelagem de banco',
    'tag.saude': 'Saúde',
    'tag.infra': 'Infraestrutura',
    'tag.admin': 'Área administrativa',
    'tag.design': 'Design de interface',
    'tag.auth': 'Autenticação',
    'tag.assinaturas': 'Assinaturas',
    'tag.dados': 'Análise de dados',
    'tag.desktop': 'App desktop',
    'tag.recorrente': 'Pagamento recorrente',

    'stack.rotulo': 'Stack técnica',
    'stack.nota': 'O que uso para construir e manter o que está acima.',
    'stack.linguagens': 'Linguagens',
    'stack.ml': 'Machine learning e dados',
    'stack.frameworks': 'Frameworks e bibliotecas',
    'stack.bancos': 'Bancos de dados',
    'stack.cloud': 'Cloud e infraestrutura',
    'stack.iaauto': 'IA e automação',
    'stack.eng': 'Engenharia e conformidade',
    'stack.nlp': 'Processamento de linguagem natural',
    'stack.features': 'Engenharia de features',
    'stack.supervisionado': 'Aprendizado supervisionado e não supervisionado',
    'stack.viz': 'Visualização de dados',
    'stack.redes': 'Administração de redes',
    'stack.servidor': 'Hardware de servidor',
    'stack.skills': 'AI Skills customizadas',
    'stack.llms': 'LLMs locais e self-hosted',
    'stack.open': 'Modelos open-source',
    'stack.rotinas': 'Automação de rotinas',
    'stack.review': 'Code review automatizado',
    'stack.a11y': 'Acessibilidade',
    'stack.dominios': 'Domínios e subdomínios',

    'stack.seguranca': 'Segurança e acesso',
    'stack.rbac': 'Controle de acesso por papel',
    'desc.linguagens': 'Python para modelo e análise, TypeScript do backend ao frontend.',
    'desc.ml': 'Do tratamento dos dados ao modelo treinado e avaliado.',
    'desc.frameworks': 'Angular no Imacardios, Next.js na Torii Tech, Node.js nos backends.',
    'desc.bancos': 'Modelagem desde o primeiro diagrama, nos cinco sistemas.',
    'desc.seguranca': 'Autenticação e sessão em plataformas que lidam com dado de paciente.',
    'desc.cloud': 'DNS, certificado e domínio de tudo que está no ar.',
    'desc.iaauto': 'Ferramentas próprias e modelos rodando na minha máquina.',
    'desc.eng': 'O que a entrega precisa cumprir antes de ir para produção.',

    'imp.rotulo': 'O que eles entregam',
    'imp.nota': 'Os números que esses sistemas movem todo mês.',

    'traj.rotulo': 'Trajetória',
    'traj.nota': 'Onde trabalhei e onde estudei, em ordem.',
    'traj.atual': 'atual',

    'cod.rotulo': 'Código aberto',
    'cod.nota': 'Repositórios públicos, lidos direto do GitHub. Dois deles são skills que escrevi para o Claude.',
    'cod.carregando': 'Carregando repositórios…',
    'cod.todos': 'Ver todos no GitHub',
    'cod.semdesc': 'Sem descrição no repositório.',
    'cod.estrela': 'estrela',
    'cod.estrelas': 'estrelas',

    'rod.chamada': 'Disponível para projetos e conversas técnicas.',
    'rod.papel': 'Cientista de dados, engenheiro de IA e desenvolvedor full-stack — Brasil, aberto a trabalho remoto',
    'rod.base': 'Página construída à mão, sem framework, publicada no GitHub Pages.'
  },

  en: {
    'doc.titulo': 'Gustavo Kazuo Momma — Data scientist, AI engineer and full-stack developer',

    'nav.sistemas': 'Systems',
    'nav.stack': 'Stack',
    'nav.codigo': 'Open source',
    'nav.impacto': 'Delivery',
    'nav.trajetoria': 'Experience',
    'nav.contato': 'Contact',
    'nav.abrir': 'Open menu',
    'nav.fechar': 'Close menu',
    'nav.secoes': 'Page sections',
    'nav.idioma': 'Change language',

    'tema.escuro': 'Dark theme',
    'tema.claro': 'Light theme',

    'pular': 'Skip to content',

    'hero.titulo': 'Systems that reach production and stay up.',
    'hero.texto': 'Data scientist, AI engineer and full-stack developer. I work in telemedicine, hospital infrastructure and SaaS products — from the data model to the domain that serves it in production.',
    'hero.ver': 'See the systems',
    'hero.indice': 'Systems in production',

    'ix.imacardios.papel': 'Telecardiology and remote reports',
    'ix.imacardios.escopo': 'Backend, frontend, database and APIs',
    'ix.intranet.papel': 'Hospital intranet',
    'ix.intranet.escopo': 'Critical systems and infrastructure',
    'ix.toriitech.papel': 'Digital product studio',
    'ix.toriitech.escopo': 'Main site and ecosystem',
    'ix.studio.papel': 'AI content SaaS',
    'ix.studio.escopo': 'Accounts, dashboard and assistant',
    'ix.wardpoint.papel': 'Match analysis SaaS',
    'ix.wardpoint.escopo': 'Web, subscription and desktop app',

    'resumo.rotulo': 'Summary',
    'resumo.p1': 'I started in software engineering and moved into data and AI, and today I work on both sides of the same delivery: the model that decides, and the system that puts that decision in front of the person who needs it.',
    'resumo.p2': 'In practice that means training predictive and language models, writing the backend, modelling the database, designing the APIs, building the interface, and looking after the DNS, the certificate and the domain that hold it all up. My daily work is in a hospital, where a system that goes down has a real cost, so I treat availability, data privacy and accessibility as part of the requirement rather than a later adjustment.',
    'resumo.p3': 'Native Portuguese and fluent English. Open to remote work.',

    'per.imacardios': 'Mar — Jun 2026',
    'per.intranet': 'Jun 2026',
    'per.torii': 'Jul 2026 — now',

    'sis.rotulo': 'Systems in production',
    'sis.nota': 'Five applications live, each on its own domain, with real users.',

    'sis.imacardios.sobre': 'A telecardiology platform I built end to end for Dr. Yanquel Bazan, from the infrastructure to the live site. It serves more than 50 clinics across Brazil and closes over 4,000 signed reports a month, covering ECG, Holter, 24h ABPM and spirometry. Node.js and TypeScript on the backend, Angular on the frontend, the database model, and the APIs that move exam, report and signature between both ends.',
    'sis.intranet.sobre': 'A staff portal I built and hosted on my own, bringing together health plans, exams, extensions, time tracking, manuals, protocols, SOPs, patient transfers and the anaesthetic record in one place. It is critical corporate infrastructure: used every day, across shifts, inside the hospital.',
    'sis.toriitech.sobre': 'A digital product studio and the base of the ecosystem: systems, AI, automation, apps and sites built on top of the operation the client already runs. Studio and WardPoint both come from here, each on its own subdomain.',
    'sis.studio.sobre': 'A SaaS that builds a month of campaigns and posts for a business from its brand, its audience and the objections it hears when selling. It has sign-up, a monthly dashboard per plan, and an assistant that answers only from what is on the page instead of making things up.',
    'sis.wardpoint.sobre': 'A subscription product that reviews every match a player runs and points out, at the exact second of the replay, the mistake that cost the win. It involves analysis over match data, a Windows desktop application and the recurring billing flow.',

    'tag.telecardiologia': 'Telecardiology',
    'tag.apis': 'APIs',
    'tag.banco': 'Database modelling',
    'tag.saude': 'Healthcare',
    'tag.infra': 'Infrastructure',
    'tag.admin': 'Admin area',
    'tag.design': 'Interface design',
    'tag.auth': 'Authentication',
    'tag.assinaturas': 'Subscriptions',
    'tag.dados': 'Data analysis',
    'tag.desktop': 'Desktop app',
    'tag.recorrente': 'Recurring billing',

    'stack.rotulo': 'Tech stack',
    'stack.nota': 'What I use to build and keep the above running.',
    'stack.linguagens': 'Languages',
    'stack.ml': 'Machine learning and data',
    'stack.frameworks': 'Frameworks and libraries',
    'stack.bancos': 'Databases',
    'stack.cloud': 'Cloud and infrastructure',
    'stack.iaauto': 'AI and automation',
    'stack.eng': 'Engineering and compliance',
    'stack.nlp': 'Natural language processing',
    'stack.features': 'Feature engineering',
    'stack.supervisionado': 'Supervised and unsupervised learning',
    'stack.viz': 'Data visualisation',
    'stack.redes': 'Network administration',
    'stack.servidor': 'Server hardware',
    'stack.skills': 'Custom AI Skills',
    'stack.llms': 'Local and self-hosted LLMs',
    'stack.open': 'Open-source models',
    'stack.rotinas': 'Routine automation',
    'stack.review': 'Automated code review',
    'stack.a11y': 'Accessibility',
    'stack.dominios': 'Domains and subdomains',

    'stack.seguranca': 'Security and access',
    'stack.rbac': 'Role-based access control',
    'desc.linguagens': 'Python for the model and the analysis, TypeScript from backend to frontend.',
    'desc.ml': 'From cleaning the data to a trained and evaluated model.',
    'desc.frameworks': 'Angular on Imacardios, Next.js on Torii Tech, Node.js across the backends.',
    'desc.bancos': 'Modelled from the first diagram, across all five systems.',
    'desc.seguranca': 'Authentication and sessions on platforms that handle patient data.',
    'desc.cloud': 'The DNS, certificate and domain behind everything that is live.',
    'desc.iaauto': 'Tools of my own and models running on my own machine.',
    'desc.eng': 'What a delivery has to meet before it reaches production.',

    'imp.rotulo': 'What they deliver',
    'imp.nota': 'The numbers these systems move every month.',

    'traj.rotulo': 'Experience',
    'traj.nota': 'Where I have worked and studied, in order.',
    'traj.atual': 'current',

    'cod.rotulo': 'Open source',
    'cod.nota': 'Public repositories, read straight from GitHub. Two of them are skills I wrote for Claude.',
    'cod.carregando': 'Loading repositories…',
    'cod.todos': 'See all on GitHub',
    'cod.semdesc': 'No description on the repository.',
    'cod.estrela': 'star',
    'cod.estrelas': 'stars',

    'rod.chamada': 'Open to projects and technical conversations.',
    'rod.papel': 'Data scientist, AI engineer and full-stack developer — Brazil, open to remote work',
    'rod.base': 'Page built by hand, without a framework, published on GitHub Pages.'
  }
};
