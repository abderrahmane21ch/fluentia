/* ==========================================================================
   Fluentia — core services: storage, events, time, auth, user data,
   gamification, scheduling and calendar export.
   ========================================================================== */
window.FL = window.FL || {};

/* ------------------------------------------------------------ Utilities */
FL.util = {
  pad: n => String(n).padStart(2, '0'),
  uid(prefix = '') {
    const rnd = (window.crypto && crypto.getRandomValues)
      ? Array.from(crypto.getRandomValues(new Uint8Array(8)), b => b.toString(16).padStart(2, '0')).join('')
      : Math.random().toString(16).slice(2) + Date.now().toString(16);
    return prefix + rnd;
  },
  // Fast deterministic string hash (cyrb53).
  hash(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  },
  // Seeded PRNG (mulberry32) — used for deterministic daily content.
  rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },
  shuffle(arr, rand = Math.random) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  clamp: (v, min, max) => Math.min(max, Math.max(min, v)),
  debounce(fn, ms = 300) {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  },
  // Deep-merge defaults into an object (only fills missing keys).
  withDefaults(obj, defaults) {
    const out = (obj && typeof obj === 'object' && !Array.isArray(obj)) ? obj : {};
    for (const k of Object.keys(defaults)) {
      const dv = defaults[k];
      if (!(k in out) || out[k] === undefined) {
        out[k] = (dv && typeof dv === 'object') ? JSON.parse(JSON.stringify(dv)) : dv;
      } else if (dv && typeof dv === 'object' && !Array.isArray(dv) && out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) {
        FL.util.withDefaults(out[k], dv);
      }
    }
    return out;
  },
  initials(name) {
    return String(name || '?').trim().split(/\s+/).slice(0, 2).map(p => p[0] || '').join('').toUpperCase() || '?';
  },
  firstName(name) { return String(name || '').trim().split(/\s+/)[0] || 'there'; },
  plural: (n, one, many) => `${n} ${n === 1 ? one : (many || one + 's')}`,
  normalizeText(s) {
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u2019'`]/g, ' ').replace(/[^a-z0-9\s-]/g, ' ').replace(/-/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
};

