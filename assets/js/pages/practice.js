/* ==========================================================================
   Fluentia — Practice hub: flashcards (SRS), pronunciation coach, daily challenge
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.practice = {
  title: 'Practice hub',
  TABS: [
    { id: 'cards', label: 'Flashcards', icon: 'layers' },
    { id: 'speak', label: 'Pronunciation coach', icon: 'mic' },
    { id: 'daily', label: 'Daily challenge', icon: 'zap' }
  ],
  render(params, query) {
    const { icon } = FL.ui;
    const tab = this.TABS.some(t => t.id === query.tab) ? query.tab : 'cards';
    const guest = !FL.auth.current();
    return `
    <section class="page-head" style="padding-bottom:18px"><div class="container">
      <div class="eyebrow">${icon('sparkles')} Practice hub</div>
      <h1>Practise a little, every day</h1>
      <p>Short, focused activities that turn lesson content into long-term memory. Every activity earns XP and builds your streak.</p>
      ${guest ? `<div class="notice mt-2" style="max-width:720px">${icon('info')}<div>You’re practising as a guest — progress is saved in this browser. <a href="#/register?next=%2Fpractice">Create an account</a> to keep it with your dashboard.</div></div>` : ''}
    </div></section>
    <section class="section" style="padding-top:0"><div class="container">
      <div class="tabs" role="tablist" aria-label="Practice activities">
        ${this.TABS.map(t => `<button class="tab" role="tab" id="tab-${t.id}" aria-controls="panel" aria-selected="${t.id === tab}" data-tab="${t.id}" tabindex="${t.id === tab ? 0 : -1}">${icon(t.icon)} ${t.label}</button>`).join('')}
      </div>
      <div id="panel" role="tabpanel" aria-labelledby="tab-${tab}"></div>
    </div></section>`;
  },
  mount(root, params, query) {
    const panel = root.querySelector('#panel');
    let cleanup = null;
    const self = this;
    function show(tab) {
      if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
      FL.speech.stop();
      root.querySelectorAll('[data-tab]').forEach(b => { const on = b.dataset.tab === tab; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
      panel.setAttribute('aria-labelledby', 'tab-' + tab);
      cleanup = self[tab](panel) || null;
      history.replaceState(null, '', '#/practice?tab=' + tab);
    }
    const tablist = root.querySelector('[role="tablist"]');
    tablist.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) show(b.dataset.tab); });
    tablist.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      const tabs = Array.from(tablist.querySelectorAll('[data-tab]'));
      const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      n.focus(); show(n.dataset.tab);
    });
    show(this.TABS.some(t => t.id === query.tab) ? query.tab : 'cards');
    return () => { if (cleanup) cleanup(); };
  },

  /* ---------------------------------------------------------- Flashcards */
  cards(panel) {
    const { icon, esc } = FL.ui;
    let session = null;
    let onKey = null;

    function decksView() {
      const d = FL.db.load();
      const decks = [{ id: 'my-words', title: 'My words', icon: 'star', lang: null, mine: true }, ...FL.data.decks];
      panel.innerHTML = `
        <div class="grid grid-3">${decks.map(dk => {
          const s = FL.srs.deckStats(dk.id, d);
          const toStudy = s.due + Math.min(10, s.fresh);
          return `<div class="card deck">
            <div class="row between"><span class="icon-tile ${dk.mine ? 'warning' : ''}">${icon(dk.icon)}</span>${dk.lang ? FL.views.langBadge(dk.lang) : '<span class="badge badge-warning">Personal</span>'}</div>
            <h3 class="mb-0">${esc(dk.title)}</h3>
            <div class="deck-stats"><span><b>${s.due}</b> due</span><span><b>${s.fresh}</b> new</span><span><b>${s.learned}</b> learned</span><span><b>${s.total}</b> total</span></div>
            <div class="progress" style="height:6px"><span style="width:${s.total ? (s.learned / s.total) * 100 : 0}%"></span></div>
            <div class="row mt-1">
              ${s.total === 0 ? `<span class="small muted">Add words below or save them in your classroom.</span>`
                : toStudy ? `<button class="btn btn-primary btn-sm" data-study="${dk.id}">${icon('play')} Study ${toStudy}</button>`
                : `<span class="small" style="color:var(--success);font-weight:600">${icon('check', '')} All caught up</span><button class="btn btn-ghost btn-sm" data-cram="${dk.id}">Review anyway</button>`}
            </div></div>`;
        }).join('')}</div>
        <div class="card mt-3" id="my-words">
          <div class="card-title"><h3>${icon('star')} My words</h3><span class="small muted">${FL.util.plural(d.myWords.length, 'word')}</span></div>
          <form class="grid" style="grid-template-columns:1fr 1fr 1.4fr auto auto;gap:10px;align-items:end" id="add-word">
            <div class="field mb-0"><label for="w-front">Word or phrase</label><input id="w-front" class="input" maxlength="80" required></div>
            <div class="field mb-0"><label for="w-back">Meaning</label><input id="w-back" class="input" maxlength="120" required></div>
            <div class="field mb-0"><label for="w-ex">Example <span class="muted">(optional)</span></label><input id="w-ex" class="input" maxlength="160"></div>
            <div class="field mb-0"><label for="w-lang">Lang</label><select id="w-lang" class="select"><option value="en">EN</option><option value="fr">FR</option></select></div>
            <button class="btn btn-primary" type="submit">${icon('plus')} Add</button>
          </form>
          ${d.myWords.length ? `<ul class="vocab-list mt-2" style="max-height:none">${d.myWords.slice().reverse().map(w => `
            <li><span><strong>${esc(w.front)}</strong> — ${esc(w.back)}${w.example ? ` <span class="muted">· ${esc(w.example)}</span>` : ''}</span>
              <span class="badge badge-${w.lang || 'en'}">${(w.lang || 'en').toUpperCase()}</span>
              <button class="icon-btn" data-say="${esc(w.front)}" data-lang="${w.lang || 'en'}" aria-label="Listen">${icon('volume')}</button>
              <button class="icon-btn" data-del-word="${w.id}" aria-label="Delete ${esc(w.front)}">${icon('trash')}</button></li>`).join('')}</ul>`
            : '<p class="muted small mt-2 mb-0">Words you add here — or capture during a lesson in the classroom — become flashcards automatically.</p>'}
        </div>`;
      const form = panel.querySelector('#add-word');
      if (window.innerWidth < 760) form.style.gridTemplateColumns = '1fr';
      form.addEventListener('submit', e => {
        e.preventDefault();
        const front = form.querySelector('#w-front').value.trim(), back = form.querySelector('#w-back').value.trim();
        if (!front || !back) return;
        FL.db.mutate(dd => { dd.myWords.push({ id: FL.util.uid('w_'), lang: form.querySelector('#w-lang').value, front, back, example: form.querySelector('#w-ex').value.trim(), at: Date.now() }); dd.skills.writing++; });
        FL.game.award(3, { skill: 'vocabulary' });
        FL.ui.toast(`“${front}” added to My words.`, 'success', 2200);
        decksView();
        const f = panel.querySelector('#w-front'); if (f) f.focus();
      });
    }

    function study(deckId, cram) {
      const cards = cram ? FL.util.shuffle(FL.srs.allCards(deckId)) : FL.srs.queue(deckId);
      if (!cards.length) { decksView(); return; }
      const deck = deckId === 'my-words' ? { title: 'My words' } : FL.data.decks.find(x => x.id === deckId);
      session = { deckId, cram, queue: cards.slice(), done: 0, total: cards.length, flipped: false, xp: 0, again: 0, title: deck.title };
      drawCard();
    }

    function drawCard() {
      const c = session.queue[0];
      if (!c) return summary();
      const state = FL.db.load().cards[c.id];
      const labels = ['Again', 'Hard', 'Good', 'Easy'];
      panel.innerHTML = `
        <div class="flash-stage">
          <div class="row between"><button class="btn btn-ghost btn-sm" data-end>${icon('arrow-left')} ${esc(session.title)}</button><span class="small muted">${session.done} / ${session.total}${session.cram ? ' · review mode' : ''}</span></div>
          <div class="progress mt-1"><span style="width:${(session.done / session.total) * 100}%"></span></div>
          <div class="flashcard ${session.flipped ? 'flipped' : ''}" tabindex="0" role="button" aria-label="Flashcard: ${esc(c.front)}. Press space to flip." data-flip>
            <div class="flashcard-inner">
              <div class="face front"><button class="icon-btn listen" data-say="${esc(c.front)}" data-lang="${c.lang}" aria-label="Listen">${icon('volume')}</button>
                <div class="term">${esc(c.front)}</div><span class="hint">Click or press Space to reveal</span></div>
              <div class="face back"><button class="icon-btn listen" data-say="${esc(c.example || c.front)}" data-lang="${c.lang}" aria-label="Listen to example">${icon('volume')}</button>
                <div class="small muted">${esc(c.front)}</div><div class="meaning">${esc(c.back)}</div>${c.example ? `<div class="example">“${esc(c.example)}”</div>` : ''}</div>
            </div>
          </div>
          <div class="rate-row" ${session.flipped ? '' : 'hidden'}>
            ${['again', 'hard', 'good', 'easy'].map((k, i) => `<button class="rate-btn ${k}" data-rate="${i}">${labels[i]}<small>${session.cram ? `key ${i + 1}` : FL.srs.previewLabel(state, i)}</small></button>`).join('')}
          </div>
          ${session.flipped ? '' : `<button class="btn btn-primary btn-block btn-lg" data-flip-btn>Show answer <span class="kbd" style="margin-left:6px">Space</span></button>`}
          <p class="tiny muted center mt-2">Keyboard: <span class="kbd">Space</span> flip · <span class="kbd">1</span>–<span class="kbd">4</span> rate · <span class="kbd">L</span> listen</p>
        </div>`;
    }

    function flip() {
      if (!session || session.flipped) return;
      session.flipped = true;
      panel.querySelector('.flashcard').classList.add('flipped');
      const rr = panel.querySelector('.rate-row'); rr.hidden = false;
      const fb = panel.querySelector('[data-flip-btn]'); if (fb) fb.remove();
      const good = rr.querySelector('.good'); if (good) good.focus({ preventScroll: true });
    }

    function rate(g) {
      if (!session || !session.flipped) return;
      const c = session.queue.shift();
      if (!session.cram) FL.srs.rate(c.id, g); else FL.db.mutate(d => { d.stats.reviews++; });
      if (g === 0) { session.queue.push(c); session.again++; } else session.done++;
      const xp = g === 0 ? 1 : 2;
      session.xp += xp;
      FL.game.award(xp, { skill: 'vocabulary', silent: true });
      FL.db.mutate(d => { d.homework.forEach(h => { if (/flashcards/i.test(h.text) && d.stats.reviews >= 10 && !h.done) h.done = true; }); });
      session.flipped = false;
      drawCard();
    }

    function summary() {
      FL.ui.xp(session.xp);
      panel.innerHTML = `<div class="card center" style="max-width:560px;margin:0 auto">
        <div style="font-size:3rem">🎉</div><h2 style="font-size:1.8rem">Session complete!</h2>
        <p class="muted">You reviewed <strong>${FL.util.plural(session.total, 'card')}</strong>${session.again ? ` (with ${session.again} repeat${session.again > 1 ? 's' : ''})` : ''} and earned <strong>${session.xp} XP</strong>.</p>
        <p class="small muted">${session.cram ? 'Review mode doesn’t change your schedule.' : 'Each card is now scheduled for the perfect moment to review it again.'}</p>
        <div class="row row-wrap" style="justify-content:center"><button class="btn btn-primary" data-end>${icon('layers')} Back to decks</button><a class="btn" href="#/practice?tab=daily">${icon('zap')} Daily challenge</a></div></div>`;
      session = null;
    }

    panel.onclick = e => {
      const t = e.target;
      const say = t.closest('[data-say]');
      if (say) { e.stopPropagation(); FL.speech.speak(say.dataset.say, say.dataset.lang); return; }
      if (t.closest('[data-study]')) return study(t.closest('[data-study]').dataset.study, false);
      if (t.closest('[data-cram]')) return study(t.closest('[data-cram]').dataset.cram, true);
      if (t.closest('[data-end]')) { session = null; return decksView(); }
      if (t.closest('[data-flip]') || t.closest('[data-flip-btn]')) return flip();
      if (t.closest('[data-rate]')) return rate(+t.closest('[data-rate]').dataset.rate);
      const del = t.closest('[data-del-word]');
      if (del) { FL.db.mutate(d => { d.myWords = d.myWords.filter(w => w.id !== del.dataset.delWord); delete d.cards[del.dataset.delWord]; }); decksView(); }
    };
    onKey = e => {
      if (!session || e.target.matches('input, textarea, select') || document.querySelector('.modal-backdrop')) return;
      if (e.key === ' ' || (e.key === 'Enter' && !session.flipped)) { if (!session.flipped) { e.preventDefault(); flip(); } }
      else if (/^[1-4]$/.test(e.key)) rate(+e.key - 1);
      else if (e.key.toLowerCase() === 'l') { const c = session.queue[0]; if (c) FL.speech.speak(c.front, c.lang); }
    };
    document.addEventListener('keydown', onKey);
    decksView();
    return () => { document.removeEventListener('keydown', onKey); panel.onclick = null; };
  },

  /* ------------------------------------------------------- Pronunciation */
  speak(panel) {
    const { icon, esc } = FL.ui;
    const d0 = FL.db.load();
    const st = { lang: d0.profile.targetLang || 'en', idx: 0, rec: null, recording: false };
    const supported = FL.speech.canRecognise();

    function draw() {
      const d = FL.db.load();
      const list = FL.data.phrases[st.lang];
      const p = list[st.idx];
      panel.innerHTML = `
        <div class="grid" style="grid-template-columns:minmax(0,320px) minmax(0,1fr);gap:22px" id="pron-grid">
          <div>
            <div class="seg mb-2" role="group" aria-label="Language">
              <button data-plang="en" aria-pressed="${st.lang === 'en'}">English</button><button data-plang="fr" aria-pressed="${st.lang === 'fr'}">Français</button>
            </div>
            <div class="phrase-list">${list.map((x, i) => {
              const best = d.pron[`${st.lang}:${i}`];
              return `<button class="phrase-btn" data-phrase="${i}" aria-pressed="${i === st.idx}"><span class="badge">${x.lvl}</span><span class="small" style="flex:1;min-width:0">${esc(x.t)}</span>${best != null ? `<span class="best" style="color:${best >= 80 ? 'var(--success)' : best >= 50 ? 'var(--warning)' : 'var(--danger)'}">${best}%</span>` : ''}</button>`;
            }).join('')}</div>
          </div>
          <div class="card">
            <div class="row between row-wrap"><span class="badge badge-primary">${p.lvl} · ${FL.views.langName(st.lang)}</span><span class="small muted">Phrase ${st.idx + 1} of ${list.length}</span></div>
            <div class="pron-target" id="target">${p.t.split(/\s+/).map(w => `<span class="w">${esc(w)}</span>`).join(' ')}</div>
            <div class="notice mb-3">${icon('info')}<div><strong>Tip:</strong> ${esc(p.tip)}</div></div>
            <div class="row row-wrap" style="gap:18px;align-items:center">
              <button class="mic-btn" id="mic" ${supported ? '' : 'disabled'} aria-label="Record yourself">${icon('mic')}</button>
              <div class="stack" style="flex:1;min-width:200px">
                <div class="row row-wrap"><button class="btn btn-sm" data-listen="0.95">${icon('volume')} Listen</button><button class="btn btn-sm" data-listen="0.65">${icon('headphones')} Slow</button>
                  <button class="btn btn-ghost btn-sm" data-move="-1" ${st.idx === 0 ? 'disabled' : ''}>${icon('chevron-left')} Prev</button><button class="btn btn-ghost btn-sm" data-move="1" ${st.idx === list.length - 1 ? 'disabled' : ''}>Next ${icon('chevron-right')}</button></div>
                <div class="small muted" id="mic-status">${supported ? 'Listen first, then tap the microphone and read the sentence aloud.' : 'Speech recognition isn’t available in this browser — use Chrome, Edge or Safari to get scored. You can still listen and repeat.'}</div>
              </div>
            </div>
            <div class="mt-3"><div class="label mb-1">What we heard</div><div class="transcript" id="transcript" aria-live="polite"><span class="muted">—</span></div></div>
            <div class="row mt-3" id="score-box" hidden style="gap:18px"><div class="score-big" id="score"></div><div id="score-msg" class="small"></div></div>
          </div>
        </div>`;
      if (window.innerWidth < 860) panel.querySelector('#pron-grid').style.gridTemplateColumns = '1fr';
    }

    function setStatus(html) { const s = panel.querySelector('#mic-status'); if (s) s.innerHTML = html; }

    function record() {
      if (st.recording) { if (st.rec) st.rec.stop(); return; }
      FL.speech.stop();
      const p = FL.data.phrases[st.lang][st.idx];
      const mic = panel.querySelector('#mic');
      const tr = panel.querySelector('#transcript');
      let got = '';
      st.rec = FL.speech.recognise(st.lang, {
        onStart() { st.recording = true; mic.classList.add('recording'); mic.innerHTML = icon('square'); mic.setAttribute('aria-label', 'Stop recording'); setStatus('<div class="row"><div class="waves"><i></i><i></i><i></i><i></i><i></i></div><span>Listening… speak now</span></div>'); },
        onResult(text) { got = text; tr.textContent = text; },
        onError(err) {
          const msg = { 'not-allowed': 'Microphone access was blocked. Allow it in your browser’s site settings and try again.', 'service-not-allowed': 'Microphone access was blocked by the browser.', 'no-speech': 'We didn’t hear anything — try again a little closer to the mic.', 'audio-capture': 'No microphone was found.', network: 'Speech recognition needs an internet connection.', unsupported: 'Speech recognition isn’t supported in this browser.' }[err] || 'Something went wrong with the microphone. Please try again.';
          setStatus(`<span style="color:var(--danger)">${esc(msg)}</span>`);
        },
        onEnd() {
          st.recording = false; st.rec = null;
          if (!mic.isConnected) return;
          mic.classList.remove('recording'); mic.innerHTML = icon('mic'); mic.setAttribute('aria-label', 'Record yourself');
          if (got.trim()) score(p, got);
        }
      });
    }

    function score(p, spoken) {
      const r = FL.speech.compare(p.t, spoken);
      panel.querySelectorAll('#target .w').forEach((w, i) => { w.classList.toggle('hit', r.hits[i]); w.classList.toggle('miss', !r.hits[i]); });
      const box = panel.querySelector('#score-box'); box.hidden = false;
      const sc = panel.querySelector('#score');
      sc.textContent = r.score + '%';
      sc.style.color = r.score >= 80 ? 'var(--success)' : r.score >= 50 ? 'var(--warning)' : 'var(--danger)';
      const missed = r.words.filter((w, i) => !r.hits[i]);
      panel.querySelector('#score-msg').innerHTML = r.score >= 90 ? '<strong>Excellent!</strong> Crystal clear. 🌟' : r.score >= 70 ? `<strong>Very good!</strong> Work on: ${missed.map(w => `<em>${esc(w)}</em>`).join(', ')}` : r.score >= 40 ? `<strong>Getting there.</strong> Listen again and focus on: ${missed.slice(0, 5).map(w => `<em>${esc(w)}</em>`).join(', ')}` : '<strong>Let’s try again.</strong> Listen to the slow version first.';
      setStatus('Tap the microphone to try again.');
      const key = `${st.lang}:${st.idx}`;
      FL.db.mutate(d => {
        d.stats.pronAttempts++;
        d.stats.bestPron = Math.max(d.stats.bestPron, r.score);
        d.pron[key] = Math.max(d.pron[key] || 0, r.score);
        d.homework.forEach(h => { if (/pronunciation coach/i.test(h.text)) h.done = true; });
      });
      FL.game.award(5 + (r.score >= 80 ? 5 : 0), { skill: 'speaking', amount: 2 });
      const b = panel.querySelector(`[data-phrase="${st.idx}"]`);
      if (b) {
        const best = FL.db.load().pron[key];
        let span = b.querySelector('.best');
        if (!span) { span = document.createElement('span'); span.className = 'best'; b.appendChild(span); }
        span.textContent = best + '%';
        span.style.color = best >= 80 ? 'var(--success)' : best >= 50 ? 'var(--warning)' : 'var(--danger)';
      }
    }

    function stopRec() { if (st.rec) { try { st.rec.abort(); } catch (e) { /* ignore */ } st.rec = null; st.recording = false; } }

    panel.onclick = e => {
      const t = e.target;
      const lb = t.closest('[data-plang]');
      if (lb) { stopRec(); st.lang = lb.dataset.plang; st.idx = 0; draw(); return; }
      const pb = t.closest('[data-phrase]');
      if (pb) { stopRec(); st.idx = +pb.dataset.phrase; draw(); return; }
      const mv = t.closest('[data-move]');
      if (mv) { stopRec(); st.idx = FL.util.clamp(st.idx + +mv.dataset.move, 0, FL.data.phrases[st.lang].length - 1); draw(); return; }
      const ls = t.closest('[data-listen]');
      if (ls) { stopRec(); FL.speech.speak(FL.data.phrases[st.lang][st.idx].t, st.lang, +ls.dataset.listen); return; }
      if (t.closest('#mic')) record();
    };
    draw();
    return () => { stopRec(); panel.onclick = null; };
  },

  /* ---------------------------------------------------------- Daily */
  daily(panel) {
    const { icon, esc } = FL.ui;
    const st = { lang: FL.db.load().profile.targetLang || 'en', i: 0, answers: [], qs: [], answered: false };
    let timer = null;
    let onKey = null;

    function key() { return `${FL.time.localKey()}:${st.lang}`; }
    function build() {
      const seed = FL.util.hash(key());
      const rand = FL.util.rng(seed);
      const bank = FL.data.placement[st.lang];
      st.qs = FL.util.shuffle(bank.map((q, i) => i), rand).slice(0, 5).sort((a, b) => bank[a].lvl - bank[b].lvl)
        .map(i => ({ ...bank[i], order: FL.util.shuffle(bank[i].o.map((_, k) => k), rand) }));
      st.i = 0; st.answers = []; st.answered = false;
    }
    function untilMidnight() {
      const n = new Date(); const m = new Date(n); m.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((m - n) / 1000));
      return `${Math.floor(s / 3600)}h ${FL.util.pad(Math.floor(s % 3600 / 60))}m ${FL.util.pad(s % 60)}s`;
    }
    function header() {
      return `<div class="row between row-wrap mb-2"><div class="seg" role="group" aria-label="Language">
        <button data-dlang="en" aria-pressed="${st.lang === 'en'}">English</button><button data-dlang="fr" aria-pressed="${st.lang === 'fr'}">Français</button></div>
        <span class="small muted">${icon('calendar', '')} ${FL.time.fmtDateLong(Date.now(), FL.time.browserTz())}</span></div>`;
    }
    function start() {
      clearInterval(timer);
      const done = FL.db.load().daily[key()];
      if (done) return doneView(done);
      build();
      question();
    }
    function question() {
      const q = st.qs[st.i];
      st.answered = false;
      panel.innerHTML = `<div class="quiz-wrap">${header()}
        <div class="card">
          <div class="row between"><span class="badge badge-warning">${icon('zap')} Daily challenge</span><span class="small muted">${st.i + 1} / ${st.qs.length} · ${FL.data.LEVELS[q.lvl]}</span></div>
          <div class="progress mt-2"><span style="width:${(st.i / st.qs.length) * 100}%"></span></div>
          <div class="question">${esc(q.q).replace(/_{3,}/g, '<span class="blank"></span>')}</div>
          <div class="answers">${q.order.map((oi, k) => `<button class="answer" data-a="${oi}"><span class="key">${k + 1}</span><span>${esc(q.o[oi])}</span></button>`).join('')}</div>
          <div id="dfb"></div>
        </div></div>`;
    }
    function answer(i) {
      if (st.answered) return;
      st.answered = true;
      const q = st.qs[st.i];
      const ok = i === q.a;
      st.answers.push(ok);
      panel.querySelectorAll('.answer').forEach(b => { b.disabled = true; if (+b.dataset.a === q.a) b.classList.add('correct'); else if (+b.dataset.a === i) b.classList.add('wrong'); });
      const last = st.i === st.qs.length - 1;
      panel.querySelector('#dfb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${icon(ok ? 'check-circle' : 'x-circle')}<div><strong>${ok ? 'Correct! +10 XP' : 'Not quite.'}</strong><p>${esc(q.e)}</p></div></div>
        <div class="row mt-2" style="justify-content:flex-end"><button class="btn btn-primary" data-dnext>${last ? 'Finish' : 'Next'} ${icon('arrow-right')}</button></div>`;
      panel.querySelector('[data-dnext]').focus({ preventScroll: true });
      if (ok) FL.game.award(10, { skill: 'grammar', silent: true });
    }
    function next() {
      if (st.i < st.qs.length - 1) { st.i++; question(); return; }
      const score = st.answers.filter(Boolean).length;
      const res = { score, total: st.qs.length, at: Date.now() };
      FL.db.mutate(d => { d.daily[key()] = res; d.stats.daily++; });
      FL.ui.xp(score * 10);
      FL.game.checkBadges();
      doneView(res, true);
    }
    function doneView(res, fresh) {
      const pct = Math.round(res.score / res.total * 100);
      panel.innerHTML = `<div class="quiz-wrap">${header()}<div class="card center">
        <div style="font-size:3rem">${pct === 100 ? '🏆' : pct >= 60 ? '🎉' : '💪'}</div>
        <h2 style="font-size:1.8rem">${fresh ? 'Challenge complete!' : 'Today’s challenge is done'}</h2>
        <p class="muted">You scored <strong>${res.score} / ${res.total}</strong> and earned <strong>${res.score * 10} XP</strong>.</p>
        <div class="panel mt-2 mb-3" style="display:inline-block;padding:14px 24px"><div class="tiny muted">Next challenge in</div><div class="timer-display" style="font-size:1.8rem" id="countdown">${untilMidnight()}</div></div>
        <div class="row row-wrap" style="justify-content:center"><a class="btn btn-primary" href="#/practice?tab=cards">${icon('layers')} Review flashcards</a><button class="btn" data-dlang="${st.lang === 'en' ? 'fr' : 'en'}">Try the ${st.lang === 'en' ? 'French' : 'English'} challenge</button></div>
      </div></div>`;
      clearInterval(timer);
      timer = setInterval(() => { const c = panel.querySelector('#countdown'); if (!c) return clearInterval(timer); c.textContent = untilMidnight(); }, 1000);
    }
    panel.onclick = e => {
      const lb = e.target.closest('[data-dlang]');
      if (lb) { st.lang = lb.dataset.dlang; start(); return; }
      const a = e.target.closest('[data-a]');
      if (a) { answer(+a.dataset.a); return; }
      if (e.target.closest('[data-dnext]')) next();
    };
    onKey = e => {
      if (!st.qs.length || !panel.querySelector('.answers') || e.target.matches('input, textarea, select') || document.querySelector('.modal-backdrop')) return;
      if (!st.answered && /^[1-4]$/.test(e.key)) { const b = panel.querySelectorAll('.answer')[+e.key - 1]; if (b) b.click(); }
    };
    document.addEventListener('keydown', onKey);
    start();
    return () => { clearInterval(timer); document.removeEventListener('keydown', onKey); panel.onclick = null; };
  }
};
