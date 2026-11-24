/* ==========================================================================
   Fluentia — course catalogue, level page and level test
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.views = FL.views || {};

/* Level rows used on the home page and the catalogue. */
FL.views.levelList = function (lang, d) {
  const { icon, esc } = FL.ui;
  const c = FL.content[lang];
  return `<div class="level-list">${c.levels.map(l => {
    const st = FL.learn.levelStats(l, d);
    const meta = st.started ? `${st.done} / ${st.total} lessons done` : `${l.lessons.length} lessons · ${l.lessons.reduce((s, x) => s + x.practice.length, 0)} exercises`;
    return `<a class="level-row" href="#/course/${lang}/${l.id}">
      <span class="level-code ${st.started ? '' : 'soft'}">${l.code}</span>
      <span class="lr-body"><strong>${esc(l.name)}</strong><span>${esc(l.summary)}</span></span>
      <span class="lr-meta">${meta}${st.started ? `<div class="progress mt-1" style="width:120px;margin-left:auto"><span style="width:${st.pct}%"></span></div>` : ''}</span>
      ${icon('chevron-right', 'chev')}</a>`;
  }).join('')}</div>`;
};

/* -------------------------------------------------------------- Catalogue */
FL.pages.courses = {
  title: 'Courses',
  render() {
    const { icon, esc } = FL.ui;
    const d = FL.db.load();
    const total = FL.course.allLessons().length;
    return `
    <section class="page-head"><div class="container">
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>Courses</span></div>
      <h1>Courses</h1>
      <p>Two languages, four CEFR levels each, ${total} complete lessons. Every lesson has slides with audio, interactive exercises and a summary. All self-study material is free.</p>
    </div></section>
    <section class="section-tight"><div class="container">
      <div class="notice mb-3">${icon('target')}<div>Not sure where to start? <a href="#/placement">Take the 5-minute placement test</a> and get a level recommendation.</div></div>
      <div class="grid g-2" style="gap:32px">
        ${['en', 'fr'].map(lang => {
          const c = FL.content[lang];
          return `<div class="course-col">
            <h2 style="font-size:1.6rem" class="mb-1">${c.name} <span class="muted" style="font-family:var(--sans);font-size:1rem;font-weight:400">${lang === 'fr' ? '· explained in English' : ''}</span></h2>
            <p class="muted">${esc(c.intro)}</p>
            ${FL.views.levelList(lang, d)}
          </div>`;
        }).join('')}
      </div>
    </div></section>
    <section class="section-tight" style="padding-top:8px"><div class="container">
      <div class="grid g-3">
        <div class="card"><h3>${icon('layers')} Learn</h3><p class="muted mb-0">Slides explain one grammar point and its vocabulary with real examples and audio.</p></div>
        <div class="card"><h3>${icon('check-circle')} Practise</h3><p class="muted mb-0">Exercises give instant feedback with explanations. Score 60% or more to complete a lesson.</p></div>
        <div class="card"><h3>${icon('award')} Prove it</h3><p class="muted mb-0">Pass the level test with 70% or more to earn a downloadable certificate.</p></div>
      </div>
    </div></section>`;
  }
};

