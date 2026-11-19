/* ==========================================================================
   Fluentia — Student dashboard + onboarding wizard
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.dashboard = {
  title: 'Dashboard',
  auth: true,
  render() { return `<section class="section" style="padding-top:40px"><div class="container" id="dash"></div></section>`; },
  mount(root) {
    const { icon, esc } = FL.ui;
    const el = root.querySelector('#dash');
    const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    FL.db.processCompletedLessons();

    function skillPct(v) { return Math.min(100, Math.round(100 * Math.log10(1 + v) / Math.log10(201))); }

    function lessonItem(b, mode) {
      const t = FL.schedule.lessonType(b.type);
      const c = FL.data.courses.find(x => x.id === b.courseId);
      const st = FL.db.bookingStatus(b);
      const now = Date.now();
      const canJoin = now >= b.start - FL.config.booking.joinEarlyMinutes * 60000 && now < b.end;
      const mon = FL.time.fmt(b.start, { month: 'short' });
      const day = FL.time.fmt(b.start, { day: 'numeric' });
      return `<div class="lesson-item">
        <div class="date-tile"><div class="m">${mon}</div><div class="d">${day}</div></div>
        <div class="li-body">
          <strong>${esc(t.name)}${c ? ` · ${esc(c.title)}` : ''}</strong>
          <div class="small muted">${FL.time.fmt(b.start, { weekday: 'long' })}, ${FL.time.fmtTime(b.start)} – ${FL.time.fmtTime(b.end)}
            ${mode === 'upcoming' ? ` · <span class="${st === 'live' ? '' : ''}">${st === 'live' ? '<span class="badge badge-danger">Live now</span>' : FL.time.relative(b.start)}</span>` : ''}</div>
          ${b.note && mode === 'upcoming' ? `<div class="tiny muted mt-1">“${esc(b.note)}”</div>` : ''}
        </div>
        <div class="li-actions">
          ${mode === 'upcoming' ? `
            ${canJoin ? `<a class="btn btn-primary btn-sm" href="${esc(FL.config.teacher.meetingLink)}" target="_blank" rel="noopener">${icon('video')} Join call</a>` : ''}
            <a class="btn btn-sm ${canJoin ? '' : 'btn-soft'}" href="#/classroom/${b.id}">${icon('pen')} Classroom</a>
            <button class="icon-btn" data-ics="${b.id}" title="Add to calendar" aria-label="Add to calendar">${icon('download')}</button>
            ${st === 'upcoming' ? `<button class="icon-btn" data-resched="${b.id}" title="Reschedule" aria-label="Reschedule">${icon('repeat')}</button>
            <button class="icon-btn" data-cancel="${b.id}" title="Cancel lesson" aria-label="Cancel lesson">${icon('x')}</button>` : ''}`
          : `<a class="btn btn-sm btn-ghost" href="#/classroom/${b.id}">${icon('book')} Notes</a>`}
        </div>
      </div>`;
    }

    function heatmap(d) {
      const today = FL.time.localKey();
      const wdToday = (FL.time.weekdayOfKey(today) + 6) % 7; // Mon=0
      const start = FL.time.addDaysKey(today, -(16 * 7 + wdToday));
      let cells = '';
      for (let i = 0; i < 17 * 7; i++) {
        const k = FL.time.addDaysKey(start, i);
        const v = d.activity[k] || 0;
        const l = v === 0 ? 0 : v <= 20 ? 1 : v <= 50 ? 2 : v <= 90 ? 3 : 4;
        cells += `<i data-l="${l}" class="${k > today ? 'future' : ''}" title="${k}: ${v} XP"></i>`;
      }
      const activeDays = Object.keys(d.activity).filter(k => k >= start).length;
      return `<div class="heatmap" role="img" aria-label="Activity over the last 17 weeks: ${activeDays} active days">${cells}</div>
        <div class="heat-legend">Less <i style="background:var(--surface-3)"></i><i style="background:color-mix(in srgb,var(--primary) 30%,var(--surface-3))"></i><i style="background:color-mix(in srgb,var(--primary) 55%,var(--surface-3))"></i><i style="background:color-mix(in srgb,var(--primary) 78%,var(--surface-3))"></i><i style="background:var(--primary)"></i> More</div>
        <p class="tiny muted mb-0 mt-1">${activeDays} active days in the last 17 weeks</p>`;
    }

    function planCard(d) {
      const plan = d.profile.plan;
      if (!plan) return `<div class="card"><div class="card-title"><h3>${icon('sparkles')} Your learning plan</h3></div>
        <p class="muted">Answer 4 quick questions and get a weekly plan built around your goal and schedule.</p>
        <button class="btn btn-primary" data-onboard>${icon('sparkles')} Create my plan</button></div>`;
      const todayWd = new Date().getDay();
      const goal = FL.data.GOALS.find(g => g.id === plan.goal);
      return `<div class="card">
        <div class="card-title"><h3>${icon('sparkles')} Your weekly plan</h3><button class="btn btn-ghost btn-sm" data-onboard>${icon('settings')} Adjust</button></div>
        <div class="row row-wrap mb-2" style="gap:8px">
          ${FL.views.langBadge(plan.lang)}<span class="chip">${icon('target')} ${esc(goal ? goal.label : plan.goal)}</span>
          <span class="chip">${icon('video')} ${FL.util.plural(plan.lessonsPerWeek, 'lesson')} / week</span>
          <span class="chip">${icon('zap')} ${plan.weeklyXp} XP goal</span>
        </div>
        <div class="plan-week">${plan.days.map(day => `
          <div class="plan-day ${day.wd === todayWd ? 'today' : ''}"><span class="pd-name">${WD[day.wd]}</span>
            ${day.tasks.map(t => `<span class="pd-task" style="${t.k === 'lesson' ? 'background:var(--primary);color:var(--on-primary);font-weight:600' : ''}">${esc(t.t)}</span>`).join('')}</div>`).join('')}
        </div></div>`;
    }

    function draw() {
      const user = FL.auth.current();
      if (!user) return;
      const d = FL.db.load();
      const lang = d.profile.targetLang;
      const lvl = d.profile.level[lang];
      const streak = FL.game.streak(d);
      const xpL = FL.game.level(d.xp);
      const week = FL.game.weekXp(d);
      const goalXp = d.profile.plan ? d.profile.plan.weeklyXp : d.profile.weeklyGoal;
      const mine = FL.db.myBookings();
      const upcoming = mine.filter(b => ['upcoming', 'live'].includes(FL.db.bookingStatus(b)));
      const past = mine.filter(b => FL.db.bookingStatus(b) === 'completed').reverse();
      const skills = ['speaking', 'listening', 'vocabulary', 'grammar', 'writing'];
      const todayKey = FL.time.localKey();
      const dueCards = ['my-words', ...FL.data.decks.map(x => x.id)].reduce((s, id) => s + FL.srs.deckStats(id, d).due, 0);
      const dailyDone = !!d.daily[`${todayKey}:${lang}`];

      el.innerHTML = `
        <div class="dash-head">
          <div><div class="small muted">${FL.time.fmtDateLong(Date.now())}</div>
            <h1>${FL.time.greeting()}, ${esc(FL.util.firstName(user.name))} 👋</h1></div>
          <div class="row row-wrap">
            <a class="btn" href="#/practice">${icon('layers')} Practise${dueCards ? ` <span class="badge badge-accent">${dueCards} due</span>` : ''}</a>
            <a class="btn btn-primary" href="#/book">${icon('calendar')} Book a lesson</a>
          </div>
        </div>

        <div class="stat-cards">
          <a class="card stat card-hover" href="#/placement" style="color:inherit;text-decoration:none"><div class="icon-tile">${icon('target')}</div><div><div class="val">${lvl ? esc(lvl) : 'Test'}</div><div class="lbl">${FL.views.langName(lang)} level${lvl ? '' : ' — find out'}</div></div></a>
          <div class="card stat"><div class="icon-tile accent">${icon('flame')}</div><div><div class="val">${streak}</div><div class="lbl">day streak${streak && !d.activity[todayKey] ? ' · practise today!' : ''}</div></div></div>
          <div class="card stat"><div class="icon-tile warning">${icon('zap')}</div><div style="flex:1;min-width:0"><div class="val">${d.xp.toLocaleString()}</div><div class="lbl">XP · level ${xpL.lvl}</div><div class="progress mt-1" style="height:5px"><span style="width:${xpL.pct}%"></span></div></div></div>
          <a class="card stat card-hover" href="#/pricing" style="color:inherit;text-decoration:none"><div class="icon-tile success">${icon('card')}</div><div><div class="val">${d.credits}</div><div class="lbl">lesson credit${d.credits === 1 ? '' : 's'} · top up</div></div></a>
        </div>

        <div class="dash-grid">
          <div class="dash-col">
            <div class="card">
              <div class="card-title"><h3>${icon('calendar')} Upcoming lessons</h3><a class="btn btn-ghost btn-sm" href="#/book">${icon('plus')} New</a></div>
              ${upcoming.length ? upcoming.map(b => lessonItem(b, 'upcoming')).join('') : `
                <div class="empty">${icon('calendar')}<p><strong>No lessons booked yet.</strong><br>${d.trialUsed ? 'Pick a time that suits you.' : 'Your free 25-minute trial is waiting.'}</p>
                <a class="btn btn-primary btn-sm" href="#/book${d.trialUsed ? '' : '?type=trial'}">${d.trialUsed ? 'Book a lesson' : 'Book free trial'}</a></div>`}
            </div>

            ${planCard(d)}

            <div class="card">
              <div class="card-title"><h3>${icon('check-circle')} Homework & tasks</h3><span class="small muted">${d.homework.filter(h => h.done).length}/${d.homework.length} done</span></div>
              ${d.homework.length ? d.homework.map(h => `
                <div class="hw-item ${h.done ? 'done' : ''}">
                  <input type="checkbox" data-hw="${h.id}" ${h.done ? 'checked' : ''} aria-label="Mark as done: ${esc(h.text)}">
                  <span class="hw-text">${esc(h.text)}${h.mine ? ' <span class="badge" style="font-size:.68rem">personal</span>' : ''}</span>
                  ${h.link ? `<a class="btn btn-ghost btn-sm" href="${esc(h.link)}">Open</a>` : ''}
                  ${h.mine ? `<button class="icon-btn" data-hw-del="${h.id}" aria-label="Delete task">${icon('trash')}</button>` : ''}
                </div>`).join('') : '<p class="muted">Nothing here yet — your teacher will add homework after lessons.</p>'}
              <form class="row mt-2" data-hw-add><input class="input" name="task" maxlength="140" placeholder="Add a personal task…" aria-label="New personal task"><button class="btn" type="submit">${icon('plus')} Add</button></form>
            </div>

            <div class="card">
              <div class="card-title"><h3>${icon('book')} Lesson history</h3><span class="small muted">${FL.util.plural(past.length, 'lesson')} completed</span></div>
              ${past.length ? past.slice(0, 5).map(b => lessonItem(b, 'past')).join('') : '<p class="muted mb-0">Completed lessons and their notes will appear here.</p>'}
            </div>
          </div>

          <div class="dash-col">
            <div class="card">
              <div class="card-title"><h3>${icon('target')} Weekly goal</h3><span class="tiny muted">last 7 days</span></div>
              <div class="ring-wrap">${FL.ui.ring(Math.round(week / goalXp * 100), `${Math.min(999, Math.round(week / goalXp * 100))}%`, `${week} / ${goalXp} XP`)}
                <div class="small"><p class="mb-1"><strong>${week >= goalXp ? 'Goal reached! 🎉' : `${goalXp - week} XP to go`}</strong></p>
                <p class="muted mb-1">${dailyDone ? '✅ Daily challenge done' : '<a href="#/practice?tab=daily">Daily challenge</a> · up to +50 XP'}</p>
                <p class="muted mb-0">${dueCards ? `<a href="#/practice?tab=cards">${dueCards} flashcards due</a>` : 'No flashcards due — nice!'}</p></div></div>
            </div>
            <div class="card">
              <div class="card-title"><h3>${icon('chart')} Skills</h3></div>
              ${FL.ui.radar(skills.map(s => skillPct(d.skills[s] || 0)), ['Speaking', 'Listening', 'Vocabulary', 'Grammar', 'Writing'])}
              <p class="tiny muted center mb-0">Grows as you practise: pronunciation → speaking, flashcards → vocabulary, quizzes → grammar.</p>
            </div>
            <div class="card"><div class="card-title"><h3>${icon('flame')} Activity</h3></div>${heatmap(d)}</div>
            <div class="card">
              <div class="card-title"><h3>${icon('trophy')} Badges</h3><span class="small muted">${d.badges.length}/${FL.data.badges.length}</span></div>
              <div class="badges-grid">${FL.data.badges.map(b => `<div class="badge-item ${d.badges.includes(b.id) ? 'on' : ''}" title="${esc(b.name)} — ${esc(b.desc)}" role="img" aria-label="${esc(b.name)}: ${esc(b.desc)}${d.badges.includes(b.id) ? ' (unlocked)' : ' (locked)'}">${b.icon}</div>`).join('')}</div>
            </div>
            <div class="card">${FL.views.wordOfDay(lang)}</div>
          </div>
        </div>`;
    }

    async function onClick(e) {
      const t = e.target;
      const ics = t.closest('[data-ics]');
      if (ics) { const b = FL.db.myBookings().find(x => x.id === ics.dataset.ics); if (b) FL.ui.download(`lesson-${FL.time.dayKey(b.start)}.ics`, FL.cal.ics(b), 'text/calendar'); return; }
      const rs = t.closest('[data-resched]');
      if (rs) { FL.router.go('/book?reschedule=' + rs.dataset.resched); return; }
      const cn = t.closest('[data-cancel]');
      if (cn) {
        const b = FL.db.myBookings().find(x => x.id === cn.dataset.cancel);
        if (!b) return;
        const refundable = b.start - Date.now() >= FL.config.booking.cancelHours * 3600000;
        const ok = await FL.ui.confirm({
          title: 'Cancel this lesson?',
          body: `${FL.time.fmtDateLong(b.start)} at ${FL.time.fmtTime(b.start)}.<br><br>${refundable ? (b.credits ? `Your ${FL.util.plural(b.credits, 'credit')} will be refunded.` : 'This lesson was free.') : `<strong>This lesson starts in less than ${FL.config.booking.cancelHours} hours, so the credit can’t be refunded.</strong>`}`,
          confirmLabel: 'Cancel lesson', cancelLabel: 'Keep it', danger: true
        });
        if (!ok) return;
        const r = FL.schedule.cancel(b.id);
        if (r.ok) { FL.ui.toast(r.refunded ? `Lesson cancelled — ${FL.util.plural(r.refunded, 'credit')} refunded.` : 'Lesson cancelled.', 'success'); draw(); }
        return;
      }
      const hd = t.closest('[data-hw-del]');
      if (hd) { FL.db.mutate(d => { d.homework = d.homework.filter(h => h.id !== hd.dataset.hwDel); }); draw(); return; }
      if (t.closest('[data-onboard]')) { FL.pages.dashboard.onboard(draw); return; }
    }

    el.addEventListener('click', onClick);
    el.addEventListener('change', e => {
      const cb = e.target.closest('[data-hw]');
      if (!cb) return;
      let reward = false;
      FL.db.mutate(d => {
        const h = d.homework.find(x => x.id === cb.dataset.hw);
        if (!h) return;
        h.done = cb.checked;
        if (h.done && !h.rewarded) { h.rewarded = true; reward = true; }
      });
      if (reward) FL.game.award(10, { skill: 'writing' });
      cb.closest('.hw-item').classList.toggle('done', cb.checked);
      const counter = cb.closest('.card').querySelector('.card-title .small');
      const d = FL.db.load();
      if (counter) counter.textContent = `${d.homework.filter(h => h.done).length}/${d.homework.length} done`;
    });
    el.addEventListener('submit', e => {
      const f = e.target.closest('[data-hw-add]');
      if (!f) return;
      e.preventDefault();
      const text = f.task.value.trim();
      if (!text) return;
      FL.db.mutate(d => { d.homework.push({ id: FL.util.uid('hw_'), text: text.slice(0, 140), done: false, mine: true }); });
      draw();
      const input = el.querySelector('[data-hw-add] input');
      if (input) input.focus();
    });
    el.addEventListener('click', e => { if (e.target.closest('[data-say]')) { const b = e.target.closest('[data-say]'); FL.speech.speak(b.dataset.say, b.dataset.lang); } });

    draw();
    // Live-update "starts in" / join buttons every 30 s.
    const timer = setInterval(() => { if (!document.querySelector('.modal-backdrop') && !el.contains(document.activeElement)) { FL.db.processCompletedLessons(); draw(); } }, 30000);
    if (!FL.db.load().profile.onboarded) setTimeout(() => { if (el.isConnected) FL.pages.dashboard.onboard(draw); }, 450);
    return () => clearInterval(timer);
  },

  onboard(done) {
    const { icon, esc } = FL.ui;
    const d = FL.db.load();
    const st = { step: 0, lang: d.profile.targetLang || 'en', goal: d.profile.goal || 'conversation', level: d.profile.level[d.profile.targetLang] || '', hours: d.profile.hoursPerWeek || 2 };
    const steps = ['Language', 'Goal', 'Level', 'Time'];
    FL.ui.modal({
      bare: true, wide: true,
      body: `<div class="modal-head"><h3 id="ob-title">Let’s build your learning plan</h3><button class="icon-btn" data-close aria-label="Close">${icon('x')}</button></div><div class="modal-body" id="ob"></div><div class="modal-foot" id="ob-foot"></div>`,
      onMount({ el, close }) {
        const body = el.querySelector('#ob'), foot = el.querySelector('#ob-foot');
        el.setAttribute('aria-labelledby', 'ob-title');
        function opt(attr, val, cur, title, sub, ic) {
          return `<button class="option-card" role="radio" aria-checked="${cur === val}" data-${attr}="${esc(val)}">${ic ? `<span class="icon-tile">${icon(ic)}</span>` : ''}<span class="oc-body"><strong>${esc(title)}</strong>${sub ? `<small>${esc(sub)}</small>` : ''}</span></button>`;
        }
        function render() {
          const prog = `<div class="row mb-2" style="gap:6px">${steps.map((s, i) => `<div style="flex:1"><div class="progress" style="height:5px"><span style="width:${i <= st.step ? 100 : 0}%"></span></div><div class="tiny ${i === st.step ? '' : 'muted'} mt-1">${s}</div></div>`).join('')}</div>`;
          let html = '';
          if (st.step === 0) html = `<h4>Which language do you want to learn?</h4><div class="option-cards" role="radiogroup">${opt('lang', 'en', st.lang, 'English', 'General, business, IELTS, kids & teens', 'globe')}${opt('lang', 'fr', st.lang, 'French', 'From zero, conversation, DELF/DALF', 'globe')}</div>`;
          if (st.step === 1) html = `<h4>What’s your main goal?</h4><div class="option-cards grid grid-2" role="radiogroup">${FL.data.GOALS.map(g => opt('goal', g.id, st.goal, g.label, '', g.icon)).join('')}</div>`;
          if (st.step === 2) html = `<h4>What’s your current level?</h4><div class="option-cards grid grid-2" role="radiogroup">
            ${opt('level', '', st.level, 'I’m not sure', 'Take the 5-min placement test later', 'target')}
            ${FL.data.LEVELS.slice(0, 5).map(l => opt('level', l, st.level, `${l} — ${FL.data.LEVEL_INFO[l].name}`, FL.data.LEVEL_INFO[l].can[0])).join('')}</div>`;
          if (st.step === 3) html = `<h4>How much time can you study each week?</h4><div class="option-cards grid grid-2" role="radiogroup">
            ${[[1, '1 hour', 'Light — 1 lesson a week'], [2, '2 hours', 'Steady — 2 lessons a week'], [3, '3 hours', 'Committed — 2 lessons + practice'], [5, '5+ hours', 'Intensive — 3 lessons a week']].map(([v, t, s]) => opt('hours', String(v), String(st.hours), t, s, 'clock')).join('')}</div>`;
          body.innerHTML = prog + html;
          foot.innerHTML = `${st.step > 0 ? `<button class="btn btn-ghost" data-back>${icon('arrow-left')} Back</button>` : ''}<button class="btn btn-primary" data-next>${st.step === 3 ? `${icon('sparkles')} Create my plan` : `Continue ${icon('arrow-right')}`}</button>`;
          const first = body.querySelector('[aria-checked="true"]') || body.querySelector('.option-card');
          if (first) first.focus();
        }
        el.addEventListener('click', e => {
          const o = e.target.closest('.option-card');
          if (o) {
            ['lang', 'goal', 'level', 'hours'].forEach(k => { if (o.dataset[k] !== undefined) st[k] = k === 'hours' ? +o.dataset[k] : o.dataset[k]; });
            body.querySelectorAll('.option-card').forEach(x => x.setAttribute('aria-checked', String(x === o)));
            return;
          }
          if (e.target.closest('[data-back]')) { st.step--; render(); return; }
          if (e.target.closest('[data-next]')) {
            if (st.step < 3) { st.step++; render(); return; }
            const plan = FL.plan.generate({ goal: st.goal, hoursPerWeek: st.hours, targetLang: st.lang });
            FL.db.mutate(dd => {
              dd.profile.targetLang = st.lang; dd.profile.goal = st.goal; dd.profile.hoursPerWeek = st.hours;
              if (st.level) dd.profile.level[st.lang] = st.level;
              dd.profile.plan = plan; dd.profile.weeklyGoal = plan.weeklyXp; dd.profile.onboarded = true;
            });
            close();
            FL.ui.toast('Your personal weekly plan is ready!', 'success');
            if (!st.level) setTimeout(() => FL.ui.toast('Tip: take the placement test to set your level.', 'info', 4000), 600);
            done && done();
          }
        });
        render();
      },
      onClose() {
        if (!FL.db.load().profile.onboarded) FL.db.mutate(dd => { dd.profile.onboarded = true; });
      }
    });
  }
};
