/* ==========================================================================
   Fluentia — learning content
   ========================================================================== */
window.FL = window.FL || {};

FL.data = {};

FL.data.LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
FL.data.LEVEL_INFO = {
  'Pre-A1': { name: 'Starter', can: ['Recognise some familiar words', 'Ready to start from the basics'] },
  A1: { name: 'Beginner', can: ['Introduce yourself and others', 'Ask and answer simple personal questions', 'Understand everyday expressions'] },
  A2: { name: 'Elementary', can: ['Describe your background and routine', 'Handle simple everyday transactions', 'Talk about past events in simple terms'] },
  B1: { name: 'Intermediate', can: ['Deal with most travel situations', 'Describe experiences, dreams and plans', 'Give reasons and explanations for opinions'] },
  B2: { name: 'Upper-Intermediate', can: ['Interact fluently with native speakers', 'Understand complex texts on concrete and abstract topics', 'Argue a point of view with pros and cons'] },
  C1: { name: 'Advanced', can: ['Express ideas fluently and spontaneously', 'Use language flexibly for social, academic and professional purposes', 'Produce clear, well-structured detailed text'] },
  C2: { name: 'Proficient', can: ['Understand virtually everything heard or read', 'Express yourself with precision in complex situations'] }
};

FL.data.GOALS = [
  { id: 'conversation', label: 'Speak confidently', icon: 'message' },
  { id: 'exam', label: 'Pass an exam (IELTS / DELF)', icon: 'award' },
  { id: 'business', label: 'Work & career', icon: 'briefcase' },
  { id: 'study', label: 'Study abroad', icon: 'book' },
  { id: 'travel', label: 'Travel & culture', icon: 'globe' },
  { id: 'kids', label: 'For my child', icon: 'smile' }
];

