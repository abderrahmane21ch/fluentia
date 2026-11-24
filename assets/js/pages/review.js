/* ==========================================================================
   Fluentia — Review: vocabulary (spaced repetition) and speaking practice
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.review = {
  title: 'Review',
  render(p, q) {
    const { icon } = FL.ui;
    const tab = q.tab === 'speak' ? 'speak' : 'words';
    return `
    <section class="page-head"><div class="container">
      <div class="crumbs"><a href="#/">Home</a><span>/</span><span>Review</span></div>
      <h1>Review</h1>
      <p>Ten minutes a day is enough. Words from every lesson you open are added here and come back just before you would forget them.</p>
    </div></section>
    <section class="section-tight"><div class="container">
      <div class="tabs" role="tablist">
        <button class="tab" role="tab" data-tab="words" aria-selected="${tab === 'words'}">${icon('layers')} Vocabulary</button>
        <button class="tab" role="tab" data-tab="speak" aria-selected="${tab === 'speak'}">${icon('mic')} Speaking</button>
      </div>
      <div id="panel"></div>
    </div></section>`;
  },
  mount(root, p, q) {
    const panel = root.querySelector('#panel');
    let cleanup = null;
    const self = this;
    function show(tab) {
      if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
      FL.speech.stop();
      root.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
      cleanup = (tab === 'speak' ? self.speak : self.words)(panel) || null;
      history.replaceState(null, '', '#/review' + (tab === 'speak' ? '?tab=speak' : ''));
    }
    root.querySelector('.tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) show(b.dataset.tab); });
    show(q.tab === 'speak' ? 'speak' : 'words');
    return () => { if (cleanup) cleanup(); };
  },

  /* ------------------------------------------------------------ Vocabulary */
  words(panel) {
    const { icon, esc } = FL.ui;
    let session = null;

    function decksView() {
      const d = FL.db.load();
      const levelDecks = FL.course.allLevels().map(l => ({ id: l.key, title: `${FL.course.title(l)} — ${l.name}`, lang: l.lang, stats: FL.srs.deckStats(l.key, d) })).filter(x => x.stats.total > 0);
      const mine = { id: 'my-words', title: 'My words', stats: FL.srs.deckStats('my-words', d) };
      const due = FL.srs.totalDue(d);
      const card = dk => {
        const s = dk.stats;
        const study = s.due + Math.min(10, s.fresh);
        return `<div class="card deck-card">
          <div class="row between"><h3 class="mb-0" style="font-size:1.1rem">${esc(dk.title)}</h3>${s.due ? `<span class="tag warn">${s.due} due</span>` : ''}</div>
          <div class="stats"><span><b>${s.total}</b> words</span><span><b>${s.fresh}</b> new</span><span><b>${s.learned}</b> learned</span></div>
          <div class="progress good"><span style="width:${s.total ? (s.learned / s.total) * 100 : 0}%"></span></div>
          <div class="row wrap">${study ? `<button type="button" class="btn btn-primary btn-sm" data-study="${dk.id}">Study ${study}</button>` : '<span class="small" style="color:var(--good)">All done for today</span>'}
            ${s.total ? `<button type="button" class="btn btn-quiet btn-sm" data-cram="${dk.id}">Practise all</button>` : ''}</div></div>`;
      };
      panel.innerHTML = `
        <div class="row between wrap mb-2"><p class="mb-0">${due ? `<strong>${due} ${due === 1 ? 'word is' : 'words are'} due today.</strong>` : 'Nothing is due right now.'} <span class="muted">Rate each card honestly — the schedule adapts to you.</span></p></div>
        ${levelDecks.length ? `<div class="grid g-3">${levelDecks.map(card).join('')}</div>` : `<div class="empty">${icon('layers')}<p class="mt-1">Open a lesson and its key vocabulary will appear here automatically.</p><a class="btn btn-primary btn-sm" href="#/courses">Go to the courses</a></div>`}
        <h2 class="mt-4" style="font-size:1.4rem">My words</h2>
        <div class="grid g-2" style="align-items:start">
          ${card(mine)}
          <form class="card" id="add-word">
            <h3 style="font-size:1.1rem">Add a word</h3>
            <div class="grid g-2" style="gap:0 12px">
              <div class="field"><label for="w-front">Word or phrase</label><input id="w-front" class="input" maxlength="80" required></div>
              <div class="field"><label for="w-back">Meaning</label><input id="w-back" class="input" maxlength="120" required></div>
            </div>
            <div class="row between"><select id="w-lang" class="select select-sm" aria-label="Language"><option value="en">English</option><option value="fr">French</option></select>
              <button class="btn btn-primary btn-sm" type="submit">${icon('plus')} Add</button></div>
          </form>
        </div>
        ${FL.db.load().myWords.length ? `<div class="table-wrap mt-2"><table class="table"><thead><tr><th>Word</th><th>Meaning</th><th></th></tr></thead><tbody>
          ${FL.db.load().myWords.slice().reverse().map(w => `<tr><td class="term">${esc(w.front)}</td><td>${esc(w.back)}</td><td style="text-align:right;white-space:nowrap">
            <button type="button" class="icon-btn sm" data-say="${esc(w.front)}" data-lang="${w.lang || 'en'}" aria-label="Listen">${icon('volume')}</button>
            <button type="button" class="icon-btn sm" data-del="${w.id}" aria-label="Delete ${esc(w.front)}">${icon('trash')}</button></td></tr>`).join('')}</tbody></table></div>` : ''}`;
      panel.querySelector('#add-word').addEventListener('submit', e => {
        e.preventDefault();
        const f = panel.querySelector('#w-front').value.trim(), b = panel.querySelector('#w-back').value.trim();
        if (!f || !b) return;
        FL.db.mutate(d => { d.myWords.push({ id: FL.util.uid('w_'), lang: panel.querySelector('#w-lang').value, front: f, back: b, at: Date.now() }); });
        FL.ui.toast(`“${f}” added.`, 'success', 2000);
        decksView();
        const inp = panel.querySelector('#w-front'); if (inp) inp.focus();
      });
    }

    function study(deckId, cram) {
      const cards = cram ? FL.util.shuffle(FL.srs.allCards(deckId)) : FL.srs.queue(deckId);
      if (!cards.length) return decksView();
      const lv = FL.course.levelByKey(deckId);
      session = { cram, queue: cards.slice(), total: cards.length, done: 0, flipped: false, again: 0, title: lv ? FL.course.title(lv) : 'My words' };
      drawCard();
    }
    function drawCard() {
      const c = session.queue[0];
      if (!c) return summary();
      const st = FL.db.load().cards[c.id];
      const labels = ['Again', 'Hard', 'Good', 'Easy'];
      panel.innerHTML = `<div class="flash-stage">
        <div class="row between"><button type="button" class="btn btn-quiet btn-sm" data-end>${icon('arrow-left')} ${esc(session.title)}</button><span class="small muted">${session.done} / ${session.total}${session.cram ? ' · practice mode' : ''}</span></div>
        <div class="progress mt-1"><span style="width:${(session.done / session.total) * 100}%"></span></div>
        <div class="flashcard ${session.flipped ? 'flipped' : ''}" tabindex="0" role="button" aria-label="${esc(c.front)}. Press space to show the meaning." data-flip>
          <div class="flashcard-inner">
            <div class="face"><button type="button" class="icon-btn listen" data-say="${esc(c.front)}" data-lang="${c.lang}" aria-label="Listen">${icon('volume')}</button>
              <div class="term">${esc(c.front)}</div><div class="src">${esc(c.source)}</div></div>
            <div class="face back"><button type="button" class="icon-btn listen" data-say="${esc(c.front)}" data-lang="${c.lang}" aria-label="Listen">${icon('volume')}</button>
              <div class="small muted">${esc(c.front)}</div><div class="meaning">${esc(c.back)}</div></div>
          </div>
        </div>
        <div class="rate-row" ${session.flipped ? '' : 'hidden'}>${['again', 'hard', 'good', 'easy'].map((k, i) => `<button type="button" class="rate ${k}" data-rate="${i}">${labels[i]}<small>${session.cram ? `key ${i + 1}` : FL.srs.previewLabel(st, i)}</small></button>`).join('')}</div>
        ${session.flipped ? '' : '<button type="button" class="btn btn-primary btn-block btn-lg" data-flip-btn>Show meaning</button>'}
        <p class="tiny muted center mt-2"><span class="kbd">Space</span> show · <span class="kbd">1</span>–<span class="kbd">4</span> rate · <span class="kbd">L</span> listen</p></div>`;
    }
    function flip() {
      if (!session || session.flipped) return;
      session.flipped = true;
      panel.querySelector('.flashcard').classList.add('flipped');
      const rr = panel.querySelector('.rate-row'); rr.hidden = false;
      const fb = panel.querySelector('[data-flip-btn]'); if (fb) fb.remove();
      rr.querySelector('.good').focus({ preventScroll: true });
    }
    function rate(g) {
      if (!session || !session.flipped) return;
      const c = session.queue.shift();
      if (!session.cram) FL.srs.rate(c.id, g);
      if (g === 0) { session.queue.push(c); session.again++; } else session.done++;
      FL.game.award(1);
      session.flipped = false;
      drawCard();
    }
    function summary() {
      panel.innerHTML = `<div class="card center" style="max-width:560px;margin:0 auto">
        <h2>Session complete</h2>
        <p class="muted">You reviewed ${FL.util.plural(session.total, 'word')}${session.again ? `, with ${FL.util.plural(session.again, 'repeat')}` : ''}.</p>
        <p class="small muted">${session.cram ? 'Practice mode does not change your review schedule.' : 'Each word is now scheduled for its next review.'}</p>
        <div class="row wrap" style="justify-content:center"><button type="button" class="btn btn-primary" data-end>Back to my decks</button><a class="btn" href="#/courses">Continue a lesson</a></div></div>`;
      session = null;
    }
    panel.onclick = e => {
      const t = e.target;
      const s = t.closest('[data-say]'); if (s) { e.stopPropagation(); FL.speech.speak(s.dataset.say, s.dataset.lang); return; }
      if (t.closest('[data-study]')) return study(t.closest('[data-study]').dataset.study, false);
      if (t.closest('[data-cram]')) return study(t.closest('[data-cram]').dataset.cram, true);
      if (t.closest('[data-end]')) { session = null; return decksView(); }
      if (t.closest('[data-flip]') || t.closest('[data-flip-btn]')) return flip();
      if (t.closest('[data-rate]')) return rate(+t.closest('[data-rate]').dataset.rate);
      const del = t.closest('[data-del]');
      if (del) { FL.db.mutate(d => { d.myWords = d.myWords.filter(w => w.id !== del.dataset.del); delete d.cards[del.dataset.del]; }); decksView(); }
    };
    const onKey = e => {
      if (!session || e.target.matches('input, textarea, select') || document.querySelector('.modal-backdrop')) return;
      if (e.key === ' ' && !session.flipped) { e.preventDefault(); flip(); }
      else if (/^[1-4]$/.test(e.key)) rate(+e.key - 1);
      else if (e.key.toLowerCase() === 'l') { const c = session.queue[0]; if (c) FL.speech.speak(c.front, c.lang); }
    };
    document.addEventListener('keydown', onKey);
    decksView();
    return () => { document.removeEventListener('keydown', onKey); panel.onclick = null; };
  },

  /* -------------------------------------------------------------- Speaking */
  phrases(level) {
    const out = [], seen = new Set();
    const add = (t, lesson) => { const k = t.trim(); if (k.split(' ').length < 3 || seen.has(k)) return; seen.add(k); out.push({ t: k, lesson }); };
    level.lessons.forEach(l => {
      l.slides.forEach(s => { if (s.t === 'examples') s.items.forEach(i => add(i[0].replace(/\*\*/g, ''), l)); if (s.t === 'dialogue') s.lines.forEach(x => add(x[1], l)); });
      l.practice.forEach(x => { if (x[0] === 'listen' || x[0] === 'order') add(x[1], l); });
    });
    return out;
  },
  speak(panel) {
    const { icon, esc } = FL.ui;
    const d0 = FL.db.load();
    const st = { lang: d0.profile.lang || 'en', level: null, idx: 0, rec: null, recording: false };
    st.level = (d0.profile.levels && d0.profile.levels[st.lang]) ? String(d0.profile.levels[st.lang]).toLowerCase() : 'a1';
    const supported = FL.speech.canRecognise();
    const self = FL.pages.review;

    function level() { return FL.course.level(st.lang, st.level) || FL.content[st.lang].levels[0]; }
    function draw() {
      const lv = level();
      const list = self.phrases(lv);
      st.idx = FL.util.clamp(st.idx, 0, list.length - 1);
      const p = list[st.idx];
      const d = FL.db.load();
      panel.innerHTML = `
        <div class="row wrap mb-3">
          <div class="seg" role="group" aria-label="Language"><button type="button" data-plang="en" aria-pressed="${st.lang === 'en'}">English</button><button type="button" data-plang="fr" aria-pressed="${st.lang === 'fr'}">French</button></div>
          <select class="select select-sm" id="sp-level" aria-label="Level">${FL.content[st.lang].levels.map(l => `<option value="${l.id}" ${l.id === lv.id ? 'selected' : ''}>${l.code} — ${esc(l.name)}</option>`).join('')}</select>
          <span class="small muted">${list.length} sentences from this level</span>
        </div>
        <div class="speak-grid">
          <div class="phrase-list">${list.map((x, i) => { const b = d.pron[`${lv.key}:${FL.util.hash(x.t)}`]; return `<button type="button" class="phrase" data-phrase="${i}" aria-pressed="${i === st.idx}"><span>${esc(x.t)}</span>${b != null ? `<span class="best" style="color:${b >= 80 ? 'var(--good)' : b >= 50 ? 'var(--warn)' : 'var(--bad)'}">${b}%</span>` : ''}</button>`; }).join('')}</div>
          <div class="card">
            <div class="row between wrap"><span class="tag brand">${esc(FL.course.title(lv))} · Lesson ${p.lesson.n}</span><span class="small muted">${st.idx + 1} / ${list.length}</span></div>
            <div class="target" id="target">${p.t.split(/\s+/).map(w => `<span class="w">${esc(w)}</span>`).join(' ')}</div>
            <div class="row wrap" style="gap:18px">
              <button type="button" class="mic" id="mic" ${supported ? '' : 'disabled'} aria-label="Record yourself">${icon('mic')}</button>
              <div style="flex:1;min-width:220px">
                <div class="row wrap"><button type="button" class="btn btn-sm" data-listen="0.92">${icon('volume')} Listen</button><button type="button" class="btn btn-sm" data-listen="0.65">Slowly</button>
                  <button type="button" class="btn btn-quiet btn-sm" data-move="-1" ${st.idx === 0 ? 'disabled' : ''}>${icon('chevron-left')} Previous</button><button type="button" class="btn btn-quiet btn-sm" data-move="1" ${st.idx === list.length - 1 ? 'disabled' : ''}>Next ${icon('chevron-right')}</button></div>
                <p class="small muted mt-1 mb-0" id="mic-status">${supported ? 'Listen first, then press the microphone and read the sentence aloud.' : 'Speech recognition is not available in this browser. Use Chrome, Edge or Safari to be scored — you can still listen and repeat.'}</p>
              </div>
            </div>
            <div class="mt-3"><div class="label mb-1">What we heard</div><div class="transcript" id="transcript" aria-live="polite">—</div></div>
            <div class="row mt-3" id="score-box" hidden><div class="score-big" id="score"></div><div class="small" id="score-msg"></div></div>
          </div>
        </div>`;
    }
    function status(html) { const s = panel.querySelector('#mic-status'); if (s) s.innerHTML = html; }
    function stopRec() { if (st.rec) { try { st.rec.abort(); } catch (e) { /* ignore */ } st.rec = null; st.recording = false; } }
    function record() {
      if (st.recording) { if (st.rec) st.rec.stop(); return; }
      FL.speech.stop();
      const lv = level();
      const p = self.phrases(lv)[st.idx];
      const mic = panel.querySelector('#mic'), tr = panel.querySelector('#transcript');
      let got = '';
      st.rec = FL.speech.recognise(st.lang, {
        onStart() { st.recording = true; mic.classList.add('rec'); mic.innerHTML = icon('square'); status('Listening… speak now.'); },
        onResult(text) { got = text; tr.textContent = text; },
        onError(err) {
          const m = { 'not-allowed': 'Microphone access is blocked. Allow it in your browser settings and try again.', 'no-speech': 'Nothing was heard. Try again, a little closer to the microphone.', 'audio-capture': 'No microphone was found.', network: 'Speech recognition needs an internet connection.' }[err] || 'The microphone could not be used. Please try again.';
          status(`<span style="color:var(--bad)">${esc(m)}</span>`);
        },
        onEnd() {
          st.recording = false; st.rec = null;
          if (!mic.isConnected) return;
          mic.classList.remove('rec'); mic.innerHTML = icon('mic');
          if (got.trim()) score(lv, p, got);
        }
      });
    }
    function score(lv, p, spoken) {
      const r = FL.speech.compare(p.t, spoken);
      panel.querySelectorAll('#target .w').forEach((w, i) => { w.classList.toggle('hit', r.hits[i]); w.classList.toggle('miss', !r.hits[i]); });
      panel.querySelector('#score-box').hidden = false;
      const sc = panel.querySelector('#score');
      sc.textContent = r.score + '%';
      sc.style.color = r.score >= 80 ? 'var(--good)' : r.score >= 50 ? 'var(--warn)' : 'var(--bad)';
      const missed = r.words.filter((w, i) => !r.hits[i]);
      panel.querySelector('#score-msg').innerHTML = r.score >= 90 ? '<strong>Excellent.</strong> Very clear.' : r.score >= 60 ? `<strong>Good.</strong> Work on: ${missed.map(w => `<em>${esc(w)}</em>`).join(', ')}` : '<strong>Try again.</strong> Listen to the slow version first.';
      status('Press the microphone to try again.');
      const key = `${lv.key}:${FL.util.hash(p.t)}`;
      FL.db.mutate(d => { d.stats.pronAttempts++; d.stats.bestPron = Math.max(d.stats.bestPron, r.score); d.pron[key] = Math.max(d.pron[key] || 0, r.score); });
      FL.game.award(2);
    }
    panel.onclick = e => {
      const t = e.target;
      const lb = t.closest('[data-plang]'); if (lb) { stopRec(); st.lang = lb.dataset.plang; st.level = FL.content[st.lang].levels[0].id; st.idx = 0; draw(); return; }
      const pb = t.closest('[data-phrase]'); if (pb) { stopRec(); st.idx = +pb.dataset.phrase; draw(); return; }
      const mv = t.closest('[data-move]'); if (mv) { stopRec(); st.idx += +mv.dataset.move; draw(); return; }
      const ls = t.closest('[data-listen]'); if (ls) { stopRec(); FL.speech.speak(self.phrases(level())[st.idx].t, st.lang, +ls.dataset.listen); return; }
      if (t.closest('#mic')) record();
    };
    panel.onchange = e => { if (e.target.id === 'sp-level') { stopRec(); st.level = e.target.value; st.idx = 0; draw(); } };
    draw();
    return () => { stopRec(); panel.onclick = null; panel.onchange = null; };
  }
};
