/* ==========================================================================
   Fluentia — lesson player: slides → practice → summary
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.lesson = {
  title(p) { const l = FL.course.lesson(p.id); return l ? l.title : 'Lesson'; },

  /* Build the full slide list: cover, authored slides, key vocabulary, summary. */
  slides(lesson) {
    return [{ t: 'cover' }, ...lesson.slides, { t: 'keyvocab', title: 'Key vocabulary' }, { t: 'summary', title: 'Summary' }];
  },

  renderSlide(s, lesson, level) {
    const { icon, esc, fmt } = FL.ui;
    const lang = lesson.lang;
    const say = (text, label) => `<button type="button" class="icon-btn sm" data-say="${esc(text)}" data-lang="${lang}" aria-label="Listen${label ? ': ' + esc(label) : ''}">${icon('volume')}</button>`;
    const sayEn = text => `<button type="button" class="icon-btn sm" data-say="${esc(text)}" data-lang="${lang}" aria-label="Listen">${icon('volume')}</button>`;
    switch (s.t) {
      case 'cover':
        return `<div class="slide-cover">
          <span class="tag brand">${esc(FL.course.title(level))} · Lesson ${lesson.n} of ${level.lessons.length}</span>
          <h2>${esc(lesson.title)}</h2>
          <p class="muted" style="font-size:1.1rem">${esc(lesson.focus)} · about ${lesson.minutes} minutes</p>
          <h4 class="mt-2 mb-1">In this lesson you will</h4>
          <ul>${lesson.goals.map(g => `<li>${icon('check')}<span>${esc(g)}</span></li>`).join('')}</ul>
        </div>`;
      case 'text':
        return `<h2>${esc(s.title)}</h2><div class="s-text">${s.body.map(p => `<p>${fmt(p)}</p>`).join('')}</div>`;
      case 'table':
        return `<h2>${esc(s.title)}</h2>${s.intro ? `<p class="s-intro">${fmt(s.intro)}</p>` : ''}
          <div class="table-wrap"><table class="table"><thead><tr>${s.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${s.rows.map(r => `<tr>${r.map(c => `<td>${fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
          ${s.note ? `<div class="s-note">${fmt(s.note)}</div>` : ''}`;
      case 'dialogue':
        return `<div class="row between wrap mb-2"><h2 class="mb-0">${esc(s.title)}</h2>
            <button type="button" class="btn btn-sm" data-play-all>${icon('play')} Play the dialogue</button></div>
          <div class="lines">${s.lines.map(l => `<div class="line"><span class="who">${esc(l[0])}</span><span class="say">${esc(l[1])}${l[2] ? `<span class="gloss">${esc(l[2])}</span>` : ''}</span>${say(l[1])}</div>`).join('')}</div>`;
      case 'examples':
        return `<h2>${esc(s.title)}</h2><ul class="ex-list">${s.items.map(it => `<li><span class="say">${fmt(it[0])}${it[1] ? `<span class="gloss">${esc(it[1])}</span>` : ''}</span>${say(it[0])}</li>`).join('')}</ul>`;
      case 'vocab':
        return `<h2>${esc(s.title)}</h2><div class="word-grid">${s.words.map(w => `<div class="word"><div><strong>${esc(w[0])}</strong><span>${esc(w[1])}</span></div>${say(w[0])}</div>`).join('')}</div>`;
      case 'keyvocab':
        return `<div class="row between wrap mb-2"><h2 class="mb-0">Key vocabulary</h2><span class="small muted">${icon('layers')} Added to your review deck</span></div>
          <div class="word-grid">${lesson.vocab.map(w => `<div class="word"><div><strong>${esc(w[0])}</strong><span>${esc(w[1])}</span></div>${say(w[0])}</div>`).join('')}</div>`;
      case 'mistakes':
        return `<h2>${esc(s.title)}</h2>${s.items.map(m => `<div class="mistake"><div class="bad"><span class="lbl">Incorrect</span><span class="s-wrong">${esc(m[0])}</span></div>
          <div class="good"><span class="lbl">Correct</span>${esc(m[1])}</div><div class="why">${fmt(m[2])}</div></div>`).join('')}`;
      case 'summary':
        return `<h2>Summary</h2><ol class="summary-list">${lesson.summary.map(p => `<li><span>${fmt(p)}</span></li>`).join('')}</ol>
          <div class="notice mt-3">${icon('check-circle')}<div>You’ve finished the slides. Now practise with ${lesson.practice.length} exercises — score ${FL.learn.PASS}% or more to complete the lesson.</div></div>`;
      default:
        return '';
    }
  },

  render(p, q) {
    const lesson = FL.course.lesson(p.id);
    if (!lesson) return FL.pages.notFound.render();
    const { icon, esc } = FL.ui;
    const level = FL.course.levelOf(lesson);
    const d = FL.db.load();
    const c = FL.content[lesson.lang];
    const toc = level.lessons.map(l => {
      const s = FL.learn.status(l.id, d);
      return `<li><a href="#/lesson/${l.id}" class="${l.id === lesson.id ? 'current' : ''}"><span class="st ${s}">${s === 'done' ? icon('check') : ''}</span><span>${l.n}. ${esc(l.title)}</span></a></li>`;
    }).join('');
    return `
    <div class="container"><div class="player">
      <aside class="player-side" aria-label="Lessons in this level">
        <div class="ps-head"><div class="tiny muted">${esc(c.name)} · ${level.code}</div><a href="#/course/${level.lang}/${level.id}">${esc(level.name)}</a></div>
        <ul class="toc">${toc}<li><a href="#/test/${level.lang}/${level.id}"><span class="st">${''}</span><span>Level test</span></a></li></ul>
        <div class="mt-3 small"><a href="#/course/${level.lang}/${level.id}?tab=glossary">Glossary</a> · <a href="#/course/${level.lang}/${level.id}?tab=grades">Grades</a></div>
      </aside>
      <div>
        <div class="crumbs"><a href="#/courses">Courses</a><span>/</span><a href="#/course/${level.lang}/${level.id}">${esc(FL.course.title(level))}</a><span>/</span><span>Lesson ${lesson.n}</span></div>
        <details class="player-mobile-toc mb-2"><summary class="btn btn-sm">${icon('menu')} Lessons in ${esc(FL.course.title(level))}</summary><ul class="toc mt-1">${toc}</ul></details>
        <div class="lesson-head">
          <h1>${esc(lesson.title)}</h1>
          <div class="lesson-meta"><span>${esc(lesson.focus)}</span><span>${icon('clock')} ${lesson.minutes} min</span>
            <span>${icon('check-circle')} ${lesson.practice.length} exercises</span>
            <button type="button" class="btn-link" data-notes>${icon('pen')} My notes</button></div>
        </div>
        <div class="stepper" role="tablist" aria-label="Lesson steps">
          <button type="button" data-step="slides"><span class="sn" data-sn="slides">1</span><span class="sl">Lesson</span></button>
          <button type="button" data-step="practice"><span class="sn" data-sn="practice">2</span><span class="sl">Practice</span></button>
          <button type="button" data-step="summary"><span class="sn" data-sn="summary">3</span><span class="sl">Summary</span></button>
        </div>
        <div id="stage"></div>
        <div class="row between wrap mt-3" id="lesson-nav"></div>
      </div>
    </div></div>
    <aside class="drawer" id="notes-drawer" aria-label="My notes" aria-hidden="true">
      <div class="drawer-head"><h3>My notes</h3><button type="button" class="icon-btn" data-close-notes aria-label="Close notes">${icon('x')}</button></div>
      <div class="drawer-body"><p class="small muted mb-0">Private notes for “${esc(lesson.title)}”. They save automatically.</p>
        <textarea class="textarea" id="notes-text" placeholder="Write rules, examples or questions for your teacher…"></textarea>
        <div class="row between"><span class="tiny muted" id="notes-status"></span><button type="button" class="btn btn-sm" data-dl-notes>${icon('download')} Download</button></div></div>
    </aside>`;
  },

  mount(root, p, q) {
    const lesson = FL.course.lesson(p.id);
    if (!lesson) return;
    const self = this;
    const { icon, esc } = FL.ui;
    const level = FL.course.levelOf(lesson);
    const stage = root.querySelector('#stage');
    const slides = this.slides(lesson);
    let step = ['slides', 'practice', 'summary'].includes(q.step) ? q.step : 'slides';
    let idx = 0;
    let runner = null;
    let playing = false;
    FL.learn.touch(lesson.id);
    const start = FL.learn.get(lesson.id);
    if (step === 'slides' && start && start.seen && !start.slidesDone && q.s === undefined) idx = Math.min(start.seen - 1, slides.length - 1);
    if (q.s !== undefined) idx = FL.util.clamp(parseInt(q.s, 10) || 0, 0, slides.length - 1);

    function stepMarks() {
      const pr = FL.learn.get(lesson.id) || {};
      const done = { slides: !!pr.slidesDone, practice: !!pr.completed, summary: !!pr.completed };
      root.querySelectorAll('[data-step]').forEach(b => {
        const k = b.dataset.step;
        b.setAttribute('aria-current', k === step ? 'step' : 'false');
        const sn = b.querySelector('.sn');
        sn.classList.toggle('ok', done[k]);
        sn.innerHTML = done[k] ? icon('check') : ({ slides: 1, practice: 2, summary: 3 })[k];
      });
    }
    function setUrl() {
      const qs = step === 'slides' ? (idx ? `?s=${idx}` : '') : `?step=${step}`;
      history.replaceState(null, '', `#/lesson/${lesson.id}${qs}`);
    }

    /* ---------------- Slides */
    function drawSlides() {
      const total = slides.length;
      stage.innerHTML = `
        <div class="deck" id="deck">
          <div class="deck-bar"><span>Slide ${idx + 1} of ${total}</span>
            <span class="row" style="gap:2px">
              <button type="button" class="icon-btn sm" data-fs aria-label="Full screen" title="Full screen (F)">${icon('expand')}</button>
            </span></div>
          <div class="slide" id="slide" aria-live="polite">${self.renderSlide(slides[idx], lesson, level)}</div>
          <div class="deck-nav">
            <button type="button" class="btn" data-prev ${idx === 0 ? 'disabled' : ''}>${icon('arrow-left')} <span class="sl">Previous</span></button>
            <div class="dots" role="tablist" aria-label="Slides">${slides.map((s, i) => `<button type="button" data-go="${i}" aria-label="Slide ${i + 1}" aria-current="${i === idx}" class="${i < ((FL.learn.get(lesson.id) || {}).seen || 0) ? 'seen' : ''}"></button>`).join('')}</div>
            ${idx < total - 1 ? `<button type="button" class="btn btn-primary" data-next><span class="sl">Next</span> ${icon('arrow-right')}</button>`
              : `<button type="button" class="btn btn-primary" data-to-practice>Start practice ${icon('arrow-right')}</button>`}
          </div>
        </div>
        <p class="tiny muted center mt-1">Use <span class="kbd">←</span> <span class="kbd">→</span> to move between slides, <span class="kbd">F</span> for full screen. On a phone, swipe.</p>`;
      FL.learn.slideSeen(lesson.id, idx, total);
      stepMarks();
      setUrl();
      bindSwipe(stage.querySelector('#slide'));
    }
    function go(i) {
      FL.speech.stop(); playing = false;
      idx = FL.util.clamp(i, 0, slides.length - 1);
      const fs = document.fullscreenElement && document.fullscreenElement.id === 'deck';
      if (fs) {
        // Update in place to keep full screen.
        const deck = stage.querySelector('#deck');
        deck.querySelector('#slide').innerHTML = self.renderSlide(slides[idx], lesson, level);
        deck.querySelector('.deck-bar span').textContent = `Slide ${idx + 1} of ${slides.length}`;
        deck.querySelectorAll('[data-go]').forEach((b, j) => b.setAttribute('aria-current', String(j === idx)));
        deck.querySelector('[data-prev]').disabled = idx === 0;
        FL.learn.slideSeen(lesson.id, idx, slides.length);
        setUrl();
        return;
      }
      drawSlides();
    }
    function bindSwipe(el) {
      let x0 = null, y0 = null;
      el.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') { x0 = e.clientX; y0 = e.clientY; } });
      el.addEventListener('pointerup', e => {
        if (x0 === null) return;
        const dx = e.clientX - x0, dy = e.clientY - y0;
        x0 = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(idx + (dx < 0 ? 1 : -1));
      });
    }
    function playAll(btn) {
      const s = slides[idx];
      if (!s.lines) return;
      if (playing) { FL.speech.stop(); playing = false; btn.innerHTML = `${icon('play')} Play the dialogue`; return; }
      if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') { FL.ui.toast('Audio is not available in this browser.', 'error'); return; }
      playing = true;
      btn.innerHTML = `${icon('pause')} Stop`;
      let i = 0;
      const lines = Array.from(stage.querySelectorAll('.line'));
      const nextLine = () => {
        lines.forEach(l => l.style.outline = '');
        if (!playing || i >= s.lines.length || !btn.isConnected) { playing = false; if (btn.isConnected) btn.innerHTML = `${icon('play')} Play the dialogue`; return; }
        if (lines[i]) lines[i].style.outline = '2px solid var(--brand-line)';
        const u = new SpeechSynthesisUtterance(s.lines[i][1]);
        u.lang = FL.content[lesson.lang].speech;
        u.rate = 0.92;
        u.onend = () => { i++; setTimeout(nextLine, 250); };
        u.onerror = () => { playing = false; };
        speechSynthesis.speak(u);
      };
      speechSynthesis.cancel();
      nextLine();
    }

    /* ---------------- Practice */
    // opt: undefined = start screen or first run, 'fresh' = full run, array = retry those exercises
    function drawPractice(opt) {
      FL.speech.stop();
      const retry = Array.isArray(opt);
      const pr = FL.learn.get(lesson.id);
      stepMarks(); setUrl();
      if (!opt && pr && pr.attempts > 0) {
        stage.innerHTML = `<div class="card">
          <div class="row between wrap"><div><div class="kicker mb-0">Practice</div><h2 class="mb-0">${lesson.practice.length} exercises</h2></div>
            <span class="tag ${pr.completed ? 'good' : 'warn'}" style="font-size:.9rem">Best score ${pr.best}%</span></div>
          <p class="muted mt-2">You have practised this lesson ${FL.util.plural(pr.attempts, 'time')}. ${pr.completed ? 'It is complete — practising again keeps it fresh.' : `Reach ${FL.learn.PASS}% to complete it.`}</p>
          <div class="row wrap"><button type="button" class="btn btn-primary" data-start-practice>${icon('repeat')} Practise again</button>
            <button type="button" class="btn" data-to="summary">Go to summary</button></div></div>`;
        return;
      }
      const items = (retry ? opt : lesson.practice).map(x => FL.ex.normalize(x, lesson.lang));
      if (runner) runner.stop();
      runner = FL.ex.run(stage, { items, title: retry ? 'Retry mistakes' : 'Practice', onFinish: res => finishPractice(res, retry) });
    }
    function finishPractice(res, retry) {
      const { best, completedNow } = retry ? { best: (FL.learn.get(lesson.id) || {}).best, completedNow: false } : FL.learn.saveScore(lesson.id, res.pct);
      const wrong = res.results.filter(r => !r.ok);
      const passed = res.pct >= FL.learn.PASS;
      const next = FL.course.next(lesson);
      const msg = retry ? (wrong.length ? `Still ${FL.util.plural(wrong.length, 'mistake')} to review.` : 'All your mistakes are fixed. Well done!')
        : res.pct >= 90 ? 'Excellent work — you have mastered this lesson.' : passed ? 'Well done — lesson complete. Review any mistakes below.' : 'Not quite there yet. Go back over the slides, then try again.';
      stage.innerHTML = `<div class="card">
        <div class="row between wrap mb-2"><div><div class="kicker mb-0">${retry ? 'Retry' : 'Your score'}</div>
          <div class="result-score" style="color:${passed ? 'var(--good)' : 'var(--text)'}">${res.pct}%</div></div>
          <div class="small muted" style="text-align:right">${res.correct} of ${res.total} correct${!retry && best != null ? `<br>Best score: <strong style="color:var(--text)">${best}%</strong>` : ''}</div></div>
        ${completedNow ? `<div class="notice good mb-2">${icon('check-circle')}<div><strong>Lesson complete.</strong> ${next ? `Next up: Lesson ${next.n} — ${esc(next.title)}.` : 'That was the last lesson of this level — the level test is waiting for you.'}</div></div>` : ''}
        <p>${msg}</p>
        <div class="row wrap mb-3">
          ${wrong.length ? `<button type="button" class="btn btn-primary" data-retry>${icon('repeat')} Retry ${FL.util.plural(wrong.length, 'mistake')}</button>` : ''}
          <button type="button" class="btn ${wrong.length ? '' : 'btn-primary'}" data-to="summary">Continue to summary ${icon('arrow-right')}</button>
          <button type="button" class="btn btn-quiet" data-start-practice>Start again</button>
        </div>
        <h3>Review</h3>${FL.ex.resultList(res.results)}</div>`;
      stage.querySelector('[data-retry]') && stage.querySelector('[data-retry]').addEventListener('click', () => {
        drawPractice(wrong.map(w => w.item.raw));
      });
      stepMarks();
      refreshToc();
      window.scrollTo({ top: Math.max(0, stage.getBoundingClientRect().top + window.scrollY - 90) });
    }

    /* ---------------- Summary */
    function drawSummary() {
      FL.speech.stop();
      const pr = FL.learn.get(lesson.id) || {};
      const next = FL.course.next(lesson);
      stepMarks(); setUrl();
      stage.innerHTML = `<div class="card">
        <div class="kicker">Summary</div><h2>What you learned</h2>
        <ol class="summary-list mb-3">${lesson.summary.map(s => `<li><span>${FL.ui.fmt(s)}</span></li>`).join('')}</ol>
        <h3>Vocabulary</h3>
        <div class="word-grid mb-3">${lesson.vocab.map(w => `<div class="word"><div><strong>${esc(w[0])}</strong><span>${esc(w[1])}</span></div><button type="button" class="icon-btn sm" data-say="${esc(w[0])}" data-lang="${lesson.lang}" aria-label="Listen">${icon('volume')}</button></div>`).join('')}</div>
        <div class="panel row between wrap">
          <div><strong>${pr.completed ? 'Lesson complete' : 'Lesson not complete yet'}</strong><div class="small muted">${pr.best != null ? `Best practice score: ${pr.best}%` : 'Do the practice to complete this lesson.'}</div></div>
          <div class="row wrap">
            <a class="btn" href="#/review">${icon('layers')} Review these words</a>
            ${pr.completed ? (next ? `<a class="btn btn-primary" href="#/lesson/${next.id}">Next lesson ${icon('arrow-right')}</a>` : `<a class="btn btn-primary" href="#/test/${level.lang}/${level.id}">Take the level test ${icon('arrow-right')}</a>`)
              : `<button type="button" class="btn btn-primary" data-to="practice">Go to practice ${icon('arrow-right')}</button>`}
          </div></div></div>`;
    }

    function refreshToc() {
      const d = FL.db.load();
      root.querySelectorAll('.toc a[href^="#/lesson/"]').forEach(a => {
        const id = a.getAttribute('href').replace('#/lesson/', '');
        const s = FL.learn.status(id, d);
        const st = a.querySelector('.st');
        st.className = 'st ' + s;
        st.innerHTML = s === 'done' ? icon('check') : '';
      });
    }
    function lessonNav() {
      const prev = FL.course.prev(lesson), next = FL.course.next(lesson);
      root.querySelector('#lesson-nav').innerHTML = `
        ${prev ? `<a class="btn btn-quiet" href="#/lesson/${prev.id}">${icon('arrow-left')} ${esc(prev.title)}</a>` : `<a class="btn btn-quiet" href="#/course/${level.lang}/${level.id}">${icon('arrow-left')} Back to ${esc(FL.course.title(level))}</a>`}
        ${next ? `<a class="btn btn-quiet" href="#/lesson/${next.id}">${esc(next.title)} ${icon('arrow-right')}</a>` : `<a class="btn btn-quiet" href="#/test/${level.lang}/${level.id}">Level test ${icon('arrow-right')}</a>`}`;
    }
    function show(s) {
      if (runner) { runner.stop(); runner = null; }
      step = s;
      if (s === 'slides') drawSlides(); else if (s === 'practice') drawPractice(); else drawSummary();
    }

    /* ---------------- Notes */
    const drawer = root.querySelector('#notes-drawer');
    const notes = root.querySelector('#notes-text');
    const key = 'lesson:' + lesson.id;
    notes.value = FL.db.load().notes[key] || '';
    const saveNotes = FL.util.debounce(() => {
      FL.db.mutate(d => { d.notes[key] = notes.value.slice(0, 20000); });
      root.querySelector('#notes-status').textContent = 'Saved';
    }, 500);
    notes.addEventListener('input', () => { root.querySelector('#notes-status').textContent = 'Saving…'; saveNotes(); });
    function openNotes(open) {
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      if (open) setTimeout(() => notes.focus(), 120);
    }

    /* ---------------- Events */
    root.addEventListener('click', e => {
      const t = e.target;
      const st = t.closest('[data-step]'); if (st) { show(st.dataset.step); return; }
      const to = t.closest('[data-to]'); if (to) { show(to.dataset.to); window.scrollTo({ top: 0 }); return; }
      if (t.closest('[data-next]')) return go(idx + 1);
      if (t.closest('[data-prev]')) return go(idx - 1);
      const g = t.closest('[data-go]'); if (g) return go(+g.dataset.go);
      if (t.closest('[data-to-practice]')) { show('practice'); window.scrollTo({ top: 0 }); return; }
      if (t.closest('[data-start-practice]')) { if (runner) runner.stop(); runner = null; drawPractice('fresh'); return; }
      const pa = t.closest('[data-play-all]'); if (pa) return playAll(pa);
      const s = t.closest('[data-say]'); if (s) { FL.speech.speak(s.dataset.say, s.dataset.lang, 0.92); return; }
      if (t.closest('[data-fs]')) { toggleFs(); return; }
      if (t.closest('[data-notes]')) { openNotes(!drawer.classList.contains('open')); return; }
      if (t.closest('[data-close-notes]')) { openNotes(false); return; }
      if (t.closest('[data-dl-notes]')) { FL.ui.download(`notes-${lesson.id}.txt`, `${lesson.title}\n\n${notes.value}`); }
    });
    function toggleFs() {
      const deck = stage.querySelector('#deck');
      if (!deck) return;
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else if (deck.requestFullscreen) deck.requestFullscreen().catch(() => FL.ui.toast('Full screen is not available here.', 'info'));
    }
    const onKey = e => {
      if (e.target.matches('input, textarea, select') || document.querySelector('.modal-backdrop')) return;
      if (e.key === 'Escape' && drawer.classList.contains('open')) { openNotes(false); return; }
      if (step !== 'slides') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); if (idx < slides.length - 1) go(idx + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(idx - 1); }
      else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) toggleFs();
    };
    document.addEventListener('keydown', onKey);

    lessonNav();
    show(step);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (runner) runner.stop();
      playing = false;
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }
};