/* ---------------------------------------------------------------- Courses */
FL.data.courses = [
  {
    id: 'en-general', lang: 'en', title: 'General English: Foundations to Fluency', levels: [0, 1, 2, 3], goals: ['conversation', 'study', 'travel'],
    duration: '12 weeks', lessons: 24, color: ['#4f46e5', '#7c3aed'],
    summary: 'A complete, step-by-step path that builds all four skills — with speaking at the centre of every lesson.',
    description: 'Ideal if you want a solid, well-rounded level of English. Each unit starts from a real-life situation, introduces the grammar and vocabulary you need for it, and ends with a speaking task so you can use it immediately.',
    outcomes: ['Hold everyday conversations without translating in your head', 'Use the main tenses accurately and naturally', 'Understand podcasts, videos and articles on familiar topics', 'Write clear emails and short texts'],
    audience: ['Adults and university students', 'Learners who feel "stuck" at the same level', 'Anyone restarting English after a break'],
    modules: [
      { title: 'Me and my world', lessons: ['Introductions & small talk', 'Present simple vs continuous', 'Describing people and places', 'Speaking task: a 2-minute self-introduction'] },
      { title: 'Stories and experiences', lessons: ['Past simple & past continuous', 'Linking words for storytelling', 'Present perfect for experiences', 'Speaking task: tell a memorable story'] },
      { title: 'Plans, predictions & possibilities', lessons: ['Future forms: will / going to / present continuous', 'First and second conditionals', 'Making suggestions and arrangements', 'Speaking task: plan a trip together'] },
      { title: 'Opinions and discussions', lessons: ['Agreeing and disagreeing politely', 'Comparatives & superlatives', 'Modal verbs for advice and obligation', 'Speaking task: a mini debate'] }
    ],
    sample: { q: 'I ___ English for three years.', options: ['have studied', 'study', 'am studying', 'studied since'], answer: 0, explain: 'Use the present perfect with "for + period" when the action started in the past and continues now.' }
  },
  {
    id: 'en-conversation', lang: 'en', title: 'Conversation & Fluency Club', levels: [2, 3, 4], goals: ['conversation', 'travel', 'business'],
    duration: 'Flexible', lessons: 16, color: ['#f26b5b', '#e11d48'],
    summary: 'Talk more, hesitate less. Discussion-based lessons with targeted feedback on your real mistakes.',
    description: 'You already know the grammar — now it is time to make it automatic. Every lesson is built around an engaging topic, useful expressions and lots of speaking time. I note your errors discreetly and we fix them together at the end.',
    outcomes: ['Speak for longer without long pauses', 'Sound more natural with collocations and idioms', 'Keep a conversation going and change topics smoothly', 'Reduce recurring grammar mistakes'],
    audience: ['B1+ learners who understand more than they can say', 'Professionals who need everyday fluency', 'Shy speakers who want a safe space to practise'],
    modules: [
      { title: 'Fluency foundations', lessons: ['Fillers and thinking time', 'Asking follow-up questions', 'Paraphrasing when you don’t know a word'] },
      { title: 'Topics that matter', lessons: ['Technology & social media', 'Work-life balance', 'Travel stories', 'Food & culture in Malaysia and abroad'] },
      { title: 'Natural English', lessons: ['Phrasal verbs in context', 'Common idioms and when (not) to use them', 'Intonation and sentence stress'] }
    ],
    sample: { q: 'Choose the most natural reply: "Thanks so much for your help!"', options: ['No worries, anytime!', 'It is nothing to thank.', 'You are welcome very much.', 'Not at all problem.'], answer: 0, explain: '"No worries" and "anytime" are friendly, natural responses in everyday English.' }
  },
  {
    id: 'en-business', lang: 'en', title: 'Business English Pro', levels: [2, 3, 4], goals: ['business'],
    duration: '10 weeks', lessons: 20, color: ['#0f766e', '#0e7490'],
    summary: 'Meetings, emails, presentations and interviews — the English you actually use at work.',
    description: 'A practical course built around workplace situations. We practise with realistic role-plays based on your own job, so you can apply what you learn the very next day.',
    outcomes: ['Run and take part in meetings with confidence', 'Write concise, professional emails', 'Present ideas and data clearly', 'Prepare for job interviews in English'],
    audience: ['Professionals and job seekers', 'Graduates entering international companies', 'Teams working with English-speaking clients'],
    modules: [
      { title: 'Professional communication', lessons: ['Email structure and tone', 'Phone and video-call language', 'Small talk with colleagues and clients'] },
      { title: 'Meetings & negotiation', lessons: ['Giving opinions and interrupting politely', 'Negotiation phrases', 'Summarising and action points'] },
      { title: 'Presentations', lessons: ['Structuring a presentation', 'Describing trends and graphs', 'Handling questions'] },
      { title: 'Career', lessons: ['CV and LinkedIn language', 'Interview questions (STAR method)', 'Mock interview with feedback'] }
    ],
    sample: { q: 'Which sentence is best for a formal email?', options: ['I am writing to follow up on our meeting.', 'Just checking in about the meeting thing.', 'Hey, what about the meeting?', 'Meeting — any news??'], answer: 0, explain: '"I am writing to follow up on…" is a clear, polite and professional opener.' }
  },
  {
    id: 'en-ielts', lang: 'en', title: 'IELTS Preparation (Academic & General)', levels: [2, 3, 4], goals: ['exam', 'study'],
    duration: '8 weeks', lessons: 16, color: ['#b45309', '#d97706'],
    summary: 'Strategy-driven preparation for all four papers from an IELTS-certified teacher.',
    description: 'We work on the exam techniques that move your band score: understanding the marking criteria, timing, and building the language examiners look for. Includes timed practice and detailed feedback on Speaking and Writing.',
    outcomes: ['Understand exactly how each paper is marked', 'Plan and write Task 1 and Task 2 answers efficiently', 'Answer all three Speaking parts with confidence', 'Improve accuracy under time pressure'],
    audience: ['Students applying to universities', 'Professionals and migration candidates', 'Anyone who needs a target band score'],
    modules: [
      { title: 'Speaking', lessons: ['Part 1: extending short answers', 'Part 2: the 1-minute plan', 'Part 3: discussing abstract ideas', 'Mock speaking test'] },
      { title: 'Writing', lessons: ['Task 1: describing graphs, maps and processes', 'Task 2: essay types and structures', 'Cohesion and lexical resource'] },
      { title: 'Reading & Listening', lessons: ['Skimming, scanning and keywords', 'True / False / Not Given', 'Listening for distractors'] }
    ],
    sample: { q: 'In Writing Task 2, an essay asking "To what extent do you agree?" should…', options: ['state a clear position and support it', 'only describe both sides neutrally', 'avoid giving any opinion', 'focus on personal stories only'], answer: 0, explain: 'Opinion essays need a clear position in the introduction, developed consistently through the body paragraphs.' }
  },
  {
    id: 'en-kids', lang: 'en', title: 'English for Kids & Teens', levels: [0, 1, 2], goals: ['kids'],
    duration: 'Ongoing', lessons: 24, color: ['#16a34a', '#65a30d'],
    summary: 'Short, playful and structured lessons that build confidence and school results.',
    description: 'Games, stories and visual activities on the interactive whiteboard keep younger learners engaged, while a clear syllabus supports school English. Parents receive short progress notes after lessons.',
    outcomes: ['Build vocabulary through games and stories', 'Read and write simple texts', 'Speak with confidence in class', 'Support for school homework and exams'],
    audience: ['Children aged 7–12', 'Teenagers aged 13–16', 'Parents who want regular progress updates'],
    modules: [
      { title: 'Words & worlds', lessons: ['Animals, food and family', 'Colours, numbers and shapes', 'My day and my school'] },
      { title: 'Stories', lessons: ['Reading short stories', 'Retelling with pictures', 'Creating our own story'] },
      { title: 'Confident speaker', lessons: ['Show and tell', 'Asking questions', 'Mini presentations'] }
    ],
    sample: { q: 'Choose the correct word: "I have two ___."', options: ['cats', 'cat', 'a cat', 'cates'], answer: 0, explain: 'With "two" we use the plural: cat → cats.' }
  },
  {
    id: 'fr-zero', lang: 'fr', title: 'French from Zero', levels: [0, 1], goals: ['travel', 'conversation', 'study'],
    duration: '10 weeks', lessons: 20, color: ['#1d4ed8', '#4338ca'],
    summary: 'Start speaking French from your very first lesson — explained clearly in English.',
    description: 'A friendly introduction to French for complete beginners. Pronunciation, essential grammar and survival phrases are explained in simple English, with lots of repetition and speaking practice.',
    outcomes: ['Pronounce French sounds correctly', 'Introduce yourself and talk about your daily life', 'Order food, ask for directions and shop', 'Understand basic present, past and future tenses'],
    audience: ['Complete beginners', 'Travellers to France, Canada or Africa', 'Students who need French for school'],
    modules: [
      { title: 'Bonjour !', lessons: ['French sounds & accents', 'Greetings and introductions', 'Être and avoir', 'Numbers, days and dates'] },
      { title: 'La vie quotidienne', lessons: ['Regular -er verbs', 'Daily routine', 'Articles and gender'] },
      { title: 'En ville', lessons: ['Ordering at a café', 'Directions and transport', 'Shopping and prices'] },
      { title: 'Le passé et le futur', lessons: ['Passé composé with avoir', 'Futur proche', 'Telling a simple story'] }
    ],
    sample: { q: '« Je ___ étudiant. »', options: ['suis', 'es', 'est', 'sommes'], answer: 0, explain: '"Être" with "je" is "suis": je suis, tu es, il est…' }
  },
  {
    id: 'fr-conversation', lang: 'fr', title: 'Conversational French', levels: [1, 2, 3], goals: ['conversation', 'travel', 'business'],
    duration: 'Flexible', lessons: 16, color: ['#2563eb', '#0891b2'],
    summary: 'Turn your school French into real conversation — natural expressions and everyday topics.',
    description: 'Lessons focus on speaking about real topics with the expressions French speakers actually use. You will learn to understand spoken French at natural speed and reply spontaneously.',
    outcomes: ['Understand everyday spoken French', 'Use common expressions and connectors', 'Talk about past experiences and future plans', 'Feel comfortable speaking with native speakers'],
    audience: ['A2–B2 learners', 'People relocating to a French-speaking country', 'Learners who studied French at school'],
    modules: [
      { title: 'Parler naturellement', lessons: ['Spoken vs written French', 'Connectors: donc, du coup, en fait', 'Asking questions naturally'] },
      { title: 'Raconter', lessons: ['Passé composé vs imparfait', 'Telling anecdotes', 'Reacting and showing interest'] },
      { title: 'Débattre', lessons: ['Giving your opinion', 'Agreeing and disagreeing', 'Subjunctive after opinions and feelings'] }
    ],
    sample: { q: 'Choose the natural reply: « Merci beaucoup ! »', options: ['De rien !', 'Pas de merci.', 'Bienvenue !', 'Merci aussi.'], answer: 0, explain: '"De rien" (or "Je vous en prie") is the standard reply. "Bienvenue" is only used in Québec.' }
  },
  {
    id: 'fr-delf', lang: 'fr', title: 'DELF / DALF Exam Prep', levels: [1, 2, 3, 4], goals: ['exam', 'study'],
    duration: '8 weeks', lessons: 16, color: ['#7c3aed', '#c026d3'],
    summary: 'Targeted preparation for DELF A2–B2 and DALF C1 with mock exams and feedback.',
    description: 'We work through each part of the exam with official-style tasks, scoring grids and time management strategies. Special attention is given to the production écrite and production orale.',
    outcomes: ['Know the format and marking grid of your exam', 'Write structured letters, articles and essays', 'Prepare and deliver the oral monologue and interaction', 'Improve comprehension under time pressure'],
    audience: ['Students applying to French-speaking universities', 'Candidates for residency or citizenship', 'Professionals needing certification'],
    modules: [
      { title: 'Compréhension', lessons: ['Compréhension orale: strategies', 'Compréhension écrite: question types'] },
      { title: 'Production écrite', lessons: ['Formal letters and emails', 'Argumentative essays', 'Connectors and register'] },
      { title: 'Production orale', lessons: ['Monologue suivi', 'Exercice en interaction', 'Mock oral exam'] }
    ],
    sample: { q: 'Which connector introduces a consequence?', options: ['par conséquent', 'cependant', 'bien que', 'tandis que'], answer: 0, explain: '"Par conséquent" = therefore. "Cependant" = however, "bien que" = although, "tandis que" = whereas.' }
  }
];