/* ------------------------------------------------------------- Level page */
FL.pages.level = {
  title(p) { const l = FL.course.level(p.lang, p.level); return l ? `${FL.course.title(l)} — ${l.name}` : 'Course'; },
  render(p, q) {
    const { icon, esc } = FL.ui;
    const level = FL.course.level(p.lang, p.level);
    if (!level) return FL.pages.notFound.render();
    const d = FL.db.load();
    const st = FL.learn.levelStats(level, d);
    const next = FL.learn.nextLesson(level, d);
    const c = FL.content[level.lang];
    const tab = ['lessons', 'glossary', 'grades'].includes(q.tab) ? q.tab : 'lessons';
    const words = level.lessons.reduce((s, l) => s + l.vocab.length, 0);
    return `
    <section class="page-head"><div class="container">
      <div class="crumbs"><a href="#/">Home</a><span>/</span><a href="#/courses">Courses</a><span>/</span><span>${esc(c.name)} ${level.code}</span></div>
      <div class="level-head">
        <div>
          <div class="row mb-2"><span class="level-code">${level.code}</span><span class="tag">${esc(c.name)}</span></div>
          <h1>${esc(c.name)} ${level.code} — ${esc(level.name)}</h1>
          <p>${esc(level.summary)}</p>
        </div>
        <div class="lh-progress">
          <div class="row between small"><strong>Your progress</strong><span class="muted">${st.done} of ${st.total} lessons</span></div>
          <div class="progress mt-1 mb-2 ${st.done === st.total ? 'good' : ''}"><span style="width:${st.pct}%"></span></div>
          <div class="row between small muted mb-2"><span>Average score: <strong style="color:var(--text)">${st.avg == null ? '—' : st.avg + '%'}</strong></span><span>Level test: <strong style="color:var(--text)">${st.test ? (st.test.passed ? 'Passed' : st.test.best + '%') : '—'}</strong></span></div>
          ${next ? `<a class="btn btn-primary btn-block" href="#/lesson/${next.id}">${st.started ? 'Continue' : 'Start'}: Lesson ${next.n} ${icon('arrow-right')}</a>`
            : `<a class="btn btn-primary btn-block" href="#/test/${level.lang}/${level.id}">${st.test && st.test.passed ? 'Review level test' : 'Take the level test'} ${icon('arrow-right')}</a>`}
        </div>
      </div>
    </div></section>
    <section class="section-tight"><div class="container">
      <div class="tabs" role="tablist">
        <button class="tab" role="tab" data-tab="lessons" aria-selected="${tab === 'lessons'}">Lessons <span class="count">${level.lessons.length}</span></button>
        <button class="tab" role="tab" data-tab="glossary" aria-selected="${tab === 'glossary'}">Glossary <span class="count">${words}</span></button>
        <button class="tab" role="tab" data-tab="grades" aria-selected="${tab === 'grades'}">Grades</button>
      </div>
      <div id="level-panel"></div>
      <div class="notice mt-3">${icon('info')}<div><strong>Learning outcome.</strong> ${esc(level.outcome)}</div></div>
    </div></section>`;
  },
  mount(root, p, q) {
    const level = FL.course.level(p.lang, p.level);
    if (!level) return;
    const { icon, esc } = FL.ui;
    const panel = root.querySelector('#level-panel');
    const views = {
      lessons() {
        const d = FL.db.load();
        const st = FL.learn.levelStats(level, d);
        return `<div class="lesson-list">${level.lessons.map(l => {
          const pr = d.progress[l.id];
          const s = FL.learn.status(l.id, d);
          return `<div class="lesson-row">
            <span class="num ${s}">${s === 'done' ? icon('check') : l.n}</span>
            <div><h3><a href="#/lesson/${l.id}">${esc(l.title)}</a></h3>
              <div class="meta"><span>${esc(l.focus)}</span><span>${icon('clock')} ${l.minutes} min</span><span>${l.slides.length + 3} slides · ${l.practice.length} exercises</span>
              ${pr && pr.best != null ? `<span class="${pr.completed ? 'ok' : ''}">Best score ${pr.best}%</span>` : ''}</div></div>
            <a class="btn ${s === 'new' ? '' : s === 'started' ? 'btn-primary' : 'btn-quiet'} btn-sm" href="#/lesson/${l.id}">${s === 'new' ? 'Start' : s === 'started' ? 'Continue' : 'Review'}</a>
          </div>`;
        }).join('')}
          <div class="lesson-row test">
            <span class="num ${st.test && st.test.passed ? 'done' : ''}">${icon(st.test && st.test.passed ? 'check' : 'award')}</span>
            <div><h3><a href="#/test/${level.lang}/${level.id}">Level test — ${level.code}</a></h3>
              <div class="meta"><span>15 questions from all five lessons</span><span>Pass mark 70%</span>${st.test ? `<span class="${st.test.passed ? 'ok' : ''}">Best ${st.test.best}%</span>` : ''}<span>Certificate on success</span></div></div>
            <a class="btn btn-sm" href="#/test/${level.lang}/${level.id}">${st.test ? 'Retake' : 'Take test'}</a>
          </div></div>`;
      },
      glossary() {
        return `<div class="row between wrap mb-2"><input class="input" id="gl-q" type="search" placeholder="Search ${level.lessons.reduce((s, l) => s + l.vocab.length, 0)} words…" style="max-width:320px" aria-label="Search the glossary">
          <span class="small muted">Words appear in your <a href="#/review">vocabulary review</a> once you open their lesson.</span></div>
          <div class="table-wrap"><table class="table"><thead><tr><th>${level.lang === 'fr' ? 'French' : 'Word or phrase'}</th><th>Meaning</th><th>Lesson</th><th><span class="sr-only">Listen</span></th></tr></thead>
          <tbody id="gl-body"></tbody></table></div>`;
      },
      grades() {
        const d = FL.db.load();
        const st = FL.learn.levelStats(level, d);
        return `<div class="table-wrap"><table class="table"><thead><tr><th>Activity</th><th>Slides</th><th class="num">Attempts</th><th class="num">Best score</th><th>Status</th></tr></thead><tbody>
          ${level.lessons.map(l => {
            const pr = d.progress[l.id];
            return `<tr><td><a href="#/lesson/${l.id}">${l.n}. ${esc(l.title)}</a></td>
              <td>${pr ? (pr.slidesDone ? 'Viewed' : `${pr.seen || 0} / ${l.slides.length + 3}`) : '—'}</td>
              <td class="num">${pr ? pr.attempts : 0}</td><td class="num">${pr && pr.best != null ? pr.best + '%' : '—'}</td>
              <td>${!pr ? '<span class="tag">Not started</span>' : pr.completed ? '<span class="tag good">Complete</span>' : '<span class="tag brand">In progress</span>'}</td></tr>`;
          }).join('')}
          <tr><td><a href="#/test/${level.lang}/${level.id}">Level test</a></td><td>—</td><td class="num">${st.test ? st.test.attempts : 0}</td><td class="num">${st.test ? st.test.best + '%' : '—'}</td>
            <td>${!st.test ? '<span class="tag">Not taken</span>' : st.test.passed ? '<span class="tag good">Passed</span>' : '<span class="tag warn">Not passed yet</span>'}</td></tr>
          </tbody></table></div>
          <p class="small muted mt-2">Course average: <strong>${st.avg == null ? '—' : st.avg + '%'}</strong> · A lesson is complete when you score at least ${FL.learn.PASS}% in its practice.</p>`;
      }
    };
    function drawGlossary(filter = '') {
      const f = FL.util.normalizeText(filter);
      const rows = [];
      level.lessons.forEach(l => l.vocab.forEach(v => { if (!f || FL.util.normalizeText(v[0] + ' ' + v[1]).includes(f)) rows.push([v, l]); }));
      root.querySelector('#gl-body').innerHTML = rows.length ? rows.map(([v, l]) => `<tr><td class="term">${esc(v[0])}</td><td>${esc(v[1])}</td><td class="small"><a href="#/lesson/${l.id}">Lesson ${l.n}</a></td>
        <td><button class="icon-btn sm" data-say="${esc(v[0])}" data-lang="${level.lang}" aria-label="Listen to ${esc(v[0])}">${icon('volume')}</button></td></tr>`).join('')
        : '<tr><td colspan="4" class="muted">No words match your search.</td></tr>';
    }
    function show(tab) {
      root.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
      panel.innerHTML = views[tab]();
      if (tab === 'glossary') {
        drawGlossary();
        root.querySelector('#gl-q').addEventListener('input', FL.util.debounce(e => drawGlossary(e.target.value), 100));
      }
      history.replaceState(null, '', `#/course/${level.lang}/${level.id}${tab === 'lessons' ? '' : '?tab=' + tab}`);
    }
    root.addEventListener('click', e => {
      const t = e.target.closest('[data-tab]');
      if (t) show(t.dataset.tab);
      const s = e.target.closest('[data-say]');
      if (s) FL.speech.speak(s.dataset.say, s.dataset.lang);
    });
    show(['lessons', 'glossary', 'grades'].includes(q.tab) ? q.tab : 'lessons');
  }
};

