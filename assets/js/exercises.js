/* ==========================================================================
   Fluentia — exercise engine
   Exercise formats (compact arrays in the content files):
     ['choice', question, [correct, ...distractors], explanation]
     ['gap',    'Text with ___ blank', answer | [answers], explanation]
     ['match',  instruction, [[left, right], ...]]
     ['order',  'Sentence to rebuild.', translation?]
     ['listen', 'Sentence to dictate.']
   ========================================================================== */
window.FL = window.FL || {};

FL.ex = (function () {
  const { icon, esc } = FL.ui;
  const LABEL = { choice: 'Multiple choice', gap: 'Fill in the gap', match: 'Matching', order: 'Build the sentence', listen: 'Dictation' };

  /* ----------------------------------------------------------- Helpers */
  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/[‘’`´]/g, "'").replace(/[«»“”]/g, '"')
      .replace(/\s+([.,!?;:])/g, '$1').replace(/[.!?;:,]+$/g, '')
      .replace(/\s+/g, ' ').trim();
  }
  function bare(s) { return norm(s).replace(/[.,!?;:"—-]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function noAccents(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').replace(/æ/g, 'ae'); }
  function tokens(sentence) {
    const m = sentence.trim().match(/^(.*?)(\s*[.!?]+)?$/);
    return { words: m[1].split(/\s+/).filter(Boolean), end: m[2] || '' };
  }

  function normalize(raw, lang) {
    const item = build(raw, lang);
    if (item) item.raw = raw;
    return item;
  }
  function build(raw, lang) {
    const [type] = raw;
    if (type === 'choice') return { type, lang, q: raw[1], correct: raw[2][0], options: FL.util.shuffle(raw[2]), explain: raw[3] || '' };
    if (type === 'gap') return { type, lang, q: raw[1], answers: Array.isArray(raw[2]) ? raw[2] : [raw[2]], explain: raw[3] || '' };
    if (type === 'match') return { type, lang, q: raw[1], pairs: raw[2] };
    if (type === 'order') return { type, lang, q: 'Put the words in the right order.', sentence: raw[1], hint: raw[2] || '' };
    if (type === 'listen') return { type, lang, q: 'Listen and type what you hear.', sentence: raw[1] };
    return null;
  }
  function correctText(item) {
    if (item.type === 'choice') return item.correct;
    if (item.type === 'gap') return item.answers[0];
    if (item.type === 'match') return item.pairs.map(p => `${p[0]} → ${p[1]}`).join(' · ');
    return item.sentence;
  }
  function questionText(item) {
    if (item.type === 'order') return item.hint ? `Build: “${item.hint}”` : 'Build the sentence';
    if (item.type === 'listen') return 'Dictation';
    return item.q;
  }

  /* --------------------------------------------------------- Renderers */
  // Each renderer returns { ready(): bool, check(): { ok, given, note } }.
  function renderChoice(box, item, onChange) {
    box.innerHTML = `<div class="choices" role="group">${item.options.map((o, i) => `<button type="button" class="choice" data-i="${i}" aria-pressed="false"><span class="key">${i + 1}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
    let picked = -1;
    box.querySelectorAll('.choice').forEach(b => b.addEventListener('click', () => {
      picked = +b.dataset.i;
      box.querySelectorAll('.choice').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      onChange(true);
    }));
    return {
      ready: () => picked >= 0,
      key(k) { const b = box.querySelectorAll('.choice')[k - 1]; if (b) b.click(); },
      check() {
        const given = item.options[picked];
        const ok = given === item.correct;
        box.querySelectorAll('.choice').forEach(b => {
          b.disabled = true;
          const v = item.options[+b.dataset.i];
          if (v === item.correct) b.classList.add('correct');
          else if (+b.dataset.i === picked) b.classList.add('wrong');
        });
        return { ok, given };
      }
    };
  }

  function renderGap(box, item, onChange, submit) {
    box.innerHTML = `<input class="input gap-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="Type your answer">`;
    const input = box.querySelector('input');
    input.addEventListener('input', () => onChange(input.value.trim().length > 0));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    setTimeout(() => input.focus({ preventScroll: true }), 30);
    return {
      ready: () => input.value.trim().length > 0,
      check() {
        const given = input.value.trim();
        const g = norm(given);
        let ok = item.answers.some(a => norm(a) === g);
        let note = '';
        if (!ok) {
          const hit = item.answers.find(a => noAccents(norm(a)) === noAccents(g));
          if (hit) { ok = true; note = `Watch the accents: <strong>${esc(hit)}</strong>`; }
        }
        input.disabled = true;
        input.classList.add(ok ? 'correct' : 'wrong');
        return { ok, given, note };
      }
    };
  }

  function renderListen(box, item, onChange, submit) {
    const can = FL.speech.supported;
    box.innerHTML = `
      <div class="listen-box">
        <button type="button" class="btn btn-primary" data-play="0.9">${icon('volume')} Play</button>
        <button type="button" class="btn" data-play="0.6">${icon('headphones')} Slowly</button>
        ${can ? '<span class="small muted">Listen as many times as you need.</span>' : `<span class="small muted">Audio isn’t available in this browser. Type this sentence: <strong>${esc(item.sentence)}</strong></span>`}
      </div>
      <input class="input gap-input" style="max-width:none" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="What you heard" placeholder="Type what you hear">`;
    const input = box.querySelector('input');
    box.querySelectorAll('[data-play]').forEach(b => b.addEventListener('click', () => { FL.speech.speak(item.sentence, item.lang, +b.dataset.play); input.focus({ preventScroll: true }); }));
    input.addEventListener('input', () => onChange(input.value.trim().length > 0));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    if (can) setTimeout(() => FL.speech.speak(item.sentence, item.lang, 0.9), 350);
    return {
      ready: () => input.value.trim().length > 0,
      check() {
        const given = input.value.trim();
        const a = bare(item.sentence), g = bare(given);
        let ok = a === g, note = '';
        if (!ok && noAccents(a) === noAccents(g)) { ok = true; note = 'Correct — but watch the accents.'; }
        input.disabled = true;
        input.classList.add(ok ? 'correct' : 'wrong');
        return { ok, given, note };
      }
    };
  }

  function renderOrder(box, item, onChange) {
    const { words, end } = tokens(item.sentence);
    let order = words.map((w, i) => i);
    if (words.length > 1) { let tries = 0; do { order = FL.util.shuffle(order); tries++; } while (order.every((v, i) => v === i) && tries < 10); }
    box.innerHTML = `<div class="order-answer" aria-live="polite"></div><div class="order-bank">${order.map(i => `<button type="button" class="token" data-i="${i}">${esc(words[i])}</button>`).join('')}</div>`;
    const ans = box.querySelector('.order-answer');
    const bank = box.querySelector('.order-bank');
    const picked = [];
    function sync() { onChange(picked.length === words.length); }
    bank.addEventListener('click', e => {
      const t = e.target.closest('.token');
      if (!t || t.disabled) return;
      picked.push(+t.dataset.i);
      t.disabled = true;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'token'; b.dataset.i = t.dataset.i; b.textContent = words[+t.dataset.i];
      ans.appendChild(b);
      sync();
    });
    ans.addEventListener('click', e => {
      const t = e.target.closest('.token');
      if (!t || ans.dataset.locked) return;
      const i = +t.dataset.i;
      picked.splice(picked.indexOf(i), 1);
      t.remove();
      const src = bank.querySelector(`.token[data-i="${i}"]`);
      if (src) src.disabled = false;
      sync();
    });
    return {
      ready: () => picked.length === words.length,
      check() {
        const given = picked.map(i => words[i]).join(' ') + end;
        const ok = norm(picked.map(i => words[i]).join(' ')) === norm(words.join(' '));
        ans.dataset.locked = '1';
        ans.classList.add(ok ? 'correct' : 'wrong');
        bank.remove();
        return { ok, given };
      }
    };
  }

  function renderMatch(box, item, onChange) {
    const left = item.pairs.map(p => p[0]);
    let rightIdx = item.pairs.map((p, i) => i);
    if (rightIdx.length > 1) { let tries = 0; do { rightIdx = FL.util.shuffle(rightIdx); tries++; } while (rightIdx.every((v, i) => v === i) && tries < 10); }
    const right = rightIdx.map(i => item.pairs[i][1]);
    const link = new Array(left.length).fill(-1); // left index -> right position
    let sel = null;
    box.innerHTML = `<p class="small muted mb-1">Select an item on the left, then its match on the right.</p>
      <div class="match"><div class="match-col">${left.map((t, i) => `<button type="button" class="match-item" data-l="${i}" aria-pressed="false">${esc(t)}</button>`).join('')}</div>
      <div class="match-col">${right.map((t, j) => `<button type="button" class="match-item" data-r="${j}" aria-pressed="false">${esc(t)}</button>`).join('')}</div></div>`;
    function paint() {
      box.querySelectorAll('[data-l]').forEach(b => {
        const i = +b.dataset.l;
        b.setAttribute('aria-pressed', String(sel === i));
        b.classList.toggle('paired', link[i] >= 0);
        b.innerHTML = esc(left[i]) + (link[i] >= 0 ? `<span class="pair-n">${i + 1}</span>` : '');
      });
      box.querySelectorAll('[data-r]').forEach(b => {
        const j = +b.dataset.r;
        const owner = link.indexOf(j);
        b.classList.toggle('paired', owner >= 0);
        b.setAttribute('aria-pressed', 'false');
        b.innerHTML = esc(right[j]) + (owner >= 0 ? `<span class="pair-n">${owner + 1}</span>` : '');
      });
      onChange(link.every(v => v >= 0));
    }
    box.addEventListener('click', e => {
      const l = e.target.closest('[data-l]'), r = e.target.closest('[data-r]');
      if (l && !l.disabled) { const i = +l.dataset.l; if (link[i] >= 0) { link[i] = -1; sel = i; } else sel = sel === i ? null : i; paint(); }
      if (r && !r.disabled) {
        const j = +r.dataset.r;
        const owner = link.indexOf(j);
        if (owner >= 0) { link[owner] = -1; paint(); return; }
        if (sel === null) { const free = link.indexOf(-1); if (free < 0) return; sel = free; }
        link[sel] = j; sel = null;
        const nextFree = link.indexOf(-1);
        if (nextFree >= 0) sel = nextFree;
        paint();
      }
    });
    sel = 0; paint();
    return {
      ready: () => link.every(v => v >= 0),
      check() {
        let all = true;
        left.forEach((t, i) => {
          const ok = right[link[i]] === item.pairs[i][1];
          if (!ok) all = false;
          const lb = box.querySelector(`[data-l="${i}"]`), rb = box.querySelector(`[data-r="${link[i]}"]`);
          lb.classList.add(ok ? 'correct' : 'wrong'); rb.classList.add(ok ? 'correct' : 'wrong');
        });
        box.querySelectorAll('.match-item').forEach(b => { b.disabled = true; });
        const given = left.map((t, i) => `${t} → ${right[link[i]]}`).join(' · ');
        return { ok: all, given };
      }
    };
  }

  const RENDER = { choice: renderChoice, gap: renderGap, listen: renderListen, order: renderOrder, match: renderMatch };

  /* ------------------------------------------------------------ Runner */
  // run(container, { items (normalized), mode: 'practice' | 'test', onFinish(result), title })
  function run(container, { items, mode = 'practice', onFinish, title = '' }) {
    let idx = 0;
    const results = [];
    let ctl = null, checked = false, onKey = null;

    function questionHtml(item) {
      if (item.type === 'gap') return esc(item.q).replace(/_{3,}/, '<span class="blank" aria-label="blank"></span>');
      if (item.type === 'order') return esc(item.q);
      return esc(item.q);
    }

    function show() {
      const item = items[idx];
      container._flItem = item; // exposed for automated tests
      checked = false;
      container.innerHTML = `
        <div class="quiz">
          <div class="quiz-top"><span class="small muted nowrap">${esc(title || (mode === 'test' ? 'Level test' : 'Practice'))} · ${idx + 1} / ${items.length}</span>
            <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${items.length}" aria-valuenow="${idx}"><span style="width:${(idx / items.length) * 100}%"></span></div></div>
          <div class="quiz-body">
            <div class="q-type">${LABEL[item.type]}</div>
            <div class="q-text" id="q-text">${questionHtml(item)}</div>
            ${item.type === 'order' && item.hint ? `<p class="q-hint">“${esc(item.hint)}”</p>` : ''}
            <div id="q-box"></div>
            <div id="q-fb" aria-live="polite"></div>
            <div class="quiz-actions">
              <button type="button" class="btn btn-quiet btn-sm" data-skip>${mode === 'test' ? 'Skip' : 'I don’t know'}</button>
              <button type="button" class="btn btn-primary" data-check disabled>Check</button>
            </div>
          </div>
        </div>`;
      const box = container.querySelector('#q-box');
      const btn = container.querySelector('[data-check]');
      ctl = RENDER[item.type](box, item, ready => { if (!checked) btn.disabled = !ready; }, () => { if (!checked && ctl.ready()) check(); else if (checked) next(); });
      btn.addEventListener('click', () => { if (!checked) check(); else next(); });
      container.querySelector('[data-skip]').addEventListener('click', () => { if (!checked) check(true); });
      if (item.type === 'choice' || item.type === 'match' || item.type === 'order') btn.focus({ preventScroll: true });
    }

    function check(skipped) {
      const item = items[idx];
      const r = skipped ? { ok: false, given: '' } : ctl.check();
      if (skipped) container.querySelectorAll('#q-box button, #q-box input').forEach(b => { b.disabled = true; });
      checked = true;
      results.push({ item, ok: r.ok, given: r.given });
      const btn = container.querySelector('[data-check]');
      btn.disabled = false;
      btn.innerHTML = idx === items.length - 1 ? `See results ${icon('arrow-right')}` : `Continue ${icon('arrow-right')}`;
      container.querySelector('[data-skip]').remove();
      if (mode === 'test') { next(); return; }
      const fb = container.querySelector('#q-fb');
      const showAnswer = !r.ok && item.type !== 'choice' && item.type !== 'match';
      fb.innerHTML = `<div class="feedback ${r.ok ? 'ok' : 'no'}"><strong>${r.ok ? 'Correct' : skipped ? 'Here is the answer' : 'Not quite'}</strong>
        ${showAnswer ? `<p>Answer: <strong>${esc(correctText(item))}</strong></p>` : ''}
        ${r.note ? `<p>${r.note}</p>` : ''}
        ${item.explain ? `<p>${esc(item.explain)}</p>` : ''}
        ${(item.type === 'listen' || item.type === 'order') ? `<p class="mt-1"><button type="button" class="btn btn-sm" data-say="${esc(item.sentence)}" data-lang="${item.lang}">${icon('volume')} Hear it again</button></p>` : ''}</div>`;
      btn.focus({ preventScroll: true });
    }

    function next() {
      if (idx < items.length - 1) { idx++; show(); window.scrollTo({ top: Math.max(0, container.getBoundingClientRect().top + window.scrollY - 90), behavior: 'auto' }); return; }
      cleanup();
      const correct = results.filter(r => r.ok).length;
      onFinish({ results, correct, total: items.length, pct: Math.round(correct / items.length * 100) });
    }

    onKey = e => {
      if (!container.isConnected) return cleanup();
      if (document.querySelector('.modal-backdrop')) return;
      const inInput = e.target.matches('input, textarea, select');
      if (!checked && !inInput && ctl && ctl.key && /^[1-6]$/.test(e.key)) { ctl.key(+e.key); return; }
      if (e.key === 'Enter' && !inInput && !e.target.closest('button')) {
        const btn = container.querySelector('[data-check]');
        if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
      }
    };
    function cleanup() { if (onKey) document.removeEventListener('keydown', onKey); onKey = null; }
    container.addEventListener('click', e => { const s = e.target.closest('[data-say]'); if (s) FL.speech.speak(s.dataset.say, s.dataset.lang, 0.9); });
    document.addEventListener('keydown', onKey);
    show();
    return { stop: cleanup };
  }

  // Shared results list for practice and tests.
  function resultList(results) {
    return `<ol class="result-list">${results.map(r => `<li><span class="${r.ok ? 'ok' : 'no'}">${icon(r.ok ? 'check' : 'x')}</span>
      <div>${esc(questionText(r.item))}${r.item.type === 'gap' || r.item.type === 'choice' ? '' : ''}
      <span class="ans">${r.ok ? `${esc(r.given)}` : `${r.given ? `Your answer: ${esc(r.given)} — ` : ''}Correct: ${esc(correctText(r.item))}`}</span></div></li>`).join('')}</ol>`;
  }

  return { normalize, run, resultList, correctText, norm, LABEL };
})();