/* -------------------------------------------------------- Placement bank */
// lvl: 0=A1 … 4=C1
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
    { lvl: 4, q: 'No sooner ___ sat down than the phone rang.', o: ['had I', 'I had', 'did I', 'I have'], a: 0, e: 'After "No sooner" at the start, we invert subject and auxiliary: No sooner had I…' },
    { lvl: 4, q: 'The proposal was rejected, ___ came as no surprise.', o: ['which', 'what', 'that', 'it'], a: 0, e: 'A non-defining relative clause referring to a whole idea uses "which".' },
    { lvl: 4, q: 'Which is the most formal version of "We need to look into this"?', o: ['This matter warrants further investigation.', 'Let’s check it out.', 'We gotta look at this.', 'Let’s dig in.'], a: 0, e: 'Formal register prefers nominalisation and precise vocabulary such as "warrant" and "investigation".' },
    { lvl: 4, q: 'She’s not one to blow her own ___.', o: ['trumpet', 'horn', 'whistle', 'drum'], a: 0, e: 'To blow your own trumpet = to boast about yourself.' }
  ],
  fr: [
    { lvl: 0, q: 'Je ___ étudiant.', o: ['suis', 'es', 'est', 'sommes'], a: 0, e: 'Être : je suis, tu es, il est, nous sommes…' },
    { lvl: 0, q: 'Comment tu t’___ ?', o: ['appelles', 'appelle', 'appelez', 'appeler'], a: 0, e: 'S’appeler with "tu": tu t’appelles (double l).' },
    { lvl: 0, q: 'Nous ___ deux enfants.', o: ['avons', 'avez', 'ont', 'ai'], a: 0, e: 'Avoir : nous avons.' },
    { lvl: 0, q: 'Le contraire de « grand » est :', o: ['petit', 'gros', 'long', 'haut'], a: 0, e: 'Grand (big/tall) ↔ petit (small).' },
    { lvl: 1, q: 'Hier, je ___ au marché.', o: ['suis allé', 'vais', 'irai', 'ai allé'], a: 0, e: '"Aller" takes "être" in the passé composé: je suis allé(e).' },
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
    { lvl: 4, q: 'Les efforts qu’il a ___ ont porté leurs fruits.', o: ['fournis', 'fourni', 'fournit', 'fournies'], a: 0, e: 'With avoir, the past participle agrees with a preceding direct object (efforts, masc. plural).' },
    { lvl: 4, q: 'Il a pris cette décision ___ ses propres intérêts.', o: ['au détriment de', 'en dépit que', 'à défaut que', 'faute que'], a: 0, e: '"Au détriment de" = to the detriment of.' },
    { lvl: 4, q: 'Quelle phrase relève du registre soutenu ?', o: ['Je l’ignore.', 'J’sais pas.', 'Chais pas.', 'Aucune idée, mec.'], a: 0, e: '"Je l’ignore" is formal; the others are informal or familiar.' }
  ]
};