/* ------------------------------------------------------------- Level test */
FL.pages.test = {
  title(p) { const l = FL.course.level(p.lang, p.level); return l ? `Level test — ${FL.course.title(l)}` : 'Level test'; },
  COUNT: 15,
  PASS: 70,
  render(p) {
    const level = FL.course.level(p.lang, p.level);
    if (!level) return FL.pages.notFound.render();
    const { esc } = FL.ui;
    return `
    <section class="page-head"><div class="container narrow">
      <div class="crumbs"><a href="#/courses">Courses</a><span>/</span><a href="#/course/${level.lang}/${level.id}">${esc(FL.course.title(level))}</a><span>/</span><span>Level test</span></div>
      <h1>Level test — ${esc(FL.course.title(level))}</h1>
      <p>${this.COUNT} questions from all five lessons. Score ${this.PASS}% or more to pass and receive your certificate.</p>
    </div></section>
    <section class="section-tight"><div class="container narrow" id="test"></div></section>`;
  },
  mount(root, p) {
    const level = FL.course.level(p.lang, p.level);
    if (!level) return;
    const { icon, esc } = FL.ui;
    const el = root.querySelector('#test');
    const self = this;
    let runner = null;

    function intro() {
      const t = FL.db.load().levelTests[level.key];
      el.innerHTML = `<div class="card">
        <h2 class="mb-1">Before you start</h2>
        <ul class="list-check mb-3"><li>${icon('check')}<span>${self.COUNT} questions, mixed types — about 10 minutes.</span></li>
          <li>${icon('check')}<span>No feedback until the end, just like a real test.</span></li>
          <li>${icon('check')}<span>You can retake it as many times as you like. Your best score is saved.</span></li></ul>
        ${t ? `<div class="notice mb-3">${icon('info')}<div>Your best score so far: <strong>${t.best}%</strong>${t.passed ? ' — passed.' : '.'}</div></div>` : ''}
        <div class="row wrap"><button class="btn btn-primary btn-lg" data-start>Start the test ${icon('arrow-right')}</button>
          ${t && t.passed ? `<button class="btn btn-lg" data-cert>${icon('download')} My certificate</button>` : ''}</div></div>`;
      el.querySelector('[data-start]').addEventListener('click', start);
      const cb = el.querySelector('[data-cert]'); if (cb) cb.addEventListener('click', () => FL.pages.test.cert(level, t.best));
    }
    function pool() {
      const out = [];
      level.lessons.forEach(l => {
        const usable = l.practice.filter(x => x[0] !== 'listen');
        FL.util.shuffle(usable).slice(0, 3).forEach(x => out.push(FL.ex.normalize(x, level.lang)));
      });
      return FL.util.shuffle(out).slice(0, self.COUNT);
    }
    function start() {
      runner = FL.ex.run(el, { items: pool(), mode: 'test', title: `${FL.course.title(level)} test`, onFinish: finish });
    }
    function finish(res) {
      const passed = res.pct >= self.PASS;
      FL.db.mutate(d => {
        const prev = d.levelTests[level.key] || { best: 0, attempts: 0, passed: false };
        d.levelTests[level.key] = { best: Math.max(prev.best, res.pct), attempts: prev.attempts + 1, passed: prev.passed || passed, last: res.pct, date: Date.now() };
      });
      FL.game.award(5);
      el.innerHTML = `<div class="card">
        <div class="row between wrap mb-2"><div><div class="kicker mb-0">Your score</div><div class="result-score" style="color:${passed ? 'var(--good)' : 'var(--text)'}">${res.pct}%</div></div>
          <span class="tag ${passed ? 'good' : 'warn'}" style="font-size:.9rem">${passed ? 'Passed' : `Pass mark ${self.PASS}%`}</span></div>
        <p>${passed ? `Congratulations — you have completed <strong>${esc(FL.course.title(level))} (${esc(level.name)})</strong>.` : `You answered ${res.correct} of ${res.total} correctly. Review the lessons where you made mistakes and try again.`}</p>
        <div class="row wrap mb-3">
          ${passed ? `<button class="btn btn-primary" data-cert>${icon('download')} Get my certificate</button>` : ''}
          <button class="btn ${passed ? '' : 'btn-primary'}" data-again>${icon('repeat')} Take it again</button>
          <a class="btn btn-quiet" href="#/course/${level.lang}/${level.id}">Back to the course</a>
        </div>
        <h3>Review your answers</h3>${FL.ex.resultList(res.results)}</div>`;
      el.querySelector('[data-again]').addEventListener('click', start);
      const cb = el.querySelector('[data-cert]'); if (cb) cb.addEventListener('click', () => FL.pages.test.cert(level, res.pct));
    }
    intro();
    return () => { if (runner) runner.stop(); };
  },
  cert(level, score) {
    const { esc, icon } = FL.ui;
    const make = name => {
      const url = FL.ui.certificate({ name, title: `${FL.course.title(level)} — ${level.name}`, detail: `has completed the course and passed the level test with ${score}%`, level: level.code, date: FL.time.fmt(Date.now(), { day: 'numeric', month: 'long', year: 'numeric' }) });
      FL.ui.modal({ title: 'Your certificate', wide: true, body: `<img class="cert-preview" src="${url}" alt="Certificate for ${esc(name)}">`,
        actions: [{ label: 'Close', className: 'btn-quiet' }, { html: `${icon('download')} Download PNG`, className: 'btn-primary', onClick() { FL.ui.download(`${FL.config.brand}-${level.key}-certificate.png`, url); return false; } }] });
    };
    const user = FL.auth.current();
    if (user) return make(user.name);
    FL.ui.modal({
      title: 'Name on the certificate',
      body: `<div class="field mb-0"><label for="cn">Full name</label><input id="cn" class="input" maxlength="50"><span class="field-error" id="cn-err"></span></div>`,
      actions: [{ label: 'Cancel', className: 'btn-quiet' }, { label: 'Create certificate', className: 'btn-primary', onClick({ el }) {
        const v = el.querySelector('#cn').value.trim();
        if (v.length < 2) { el.querySelector('#cn-err').textContent = 'Please enter your name.'; return false; }
        setTimeout(() => make(v), 30);
      } }]
    });
  }
};
