/* ==========================================================================
   Fluentia — site configuration
   Everything a teacher would want to customise lives in this one file.
   ========================================================================== */
window.FL = window.FL || {};

FL.config = {
  brand: 'Fluentia',
  tagline: 'English & French lessons that actually stick.',
  storagePrefix: 'fluentia.v1.',

  teacher: {
    name: 'Abderrahmane Amar Chaouch',
    shortName: 'Abderrahmane',
    initials: 'AA',
    title: 'Online English & French Teacher',
    photo: 'assets/teacher.jpg',
    location: 'Kuala Lumpur, Malaysia',
    // IANA timezone the availability below is written in.
    timezone: 'Asia/Kuala_Lumpur',
    email: 'abdou2007ch21@gmail.com',
    // Optional: international format without "+" or spaces, e.g. "60123456789". Leave empty to hide.
    whatsapp: '',
    // The video-call room students join. Replace with your personal Google Meet / Zoom link.
    meetingLink: 'https://meet.google.com/',
    intro:
      'Having learned English as a second language myself, I know exactly where learners get stuck — and how to get past it. ' +
      'My lessons are patient, structured and built around speaking, so you leave every class able to say something you couldn’t say before.',
    bio: [
      'I have 1.5+ years of classroom experience teaching English and French to intermediate and upper-intermediate learners (CEFR B1–B2) at MBI in Algiers.',
      'Today I live in Kuala Lumpur, where I also guide international students through enrolling in English language institutes and universities, and create short educational videos for an online audience.',
      'With a degree in Software Engineering, I build my own digital teaching tools — including this platform — so every lesson comes with smart practice between classes.'
    ],
    languages: [
      { name: 'English', level: 'Fluent · IELTS certified', pct: 95 },
      { name: 'French', level: 'Fluent', pct: 92 },
      { name: 'Arabic', level: 'Native', pct: 100 }
    ],
    highlights: [
      '1.5+ years teaching English & French (CEFR B1–B2)',
      'IELTS-certified English proficiency',
      'Trilingual: English, French & native Arabic',
      'Patient, supportive and encouraging style',
      'Regular feedback and measurable progress',
      'Flexible part-time schedule for 1-on-1 lessons'
    ],
    experience: [
      { when: '1.5+ years', role: 'English & French Teacher', org: 'MBI · Algiers, Algeria',
        text: 'Taught English and French to B1–B2 learners with speaking, grammar and vocabulary practice; adapted explanations to each learner and gave regular feedback.' },
      { when: 'Present', role: 'Student Advisor & Educational Content Creator', org: 'malaysiaforyou (TikTok) · Kuala Lumpur',
        text: 'Guide Arabic-speaking international students into English language institutes and universities in Malaysia; create short educational videos.' },
      { when: 'Education', role: 'BSc (Hons) Software Engineering', org: 'Asia Pacific University (APU) · Kuala Lumpur',
        text: 'Plus a Web Development & React JS certification (Code213, Algeria, 2023–2024).' }
    ]
  },

  // Weekly availability in the TEACHER's timezone. 0 = Sunday ... 6 = Saturday.
  availability: {
    0: [['10:00', '13:00']],
    1: [['09:00', '12:00'], ['15:00', '21:00']],
    2: [['09:00', '12:00'], ['15:00', '21:00']],
    3: [['09:00', '12:00'], ['15:00', '21:00']],
    4: [['09:00', '12:00'], ['15:00', '21:00']],
    5: [['09:00', '12:00'], ['15:00', '19:00']],
    6: [['10:00', '14:00']]
  },

  booking: {
    windowDays: 21,       // how far ahead students can book
    minNoticeHours: 12,   // earliest bookable slot from now
    cancelHours: 24,      // free cancellation / credit refund window
    cellMinutes: 30,      // slot granularity
    busyPercent: 30,      // simulated share of slots already taken by other students
    joinEarlyMinutes: 10  // "Join" button becomes active this many minutes before start
  },

  lessonTypes: [
    { id: 'trial', name: 'Free trial lesson', minutes: 25, credits: 0, once: true,
      desc: 'Meet your teacher, quick level check and a personalised learning plan.' },
    { id: 'standard', name: 'Standard lesson', minutes: 50, credits: 1,
      desc: 'A full 1-on-1 lesson: speaking, new language, guided practice and feedback.' },
    { id: 'intensive', name: 'Intensive lesson', minutes: 100, credits: 2,
      desc: 'Double session for exam prep, deep dives or fast progress.' }
  ],

  currency: {
    base: 'USD',
    default: 'MYR',
    // Indicative conversion rates from USD. Update whenever you like.
    rates: { USD: 1, MYR: 4.4, EUR: 0.92, GBP: 0.79 }
  },

  plans: [
    { id: 'trial', name: 'Trial lesson', credits: 0, priceUSD: 0, cta: 'Book free trial', unit: '25 minutes',
      perks: ['Level check & goal setting', 'Personal learning plan', 'Access to all practice tools', 'No card required'] },
    { id: 'single', name: 'Pay as you go', credits: 1, priceUSD: 18, cta: 'Buy 1 lesson', unit: 'per 50-min lesson',
      perks: ['1 lesson credit', 'Lesson notes & homework', 'Vocabulary saved to flashcards', 'Free rescheduling (24h)'] },
    { id: 'pack10', name: '10-lesson pack', credits: 10, priceUSD: 153, featured: true, ribbon: 'Most popular · save 15%', cta: 'Get 10 lessons', unit: 'one-time',
      perks: ['10 lesson credits', 'Everything in Pay as you go', 'Progress report every 5 lessons', 'Priority booking slots'] },
    { id: 'monthly', name: 'Monthly fluency', credits: 8, priceUSD: 128, period: '/month', ribbon: 'Best for habit', cta: 'Start monthly', unit: '8 lessons / month',
      perks: ['8 lesson credits each month', '2 lessons per week rhythm', 'Monthly CEFR progress check', 'Cancel anytime'] }
  ],

  // Add real student feedback here to show a testimonials section on the home page, e.g.
  // { name: 'Aisyah', detail: 'IELTS student, Kuala Lumpur', quote: '...' }
  testimonials: [],

  social: {
    tiktok: '',
    linkedin: '',
    github: ''
  }
};
