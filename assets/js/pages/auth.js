/* ==========================================================================
   Fluentia — Sign in, Register, one-click demo account
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.authView = (function () {
  const { icon, esc } = FL.ui;
  function side(title, text) {
    return `<aside class="auth-side">
      <h2>${title}</h2><p style="font-size:1.08rem">${text}</p>
      <ul class="check-list mt-2">
        <li>${icon('check-circle')}<span>Free 25-minute trial lesson</span></li>
        <li>${icon('check-circle')}<span>Adaptive placement test & certificate</span></li>
        <li>${icon('check-circle')}<span>Flashcards, pronunciation coach & daily challenges</span></li>
        <li>${icon('check-circle')}<span>Personal dashboard to track your progress</span></li>
      </ul>
      <div class="row mt-4" style="gap:14px"><span class="avatar" style="width:52px;height:52px"><img src="${esc(FL.config.teacher.photo)}" alt=""></span>
        <div><strong>${esc(FL.config.teacher.name)}</strong><div class="small" style="opacity:.8">${esc(FL.config.teacher.title)}</div></div></div>
    </aside>`;
  }
  function nextPath(query) {
    const n = query.next;
    return n && n.startsWith('/') && !n.startsWith('//') ? n : '/dashboard';
  }
  function setErrors(form, errors) {
    form.querySelectorAll('.field-error').forEach(e => { e.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(e => e.removeAttribute('aria-invalid'));
    Object.entries(errors).forEach(([k, v]) => {
      const err = form.querySelector(`[data-err="${k}"]`);
      if (err) err.textContent = v;
      const input = form.querySelector(`[name="${k}"]`);
      if (input) input.setAttribute('aria-invalid', 'true');
    });
    const first = form.querySelector('[aria-invalid="true"]');
    if (first) first.focus();
  }
  function bindReveal(form) {
    form.querySelectorAll('[data-reveal]').forEach(b => b.addEventListener('click', () => {
      const input = b.parentElement.querySelector('input');
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      b.innerHTML = icon(show ? 'eye-off' : 'eye');
      b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    }));
  }
  function pwField(name, label, auto) {
    return `<div class="field"><label for="f-${name}">${label}</label>
      <div class="input-group"><input id="f-${name}" name="${name}" type="password" class="input" autocomplete="${auto}" required>
      <button type="button" class="icon-btn" data-reveal aria-label="Show password">${icon('eye')}</button></div>
      <span class="field-error" data-err="${name}"></span></div>`;
  }
  return { side, nextPath, setErrors, bindReveal, pwField };
})();

/* ---------------------------------------------------------------- Login */
FL.pages.login = {
  title: 'Sign in',
  guestOnly: true,
  render(params, query) {
    const { icon, esc } = FL.ui;
    return `<div class="auth-wrap">
      ${FL.authView.side('Welcome back 👋', 'Pick up right where you left off — your streak is waiting.')}
      <div class="auth-main"><div class="auth-card">
        <h1>Sign in</h1>
        <p class="muted">New here? <a href="#/register${query.next ? '?next=' + encodeURIComponent(query.next) : ''}">Create a free account</a></p>
        <form id="login-form" novalidate>
          <div class="notice warn mb-2" data-err-box hidden>${icon('alert')}<div data-err="form"></div></div>
          <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" class="input" autocomplete="email" required><span class="field-error" data-err="email"></span></div>
          ${FL.authView.pwField('password', 'Password', 'current-password')}
          <button class="btn btn-primary btn-block btn-lg" type="submit">Sign in</button>
        </form>
        <div class="row mt-3 mb-2" style="gap:12px"><hr class="divider" style="flex:1;margin:0"><span class="tiny muted">OR</span><hr class="divider" style="flex:1;margin:0"></div>
        <button class="btn btn-block btn-lg" data-demo>${icon('sparkles')} Explore with a demo student account</button>
        <p class="tiny muted center mt-2">The demo account comes pre-filled with lessons, progress and flashcards.</p>
      </div></div>
    </div>`;
  },
  mount(root, params, query) {
    const form = root.querySelector('#login-form');
    FL.authView.bindReveal(form);
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const box = form.querySelector('[data-err-box]');
      box.hidden = true;
      FL.ui.setLoading(btn, true, 'Signing in…');
      const res = await FL.auth.login({ email: form.email.value, password: form.password.value });
      FL.ui.setLoading(btn, false);
      if (!res.ok) {
        FL.authView.setErrors(form, res.errors);
        if (res.errors.form) { box.hidden = false; form.password.focus(); }
        return;
      }
      FL.db.processCompletedLessons();
      FL.ui.toast(`Welcome back, ${FL.util.firstName(res.user.name)}!`, 'success');
      FL.router.go(FL.authView.nextPath(query));
    });
    root.querySelector('[data-demo]').addEventListener('click', async e => {
      FL.ui.setLoading(e.currentTarget, true, 'Preparing demo…');
      await FL.demo.signIn();
      FL.router.go('/dashboard');
    });
  }
};

