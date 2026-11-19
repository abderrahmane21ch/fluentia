/* ==========================================================================
   Fluentia — Course catalogue & course detail
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.courses = {
  title: 'Courses',
  render(params, query) {
    const { icon, esc } = FL.ui;
    const lang = ['en', 'fr'].includes(query.lang) ? query.lang : 'all';
    return `
    <section class="page-head"><div class="container">
      <div class="eyebrow">${icon('book')} Courses</div>
      <h1>Find the right course</h1>
      <p>Every course is taught 1-on-1 and adapted to you. Not sure where to start? <a href="#/placement">Take the 5-minute placement test</a>.</p>
    </div></section>
    <section class="section" style="padding-top:0"><div class="container">
      <div class="filters" role="search">
        <div class="search">${icon('search')}<input class="input" type="search" id="f-q" placeholder="Search courses, e.g. IELTS, business, beginner…" aria-label="Search courses" value="${esc(query.q || '')}"></div>
        <div class="seg" role="group" aria-label="Language">
          ${[['all', 'All'], ['en', 'English'], ['fr', 'French']].map(([v, l]) => `<button data-lang="${v}" aria-pressed="${lang === v}">${l}</button>`).join('')}
        </div>
        <select class="select select-sm" id="f-level" aria-label="Level">
          <option value="">Any level</option>
          ${FL.data.LEVELS.slice(0, 5).map((l, i) => `<option value="${i}">${l} — ${FL.data.LEVEL_INFO[l].name}</option>`).join('')}
        </select>
        <select class="select select-sm" id="f-goal" aria-label="Goal">
          <option value="">Any goal</option>
          ${FL.data.GOALS.map(g => `<option value="${g.id}">${esc(g.label)}</option>`).join('')}
        </select>
      </div>
      <p class="small muted" id="f-count" aria-live="polite"></p>
      <div class="grid grid-3" id="course-grid"></div>
    </div></section>`;
  },
  mount(root, params, query) {
    const state = {
      lang: ['en', 'fr'].includes(query.lang) ? query.lang : 'all',
      q: query.q || '', level: '', goal: ''
    };
    const grid = root.querySelector('#course-grid');
    const count = root.querySelector('#f-count');
    function apply() {
      const q = state.q.trim().toLowerCase();
      const list = FL.data.courses.filter(c =>
        (state.lang === 'all' || c.lang === state.lang) &&
        (state.level === '' || c.levels.includes(+state.level)) &&
        (state.goal === '' || c.goals.includes(state.goal)) &&
        (!q || [c.title, c.summary, c.description, ...c.outcomes, c.lang === 'fr' ? 'french français' : 'english'].join(' ').toLowerCase().includes(q)));
      grid.innerHTML = list.length ? list.map(FL.views.courseCard).join('') :
        `<div class="empty" style="grid-column:1/-1">${FL.ui.icon('search')}<p class="mb-1"><strong>No courses match these filters.</strong></p><button class="btn btn-sm" id="f-reset">Reset filters</button></div>`;
      count.textContent = `Showing ${FL.util.plural(list.length, 'course')}`;
    }
    root.querySelector('#f-q').addEventListener('input', FL.util.debounce(e => { state.q = e.target.value; apply(); }, 120));
    root.querySelector('#f-level').addEventListener('change', e => { state.level = e.target.value; apply(); });
    root.querySelector('#f-goal').addEventListener('change', e => { state.goal = e.target.value; apply(); });
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-lang]');
      if (b) {
        state.lang = b.dataset.lang;
        root.querySelectorAll('[data-lang]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        apply();
      }
      if (e.target.closest('#f-reset')) {
        Object.assign(state, { lang: 'all', q: '', level: '', goal: '' });
        root.querySelector('#f-q').value = ''; root.querySelector('#f-level').value = ''; root.querySelector('#f-goal').value = '';
        root.querySelectorAll('[data-lang]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.lang === 'all')));
        apply();
      }
    });
    apply();
  }
};

FL.pages.course = {
  title(params) { const c = FL.data.courses.find(x => x.id === params.id); return c ? c.title : 'Course'; },
  render(params) {
    const { icon, esc } = FL.ui;
    const c = FL.data.courses.find(x => x.id === params.id);
    if (!c) return FL.pages.notFound.render();
    const minPrice = Math.min(...FL.config.plans.filter(p => p.credits > 0).map(p => p.priceUSD / p.credits));
    const related = FL.data.courses.filter(x => x.id !== c.id && x.lang === c.lang).slice(0, 3);
    const user = FL.auth.current();
    const active = user && FL.db.load().profile.activeCourse === c.id;
    return `
    <section class="course-hero" style="background:linear-gradient(135deg, ${c.color[0]}, ${c.color[1]})">
      <div class="container">
        <div class="crumbs"><a href="#/">Home</a><span>/</span><a href="#/courses">Courses</a><span>/</span><span>${esc(FL.views.langName(c.lang))}</span></div>
        <div class="row row-wrap mb-2" style="gap:8px">
          <span class="chip">${icon('globe')} ${FL.views.langName(c.lang)}</span>
          <span class="chip">${icon('chart')} ${FL.views.levelRange(c.levels)}</span>
          <span class="chip">${icon('clock')} ${esc(c.duration)}</span>
          <span class="chip">${icon('book')} ${c.lessons} lessons</span>
        </div>
        <h1>${esc(c.title)}</h1>
        <p>${esc(c.summary)}</p>
      </div>
    </section>
    <section class="section" style="padding-top:40px"><div class="container course-layout">
      <div class="stack" style="--gap:24px">
        <div class="card"><h2 style="font-size:1.5rem">About this course</h2><p class="mb-0" style="color:var(--text-2)">${esc(c.description)}</p></div>
        <div class="grid grid-2">
          <div class="card"><h3>${icon('target', '')} What you’ll achieve</h3><ul class="check-list small mt-2">${c.outcomes.map(o => `<li>${icon('check-circle')}<span>${esc(o)}</span></li>`).join('')}</ul></div>
          <div class="card"><h3>Who it’s for</h3><ul class="check-list small mt-2">${c.audience.map(o => `<li>${icon('user')}<span>${esc(o)}</span></li>`).join('')}</ul></div>
        </div>
        <div>
          <h2 style="font-size:1.5rem" class="mt-2">Syllabus</h2>
          <div class="accordion">${c.modules.map((m, i) => `
            <details ${i === 0 ? 'open' : ''}><summary><span class="badge badge-primary">Unit ${i + 1}</span> ${esc(m.title)} <span class="tiny muted" style="font-weight:500">${m.lessons.length} topics</span>${icon('chevron-down', 'chev')}</summary>
              <div class="acc-body"><ol>${m.lessons.map(l => `<li>${esc(l)}</li>`).join('')}</ol></div></details>`).join('')}
          </div>
        </div>
        <div class="card" id="sample">
          <div class="row between row-wrap"><h3 class="mb-0">${icon('zap')} Try a sample exercise</h3><span class="badge badge-warning">+5 XP</span></div>
          <div class="question" style="font-size:1.2rem">${esc(c.sample.q)}</div>
          <div class="answers" id="sample-answers"></div>
          <div id="sample-fb"></div>
        </div>
      </div>
      <aside class="sticky-card">
        <div class="card">
          <div class="small muted">From</div>
          <div class="row" style="align-items:baseline;gap:6px"><span style="font-family:var(--font-display);font-size:2.2rem;font-weight:700">${FL.money.format(minPrice)}</span><span class="muted small">/ lesson</span></div>
          <p class="small muted">Flexible 1-on-1 lessons · start with a free trial.</p>
          <a class="btn btn-primary btn-block btn-lg" href="#/book?course=${c.id}">${icon('calendar')} Book a lesson</a>
          <a class="btn btn-block mt-1" href="#/book?type=trial&course=${c.id}">${icon('sparkles')} Free trial lesson</a>
          <button class="btn btn-ghost btn-block mt-1" data-enroll ${active ? 'disabled' : ''}>${icon(active ? 'check' : 'plus')} ${active ? 'Your active course' : 'Set as my course'}</button>
          <hr class="divider">
          <ul class="check-list small">
            <li>${icon('video')}<span>Live video lessons + virtual classroom</span></li>
            <li>${icon('layers')}<span>Flashcards & homework after each lesson</span></li>
            <li>${icon('chart')}<span>Progress tracking on your dashboard</span></li>
          </ul>
        </div>
        ${related.length ? `<div class="mt-3"><h4 class="muted small" style="text-transform:uppercase;letter-spacing:.1em">Related courses</h4>
          <div class="stack">${related.map(r => `<a class="card card-hover card-pad-sm row" href="#/course/${r.id}" style="color:inherit;text-decoration:none"><span class="icon-tile" style="background:linear-gradient(135deg, ${r.color[0]}, ${r.color[1]});color:#fff">${icon('book')}</span><span><strong class="small">${esc(r.title)}</strong><br><span class="tiny muted">${FL.views.levelRange(r.levels)}</span></span></a>`).join('')}</div></div>` : ''}
      </aside>
    </div></section>`;
  },
  mount(root, params) {
    const c = FL.data.courses.find(x => x.id === params.id);
    if (!c) return;
    const { icon, esc } = FL.ui;
    const order = FL.util.shuffle(c.sample.options.map((o, i) => i));
    const wrap = root.querySelector('#sample-answers');
    wrap.innerHTML = order.map((oi, k) => `<button class="answer" data-i="${oi}"><span class="key">${'ABCD'[k]}</span>${esc(c.sample.options[oi])}</button>`).join('');
    wrap.addEventListener('click', e => {
      const b = e.target.closest('.answer');
      if (!b || b.disabled) return;
      const ok = +b.dataset.i === c.sample.answer;
      wrap.querySelectorAll('.answer').forEach(x => {
        x.disabled = true;
        if (+x.dataset.i === c.sample.answer) x.classList.add('correct');
      });
      if (!ok) b.classList.add('wrong');
      root.querySelector('#sample-fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${icon(ok ? 'check-circle' : 'x-circle')}<div><strong>${ok ? 'Correct!' : 'Not quite.'}</strong><p>${esc(c.sample.explain)}</p></div></div>`;
      if (ok) FL.game.award(5, { skill: 'grammar' });
    });
    const enroll = root.querySelector('[data-enroll]');
    enroll.addEventListener('click', () => {
      if (!FL.auth.current()) { FL.ui.toast('Create a free account to save your course.', 'info'); FL.router.go('/register?next=' + encodeURIComponent('/course/' + c.id)); return; }
      FL.db.mutate(d => { d.profile.activeCourse = c.id; d.profile.targetLang = c.lang; });
      enroll.disabled = true;
      enroll.innerHTML = `${icon('check')} Your active course`;
      FL.ui.toast(`${c.title} is now your active course.`, 'success');
    });
  }
};
