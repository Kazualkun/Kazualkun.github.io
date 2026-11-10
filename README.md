# Portfólio — Gustavo Kazuo Momma

Página pessoal estática: HTML, CSS e JavaScript escritos à mão, sem framework e sem
etapa de build. Publica direto no GitHub Pages.

## Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Portfólio"
git branch -M main
git remote add origin https://github.com/Kazualkun/Kazualkun.github.io.git
git push -u origin main
```

Depois abra **Settings → Pages** no repositório e aponte *Source* para a branch `main`,
pasta `/ (root)`. Em um ou dois minutos a página responde em `https://kazualkun.github.io`.

Para atualizar a página depois de qualquer mudança:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

## Rodar localmente

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`. Abrir o `index.html` direto pelo sistema de arquivos
também funciona, mas a busca de repositórios no GitHub só responde servida por HTTP.

## Único ajuste opcional depois de publicar

A tag `og:image` no `index.html` usa caminho relativo. WhatsApp e LinkedIn só mostram a
pré-visualização com URL absoluta, então, depois do primeiro deploy, troque para:

```html
<meta property="og:image" content="https://kazualkun.github.io/assets/img/og.png">
```

## Estrutura

```
index.html            página inteira
assets/css/style.css  tokens de cor e tipografia, tema claro e escuro
assets/js/main.js     tema, entrada da abertura e repositórios do GitHub
assets/img/           capturas dos sistemas (WebP) e imagem de pré-visualização
assets/favicon.svg    monograma, adapta ao tema do sistema
prints/               capturas originais em PNG, fonte das imagens otimizadas
.nojekyll             impede o Jekyll de processar a pasta assets
```

A pasta `prints/` não é usada pela página — serve só de arquivo. Pode removê-la do
repositório se quiser economizar espaço.

## Detalhes de implementação

- **Repositórios ao vivo.** A seção *Código aberto* lê a API pública do GitHub no
  carregamento e ordena por estrelas, depois por ter descrição, depois por atualização.
  Se a API falhar ou estourar o limite de requisições, uma lista de reserva no
  `main.js` assume o lugar — a seção nunca aparece vazia. Para destacar outro
  repositório, escreva uma descrição nele no GitHub: a página se atualiza sozinha.
- **Tema.** Segue o sistema operacional por padrão e guarda a escolha manual no
  `localStorage`. O tema é aplicado antes da primeira pintura, então não há piscada.
- **Imagens.** As capturas foram convertidas para WebP a 1600px de largura
  (1,7 MB → 202 kB) e carregam sob demanda.
- **Acessibilidade.** Link para pular ao conteúdo, marcos semânticos, foco visível,
  contraste conferido nos dois temas e `prefers-reduced-motion` respeitado.
- **Sem dependências.** Nenhum pacote, nenhum CDN de JavaScript. A única requisição
  externa é a dos tipos no Google Fonts.
