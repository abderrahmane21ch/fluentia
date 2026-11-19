/* ==========================================================================
   Fluentia — hash router
   Pages: { title, auth?, render(params, query) -> html, mount?(root, params, query) -> cleanup? }
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.router = (function () {
  const routes = [];
  let cleanup = null;
  let current = { path: '/', query: {} };

  function add(pattern, pageName) {
    const keys = [];
    const re = new RegExp('^' + pattern.replace(/\/:([^/]+)/g, (_, k) => { keys.push(k); return '/([^/]+)'; }) + '/?$');
    routes.push({ re, keys, pageName });
  }
  function parse() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const qi = raw.indexOf('?');
    const path = (qi >= 0 ? raw.slice(0, qi) : raw) || '/';
    const qs = qi >= 0 ? raw.slice(qi + 1) : '';
    const query = {};
    new URLSearchParams(qs).forEach((v, k) => { query[k] = v; });
    return { path: path.startsWith('/') ? path : '/' + path, query, raw };
  }
  function go(target) {
    const h = '#' + target.replace(/^#/, '');
    if (location.hash === h) render(); else location.hash = h;
  }
  function render() {
    if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
    if (FL.speech) FL.speech.stop();
    FL.ui.closeAll();
    const { path, query, raw } = parse();
    let match = null;
    const params = {};
    for (const r of routes) {
      const m = path.match(r.re);
      if (m) {
        match = r;
        r.keys.forEach((k, i) => { try { params[k] = decodeURIComponent(m[i + 1]); } catch (e) { params[k] = m[i + 1]; } });
        break;
      }
    }
    const page = (match && FL.pages[match.pageName]) || FL.pages.notFound;
    if (page.auth && !FL.auth.current()) { go('/login?next=' + encodeURIComponent(raw)); return; }
    if (page.guestOnly && FL.auth.current()) { go(query.next && query.next.startsWith('/') ? query.next : '/dashboard'); return; }
    current = { path, query, params };
    const main = document.getElementById('main');
    try {
      main.innerHTML = page.render(params, query);
      const t = typeof page.title === 'function' ? page.title(params, query) : page.title;
      document.title = t ? `${t} · ${FL.config.brand}` : `${FL.config.brand} — English & French lessons with ${FL.config.teacher.shortName}`;
      const c = page.mount && page.mount(main, params, query);
      if (typeof c === 'function') cleanup = c;
    } catch (e) {
      console.error(e);
      main.innerHTML = `<section class="section"><div class="container center"><h1>Something went wrong</h1><p class="muted">Please refresh the page. If it keeps happening, try clearing this site’s data in Settings.</p><a class="btn btn-primary" href="#/">Back home</a></div></section>`;
    }
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    FL.ui.reveal(main);
    FL.bus.emit('route', current);
  }
  function start() { window.addEventListener('hashchange', render); render(); }
  return { add, go, start, render, parse, get current() { return current; } };
})();
