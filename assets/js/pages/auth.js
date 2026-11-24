/* ==========================================================================
   Fluentia — sign in, create account and demo student
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.authView = (function () {
  const { icon, esc } = FL.ui;
  function side(title, text) {
    return `<aside class="auth-side">
      <h2>${title}</h2><p style="font-size:1.08rem">${text}</p>
      <ul class="list-check mt-2">
        <li>${icon('check')}<span>${FL.course.allLessons().length} free lessons in English and French</span></li>
        <li>${icon('check')}<span>Progress, grades and certificates saved to your account</span></li>
        <li>${icon('check')}<span>Vocabulary review that adapts to you</span></li>
        <li>${icon('check')}<span>Live 1-on-1 lessons when you want them</span></li>
      </ul>
      <div class="row mt-4"><span class="avatar lg"><img src="${esc(FL.config.teacher.photo)}" alt=""></span>
        <div><strong style="color:#fff">${esc(FL.config.teacher.name)}</strong><div class="small" style="color:#c8d4ea">${esc(FL.config.teacher.title)}</div></div></div>
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

/* ------------------------------------------------------------------ Sign in */
FL.pages.login = {
  title: 'Sign in',
  guestOnly: true,
  render(params, query) {
    const { icon } = FL.ui;
    return `<div class="auth-wrap">
      ${FL.authView.side('Welcome back', 'Pick up exactly where you left off.')}
      <div class="auth-main"><div class="auth-card">
        <h1 style="font-size:2rem">Sign in</h1>
        <p class="muted">New here? <a href="#/register${query.next ? '?next=' + encodeURIComponent(query.next) : ''}">Create a free account</a></p>
        <form id="login-form" novalidate>
          <div class="notice warn mb-2" data-err-box hidden>${icon('alert')}<div data-err="form"></div></div>
          <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" class="input" autocomplete="email" required><span class="field-error" data-err="email"></span></div>
          ${FL.authView.pwField('password', 'Password', 'current-password')}
          <button class="btn btn-primary btn-block btn-lg" type="submit">Sign in</button>
        </form>
        <div class="or">or</div>
        <button type="button" class="btn btn-block btn-lg" data-demo>Explore with a demo student account</button>
        <p class="tiny muted center mt-1">The demo account already has lessons, grades and live bookings.</p>
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
      FL.ui.toast(`Welcome back, ${FL.util.firstName(res.user.name)}.`, 'success');
      FL.router.go(FL.authView.nextPath(query));
    });
    root.querySelector('[data-demo]').addEventListener('click', async e => {
      FL.ui.setLoading(e.currentTarget, true, 'Preparing the demo…');
      await FL.demo.signIn();
      FL.router.go('/dashboard');
    });
  }
};

/* ----------------------------------------------------------- Create account */
FL.pages.register = {
  title: 'Create an account',
  guestOnly: true,
  render(params, query) {
    return `<div class="auth-wrap">
      ${FL.authView.side('Learn at your own pace', 'A free account saves your progress, grades and vocabulary on every lesson.')}
      <div class="auth-main"><div class="auth-card">
        <h1 style="font-size:2rem">Create your account</h1>
        <p class="muted">Already registered? <a href="#/login${query.next ? '?next=' + encodeURIComponent(query.next) : ''}">Sign in</a></p>
        <form id="reg-form" novalidate>
          <div class="field"><label for="f-name">Full name</label><input id="f-name" name="name" class="input" autocomplete="name" maxlength="60" required><span class="field-error" data-err="name"></span></div>
          <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" class="input" autocomplete="email" required><span class="field-error" data-err="email"></span></div>
          ${FL.authView.pwField('password', 'Password', 'new-password')}
          <div class="strength" aria-hidden="true" style="margin:-8px 0 6px"><span id="pw-bar"></span></div>
          <div class="field-hint mb-2" id="pw-hint">At least 8 characters.</div>
          <div class="field"><span class="label">I want to learn</span>
            <div class="seg" role="radiogroup" aria-label="Language to learn">
              <button type="button" role="radio" data-lang="en" aria-pressed="true" aria-checked="true">English</button>
              <button type="button" role="radio" data-lang="fr" aria-pressed="false" aria-checked="false">French</button>
            </div></div>
          <label class="checkbox mb-1"><input type="checkbox" name="terms"><span>I understand my progress is stored in this browser (portfolio version — no data leaves your device).</span></label>
          <span class="field-error" data-err="terms" style="display:block;margin-bottom:12px"></span>
          <button class="btn btn-primary btn-block btn-lg" type="submit">Create account</button>
        </form>
      </div></div>
    </div>`;
  },
  mount(root, params, query) {
    const form = root.querySelector('#reg-form');
    let lang = 'en';
    FL.authView.bindReveal(form);
    const bar = root.querySelector('#pw-bar'), hint = root.querySelector('#pw-hint');
    form.password.addEventListener('input', () => {
      const s = FL.auth.passwordScore(form.password.value);
      const colors = ['var(--bad)', 'var(--bad)', 'var(--warn)', 'var(--good)', 'var(--good)'];
      bar.style.width = form.password.value ? `${(s + 1) * 20}%` : '0';
      bar.style.background = colors[s];
      hint.textContent = form.password.value ? `Password strength: ${['too weak', 'weak', 'fair', 'strong', 'very strong'][s]}` : 'At least 8 characters.';
    });
    form.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
      lang = b.dataset.lang;
      form.querySelectorAll('[data-lang]').forEach(x => { x.setAttribute('aria-pressed', String(x === b)); x.setAttribute('aria-checked', String(x === b)); });
    }));
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const errors = FL.auth.validate({ name: form.name.value, email: form.email.value, password: form.password.value }, 'register');
      if (!form.terms.checked) errors.terms = 'Please confirm to continue.';
      if (Object.keys(errors).length) { FL.authView.setErrors(form, errors); return; }
      const btn = form.querySelector('[type="submit"]');
      FL.ui.setLoading(btn, true, 'Creating your account…');
      const res = await FL.auth.register({ name: form.name.value, email: form.email.value, password: form.password.value });
      FL.ui.setLoading(btn, false);
      if (!res.ok) { FL.authView.setErrors(form, res.errors); return; }
      FL.db.mutate(d => { d.profile.lang = lang; });
      FL.ui.toast(`Welcome, ${FL.util.firstName(res.user.name)}. Your account is ready.`, 'success');
      FL.router.go(FL.authView.nextPath(query));
    });
  }
};

/* ------------------------------------------------------------ Demo student */
FL.demo = {
  EMAIL: 'demo.student@fluentia.app',
  PASSWORD: 'demo-fluentia-2026',
  async signIn() {
    let res = await FL.auth.login({ email: this.EMAIL, password: this.PASSWORD });
    if (!res.ok) {
      res = await FL.auth.register({ name: 'Aisyah Rahman', email: this.EMAIL, password: this.PASSWORD });
      if (res.ok) this.seed(res.user);
    }
    if (res.ok) FL.ui.toast('You are using the demo student account. Everything works — explore freely.', 'success', 4500);
    return res;
  },
  seed(user) {
    const DAY = 86400000, now = Date.now();
    const rand = FL.util.rng(7);
    const tz = FL.config.teacher.timezone;
    const lessons = [];
    // Past live lessons
    const all = FL.db.allBookings();
    [24, 17, 10].forEach((ago, i) => {
      const p = FL.time.parts(now - ago * DAY, tz);
      const start = FL.time.zonedToUtc(p.y, p.m, p.d, i % 2 ? 18 : 10, 0, tz);
      const b = { id: FL.util.uid('bk_'), userId: user.id, type: i === 0 ? 'trial' : 'standard', topic: 'IELTS preparation', start, end: start + (i === 0 ? 25 : 50) * 60000, note: '', status: 'upcoming', createdAt: start - 3 * DAY, credits: i === 0 ? 0 : 1 };
      all.push(b); lessons.push(b);
    });
    FL.db.saveBookings(all);
    const slots = FL.schedule.slots('standard');
    const first = slots[0];
    const second = first ? slots.find(s => s.start > first.start + 2 * DAY) : null;
    const list = FL.db.allBookings();
    [first, second].filter(Boolean).forEach((s, i) => list.push({ id: FL.util.uid('bk_'), userId: user.id, type: 'standard', topic: i ? 'Conversation practice' : 'IELTS preparation', start: s.start, end: s.end, note: i ? '' : 'Speaking Part 2, please.', status: 'upcoming', createdAt: now - DAY, credits: 1 }));
    FL.db.saveBookings(list);

    FL.db.mutate(d => {
      d.registered = true;
      d.profile = Object.assign(d.profile, { lang: 'en', levels: { en: 'A2', fr: 'A1' }, goal: 'exam', weeklyLessons: 3, onboarded: true, timezone: FL.time.browserTz() });
      d.credits = 6;
      d.trialUsed = true;
      d.placement = { en: { level: 'A2', correct: 6, total: 10, date: now - 30 * DAY }, fr: { level: 'A1', correct: 4, total: 10, date: now - 12 * DAY } };
      const done = (id, best, agoDays, attempts = 1) => { const l = FL.course.lesson(id); d.progress[id] = { seen: l.slides.length + 3, slidesDone: true, best, attempts, completed: best >= 60, started: now - (agoDays + 1) * DAY, last: now - agoDays * DAY, doneAt: best >= 60 ? now - agoDays * DAY : undefined, lastScore: best }; };
      done('en-a1-1', 100, 28); done('en-a1-2', 89, 26); done('en-a1-3', 78, 23, 2); done('en-a1-4', 89, 21); done('en-a1-5', 100, 19);
      done('en-a2-1', 89, 9); done('en-a2-2', 67, 6, 2); done('en-a2-3', 78, 2);
      d.progress['en-a2-4'] = { seen: 4, slidesDone: false, best: null, attempts: 0, completed: false, started: now - DAY, last: now - 3 * 3600000 };
      done('fr-a1-1', 89, 11); done('fr-a1-2', 56, 4);
      d.last = 'en-a2-4';
      d.levelTests['en-a1'] = { best: 87, attempts: 1, passed: true, last: 87, date: now - 18 * DAY };
      for (let i = 1; i < 84; i++) {
        const k = FL.time.addDaysKey(FL.time.localKey(), -i);
        if (i < 6 || rand() > 0.42) d.activity[k] = Math.round(2 + rand() * 18);
      }
      FL.course.lesson('en-a1-1').vocab.forEach((v, i) => { d.cards[`en-a1-1:${i}`] = { ef: 2.5, interval: 12, reps: 3, due: now + 5 * DAY }; });
      FL.course.lesson('en-a2-1').vocab.forEach((v, i) => { d.cards[`en-a2-1:${i}`] = { ef: 2.3, interval: 1, reps: 1, due: i < 5 ? now - DAY : now + DAY }; });
      d.stats = { reviews: 86, pronAttempts: 14, bestPron: 88, booked: 5, completed: lessons.length };
      d.processed = lessons.map(b => b.id);
      d.myWords = [
        { id: FL.util.uid('w_'), lang: 'en', front: 'to elaborate on', back: 'to explain in more detail', at: now - 12 * DAY },
        { id: FL.util.uid('w_'), lang: 'en', front: 'a significant increase', back: 'a large rise (IELTS Task 1)', at: now - 9 * DAY }
      ];
      d.notes[lessons[2].id] = 'Speaking Part 2 — "Describe a place you visited".\n\nGood: past tenses and linking words.\nWatch: "I have went" → "I went".\n\nUseful: "What struck me most was…", "It was well worth the trip."\n\nHomework: record a 2-minute answer about a memorable meal.';
      d.notes['lesson:en-a2-1'] = 'Irregular verbs to learn: buy-bought, take-took, meet-met.';
      d.homework = [
        { id: FL.util.uid('hw_'), text: 'Finish "Have you ever…?" (English A2, lesson 4)', done: false, link: '#/lesson/en-a2-4' },
        { id: FL.util.uid('hw_'), text: 'Record a 2-minute answer: "Describe a memorable meal"', done: false, link: '#/review?tab=speak' },
        { id: FL.util.uid('hw_'), text: 'Retry the practice of French A1, lesson 2', done: false, link: '#/lesson/fr-a1-2?step=practice' },
        { id: FL.util.uid('hw_'), text: 'Take the placement test to find your level', done: true, link: '#/placement', auto: 'placement' },
        { id: FL.util.uid('hw_'), text: 'Complete your first lesson', done: true, link: '#/courses', auto: 'lesson' }
      ];
      d.transactions = [
        { id: FL.util.uid('tx_'), at: now - 20 * DAY, kind: 'buy', credits: 10, label: '10-lesson pack · $153' },
        { id: FL.util.uid('tx_'), at: now - 17 * DAY, kind: 'use', credits: -1, label: 'Live lesson' }
      ];
    }, user.id);
  }
};