/* -------------------------------------------------------------- Storage */
FL.store = (function () {
  const prefix = FL.config.storagePrefix;
  const memory = {};
  let ls = null;
  try {
    const k = prefix + '__test';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    ls = window.localStorage;
  } catch (e) { ls = null; }

  function get(key, fallback) {
    try {
      const raw = ls ? ls.getItem(prefix + key) : memory[key];
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function set(key, value) {
    const raw = JSON.stringify(value);
    try {
      if (ls) ls.setItem(prefix + key, raw); else memory[key] = raw;
      return true;
    } catch (e) {
      memory[key] = raw;
      if (FL.ui && FL.ui.toast) FL.ui.toast('Storage is full — some data may not be saved.', 'error');
      return false;
    }
  }
  function remove(key) {
    try { if (ls) ls.removeItem(prefix + key); } catch (e) { /* ignore */ }
    delete memory[key];
  }
  function keys() {
    const out = [];
    if (ls) {
      for (let i = 0; i < ls.length; i++) {
        const k = ls.key(i);
        if (k && k.startsWith(prefix)) out.push(k.slice(prefix.length));
      }
    } else out.push(...Object.keys(memory));
    return out;
  }
  return { get, set, remove, keys, persistent: !!ls };
})();

/* --------------------------------------------------------------- Events */
FL.bus = (function () {
  const map = {};
  return {
    on(evt, fn) { (map[evt] = map[evt] || []).push(fn); return () => this.off(evt, fn); },
    off(evt, fn) { map[evt] = (map[evt] || []).filter(f => f !== fn); },
    emit(evt, payload) { (map[evt] || []).slice().forEach(fn => { try { fn(payload); } catch (e) { console.error(e); } }); }
  };
})();

/* ---------------------------------------------------------------- Prefs */
FL.prefs = {
  get() { return FL.util.withDefaults(FL.store.get('prefs', {}), { theme: null, currency: FL.config.currency.default, timezone: null }); },
  set(patch) { const p = Object.assign(this.get(), patch); FL.store.set('prefs', p); FL.bus.emit('prefs', p); return p; }
};

/* ----------------------------------------------------------------- Time */
FL.time = (function () {
  const pad = FL.util.pad;
  const cache = {};
  function partsFmt(tz) {
    if (!cache[tz]) {
      cache[tz] = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'short'
      });
    }
    return cache[tz];
  }
  const WD = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function parts(ts, tz) {
    const o = {};
    for (const p of partsFmt(tz).formatToParts(new Date(ts))) o[p.type] = p.value;
    return { y: +o.year, m: +o.month, d: +o.day, hh: (+o.hour) % 24, mm: +o.minute, ss: +o.second, wd: WD[o.weekday] };
  }
  function offset(ts, tz) {
    const p = parts(ts, tz);
    return Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm, p.ss) - Math.floor(ts / 1000) * 1000;
  }
  // Convert a wall-clock time in `tz` to a UTC timestamp.
  function zonedToUtc(y, m, d, hh, mm, tz) {
    const guess = Date.UTC(y, m - 1, d, hh, mm);
    const off1 = offset(guess, tz);
    let ts = guess - off1;
    const off2 = offset(ts, tz);
    if (off2 !== off1) ts = guess - off2;
    return ts;
  }
  function browserTz() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (e) { return 'UTC'; }
  }
  function isValidTz(tz) {
    if (!tz) return false;
    try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return true; } catch (e) { return false; }
  }
  // The timezone used to display lesson times for the current visitor.
  function userTz() {
    const user = FL.auth && FL.auth.current();
    const fromProfile = user ? FL.db.load().profile.timezone : null;
    const fromPrefs = FL.prefs.get().timezone;
    const tz = fromProfile || fromPrefs || browserTz();
    return isValidTz(tz) ? tz : 'UTC';
  }
  function fmt(ts, opts, tz) {
    return new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: tz || userTz() }, opts)).format(new Date(ts));
  }
  const fmtTime = (ts, tz) => new Intl.DateTimeFormat('en-US', { timeZone: tz || userTz(), hour: 'numeric', minute: '2-digit' }).format(new Date(ts));
  const fmtDate = (ts, tz) => fmt(ts, { weekday: 'short', day: 'numeric', month: 'short' }, tz);
  const fmtDateLong = (ts, tz) => fmt(ts, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }, tz);
  function dayKey(ts, tz) { const p = parts(ts, tz || userTz()); return `${p.y}-${pad(p.m)}-${pad(p.d)}`; }
  function localKey(date = new Date()) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; }
  function addDaysKey(key, n) {
    const [y, m, d] = key.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + n));
    return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
  }
  function weekdayOfKey(key) { const [y, m, d] = key.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); }
  function tzOffsetLabel(tz, ts = Date.now()) {
    try {
      const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(new Date(ts));
      const n = p.find(x => x.type === 'timeZoneName');
      if (n) return n.value.replace('GMT', 'UTC').replace(/^UTC$/, 'UTC+0');
    } catch (e) { /* older browsers */ }
    const off = Math.round(offset(ts, tz) / 60000);
    const sign = off >= 0 ? '+' : '-';
    const a = Math.abs(off);
    return `UTC${sign}${Math.floor(a / 60)}${a % 60 ? ':' + pad(a % 60) : ''}`;
  }
  function tzList() {
    let list = [];
    try { list = Intl.supportedValuesOf('timeZone'); } catch (e) { /* fallback */ }
    if (!list || !list.length) {
      list = ['UTC', 'Africa/Algiers', 'Africa/Cairo', 'Africa/Casablanca', 'America/Los_Angeles', 'America/New_York', 'America/Sao_Paulo', 'Asia/Bangkok',
        'Asia/Dubai', 'Asia/Ho_Chi_Minh', 'Asia/Hong_Kong', 'Asia/Jakarta', 'Asia/Kolkata', 'Asia/Kuala_Lumpur', 'Asia/Manila', 'Asia/Riyadh', 'Asia/Seoul',
        'Asia/Shanghai', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney', 'Europe/Berlin', 'Europe/Istanbul', 'Europe/London', 'Europe/Madrid', 'Europe/Paris'];
    }
    const extra = [browserTz(), FL.config.teacher.timezone, 'UTC'];
    extra.forEach(t => { if (t && !list.includes(t) && isValidTz(t)) list.push(t); });
    return list.slice().sort();
  }
  function relative(ts, now = Date.now()) {
    const diff = ts - now;
    const abs = Math.abs(diff);
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (abs < 60000) return diff >= 0 ? 'in less than a minute' : 'just now';
    if (abs < 3600000) return rtf.format(Math.round(diff / 60000), 'minute');
    if (abs < 86400000) return rtf.format(Math.round(diff / 3600000), 'hour');
    return rtf.format(Math.round(diff / 86400000), 'day');
  }
  function greeting(tz) {
    const h = parts(Date.now(), tz || userTz()).hh;
    return h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  }
  return { parts, offset, zonedToUtc, browserTz, isValidTz, userTz, fmt, fmtTime, fmtDate, fmtDateLong, dayKey, localKey, addDaysKey, weekdayOfKey, tzOffsetLabel, tzList, relative, greeting };
})();

