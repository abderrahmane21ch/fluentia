/* ==========================================================================
   Fluentia — "My learning" dashboard and onboarding
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.dashboard = {
  title: 'My learning',
  auth: true,
  render() { return `<section class="section-tight"><div class="container" id="dash"></div></section>`; },
  mount(root) {
    const { icon, esc } = FL.ui;
    const el = root.querySelector('#dash');
    FL.db.processCompletedLessons();

    function lessonItem(b, past) {
      const t = FL.schedule.lessonType(b.type);
      const st = FL.db.bookingStatus(b);
      const now = Date.now();
      const canJoin = now >= b.start - FL.config.booking.joinEarlyMinutes * 60000 && now < b.end;
      return `<div class="lesson-item">
        <div class="date-tile"><div class="m">${FL.time.fmt(b.start, { month: 'short' })}</div><div class="d">${FL.time.fmt(b.start, { day: 'numeric' })}</div></div>
        <div class="li-body"><strong>${esc(t.name)} · ${esc(b.topic || 'General')}</strong>
          <span class="small muted">${FL.time.fmt(b.start, { weekday: 'long' })}, ${FL.time.fmtTime(b.start)}–${FL.time.fmtTime(b.end)}${past ? '' : ` · ${st === 'live' ? '<span class="tag bad">Live now</span>' : FL.time.relative(b.start)}`}</span></div>
        <div class="li-actions">${past ? `<a class="btn btn-quiet btn-sm" href="#/classroom/${b.id}">Notes</a>` : `
          ${canJoin ? `<a class="btn btn-primary btn-sm" href="${esc(FL.config.teacher.meetingLink)}" target="_blank" rel="noopener">${icon('video')} Join</a>` : ''}
          <a class="btn btn-sm" href="#/classroom/${b.id}">Classroom</a>
          <button type="button" class="icon-btn sm" data-ics="${b.id}" title="Add to calendar" aria-label="Add to calendar">${icon('download')}</button>
          ${st === 'upcoming' ? `<button type="button" class="icon-btn sm" data-resched="${b.id}" title="Reschedule" aria-label="Reschedule">${icon('repeat')}</button>
          <button type="button" class="icon-btn sm" data-cancel="${b.id}" title="Cancel" aria-label="Cancel lesson">${icon('x')}</button>` : ''}`}</div></div>`;
    }

    function heatmap(d) {
      const today = FL.time.localKey();
      const wd = (FL.time.weekdayOfKey(today) + 6) % 7;
      const start = FL.time.addDaysKey(today, -(16 * 7 + wd));
      let cells = '', active = 0;
      for (let i = 0; i < 17 * 7; i++) {
        const k = FL.time.addDaysKey(start, i);
        const v = d.activity[k] || 0;
        if (v) active++;
        const l = v === 0 ? 0 : v <= 3 ? 1 : v <= 8 ? 2 : v <= 15 ? 3 : 4;
        cells += `<i data-l="${l}" class="${k > today ? 'future' : ''}" title="${k}${v ? '' : ' — no activity'}"></i>`;
      }
      return `<div class="heatmap" role="img" aria-label="${active} active days in the last 17 weeks">${cells}</div><p class="tiny muted mt-1 mb-0">${active} active days in the last 17 weeks</p>`;
    }

    function draw() {
      const user = FL.auth.current();
      if (!user) return;
      const d = FL.db.load();
      const lessonsDone = Object.values(d.progress).filter(p => p.completed).length;
      const scores = Object.values(d.progress).filter(p => p.best != null).map(p => p.best);
      const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
      const due = FL.srs.totalDue(d);
      const streak = FL.game.streak(d);
      const cont = FL.learn.continueTarget(d);
      const lang = d.profile.lang || 'en';
      const startLevel = FL.course.level(lang, d.profile.levels[lang] || 'a1') || FL.content[lang].levels[0];
      const target = cont || FL.learn.nextLesson(startLevel, d) || startLevel.lessons[0];
      const targetLevel = FL.course.levelOf(target);
      const tp = d.progress[target.id];
      const myLevels = FL.course.allLevels().filter(l => FL.learn.levelStats(l, d).started);
      const mine = FL.db.myBookings();
      const upcoming = mine.filter(b => ['upcoming', 'live'].includes(FL.db.bookingStatus(b)));
      const past = mine.filter(b => FL.db.bookingStatus(b) === 'completed').reverse().slice(0, 3);
      const week = FL.learn.completedThisWeek(d);
      const goal = d.profile.weeklyLessons || 2;

      el.innerHTML = `
        <div class="row between wrap mb-3" style="align-items:flex-end">
          <div><div class="small muted">${FL.time.fmtDateLong(Date.now())}</div><h1 class="mb-0" style="font-size:clamp(1.8rem,3vw,2.3rem)">${FL.time.greeting()}, ${esc(FL.util.firstName(user.name))}</h1></div>
          <div class="row wrap"><a class="btn" href="#/review">${icon('layers')} Review${due ? ` (${due})` : ''}</a><a class="btn btn-primary" href="#/courses">${icon('book')} All courses</a></div>
        </div>

        <div class="card continue mb-3">
          <div><div class="kicker mb-1">${cont ? 'Continue learning' : 'Start here'}</div>
            <h2 class="mb-1" style="font-size:1.45rem">${esc(target.title)}</h2>
            <p class="muted mb-2">${esc(FL.course.title(targetLevel))} · Lesson ${target.n} of ${targetLevel.lessons.length} · ${esc(target.focus)}</p>
            <div class="progress" style="max-width:360px"><span style="width:${tp ? Math.round(((tp.seen || 0) / (target.slides.length + 3)) * 100) : 0}%"></span></div></div>
          <a class="btn btn-primary btn-lg" href="#/lesson/${target.id}">${tp ? 'Continue' : 'Start lesson'} ${icon('arrow-right')}</a>
        </div>

        <div class="stat-row">
          <div><strong>${lessonsDone}</strong><span>lessons completed</span></div>
          <div><strong>${avg == null ? '—' : avg + '%'}</strong><span>average score</span></div>
          <div><strong>${due}</strong><span>words to review</span></div>
          <div><strong>${streak}</strong><span>day streak</span></div>
        </div>

        <div class="dash-grid">
          <div class="stack">
            <div class="card">
              <div class="card-head"><h3>My courses</h3><a class="btn btn-quiet btn-sm" href="#/courses">Browse</a></div>
              ${myLevels.length ? myLevels.map(l => { const st = FL.learn.levelStats(l, d); const nx = FL.learn.nextLesson(l, d); return `
                <div class="my-level"><span class="level-code sm">${l.code}</span>
                  <div><a href="#/course/${l.lang}/${l.id}" style="font-weight:700;color:var(--text);text-decoration:none">${esc(FL.course.title(l))} — ${esc(l.name)}</a>
                    <div class="progress mt-1 ${st.done === st.total ? 'good' : ''}"><span style="width:${st.pct}%"></span></div>
                    <div class="tiny muted mt-1">${st.done} of ${st.total} lessons${st.avg != null ? ` · average ${st.avg}%` : ''}${st.test && st.test.passed ? ' · level test passed' : ''}</div></div>
                  <a class="btn btn-sm" href="${nx ? `#/lesson/${nx.id}` : `#/test/${l.lang}/${l.id}`}">${nx ? 'Continue' : 'Level test'}</a></div>`; }).join('')
                : `<p class="muted mb-2">You haven’t started a course yet.</p><div class="row wrap"><a class="btn btn-primary btn-sm" href="#/lesson/${target.id}">Start ${esc(FL.course.title(targetLevel))}</a><a class="btn btn-sm" href="#/placement">Take the placement test</a></div>`}
            </div>

            <div class="card">
              <div class="card-head"><h3>Live lessons</h3><a class="btn btn-quiet btn-sm" href="#/book">${icon('plus')} Book</a></div>
              ${upcoming.length ? upcoming.map(b => lessonItem(b, false)).join('') : `<p class="muted mb-2">No live lessons booked.</p><a class="btn btn-sm" href="#/book${d.trialUsed ? '' : '?type=trial'}">${d.trialUsed ? 'Book a lesson' : 'Book your free trial'}</a>`}
              ${past.length ? `<h4 class="mt-3 mb-0 small muted" style="text-transform:uppercase;letter-spacing:.06em">Recent</h4>${past.map(b => lessonItem(b, true)).join('')}` : ''}
            </div>

            <div class="card">
              <div class="card-head"><h3>To do</h3><span class="small muted">${d.homework.filter(h => h.done).length} of ${d.homework.length} done</span></div>
              ${d.homework.map(h => `<div class="hw-item ${h.done ? 'done' : ''}"><input type="checkbox" data-hw="${h.id}" ${h.done ? 'checked' : ''} aria-label="Done: ${esc(h.text)}">
                <span class="hw-text">${esc(h.text)}</span>${h.link ? `<a class="btn btn-quiet btn-sm" href="${esc(h.link)}">Open</a>` : ''}${h.mine ? `<button type="button" class="icon-btn sm" data-hw-del="${h.id}" aria-label="Delete">${icon('trash')}</button>` : ''}</div>`).join('')}
              <form class="row mt-2" data-hw-add><input class="input" name="task" maxlength="140" placeholder="Add your own task" aria-label="New task"><button class="btn" type="submit">Add</button></form>
            </div>
          </div>

          <div class="stack">
            <div class="card">
              <div class="card-head"><h3>This week</h3><button type="button" class="btn btn-quiet btn-sm" data-onboard>Change goal</button></div>
              <p class="mb-1"><strong>${week} of ${goal}</strong> lessons completed in the last 7 days</p>
              <div class="goal-bar" aria-hidden="true">${Array.from({ length: goal }, (_, i) => `<i class="${i < week ? 'on' : ''}"></i>`).join('')}</div>
              <p class="small muted mt-2 mb-0">${week >= goal ? 'Goal reached — well done.' : `${goal - week} more to reach your weekly goal.`}</p>
            </div>
            <div class="card"><div class="card-head"><h3>Activity</h3>${streak ? `<span class="tag good">${streak}-day streak</span>` : ''}</div>${heatmap(d)}</div>
            <div class="card">
              <div class="card-head"><h3>Levels</h3><a class="btn btn-quiet btn-sm" href="#/placement">Test again</a></div>
              <table class="table"><tbody>${['en', 'fr'].map(l => `<tr><td>${FL.views.langName(l)}</td><td>${d.placement[l] ? `<strong>${esc(d.placement[l].level)}</strong> <span class="tiny muted">placement test</span>` : '<span class="muted">Not tested</span>'}</td></tr>`).join('')}</tbody></table>
            </div>
            <div class="card">
              <div class="card-head"><h3>Live lesson credits</h3></div>
              <p class="mb-2"><strong style="font-family:var(--serif);font-size:1.8rem">${d.credits}</strong> <span class="muted">available</span></p>
              <a class="btn btn-sm" href="#/pricing">Buy credits</a>
            </div>
          </div>
        </div>`;
    }

    el.addEventListener('click', async e => {
      const t = e.target;
      const ics = t.closest('[data-ics]');
      if (ics) { const b = FL.db.myBookings().find(x => x.id === ics.dataset.ics); if (b) FL.ui.download(`lesson-${FL.time.dayKey(b.start)}.ics`, FL.cal.ics(b), 'text/calendar'); return; }
      const rs = t.closest('[data-resched]'); if (rs) { FL.router.go('/book?reschedule=' + rs.dataset.resched); return; }
      const cn = t.closest('[data-cancel]');
      if (cn) {
        const b = FL.db.myBookings().find(x => x.id === cn.dataset.cancel);
        if (!b) return;
        const refundable = b.start - Date.now() >= FL.config.booking.cancelHours * 3600000;
        const ok = await FL.ui.confirm({ title: 'Cancel this lesson?', body: `${FL.time.fmtDateLong(b.start)} at ${FL.time.fmtTime(b.start)}.<br><br>${refundable ? (b.credits ? `Your ${FL.util.plural(b.credits, 'credit')} will be refunded.` : 'This lesson was free.') : `<strong>It starts in less than ${FL.config.booking.cancelHours} hours, so the credit can’t be refunded.</strong>`}`, confirmLabel: 'Cancel lesson', cancelLabel: 'Keep it', danger: true });
        if (!ok) return;
        const r = FL.schedule.cancel(b.id);
        if (r.ok) { FL.ui.toast(r.refunded ? `Lesson cancelled. ${FL.util.plural(r.refunded, 'credit')} refunded.` : 'Lesson cancelled.', 'success'); draw(); }
        return;
      }
      const hd = t.closest('[data-hw-del]'); if (hd) { FL.db.mutate(d => { d.homework = d.homework.filter(h => h.id !== hd.dataset.hwDel); }); draw(); return; }
      if (t.closest('[data-onboard]')) FL.pages.dashboard.onboard(draw);
    });
    el.addEventListener('change', e => {
      const cb = e.target.closest('[data-hw]');
      if (!cb) return;
      FL.db.mutate(d => { const h = d.homework.find(x => x.id === cb.dataset.hw); if (h) h.done = cb.checked; });
      cb.closest('.hw-item').classList.toggle('done', cb.checked);
      const d = FL.db.load();
      const c = cb.closest('.card').querySelector('.card-head .small');
      if (c) c.textContent = `${d.homework.filter(h => h.done).length} of ${d.homework.length} done`;
    });
    el.addEventListener('submit', e => {
      const f = e.target.closest('[data-hw-add]');
      if (!f) return;
      e.preventDefault();
      const text = f.task.value.trim();
      if (!text) return;
      FL.db.mutate(d => { d.homework.push({ id: FL.util.uid('hw_'), text: text.slice(0, 140), done: false, mine: true }); });
      draw();
      const i = el.querySelector('[data-hw-add] input'); if (i) i.focus();
    });

    draw();
    const timer = setInterval(() => { if (!document.querySelector('.modal-backdrop') && !el.contains(document.activeElement)) { FL.db.processCompletedLessons(); draw(); } }, 30000);
    if (!FL.db.load().profile.onboarded) setTimeout(() => { if (el.isConnected) FL.pages.dashboard.onboard(draw); }, 400);
    return () => clearInterval(timer);
  },

  onboard(done) {
    const { icon, esc } = FL.ui;
    const d = FL.db.load();
    const st = { step: 0, lang: d.profile.lang || 'en', level: d.profile.levels[d.profile.lang || 'en'] || '', goal: d.profile.weeklyLessons || 2 };
    const titles = ['Which language do you want to learn?', 'What is your level?', 'How many lessons per week?'];
    FL.ui.modal({
      bare: true,
      body: `<div class="modal-head"><h3 id="ob-t">Set up your learning</h3><button type="button" class="icon-btn" data-close aria-label="Close">${icon('x')}</button></div><div class="modal-body" id="ob"></div><div class="modal-foot" id="ob-foot"></div>`,
      onMount({ el, close }) {
        el.setAttribute('aria-labelledby', 'ob-t');
        const body = el.querySelector('#ob'), foot = el.querySelector('#ob-foot');
        const opt = (k, v, title, sub) => `<button type="button" class="option" role="radio" aria-checked="${String(st[k]) === String(v)}" data-k="${k}" data-v="${esc(v)}"><span><strong>${esc(title)}</strong>${sub ? `<small>${esc(sub)}</small>` : ''}</span></button>`;
        function render() {
          let html = `<p class="small muted mb-1">Step ${st.step + 1} of 3</p><h4 class="mb-2">${titles[st.step]}</h4><div class="option-list" role="radiogroup">`;
          if (st.step === 0) html += opt('lang', 'en', 'English', 'Courses A1 to B2') + opt('lang', 'fr', 'French', 'Courses A1 to B2, explained in English');
          if (st.step === 1) html += opt('level', '', 'I’m not sure', 'I’ll take the placement test') + FL.content[st.lang].levels.map(l => opt('level', l.code, `${l.code} — ${l.name}`, l.summary)).join('');
          if (st.step === 2) html += [[1, 'Light', 'About 20 minutes a week'], [2, 'Regular', 'About 45 minutes a week'], [3, 'Committed', 'About an hour a week'], [5, 'Intensive', 'Almost every day']].map(([v, t, s]) => opt('goal', v, `${v} lesson${v > 1 ? 's' : ''} · ${t}`, s)).join('');
          body.innerHTML = html + '</div>';
          foot.innerHTML = `${st.step ? `<button type="button" class="btn btn-quiet" data-back>Back</button>` : ''}<button type="button" class="btn btn-primary" data-next>${st.step === 2 ? 'Save' : 'Continue'}</button>`;
        }
        el.addEventListener('click', e => {
          const o = e.target.closest('.option');
          if (o) { st[o.dataset.k] = o.dataset.k === 'goal' ? +o.dataset.v : o.dataset.v; body.querySelectorAll('.option').forEach(x => x.setAttribute('aria-checked', String(x === o))); return; }
          if (e.target.closest('[data-back]')) { st.step--; render(); return; }
          if (e.target.closest('[data-next]')) {
            if (st.step < 2) { if (st.step === 0 && !FL.content[st.lang].levels.some(l => l.code === st.level)) st.level = ''; st.step++; render(); return; }
            FL.db.mutate(dd => { dd.profile.lang = st.lang; if (st.level) dd.profile.levels[st.lang] = st.level; dd.profile.weeklyLessons = st.goal; dd.profile.onboarded = true; });
            close();
            FL.ui.toast('Your learning settings are saved.', 'success');
            if (!st.level) setTimeout(() => FL.router.go('/placement'), 300);
            else done && done();
          }
        });
        render();
      },
      onClose() { if (!FL.db.load().profile.onboarded) FL.db.mutate(dd => { dd.profile.onboarded = true; }); }
    });
  }
};
