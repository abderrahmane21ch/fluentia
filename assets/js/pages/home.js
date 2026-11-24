/* ==========================================================================
   Fluentia — home, about, pricing, 404 and shared views
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};
FL.views = FL.views || {};

/* ------------------------------------------------------------ Shared views */
FL.views.pricing = function () {
  const { icon, esc } = FL.ui;
  return `<div class="price-grid">${FL.config.plans.map(p => `
    <div class="card plan ${p.featured ? 'featured' : ''}">
      ${p.ribbon ? `<span class="ribbon">${esc(p.ribbon)}</span>` : ''}
      <h3>${esc(p.name)}</h3>
      <div><div class="price">${p.priceUSD === 0 ? 'Free' : FL.money.format(p.priceUSD)}${p.period ? ` <small>${esc(p.period)}</small>` : ''}</div>
        <div class="unit mt-1">${esc(p.unit)}</div></div>
      <ul>${p.perks.map(x => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul>
      <button type="button" class="btn ${p.featured ? 'btn-primary' : ''} btn-block" data-buy="${p.id}">${esc(p.cta)}</button>
    </div>`).join('')}</div>
    <p class="small muted mt-2">All prices in US dollars. The first 25-minute live lesson is a free trial.</p>`;
};
FL.views.bindPricing = function (root) {
  root.addEventListener('click', e => { const b = e.target.closest('[data-buy]'); if (b) FL.views.buy(b.dataset.buy); });
};
FL.views.buy = function (planId) {
  const { icon, esc } = FL.ui;
  const plan = FL.config.plans.find(p => p.id === planId);
  if (!plan) return;
  if (plan.priceUSD === 0) { FL.router.go('/courses'); return; }
  if (!FL.auth.current()) {
    FL.ui.toast('Please create a free account first.', 'info');
    FL.router.go('/register?next=' + encodeURIComponent('/pricing'));
    return;
  }
  FL.ui.modal({
    title: 'Checkout',
    body: `<div class="summary-row"><span>Plan</span><span>${esc(plan.name)}</span></div>
      <div class="summary-row"><span>Lesson credits</span><span>${plan.credits}</span></div>
      <div class="summary-row"><span>Total</span><span>${FL.money.format(plan.priceUSD)}${plan.period ? ' ' + esc(plan.period) : ''}</span></div>
      <div class="notice mt-2">${icon('info')}<div><strong>Demo checkout.</strong> No payment is taken on this portfolio version. In production this step opens a secure Stripe or PayPal checkout and the credits are added after payment.</div></div>`,
    actions: [
      { label: 'Cancel', className: 'btn-quiet' },
      { label: 'Confirm', className: 'btn-primary', onClick() {
        FL.db.mutate(d => {
          d.credits += plan.credits;
          d.transactions.unshift({ id: FL.util.uid('tx_'), at: Date.now(), kind: 'buy', credits: plan.credits, label: `${plan.name} · ${FL.money.format(plan.priceUSD)}` });
        });
        FL.ui.toast(`${FL.util.plural(plan.credits, 'lesson credit')} added to your account.`, 'success');
        setTimeout(() => FL.router.go('/book'), 200);
      } }
    ]
  });
};
FL.views.faq = function (list) {
  const { icon, esc } = FL.ui;
  return `<div class="faq">${list.map(f => `<details><summary>${esc(f.q)}${icon('plus')}</summary><div class="ans">${esc(f.a)}</div></details>`).join('')}</div>`;
};
FL.views.langName = lang => (lang === 'fr' ? 'French' : 'English');

/* --------------------------------------------------------------------- Home */
FL.pages.home = {
  title: '',
  render() {
    const { icon, esc } = FL.ui;
    const t = FL.config.teacher;
    const d = FL.db.load();
    const all = FL.course.allLessons();
    const exercises = all.reduce((s, l) => s + l.practice.length, 0);
    const cont = FL.learn.continueTarget(d);
    const sample = FL.course.lesson('en-a1-1');
    const sampleLevel = FL.course.levelOf(sample);
    return `
    ${cont ? `<div class="band" style="border-top:0"><div class="container row between wrap" style="padding-top:12px;padding-bottom:12px">
      <span class="small"><strong>Continue where you left off:</strong> ${esc(FL.course.title(FL.course.levelOf(cont)))} · Lesson ${cont.n} — ${esc(cont.title)}</span>
      <a class="btn btn-sm btn-primary" href="#/lesson/${cont.id}">Continue ${icon('arrow-right')}</a></div></div>` : ''}
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="kicker">Online English & French courses</div>
          <h1>Learn English and French properly, with a real teacher.</h1>
          <p class="lead">Structured courses from A1 to B2 with clear explanations, audio and interactive exercises. Study on your own for free, and book a live 1-on-1 lesson whenever you want personal feedback.</p>
          <div class="row wrap">
            <a class="btn btn-primary btn-lg" href="#/courses">Browse the courses</a>
            <a class="btn btn-lg" href="#/placement">Find your level</a>
          </div>
          <div class="hero-facts">
            <div><strong>${all.length}</strong><span>complete lessons</span></div>
            <div><strong>${exercises}</strong><span>interactive exercises</span></div>
            <div><strong>A1–B2</strong><span>in two languages</span></div>
          </div>
        </div>
        <figure class="portrait">
          <img src="${esc(t.photo)}" alt="Portrait of ${esc(t.name)}">
          <figcaption><strong>${esc(t.name)}</strong><span>English & French teacher · IELTS certified · ${esc(t.location)}</span></figcaption>
        </figure>
      </div>
    </section>

    <section class="section" id="courses">
      <div class="container">
        <div class="section-head"><div class="kicker">Courses</div><h2>Choose a language and a level</h2>
          <p>Each level has five lessons and a final test. Lessons build on each other, but you can open any of them at any time.</p></div>
        <div class="grid g-2" style="gap:32px">
          ${['en', 'fr'].map(lang => `<div class="course-col"><h3>${FL.content[lang].name} <small>${lang === 'fr' ? 'explained in English' : 'for all learners'}</small></h3>
            <p class="muted small">${esc(FL.content[lang].intro)}</p>${FL.views.levelList(lang, d)}</div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section band">
      <div class="container">
        <div class="section-head"><div class="kicker">How it works</div><h2>A simple routine that works</h2></div>
        <ol class="steps">
          <li><h3>Find your level</h3><p>A 5-minute adaptive test places you on the CEFR scale and recommends where to start.</p></li>
          <li><h3>Learn and practise</h3><p>Go through the slides, then practise with exercises that correct you instantly and explain why.</p></li>
          <li><h3>Get personal feedback</h3><p>Book a live lesson in your own timezone when you want to speak, ask questions and be corrected.</p></li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="container grid g-2" style="gap:56px;align-items:center">
        <div>
          <div class="kicker">Inside a lesson</div>
          <h2>Everything a good lesson needs</h2>
          <ul class="feature-list mt-3">
            <li><span class="fi">${icon('layers')}</span><div><strong>Slides you can present</strong><p>Clear explanations, tables and dialogues. Use the arrows, swipe on a phone or go full screen.</p></div></li>
            <li><span class="fi">${icon('volume')}</span><div><strong>Audio for every example</strong><p>Hear each sentence and dialogue read aloud, at normal or slow speed.</p></div></li>
            <li><span class="fi">${icon('check-circle')}</span><div><strong>Five types of exercise</strong><p>Multiple choice, gap fill, matching, sentence building and dictation, with explanations.</p></div></li>
            <li><span class="fi">${icon('chart')}</span><div><strong>Grades, tests and certificates</strong><p>Track your scores lesson by lesson and earn a certificate for each level.</p></div></li>
            <li><span class="fi">${icon('repeat')}</span><div><strong>Vocabulary that sticks</strong><p>Every word you meet goes into a review deck that schedules it before you forget it.</p></div></li>
          </ul>
          <a class="btn btn-primary mt-3" href="#/lesson/${sample.id}">Open a sample lesson ${icon('arrow-right')}</a>
        </div>
        <div>
          <div class="deck" aria-label="Preview of a lesson slide">
            <div class="deck-bar"><span>${esc(FL.course.title(sampleLevel))} · Lesson 1</span><span>Slide 3 of ${FL.pages.lesson.slides(sample).length}</span></div>
            <div class="slide" style="min-height:0">${FL.pages.lesson.renderSlide(sample.slides[1], sample, sampleLevel)}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section band" id="teacher">
      <div class="container teacher-grid">
        <figure class="portrait"><img src="${esc(t.photo)}" alt="" loading="lazy"></figure>
        <div>
          <div class="kicker">Your teacher</div>
          <h2>${esc(t.name)}</h2>
          <p style="font-size:1.1rem;color:var(--text-2)">${esc(t.intro)}</p>
          <dl class="facts mt-3">
            <dt>Teaching</dt><dd>1.5+ years teaching English and French (CEFR B1–B2) at MBI, Algiers</dd>
            <dt>Languages</dt><dd>${t.languages.map(l => `${esc(l.name)} (${esc(l.level)})`).join(', ')}</dd>
            <dt>Based in</dt><dd>${esc(t.location)} · lessons in your timezone</dd>
            <dt>Education</dt><dd>BSc (Hons) Software Engineering, Asia Pacific University</dd>
          </dl>
          <div class="row wrap mt-3"><a class="btn btn-primary" href="#/book?type=trial">Book a free trial lesson</a><a class="btn" href="#/about">Read more</a></div>
        </div>
      </div>
    </section>

    <section class="section" id="pricing">
      <div class="container">
        <div class="section-head"><div class="kicker">Pricing</div><h2>Free to learn. Pay only for live lessons.</h2>
          <p>All courses and practice tools are free. Live 1-on-1 lessons start at $15.30.</p></div>
        <div data-pricing>${FL.views.pricing()}</div>
      </div>
    </section>

    <section class="section band">
      <div class="container narrow">
        <div class="section-head"><div class="kicker">Questions</div><h2>Frequently asked questions</h2></div>
        ${FL.views.faq(FL.data.faq)}
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta"><div><h2>Start with the first lesson today</h2><p>No payment and no commitment — just open a lesson and begin.</p></div>
          <div class="row wrap"><a class="btn btn-primary btn-lg" href="#/courses">Browse the courses</a><a class="btn btn-lg" href="#/book?type=trial">Book a free trial</a></div></div>
      </div>
    </section>`;
  },
  mount(root) {
    const p = root.querySelector('[data-pricing]');
    if (p) FL.views.bindPricing(p);
    root.addEventListener('click', e => { const s = e.target.closest('[data-say]'); if (s) FL.speech.speak(s.dataset.say, s.dataset.lang); });
  }
};

/* -------------------------------------------------------------------- About */
FL.pages.about = {
  title: 'Your teacher',
  render() {
    const { icon, esc } = FL.ui;
    const t = FL.config.teacher;
    return `
    <section class="page-head"><div class="container">
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>Your teacher</span></div>
      <h1>${esc(t.name)}</h1><p>${esc(t.title)} · ${esc(t.location)}</p>
    </div></section>
    <section class="section"><div class="container teacher-grid">
      <div>
        <figure class="portrait"><img src="${esc(t.photo)}" alt="Portrait of ${esc(t.name)}"></figure>
        <dl class="facts mt-3 small">
          <dt>Timezone</dt><dd>${esc(t.timezone.replace('_', ' '))} (${FL.time.tzOffsetLabel(t.timezone)})</dd>
          <dt>Lessons on</dt><dd>Google Meet or Zoom</dd>
          <dt>Email</dt><dd><a href="mailto:${esc(t.email)}">${esc(t.email)}</a></dd>
        </dl>
      </div>
      <div>
        <p style="font-size:1.15rem;color:var(--text-2)">${esc(t.intro)}</p>
        ${t.bio.map(p => `<p>${esc(p)}</p>`).join('')}
        <div class="row wrap mt-2 mb-3"><a class="btn btn-primary" href="#/book?type=trial">Book a free trial lesson</a><button type="button" class="btn" data-contact>${icon('mail')} Send a message</button></div>
        <div class="grid g-2 mt-3" style="gap:32px">
          <div><h3>Experience and education</h3>
            <ul class="timeline mt-2">${t.experience.map(x => `<li><div class="when">${esc(x.when)}</div><strong>${esc(x.role)}</strong><div class="small muted">${esc(x.org)}</div><p class="small mt-1 mb-0">${esc(x.text)}</p></li>`).join('')}</ul></div>
          <div><h3>Languages</h3>
            <table class="table mb-3"><tbody>${t.languages.map(l => `<tr><td><strong>${esc(l.name)}</strong></td><td class="muted">${esc(l.level)}</td></tr>`).join('')}</tbody></table>
            <h3>Teaching approach</h3>
            <ul class="list-check small">${t.highlights.map(h => `<li>${icon('check')}<span>${esc(h)}</span></li>`).join('')}</ul></div>
        </div>
        <hr>
        <h3>How a 50-minute live lesson is organised</h3>
        <div class="table-wrap mt-2"><table class="table"><thead><tr><th>Time</th><th>Stage</th><th>What happens</th></tr></thead><tbody>
          <tr><td class="nowrap">0–5 min</td><td><strong>Warm-up</strong></td><td>A short conversation and a review of your homework.</td></tr>
          <tr><td class="nowrap">5–20 min</td><td><strong>New language</strong></td><td>Grammar or vocabulary presented through a real situation.</td></tr>
          <tr><td class="nowrap">20–40 min</td><td><strong>Speaking practice</strong></td><td>Role-play, discussion or exam-style tasks with correction.</td></tr>
          <tr><td class="nowrap">40–50 min</td><td><strong>Feedback</strong></td><td>Corrections, notes and homework saved in your classroom.</td></tr>
        </tbody></table></div>
      </div>
    </div></section>`;
  },
  mount(root) { root.querySelector('[data-contact]').addEventListener('click', () => FL.pages.about.contact()); },
  contact() {
    const { esc } = FL.ui;
    const t = FL.config.teacher;
    const user = FL.auth.current();
    FL.ui.modal({
      title: `Message ${t.shortName}`,
      body: `<div class="field"><label for="c-name">Your name</label><input id="c-name" class="input" value="${esc(user ? user.name : '')}" maxlength="60"></div>
        <div class="field"><label for="c-topic">Topic</label><select id="c-topic" class="select">${['Question about the courses', 'Live English lessons', 'Live French lessons', 'Lessons for my child', 'Exam preparation'].map(o => `<option>${o}</option>`).join('')}</select></div>
        <div class="field mb-0"><label for="c-msg">Message</label><textarea id="c-msg" class="textarea" maxlength="1500" placeholder="Your goals, level and availability…"></textarea><span class="field-error" id="c-err"></span></div>`,
      actions: [{ label: 'Cancel', className: 'btn-quiet' }, { label: 'Open in my email app', className: 'btn-primary', onClick({ el }) {
        const msg = el.querySelector('#c-msg').value.trim();
        if (msg.length < 5) { el.querySelector('#c-err').textContent = 'Please write a short message.'; return false; }
        const name = el.querySelector('#c-name').value.trim();
        location.href = `mailto:${t.email}?subject=${encodeURIComponent(`[${FL.config.brand}] ${el.querySelector('#c-topic').value}`)}&body=${encodeURIComponent(`${msg}\n\n— ${name || 'A student'}`)}`;
      } }]
    });
  }
};

/* ------------------------------------------------------------------ Pricing */
FL.pages.pricing = {
  title: 'Pricing',
  render() {
    const { icon } = FL.ui;
    const d = FL.auth.current() ? FL.db.load() : null;
    return `
    <section class="page-head"><div class="container">
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>Pricing</span></div>
      <h1>Pricing</h1><p>All self-study courses are free. Live 1-on-1 lessons are paid in US dollars; credits never expire.</p>
      ${d ? `<p class="mt-1"><span class="tag brand">You have ${FL.util.plural(d.credits, 'lesson credit')}</span></p>` : ''}
    </div></section>
    <section class="section"><div class="container">
      <div data-pricing>${FL.views.pricing()}</div>
      <div class="grid g-3 mt-4">
        <div><h3>${icon('repeat')} Free rescheduling</h3><p class="muted">Move or cancel a lesson up to 24 hours before it starts and your credit comes back.</p></div>
        <div><h3>${icon('shield')} Satisfaction promise</h3><p class="muted">If a lesson doesn’t meet your expectations, tell me within 24 hours and the credit is returned.</p></div>
        <div><h3>${icon('clock')} Your timezone</h3><p class="muted">Every available time is shown in your local time, with calendar invitations.</p></div>
      </div>
      <div class="narrow mt-4">${FL.views.faq(FL.data.faq.slice(0, 5))}</div>
    </div></section>`;
  },
  mount(root) { FL.views.bindPricing(root.querySelector('[data-pricing]')); }
};

/* ---------------------------------------------------------------------- 404 */
FL.pages.notFound = {
  title: 'Page not found',
  render() {
    return `<section class="section"><div class="container narrow center">
      <div class="big-level">404</div>
      <h1 style="font-size:2rem" class="mt-2">This page doesn’t exist</h1>
      <p class="muted">The link may be broken, or the page may have moved.</p>
      <div class="row wrap" style="justify-content:center"><a class="btn btn-primary" href="#/">Go to the home page</a><a class="btn" href="#/courses">Browse the courses</a></div>
    </div></section>`;
  }
};
