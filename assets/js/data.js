/* ==========================================================================
   Fluentia — course registry and shared learning content.
   Lessons live in assets/js/content/<lang>-<level>.js and register
   themselves with FL.addLevel().
   ========================================================================== */
window.FL = window.FL || {};

FL.data = {};
FL.data.LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
FL.data.LEVEL_INFO = {
  'Pre-A1': { name: 'Starter', can: ['Recognise some familiar words', 'Ready to start from the basics'] },
  A1: { name: 'Beginner', can: ['Introduce yourself and others', 'Ask and answer simple personal questions', 'Understand everyday expressions'] },
  A2: { name: 'Elementary', can: ['Describe your background and routine', 'Handle simple everyday transactions', 'Talk about past events in simple terms'] },
  B1: { name: 'Intermediate', can: ['Deal with most travel situations', 'Describe experiences, dreams and plans', 'Give reasons and explanations for opinions'] },
  B2: { name: 'Upper-intermediate', can: ['Interact fluently with native speakers', 'Understand complex texts on concrete and abstract topics', 'Argue a point of view with pros and cons'] },
  C1: { name: 'Advanced', can: ['Express ideas fluently and spontaneously', 'Use language flexibly for social, academic and professional purposes', 'Produce clear, well-structured detailed text'] },
  C2: { name: 'Proficient', can: ['Understand virtually everything heard or read', 'Express yourself with precision in complex situations'] }
};

/* ---------------------------------------------------------- Course registry */
FL.content = {
  en: { lang: 'en', name: 'English', native: 'English', speech: 'en-GB', levels: [],
    intro: 'Clear grammar, useful vocabulary and lots of speaking practice — from your first "hello" to confident, natural English.' },
  fr: { lang: 'fr', name: 'French', native: 'Français', speech: 'fr-FR', levels: [],
    intro: 'Explanations in simple English with authentic French examples, audio for every sentence and plenty of practice.' }
};
FL.lessonIndex = {};

FL.addLevel = function (lang, level) {
  const course = FL.content[lang];
  level.lang = lang;
  level.id = level.code.toLowerCase();
  level.key = `${lang}-${level.id}`;
  level.lessons.forEach((lesson, i) => {
    lesson.n = i + 1;
    lesson.id = `${level.key}-${i + 1}`;
    lesson.lang = lang;
    lesson.levelKey = level.key;
    FL.lessonIndex[lesson.id] = lesson;
  });
  course.levels.push(level);
  course.levels.sort((a, b) => FL.data.LEVELS.indexOf(a.code) - FL.data.LEVELS.indexOf(b.code));
};

FL.course = {
  langs() { return ['en', 'fr']; },
  get(lang) { return FL.content[lang] || null; },
  level(lang, id) {
    const c = FL.content[lang];
    return c ? c.levels.find(l => l.id === String(id).toLowerCase()) || null : null;
  },
  levelByKey(key) { const [lang, id] = String(key).split('-'); return this.level(lang, id); },
  lesson(id) { return FL.lessonIndex[id] || null; },
  levelOf(lesson) { return this.levelByKey(lesson.levelKey); },
  next(lesson) {
    const lv = this.levelOf(lesson);
    return lv.lessons[lesson.n] || null;
  },
  prev(lesson) {
    const lv = this.levelOf(lesson);
    return lesson.n > 1 ? lv.lessons[lesson.n - 2] : null;
  },
  allLevels() { return [...FL.content.en.levels, ...FL.content.fr.levels]; },
  allLessons() { return Object.values(FL.lessonIndex); },
  title(level) { return `${FL.content[level.lang].name} ${level.code}`; },
  exerciseCount(lesson) { return lesson.practice.length; }
};