/* ------------------------------------------------------------ Flashcards */
FL.data.decks = [
  {
    id: 'en-business', lang: 'en', title: 'Business English essentials', icon: 'briefcase',
    cards: [
      ['to touch base', 'to make brief contact', 'Let’s touch base next week about the budget.'],
      ['a deadline', 'the latest time to finish something', 'The deadline for the report is Friday.'],
      ['to follow up', 'to contact again to continue something', 'I’m following up on my previous email.'],
      ['a stakeholder', 'a person with an interest in a project', 'We need approval from all stakeholders.'],
      ['to streamline', 'to make a process simpler and more efficient', 'The new software streamlines our workflow.'],
      ['a bottleneck', 'a point where progress slows down', 'Approval is the main bottleneck in this process.'],
      ['to delegate', 'to give a task to someone else', 'A good manager knows how to delegate.'],
      ['on the same page', 'in agreement / sharing the same understanding', 'Let’s make sure we’re on the same page.'],
      ['to brainstorm', 'to generate many ideas quickly', 'We brainstormed names for the new product.'],
      ['a ballpark figure', 'a rough estimate', 'Can you give me a ballpark figure for the cost?'],
      ['to reach out', 'to contact someone', 'Feel free to reach out if you have questions.'],
      ['a win-win', 'good for everyone involved', 'The partnership is a win-win for both companies.']
    ]
  },
  {
    id: 'en-phrasal', lang: 'en', title: 'Everyday phrasal verbs', icon: 'zap',
    cards: [
      ['to give up', 'to stop trying', 'Don’t give up — you’re improving every week!'],
      ['to figure out', 'to understand or solve', 'I finally figured out the answer.'],
      ['to look forward to', 'to feel happy about something in the future', 'I’m looking forward to our next lesson.'],
      ['to run out of', 'to have no more of something', 'We’ve run out of milk.'],
      ['to put off', 'to postpone', 'Stop putting off your homework!'],
      ['to come across', 'to find by chance', 'I came across an interesting article.'],
      ['to get along with', 'to have a good relationship', 'I get along well with my classmates.'],
      ['to bring up', 'to mention a topic', 'She brought up a good point in the meeting.'],
      ['to catch up', 'to reach the same level / talk after time apart', 'Let’s catch up over coffee.'],
      ['to turn down', 'to refuse', 'He turned down the job offer.'],
      ['to set up', 'to arrange or establish', 'Can you set up a meeting for Monday?'],
      ['to show up', 'to arrive / appear', 'Only five people showed up.']
    ]
  },
  {
    id: 'fr-essentials', lang: 'fr', title: 'French essentials', icon: 'message',
    cards: [
      ['Enchanté(e)', 'Nice to meet you', 'Enchanté, je m’appelle Sami.'],
      ['Je voudrais…', 'I would like…', 'Je voudrais un café, s’il vous plaît.'],
      ['Combien ça coûte ?', 'How much does it cost?', 'Combien ça coûte, ce livre ?'],
      ['Où se trouve… ?', 'Where is…?', 'Où se trouve la gare ?'],
      ['Je ne comprends pas', 'I don’t understand', 'Pardon, je ne comprends pas.'],
      ['Pouvez-vous répéter ?', 'Can you repeat?', 'Pouvez-vous répéter plus lentement ?'],
      ['D’accord', 'OK / agreed', 'D’accord, à demain !'],
      ['Ça marche', 'That works / sounds good', 'On se voit à 18h ? — Ça marche !'],
      ['Il fait beau', 'The weather is nice', 'Il fait beau aujourd’hui.'],
      ['J’ai faim', 'I’m hungry', 'J’ai faim, on mange ?'],
      ['À bientôt', 'See you soon', 'Merci pour tout, à bientôt !'],
      ['Bon courage', 'Good luck / hang in there', 'Tu as un examen ? Bon courage !']
    ]
  },
  {
    id: 'fr-connectors', lang: 'fr', title: 'French connectors (B1+)', icon: 'layers',
    cards: [
      ['cependant', 'however', 'Il est intelligent ; cependant, il manque de rigueur.'],
      ['donc', 'so / therefore', 'Il pleut, donc je reste à la maison.'],
      ['pourtant', 'yet / even so', 'Il a beaucoup travaillé, pourtant il a échoué.'],
      ['en effet', 'indeed', 'Il était fatigué ; en effet, il avait mal dormi.'],
      ['par conséquent', 'consequently', 'Les prix ont augmenté ; par conséquent, les ventes ont baissé.'],
      ['bien que', 'although (+ subjonctif)', 'Bien qu’il soit tard, je continue.'],
      ['tandis que', 'whereas / while', 'Je préfère le thé, tandis que mon frère aime le café.'],
      ['d’ailleurs', 'besides / moreover', 'Ce film est excellent ; d’ailleurs, il a gagné un prix.'],
      ['en revanche', 'on the other hand', 'Le centre est cher ; en revanche, la banlieue est abordable.'],
      ['grâce à', 'thanks to', 'J’ai réussi grâce à tes conseils.'],
      ['à cause de', 'because of (negative)', 'Le vol est annulé à cause de la neige.'],
      ['afin de', 'in order to', 'Il étudie afin de réussir le DELF.']
    ]
  }
];