/* ------------------------------------------------------------- Register */
FL.pages.register = {
  title: 'Create your account',
  guestOnly: true,
  render(params, query) {
    const { icon } = FL.ui;
    return `<div class="auth-wrap">
      ${FL.authView.side('Start speaking with confidence', 'Create your free account to book lessons, save your level and track every bit of progress.')}
      <div class="auth-main"><div class="auth-card">
        <h1>Create your account</h1>
        <p class="muted">Already have one? <a href="#/login${query.next ? '?next=' + encodeURIComponent(query.next) : ''}">Sign in</a></p>
        <form id="reg-form" novalidate>
          <div class="field"><label for="f-name">Full name</label><input id="f-name" name="name" class="input" autocomplete="name" maxlength="60" required><span class="field-error" data-err="name"></span></div>
          <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" class="input" autocomplete="email" required><span class="field-error" data-err="email"></span></div>
          ${FL.authView.pwField('password', 'Password', 'new-password')}
          <div class="strength" aria-hidden="true" style="margin:-8px 0 6px"><span id="pw-bar"></span></div>
          <div class="field-hint mb-2" id="pw-hint">Use 8+ characters with a mix of letters, numbers and symbols.</div>
          <div class="field"><span class="label">I want to learn</span>
            <div class="seg" role="radiogroup" aria-label="Language to learn">
              <button type="button" role="radio" data-lang="en" aria-pressed="true" aria-checked="true">English</button>
              <button type="button" role="radio" data-lang="fr" aria-pressed="false" aria-checked="false">French</button>
            </div></div>
          <label class="checkbox mb-2"><input type="checkbox" name="terms"><span>I agree that my data is stored in this browser to run the platform (demo — no data leaves your device).</span></label>
          <span class="field-error" data-err="terms" style="display:block;margin:-8px 0 12px"></span>
          <button class="btn btn-primary btn-block btn-lg" type="submit">${icon('sparkles')} Create free account</button>
        </form>
      </div></div>
    </div>`;
  },
  mount(root, params, query) {
    const form = root.querySelector('#reg-form');
    let lang = 'en';
    FL.authView.bindReveal(form);
    const bar = root.querySelector('#pw-bar');
    const hint = root.querySelector('#pw-hint');
    form.password.addEventListener('input', () => {
      const s = FL.auth.passwordScore(form.password.value);
      const colors = ['var(--danger)', 'var(--danger)', 'var(--warning)', 'var(--success)', 'var(--success)'];
      const labels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
      bar.style.width = form.password.value ? `${(s + 1) * 20}%` : '0';
      bar.style.background = colors[s];
      hint.textContent = form.password.value ? `Password strength: ${labels[s]}` : 'Use 8+ characters with a mix of letters, numbers and symbols.';
    });
    form.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
      lang = b.dataset.lang;
      form.querySelectorAll('[data-lang]').forEach(x => { x.setAttribute('aria-pressed', String(x === b)); x.setAttribute('aria-checked', String(x === b)); });
    }));
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const errors = FL.auth.validate({ name: form.name.value, email: form.email.value, password: form.password.value }, 'register');
      if (!form.terms.checked) errors.terms = 'Please accept to continue.';
      if (Object.keys(errors).length) { FL.authView.setErrors(form, errors); return; }
      const btn = form.querySelector('[type="submit"]');
      FL.ui.setLoading(btn, true, 'Creating account…');
      const res = await FL.auth.register({ name: form.name.value, email: form.email.value, password: form.password.value });
      FL.ui.setLoading(btn, false);
      if (!res.ok) { FL.authView.setErrors(form, res.errors); return; }
      FL.db.mutate(d => { d.profile.targetLang = lang; });
      FL.ui.toast(`Welcome to ${FL.config.brand}, ${FL.util.firstName(res.user.name)}! 🎉`, 'success');
      FL.router.go(FL.authView.nextPath(query));
    });
  }
};

