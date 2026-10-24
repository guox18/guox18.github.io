(() => {
  'use strict';
  const article = document.querySelector('.reading-page');
  const zh = article?.lang === 'zh-CN';
  const index = document.querySelector('.writing-index');
  if (index) {
    const entries = [...index.querySelectorAll('.writing-entry')];
    index.querySelectorAll('[data-topic-filter]').forEach(button => {
      button.addEventListener('click', () => {
        index.querySelectorAll('[data-topic-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        entries.forEach(entry => { entry.hidden = button.dataset.topicFilter !== 'all' && entry.dataset.topic !== button.dataset.topicFilter; });
        index.querySelector('.writing-empty').hidden = entries.some(entry => !entry.hidden);
      });
    });
  }
  if (!article) return;
  const content = article.querySelector('.reading-content');
  const toc = article.querySelector('.reading-toc');
  const headings = [...content.querySelectorAll('h2, h3')];
  if (headings.length) {
    toc.hidden = false;
    const list = toc.querySelector('ol');
    headings.forEach((heading, i) => {
      if (!heading.id) heading.id = `section-${i + 1}`;
      const item = document.createElement('li');
      item.className = heading.tagName === 'H3' ? 'toc-subheading' : 'toc-heading';
      const link = document.createElement('a');
      link.href = `#${encodeURIComponent(heading.id)}`;
      link.textContent = heading.textContent;
      item.append(link); list.append(item);
    });
    const wide = matchMedia('(min-width: 900px)');
    const adapt = () => { toc.querySelector('details').open = wide.matches; };
    adapt(); wide.addEventListener('change', adapt);
  }
  const graph = article.querySelector('.article-graph');
  if (!graph) return;
  let state = 'idle';
  graph.addEventListener('toggle', async () => {
    if (!graph.open || state === 'loading' || state === 'ready') return;
    state = 'loading';
    const status = graph.querySelector('.graph-status');
    status.textContent = zh ? '正在加载引用关系…' : 'Loading article connections…';
    try {
      const response = await fetch(graph.dataset.graphSource);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const posts = (await response.json()).filter(post => post.lang === article.lang);
      const normalize = raw => {
        const url = new URL(raw, location.origin);
        return url.origin === location.origin ? decodeURI(url.pathname).replace(/\/$/, '') : null;
      };
      const current = normalize(article.dataset.blogUrl);
      const nodes = new Map(posts.map(post => [normalize(post.url), post]));
      const edges = [];
      posts.forEach(post => {
        const source = normalize(post.url);
        const parsed = new DOMParser().parseFromString(post.html, 'text/html');
        const targets = new Set([...parsed.querySelectorAll('a[href]')].map(link => {
          const raw = link.getAttribute('href');
          // Resolve relative links against the source article, not the page being read.
          try { return normalize(new URL(raw, new URL(post.url, location.origin)).href); } catch { return null; }
        }));
        targets.forEach(target => { if (target !== source && nodes.has(target)) edges.push([source, target]); });
      });
      const outgoing = edges.filter(([from]) => from === current).map(([, to]) => to);
      const incoming = edges.filter(([, to]) => to === current).map(([from]) => from);
      const neighbors = [...new Set([...outgoing, ...incoming])];
      const links = graph.querySelector('.graph-links');
      links.replaceChildren();
      const addList = (title, urls) => {
        if (!urls.length) return;
        const heading = document.createElement('h3'); heading.textContent = title;
        const list = document.createElement('ul');
        urls.forEach(url => {
          const item = document.createElement('li'); const link = document.createElement('a');
          link.href = nodes.get(url).url; link.textContent = nodes.get(url).title;
          item.append(link); list.append(item);
        });
        links.append(heading, list);
      };
      addList(zh ? '本文引用' : 'Referenced here', outgoing);
      addList(zh ? '引用本文' : 'Links to this article', incoming);
      if (!neighbors.length) {
        status.textContent = zh ? '这篇文章暂时没有站内引用。' : 'This article has no internal references yet.';
        state = 'ready'; return;
      }
      const visible = [current, ...neighbors.slice(0, 6)];
      const svgNS = 'http://www.w3.org/2000/svg';
      const make = (tag, attrs = {}) => {
        const element = document.createElementNS(svgNS, tag);
        Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
      };
      const svg = make('svg', { viewBox: '0 0 760 360', role: 'group', 'aria-label': zh ? '可点击的文章引用关系图' : 'Linked article references' });
      const defs = make('defs'); const marker = make('marker', { id: 'article-arrow', viewBox: '0 0 10 10', refX: '9', refY: '5', markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse' });
      marker.append(make('path', { d: 'M 0 0 L 10 5 L 0 10 z', fill: 'currentColor' })); defs.append(marker); svg.append(defs);
      const positions = new Map([[current, [190, 180]]]);
      visible.slice(1).forEach((url, i, all) => positions.set(url, [560, all.length === 1 ? 180 : 40 + i * 280 / (all.length - 1)]));
      edges.forEach(([from, to]) => {
        if (!positions.has(from) || !positions.has(to) || (from !== current && to !== current)) return;
        const [x1, y1] = positions.get(from); const [x2, y2] = positions.get(to);
        const direction = Math.sign(x2 - x1);
        // Reciprocal references get separate lines so both arrowheads remain visible.
        const offset = from === current ? -5 : 5;
        svg.append(make('line', { x1: x1 + direction * 115, y1: y1 + offset, x2: x2 - direction * 120, y2: y2 + offset, 'marker-end': 'url(#article-arrow)', class: 'graph-edge' }));
      });
      visible.forEach(url => {
        const post = nodes.get(url); if (!post) return;
        const [x, y] = positions.get(url); const link = make('a', { href: post.url, 'aria-label': post.title, class: url === current ? 'graph-node graph-current' : 'graph-node' });
        if (url === current) link.setAttribute('aria-current', 'page');
        const title = make('title'); title.textContent = post.title; link.append(title);
        link.append(make('rect', { x: x - 112, y: y - 24, width: 224, height: 48, rx: 5 }));
        const text = make('text', { x, y: y + 5, 'text-anchor': 'middle' });
        const letters = [...post.title];
        text.textContent = letters.length > 20 ? letters.slice(0, 19).join('') + '…' : post.title;
        link.append(text); svg.append(link);
      });
      graph.querySelector('.graph-canvas').replaceChildren(svg);
      status.textContent = neighbors.length > 6 ? (zh ? '图中显示前 6 篇，完整引用见下方列表。' : 'The map shows six neighbors. All references are listed below.') : '';
      state = 'ready';
    } catch {
      state = 'error';
      status.textContent = zh ? '导航图暂时无法加载。正文链接仍可使用，重新展开可重试。' : 'The map could not load. Links in the article still work; reopen to retry.';
    }
  });
})();