/* ---------------------------------------------------------- Placement bank */
// lvl: 0=A1 … 4=C1 — the correct answer is always listed first and shuffled at display time.
FL.data.placement = {
  en: [
    { lvl: 0, q: 'She ___ a teacher.', o: ['is', 'are', 'am', 'be'], a: 0, e: 'With he / she / it we use "is".' },
    { lvl: 0, q: 'I ___ from Malaysia.', o: ['am', 'is', 'are', 'be'], a: 0, e: '"I" always takes "am".' },
    { lvl: 0, q: 'There ___ two books on the table.', o: ['are', 'is', 'am', 'be'], a: 0, e: 'Plural nouns (two books) take "there are".' },
    { lvl: 0, q: 'What is the opposite of "hot"?', o: ['cold', 'warm', 'big', 'fast'], a: 0, e: 'Hot ↔ cold.' },
    { lvl: 1, q: 'I ___ to the cinema last weekend.', o: ['went', 'go', 'have gone', 'going'], a: 0, e: '"Last weekend" is a finished time, so we use the past simple.' },
    { lvl: 1, q: 'He is ___ than his brother.', o: ['taller', 'more tall', 'tallest', 'the tallest'], a: 0, e: 'Short adjectives form the comparative with -er.' },
    { lvl: 1, q: 'We ___ dinner when the phone rang.', o: ['were having', 'had', 'have', 'are having'], a: 0, e: 'Past continuous for an action in progress, interrupted by a past simple action.' },
    { lvl: 1, q: 'How ___ sugar do you need?', o: ['much', 'many', 'a lot', 'few'], a: 0, e: '"Sugar" is uncountable, so we ask "how much".' },
    { lvl: 2, q: 'If it rains tomorrow, we ___ at home.', o: ['will stay', 'would stay', 'stayed', 'stay'], a: 0, e: 'First conditional: if + present, will + verb.' },
    { lvl: 2, q: 'I have lived here ___ 2019.', o: ['since', 'for', 'from', 'during'], a: 0, e: '"Since" + a point in time; "for" + a period.' },
    { lvl: 2, q: 'The report ___ by the manager yesterday.', o: ['was written', 'wrote', 'has written', 'is writing'], a: 0, e: 'Passive voice in the past: was/were + past participle.' },
    { lvl: 2, q: 'She asked me where ___.', o: ['I lived', 'did I live', 'do I live', 'I am live'], a: 0, e: 'Reported questions use statement word order and move one tense back.' },
    { lvl: 3, q: 'If I ___ about the traffic, I would have left earlier.', o: ['had known', 'knew', 'have known', 'would know'], a: 0, e: 'Third conditional: if + past perfect, would have + past participle.' },
    { lvl: 3, q: 'By the time we arrived, the film ___.', o: ['had already started', 'already started', 'has already started', 'was already start'], a: 0, e: 'Past perfect for the earlier of two past actions.' },
    { lvl: 3, q: 'Which word is closest in meaning to "put off" (a meeting)?', o: ['postpone', 'cancel', 'attend', 'organise'], a: 0, e: 'To put something off = to postpone it.' },
    { lvl: 3, q: 'He denied ___ the money.', o: ['taking', 'to take', 'take', 'that take'], a: 0, e: '"Deny" is followed by the -ing form.' },
    { lvl: 4, q: 'No sooner ___ sat down than the phone rang.', o: ['had I', 'I had', 'did I', 'I have'], a: 0, e: 'After "No sooner" at the start, we invert subject and auxiliary.' },
    { lvl: 4, q: 'The proposal was rejected, ___ came as no surprise.', o: ['which', 'what', 'that', 'it'], a: 0, e: 'A non-defining relative clause referring to a whole idea uses "which".' },
    { lvl: 4, q: 'Which is the most formal version of "We need to look into this"?', o: ['This matter warrants further investigation.', 'Let’s check it out.', 'We gotta look at this.', 'Let’s dig in.'], a: 0, e: 'Formal register prefers precise vocabulary such as "warrant" and "investigation".' },
    { lvl: 4, q: 'She’s not one to blow her own ___.', o: ['trumpet', 'horn', 'whistle', 'drum'], a: 0, e: 'To blow your own trumpet = to boast about yourself.' }
  ],
  fr: [
    { lvl: 0, q: 'Je ___ étudiant.', o: ['suis', 'es', 'est', 'sommes'], a: 0, e: 'Être : je suis, tu es, il est, nous sommes…' },
    { lvl: 0, q: 'Comment tu t’___ ?', o: ['appelles', 'appelle', 'appelez', 'appeler'], a: 0, e: 'S’appeler with "tu": tu t’appelles (double l).' },
    { lvl: 0, q: 'Nous ___ deux enfants.', o: ['avons', 'avez', 'ont', 'ai'], a: 0, e: 'Avoir : nous avons.' },
    { lvl: 0, q: 'Le contraire de « grand » est :', o: ['petit', 'gros', 'long', 'haut'], a: 0, e: 'Grand (big/tall) ↔ petit (small).' },
    { lvl: 1, q: 'Hier, je ___ au marché.', o: ['suis allé', 'vais', 'irai', 'ai allé'], a: 0, e: '"Aller" takes "être" in the passé composé.' },
    { lvl: 1, q: 'Elle ___ levée à 7 heures.', o: ['s’est', 'a', 'est', 's’a'], a: 0, e: 'Reflexive verbs use "être": elle s’est levée.' },
    { lvl: 1, q: 'Il y a ___ pommes dans le panier.', o: ['des', 'du', 'de la', 'un'], a: 0, e: 'Plural indefinite article: des.' },
    { lvl: 1, q: 'Je n’ai ___ mangé ce matin.', o: ['rien', 'aucun', 'personne', 'jamais pas'], a: 0, e: 'Ne… rien = nothing.' },
    { lvl: 2, q: 'Quand j’étais petit, je ___ souvent à la plage.', o: ['allais', 'suis allé', 'irai', 'aille'], a: 0, e: 'Imparfait for habits in the past.' },
    { lvl: 2, q: 'Si j’avais le temps, je ___ plus.', o: ['lirais', 'lirai', 'lis', 'lisais'], a: 0, e: 'Si + imparfait → conditionnel présent.' },
    { lvl: 2, q: 'C’est le livre ___ je t’ai parlé.', o: ['dont', 'que', 'qui', 'où'], a: 0, e: '"Parler de" → the relative pronoun is "dont".' },
    { lvl: 2, q: 'Je pense qu’il ___ raison.', o: ['a', 'ait', 'avoir', 'aie'], a: 0, e: 'Affirmative "penser que" is followed by the indicative.' },
    { lvl: 3, q: 'Il faut que tu ___ ce dossier avant lundi.', o: ['finisses', 'finis', 'finiras', 'finirais'], a: 0, e: '"Il faut que" requires the subjunctive.' },
    { lvl: 3, q: 'Bien qu’il ___ malade, il est venu.', o: ['soit', 'est', 'était', 'sera'], a: 0, e: '"Bien que" is always followed by the subjunctive.' },
    { lvl: 3, q: 'Si j’avais su, je ___ venu plus tôt.', o: ['serais', 'aurais', 'serai', 'étais'], a: 0, e: 'Si + plus-que-parfait → conditionnel passé; "venir" uses "être".' },
    { lvl: 3, q: '« Avoir le cafard » signifie :', o: ['être triste', 'avoir faim', 'être en retard', 'avoir peur'], a: 0, e: 'Avoir le cafard = to feel down.' },
    { lvl: 4, q: '___ soit la difficulté, nous trouverons une solution.', o: ['Quelle que', 'Quel que', 'Quelque', 'Quoi que'], a: 0, e: '"Quel que" agrees with the noun: difficulté is feminine → quelle que.' },
    { lvl: 4, q: 'Les efforts qu’il a ___ ont porté leurs fruits.', o: ['fournis', 'fourni', 'fournit', 'fournies'], a: 0, e: 'The participle agrees with a preceding direct object (efforts, masc. plural).' },
    { lvl: 4, q: 'Il a pris cette décision ___ ses propres intérêts.', o: ['au détriment de', 'en dépit que', 'à défaut que', 'faute que'], a: 0, e: '"Au détriment de" = to the detriment of.' },
    { lvl: 4, q: 'Quelle phrase relève du registre soutenu ?', o: ['Je l’ignore.', 'J’sais pas.', 'Chais pas.', 'Aucune idée, mec.'], a: 0, e: '"Je l’ignore" is formal; the others are informal.' }
  ]
};

