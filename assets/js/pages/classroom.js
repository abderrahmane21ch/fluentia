/* ==========================================================================
   Fluentia — Virtual classroom: whiteboard, notes, vocabulary, timer
   ========================================================================== */
window.FL = window.FL || {};
FL.pages = FL.pages || {};

FL.pages.classroom = {
  title(params) { return params.id === 'demo' ? 'Classroom demo' : 'Classroom'; },
  render(params) {
    const { icon, esc } = FL.ui;
    const isDemo = params.id === 'demo';
    const user = FL.auth.current();
    if (!isDemo && !user) {
      return `<section class="section"><div class="container center" style="max-width:520px"><div class="icon-tile" style="margin:0 auto 16px">${icon('video')}</div>
        <h1 style="font-size:2rem">Sign in to open your classroom</h1><p class="muted">Each lesson has a private classroom with your whiteboard, notes and vocabulary.</p>
        <div class="row row-wrap" style="justify-content:center"><a class="btn btn-primary" href="#/login?next=${encodeURIComponent('/classroom/' + params.id)}">Sign in</a><a class="btn" href="#/classroom/demo">Try the demo classroom</a></div></div></section>`;
    }
    const b = isDemo ? null : FL.db.myBookings().find(x => x.id === params.id);
    if (!isDemo && !b) {
      return `<section class="section"><div class="container center" style="max-width:520px"><h1 style="font-size:2rem">Classroom not found</h1><p class="muted">This lesson doesn’t exist or belongs to another account.</p><a class="btn btn-primary" href="#/dashboard">Back to dashboard</a></div></section>`;
    }
    const t = b ? FL.schedule.lessonType(b.type) : null;
    const c = b ? FL.data.courses.find(x => x.id === b.courseId) : null;
    const st = b ? FL.db.bookingStatus(b) : 'demo';
    const badge = { demo: '<span class="badge badge-warning">Demo</span>', upcoming: `<span class="badge badge-primary">${icon('clock')} Starts ${FL.time.relative(b ? b.start : 0)}</span>`, live: `<span class="badge badge-danger">${icon('video')} Live now</span>`, completed: `<span class="badge badge-success">${icon('check')} Completed</span>`, cancelled: '<span class="badge">Cancelled</span>' }[st];
    const colors = ['#1b1a22', '#4f46e5', '#f26b5b', '#0f9f6e', '#d98a06'];
    return `
    <section class="section" style="padding-top:28px"><div class="container">
      <div class="class-top">
        <div>
          <div class="crumbs mb-1"><a href="#/${user ? 'dashboard' : ''}">${user ? 'Dashboard' : 'Home'}</a><span>/</span><span>Classroom</span></div>
          <h1 style="font-size:clamp(1.5rem,3vw,2.1rem);margin:0">${isDemo ? 'Virtual classroom — demo' : `${esc(t.name)}${c ? ' · ' + esc(c.title) : ''}`}</h1>
          <div class="row row-wrap mt-1" style="gap:8px">${badge}<span class="small muted">${isDemo ? 'Everything here works and is saved in your browser.' : `${FL.time.fmtDateLong(b.start)} · ${FL.time.fmtTime(b.start)}–${FL.time.fmtTime(b.end)}`}</span></div>
        </div>
        <div class="row row-wrap">
          <a class="btn btn-primary" href="${esc(FL.config.teacher.meetingLink)}" target="_blank" rel="noopener">${icon('video')} Join video call</a>
        </div>
      </div>
      <div class="class-grid">
        <div class="card board-wrap">
          <div class="board-tools" role="toolbar" aria-label="Whiteboard tools">
            <button class="tool-btn" data-tool="pen" aria-pressed="true" title="Pen (P)" aria-label="Pen">${icon('pen')}</button>
            <button class="tool-btn" data-tool="highlighter" aria-pressed="false" title="Highlighter (H)" aria-label="Highlighter">${icon('line')}</button>
            <button class="tool-btn" data-tool="text" aria-pressed="false" title="Text (T)" aria-label="Text">${icon('type')}</button>
            <button class="tool-btn" data-tool="eraser" aria-pressed="false" title="Eraser (E)" aria-label="Eraser">${icon('eraser')}</button>
            <span class="sep"></span>
            ${colors.map((col, i) => `<button class="swatch" data-color="${col}" style="background:${col}" aria-pressed="${i === 0}" aria-label="Colour ${col}"></button>`).join('')}
            <span class="sep"></span>
            <label class="row small" style="gap:6px">Size <input type="range" min="1" max="12" value="3" id="b-size" aria-label="Brush size" style="width:80px;accent-color:var(--primary)"></label>
            <span style="margin-left:auto"></span>
            <button class="tool-btn" data-board="undo" title="Undo (Ctrl+Z)" aria-label="Undo">${icon('undo')}</button>
            <button class="tool-btn" data-board="clear" title="Clear board" aria-label="Clear board">${icon('trash')}</button>
            <button class="tool-btn" data-board="download" title="Download as PNG" aria-label="Download board">${icon('download')}</button>
          </div>
          <canvas class="board-canvas" id="board" aria-label="Shared whiteboard"></canvas>
        </div>
        <div class="stack">
          <div class="card card-pad-sm">
            <div class="tabs" role="tablist" style="margin-bottom:14px">
              <button class="tab" role="tab" data-ctab="notes" aria-selected="true">${icon('book')} Notes</button>
              <button class="tab" role="tab" data-ctab="vocab" aria-selected="false">${icon('star')} Vocabulary</button>
              <button class="tab" role="tab" data-ctab="timer" aria-selected="false">${icon('clock')} Timer</button>
            </div>
            <div data-cpanel="notes">
              <textarea class="textarea" id="notes" style="min-height:300px" placeholder="Lesson notes, corrections and useful phrases…" aria-label="Lesson notes"></textarea>
              <div class="row between mt-1"><span class="tiny muted" id="notes-status">Autosaves as you type</span><button class="btn btn-ghost btn-sm" data-dl-notes>${icon('download')} .txt</button></div>
            </div>
            <div data-cpanel="vocab" hidden>
              <form id="vocab-form" class="stack">
                <input class="input" name="front" maxlength="80" placeholder="New word or phrase" aria-label="Word" required>
                <input class="input" name="back" maxlength="120" placeholder="Meaning / translation" aria-label="Meaning" required>
                <div class="row"><select class="select select-sm" name="lang" aria-label="Language"><option value="en">English</option><option value="fr">French</option></select>
                <button class="btn btn-primary btn-sm" type="submit" style="margin-left:auto">${icon('plus')} Save as flashcard</button></div>
              </form>
              <ul class="vocab-list mt-2" id="vocab-list"></ul>
              <a class="btn btn-soft btn-sm btn-block mt-2" href="#/practice?tab=cards">${icon('layers')} Study these flashcards</a>
            </div>
            <div data-cpanel="timer" hidden>
              <div class="timer-display" id="timer">00:00</div>
              <div class="row row-wrap mt-2" style="justify-content:center">
                <button class="btn btn-primary btn-sm" data-timer="toggle">${icon('play')} Start</button>
                <button class="btn btn-sm" data-timer="reset">${icon('repeat')} Reset</button>
              </div>
              <div class="row row-wrap mt-2" style="justify-content:center;gap:6px">${[2, 5, 10, 25].map(m => `<button class="chip" data-preset="${m}">${m} min</button>`).join('')}<button class="chip" data-preset="lesson">Lesson</button></div>
              <p class="tiny muted center mt-2 mb-0">Use it for timed speaking tasks (e.g. IELTS Part 2 = 2 min).</p>
            </div>
          </div>
          <div class="card card-pad-sm">
            <h4 class="mb-1">${icon('info', '')} In this classroom</h4>
            <ul class="check-list small"><li>${icon('check')}<span>Board, notes and words are saved automatically</span></li><li>${icon('check')}<span>Saved words become spaced-repetition flashcards</span></li><li>${icon('check')}<span>Download the board and notes after class</span></li></ul>
          </div>
        </div>
      </div>
    </div></section>`;
  },
  mount(root, params) {
    const canvas = root.querySelector('#board');
    if (!canvas) return;
    const { icon, esc } = FL.ui;
    const id = params.id;
    const isDemo = id === 'demo';
    const booking = isDemo ? null : FL.db.myBookings().find(x => x.id === id);
    const lessonMin = booking ? FL.schedule.lessonType(booking.type).minutes : 50;

    /* ---------------- Seed demo content (first visit) */
    let data = FL.db.load();
    if (isDemo && !data.boards.demo) {
      FL.db.mutate(d => {
        d.boards.demo = [
          { type: 'text', x: 0.04, y: 0.1, text: 'Present perfect = have / has + past participle', color: '#4f46e5', size: 6 },
          { type: 'text', x: 0.04, y: 0.24, text: '✔ I have lived in KL since 2019.', color: '#0f9f6e', size: 4 },
          { type: 'text', x: 0.04, y: 0.36, text: '✖ I have went to Paris.  →  I went / I have been', color: '#f26b5b', size: 4 },
          { type: 'text', x: 0.04, y: 0.55, text: 'for + period (3 years)   ·   since + point (2019)', color: '#1b1a22', size: 4 }
        ];
        if (!d.notes.demo) d.notes.demo = 'Topic: Present perfect vs past simple\n\n• Use present perfect for life experience and unfinished time.\n• Use past simple with finished time words (yesterday, in 2020, last week).\n\nCorrections:\n• "I have went" → "I went" / "I have been"\n\nHomework: write 5 sentences about things you have done this year.';
      });
      data = FL.db.load();
    }

    /* ---------------- Whiteboard */
    const ctx = canvas.getContext('2d');
    let items = Array.isArray(data.boards[id]) ? data.boards[id] : [];
    const tool = { name: 'pen', color: '#1b1a22', size: 3 };
    let drawing = null;
    let W = 0, H = 0;

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    }
    function drawItem(c, it) {
      c.save();
      if (it.type === 'text') {
        c.globalCompositeOperation = 'source-over';
        c.fillStyle = it.color;
        c.font = `600 ${Math.max(12, (it.size * 4 + 6) * (W / 800))}px Inter, Arial, sans-serif`;
        c.textBaseline = 'top';
        c.fillText(it.text, it.x * W, it.y * H);
      } else {
        c.globalCompositeOperation = it.tool === 'eraser' ? 'destination-out' : 'source-over';
        c.globalAlpha = it.tool === 'highlighter' ? 0.32 : 1;
        c.strokeStyle = it.color;
        c.lineWidth = it.tool === 'highlighter' ? it.size * 4 : it.tool === 'eraser' ? it.size * 5 : it.size;
        c.lineCap = 'round'; c.lineJoin = 'round';
        const pts = it.points;
        c.beginPath();
        c.moveTo(pts[0][0] * W, pts[0][1] * H);
        if (pts.length === 1) c.lineTo(pts[0][0] * W + 0.1, pts[0][1] * H);
        for (let i = 1; i < pts.length - 1; i++) {
          const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
          c.quadraticCurveTo(pts[i][0] * W, pts[i][1] * H, mx * W, my * H);
        }
        if (pts.length > 1) c.lineTo(pts[pts.length - 1][0] * W, pts[pts.length - 1][1] * H);
        c.stroke();
      }
      c.restore();
    }
    function redraw() {
      ctx.clearRect(0, 0, W, H);
      items.forEach(it => drawItem(ctx, it));
      if (drawing) drawItem(ctx, drawing);
    }
    const saveBoard = FL.util.debounce(() => { FL.db.mutate(d => { d.boards[id] = items; }); }, 400);
    function pos(e) { const r = canvas.getBoundingClientRect(); return [FL.util.clamp((e.clientX - r.left) / r.width, 0, 1), FL.util.clamp((e.clientY - r.top) / r.height, 0, 1)]; }

    canvas.addEventListener('pointerdown', e => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const p = pos(e);
      if (tool.name === 'text') { addText(p); return; }
      canvas.setPointerCapture(e.pointerId);
      drawing = { type: 'stroke', tool: tool.name, color: tool.color, size: tool.size, points: [p] };
      redraw();
    });
    canvas.addEventListener('pointermove', e => {
      if (!drawing) return;
      const p = pos(e);
      const last = drawing.points[drawing.points.length - 1];
      if (Math.hypot((p[0] - last[0]) * W, (p[1] - last[1]) * H) < 1.5) return;
      drawing.points.push([+p[0].toFixed(4), +p[1].toFixed(4)]);
      redraw();
    });
    const end = () => {
      if (!drawing) return;
      items.push(drawing); drawing = null;
      if (items.length > 400) items = items.slice(-400);
      redraw(); saveBoard();
    };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('lostpointercapture', end);

    function addText(p) {
      FL.ui.modal({
        title: 'Add text to the board',
        body: `<div class="field mb-0"><label for="bt">Text</label><input id="bt" class="input" maxlength="80" placeholder="e.g. Phrasal verb: to give up"></div>`,
        actions: [{ label: 'Cancel', className: 'btn-ghost' }, {
          label: 'Add', className: 'btn-primary', onClick({ el }) {
            const v = el.querySelector('#bt').value.trim();
            if (!v) return false;
            items.push({ type: 'text', x: +p[0].toFixed(4), y: +p[1].toFixed(4), text: v, color: tool.color, size: Math.max(3, tool.size) });
            redraw(); saveBoard();
          }
        }],
        onMount({ el, close }) { el.querySelector('#bt').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); el.querySelector('.modal-foot .btn-primary').click(); } }); }
      });
    }
    function setTool(name) {
      tool.name = name;
      root.querySelectorAll('[data-tool]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool === name)));
      canvas.style.cursor = name === 'text' ? 'text' : name === 'eraser' ? 'cell' : 'crosshair';
    }
    function exportPng() {
      const out = document.createElement('canvas');
      out.width = canvas.width; out.height = canvas.height;
      const o = out.getContext('2d');
      o.fillStyle = '#ffffff'; o.fillRect(0, 0, out.width, out.height);
      o.drawImage(canvas, 0, 0);
      FL.ui.download(`${FL.config.brand}-board-${isDemo ? 'demo' : FL.time.dayKey(booking.start)}.png`, out.toDataURL('image/png'));
    }

    /* ---------------- Notes */
    const notes = root.querySelector('#notes');
    const ns = root.querySelector('#notes-status');
    notes.value = data.notes[id] || '';
    const saveNotes = FL.util.debounce(() => {
      const prevWords = (FL.db.load().notes[id] || '').split(/\s+/).filter(Boolean).length;
      const words = notes.value.split(/\s+/).filter(Boolean).length;
      FL.db.mutate(d => { d.notes[id] = notes.value.slice(0, 20000); if (words > prevWords) d.skills.writing += Math.min(5, words - prevWords) / 5; });
      ns.textContent = `Saved · ${FL.time.fmtTime(Date.now(), FL.time.browserTz())}`;
    }, 600);
    notes.addEventListener('input', () => { ns.textContent = 'Saving…'; saveNotes(); });

    /* ---------------- Vocabulary */
    function drawVocab() {
      const words = FL.db.load().myWords.filter(w => w.lesson === id);
      root.querySelector('#vocab-list').innerHTML = words.length ? words.map(w => `<li><span><strong>${esc(w.front)}</strong> — ${esc(w.back)}</span>
        <button class="icon-btn" data-say="${esc(w.front)}" data-lang="${w.lang}" aria-label="Listen">${icon('volume')}</button>
        <button class="icon-btn" data-del="${w.id}" aria-label="Remove ${esc(w.front)}">${icon('trash')}</button></li>`).join('')
        : '<li class="muted" style="background:none;padding:4px 0">No words saved in this lesson yet.</li>';
    }
    root.querySelector('#vocab-form').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const front = f.front.value.trim(), back = f.back.value.trim();
      if (!front || !back) return;
      FL.db.mutate(d => { d.myWords.push({ id: FL.util.uid('w_'), lang: f.lang.value, front, back, example: '', lesson: id, at: Date.now() }); });
      FL.game.award(3, { skill: 'vocabulary' });
      f.front.value = ''; f.back.value = ''; f.front.focus();
      drawVocab();
    });

    /* ---------------- Timer */
    const tm = { total: lessonMin * 60, left: lessonMin * 60, running: false, int: null };
    function fmtT(s) { return `${FL.util.pad(Math.floor(s / 60))}:${FL.util.pad(s % 60)}`; }
    function drawTimer() {
      root.querySelector('#timer').textContent = fmtT(tm.left);
      const tb = root.querySelector('[data-timer="toggle"]');
      tb.innerHTML = tm.running ? `${icon('pause')} Pause` : `${icon('play')} ${tm.left < tm.total ? 'Resume' : 'Start'}`;
    }
    function beep() {
      try {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        const ac = new AC(); const o = ac.createOscillator(); const g = ac.createGain();
        o.connect(g); g.connect(ac.destination); o.frequency.value = 880; g.gain.value = 0.08;
        o.start(); o.stop(ac.currentTime + 0.5); setTimeout(() => ac.close(), 800);
      } catch (e) { /* ignore */ }
    }
    function toggleTimer() {
      if (tm.running) { clearInterval(tm.int); tm.running = false; }
      else {
        if (tm.left <= 0) tm.left = tm.total;
        tm.running = true;
        tm.int = setInterval(() => {
          tm.left--;
          if (tm.left <= 0) { tm.left = 0; clearInterval(tm.int); tm.running = false; beep(); FL.ui.toast('Time’s up!', 'info'); }
          drawTimer();
        }, 1000);
      }
      drawTimer();
    }

    /* ---------------- Events */
    root.addEventListener('click', e => {
      const t = e.target;
      const tl = t.closest('[data-tool]'); if (tl) return setTool(tl.dataset.tool);
      const sw = t.closest('[data-color]');
      if (sw) { tool.color = sw.dataset.color; root.querySelectorAll('[data-color]').forEach(b => b.setAttribute('aria-pressed', String(b === sw))); if (tool.name === 'eraser') setTool('pen'); return; }
      const bd = t.closest('[data-board]');
      if (bd) {
        const a = bd.dataset.board;
        if (a === 'undo') { items.pop(); redraw(); saveBoard(); }
        if (a === 'download') exportPng();
        if (a === 'clear') FL.ui.confirm({ title: 'Clear the whiteboard?', body: 'This removes everything on the board. It can’t be undone.', confirmLabel: 'Clear board', danger: true }).then(ok => { if (ok) { items = []; redraw(); saveBoard(); } });
        return;
      }
      const ct = t.closest('[data-ctab]');
      if (ct) {
        root.querySelectorAll('[data-ctab]').forEach(b => b.setAttribute('aria-selected', String(b === ct)));
        root.querySelectorAll('[data-cpanel]').forEach(p => { p.hidden = p.dataset.cpanel !== ct.dataset.ctab; });
        return;
      }
      if (t.closest('[data-dl-notes]')) { FL.ui.download(`${FL.config.brand}-notes-${isDemo ? 'demo' : FL.time.dayKey(booking.start)}.txt`, notes.value || '(empty)'); return; }
      const say = t.closest('[data-say]'); if (say) { FL.speech.speak(say.dataset.say, say.dataset.lang); return; }
      const del = t.closest('[data-del]');
      if (del) { FL.db.mutate(d => { d.myWords = d.myWords.filter(w => w.id !== del.dataset.del); delete d.cards[del.dataset.del]; }); drawVocab(); return; }
      const tb = t.closest('[data-timer]');
      if (tb) { if (tb.dataset.timer === 'toggle') toggleTimer(); else { clearInterval(tm.int); tm.running = false; tm.left = tm.total; drawTimer(); } return; }
      const pr = t.closest('[data-preset]');
      if (pr) { clearInterval(tm.int); tm.running = false; tm.total = tm.left = (pr.dataset.preset === 'lesson' ? lessonMin : +pr.dataset.preset) * 60; drawTimer(); }
    });
    root.querySelector('#b-size').addEventListener('input', e => { tool.size = +e.target.value; });
    const onKey = e => {
      if (e.target.matches('input, textarea, select') || document.querySelector('.modal-backdrop')) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); items.pop(); redraw(); saveBoard(); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const map = { p: 'pen', h: 'highlighter', t: 'text', e: 'eraser' };
      if (map[e.key.toLowerCase()]) setTool(map[e.key.toLowerCase()]);
    };
    document.addEventListener('keydown', onKey);

    let ro = null;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(() => resize()); ro.observe(canvas); } else window.addEventListener('resize', resize);
    resize();
    drawVocab();
    drawTimer();
    if (isDemo && !FL.auth.current()) setTimeout(() => canvas.isConnected && FL.ui.toast('This is a live demo — draw on the board, take notes and save words!', 'info', 4500), 500);

    return () => {
      clearInterval(tm.int);
      document.removeEventListener('keydown', onKey);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
      if (drawing) end();
    };
  }
};
