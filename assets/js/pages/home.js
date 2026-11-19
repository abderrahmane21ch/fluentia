/* ==========================================================================
   Fluentia — shared view components + Home, About, Pricing, 404
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.views = (function () {
  const { icon, esc } = FL.ui;
  const L = FL.data.LEVELS;

  function levelRange(levels) { return levels.length > 1 ? `${L[levels[0]]}–${L[levels[levels.length - 1]]}` : L[levels[0]]; }
  function langName(lang) { return lang === 'fr' ? 'French' : 'English'; }
  function langBadge(lang) { return `<span class="badge badge-${lang}">${lang === 'fr' ? 'Français' : 'English'}</span>`; }

  function courseCard(c) {
    return `
      <a class="card card-hover course-card" href="#/course/${c.id}">
        <div class="course-cover" style="background:linear-gradient(135deg, ${c.color[0]}, ${c.color[1]})">
          <span class="flag">${icon('globe')} ${langName(c.lang)}</span>
          <span class="big">${c.lang.toUpperCase()}</span>
          <span class="chip" style="background:rgba(255,255,255,.2);color:#fff;border-color:transparent">${levelRange(c.levels)}</span>
        </div>
        <div class="course-body">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.summary)}</p>
          <div class="course-meta">
            <span>${icon('clock')} ${esc(c.duration)}</span>
            <span>${icon('book')} ${c.lessons} lessons</span>
            <span>${icon('video')} 1-on-1</span>
          </div>
        </div>
      </a>`;
  }

  function pricing() {
    const cur = FL.prefs.get().currency;
    const codes = Object.keys(FL.config.currency.rates);
    return `
      <div class="row between row-wrap mb-3">
        <div class="seg" role="group" aria-label="Currency">
          ${codes.map(c => `<button data-currency="${c}" aria-pressed="${c === cur}">${c}</button>`).join('')}
        </div>
        <span class="small muted">${icon('info', '')} Prices converted from USD and indicative.</span>
      </div>
      <div class="pricing-grid">
        ${FL.config.plans.map(p => `
          <div class="card plan ${p.featured ? 'featured' : ''}">
            ${p.ribbon ? `<span class="ribbon">${esc(p.ribbon)}</span>` : ''}
            <h3 class="mb-0">${esc(p.name)}</h3>
            <div><div class="price" data-usd="${p.priceUSD}">${p.priceUSD === 0 ? 'Free' : FL.money.format(p.priceUSD, cur)}${p.period ? `<small>${esc(p.period)}</small>` : ''}</div>
              <div class="per">${esc(p.unit)}${p.credits > 1 ? ` · <span data-usd-per="${(p.priceUSD / p.credits).toFixed(2)}">${FL.money.format(p.priceUSD / p.credits, cur)}</span> per lesson` : ''}</div></div>
            <ul>${p.perks.map(x => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul>
            <button class="btn ${p.featured ? 'btn-primary' : ''} btn-block" data-buy="${p.id}">${esc(p.cta)}</button>
          </div>`).join('')}
      </div>`;
  }

  function bindPricing(root) {
    root.addEventListener('click', e => {
      const cb = e.target.closest('[data-currency]');
      if (cb) {
        const cur = cb.dataset.currency;
        FL.prefs.set({ currency: cur });
        root.querySelectorAll('[data-currency]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.currency === cur)));
        root.querySelectorAll('[data-usd]').forEach(el => {
          const usd = +el.dataset.usd;
          const small = el.querySelector('small');
          el.innerHTML = (usd === 0 ? 'Free' : FL.money.format(usd, cur)) + (small ? small.outerHTML : '');
        });
        root.querySelectorAll('[data-usd-per]').forEach(el => { el.textContent = FL.money.format(+el.dataset.usdPer, cur); });
        return;
      }
      const bb = e.target.closest('[data-buy]');
      if (bb) buy(bb.dataset.buy);
    });
  }

  function buy(planId) {
    const plan = FL.config.plans.find(p => p.id === planId);
    if (!plan) return;
    if (plan.credits === 0) { FL.router.go('/book?type=trial'); return; }
    if (!FL.auth.current()) {
      FL.ui.toast('Create a free account first — it takes 20 seconds.', 'info');
      FL.router.go('/register?next=' + encodeURIComponent('/pricing'));
      return;
    }
    const cur = FL.prefs.get().currency;
    FL.ui.modal({
      title: 'Checkout',
      body: `
        <div class="panel mb-2">
          <div class="summary-row"><span>Plan</span><span>${esc(plan.name)}</span></div>
          <div class="summary-row"><span>Lesson credits</span><span>${plan.credits}</span></div>
          <div class="summary-row"><span>Total</span><span>${FL.money.format(plan.priceUSD, cur)}${plan.period ? esc(plan.period) : ''}</span></div>
        </div>
        <div class="notice">${icon('info')}<div><strong>Portfolio demo:</strong> no real payment is taken. In production this button would open a secure Stripe or PayPal checkout, and credits would be added by the server after payment.</div></div>`,
      actions: [
        { label: 'Cancel', className: 'btn-ghost' },
        {
          html: `${icon('check')} Confirm (demo)`, className: 'btn-primary',
          onClick() {
            FL.db.mutate(d => {
              d.credits += plan.credits;
              d.transactions.unshift({ id: FL.util.uid('tx_'), at: Date.now(), kind: 'buy', credits: plan.credits, label: `${plan.name} · ${FL.money.format(plan.priceUSD, cur)}` });
            });
            FL.ui.toast(`${FL.util.plural(plan.credits, 'lesson credit')} added to your account.`, 'success');
            setTimeout(() => FL.router.go('/book'), 300);
          }
        }
      ]
    });
  }

  function faq(list) {
    return `<div class="accordion faq">${list.map(f => `
      <details><summary>${esc(f.q)}${icon('chevron-down', 'chev')}</summary><div class="acc-body"><p class="mb-0">${esc(f.a)}</p></div></details>`).join('')}</div>`;
  }

  function wordOfDay(lang) {
    const w = FL.game.wordOfDay(lang);
    return `<div class="wotd">
      <div class="row between"><span class="eyebrow mb-0">${icon('sparkles')} Word of the day</span>${langBadge(lang)}</div>
      <div class="word">${esc(w.w)} <button class="icon-btn" data-say="${esc(w.w)}" data-lang="${lang}" aria-label="Listen to ${esc(w.w)}">${icon('volume')}</button></div>
      <div class="row row-wrap" style="gap:8px"><span class="ipa">${esc(w.ipa)}</span><span class="chip">${esc(w.pos)}</span></div>
      <p class="mb-0 mt-1"><strong>${esc(w.m)}</strong></p>
      <blockquote>${esc(w.ex)}</blockquote>
    </div>`;
  }

  // Delegated "listen" buttons: <button data-say="text" data-lang="en">
  function bindSay(root) {
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-say]');
      if (!b) return;
      FL.speech.speak(b.dataset.say, b.dataset.lang || 'en', b.dataset.rate ? +b.dataset.rate : 0.95);
    });
  }

  return { courseCard, pricing, bindPricing, faq, wordOfDay, bindSay, levelRange, langName, langBadge, buy };
})();

/* ---------------------------------------------------------------- Home */
FL.pages.home = {
  title: '',
  render() {
    const { icon, esc } = FL.ui;
    const t = FL.config.teacher;
    const features = [
      { icon: 'target', title: 'Adaptive placement test', text: 'Questions get harder or easier as you answer, pinpointing your CEFR level in about 5 minutes.', href: '#/placement', cls: '' },
      { icon: 'globe', title: 'Timezone-smart booking', text: 'Live availability shown in your local time, with calendar invites, reminders and free rescheduling.', href: '#/book', cls: 'accent' },
      { icon: 'video', title: 'Virtual classroom', text: 'Shared whiteboard, lesson notes, a lesson timer and a vocabulary list — all saved after class.', href: '#/classroom/demo', cls: 'success' },
      { icon: 'layers', title: 'Spaced-repetition flashcards', text: 'An SM-2 algorithm schedules each word right before you’d forget it. Class vocabulary is added automatically.', href: '#/practice?tab=cards', cls: 'warning' },
      { icon: 'mic', title: 'Pronunciation coach', text: 'Hear native-speed audio, record yourself and get word-by-word feedback using speech recognition.', href: '#/practice?tab=speak', cls: 'accent' },
      { icon: 'zap', title: 'Daily challenges & streaks', text: 'Five quick questions a day, XP, badges and streaks keep your motivation going between lessons.', href: '#/practice?tab=daily', cls: '' },
      { icon: 'chart', title: 'Progress analytics', text: 'A personal dashboard with weekly goals, a skills radar and an activity heatmap.', href: '#/dashboard', cls: 'success' },
      { icon: 'sparkles', title: 'Personal learning plan', text: 'Tell us your goal and available time — get a weekly plan that balances lessons and self-study.', href: '#/register', cls: 'warning' }
    ];
    const featured = ['en-general', 'en-ielts', 'en-business', 'fr-zero'].map(id => FL.data.courses.find(c => c.id === id));
    const testimonials = FL.config.testimonials || [];
    return `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="pill-announce"><b>New</b> Free 25-minute trial lesson — no card needed</div>
          <h1>Speak English & French with <span class="gradient-text">real confidence.</span></h1>
          <p class="hero-lead">1-on-1 online lessons with ${esc(t.name)} — plus a smart learning platform that keeps you improving between classes.</p>
          <div class="hero-ctas">
            <a class="btn btn-primary btn-lg" href="#/book?type=trial">${icon('calendar')} Book a free trial</a>
            <a class="btn btn-lg" href="#/placement">${icon('target')} Find my level in 5 min</a>
          </div>
          <div class="hero-trust">
            <span>${icon('check-circle')} IELTS-certified teacher</span>
            <span>${icon('check-circle')} CEFR-aligned courses</span>
            <span>${icon('check-circle')} Lessons in your timezone</span>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="mock mock-main">
            <div class="mock-video">
              <img src="${esc(t.photo)}" alt="" loading="eager">
              <span class="live">Live lesson</span>
              <div class="caption"><b>${esc(t.shortName)}:</b> Great! Now try it with “although”…</div>
            </div>
            <div class="mock-toolbar"><i>${icon('mic')}</i><i>${icon('video')}</i><i>${icon('pen')}</i><span></span><i>${icon('message')}</i></div>
          </div>
          <div class="mock mock-card">
            <div class="row between"><span class="badge badge-warning">${icon('layers')} Flashcard</span><span class="tiny muted">due today</span></div>
            <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:700;margin:10px 0 2px">to thrive</div>
            <div class="small muted">to grow or develop well</div>
            <div class="row mt-2" style="gap:6px"><span class="chip" style="font-size:.7rem">Again</span><span class="chip badge-success" style="font-size:.7rem">Good · 6d</span></div>
          </div>
          <div class="mock mock-streak">
            <div class="icon-tile accent">${icon('flame')}</div>
            <div><strong style="font-size:1.2rem">7-day streak</strong><div class="tiny muted">+240 XP this week</div></div>
          </div>
          <div class="mock mock-score">
            <div class="row"><div class="mini-ring" style="--p:92" data-label="92%"></div><div><strong class="small">Pronunciation</strong><div class="tiny muted">“thoroughly” ✓</div></div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-sm" style="padding-top:0">
      <div class="container">
        <div class="stats-band reveal">
          <div><strong>1.5+ yrs</strong><span>teaching English & French</span></div>
          <div><strong>3</strong><span>languages spoken</span></div>
          <div><strong>A1→C1</strong><span>CEFR-aligned curriculum</span></div>
          <div><strong>${FL.data.courses.length}</strong><span>courses for every goal</span></div>
        </div>
      </div>
    </section>

    <section class="section" id="features">
      <div class="container">
        <div class="section-head reveal">
          <div class="eyebrow">${icon('sparkles')} The platform</div>
          <h2>Everything you need to actually improve</h2>
          <p>Great lessons are only half the story. Fluentia gives you the tools to practise, remember and measure progress every single day.</p>
        </div>
        <div class="grid grid-4">
          ${features.map(f => `
            <a class="card card-hover feature reveal" href="${f.href}">
              <div class="icon-tile ${f.cls}">${icon(f.icon)}</div>
              <h3>${f.title}</h3><p>${f.text}</p>
              <span class="more">Try it ${icon('arrow-right')}</span>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--bg-elev)" id="method">
      <div class="container">
        <div class="section-head reveal">
          <div class="eyebrow">${icon('grad')} The method</div>
          <h2>A clear cycle that turns lessons into lasting skills</h2>
          <p>Every learner follows the same proven loop — adapted to your level, goals and pace.</p>
        </div>
        <div class="method-grid">
          ${FL.data.method.map(m => `<div class="method-step reveal"><h3>${m.title}</h3><p>${m.text}</p></div>`).join('')}
        </div>
        <div class="principles reveal">${FL.data.principles.map(p => `<span class="chip">${icon('check')} ${p}</span>`).join('')}</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row between row-wrap mb-3 reveal" style="align-items:flex-end">
          <div><div class="eyebrow">${icon('book')} Courses</div><h2 class="mb-0">Pick a path that matches your goal</h2></div>
          <a class="btn" href="#/courses">All ${FL.data.courses.length} courses ${icon('arrow-right')}</a>
        </div>
        <div class="grid grid-4">${featured.map(c => `<div class="reveal">${FL.views.courseCard(c)}</div>`).join('')}</div>
      </div>
    </section>

    <section class="section" style="background:var(--bg-elev)" id="teacher">
      <div class="container teacher">
        <div class="teacher-photo reveal">
          <div class="frame"><img src="${esc(t.photo)}" alt="Portrait of ${esc(t.name)}" loading="lazy"></div>
          <div class="float-badge"><div class="icon-tile success">${icon('award')}</div><div><strong>IELTS certified</strong><span class="muted tiny">English proficiency</span></div></div>
        </div>
        <div class="reveal">
          <div class="eyebrow">${icon('user')} Meet your teacher</div>
          <h2>Hi, I’m ${esc(t.shortName)} 👋</h2>
          <p style="font-size:1.1rem;color:var(--text-2)">${esc(t.intro)}</p>
          <div class="grid grid-2 mt-3" style="gap:28px">
            <div>
              <h4 class="mb-2">Languages</h4>
              <div class="lang-bars">${t.languages.map(l => `<div class="lang-bar"><strong>${esc(l.name)}</strong><div class="bar"><span style="width:${l.pct}%"></span></div><span class="tiny muted">${esc(l.level)}</span></div>`).join('')}</div>
            </div>
            <div>
              <h4 class="mb-2">Why learners choose me</h4>
              <ul class="check-list small">${t.highlights.slice(0, 4).map(h => `<li>${icon('check-circle')}<span>${esc(h)}</span></li>`).join('')}</ul>
            </div>
          </div>
          <div class="row row-wrap mt-3">
            <a class="btn btn-primary" href="#/book?type=trial">${icon('calendar')} Book a free trial</a>
            <a class="btn" href="#/about">Full profile ${icon('arrow-right')}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container grid grid-2" style="gap:24px;align-items:stretch">
        <div class="card reveal">${FL.views.wordOfDay('en')}</div>
        <div class="card reveal">${FL.views.wordOfDay('fr')}</div>
      </div>
    </section>

    ${testimonials.length ? `
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head reveal"><div class="eyebrow">${icon('star')} Student stories</div><h2>What learners say</h2></div>
        <div class="grid grid-3">${testimonials.map(q => `
          <figure class="card reveal" style="margin:0"><blockquote style="margin:0 0 16px;color:var(--text-2)">“${esc(q.quote)}”</blockquote>
          <figcaption class="row"><span class="avatar">${esc(FL.util.initials(q.name))}</span><div><strong>${esc(q.name)}</strong><div class="tiny muted">${esc(q.detail || '')}</div></div></figcaption></figure>`).join('')}
        </div>
      </div>
    </section>` : ''}

    <section class="section" style="background:var(--bg-elev)" id="pricing">
      <div class="container">
        <div class="section-head reveal">
          <div class="eyebrow">${icon('card')} Pricing</div>
          <h2>Simple, flexible pricing</h2>
          <p>Start with a free trial. Buy single lessons or save with a pack — credits never expire.</p>
        </div>
        <div class="reveal" data-pricing>${FL.views.pricing()}</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal"><div class="eyebrow">${icon('info')} FAQ</div><h2>Questions, answered</h2></div>
        <div class="reveal">${FL.views.faq(FL.data.faq)}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="cta-band reveal">
          <h2>Your first lesson is on me.</h2>
          <p>Book a free 25-minute trial, get your level and a personal learning plan — and start speaking from day one.</p>
          <div class="row row-wrap" style="justify-content:center">
            <a class="btn btn-lg btn-light" href="#/book?type=trial">${icon('calendar')} Book free trial</a>
            <a class="btn btn-lg btn-outline-light" href="#/classroom/demo">${icon('video')} Explore the classroom</a>
          </div>
        </div>
      </div>
    </section>`;
  },
  mount(root) {
    FL.views.bindPricing(root.querySelector('[data-pricing]'));
    FL.views.bindSay(root);
  }
};

/* --------------------------------------------------------------- About */
FL.pages.about = {
  title: 'Your teacher',
  render() {
    const { icon, esc } = FL.ui;
    const t = FL.config.teacher;
    return `
    <section class="page-head"><div class="container">
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>Teacher</span></div>
    </div></section>
    <section class="section" style="padding-top:0">
      <div class="container teacher">
        <div class="teacher-photo">
          <div class="frame"><img src="${esc(t.photo)}" alt="Portrait of ${esc(t.name)}"></div>
          <div class="card mt-3 card-pad-sm">
            <div class="stack small">
              <div class="row">${icon('pin')} ${esc(t.location)}</div>
              <div class="row">${icon('clock')} Teaches in ${esc(t.timezone.replace('_', ' '))} (${FL.time.tzOffsetLabel(t.timezone)})</div>
              <div class="row">${icon('video')} Google Meet / Zoom</div>
              <div class="row">${icon('mail')} <a href="mailto:${esc(t.email)}">${esc(t.email)}</a></div>
            </div>
          </div>
        </div>
        <div>
          <div class="eyebrow">${icon('user')} ${esc(t.title)}</div>
          <h1 style="font-size:clamp(2rem,4vw,3rem)">${esc(t.name)}</h1>
          <p style="font-size:1.12rem;color:var(--text-2)">${esc(t.intro)}</p>
          ${t.bio.map(p => `<p class="muted">${esc(p)}</p>`).join('')}
          <div class="row row-wrap mt-2 mb-3">
            <a class="btn btn-primary btn-lg" href="#/book?type=trial">${icon('calendar')} Book a free trial</a>
            <button class="btn btn-lg" data-contact>${icon('message')} Send a message</button>
          </div>
          <div class="grid grid-2" style="gap:22px">
            <div class="card">
              <h3 class="mb-2">Experience & education</h3>
              <ul class="timeline">${t.experience.map(x => `<li><div class="when">${esc(x.when)}</div><strong>${esc(x.role)}</strong><div class="small muted">${esc(x.org)}</div><p class="small mt-1 mb-0">${esc(x.text)}</p></li>`).join('')}</ul>
            </div>
            <div class="stack">
              <div class="card">
                <h3 class="mb-2">Languages</h3>
                <div class="lang-bars">${t.languages.map(l => `<div class="lang-bar"><strong>${esc(l.name)}</strong><div class="bar"><span style="width:${l.pct}%"></span></div><span class="tiny muted">${esc(l.level)}</span></div>`).join('')}</div>
              </div>
              <div class="card">
                <h3 class="mb-2">Teaching strengths</h3>
                <ul class="check-list small">${t.highlights.map(h => `<li>${icon('check-circle')}<span>${esc(h)}</span></li>`).join('')}</ul>
              </div>
            </div>
          </div>
          <div class="card mt-3">
            <h3>What a typical 50-minute lesson looks like</h3>
            <div class="grid grid-4 mt-2" style="gap:12px">
              ${[['5 min', 'Warm-up chat', 'Review homework and last lesson’s words.'], ['15 min', 'New language', 'Grammar or vocabulary through a real situation.'], ['20 min', 'Speaking task', 'Role-play, discussion or exam-style practice.'], ['10 min', 'Feedback', 'Corrections, notes and homework in your classroom.']]
                .map(([m, h, p]) => `<div class="panel"><span class="badge badge-primary">${m}</span><h4 class="mt-1 mb-0">${h}</h4><p class="small muted mb-0">${p}</p></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>`;
  },
  mount(root) {
    root.querySelector('[data-contact]').addEventListener('click', () => FL.pages.about.contact());
  },
  contact() {
    const { esc } = FL.ui;
    const t = FL.config.teacher;
    const user = FL.auth.current();
    FL.ui.modal({
      title: `Message ${t.shortName}`,
      body: `
        <div class="field"><label for="c-name">Your name</label><input id="c-name" class="input" value="${esc(user ? user.name : '')}" maxlength="60"></div>
        <div class="field"><label for="c-topic">Topic</label><select id="c-topic" class="select"><option>Question about lessons</option><option>English lessons</option><option>French lessons</option><option>Lessons for my child</option><option>Exam preparation</option></select></div>
        <div class="field"><label for="c-msg">Message</label><textarea id="c-msg" class="textarea" maxlength="1500" placeholder="Tell me about your goals, level and availability…"></textarea><span class="field-error" id="c-err"></span></div>
        <p class="tiny muted mb-0">This opens your email app with the message ready to send${t.whatsapp ? ', or you can send it on WhatsApp' : ''}.</p>`,
      actions: [
        ...(t.whatsapp ? [{ label: 'WhatsApp', className: 'btn-ghost', onClick: ({ el }) => send(el, 'wa') }] : []),
        { label: 'Open email', className: 'btn-primary', onClick: ({ el }) => send(el, 'mail') }
      ]
    });
    function send(el, via) {
      const name = el.querySelector('#c-name').value.trim();
      const topic = el.querySelector('#c-topic').value;
      const msg = el.querySelector('#c-msg').value.trim();
      if (msg.length < 5) { el.querySelector('#c-err').textContent = 'Please write a short message.'; return false; }
      const text = `${msg}\n\n— ${name || 'A prospective student'}`;
      if (via === 'wa') window.open(`https://wa.me/${t.whatsapp}?text=${encodeURIComponent(topic + ': ' + text)}`, '_blank', 'noopener');
      else location.href = `mailto:${t.email}?subject=${encodeURIComponent(`[${FL.config.brand}] ${topic}`)}&body=${encodeURIComponent(text)}`;
      FL.ui.toast('Thanks! Your message is ready to send.', 'success');
      return true;
    }
  }
};

/* ------------------------------------------------------------- Pricing */
FL.pages.pricing = {
  title: 'Pricing',
  render() {
    const { icon } = FL.ui;
    const d = FL.auth.current() ? FL.db.load() : null;
    return `
    <section class="page-head"><div class="container center">
      <div class="eyebrow">${icon('card')} Pricing</div>
      <h1>Invest in your fluency</h1>
      <p style="margin:0 auto">Start free. Pay only for the lessons you take. Credits never expire and lessons can be rescheduled free up to 24 hours before.</p>
      ${d ? `<div class="mt-2"><span class="badge badge-primary">${icon('card')} You have ${FL.util.plural(d.credits, 'lesson credit')}</span></div>` : ''}
    </div></section>
    <section class="section" style="padding-top:12px"><div class="container" data-pricing>${FL.views.pricing()}</div></section>
    <section class="section" style="padding-top:0"><div class="container">
      <div class="grid grid-3">
        <div class="card"><div class="icon-tile success">${icon('shield')}</div><h3 class="mt-2">Satisfaction promise</h3><p class="muted mb-0">If a lesson doesn’t meet your expectations, tell me within 24 hours and your credit is returned.</p></div>
        <div class="card"><div class="icon-tile accent">${icon('repeat')}</div><h3 class="mt-2">Free rescheduling</h3><p class="muted mb-0">Life happens. Move or cancel any lesson up to 24 hours before at no cost.</p></div>
        <div class="card"><div class="icon-tile">${icon('sparkles')}</div><h3 class="mt-2">Practice tools included</h3><p class="muted mb-0">Flashcards, pronunciation coach, daily challenges and your classroom are free with every plan.</p></div>
      </div>
      <div class="mt-4">${FL.views.faq(FL.data.faq.slice(0, 4))}</div>
    </div></section>`;
  },
  mount(root) { FL.views.bindPricing(root.querySelector('[data-pricing]')); }
};

/* ----------------------------------------------------------------- 404 */
FL.pages.notFound = {
  title: 'Page not found',
  render() {
    const { icon } = FL.ui;
    return `<section class="section"><div class="container center" style="max-width:560px">
      <div style="font-family:var(--font-display);font-size:6rem;font-weight:700;line-height:1" class="gradient-text">404</div>
      <h1 style="font-size:2rem">Oups ! Page not found.</h1>
      <p class="muted">The page you’re looking for doesn’t exist or has moved. Try the search (<span class="kbd">Ctrl K</span>) or head back home.</p>
      <div class="row row-wrap" style="justify-content:center"><a class="btn btn-primary" href="#/">${icon('home')} Home</a><button class="btn" data-action="palette">${icon('search')} Search</button></div>
    </div></section>`;
  }
};