/* ---------------------------------------------------------- Learning plan */
FL.plan = {
  generate({ goal = 'conversation', hoursPerWeek = 2, targetLang = 'en' }) {
    const lessonsPerWeek = hoursPerWeek <= 1 ? 1 : hoursPerWeek <= 3 ? 2 : 3;
    const lessonDays = { 1: [3], 2: [2, 4], 3: [1, 3, 5] }[lessonsPerWeek];
    const extra = {
      conversation: 'Shadowing · 10 min', exam: 'Timed practice · 20 min', business: 'Email writing · 15 min',
      study: 'Reading · 15 min', travel: 'Phrase drill · 10 min', kids: 'Story time · 10 min'
    }[goal] || 'Reading · 15 min';
    const days = [1, 2, 3, 4, 5, 6, 0].map(wd => {
      const tasks = [];
      if (lessonDays.includes(wd)) tasks.push({ k: 'lesson', t: 'Live lesson' });
      tasks.push({ k: 'cards', t: 'Flashcards · 10 min' });
      if (!lessonDays.includes(wd) && wd !== 0) tasks.push({ k: 'speak', t: 'Pronunciation · 5 min' });
      if (wd === 6) tasks.push({ k: 'goal', t: extra });
      if (wd === 0) tasks.push({ k: 'review', t: 'Weekly review' });
      tasks.push({ k: 'daily', t: 'Daily challenge' });
      return { wd, tasks };
    });
    return { lessonsPerWeek, days, weeklyXp: 150 + hoursPerWeek * 75, lang: targetLang, goal, createdAt: Date.now() };
  }
};

