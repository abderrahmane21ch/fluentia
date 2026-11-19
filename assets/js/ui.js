/* ==========================================================================
   Fluentia — UI toolkit: icons, escaping, toasts, modals, XP pop,
   command palette, certificates, charts.
   ========================================================================== */
window.FL = window.FL || {};

FL.ui = (function () {
  /* ------------------------------------------------------------- Icons */
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/>',
    volume: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    'x-circle': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
    flame: '<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    'arrow-right': '<path d="M5 12h14M13 5l7 7-7 7"/>',
    'arrow-left': '<path d="M19 12H5M11 19l-7-7 7-7"/>',
    play: '<path d="M7 4.5v15l12.5-7.5z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    eraser: '<path d="M20 20H8.5L3.6 15.1a2 2 0 0 1 0-2.8L13.3 2.6a2 2 0 0 1 2.8 0l4.3 4.3a2 2 0 0 1 0 2.8L11 19"/><path d="m6 11 7 7"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    'chevron-left': '<path d="m15 6-6 6 6 6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    video: '<path d="m22 8-6 4 6 4z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    grid: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M17.9 17.9A10 10 0 0 1 12 19c-6.5 0-10-7-10-7a18 18 0 0 1 5.1-5.9M9.9 4.2A9 9 0 0 1 12 4c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.2M1 1l22 22"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/>',
    undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
    type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    pin: '<path d="M12 22s7-7.6 7-13a7 7 0 0 0-14 0c0 5.4 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/>',
    grad: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    square: '<rect x="5" y="5" width="14" height="14" rx="2"/>',
    command: '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 0 0 0-6z"/>',
    line: '<path d="M5 19 19 5"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'
  };
  function icon(name, cls = '') {
    const fill = name === 'play' ? 'currentColor' : 'none';
    return `<svg class="i ${cls}" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name] || P.info}</svg>`;
  }

  /* --------------------------------------------------------- Escaping */
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ESC[c]); }

  /* ----------------------------------------------------------- Toasts */
  function toast(msg, type = 'info', ms = 3500, html = false) {
    const root = document.getElementById('toasts');
    if (!root) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.setAttribute('role', type === 'error' ? 'alert' : 'status');
    const ic = { success: 'check-circle', error: 'alert', info: 'info', 'badge-t': 'trophy' }[type] || 'info';
    el.innerHTML = `${icon(ic)}<div>${html ? msg : esc(msg)}</div>`;
    root.appendChild(el);
    while (root.children.length > 4) root.firstElementChild.remove();
    setTimeout(() => { el.classList.add('leaving'); setTimeout(() => el.remove(), 260); }, ms);
  }

  let xpEl = null, xpTotal = 0, xpTimer = null;
  function xp(n) {
    xpTotal += n;
    if (!xpEl || !xpEl.isConnected) {
      xpEl = document.createElement('div');
      xpEl.className = 'xp-pop';
      xpEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(xpEl);
    }
    xpEl.innerHTML = `${icon('zap')} +${xpTotal} XP`;
    clearTimeout(xpTimer);
    xpTimer = setTimeout(() => {
      if (xpEl) { xpEl.style.transition = 'opacity .3s'; xpEl.style.opacity = '0'; const e = xpEl; setTimeout(() => e.remove(), 320); }
      xpEl = null; xpTotal = 0;
    }, 1800);
  }

  /* ----------------------------------------------------------- Modals */
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let openCount = 0;
  const openModals = new Set();
  function closeAll() { Array.from(openModals).forEach(fn => fn(undefined)); }
  function modal({ title = '', body = '', actions = [], wide = false, onMount, onClose, className = '', dismissible = true, bare = false } = {}) {
    const root = document.getElementById('modal-root') || document.body;
    const prevFocus = document.activeElement;
    const back = document.createElement('div');
    back.className = 'modal-backdrop';
    const id = 'm' + Math.random().toString(36).slice(2, 8);
    back.innerHTML = `
      <div class="modal ${wide ? 'wide' : ''} ${className}" role="dialog" aria-modal="true" ${title ? `aria-labelledby="${id}"` : 'aria-label="Dialog"'}>
        ${bare ? body : `
        <div class="modal-head"><h3 id="${id}">${esc(title)}</h3>
          ${dismissible ? `<button class="icon-btn" data-close aria-label="Close">${icon('x')}</button>` : ''}</div>
        <div class="modal-body">${body}</div>
        ${actions.length ? `<div class="modal-foot">${actions.map((a, i) => `<button class="btn ${a.className || 'btn-ghost'}" data-act="${i}">${a.html || esc(a.label)}</button>`).join('')}</div>` : ''}`}
      </div>`;
    root.appendChild(back);
    openCount++;
    document.body.style.overflow = 'hidden';
    const dlg = back.querySelector('.modal');
    let closed = false;
    function close(value) {
      if (closed) return; closed = true;
      openModals.delete(close);
      back.remove();
      openCount = Math.max(0, openCount - 1);
      if (!openCount) document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey, true);
      if (prevFocus && prevFocus.focus && prevFocus.isConnected) prevFocus.focus({ preventScroll: true });
      onClose && onClose(value);
    }
    function onKey(e) {
      if (!back.isConnected) return;
      if (e.key === 'Escape' && dismissible) { e.stopPropagation(); close(undefined); }
      if (e.key === 'Tab') {
        const f = Array.from(dlg.querySelectorAll(FOCUSABLE)).filter(x => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey, true);
    openModals.add(close);
    back.addEventListener('mousedown', e => { if (e.target === back && dismissible) close(undefined); });
    back.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) close(undefined);
      const actBtn = e.target.closest('[data-act]');
      if (actBtn) {
        const a = actions[+actBtn.dataset.act];
        if (a && a.onClick) { const r = a.onClick({ close, el: dlg }); if (r === false) return; }
        close(a ? a.value : undefined);
      }
    });
    const api = { close, el: dlg };
    onMount && onMount(api);
    const auto = dlg.querySelector('[autofocus]') || dlg.querySelector('input, textarea, select') || dlg.querySelector('.modal-foot .btn-primary') || dlg.querySelector(FOCUSABLE);
    if (auto) auto.focus({ preventScroll: true });
    return api;
  }
  function confirm({ title = 'Are you sure?', body = '', confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false }) {
    return new Promise(resolve => {
      modal({
        title, body: `<p class="mb-0" style="color:var(--text-2)">${body}</p>`,
        actions: [
          { label: cancelLabel, value: false, className: 'btn-ghost' },
          { label: confirmLabel, value: true, className: danger ? 'btn-danger' : 'btn-primary' }
        ],
        onClose: v => resolve(!!v)
      });
    });
  }

  /* --------------------------------------------------- Command palette */
  function palette() {
    if (document.querySelector('.palette')) return;
    const user = FL.auth.current();
    const items = [
      { label: 'Home', icon: 'home', href: '#/', grp: 'Page' },
      { label: 'Browse courses', icon: 'book', href: '#/courses', grp: 'Page' },
      { label: 'Take the placement test', icon: 'target', href: '#/placement', grp: 'Learn' },
      { label: 'Book a lesson', icon: 'calendar', href: '#/book', grp: 'Lessons' },
      { label: 'Book a free trial', icon: 'sparkles', href: '#/book?type=trial', grp: 'Lessons' },
      { label: 'Pricing & packages', icon: 'card', href: '#/pricing', grp: 'Page' },
      { label: 'Practise flashcards', icon: 'layers', href: '#/practice?tab=cards', grp: 'Practice' },
      { label: 'Pronunciation coach', icon: 'mic', href: '#/practice?tab=speak', grp: 'Practice' },
      { label: 'Daily challenge', icon: 'zap', href: '#/practice?tab=daily', grp: 'Practice' },
      { label: 'Try the virtual classroom', icon: 'video', href: '#/classroom/demo', grp: 'Lessons' },
      { label: 'About your teacher', icon: 'user', href: '#/about', grp: 'Page' },
      ...(user ? [
        { label: 'Dashboard', icon: 'grid', href: '#/dashboard', grp: 'Account' },
        { label: 'Settings', icon: 'settings', href: '#/settings', grp: 'Account' },
        { label: 'Sign out', icon: 'logout', run: () => { FL.auth.logout(); location.hash = '#/'; toast('Signed out. See you soon!', 'success'); }, grp: 'Account' }
      ] : [
        { label: 'Sign in', icon: 'user', href: '#/login', grp: 'Account' },
        { label: 'Create a free account', icon: 'sparkles', href: '#/register', grp: 'Account' }
      ]),
      { label: 'Toggle dark mode', icon: 'moon', run: () => FL.app.toggleTheme(), grp: 'Action' },
      ...FL.data.courses.map(c => ({ label: c.title, icon: 'grad', href: `#/course/${c.id}`, grp: c.lang === 'en' ? 'English course' : 'French course' }))
    ];
    let active = 0, filtered = items;
    const m = modal({
      bare: true, className: 'palette',
      body: `<div class="palette-input">${icon('search')}<input type="text" placeholder="Search pages, courses and actions…" aria-label="Search" autocomplete="off" spellcheck="false"><span class="kbd">Esc</span></div>
             <ul class="palette-list" role="listbox"></ul>
             <div class="palette-foot"><span><span class="kbd">↑</span> <span class="kbd">↓</span> navigate</span><span><span class="kbd">Enter</span> open</span></div>`,
      onMount({ el, close }) {
        const input = el.querySelector('input');
        const list = el.querySelector('.palette-list');
        function render() {
          list.innerHTML = filtered.length ? filtered.map((it, i) => `<li role="option" data-i="${i}" class="${i === active ? 'active' : ''}" aria-selected="${i === active}">${icon(it.icon)}<span>${esc(it.label)}</span><span class="grp">${esc(it.grp)}</span></li>`).join('')
            : '<li class="muted" style="cursor:default">No results</li>';
          const a = list.querySelector('.active');
          if (a) a.scrollIntoView({ block: 'nearest' });
        }
        function run(it) {
          if (!it) return;
          close();
          if (it.run) it.run(); else location.hash = it.href;
        }
        input.addEventListener('input', () => {
          const q = input.value.trim().toLowerCase();
          filtered = !q ? items : items.filter(it => (it.label + ' ' + it.grp).toLowerCase().includes(q));
          active = 0; render();
        });
        input.addEventListener('keydown', e => {
          if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(filtered.length - 1, active + 1); render(); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); render(); }
          else if (e.key === 'Enter') { e.preventDefault(); run(filtered[active]); }
        });
        list.addEventListener('click', e => { const li = e.target.closest('[data-i]'); if (li) run(filtered[+li.dataset.i]); });
        render();
      }
    });
    return m;
  }

  /* ------------------------------------------------------ Certificate */
  function certificate({ name, lang, level, date }) {
    const W = 1600, H = 1130;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#312e81'); g.addColorStop(.55, '#4f46e5'); g.addColorStop(1, '#f26b5b');
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = '#fffdf9';
    roundRect(x, 40, 40, W - 80, H - 80, 28); x.fill();
    x.strokeStyle = '#e6e1d9'; x.lineWidth = 2; roundRect(x, 70, 70, W - 140, H - 140, 18); x.stroke();
    x.textAlign = 'center'; x.fillStyle = '#4f46e5';
    x.font = '700 30px Inter, Arial, sans-serif';
    x.fillText(FL.config.brand.toUpperCase() + '  ·  LANGUAGE LEVEL CERTIFICATE', W / 2, 190);
    x.fillStyle = '#6d6a75'; x.font = '400 30px Inter, Arial, sans-serif';
    x.fillText('This certifies that', W / 2, 300);
    x.fillStyle = '#1b1a22'; x.font = '700 92px Fraunces, Georgia, serif';
    x.fillText(fit(x, name, W - 300), W / 2, 410);
    x.fillStyle = '#6d6a75'; x.font = '400 30px Inter, Arial, sans-serif';
    x.fillText(`completed the ${FL.config.brand} adaptive placement test in ${lang === 'fr' ? 'French' : 'English'} and was assessed at`, W / 2, 490);
    x.beginPath(); x.arc(W / 2, 640, 110, 0, Math.PI * 2);
    const rg = x.createLinearGradient(W / 2 - 110, 530, W / 2 + 110, 750); rg.addColorStop(0, '#4f46e5'); rg.addColorStop(1, '#f26b5b');
    x.fillStyle = rg; x.fill();
    x.fillStyle = '#fff'; x.font = '700 96px Fraunces, Georgia, serif'; x.fillText(level, W / 2, 672);
    const info = FL.data.LEVEL_INFO[level];
    x.fillStyle = '#1b1a22'; x.font = '600 36px Inter, Arial, sans-serif';
    x.fillText(`CEFR level ${level}${info ? ' — ' + info.name : ''}`, W / 2, 815);
    x.font = '400 26px Inter, Arial, sans-serif'; x.fillStyle = '#6d6a75';
    x.fillText(date, 420, 960); x.fillText(FL.config.teacher.name, W - 420, 960);
    x.strokeStyle = '#d4cec4'; x.beginPath(); x.moveTo(270, 920); x.lineTo(570, 920); x.moveTo(W - 570, 920); x.lineTo(W - 270, 920); x.stroke();
    x.font = '600 20px Inter, Arial, sans-serif'; x.fillStyle = '#9a96a3';
    x.fillText('DATE', 420, 995); x.fillText('TEACHER', W - 420, 995);
    x.font = '400 18px Inter, Arial, sans-serif';
    x.fillText('Indicative result from an online adaptive test — not an official exam certificate.', W / 2, 1040);
    return c.toDataURL('image/png');
    function fit(ctx, text, max) { let t = text; while (ctx.measureText(t).width > max && t.length > 3) t = t.slice(0, -2); return t === text ? t : t + '…'; }
    function roundRect(ctx, x0, y0, w, h, r) { ctx.beginPath(); ctx.moveTo(x0 + r, y0); ctx.arcTo(x0 + w, y0, x0 + w, y0 + h, r); ctx.arcTo(x0 + w, y0 + h, x0, y0 + h, r); ctx.arcTo(x0, y0 + h, x0, y0, r); ctx.arcTo(x0, y0, x0 + w, y0, r); ctx.closePath(); }
  }

  function download(filename, content, mime = 'text/plain') {
    const a = document.createElement('a');
    if (typeof content === 'string' && content.startsWith('data:')) a.href = content;
    else a.href = URL.createObjectURL(new Blob([content], { type: mime }));
    a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    if (a.href.startsWith('blob:')) setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ----------------------------------------------------------- Charts */
  function ring(pct, label, sub) {
    const r = 52, c = 2 * Math.PI * r;
    const off = c * (1 - FL.util.clamp(pct, 0, 100) / 100);
    return `<div class="ring" role="img" aria-label="${esc(label)} ${esc(sub || '')}">
      <svg viewBox="0 0 120 120"><defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--primary)"/><stop offset="1" stop-color="var(--accent)"/></linearGradient></defs>
      <circle class="track" cx="60" cy="60" r="${r}"/><circle class="val" cx="60" cy="60" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg>
      <div class="label"><strong>${esc(label)}</strong><span>${esc(sub || '')}</span></div></div>`;
  }
  function radar(values, labels, size = 260) {
    const cx = size / 2, cy = size / 2, R = size / 2 - 40, n = values.length;
    const pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v]; };
    let grid = '';
    [0.25, 0.5, 0.75, 1].forEach(l => { grid += `<polygon class="grid-poly" points="${values.map((_, i) => pt(i, l).join(',')).join(' ')}"/>`; });
    const axes = values.map((_, i) => { const [x, y] = pt(i, 1); return `<line class="axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; }).join('');
    const area = values.map((v, i) => pt(i, Math.max(0.04, v / 100)).join(',')).join(' ');
    const dots = values.map((v, i) => { const [x, y] = pt(i, Math.max(0.04, v / 100)); return `<circle class="dot" cx="${x}" cy="${y}" r="3.5"/>`; }).join('');
    const txt = labels.map((l, i) => { const [x, y] = pt(i, 1.22); return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${esc(l)}</text>`; }).join('');
    return `<svg class="radar" viewBox="0 0 ${size} ${size}" role="img" aria-label="Skills chart: ${labels.map((l, i) => `${l} ${values[i]}%`).join(', ')}">${grid}${axes}<polygon class="area" points="${area}"/>${dots}${txt}</svg>`;
  }

  /* ----------------------------------------------------- Scroll reveal */
  let io = null;
  function reveal(root = document) {
    const els = root.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    if (!io) io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    els.forEach(e => io.observe(e));
  }

  function setLoading(btn, on, text) {
    if (!btn) return;
    if (on) { btn.dataset.label = btn.innerHTML; btn.disabled = true; btn.innerHTML = `<span class="spinner"></span>${text ? ' ' + esc(text) : ''}`; }
    else { btn.disabled = false; if (btn.dataset.label) btn.innerHTML = btn.dataset.label; }
  }

  return { icon, esc, toast, xp, modal, confirm, closeAll, palette, certificate, download, ring, radar, reveal, setLoading };
})();
