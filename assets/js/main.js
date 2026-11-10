/* ===========================================================
   Lógica da página. Todo o texto editável está em conteudo.js.
   Sem dependências.
   =========================================================== */

(function () {
  'use strict';

  var raiz = document.documentElement;
  raiz.classList.add('js');

  var estado = {
    lang: raiz.dataset.lang === 'en' ? 'en' : 'pt',
    github: null
  };

  function t(chave) {
    var d = TEXTOS[estado.lang] || TEXTOS.pt;
    return d[chave] || TEXTOS.pt[chave] || '';
  }

  function criar(tag, classe, texto) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto != null) n.textContent = texto;
    return n;
  }

  /* ---------- Tema ---------- */
  var btnTema = document.getElementById('btn-tema');

  function textoTema() {
    if (!btnTema) return;
    var escuro = raiz.dataset.theme === 'dark';
    btnTema.setAttribute('aria-pressed', String(escuro));
    var alvo = btnTema.querySelector('.tema__texto');
    if (alvo) alvo.textContent = escuro ? t('tema.claro') : t('tema.escuro');
  }

  if (btnTema) {
    btnTema.addEventListener('click', function () {
      raiz.dataset.theme = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
      textoTema();
      try { localStorage.setItem('tema', raiz.dataset.theme); } catch (e) {}
    });
  }

  var consultaTema = window.matchMedia('(prefers-color-scheme: dark)');
  consultaTema[consultaTema.addEventListener ? 'addEventListener' : 'addListener']('change', function (ev) {
    var salvo = null;
    try { salvo = localStorage.getItem('tema'); } catch (e) {}
    if (!salvo) { raiz.dataset.theme = ev.matches ? 'dark' : 'light'; textoTema(); }
  });

  /* ---------- Idioma ---------- */
  function aplicarIdioma(lang) {
    estado.lang = lang === 'en' ? 'en' : 'pt';
    raiz.dataset.lang = estado.lang;
    raiz.lang = estado.lang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      var v = t(n.getAttribute('data-i18n'));
      if (v) n.textContent = v;
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function (n) {
      var v = t(n.getAttribute('data-i18n-label'));
      if (v) n.setAttribute('aria-label', v);
    });

    var titulo = t('doc.titulo');
    if (titulo) document.title = titulo;

    document.querySelectorAll('.idioma button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === estado.lang));
    });

    textoTema();
    rotuloMenu();
    montarTrajetoria();
    montarLeituras();
    montarRepos();
    /* Depois de trocar o texto, o título é redividido em palavras. */
    partirTitulo();
  }

  document.querySelectorAll('.idioma button').forEach(function (b) {
    b.addEventListener('click', function () {
      aplicarIdioma(b.dataset.lang);
      try { localStorage.setItem('idioma', estado.lang); } catch (e) {}
    });
  });

  /* ---------- Menu em tela estreita ---------- */
  var btnMenu = document.getElementById('btn-menu');
  var gaveta = document.getElementById('gaveta');

  function rotuloMenu() {
    if (!btnMenu) return;
    var aberto = btnMenu.getAttribute('aria-expanded') === 'true';
    btnMenu.setAttribute('aria-label', aberto ? t('nav.fechar') : t('nav.abrir'));
  }

  function fecharMenu() {
    if (!btnMenu || !gaveta) return;
    btnMenu.setAttribute('aria-expanded', 'false');
    gaveta.hidden = true;
    rotuloMenu();
  }

  if (btnMenu && gaveta) {
    btnMenu.addEventListener('click', function () {
      var aberto = btnMenu.getAttribute('aria-expanded') === 'true';
      btnMenu.setAttribute('aria-expanded', String(!aberto));
      gaveta.hidden = aberto;
      rotuloMenu();
    });
    gaveta.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') fecharMenu();
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') fecharMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 832) fecharMenu();
    });
  }

  /* ---------- Progresso de leitura e seção ativa ---------- */
  var barra = document.querySelector('#progresso span');

  function progresso() {
    if (!barra) return;
    var alcance = document.documentElement.scrollHeight - window.innerHeight;
    var p = alcance > 0 ? Math.min(1, Math.max(0, window.scrollY / alcance)) : 0;
    barra.style.transform = 'scaleX(' + p + ')';
  }
  progresso();
  window.addEventListener('scroll', progresso, { passive: true });
  window.addEventListener('resize', progresso);

  var links = Array.prototype.slice.call(document.querySelectorAll('.navegacao a'));
  var alvos = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (alvos.length && 'IntersectionObserver' in window) {
    var visiveis = new Set();
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) visiveis.add(e.target.id); else visiveis.delete(e.target.id);
      });
      var atual = alvos.filter(function (s) { return visiveis.has(s.id); })[0];
      links.forEach(function (a) {
        if (atual && a.getAttribute('href') === '#' + atual.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    alvos.forEach(function (s) { observador.observe(s); });
  }

  /* ---------- Trajetória ---------- */
  var caixaLinha = document.getElementById('linha');

  function montarTrajetoria() {
    if (!caixaLinha || typeof TRAJETORIA === 'undefined') return;
    caixaLinha.innerHTML = '';

    TRAJETORIA.forEach(function (etapa) {
      var item = criar('li', 'etapa' + (etapa.atual ? ' etapa--atual' : ''));
      item.dataset.tipo = etapa.tipo || 'trabalho';

      /* O período aceita texto simples ou { pt, en }. */
      var periodo = etapa.periodo;
      if (periodo && typeof periodo === 'object') periodo = periodo[estado.lang] || periodo.pt || '';
      item.appendChild(criar('p', 'etapa__periodo', periodo || ''));

      var corpo = criar('div', 'etapa__corpo');
      var topo = criar('div', 'etapa__topo');
      topo.appendChild(criar('h3', 'etapa__cargo', (etapa.cargo && etapa.cargo[estado.lang]) || ''));
      if (etapa.atual) topo.appendChild(criar('span', 'etapa__agora', t('traj.atual')));
      corpo.appendChild(topo);
      corpo.appendChild(criar('p', 'etapa__org', etapa.org));

      var pontos = (etapa.pontos && etapa.pontos[estado.lang]) || [];
      if (pontos.length) {
        var lista = criar('ul', 'etapa__pontos');
        pontos.forEach(function (p) { lista.appendChild(criar('li', null, p)); });
        corpo.appendChild(lista);
      }

      item.appendChild(corpo);
      caixaLinha.appendChild(item);
    });
  }

  /* ---------- Números ---------- */
  var caixaLeituras = document.getElementById('leituras');

  function montarLeituras() {
    if (!caixaLeituras || typeof METRICAS === 'undefined') return;
    caixaLeituras.innerHTML = '';
    var postos = 0;

    METRICAS.forEach(function (m) {
      var valor = m.valor;
      if (valor && typeof valor === 'object') valor = valor[estado.lang] || valor.pt;
      if (m.fonte) {
        if (!estado.github) return;            // sem dado ainda: o posto não aparece
        valor = String(estado.github[m.fonte]);
      }
      if (valor == null || valor === '') return;

      var posto = criar('div', 'leitura');
      posto.appendChild(criar('dt', 'leitura__valor', valor));
      posto.appendChild(criar('dd', 'leitura__rotulo', (m.rotulo && m.rotulo[estado.lang]) || ''));
      caixaLeituras.appendChild(posto);
      postos++;
    });

    caixaLeituras.hidden = postos === 0;
  }

  /* ---------- Repositórios do GitHub ---------- */
  var USUARIO = 'Kazualkun';
  var QUANTOS = 6;
  var IGNORAR = ['Kazualkun'];
  var caixaRepos = document.getElementById('repos');

  var CORES = {
    Python: '#3572A5', JavaScript: '#F1E05A', TypeScript: '#3178C6', PHP: '#4F5D95',
    HTML: '#E34C26', CSS: '#563D7C', PowerShell: '#012456', Dart: '#00B4AB',
    Java: '#B07219', 'C#': '#178600', Shell: '#89E051'
  };

  var RESERVA = [
    { name: 'Blindagemjuridica', description: 'Skill de IA que revisa os pontos jurídicos de um site.', language: 'Python', stargazers_count: 7, html_url: 'https://github.com/Kazualkun/Blindagemjuridica' },
    { name: 'AI-PC-optimizer', description: 'Otimizador de computador e organizador de arquivos, como skill para o Claude.', language: 'PowerShell', stargazers_count: 1, html_url: 'https://github.com/Kazualkun/AI-PC-optimizer' },
    { name: 'Fintech-AI---Stock-Analysis-Prediction', description: 'Análise de ativos financeiros com machine learning.', language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Kazualkun/Fintech-AI---Stock-Analysis-Prediction' },
    { name: 'Urban_Risk_Inteligence_Sorocaba', description: 'Medidor de risco de alagamento na cidade de Sorocaba.', language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Kazualkun/Urban_Risk_Inteligence_Sorocaba' },
    { name: 'R2D2', description: 'Assistente social em Python.', language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Kazualkun/R2D2' },
    { name: 'evolution-of-cooperation', description: 'Simulação da evolução da cooperação em teoria dos jogos.', language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Kazualkun/evolution-of-cooperation' }
  ];

  var listaRepos = null;

  function montarRepos() {
    if (!caixaRepos) return;
    var lista = listaRepos || [];
    if (!lista.length) return;

    caixaRepos.innerHTML = '';
    var frag = document.createDocumentFragment();

    lista.forEach(function (repo) {
      var item = document.createElement('li');
      var link = criar('a', 'repo');
      link.href = repo.html_url;
      link.target = '_blank';
      link.rel = 'noopener';

      link.appendChild(criar('span', 'repo__nome', repo.name));
      link.appendChild(criar('span', 'repo__sobre',
        (repo.description && String(repo.description).trim()) || t('cod.semdesc')));

      var meta = criar('span', 'repo__meta');
      if (repo.language) {
        var ling = criar('span', 'repo__ling');
        var ponto = criar('span', 'repo__ponto');
        if (CORES[repo.language]) ponto.style.background = CORES[repo.language];
        ling.appendChild(ponto);
        ling.appendChild(document.createTextNode(repo.language));
        meta.appendChild(ling);
      }
      if (repo.stargazers_count > 0) {
        meta.appendChild(criar('span', null, repo.stargazers_count + ' ' +
          (repo.stargazers_count === 1 ? t('cod.estrela') : t('cod.estrelas'))));
      }
      if (meta.childNodes.length) link.appendChild(meta);

      item.appendChild(link);
      frag.appendChild(item);
    });

    caixaRepos.appendChild(frag);
    caixaRepos.setAttribute('aria-busy', 'false');
  }

  function ordenar(repos) {
    return repos
      .filter(function (r) { return !r.fork && !r.archived && IGNORAR.indexOf(r.name) === -1; })
      .sort(function (a, b) {
        if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
        var da = a.description ? 1 : 0, db = b.description ? 1 : 0;
        if (db !== da) return db - da;
        return new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at);
      })
      .slice(0, QUANTOS);
  }

  fetch('https://api.github.com/users/' + USUARIO + '/repos?per_page=100&sort=updated',
        { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) {
      if (!r.ok) throw new Error('GitHub respondeu ' + r.status);
      return r.json();
    })
    .then(function (dados) {
      if (!Array.isArray(dados)) throw new Error('Resposta inesperada');
      var proprios = dados.filter(function (r) { return !r.fork && IGNORAR.indexOf(r.name) === -1; });
      estado.github = {
        repos: proprios.length,
        estrelas: proprios.reduce(function (s, r) { return s + (r.stargazers_count || 0); }, 0)
      };
      var escolhidos = ordenar(dados);
      listaRepos = escolhidos.length ? escolhidos : RESERVA;
      montarRepos();
      montarLeituras();
    })
    .catch(function () {
      listaRepos = RESERVA;
      montarRepos();
    });

  /* ---------- Movimento ---------- */
  var paradoPorPreferencia = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* O título vira uma palavra por caixa, para subirem em sequência. */
  var titulo = document.querySelector('.abertura__titulo');

  function partirTitulo() {
    if (!titulo) return;
    var palavras = titulo.textContent.trim().split(/\s+/);
    titulo.textContent = '';
    palavras.forEach(function (palavra, i) {
      var caixa = criar('span', 'pal');
      caixa.style.setProperty('--p', String(i));
      caixa.appendChild(criar('span', null, palavra));
      titulo.appendChild(caixa);
      if (i < palavras.length - 1) titulo.appendChild(document.createTextNode(' '));
    });
    titulo.classList.add('partido');
  }

  function revelarTitulo() {
    if (titulo) titulo.classList.add('revelar');
  }

  var indice = document.querySelector('.indice');
  if (indice) {
    indice.querySelectorAll('.indice__linha').forEach(function (n, i) {
      n.style.setProperty('--i', String(i));
    });
  }

  /* Marca os alvos antes de qualquer coisa esconder nada. */
  function marcar(seletor, classe) {
    document.querySelectorAll(seletor).forEach(function (n) { n.dataset.entrada = classe; });
  }
  marcar('.bloco', 'bloco--visto');
  marcar('.registro', 'registro--visto');
  if (caixaLinha) caixaLinha.dataset.entrada = 'linha--vista';
  if (caixaLeituras) caixaLeituras.dataset.entrada = 'leituras--vistas';

  function revelar(alvo) {
    if (!alvo || !alvo.dataset.entrada) return;
    alvo.classList.add(alvo.dataset.entrada);
    if (alvo.dataset.entrada === 'leituras--vistas') contarNumeros();
  }

  function revelarTudo() {
    document.querySelectorAll('[data-entrada]').forEach(revelar);
    revelarTitulo();
    if (indice) indice.classList.add('indice--pronto');
    /* Se a contagem travou no meio, grava o valor final. */
    document.querySelectorAll('.leitura__valor[data-final]').forEach(function (n) {
      n.textContent = n.dataset.final;
    });
  }

  /* O CSS só esconde depois que o mecanismo que revela está de pé.
     Se este trecho falhar, a página fica estática — nunca invisível. */
  var podeAnimar = !paradoPorPreferencia && 'IntersectionObserver' in window;

  if (!podeAnimar) {
    revelarTudo();
  } else {
    raiz.classList.add('anim');

    var aoEntrar = new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        revelar(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('[data-entrada]').forEach(function (n) { aoEntrar.observe(n); });

    /* Uma sequência só: título sobe, índice entra atrás. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        revelarTitulo();
        if (indice) indice.classList.add('indice--pronto');
      });
    });

    /* Rede de segurança: nada fica escondido por mais de dois segundos e meio. */
    setTimeout(revelarTudo, 2500);
  }

  /* Os números sobem até o valor, preservando prefixo e sufixo do texto. */
  var jaContou = false;

  function contarNumeros() {
    if (jaContou || paradoPorPreferencia || !caixaLeituras) return;
    jaContou = true;

    caixaLeituras.querySelectorAll('.leitura__valor').forEach(function (n) {
      var texto = n.textContent;
      var casado = texto.match(/^(\D*)([\d.,]+)(\D*)$/);
      if (!casado) return;

      var cru = casado[2];
      var alvo = parseInt(cru.replace(/\D/g, ''), 10);
      if (!isFinite(alvo) || alvo === 0) return;

      var separador = cru.indexOf('.') > -1 ? '.' : (cru.indexOf(',') > -1 ? ',' : '');
      var inicio = null;
      var duracao = 1100;

      function formatar(v) {
        var s = String(v);
        if (separador && alvo >= 1000) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
        return casado[1] + s + casado[3];
      }

      function passo(agora) {
        if (inicio === null) inicio = agora;
        var p = Math.min(1, (agora - inicio) / duracao);
        var suave = 1 - Math.pow(1 - p, 4);
        n.textContent = formatar(Math.round(alvo * suave));
        if (p < 1) requestAnimationFrame(passo);
      }

      /* Sem zerar antes da hora: se o rAF não rodar, o número fica no valor certo. */
      n.dataset.final = texto;
      requestAnimationFrame(passo);
    });
  }

  /* ---------- Ano ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ---------- Arranque ---------- */
  aplicarIdioma(estado.lang);
})();