/* ---------------------------------------------------------- Pronunciation */
FL.data.phrases = {
  en: [
    { t: 'Nice to meet you.', lvl: 'A1', tip: 'Link the words: "nice-to-MEET-you". Stress falls on MEET.' },
    { t: 'Could you say that again, please?', lvl: 'A2', tip: '"Could you" often sounds like "cu-jew" in natural speech.' },
    { t: 'I would like to book a table for two.', lvl: 'A2', tip: '"Would like" → "I’d like" sounds more natural.' },
    { t: 'The weather was much better than I expected.', lvl: 'B1', tip: 'The "-ed" in expected is pronounced /ɪd/ because it follows a /t/.' },
    { t: 'I think it’s worth thinking about.', lvl: 'B1', tip: 'Practise the "th" sound: tongue lightly between your teeth.' },
    { t: 'She sells seashells by the seashore.', lvl: 'B1', tip: 'A classic for /s/ vs /ʃ/ — go slowly first, then speed up.' },
    { t: 'Thirty-three thousand people thought it was thrilling.', lvl: 'B2', tip: 'Seven "th" sounds — keep your tongue forward.' },
    { t: 'Communication is particularly important in this environment.', lvl: 'B2', tip: 'Long words: com-mu-ni-CA-tion, par-TIC-u-lar-ly, en-VI-ron-ment.' },
    { t: 'Entrepreneurs thrive on unpredictability.', lvl: 'C1', tip: 'en-tre-pre-NEURS; un-pre-dic-ta-BIL-i-ty.' },
    { t: 'The thesis was thoroughly scrutinised by the committee.', lvl: 'C1', tip: '"Thoroughly" = THUR-uh-lee. "Scrutinised" = SCROO-ti-nized.' }
  ],
  fr: [
    { t: 'Bonjour, comment allez-vous ?', lvl: 'A1', tip: 'Liaison: "comment_allez" → "commen-t-allez".' },
    { t: 'Je m’appelle Sarah et j’habite à Kuala Lumpur.', lvl: 'A1', tip: 'The "h" in habite is silent.' },
    { t: 'Je voudrais un croissant, s’il vous plaît.', lvl: 'A1', tip: 'Nasal vowel in "un" and "croissant" — air through the nose.' },
    { t: 'Il fait très beau aujourd’hui.', lvl: 'A2', tip: '"Aujourd’hui" = o-jour-DWEE.' },
    { t: 'Nous sommes allés au cinéma hier soir.', lvl: 'A2', tip: 'Liaison: "sommes_allés" → "som-z-allés".' },
    { t: 'Je ne sais pas encore ce que je vais faire.', lvl: 'B1', tip: 'In speech "ce que je" flows as "skeuj".' },
    { t: 'Un chasseur sachant chasser doit savoir chasser sans son chien.', lvl: 'B1', tip: 'Classic tongue twister for "s" vs "ch".' },
    { t: 'Il faut absolument que tu viennes à la fête.', lvl: 'B2', tip: '"Viennes" rhymes with "chienne".' },
    { t: 'Les chaussettes de l’archiduchesse sont-elles sèches ?', lvl: 'C1', tip: 'Famous twister — keep "s" and "ch" distinct.' },
    { t: 'Quoi qu’il en soit, nous trouverons une solution.', lvl: 'C1', tip: '"Quoi qu’il" → "kwa-kil".' }
  ]
};

