/* ==========================================================================
   Fluentia — adaptive CEFR placement test
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.placement = {
  title: 'Placement test',
  TOTAL: 10,
  render() {
    return `
    <section class="page-head"><div class="container narrow">
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>Placement test</span></div>
      <h1>Placement test</h1>
      <p>Ten adaptive questions: they get harder when you are right and easier when you are not. At the end you get your CEFR level and the course to start with.</p>
    </div></section>
    <section class="section-tight"><div class="container narrow" id="pt"></div></section>`;
  },
  mount(root, params, query) {
    const { icon, esc } = FL.ui;
    const L = FL.data.LEVELS;
    const TOTAL = this.TOTAL;
    const el = root.querySelector('#pt');
    let s = null;

    function intro() {
      const d = FL.db.load();
      const prev = ['en', 'fr'].filter(l => d.placement[l]);
      el.innerHTML = `
        <h2 style="font-size:1.4rem">Which language?</h2>
        <div class="lang-pick">
          <button type="button" data-start="en"><strong>English</strong><span class="muted small">Grammar, vocabulary and register · A1 to C1</span></button>
          <button type="button" data-start="fr"><strong>French</strong><span class="muted small">Grammaire, vocabulaire et registre · A1 to C1</span></button>
        </div>
        ${prev.length ? `<p class="small muted mt-2">Previous results: ${prev.map(l => `${FL.views.langName(l)} <strong>${esc(d.placement[l].level)}</strong>`).join(' · ')}</p>` : ''}
        <div class="grid g-3 mt-3 small">
          <div class="panel"><strong>About 5 minutes</strong><div class="muted">No time limit.</div></div>
          <div class="panel"><strong>Adaptive</strong><div class="muted">Adjusts to your answers.</div></div>
          <div class="panel"><strong>Free</strong><div class="muted">No account needed.</div></div>
        </div>`;
      el.querySelectorAll('[data-start]').forEach(b => b.addEventListener('click', () => start(b.dataset.start)));
    }
    function start(lang) {
      s = { lang, level: 1, asked: [], answers: [], per: L.slice(0, 5).map(() => ({ asked: 0, correct: 0 })), cur: null, done: false };
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
      s.cur = { ...p, order: FL.util.shuffle(p.q.o.map((_, i) => i)) };
      s.done = false;
      const n = s.answers.length + 1;
      el.innerHTML = `<div class="quiz">
        <div class="quiz-top"><span class="small muted nowrap">${FL.views.langName(s.lang)} · ${n} / ${TOTAL}</span>
          <div class="progress"><span style="width:${((n - 1) / TOTAL) * 100}%"></span></div>
          <button type="button" class="btn btn-quiet btn-sm" data-quit>Quit</button></div>
        <div class="quiz-body">
          <div class="q-type">Multiple choice</div>
          <div class="q-text">${esc(p.q.q).replace(/_{3,}/g, '<span class="blank"></span>')}</div>
          <div class="choices">${s.cur.order.map((oi, k) => `<button type="button" class="choice" data-i="${oi}"><span class="key">${k + 1}</span><span>${esc(p.q.o[oi])}</span></button>`).join('')}</div>
          <div id="fb" aria-live="polite"></div>
        </div></div>`;
      el.querySelector('[data-quit]').addEventListener('click', async () => {
        if (await FL.ui.confirm({ title: 'Quit the test?', body: 'Your answers so far will not be saved.', confirmLabel: 'Quit test', danger: true })) { s = null; intro(); }
      });
      el.querySelectorAll('.choice').forEach(b => b.addEventListener('click', () => answer(+b.dataset.i)));
    }
    function answer(i) {
      if (!s || s.done) return;
      s.done = true;
      const q = s.cur.q;
      const ok = i === q.a;
      s.answers.push(ok);
      s.per[q.lvl].asked++;
      if (ok) s.per[q.lvl].correct++;
      s.level = FL.util.clamp(s.level + (ok ? 1 : -1), 0, 4);
      el.querySelectorAll('.choice').forEach(b => { b.disabled = true; if (+b.dataset.i === q.a) b.classList.add('correct'); else if (+b.dataset.i === i) b.classList.add('wrong'); });
      const last = s.answers.length >= TOTAL;
      el.querySelector('#fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}"><strong>${ok ? 'Correct' : 'Not quite'}</strong><p>${esc(q.e)}</p></div>
        <div class="quiz-actions" style="justify-content:flex-end"><button type="button" class="btn btn-primary" data-next>${last ? 'See my result' : 'Next question'} ${icon('arrow-right')}</button></div>`;
      const nb = el.querySelector('[data-next]');
      nb.addEventListener('click', next);
      nb.focus({ preventScroll: true });
    }
    function computeLevel() {
      let best = -1;
      s.per.forEach((p, i) => { if (p.correct >= 1 && p.correct / p.asked >= 0.5) best = i; });
      if (best < 0) return s.answers.some(Boolean) ? 'A1' : 'Pre-A1';
      return L[best];
    }
    function result() {
      const level = computeLevel();
      const lang = s.lang;
      const correct = s.answers.filter(Boolean).length;
      const info = FL.data.LEVEL_INFO[level];
      const idx = L.indexOf(level);
      const available = FL.content[lang].levels;
      const recCode = idx < 0 ? 'A1' : L[Math.min(idx, 3)];
      const rec = available.find(l => l.code === recCode) || available[0];
      FL.db.mutate(d => {
        d.placement[lang] = { level, correct, total: s.answers.length, date: Date.now() };
        d.profile.levels[lang] = rec.code;
        FL.db.tick(d, 'placement');
      });
      FL.game.award(3);
      el.innerHTML = `<div class="card">
        <div class="row between wrap" style="align-items:flex-end">
          <div><div class="kicker mb-0">Your ${FL.views.langName(lang)} level</div><div class="big-level">${esc(level)}</div><div class="muted">${esc(info ? info.name : '')} · ${correct} of ${s.answers.length} correct</div></div>
          <a class="btn btn-primary btn-lg" href="#/course/${lang}/${rec.id}">Start ${esc(FL.course.title(rec))} ${icon('arrow-right')}</a>
        </div>
        <div class="cefr-scale mt-3 mb-3">${L.map((l, i) => `<div class="${l === level ? 'on' : i < idx ? 'reached' : ''}">${l}</div>`).join('')}</div>
        <div class="grid g-2">
          <div><h3>At this level you can</h3><ul class="list-check">${(info ? info.can : []).map(c => `<li>${icon('check')}<span>${esc(c)}</span></li>`).join('')}</ul></div>
          <div><h3>Recommended course</h3>
            <p><strong>${esc(FL.course.title(rec))} — ${esc(rec.name)}</strong><br><span class="muted">${esc(rec.summary)}</span></p>
            ${idx >= 4 ? '<p class="small muted">You are above the levels covered by the self-study courses. Live lessons are the best way to keep progressing.</p>' : ''}
            ${idx > 0 && idx < 4 && rec.code !== 'A1' ? `<p class="small muted">If the first lesson feels easy, move to the next level. If it feels hard, try ${esc(L[Math.max(0, idx - 1)])}.</p>` : ''}</div>
        </div>
        ${!FL.auth.current() ? `<div class="notice mt-3">${icon('info')}<div>Your result is saved in this browser. <a href="#/register?next=%2Fdashboard">Create a free account</a> to keep it with your progress.</div></div>` : ''}
        <div class="row wrap mt-3"><button type="button" class="btn" data-retake>${icon('repeat')} Take the test again</button><a class="btn btn-quiet" href="#/book?type=trial">Book a free trial lesson</a></div>
      </div>`;
      el.querySelector('[data-retake]').addEventListener('click', intro);
      s = null;
    }
    const onKey = e => {
      if (!s || s.done || !s.cur || document.querySelector('.modal-backdrop') || e.target.matches('input, textarea, select')) return;
      if (/^[1-4]$/.test(e.key)) { const b = el.querySelectorAll('.choice')[+e.key - 1]; if (b) b.click(); }
    };
    document.addEventListener('keydown', onKey);
    if (query.lang === 'en' || query.lang === 'fr') start(query.lang); else intro();
    return () => document.removeEventListener('keydown', onKey);
  }
};