/* -------------------------------------------------------------- Goals */
FL.data.GOALS = [
  { id: 'conversation', label: 'Speak with confidence' },
  { id: 'exam', label: 'Prepare for an exam (IELTS, DELF)' },
  { id: 'work', label: 'Use it at work' },
  { id: 'study', label: 'Study abroad' },
  { id: 'travel', label: 'Travel and culture' },
  { id: 'school', label: 'Support school learning' }
];

/* ---------------------------------------------------------------- FAQ */
FL.data.faq = [
  { q: 'Are the self-study courses really free?', a: 'Yes. All 40 lessons, their exercises, level tests and the vocabulary review are free. You only pay if you want live 1-on-1 lessons with me.' },
  { q: 'Which level should I start with?', a: 'Take the 5-minute placement test. It adapts to your answers and recommends the right level. You can also open any lesson and see if it feels comfortable.' },
  { q: 'How do the live lessons work?', a: 'You book a time in your own timezone, then we meet on Google Meet. Each booking has a private classroom page with a whiteboard, notes and a vocabulary list that stays after the lesson.' },
  { q: 'How much do live lessons cost?', a: 'The first 25-minute trial is free. After that, a 50-minute lesson is $18, or $15.30 per lesson with a 10-lesson pack. All prices are in US dollars.' },
  { q: 'Can I cancel or reschedule a live lesson?', a: 'Yes, free of charge up to 24 hours before the lesson. Your credit is returned to your account immediately.' },
  { q: 'I speak Arabic. Can you explain things in Arabic?', a: 'Yes. Lessons are taught in the target language, but I can clarify difficult points in Arabic — or in English for French learners — when it helps.' },
  { q: 'Do I need to install anything?', a: 'No. Everything runs in your browser on a computer, tablet or phone. For the speaking practice, Chrome, Edge or Safari give the best results.' },
  { q: 'Where is my progress saved?', a: 'In this version, your account and progress are stored in your own browser. You can export or delete your data at any time from Settings.' }
];