/* ----------------------------------------------------------------- Auth */
FL.auth = (function () {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  async function hashPassword(password, salt) {
    const input = salt + ':' + password;
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      try {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
        return { algo: 'sha256', hash: Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, '0')).join('') };
      } catch (e) { /* fall through */ }
    }
    let h = input;
    for (let i = 0; i < 500; i++) h = FL.util.hash(h, i).toString(36) + h.length;
    return { algo: 'cyrb', hash: h };
  }
  async function verify(user, password) {
    if (user.algo === 'sha256' && !(window.crypto && crypto.subtle)) return false;
    const res = await hashPassword(password, user.salt);
    if (res.algo !== user.algo) return false;
    return res.hash === user.hash;
  }

  function users() { return FL.store.get('users', {}); }
  function saveUsers(u) { FL.store.set('users', u); }
  function current() {
    const id = FL.store.get('session', null);
    if (!id) return null;
    const u = Object.values(users()).find(x => x.id === id);
    return u || null;
  }
  function passwordScore(pw) {
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(4, s);
  }
  function validate({ name, email, password }, mode) {
    const errors = {};
    if (mode === 'register') {
      if (!name || name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
      else if (name.trim().length > 60) errors.name = 'Name is too long.';
    }
    if (!email || !EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email address.';
    if (!password) errors.password = 'Please enter a password.';
    else if (mode === 'register' && password.length < 8) errors.password = 'Use at least 8 characters.';
    return errors;
  }
  async function register({ name, email, password }) {
    const errors = validate({ name, email, password }, 'register');
    if (Object.keys(errors).length) return { ok: false, errors };
    const key = email.trim().toLowerCase();
    const all = users();
    if (all[key]) return { ok: false, errors: { email: 'An account with this email already exists. Try signing in.' } };
    const salt = FL.util.uid();
    const { algo, hash } = await hashPassword(password, salt);
    const user = { id: FL.util.uid('u_'), name: name.trim(), email: key, salt, algo, hash, createdAt: Date.now() };
    all[key] = user;
    saveUsers(all);
    FL.store.set('session', user.id);
    FL.db.initForNewUser(user);
    FL.bus.emit('auth', user);
    return { ok: true, user };
  }
  async function login({ email, password }) {
    const errors = validate({ email, password }, 'login');
    if (Object.keys(errors).length) return { ok: false, errors };
    const user = users()[email.trim().toLowerCase()];
    if (!user || !(await verify(user, password))) return { ok: false, errors: { form: 'Incorrect email or password.' } };
    FL.store.set('session', user.id);
    FL.bus.emit('auth', user);
    return { ok: true, user };
  }
  function logout() {
    FL.store.remove('session');
    FL.bus.emit('auth', null);
  }
  function updateName(name) {
    const u = current();
    if (!u) return false;
    const all = users();
    all[u.email].name = String(name).trim().slice(0, 60);
    saveUsers(all);
    FL.bus.emit('auth', all[u.email]);
    return true;
  }
  async function changePassword(oldPw, newPw) {
    const u = current();
    if (!u) return { ok: false, error: 'Not signed in.' };
    if (!(await verify(u, oldPw))) return { ok: false, error: 'Current password is incorrect.' };
    if (!newPw || newPw.length < 8) return { ok: false, error: 'New password must be at least 8 characters.' };
    const salt = FL.util.uid();
    const { algo, hash } = await hashPassword(newPw, salt);
    const all = users();
    Object.assign(all[u.email], { salt, algo, hash });
    saveUsers(all);
    return { ok: true };
  }
  function deleteAccount() {
    const u = current();
    if (!u) return;
    const all = users();
    delete all[u.email];
    saveUsers(all);
    FL.store.remove('data.' + u.id);
    FL.store.set('bookings', FL.db.allBookings().filter(b => b.userId !== u.id));
    logout();
  }
  return { register, login, logout, current, updateName, changePassword, deleteAccount, passwordScore, validate };
})();