/* ----------------------------------------------------------- Word of day */
FL.data.words = {
  en: [
    { w: 'resilient', ipa: '/rɪˈzɪliənt/', pos: 'adjective', m: 'able to recover quickly from difficulties', ex: 'Language learners need to be resilient — mistakes are part of the process.' },
    { w: 'meticulous', ipa: '/məˈtɪkjʊləs/', pos: 'adjective', m: 'showing great attention to detail', ex: 'She is meticulous about checking her essays.' },
    { w: 'to procrastinate', ipa: '/prəˈkræstɪneɪt/', pos: 'verb', m: 'to delay doing something', ex: 'Stop procrastinating and review your flashcards!' },
    { w: 'serendipity', ipa: '/ˌserənˈdɪpəti/', pos: 'noun', m: 'finding something good by chance', ex: 'Meeting my language partner was pure serendipity.' },
    { w: 'eloquent', ipa: '/ˈeləkwənt/', pos: 'adjective', m: 'fluent and persuasive in speaking', ex: 'He gave an eloquent speech at graduation.' },
    { w: 'to thrive', ipa: '/θraɪv/', pos: 'verb', m: 'to grow or develop well', ex: 'Students thrive when they feel supported.' },
    { w: 'insight', ipa: '/ˈɪnsaɪt/', pos: 'noun', m: 'a deep understanding of something', ex: 'The lesson gave me real insight into English idioms.' }
  ],
  fr: [
    { w: 'la flânerie', ipa: '/flɑnʁi/', pos: 'nom', m: 'a leisurely stroll with no destination', ex: 'Paris est la ville idéale pour la flânerie.' },
    { w: 'dépaysant', ipa: '/depeizɑ̃/', pos: 'adjectif', m: 'giving a pleasant sense of being somewhere new', ex: 'Ce voyage en Malaisie était vraiment dépaysant.' },
    { w: 'retrouvailles', ipa: '/ʁətʁuvaj/', pos: 'nom', m: 'a happy reunion', ex: 'Les retrouvailles avec ma famille étaient émouvantes.' },
    { w: 'chuchoter', ipa: '/ʃyʃɔte/', pos: 'verbe', m: 'to whisper', ex: 'Elle m’a chuchoté un secret.' },
    { w: 'la débrouillardise', ipa: '/debʁujjaʁdiz/', pos: 'nom', m: 'resourcefulness', ex: 'La débrouillardise est essentielle en voyage.' },
    { w: 'épanoui', ipa: '/epanwi/', pos: 'adjectif', m: 'fulfilled, blossoming', ex: 'Il se sent épanoui dans son nouveau travail.' },
    { w: 'avoir du pain sur la planche', ipa: '', pos: 'expression', m: 'to have a lot of work to do', ex: 'Avec le DELF, j’ai du pain sur la planche !' }
  ]
};

