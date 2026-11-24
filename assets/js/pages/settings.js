/* ==========================================================================
   Fluentia — Account settings
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.settings = {
  title: 'Settings',
  auth: true,
  render() {
    const { icon, esc } = FL.ui;
    const u = FL.auth.current();
    const d = FL.db.load();
    const tz = d.profile.timezone || FL.time.browserTz();
    const theme = FL.prefs.get().theme || 'system';
    return `
    <section class="page-head"><div class="container" style="max-width:860px">
      <div class="crumbs"><a href="#/dashboard">My learning</a><span>/</span><span>Settings</span></div><h1>Settings</h1>
    </div></section>
    <section class="section-tight"><div class="container stack" style="max-width:860px">
      <form class="card" id="profile-form" novalidate>
        <div class="card-head"><h3>${icon('user')} Profile & learning</h3></div>
        <div class="grid g-2" style="gap:0 18px">
          <div class="field"><label for="s-name">Full name</label><input id="s-name" name="name" class="input" value="${esc(u.name)}" maxlength="60"><span class="field-error" data-err="name"></span></div>
          <div class="field"><label for="s-email">Email</label><input id="s-email" class="input" value="${esc(u.email)}" disabled></div>
          <div class="field"><label for="s-lang">Main language to learn</label><select id="s-lang" name="lang" class="select"><option value="en" ${d.profile.lang === 'en' ? 'selected' : ''}>English</option><option value="fr" ${d.profile.lang === 'fr' ? 'selected' : ''}>French</option></select></div>
          <div class="field"><label for="s-goal">Weekly goal</label><select id="s-goal" name="goal" class="select">${[1, 2, 3, 5].map(n => `<option value="${n}" ${d.profile.weeklyLessons === n ? 'selected' : ''}>${n} lesson${n > 1 ? 's' : ''} per week</option>`).join('')}</select></div>
          <div class="field"><label for="s-tz">Timezone</label><select id="s-tz" name="tz" class="select">${FL.time.tzList().map(z => `<option value="${esc(z)}" ${z === tz ? 'selected' : ''}>${esc(z.replace(/_/g, ' '))} (${FL.time.tzOffsetLabel(z)})</option>`).join('')}</select>
            <span class="field-hint">Detected: ${esc(FL.time.browserTz())}</span></div>
          <div class="field"><label for="s-theme">Appearance</label><select id="s-theme" name="theme" class="select">
            <option value="system" ${theme === 'system' ? 'selected' : ''}>Match my system</option><option value="light" ${theme === 'light' ? 'selected' : ''}>Light</option><option value="dark" ${theme === 'dark' ? 'selected' : ''}>Dark</option></select></div>
        </div>
        <div class="row wrap"><button class="btn btn-primary" type="submit">${icon('check')} Save changes</button><button class="btn btn-quiet" type="button" data-plan>Set level and goal</button></div>
      </form>

      <form class="card" id="pw-form" novalidate>
        <div class="card-head"><h3>${icon('shield')} Password</h3></div>
        <div class="grid g-2" style="gap:0 18px">
          <div class="field"><label for="s-old">Current password</label><input id="s-old" name="old" type="password" class="input" autocomplete="current-password"></div>
          <div class="field"><label for="s-new">New password</label><input id="s-new" name="nw" type="password" class="input" autocomplete="new-password"></div>
        </div>
        <span class="field-error" data-err="pw" style="display:block;margin-bottom:10px"></span>
        <button class="btn" type="submit">Update password</button>
      </form>

      <div class="card">
        <div class="card-head"><h3>${icon('card')} Credits & history</h3><a class="btn btn-sm btn-primary" href="#/pricing">${icon('plus')} Buy credits</a></div>
        <p>You have <strong>${FL.util.plural(d.credits, 'lesson credit')}</strong>.</p>
        ${d.transactions.length ? `<div class="stack">${d.transactions.slice(0, 12).map(t => `<div class="summary-row"><span>${FL.time.fmtDate(t.at)} · ${esc(t.label)}</span><span style="color:${t.credits > 0 ? 'var(--success)' : 'var(--text)'}">${t.credits > 0 ? '+' : ''}${t.credits}</span></div>`).join('')}</div>` : '<p class="muted small mb-0">No transactions yet.</p>'}
      </div>

      <div class="card">
        <div class="card-head"><h3>${icon('download')} Your data</h3></div>
        <p class="muted small">Everything is stored in this browser. Download a copy at any time, reset your learning progress, or delete your account completely.</p>
        <div class="row wrap">
          <button class="btn" data-export>${icon('download')} Export my data (JSON)</button>
          <button class="btn btn-quiet" data-reset>${icon('repeat')} Reset progress</button>
          <button class="btn btn-danger" data-delete>${icon('trash')} Delete account</button>
        </div>
      </div>
    </div></section>`;
  },
  mount(root) {
    const pf = root.querySelector('#profile-form');
    pf.addEventListener('submit', e => {
      e.preventDefault();
      const name = pf.name.value.trim();
      const goal = +pf.goal.value || 2;
      const errs = {};
      if (name.length < 2) errs.name = 'Please enter at least 2 characters.';
      pf.querySelectorAll('[data-err]').forEach(x => { x.textContent = errs[x.dataset.err] || ''; });
      if (Object.keys(errs).length) return;
      FL.auth.updateName(name);
      FL.db.mutate(d => {
        d.profile.lang = pf.lang.value;
        d.profile.timezone = FL.time.isValidTz(pf.tz.value) ? pf.tz.value : null;
        d.profile.weeklyLessons = goal;
      });
      const th = pf.theme.value;
      FL.prefs.set({ theme: th === 'system' ? null : th });
      const resolved = th === 'system' ? (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : th;
      document.documentElement.dataset.theme = resolved;
      FL.app.renderHeader();
      FL.ui.toast('Settings saved.', 'success');
    });
    root.querySelector('[data-plan]').addEventListener('click', () => FL.pages.dashboard.onboard(() => FL.router.render()));

    const pw = root.querySelector('#pw-form');
    pw.addEventListener('submit', async e => {
      e.preventDefault();
      const err = pw.querySelector('[data-err="pw"]');
      const r = await FL.auth.changePassword(pw.old.value, pw.nw.value);
      if (!r.ok) { err.textContent = r.error; return; }
      err.textContent = ''; pw.reset();
      FL.ui.toast('Password updated.', 'success');
    });

    root.querySelector('[data-export]').addEventListener('click', () => {
      const u = FL.auth.current();
      const payload = { exportedAt: new Date().toISOString(), app: FL.config.brand, account: { name: u.name, email: u.email, createdAt: new Date(u.createdAt).toISOString() }, data: FL.db.load(), bookings: FL.db.myBookings() };
      FL.ui.download(`${FL.config.brand.toLowerCase()}-data-${FL.time.localKey()}.json`, JSON.stringify(payload, null, 2), 'application/json');
    });
    root.querySelector('[data-reset]').addEventListener('click', async () => {
      const ok = await FL.ui.confirm({ title: 'Reset your progress?', body: 'Lesson progress, grades, test results, vocabulary history, notes and placement results will be cleared. Your account, credits and live bookings are kept.', confirmLabel: 'Reset progress', danger: true });
      if (!ok) return;
      FL.db.mutate(d => {
        const keep = { registered: true, credits: d.credits, trialUsed: d.trialUsed, transactions: d.transactions, processed: d.processed, profile: Object.assign({}, d.profile, { level: { en: null, fr: null } }) };
        Object.keys(d).forEach(k => delete d[k]);
        Object.assign(d, JSON.parse(JSON.stringify(FL.db.DEFAULTS)), keep);
      });
      FL.ui.toast('Progress reset. Fresh start!', 'success');
      FL.router.render();
    });
    root.querySelector('[data-delete]').addEventListener('click', async () => {
      const ok = await FL.ui.confirm({ title: 'Delete your account?', body: 'This permanently deletes your account, progress and bookings from this browser. This cannot be undone.', confirmLabel: 'Delete everything', danger: true });
      if (!ok) return;
      FL.auth.deleteAccount();
      FL.ui.toast('Your account has been deleted.', 'success');
      FL.router.go('/');
    });
  }
};