/* ------------------------------------------------------------ User data */
FL.db = (function () {
  const DEFAULTS = {
    registered: false,
    profile: { targetLang: 'en', goal: 'conversation', level: { en: null, fr: null }, weeklyGoal: 300, timezone: null, onboarded: false, hoursPerWeek: 2, activeCourse: null, plan: null },
    credits: 0,
    trialUsed: false,
    xp: 0,
    activity: {},
    skills: { speaking: 0, listening: 0, vocabulary: 0, grammar: 0, writing: 0 },
    stats: { reviews: 0, pronAttempts: 0, bestPron: 0, daily: 0, booked: 0, completed: 0, listens: 0 },
    cards: {},
    myWords: [],
    badges: [],
    homework: [],
    notes: {},
    boards: {},
    pron: {},
    placement: {},
    daily: {},
    processed: [],
    transactions: []
  };

  function uid() { const u = FL.auth.current(); return u ? u.id : 'guest'; }
  function load(id = uid()) { return FL.util.withDefaults(FL.store.get('data.' + id, {}), DEFAULTS); }
  function save(data, id = uid()) { FL.store.set('data.' + id, data); }
  function mutate(fn, id = uid()) {
    const d = load(id);
    const r = fn(d);
    save(d, id);
    FL.bus.emit('data', d);
    return r === undefined ? d : r;
  }

  function initForNewUser(user) {
    const guest = load('guest');
    const hasGuestProgress = guest.xp > 0 || Object.keys(guest.cards).length || guest.myWords.length || Object.keys(guest.placement).length;
    const d = hasGuestProgress ? guest : load(user.id);
    d.registered = true;
    d.profile.timezone = FL.prefs.get().timezone || FL.time.browserTz();
    d.homework = [
      { id: FL.util.uid('hw_'), text: 'Take the placement test to find your CEFR level', done: Object.keys(d.placement).length > 0, link: '#/placement' },
      { id: FL.util.uid('hw_'), text: 'Book your free 25-minute trial lesson', done: false, link: '#/book?type=trial' },
      { id: FL.util.uid('hw_'), text: 'Review 10 flashcards in the Practice hub', done: false, link: '#/practice?tab=cards' },
      { id: FL.util.uid('hw_'), text: 'Record yourself in the Pronunciation coach', done: false, link: '#/practice?tab=speak' }
    ];
    save(d, user.id);
    if (hasGuestProgress) FL.store.remove('data.guest');
    FL.game.checkBadges(user.id, true);
  }

  // Bookings are global so that one student's lesson blocks the slot for everyone.
  function allBookings() { return FL.store.get('bookings', []); }
  function saveBookings(list) { FL.store.set('bookings', list); FL.bus.emit('bookings', list); }
  function myBookings() {
    const u = FL.auth.current();
    if (!u) return [];
    return allBookings().filter(b => b.userId === u.id).sort((a, b) => a.start - b.start);
  }
  function bookingStatus(b, now = Date.now()) {
    if (b.status === 'cancelled') return 'cancelled';
    if (now >= b.end) return 'completed';
    if (now >= b.start) return 'live';
    return 'upcoming';
  }

  // Award XP etc. for lessons that have finished since last visit.
  function processCompletedLessons() {
    const u = FL.auth.current();
    if (!u) return;
    const done = myBookings().filter(b => bookingStatus(b) === 'completed');
    const d = load();
    const fresh = done.filter(b => !d.processed.includes(b.id));
    if (!fresh.length) return;
    mutate(dd => {
      fresh.forEach(b => {
        dd.processed.push(b.id);
        dd.stats.completed++;
        dd.homework.unshift({ id: FL.util.uid('hw_'), text: `Review your notes and vocabulary from the ${FL.time.fmtDate(b.start)} lesson`, done: false, link: `#/classroom/${b.id}` });
      });
    });
    fresh.forEach(() => FL.game.award(100, { skill: 'speaking', amount: 5, silent: true }));
  }

  return { load, save, mutate, uid, initForNewUser, allBookings, saveBookings, myBookings, bookingStatus, processCompletedLessons, DEFAULTS };
})();

