/* ==========================================================================
   Fluentia — app shell: header, footer, theme, global shortcuts, routes.
   ========================================================================== */
window.FL = window.FL || {};

FL.app = (function () {
  const { icon, esc } = FL.ui;

  const LOGO = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#f26b5b"/></linearGradient></defs><rect width="40" height="40" rx="12" fill="url(#lg)"/><path d="M12 28V12h13M12 20h10" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="29" cy="27" r="3" fill="#fff"/></svg>`;

  const NAV = [
    { href: '#/courses', label: 'Courses', match: ['/courses', '/course'] },
    { href: '#/placement', label: 'Level test', match: ['/placement'] },
    { href: '#/practice', label: 'Practice', match: ['/practice'] },
    { href: '#/pricing', label: 'Pricing', match: ['/pricing'] },
    { href: '#/about', label: 'Teacher', match: ['/about'] }
  ];

  function theme() { return document.documentElement.dataset.theme || 'light'; }
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0d0e13' : '#faf8f5');
  }
  function toggleTheme() {
    const t = theme() === 'dark' ? 'light' : 'dark';
    applyTheme(t);
    FL.prefs.set({ theme: t });
    renderHeader();
  }

  function renderHeader() {
    const user = FL.auth.current();
    const path = FL.router.current.path || '/';
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    const navHtml = NAV.map(n => `<a href="${n.href}" class="${n.match.some(m => path === m || path.startsWith(m + '/')) ? 'active' : ''}">${n.label}</a>`).join('');
    const d = user ? FL.db.load() : null;
    document.getElementById('site-header').innerHTML = `
      <div class="container header-inner">
        <a href="#/" class="logo" aria-label="${esc(FL.config.brand)} home">${LOGO}<span>${esc(FL.config.brand)}</span></a>
        <nav class="nav" aria-label="Main">${navHtml}</nav>
        <div class="header-actions">
          <button class="search-trigger hide-mobile" data-action="palette" aria-label="Search (${isMac ? 'Command' : 'Control'} K)">${icon('search')}<span class="label">Search…</span><span class="kbd">${isMac ? '⌘' : 'Ctrl'} K</span></button>
          <button class="icon-btn" data-action="theme" aria-label="Switch to ${theme() === 'dark' ? 'light' : 'dark'} mode" title="Toggle theme">${icon(theme() === 'dark' ? 'sun' : 'moon')}</button>
          ${user ? `
            <a class="btn btn-primary btn-sm hide-mobile" href="#/book">${icon('calendar')} Book lesson</a>
            <div class="user-menu">
              <button data-action="user-menu" aria-haspopup="true" aria-expanded="false" aria-label="Account menu"><span class="avatar">${esc(FL.util.initials(user.name))}</span></button>
              <div class="dropdown" hidden>
                <div class="dd-head"><strong>${esc(user.name)}</strong><div class="tiny muted">${esc(user.email)}</div>
                  <div class="row mt-1" style="gap:6px"><span class="badge badge-warning">${icon('zap')} ${d.xp} XP</span><span class="badge badge-primary">${d.credits} credit${d.credits === 1 ? '' : 's'}</span></div></div>
                <hr>
                <a href="#/dashboard">${icon('grid')} Dashboard</a>
                <a href="#/book">${icon('calendar')} Book a lesson</a>
                <a href="#/practice">${icon('layers')} Practice hub</a>
                <a href="#/settings">${icon('settings')} Settings</a>
                <hr>
                <button data-action="logout">${icon('logout')} Sign out</button>
              </div>
            </div>` : `
            <a class="btn btn-ghost btn-sm hide-mobile" href="#/login">Sign in</a>
            <a class="btn btn-primary btn-sm hide-mobile" href="#/register">Start free</a>`}
          <button class="icon-btn menu-toggle" data-action="menu" aria-label="Open menu" aria-expanded="false">${icon('menu')}</button>
        </div>
      </div>
      <div class="mobile-nav" id="mobile-nav">
        <a href="#/">Home</a>${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join('')}
        <a href="#/classroom/demo">Virtual classroom demo</a>
        ${user ? `<a href="#/dashboard">Dashboard</a><a href="#/settings">Settings</a>
          <a class="btn btn-primary btn-block btn-lg" href="#/book">Book a lesson</a>
          <button class="btn btn-ghost btn-block" data-action="logout">Sign out</button>`
        : `<a class="btn btn-primary btn-block btn-lg" href="#/register">Create free account</a><a class="btn btn-block" href="#/login">Sign in</a>`}
      </div>`;
  }

  function renderFooter() {
    const t = FL.config.teacher;
    const y = new Date().getFullYear();
    document.getElementById('site-footer').innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="#/" class="logo">${LOGO}<span>${esc(FL.config.brand)}</span></a>
            <p class="muted mt-2" style="max-width:340px">${esc(FL.config.tagline)} 1-on-1 online lessons with ${esc(t.name)}, from ${esc(t.location)}.</p>
            <div class="row row-wrap mt-2">
              <a class="btn btn-sm" href="mailto:${esc(t.email)}">${icon('mail')} Email</a>
              ${t.whatsapp ? `<a class="btn btn-sm" href="https://wa.me/${esc(t.whatsapp)}" target="_blank" rel="noopener">${icon('message')} WhatsApp</a>` : ''}
            </div>
          </div>
          <div><h4>Learn</h4><ul>
            <li><a href="#/courses">All courses</a></li><li><a href="#/placement">Placement test</a></li>
            <li><a href="#/practice">Practice hub</a></li><li><a href="#/classroom/demo">Classroom demo</a></li></ul></div>
          <div><h4>Lessons</h4><ul>
            <li><a href="#/book?type=trial">Free trial</a></li><li><a href="#/book">Book a lesson</a></li>
            <li><a href="#/pricing">Pricing</a></li><li><a href="#/about">Your teacher</a></li></ul></div>
          <div><h4>Account</h4><ul>
            <li><a href="#/dashboard">Dashboard</a></li><li><a href="#/settings">Settings</a></li>
            <li><button class="btn-link" data-action="palette" style="background:none;border:0;padding:0;color:var(--text-2)">Quick search</button></li></ul></div>
        </div>
        <div class="footer-bottom">
          <span>© ${y} ${esc(FL.config.brand)} · ${esc(t.name)}</span>
          <span>Designed & built from scratch by ${esc(t.name)} · HTML, CSS & vanilla JavaScript</span>
        </div>
      </div>`;
  }

  function closeMenus() {
    document.querySelectorAll('.user-menu .dropdown').forEach(d => { d.hidden = true; });
    document.querySelectorAll('[data-action="user-menu"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    const mn = document.getElementById('mobile-nav');
    if (mn && mn.classList.contains('open')) {
      mn.classList.remove('open');
      const t = document.querySelector('[data-action="menu"]');
      if (t) { t.setAttribute('aria-expanded', 'false'); t.innerHTML = icon('menu'); }
    }
  }

  function bindGlobal() {
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-action]');
      const inMenu = e.target.closest('.user-menu');
      if (!inMenu) document.querySelectorAll('.user-menu .dropdown').forEach(d => { d.hidden = true; });
      if (!a) {
        if (e.target.closest('#mobile-nav a')) closeMenus();
        return;
      }
      const act = a.dataset.action;
      if (act === 'theme') toggleTheme();
      else if (act === 'palette') { closeMenus(); FL.ui.palette(); }
      else if (act === 'logout') {
        closeMenus();
        FL.auth.logout();
        FL.router.go('/');
        FL.ui.toast('Signed out. See you soon!', 'success');
      } else if (act === 'user-menu') {
        const dd = a.parentElement.querySelector('.dropdown');
        dd.hidden = !dd.hidden;
        a.setAttribute('aria-expanded', String(!dd.hidden));
      } else if (act === 'menu') {
        const mn = document.getElementById('mobile-nav');
        const open = !mn.classList.contains('open');
        mn.classList.toggle('open', open);
        a.setAttribute('aria-expanded', String(open));
        a.innerHTML = icon(open ? 'x' : 'menu');
      } else if (act === 'skip') {
        const m = document.getElementById('main'); m.focus();
      } else if (act === 'scroll') {
        const el = document.getElementById(a.dataset.target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); FL.ui.palette(); }
      if (e.key === 'Escape') closeMenus();
    });
    const header = document.getElementById('site-header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = ev => { if (!FL.prefs.get().theme) { applyTheme(ev.matches ? 'dark' : 'light'); renderHeader(); } };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
    }
    // Keep tabs in sync (e.g. sign out in another tab).
    window.addEventListener('storage', e => {
      if (e.key && e.key.startsWith(FL.config.storagePrefix + 'session')) { renderHeader(); FL.router.render(); }
    });
  }

  function registerRoutes() {
    const r = FL.router;
    r.add('/', 'home');
    r.add('/courses', 'courses');
    r.add('/course/:id', 'course');
    r.add('/placement', 'placement');
    r.add('/book', 'book');
    r.add('/pricing', 'pricing');
    r.add('/about', 'about');
    r.add('/login', 'login');
    r.add('/register', 'register');
    r.add('/dashboard', 'dashboard');
    r.add('/practice', 'practice');
    r.add('/classroom/:id', 'classroom');
    r.add('/settings', 'settings');
  }

  function init() {
    const p = FL.prefs.get();
    applyTheme(p.theme || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    registerRoutes();
    bindGlobal();
    FL.bus.on('route', () => { closeMenus(); renderHeader(); });
    FL.bus.on('auth', () => renderHeader());
    FL.bus.on('data', FL.util.debounce(() => { if (FL.auth.current()) renderHeader(); }, 150));
    renderFooter();
    FL.db.processCompletedLessons();
    FL.router.start();
    if (!FL.store.persistent) setTimeout(() => FL.ui.toast('Your browser is blocking local storage — progress will be lost when you close this tab.', 'error', 7000), 800);
  }

  return { init, toggleTheme, renderHeader, LOGO };
})();

document.addEventListener('DOMContentLoaded', FL.app.init);
