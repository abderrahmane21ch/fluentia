/* ==========================================================================
   Fluentia — Adaptive CEFR placement test
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.placement = {
  title: 'Placement test',
  TOTAL: 10,
  render() {
    return `<section class="section" style="padding-top:48px"><div class="container"><div class="quiz-wrap" id="pt"></div></div></section>`;
  },
  mount(root, params, query) {
    const { icon, esc } = FL.ui;
    const L = FL.data.LEVELS;
    const TOTAL = this.TOTAL;
    const el = root.querySelector('#pt');
    let s = null;
    let onKey = null;

    function intro() {
      const d = FL.db.load();
      const prev = ['en', 'fr'].filter(l => d.placement[l]).map(l => `<span class="badge badge-primary">${FL.views.langName(l)}: ${d.placement[l].level}</span>`).join(' ');
      el.innerHTML = `
        <div class="center">
          <div class="eyebrow">${icon('target')} Free placement test</div>
          <h1 style="font-size:clamp(2rem,4vw,2.8rem)">What’s your level?</h1>
          <p class="muted" style="font-size:1.1rem;max-width:560px;margin:0 auto 10px">${TOTAL} adaptive questions — they get harder when you’re right and easier when you’re not. Takes about 5 minutes and gives you a CEFR level from A1 to C1.</p>
          ${prev ? `<p class="small">Your previous results: ${prev}</p>` : ''}
        </div>
        <div class="lang-pick mt-3">
          <button data-start="en"><span class="flag-emoji">🇬🇧</span><strong style="font-size:1.25rem">English test</strong><div class="muted small">Grammar, vocabulary & register</div></button>
          <button data-start="fr"><span class="flag-emoji">🇫🇷</span><strong style="font-size:1.25rem">Test de français</strong><div class="muted small">Grammaire, vocabulaire & registre</div></button>
        </div>
        <div class="grid grid-3 mt-4">
          <div class="panel row">${icon('clock')}<span class="small">~5 minutes</span></div>
          <div class="panel row">${icon('zap')}<span class="small">Adaptive difficulty</span></div>
          <div class="panel row">${icon('award')}<span class="small">Downloadable certificate</span></div>
        </div>`;
      el.querySelectorAll('[data-start]').forEach(b => b.addEventListener('click', () => start(b.dataset.start)));
    }

    function start(lang) {
      s = { lang, level: 1, asked: [], answers: [], per: L.slice(0, 5).map(() => ({ asked: 0, correct: 0 })), current: null, answered: false };
      next();
    }

    function pick(level) {
      const bank = FL.data.placement[s.lang];
      for (const delta of [0, 1, -1, 2, -2, 3, -3, 4, -4]) {
        const lv = level + delta;
        if (lv < 0 || lv > 4) continue;
        const pool = bank.map((q, i) => ({ q, i })).filter(x => x.q.lvl === lv && !s.asked.includes(x.i));
        if (pool.length) return pool[Math.floor(Math.random() * pool.length)];
      }
      return null;
    }

    function next() {
      if (s.answers.length >= TOTAL) return result();
      const p = pick(s.level);
      if (!p) return result();
      s.asked.push(p.i);
      s.current = { ...p, order: FL.util.shuffle(p.q.o.map((_, i) => i)) };
      s.answered = false;
      const n = s.answers.length + 1;
      const qHtml = esc(p.q.q).replace(/_{3,}/g, '<span class="blank"></span>');
      el.innerHTML = `
        <div class="row between mb-1"><span class="small muted">Question ${n} of ${TOTAL}</span>
          <button class="btn btn-ghost btn-sm" data-quit>${icon('x')} Quit</button></div>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${TOTAL}" aria-valuenow="${n - 1}"><span style="width:${((n - 1) / TOTAL) * 100}%"></span></div>
        <div class="question" id="q-text">${qHtml}</div>
        <div class="answers" role="group" aria-labelledby="q-text">
          ${s.current.order.map((oi, k) => `<button class="answer" data-i="${oi}"><span class="key">${k + 1}</span><span>${esc(p.q.o[oi])}</span></button>`).join('')}
        </div>
        <div id="fb"></div>
        <p class="tiny muted mt-3">Tip: press <span class="kbd">1</span>–<span class="kbd">4</span> to answer and <span class="kbd">Enter</span> to continue.</p>`;
      el.querySelector('[data-quit]').addEventListener('click', async () => {
        if (await FL.ui.confirm({ title: 'Quit the test?', body: 'Your answers so far will not be saved.', confirmLabel: 'Quit test', danger: true })) intro();
      });
      el.querySelectorAll('.answer').forEach(b => b.addEventListener('click', () => answer(+b.dataset.i)));
    }

    function answer(i) {
      if (!s || s.answered || !s.current) return;
      s.answered = true;
      const q = s.current.q;
      const ok = i === q.a;
      s.answers.push({ lvl: q.lvl, ok });
      s.per[q.lvl].asked++;
      if (ok) s.per[q.lvl].correct++;
      s.level = FL.util.clamp(s.level + (ok ? 1 : -1), 0, 4);
      el.querySelectorAll('.answer').forEach(b => {
        b.disabled = true;
        if (+b.dataset.i === q.a) b.classList.add('correct');
        else if (+b.dataset.i === i) b.classList.add('wrong');
      });
      const last = s.answers.length >= TOTAL;
      el.querySelector('#fb').innerHTML = `
        <div class="feedback ${ok ? 'ok' : 'no'}">${icon(ok ? 'check-circle' : 'x-circle')}<div><strong>${ok ? 'Correct!' : 'Not quite.'}</strong><p>${esc(q.e)}</p></div></div>
        <div class="row mt-2" style="justify-content:flex-end"><button class="btn btn-primary" data-next>${last ? 'See my result' : 'Next question'} ${icon('arrow-right')}</button></div>`;
      const nb = el.querySelector('[data-next]');
      nb.addEventListener('click', next);
      nb.focus({ preventScroll: true });
      el.querySelector('.progress span').style.width = `${(s.answers.length / TOTAL) * 100}%`;
    }

    function computeLevel() {
      let best = -1;
      s.per.forEach((p, i) => { if (p.correct >= 1 && p.correct / p.asked >= 0.5) best = i; });
      const correct = s.answers.filter(a => a.ok).length;
      if (best < 0) return correct === 0 ? 'Pre-A1' : 'A1';
      return L[best];
    }

    function result() {
      const level = computeLevel();
      const correct = s.answers.filter(a => a.ok).length;
      const total = s.answers.length;
      const lang = s.lang;
      const info = FL.data.LEVEL_INFO[level];
      const idx = L.indexOf(level);
      const firstTime = !FL.db.load().placement[lang];
      FL.db.mutate(d => {
        d.placement[lang] = { level, correct, total, date: Date.now() };
        d.profile.level[lang] = level;
        d.homework.forEach(h => { if (/placement test/i.test(h.text)) h.done = true; });
      });
      FL.game.award(firstTime ? 50 : 20, { skill: 'grammar', amount: correct });
      const recs = FL.data.courses.filter(c => c.lang === lang && (idx < 0 ? c.levels.includes(0) : c.levels.includes(Math.min(idx, 4)))).slice(0, 3);
      const user = FL.auth.current();
      el.innerHTML = `
        <div class="center">
          <div class="eyebrow">${icon('award')} Your result · ${FL.views.langName(lang)}</div>
          <div class="level-badge"><div><strong>${esc(level)}</strong><span>${esc(info ? info.name : '')}</span></div></div>
          <h1 style="font-size:clamp(1.8rem,3.5vw,2.4rem)">You’re at ${level === 'Pre-A1' ? 'the starting line' : `CEFR level ${esc(level)}`}!</h1>
          <p class="muted">${correct} of ${total} correct · adaptive score</p>
        </div>
        <div class="cefr-scale mt-3 mb-3" aria-label="CEFR scale">
          ${L.map((l, i) => `<div class="${l === level ? 'on' : i < idx ? 'reached' : ''}">${l}</div>`).join('')}
        </div>
        <div class="grid grid-2">
          <div class="card"><h3>At this level you can…</h3><ul class="check-list small mt-2">${(info ? info.can : []).map(c => `<li>${icon('check-circle')}<span>${esc(c)}</span></li>`).join('')}</ul></div>
          <div class="card"><h3>Performance by level</h3><div class="stack mt-2">
            ${s.per.map((p, i) => `<div class="lang-bar" style="grid-template-columns:40px 1fr 60px"><strong>${L[i]}</strong><div class="bar"><span style="width:${p.asked ? (p.correct / p.asked) * 100 : 0}%"></span></div><span class="tiny muted">${p.asked ? `${p.correct}/${p.asked}` : '—'}</span></div>`).join('')}
          </div></div>
        </div>
        ${recs.length ? `<h3 class="mt-4">Recommended for you</h3><div class="grid grid-3">${recs.map(FL.views.courseCard).join('')}</div>` : ''}
        ${!user ? `<div class="notice mt-3">${icon('info')}<div>Your result is saved in this browser. <a href="#/register?next=%2Fdashboard">Create a free account</a> to keep it with your progress and learning plan.</div></div>` : ''}
        <div class="row row-wrap mt-3" style="justify-content:center">
          <a class="btn btn-primary btn-lg" href="#/book?type=trial">${icon('calendar')} Book a free trial</a>
          <button class="btn btn-lg" data-cert>${icon('download')} Get certificate</button>
          <button class="btn btn-ghost btn-lg" data-retake>${icon('repeat')} Retake</button>
        </div>`;
      el.querySelector('[data-retake]').addEventListener('click', intro);
      el.querySelector('[data-cert]').addEventListener('click', () => cert(level, lang));
      s = null;
    }

    function cert(level, lang) {
      const user = FL.auth.current();
      const make = name => {
        const url = FL.ui.certificate({ name, lang, level, date: FL.time.fmt(Date.now(), { day: 'numeric', month: 'long', year: 'numeric' }) });
        FL.ui.modal({
          title: 'Your certificate', wide: true,
          body: `<img class="cert-preview" src="${url}" alt="Certificate for ${esc(name)} — level ${esc(level)}">`,
          actions: [{ label: 'Close', className: 'btn-ghost' }, { html: `${icon('download')} Download PNG`, className: 'btn-primary', onClick() { FL.ui.download(`${FL.config.brand}-${lang}-${level}-certificate.png`, url); return false; } }]
        });
      };
      if (user) return make(user.name);
      FL.ui.modal({
        title: 'Name on certificate',
        body: `<div class="field mb-0"><label for="cert-name">Your full name</label><input id="cert-name" class="input" maxlength="50" placeholder="e.g. Aisyah Rahman"><span class="field-error" id="cert-err"></span></div>`,
        actions: [{ label: 'Cancel', className: 'btn-ghost' }, {
          label: 'Create certificate', className: 'btn-primary', onClick({ el: m }) {
            const v = m.querySelector('#cert-name').value.trim();
            if (v.length < 2) { m.querySelector('#cert-err').textContent = 'Please enter your name.'; return false; }
            setTimeout(() => make(v), 50);
          }
        }]
      });
    }

    onKey = e => {
      if (!s || !s.current || document.querySelector('.modal-backdrop')) return;
      if (e.target.matches('input, textarea, select')) return;
      if (!s.answered && /^[1-4]$/.test(e.key)) {
        const b = el.querySelectorAll('.answer')[+e.key - 1];
        if (b) b.click();
      } else if (s.answered && e.key === 'Enter' && document.activeElement && !document.activeElement.matches('[data-next]')) {
        const n = el.querySelector('[data-next]');
        if (n) { e.preventDefault(); n.click(); }
      }
    };
    document.addEventListener('keydown', onKey);
    if (query.lang === 'en' || query.lang === 'fr') start(query.lang); else intro();
    return () => document.removeEventListener('keydown', onKey);
  }
};