/* --------------------------------------------------------------- Method */
FL.data.method = [
  { icon: 'target', title: 'Diagnose', text: 'An adaptive placement test and a free trial lesson pinpoint your CEFR level, goals and the habits holding you back.' },
  { icon: 'message', title: 'Learn by doing', text: 'Every lesson is built around a real communicative task — you learn the language you need, then use it straight away.' },
  { icon: 'repeat', title: 'Practise between lessons', text: 'New words from class become flashcards automatically. Spaced repetition, pronunciation drills and daily challenges keep it fresh.' },
  { icon: 'chart', title: 'Review & measure', text: 'Lesson notes, homework and a live progress dashboard show exactly how far you’ve come — and what to work on next.' }
];
FL.data.principles = ['Communicative Language Teaching', 'Task-based learning', 'Gentle, delayed error correction', 'Spaced repetition', 'Comprehensible input', 'Authentic materials', 'CEFR-aligned goals', 'Student talking time > teacher talking time'];

/* ------------------------------------------------------------------ FAQ */
FL.data.faq = [
  { q: 'How does the free trial lesson work?', a: 'It’s a relaxed 25-minute video call. We talk about your goals, I check your level with a few speaking activities, and you leave with a personalised learning plan. No payment details are needed.' },
  { q: 'Which platform do we use for lessons?', a: 'Lessons take place on Google Meet (or Zoom if you prefer). Each booking includes a link to your personal virtual classroom here, with a shared whiteboard, lesson notes and vocabulary list.' },
  { q: 'What times are available?', a: 'All slots are shown automatically in your own timezone. I teach mornings and evenings (Malaysia time), seven days a week. You can book up to three weeks ahead.' },
  { q: 'Can I cancel or reschedule?', a: 'Yes. You can reschedule or cancel free of charge up to 24 hours before the lesson and your credit is returned instantly.' },
  { q: 'Do you teach children?', a: 'Yes — the English for Kids & Teens course is designed for learners aged 7–16, with short, game-based activities on the interactive whiteboard and progress notes for parents.' },
  { q: 'I speak Arabic. Can you explain things in Arabic?', a: 'Absolutely. Lessons are given in the target language, but as a native Arabic speaker I can clarify difficult points in Arabic when it helps — the same goes for French speakers learning English.' },
  { q: 'Do I need to buy anything?', a: 'No books are required. All materials, flashcards, exercises and lesson notes are included in the platform.' },
  { q: 'Is my data private?', a: 'In this demo, your account and progress are stored only in your own browser (localStorage). You can export or delete everything at any time from Settings.' }
];