/* --------------------------------------------------------- Gamification */
FL.game = (function () {
  function streak(d) {
    const today = FL.time.localKey();
    let key = d.activity[today] ? today : FL.time.addDaysKey(today, -1);
    let n = 0;
    while (d.activity[key]) { n++; key = FL.time.addDaysKey(key, -1); }
    return n;
  }
  function weekXp(d) {
    const today = FL.time.localKey();
    let sum = 0;
    for (let i = 0; i < 7; i++) sum += d.activity[FL.time.addDaysKey(today, -i)] || 0;
    return sum;
  }
  function level(xp) {
    const lvl = Math.floor(Math.sqrt(xp / 50)) + 1;
    const cur = 50 * Math.pow(lvl - 1, 2), next = 50 * Math.pow(lvl, 2);
    return { lvl, cur, next, pct: Math.round(((xp - cur) / (next - cur)) * 100) };
  }
  function award(xp, opts = {}) {
    const d = FL.db.mutate(dd => {
      dd.xp += xp;
      const k = FL.time.localKey();
      dd.activity[k] = (dd.activity[k] || 0) + xp;
      if (opts.skill) dd.skills[opts.skill] = (dd.skills[opts.skill] || 0) + (opts.amount || 1);
    });
    if (!opts.silent && xp > 0 && FL.ui) FL.ui.xp(xp);
    checkBadges();
    return d;
  }
  function checkBadges(id, quiet) {
    const d = FL.db.load(id);
    const s = { streak: streak(d) };
    const fresh = FL.data.badges.filter(b => !d.badges.includes(b.id) && b.test(d, s));
    if (!fresh.length) return;
    FL.db.mutate(dd => { fresh.forEach(b => dd.badges.push(b.id)); }, id);
    if (FL.ui) fresh.forEach((b, i) => setTimeout(() => FL.ui.toast(`<b>Badge unlocked: ${b.icon} ${FL.ui.esc(b.name)}</b>${FL.ui.esc(b.desc)}`, 'badge-t', 4500, true), quiet ? 400 + i * 300 : i * 300));
  }
  function wordOfDay(lang) {
    const list = FL.data.words[lang];
    const day = Math.floor(Date.now() / 86400000);
    return list[day % list.length];
  }
  return { streak, weekXp, level, award, checkBadges, wordOfDay };
})();

