/* ==========================================================================
   Fluentia — app shell: header, footer, theme, shortcuts and routes
   ========================================================================== */
window.FL = window.FL || {};

FL.app = (function () {
  const { icon, esc } = FL.ui;
  const LOGO = `<span class="logo-mark" aria-hidden="true">F</span>`;
  const NAV = [
    { href: '#/courses', label: 'Courses', match: ['/courses', '/course', '/lesson', '/test'] },
    { href: '#/placement', label: 'Placement test', match: ['/placement'] },
    { href: '#/review', label: 'Review', match: ['/review', '/practice'] },
    { href: '#/book', label: 'Live lessons', match: ['/book', '/classroom'] },
    { href: '#/pricing', label: 'Pricing', match: ['/pricing'] },
    { href: '#/about', label: 'Teacher', match: ['/about'] }
  ];

  function theme() { return document.documentElement.dataset.theme || 'light'; }
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#18191b' : '#ffffff');
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
    const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    const active = n => n.match.some(m => path === m || path.startsWith(m + '/'));
    const d = user ? FL.db.load() : null;
    document.getElementById('site-header').innerHTML = `
      <div class="container header-inner">
        <a href="#/" class="logo" aria-label="${esc(FL.config.brand)} — home">${LOGO}<span>${esc(FL.config.brand)}</span></a>
        <nav class="nav" aria-label="Main">${NAV.map(n => `<a href="${n.href}" class="${active(n) ? 'active' : ''}" ${active(n) ? 'aria-current="page"' : ''}>${n.label}</a>`).join('')}</nav>
        <div class="header-actions">
          <button type="button" class="search-btn hide-sm" data-action="palette" aria-label="Search lessons">${icon('search')}<span class="label">Search lessons</span><span class="kbd">${mac ? '⌘' : 'Ctrl'} K</span></button>
          <button type="button" class="icon-btn" data-action="theme" aria-label="Switch to ${theme() === 'dark' ? 'light' : 'dark'} theme" title="Switch theme">${icon(theme() === 'dark' ? 'sun' : 'moon')}</button>
          ${user ? `
            <a class="btn btn-sm hide-sm" href="#/dashboard">My learning</a>
            <div class="user-menu">
              <button type="button" data-action="user-menu" aria-haspopup="true" aria-expanded="false" aria-label="Account menu"><span class="avatar">${esc(FL.util.initials(user.name))}</span></button>
              <div class="dropdown" hidden>
                <div class="dd-head"><strong>${esc(user.name)}</strong><div class="tiny muted">${esc(user.email)}</div>
                  <div class="tiny muted mt-1">${FL.util.plural(d.credits, 'live lesson credit')}</div></div>
                <hr>
                <a href="#/dashboard">${icon('grid')} My learning</a>
                <a href="#/courses">${icon('book')} Courses</a>
                <a href="#/review">${icon('layers')} Vocabulary review</a>
                <a href="#/book">${icon('calendar')} Book a live lesson</a>
                <a href="#/settings">${icon('settings')} Settings</a>
                <hr>
                <button type="button" data-action="logout">${icon('logout')} Sign out</button>
              </div>
            </div>` : `
            <a class="btn btn-quiet btn-sm hide-sm" href="#/login">Sign in</a>
            <a class="btn btn-primary btn-sm hide-sm" href="#/register">Create account</a>`}
          <button type="button" class="icon-btn menu-toggle" data-action="menu" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button>
        </div>
      </div>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
        <a href="#/">Home</a>${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join('')}
        ${user ? `<a href="#/dashboard">My learning</a><a href="#/settings">Settings</a><button type="button" class="btn btn-block" data-action="logout">Sign out</button>`
          : `<a class="btn btn-primary btn-block btn-lg" href="#/register">Create a free account</a><a class="btn btn-block" href="#/login">Sign in</a>`}
      </nav>`;
  }

  function renderFooter() {
    const t = FL.config.teacher;
    const levels = lang => FL.content[lang].levels.map(l => `<li><a href="#/course/${lang}/${l.id}">${FL.content[lang].name} ${l.code} — ${esc(l.name)}</a></li>`).join('');
    document.getElementById('site-footer').innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="#/" class="logo">${LOGO}<span>${esc(FL.config.brand)}</span></a>
            <p class="muted mt-2" style="max-width:340px">English and French courses from A1 to B2, with live 1-on-1 lessons taught by ${esc(t.name)}.</p>
            <a href="mailto:${esc(t.email)}">${esc(t.email)}</a>
          </div>
          <div><h4>English</h4><ul>${levels('en')}</ul></div>
          <div><h4>French</h4><ul>${levels('fr')}</ul></div>
          <div><h4>Platform</h4><ul>
            <li><a href="#/placement">Placement test</a></li><li><a href="#/review">Vocabulary review</a></li>
            <li><a href="#/book">Live lessons</a></li><li><a href="#/classroom/demo">Classroom demo</a></li>
            <li><a href="#/pricing">Pricing</a></li><li><a href="#/about">About the teacher</a></li></ul></div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${esc(FL.config.brand)} · ${esc(t.name)}</span>
          <span>Designed and built by ${esc(t.name)} with HTML, CSS and JavaScript</span>
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
      if (!e.target.closest('.user-menu')) document.querySelectorAll('.user-menu .dropdown').forEach(d => { d.hidden = true; });
      if (!a) { if (e.target.closest('#mobile-nav a')) closeMenus(); return; }
      const act = a.dataset.action;
      if (act === 'theme') toggleTheme();
      else if (act === 'palette') { closeMenus(); FL.ui.palette(); }
      else if (act === 'logout') { closeMenus(); FL.auth.logout(); FL.router.go('/'); FL.ui.toast('You have signed out.', 'success'); }
      else if (act === 'user-menu') {
        const dd = a.parentElement.querySelector('.dropdown');
        dd.hidden = !dd.hidden;
        a.setAttribute('aria-expanded', String(!dd.hidden));
      } else if (act === 'menu') {
        const mn = document.getElementById('mobile-nav');
        const open = !mn.classList.contains('open');
        mn.classList.toggle('open', open);
        a.setAttribute('aria-expanded', String(open));
        a.innerHTML = icon(open ? 'x' : 'menu');
      } else if (act === 'skip') document.getElementById('main').focus();
    });
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); FL.ui.palette(); }
      if (e.key === 'Escape') closeMenus();
    });
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = ev => { if (!FL.prefs.get().theme) { applyTheme(ev.matches ? 'dark' : 'light'); renderHeader(); } };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
    }
    window.addEventListener('storage', e => {
      if (e.key && e.key.startsWith(FL.config.storagePrefix + 'session')) { renderHeader(); FL.router.render(); }
    });
  }

  function registerRoutes() {
    const r = FL.router;
    r.add('/', 'home');
    r.add('/courses', 'courses');
    r.add('/course/:lang/:level', 'level');
    r.add('/lesson/:id', 'lesson');
    r.add('/test/:lang/:level', 'test');
    r.add('/placement', 'placement');
    r.add('/review', 'review');
    r.add('/practice', 'review');
    r.add('/book', 'book');
    r.add('/pricing', 'pricing');
    r.add('/about', 'about');
    r.add('/login', 'login');
    r.add('/register', 'register');
    r.add('/dashboard', 'dashboard');
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
    renderFooter();
    FL.db.processCompletedLessons();
    FL.router.start();
    if (!FL.store.persistent) setTimeout(() => FL.ui.toast('Your browser is blocking local storage, so progress will be lost when you close this tab.', 'error', 7000), 800);
  }

  return { init, toggleTheme, renderHeader };
})();

document.addEventListener('DOMContentLoaded', FL.app.init);