/* ------------------------------------------------------------ Demo data */
FL.demo = {
  EMAIL: 'demo.student@fluentia.app',
  PASSWORD: 'demo-fluentia-2026',
  async signIn() {
    let res = await FL.auth.login({ email: this.EMAIL, password: this.PASSWORD });
    if (!res.ok) {
      res = await FL.auth.register({ name: 'Aisyah Rahman', email: this.EMAIL, password: this.PASSWORD });
      if (res.ok) this.seed(res.user);
    }
    if (res.ok) FL.ui.toast('You’re exploring as a demo student. Everything works — try it all!', 'success', 4500);
    return res;
  },
  seed(user) {
    const DAY = 86400000, now = Date.now();
    const rand = FL.util.rng(42);
    const tz = FL.time.browserTz();
    const all = FL.db.allBookings();
    // Past, completed lessons
    const past = [];
    [26, 19, 12, 5].forEach((ago, i) => {
      const p = FL.time.parts(now - ago * DAY, FL.config.teacher.timezone);
      const start = FL.time.zonedToUtc(p.y, p.m, p.d, i % 2 ? 18 : 10, 0, FL.config.teacher.timezone);
      past.push({ id: FL.util.uid('bk_'), userId: user.id, type: i === 0 ? 'trial' : 'standard', courseId: 'en-ielts', start, end: start + (i === 0 ? 25 : 50) * 60000, note: '', status: 'upcoming', createdAt: start - 3 * DAY, credits: i === 0 ? 0 : 1 });
    });
    all.push(...past);
    FL.db.saveBookings(all);
    // Upcoming lessons on real free slots
    const slots = FL.schedule.slots('standard');
    const picks = [slots[0], slots.find(s => s.start > (slots[0] ? slots[0].start : 0) + 2 * DAY)].filter(Boolean);
    const list = FL.db.allBookings();
    picks.forEach((s, i) => list.push({ id: FL.util.uid('bk_'), userId: user.id, type: 'standard', courseId: 'en-ielts', start: s.start, end: s.end, note: i === 0 ? 'Speaking Part 2 practice, please!' : '', status: 'upcoming', createdAt: now - DAY, credits: 1 }));
    FL.db.saveBookings(list);

    FL.db.mutate(d => {
      d.registered = true;
      d.profile = Object.assign(d.profile, { targetLang: 'en', goal: 'exam', level: { en: 'B1', fr: 'A2' }, onboarded: true, hoursPerWeek: 2, activeCourse: 'en-ielts', timezone: tz, weeklyGoal: 300 });
      d.profile.plan = FL.plan.generate({ goal: 'exam', hoursPerWeek: 2, targetLang: 'en' });
      d.credits = 5;
      d.trialUsed = true;
      d.placement = { en: { level: 'B1', correct: 7, total: 10, date: now - 27 * DAY }, fr: { level: 'A2', correct: 5, total: 10, date: now - 9 * DAY } };
      let xp = 0;
      for (let i = 1; i < 84; i++) {
        const k = FL.time.addDaysKey(FL.time.localKey(), -i);
        const r = rand();
        const active = i < 7 ? true : r > 0.38;
        if (active) { const v = Math.round(15 + rand() * 90); d.activity[k] = v; xp += v; }
      }
      d.xp = xp + 100 * past.length;
      d.skills = { speaking: 64, listening: 41, vocabulary: 120, grammar: 38, writing: 22 };
      d.stats = { reviews: 132, pronAttempts: 21, bestPron: 88, daily: 9, booked: 6, completed: past.length, listens: 47 };
      d.processed = past.map(b => b.id);
      const deck = FL.srs.allCards('en-business');
      deck.slice(0, 8).forEach((c, i) => { d.cards[c.id] = { ef: 2.4, interval: i < 3 ? 1 : 6, reps: 2, due: now + (i < 3 ? -DAY : (i - 2) * DAY) }; });
      d.myWords = [
        { id: FL.util.uid('w_'), lang: 'en', front: 'to elaborate on', back: 'to explain in more detail', example: 'Could you elaborate on that point?', at: now - 12 * DAY },
        { id: FL.util.uid('w_'), lang: 'en', front: 'a significant increase', back: 'a large rise (IELTS Task 1)', example: 'There was a significant increase in sales.', at: now - 12 * DAY },
        { id: FL.util.uid('w_'), lang: 'en', front: 'on the other hand', back: 'introduces a contrasting point', example: 'On the other hand, cities are expensive.', at: now - 5 * DAY }
      ];
      d.notes[past[3].id] = 'Speaking Part 2 — "Describe a place you visited".\n\n✔ Good use of past tenses and linking words.\n✖ Watch: "I have went" → "I went".\n\nUseful phrases: "What struck me most was…", "It was well worth the trip."\n\nHomework: record a 2-minute answer about a memorable meal.';
      d.homework = [
        { id: FL.util.uid('hw_'), text: 'Record a 2-minute Part 2 answer: "Describe a memorable meal"', done: false, link: '#/practice?tab=speak' },
        { id: FL.util.uid('hw_'), text: 'Write a Task 1 paragraph describing the sales graph from the lesson', done: false, link: `#/classroom/${past[3].id}` },
        { id: FL.util.uid('hw_'), text: 'Review "Business English essentials" flashcards', done: true, link: '#/practice?tab=cards' },
        { id: FL.util.uid('hw_'), text: 'Take the placement test to find your CEFR level', done: true, link: '#/placement' }
      ];
      d.transactions = [
        { id: FL.util.uid('tx_'), at: now - 20 * DAY, kind: 'buy', credits: 10, label: '10-lesson pack' },
        { id: FL.util.uid('tx_'), at: now - 19 * DAY, kind: 'use', credits: -1, label: 'Standard lesson' }
      ];
    }, user.id);
    FL.game.checkBadges(user.id, true);
  }
};