/* ---------------------------------------------------------- Flashcards */
FL.srs = (function () {
  const DAY = 86400000;
  function allCards(deckId) {
    if (deckId === 'my-words') {
      return FL.db.load().myWords.map(w => ({ id: w.id, deck: 'my-words', lang: w.lang || 'en', front: w.front, back: w.back, example: w.example || '' }));
    }
    const deck = FL.data.decks.find(x => x.id === deckId);
    if (!deck) return [];
    return deck.cards.map((c, i) => ({ id: `${deck.id}-${i}`, deck: deck.id, lang: deck.lang, front: c[0], back: c[1], example: c[2] }));
  }
  function deckStats(deckId, d = FL.db.load(), now = Date.now()) {
    const cards = allCards(deckId);
    let due = 0, fresh = 0, learned = 0;
    cards.forEach(c => {
      const s = d.cards[c.id];
      if (!s) fresh++;
      else { if (s.due <= now) due++; if (s.interval >= 7) learned++; }
    });
    return { total: cards.length, due, fresh, learned };
  }
  function queue(deckId, newLimit = 10) {
    const d = FL.db.load();
    const now = Date.now();
    const cards = allCards(deckId);
    const due = cards.filter(c => d.cards[c.id] && d.cards[c.id].due <= now).sort((a, b) => d.cards[a.id].due - d.cards[b.id].due);
    const fresh = cards.filter(c => !d.cards[c.id]).slice(0, newLimit);
    return due.concat(fresh);
  }
  // SM-2 with 4 buttons: 0 again, 1 hard, 2 good, 3 easy
  function next(state, grade) {
    const s = Object.assign({ ef: 2.5, interval: 0, reps: 0 }, state || {});
    const q = [1, 3, 4, 5][grade];
    if (q < 3) {
      s.reps = 0; s.interval = 0;
      s.due = Date.now() + 60 * 1000;
    } else {
      s.reps += 1;
      if (s.reps === 1) s.interval = grade === 3 ? 4 : 1;
      else if (s.reps === 2) s.interval = grade === 3 ? 8 : grade === 1 ? 3 : 6;
      else s.interval = Math.max(1, Math.round(s.interval * s.ef * (grade === 1 ? 0.8 : grade === 3 ? 1.3 : 1)));
      s.due = Date.now() + s.interval * DAY;
    }
    s.ef = Math.max(1.3, s.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    return s;
  }
  function previewLabel(state, grade) {
    const n = next(state, grade);
    if (n.interval === 0) return '<1 min';
    return n.interval === 1 ? '1 day' : n.interval < 31 ? `${n.interval} days` : `${Math.round(n.interval / 30)} mo`;
  }
  function rate(cardId, grade) {
    FL.db.mutate(d => {
      d.cards[cardId] = next(d.cards[cardId], grade);
      d.stats.reviews++;
    });
    return FL.db.load().cards[cardId];
  }
  return { allCards, deckStats, queue, next, rate, previewLabel };
})();

/* ---------------------------------------------------------- Scheduling */
FL.schedule = (function () {
  const cfg = FL.config;
  function lessonType(id) { return cfg.lessonTypes.find(t => t.id === id) || cfg.lessonTypes[1]; }
  // Returns available {start,end} slots for a lesson type.
  function slots(typeId, { now = Date.now(), excludeId = null } = {}) {
    const type = lessonType(typeId);
    const tz = cfg.teacher.timezone;
    const cell = cfg.booking.cellMinutes;
    const need = Math.ceil(type.minutes / cell);
    const p = FL.time.parts(now, tz);
    const booked = FL.db.allBookings().filter(b => b.status !== 'cancelled' && b.id !== excludeId);
    const earliest = now + cfg.booking.minNoticeHours * 3600000;
    const out = [];
    for (let i = 0; i < cfg.booking.windowDays; i++) {
      const dt = new Date(Date.UTC(p.y, p.m - 1, p.d + i));
      const y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1, d = dt.getUTCDate(), wd = dt.getUTCDay();
      for (const [a, b] of (cfg.availability[wd] || [])) {
        const [ah, am] = a.split(':').map(Number);
        const [bh, bm] = b.split(':').map(Number);
        const startMin = ah * 60 + am, endMin = bh * 60 + bm;
        const cells = [];
        for (let t = startMin; t + cell <= endMin; t += cell) {
          const ts = FL.time.zonedToUtc(y, m, d, Math.floor(t / 60), t % 60, tz);
          const busy = (FL.util.hash(`${y}-${m}-${d}-${t}`, 7) % 100) < cfg.booking.busyPercent;
          const clash = booked.some(bk => ts < bk.end && ts + cell * 60000 > bk.start);
          cells.push({ ts, free: !busy && !clash });
        }
        for (let c = 0; c + need <= cells.length; c++) {
          let ok = true;
          for (let k = 0; k < need; k++) if (!cells[c + k].free) { ok = false; break; }
          if (!ok || cells[c].ts < earliest) continue;
          out.push({ start: cells[c].ts, end: cells[c].ts + type.minutes * 60000 });
        }
      }
    }
    return out;
  }
  function isStillFree(start, typeId, excludeId) {
    return slots(typeId, { excludeId }).some(s => s.start === start);
  }
  function book({ start, typeId, courseId, note, rescheduleId }) {
    const u = FL.auth.current();
    if (!u) return { ok: false, error: 'Please sign in to book.' };
    const type = lessonType(typeId);
    if (!isStillFree(start, typeId, rescheduleId)) return { ok: false, error: 'Sorry, that time was just taken. Please pick another slot.' };
    const d = FL.db.load();
    let cost = type.credits;
    if (rescheduleId) cost = 0;
    if (type.once && d.trialUsed && !rescheduleId) return { ok: false, error: 'You have already used your free trial lesson.' };
    if (cost > d.credits) return { ok: false, error: 'not-enough-credits', need: cost - d.credits };
    const list = FL.db.allBookings();
    if (rescheduleId) {
      const old = list.find(b => b.id === rescheduleId && b.userId === u.id);
      if (old) { old.status = 'cancelled'; old.cancelledAt = Date.now(); old.rescheduledTo = true; }
    }
    const booking = {
      id: FL.util.uid('bk_'), userId: u.id, type: type.id, courseId: courseId || null, start, end: start + type.minutes * 60000,
      note: String(note || '').slice(0, 500), status: 'upcoming', createdAt: Date.now(), credits: rescheduleId ? (list.find(b => b.id === rescheduleId) || {}).credits || 0 : type.credits
    };
    list.push(booking);
    FL.db.saveBookings(list);
    FL.db.mutate(dd => {
      dd.credits -= cost;
      if (type.once) dd.trialUsed = true;
      if (!rescheduleId) dd.stats.booked++;
      if (cost) dd.transactions.unshift({ id: FL.util.uid('tx_'), at: Date.now(), kind: 'use', credits: -cost, label: `${type.name} \u00b7 ${FL.time.fmtDate(start)}` });
      const hw = dd.homework.find(h => /trial lesson/i.test(h.text));
      if (hw && type.id === 'trial') hw.done = true;
    });
    if (!rescheduleId) FL.game.award(20, { silent: true });
    else FL.game.checkBadges();
    return { ok: true, booking };
  }
  function cancel(id) {
    const u = FL.auth.current();
    const list = FL.db.allBookings();
    const b = list.find(x => x.id === id && u && x.userId === u.id);
    if (!b || b.status === 'cancelled') return { ok: false };
    const refundable = b.start - Date.now() >= cfg.booking.cancelHours * 3600000;
    b.status = 'cancelled'; b.cancelledAt = Date.now();
    FL.db.saveBookings(list);
    FL.db.mutate(d => {
      if (refundable && b.credits) {
        d.credits += b.credits;
        d.transactions.unshift({ id: FL.util.uid('tx_'), at: Date.now(), kind: 'refund', credits: b.credits, label: `Refund \u00b7 cancelled ${FL.time.fmtDate(b.start)}` });
      }
      if (refundable && b.type === 'trial') d.trialUsed = false;
    });
    return { ok: true, refunded: refundable ? b.credits : 0 };
  }
  return { slots, book, cancel, lessonType, isStillFree };
})();

/* --------------------------------------------------- Calendar export */
FL.cal = (function () {
  function stamp(ts) { return new Date(ts).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
  function escIcs(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
  function details(b) {
    const type = FL.schedule.lessonType(b.type);
    const course = FL.data.courses.find(c => c.id === b.courseId);
    const title = `${FL.config.brand}: ${type.name}${course ? ' \u2014 ' + course.title : ''}`;
    const base = location.href.split('#')[0];
    const desc = `Your ${type.minutes}-minute lesson with ${FL.config.teacher.name}.\n\nJoin the call: ${FL.config.teacher.meetingLink}\nVirtual classroom: ${base}#/classroom/${b.id}` + (b.note ? `\n\nFocus: ${b.note}` : '');
    return { title, desc };
  }
  function ics(b) {
    const { title, desc } = details(b);
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fluentia//Lessons//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT', `UID:${b.id}@fluentia`, `DTSTAMP:${stamp(Date.now())}`, `DTSTART:${stamp(b.start)}`, `DTEND:${stamp(b.end)}`,
      `SUMMARY:${escIcs(title)}`, `DESCRIPTION:${escIcs(desc)}`, `LOCATION:${escIcs(FL.config.teacher.meetingLink)}`,
      'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY', 'DESCRIPTION:Lesson starts in 15 minutes', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'
    ];
    return lines.join('\r\n');
  }
  function google(b) {
    const { title, desc } = details(b);
    const qs = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${stamp(b.start)}/${stamp(b.end)}`, details: desc, location: FL.config.teacher.meetingLink });
    return 'https://calendar.google.com/calendar/render?' + qs.toString();
  }
  return { ics, google };
})();

/* --------------------------------------------------------------- Money */
FL.money = {
  format(usd, currency) {
    const c = currency || FL.prefs.get().currency;
    const rate = FL.config.currency.rates[c] || 1;
    const value = Math.round(usd * rate);
    try {
      return new Intl.NumberFormat('en', { style: 'currency', currency: c, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    } catch (e) { return `${c} ${Math.round(value)}`; }
  }
};

/* ------------------------------------------------------------- Speech */
FL.speech = (function () {
  const synth = window.speechSynthesis;
  let voices = [];
  function loadVoices() { try { voices = synth ? synth.getVoices() : []; } catch (e) { voices = []; } }
  if (synth) { loadVoices(); if ('onvoiceschanged' in synth) synth.onvoiceschanged = loadVoices; }
  const LANG = { en: 'en-GB', fr: 'fr-FR' };
  function pickVoice(lang) {
    const code = LANG[lang] || lang;
    return voices.find(v => v.lang === code) || voices.find(v => v.lang && v.lang.toLowerCase().startsWith(code.slice(0, 2)));
  }
  function speak(text, lang = 'en', rate = 0.95) {
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
      if (FL.ui) FL.ui.toast('Text-to-speech is not supported in this browser.', 'error');
      return false;
    }
    try {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = LANG[lang] || lang;
      const v = pickVoice(lang);
      if (v) u.voice = v;
      u.rate = rate;
      synth.speak(u);
      FL.db.mutate(d => { d.stats.listens++; d.skills.listening++; });
      return true;
    } catch (e) { return false; }
  }
  function stop() { try { synth && synth.cancel(); } catch (e) { /* ignore */ } }
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  function canRecognise() { return !!Recognition; }
  function recognise(lang, { onStart, onResult, onError, onEnd } = {}) {
    if (!Recognition) { onError && onError('unsupported'); return null; }
    const r = new Recognition();
    r.lang = LANG[lang] || lang;
    r.interimResults = true;
    r.maxAlternatives = 3;
    r.continuous = false;
    let finalText = '';
    r.onstart = () => onStart && onStart();
    r.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText += res[0].transcript; else interim += res[0].transcript;
      }
      onResult && onResult(finalText || interim, !!finalText);
    };
    r.onerror = e => onError && onError(e.error || 'error');
    r.onend = () => onEnd && onEnd(finalText);
    try { r.start(); } catch (e) { onError && onError('busy'); return null; }
    return r;
  }
  // Word-level alignment (LCS) between target and spoken transcript.
  function compare(target, spoken) {
    const tWords = target.split(/\s+/).filter(Boolean);
    const tNorm = tWords.map(w => FL.util.normalizeText(w)).map(w => w.split(' ').filter(Boolean));
    const flatT = []; const owner = [];
    tNorm.forEach((parts, i) => parts.forEach(p => { flatT.push(p); owner.push(i); }));
    const s = FL.util.normalizeText(spoken).split(' ').filter(Boolean);
    const n = flatT.length, m = s.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = flatT[i] === s[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const hitFlat = new Array(n).fill(false);
    let i = 0, j = 0;
    while (i < n && j < m) {
      if (flatT[i] === s[j]) { hitFlat[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
    }
    const wordHit = tWords.map((_, wi) => {
      const idx = owner.map((o, k) => o === wi ? k : -1).filter(k => k >= 0);
      return idx.length === 0 ? true : idx.every(k => hitFlat[k]);
    });
    const scored = owner.length ? Math.round(hitFlat.filter(Boolean).length / n * 100) : 0;
    const extra = Math.max(0, m - dp[0][0]);
    const score = Math.max(0, Math.min(100, scored - Math.min(15, extra * 3)));
    return { words: tWords, hits: wordHit, score };
  }
  return { speak, stop, canRecognise, recognise, compare, supported: !!synth };
})();