/* --------------------------------------------------------------- Badges */
FL.data.badges = [
  { id: 'welcome', icon: '\u{1F44B}', name: 'Welcome aboard', desc: 'Create your account', test: d => !!d.registered },
  { id: 'placement', icon: '\u{1F3AF}', name: 'Know thyself', desc: 'Complete a placement test', test: d => Object.keys(d.placement).length > 0 },
  { id: 'booked', icon: '\u{1F4C5}', name: 'First step', desc: 'Book your first lesson', test: d => d.stats.booked >= 1 },
  { id: 'streak3', icon: '\u{1F525}', name: 'On fire', desc: 'Reach a 3-day streak', test: (d, s) => s.streak >= 3 },
  { id: 'streak7', icon: '⚡', name: 'Unstoppable', desc: 'Reach a 7-day streak', test: (d, s) => s.streak >= 7 },
  { id: 'cards50', icon: '\u{1F9E0}', name: 'Memory athlete', desc: 'Review 50 flashcards', test: d => d.stats.reviews >= 50 },
  { id: 'speaker', icon: '\u{1F399}️', name: 'Clear speaker', desc: 'Score 90%+ in pronunciation', test: d => d.stats.bestPron >= 90 },
  { id: 'daily', icon: '✅', name: 'Daily devotee', desc: 'Finish a daily challenge', test: d => d.stats.daily >= 1 },
  { id: 'collector', icon: '\u{1F4DA}', name: 'Word collector', desc: 'Save 10 words to My words', test: d => d.myWords.length >= 10 },
  { id: 'xp1000', icon: '\u{1F3C6}', name: '1,000 XP club', desc: 'Earn 1,000 XP', test: d => d.xp >= 1000 }
];
