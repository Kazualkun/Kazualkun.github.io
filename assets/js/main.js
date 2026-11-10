/* ===========================================================
   Gustavo Kazuo Momma — portfólio
   Sem dependências. Tema, entrada da abertura e repositórios.
   =========================================================== */

(function () {
  'use strict';

  var raiz = document.documentElement;
  raiz.classList.add('js');

  /* ---------- Tema ---------- */
  var botao = document.getElementById('btn-tema');

  function aplicarTema(tema) {
    raiz.dataset.theme = tema;
    var escuro = tema === 'dark';
    if (botao) {
      botao.setAttribute('aria-pressed', String(escuro));
      var texto = botao.querySelector('.tema__texto');
      if (texto) texto.textContent = escuro ? 'Tema claro' : 'Tema escuro';
    }
  }

  aplicarTema(raiz.dataset.theme || 'light');

  if (botao) {
    botao.addEventListener('click', function () {
      var proximo = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
      aplicarTema(proximo);
      try { localStorage.setItem('tema', proximo); } catch (e) {}
    });
  }

  /* Acompanha o sistema enquanto a pessoa não escolheu nada. */
  var consulta = window.matchMedia('(prefers-color-scheme: dark)');
  var ouvir = consulta.addEventListener ? 'addEventListener' : 'addListener';
  consulta[ouvir]('change', function (ev) {
    var salvo = null;
    try { salvo = localStorage.getItem('tema'); } catch (e) {}
    if (!salvo) aplicarTema(ev.matches ? 'dark' : 'light');
  });

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ---------- Entrada da abertura (um único momento) ---------- */
  var indice = document.querySelector('.indice');
  if (indice) {
    var linhas = indice.querySelectorAll('.indice__linha');
    for (var i = 0; i < linhas.length; i++) {
      linhas[i].style.setProperty('--i', String(i));
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { indice.classList.add('indice--pronto'); });
    });
  }

  /* ---------- Repositórios do GitHub ---------- */
  var USUARIO = 'Kazualkun';
  var QUANTOS = 6;
  var IGNORAR = ['Kazualkun'];           // repositório de configuração do perfil
  var alvo = document.getElementById('repos');
  if (!alvo) return;

  var CORES = {
    Python: '#3572A5', JavaScript: '#F1E05A', TypeScript: '#3178C6', PHP: '#4F5D95',
    HTML: '#E34C26', CSS: '#563D7C', PowerShell: '#012456', Dart: '#00B4AB',
    Java: '#B07219', 'C#': '#178600', Shell: '#89E051', Jupyter: '#DA5B0B'
  };

  /* Se a API falhar ou estourar o limite, a seção ainda mostra conteúdo real. */
  var RESERVA = [
    { name: 'Blindagemjuridica', description: 'Skill de IA que revisa os pontos jurídicos de um site.', language: 'Python', stargazers_count: 7, html_url: 'https://github.com/Kazualkun/Blindagemjuridica' },
    { name: 'AI-PC-optimizer', description: 'Otimizador de computador e organizador de arquivos, como skill para o Claude.', language: 'PowerShell', stargazers_count: 1, html_url: 'https://github.com/Kazualkun/AI-PC-optimizer' },
    { name: 'Fintech-AI---Stock-Analysis-Prediction', description: 'Análise de ativos financeiros com machine learning.', language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Kazualkun/Fintech-AI---Stock-Analysis-Prediction' },
    { name: 'Urban_Risk_Inteligence_Sorocaba', description: 'Medidor de risco de alagamento na cidade de Sorocaba.', language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Kazualkun/Urban_Risk_Inteligence_Sorocaba' },
    { name: 'R2D2', description: 'Assistente social em Python.', language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Kazualkun/R2D2' },
    { name: 'evolution-of-cooperation', description: 'Simulação da evolução da cooperação em teoria dos jogos.', language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Kazualkun/evolution-of-cooperation' }
  ];

  function texto(valor, reserva) {
    return (valor && String(valor).trim()) || reserva;
  }

  function montar(lista) {
    alvo.innerHTML = '';
    var fragmento = document.createDocumentFragment();

    lista.forEach(function (repo) {
      var item = document.createElement('li');

      var link = document.createElement('a');
      link.className = 'repo';
      link.href = repo.html_url;
      link.target = '_blank';
      link.rel = 'noopener';

      var nome = document.createElement('span');
      nome.className = 'repo__nome';
      nome.textContent = repo.name;

      var sobre = document.createElement('span');
      sobre.className = 'repo__sobre';
      sobre.textContent = texto(repo.description, 'Sem descrição no repositório.');

      var meta = document.createElement('span');
      meta.className = 'repo__meta';

      if (repo.language) {
        var ling = document.createElement('span');
        ling.className = 'repo__ling';
        var ponto = document.createElement('span');
        ponto.className = 'repo__ponto';
        if (CORES[repo.language]) ponto.style.background = CORES[repo.language];
        ling.appendChild(ponto);
        ling.appendChild(document.createTextNode(repo.language));
        meta.appendChild(ling);
      }

      if (repo.stargazers_count > 0) {
        var estrelas = document.createElement('span');
        estrelas.textContent = repo.stargazers_count + (repo.stargazers_count === 1 ? ' estrela' : ' estrelas');
        meta.appendChild(estrelas);
      }

      link.appendChild(nome);
      link.appendChild(sobre);
      if (meta.childNodes.length) link.appendChild(meta);
      item.appendChild(link);
      fragmento.appendChild(item);
    });

    alvo.appendChild(fragmento);
    alvo.setAttribute('aria-busy', 'false');
  }

  function ordenar(repos) {
    return repos
      .filter(function (r) { return !r.fork && !r.archived && IGNORAR.indexOf(r.name) === -1; })
      .sort(function (a, b) {
        if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
        /* Um repositório descrito se apresenta melhor do que um sem descrição. */
        var da = a.description ? 1 : 0, db = b.description ? 1 : 0;
        if (db !== da) return db - da;
        return new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at);
      })
      .slice(0, QUANTOS);
  }

  var endereco = 'https://api.github.com/users/' + USUARIO + '/repos?per_page=100&sort=updated';

  fetch(endereco, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (resposta) {
      if (!resposta.ok) throw new Error('GitHub respondeu ' + resposta.status);
      return resposta.json();
    })
    .then(function (dados) {
      if (!Array.isArray(dados)) throw new Error('Resposta inesperada');
      var lista = ordenar(dados);
      montar(lista.length ? lista : RESERVA);
    })
    .catch(function () {
      montar(RESERVA);
    });
})();
