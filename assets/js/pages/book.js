/* ==========================================================================
   Fluentia — Booking: lesson type, focus, timezone-aware slot picker
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.book = {
  title: 'Book a lesson',
  render(params, query) {
    const { icon } = FL.ui;
    return `
    <section class="page-head" style="padding-bottom:20px"><div class="container">
      <div class="eyebrow">${icon('calendar')} Booking</div>
      <h1 id="book-title">${query.reschedule ? 'Reschedule your lesson' : 'Book a lesson'}</h1>
      <p>Live availability, shown in your own timezone. Free cancellation up to ${FL.config.booking.cancelHours} hours before.</p>
    </div></section>
    <section class="section" style="padding-top:0"><div class="container book-layout" id="book"></div></section>`;
  },
  mount(root, params, query) {
    const { icon, esc } = FL.ui;
    const cfg = FL.config;
    const el = root.querySelector('#book');
    const user = FL.auth.current();
    const d = user ? FL.db.load() : null;
    let reschedule = null;
    if (query.reschedule && user) {
      reschedule = FL.db.myBookings().find(b => b.id === query.reschedule && FL.db.bookingStatus(b) === 'upcoming') || null;
      if (!reschedule) FL.ui.toast('That lesson can no longer be rescheduled.', 'error');
    }
    let pending = null;
    try { pending = JSON.parse(sessionStorage.getItem('fluentia.pendingBooking') || 'null'); sessionStorage.removeItem('fluentia.pendingBooking'); } catch (e) { pending = null; }

    const trialUsed = d ? d.trialUsed : false;
    const state = {
      type: reschedule ? reschedule.type : (pending && pending.type) || (query.type && cfg.lessonTypes.some(t => t.id === query.type) ? query.type : 'standard'),
      course: reschedule ? (reschedule.courseId || '') : (pending && pending.course) || (query.course && FL.data.courses.some(c => c.id === query.course) ? query.course : (d && d.profile.activeCourse) || ''),
      note: reschedule ? reschedule.note : (pending && pending.note) || '',
      day: null, start: (pending && pending.start) || null, slots: []
    };
    if (state.type === 'trial' && trialUsed && !reschedule) state.type = 'standard';

    function tz() { return FL.time.userTz(); }

    function computeSlots() {
      state.slots = FL.schedule.slots(state.type, { excludeId: reschedule ? reschedule.id : null });
      const byDay = {};
      state.slots.forEach(s => { const k = FL.time.dayKey(s.start, tz()); (byDay[k] = byDay[k] || []).push(s); });
      state.byDay = byDay;
      if (state.start && !state.slots.some(s => s.start === state.start)) state.start = null;
      if (state.start) state.day = FL.time.dayKey(state.start, tz());
      if (!state.day || !byDay[state.day]) state.day = Object.keys(byDay).sort()[0] || null;
    }

    function shell() {
      el.innerHTML = `
        <div class="stack">
          ${reschedule ? `<div class="notice warn">${icon('repeat')}<div>You’re moving your <strong>${esc(FL.schedule.lessonType(reschedule.type).name.toLowerCase())}</strong> on <strong>${FL.time.fmtDate(reschedule.start)} at ${FL.time.fmtTime(reschedule.start)}</strong>. No extra credits will be used.</div></div>` : ''}
          <div class="card">
            <div class="step-title"><span class="num">1</span><h3>Choose a lesson type</h3></div>
            <div class="type-grid" role="radiogroup" aria-label="Lesson type" id="types"></div>
          </div>
          <div class="card">
            <div class="step-title"><span class="num">2</span><h3>What would you like to focus on?</h3></div>
            <div class="grid grid-2" style="gap:14px">
              <div class="field mb-0"><label for="b-course">Course</label>
                <select id="b-course" class="select"><option value="">General / not sure yet</option>
                  <optgroup label="English">${FL.data.courses.filter(c => c.lang === 'en').map(c => `<option value="${c.id}">${esc(c.title)}</option>`).join('')}</optgroup>
                  <optgroup label="French">${FL.data.courses.filter(c => c.lang === 'fr').map(c => `<option value="${c.id}">${esc(c.title)}</option>`).join('')}</optgroup>
                </select></div>
              <div class="field mb-0"><label for="b-note">Notes for your teacher <span class="muted">(optional)</span></label>
                <textarea id="b-note" class="textarea" style="min-height:46px" maxlength="500" placeholder="e.g. Job interview next week, I want to practise answers"></textarea></div>
            </div>
          </div>
          <div class="card">
            <div class="step-title"><span class="num">3</span><h3>Pick a time</h3></div>
            <div class="tz-bar">${icon('globe')}<span>Times shown in</span>
              <select class="select select-sm" id="b-tz" aria-label="Your timezone"></select>
              <span class="muted tiny" id="tz-teacher"></span></div>
            <div class="days-strip" id="days" role="group" aria-label="Choose a day"></div>
            <div id="slots" class="mt-1"></div>
          </div>
        </div>
        <aside class="sticky-card"><div class="card" id="summary"></div></aside>`;
      el.querySelector('#b-course').value = state.course;
      el.querySelector('#b-note').value = state.note;
      const sel = el.querySelector('#b-tz');
      const cur = tz();
      sel.innerHTML = FL.time.tzList().map(z => `<option value="${esc(z)}" ${z === cur ? 'selected' : ''}>${esc(z.replace(/_/g, ' '))}</option>`).join('');
      el.querySelector('#b-course').addEventListener('change', e => { state.course = e.target.value; renderSummary(); });
      el.querySelector('#b-note').addEventListener('input', e => { state.note = e.target.value; });
      sel.addEventListener('change', e => {
        const z = e.target.value;
        if (FL.auth.current()) FL.db.mutate(dd => { dd.profile.timezone = z; }); else FL.prefs.set({ timezone: z });
        computeSlots(); renderDays(); renderSlots(); renderSummary(); renderTzNote();
        FL.ui.toast(`Timezone set to ${z.replace(/_/g, ' ')}.`, 'success', 2200);
      });
      el.addEventListener('click', onClick);
    }

    function renderTzNote() {
      const t = cfg.teacher.timezone;
      el.querySelector('#tz-teacher').textContent = tz() === t ? `(same as your teacher)` : `${FL.time.tzOffsetLabel(tz())} · teacher is in ${t.split('/').pop().replace(/_/g, ' ')} (${FL.time.tzOffsetLabel(t)})`;
    }

    function renderTypes() {
      el.querySelector('#types').innerHTML = cfg.lessonTypes.map(t => {
        const disabled = (reschedule && t.id !== reschedule.type) || (t.once && trialUsed && !reschedule);
        return `<button class="type-card" role="radio" aria-checked="${state.type === t.id}" data-type="${t.id}" ${disabled ? 'disabled' : ''}>
          <div class="t-head"><strong>${esc(t.name)}</strong>${t.credits === 0 ? '<span class="badge badge-success">Free</span>' : `<span class="badge badge-primary">${FL.util.plural(t.credits, 'credit')}</span>`}</div>
          <span class="small" style="font-weight:600">${icon('clock', '')} ${t.minutes} minutes</span>
          <small>${t.once && trialUsed && !reschedule ? 'You’ve already used your free trial.' : esc(t.desc)}</small></button>`;
      }).join('');
    }

    function renderDays() {
      const keys = [];
      const today = FL.time.dayKey(Date.now(), tz());
      for (let i = 0; i < cfg.booking.windowDays + 1; i++) keys.push(FL.time.addDaysKey(today, i));
      el.querySelector('#days').innerHTML = keys.map(k => {
        const n = (state.byDay[k] || []).length;
        const [y, m, dd] = k.split('-').map(Number);
        const date = new Date(Date.UTC(y, m - 1, dd, 12));
        const dow = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' }).format(date);
        const mon = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' }).format(date);
        return `<button class="day-btn" data-day="${k}" aria-pressed="${state.day === k}" ${n ? '' : 'disabled'} aria-label="${dow} ${dd} ${mon}, ${n} slots">
          <div class="dow">${k === today ? 'Today' : dow}</div><div class="dnum">${dd}</div><div class="cnt">${n ? `${n} slot${n > 1 ? 's' : ''}` : mon}</div></button>`;
      }).join('');
      const act = el.querySelector('.day-btn[aria-pressed="true"]');
      if (act) act.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    function renderSlots() {
      const box = el.querySelector('#slots');
      const list = state.day ? state.byDay[state.day] || [] : [];
      if (!list.length) {
        box.innerHTML = `<div class="empty">${icon('calendar')}<p class="mb-0">No free slots ${state.day ? 'on this day' : 'in the next few weeks'} for this lesson length. Try another day or a shorter lesson.</p></div>`;
        return;
      }
      const groups = [['Morning', 'sun', h => h < 12], ['Afternoon', 'clock', h => h >= 12 && h < 17], ['Evening', 'moon', h => h >= 17]];
      box.innerHTML = `<div class="slot-groups">${groups.map(([name, ic, fn]) => {
        const g = list.filter(s => fn(FL.time.parts(s.start, tz()).hh));
        if (!g.length) return '';
        return `<div class="slot-group"><h4>${icon(ic)} ${name}</h4><div class="slots">${g.map(s => `<button class="slot" data-start="${s.start}" aria-pressed="${state.start === s.start}" title="Teacher time: ${FL.time.fmtTime(s.start, cfg.teacher.timezone)}">${FL.time.fmtTime(s.start, tz())}</button>`).join('')}</div></div>`;
      }).join('')}</div>
      <p class="tiny muted mt-2">${icon('info', '')} Hover a time to see it in your teacher’s timezone.</p>`;
    }

    function renderSummary() {
      const t = FL.schedule.lessonType(state.type);
      const u = FL.auth.current();
      const dd = u ? FL.db.load() : null;
      const course = FL.data.courses.find(c => c.id === state.course);
      const cost = reschedule ? 0 : t.credits;
      const s = state.start;
      const short = u && dd.credits < cost;
      el.querySelector('#summary').innerHTML = `
        <div class="row mb-2"><span class="avatar" style="width:46px;height:46px"><img src="${esc(cfg.teacher.photo)}" alt=""></span>
          <div><strong>${esc(cfg.teacher.name)}</strong><div class="tiny muted">${esc(cfg.teacher.title)}</div></div></div>
        <div class="summary-row"><span>Lesson</span><span>${esc(t.name)} · ${t.minutes} min</span></div>
        <div class="summary-row"><span>Focus</span><span>${course ? esc(course.title) : 'General'}</span></div>
        <div class="summary-row"><span>Date</span><span>${s ? FL.time.fmtDateLong(s, tz()) : '—'}</span></div>
        <div class="summary-row"><span>Your time</span><span>${s ? `${FL.time.fmtTime(s, tz())} – ${FL.time.fmtTime(s + t.minutes * 60000, tz())}` : '—'}</span></div>
        ${s && tz() !== cfg.teacher.timezone ? `<div class="summary-row"><span>Teacher’s time</span><span>${FL.time.fmtTime(s, cfg.teacher.timezone)} (${esc(cfg.teacher.timezone.split('/').pop().replace(/_/g, ' '))})</span></div>` : ''}
        <div class="summary-row"><span>Cost</span><span>${cost === 0 ? (reschedule ? 'No charge' : 'Free') : FL.util.plural(cost, 'credit')}</span></div>
        ${u ? `<div class="summary-row"><span>Your balance</span><span>${FL.util.plural(dd.credits, 'credit')}</span></div>` : ''}
        <button class="btn btn-primary btn-block btn-lg mt-2" data-confirm ${s ? '' : 'disabled'}>${icon(u ? 'check' : 'user')} ${!s ? 'Select a time' : !u ? 'Sign in to confirm' : short ? 'Get credits & book' : reschedule ? 'Confirm new time' : 'Confirm booking'}</button>
        <p class="tiny muted center mt-1 mb-0">${short ? `You need ${FL.util.plural(cost - dd.credits, 'more credit')}.` : `Free cancellation until ${cfg.booking.cancelHours}h before.`}</p>`;
    }

    function onClick(e) {
      const tb = e.target.closest('[data-type]');
      if (tb && !tb.disabled) {
        state.type = tb.dataset.type;
        computeSlots(); renderTypes(); renderDays(); renderSlots(); renderSummary();
        return;
      }
      const db = e.target.closest('[data-day]');
      if (db && !db.disabled) {
        state.day = db.dataset.day;
        el.querySelectorAll('[data-day]').forEach(b => b.setAttribute('aria-pressed', String(b === db)));
        renderSlots();
        return;
      }
      const sb = e.target.closest('[data-start]');
      if (sb) {
        state.start = +sb.dataset.start;
        el.querySelectorAll('[data-start]').forEach(b => b.setAttribute('aria-pressed', String(b === sb)));
        renderSummary();
        if (window.innerWidth < 960) el.querySelector('#summary').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      if (e.target.closest('[data-confirm]')) confirmBooking();
    }

    function confirmBooking() {
      if (!state.start) return;
      if (!FL.auth.current()) {
        try { sessionStorage.setItem('fluentia.pendingBooking', JSON.stringify({ type: state.type, course: state.course, note: state.note, start: state.start })); } catch (e) { /* ignore */ }
        FL.ui.toast('Create a free account (or sign in) to confirm — your selection is saved.', 'info', 4500);
        FL.router.go('/register?next=' + encodeURIComponent('/book'));
        return;
      }
      const res = FL.schedule.book({ start: state.start, typeId: state.type, courseId: state.course, note: state.note, rescheduleId: reschedule ? reschedule.id : null });
      if (!res.ok) {
        if (res.error === 'not-enough-credits') {
          FL.ui.modal({
            title: 'You need more credits',
            body: `<p>This lesson costs ${FL.util.plural(FL.schedule.lessonType(state.type).credits, 'credit')} and you need ${FL.util.plural(res.need, 'more credit')}.</p><div class="notice">${icon('sparkles')}<div>Tip: the 10-lesson pack saves you 15%.</div></div>`,
            actions: [{ label: 'Not now', className: 'btn-ghost' }, { label: 'See packages', className: 'btn-primary', onClick() { try { sessionStorage.setItem('fluentia.pendingBooking', JSON.stringify({ type: state.type, course: state.course, note: state.note, start: state.start })); } catch (e) { /* ignore */ } FL.router.go('/pricing'); } }]
          });
        } else {
          FL.ui.toast(res.error, 'error');
          computeSlots(); renderDays(); renderSlots(); renderSummary();
        }
        return;
      }
      success(res.booking);
    }

    function success(b) {
      const t = FL.schedule.lessonType(b.type);
      FL.ui.modal({
        title: reschedule ? 'Lesson rescheduled!' : 'Lesson booked! 🎉',
        body: `
          <div class="notice ok mb-2">${icon('check-circle')}<div><strong>${esc(t.name)}</strong> on <strong>${FL.time.fmtDateLong(b.start)}</strong> at <strong>${FL.time.fmtTime(b.start)}</strong> (${esc(tz().replace(/_/g, ' '))}).</div></div>
          <p class="small muted">Add it to your calendar so you get a reminder. You can join the call and open your virtual classroom from your dashboard.</p>
          <div class="row row-wrap">
            <button class="btn btn-sm" data-ics>${icon('download')} Apple / Outlook (.ics)</button>
            <a class="btn btn-sm" href="${esc(FL.cal.google(b))}" target="_blank" rel="noopener">${icon('external')} Google Calendar</a>
          </div>`,
        actions: [
          { label: 'Open classroom', className: 'btn-ghost', onClick() { FL.router.go('/classroom/' + b.id); } },
          { label: 'Go to dashboard', className: 'btn-primary', onClick() { FL.router.go('/dashboard'); } }
        ],
        onMount({ el: m }) { m.querySelector('[data-ics]').addEventListener('click', () => FL.ui.download(`lesson-${FL.time.dayKey(b.start)}.ics`, FL.cal.ics(b), 'text/calendar')); },
        onClose(v) { if (v === undefined && location.hash.startsWith('#/book')) FL.router.go('/dashboard'); }
      });
    }

    shell();
    computeSlots();
    renderTypes(); renderTzNote(); renderDays(); renderSlots(); renderSummary();
    if (pending && state.start) FL.ui.toast('Your selected time has been restored.', 'success');
    const off = FL.bus.on('data', () => { if (el.isConnected) renderSummary(); });
    return off;
  }
};
