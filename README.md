# Fluentia — English & French courses

An online language school built for **Abderrahmane Amar Chaouch**, an English and French teacher based in Kuala Lumpur.
It works like a small Moodle: structured courses by CEFR level, lessons with slides and exercises, grades, level tests and certificates. Live 1-on-1 lessons can be booked on top.

Built from scratch with **HTML, CSS and vanilla JavaScript**: no framework, no build step, no dependencies.

**Live site:** https://abderrahmane21ch.github.io/fluentia/

## What's inside

| | |
|---|---|
| **Courses** | English and French, levels **A1, A2, B1 and B2**, with 5 lessons per level: **40 lessons**, **198 slides**, **352 exercises** and **320 vocabulary words**. French is explained in English. |
| **Lesson player** | Each lesson goes **Slides → Practice → Summary**. Slides can be moved with the arrow keys or by swiping on a phone, and shown full screen. Every example, dialogue and word has audio. There are also personal notes for each lesson. |
| **Exercises** | Five types: multiple choice, gap fill, matching, sentence building and dictation. Feedback and explanations appear instantly, and the checking is lenient with accents and punctuation. **Retry mistakes** repeats only the questions you got wrong. A score of 60% or more completes the lesson. |
| **Level pages** | Each level page has three tabs: **Lessons** (with completion status), **Glossary** (searchable, with audio) and **Grades** (attempts and best score for every activity). |
| **Level tests** | 15 questions drawn from the whole level. Passing with 70% or more unlocks a downloadable certificate. |
| **Placement test** | 10 adaptive questions that estimate your CEFR level and recommend the course to start with. |
| **Review** | Vocabulary from every lesson you open is reviewed on a spaced-repetition schedule (SM-2), so each word comes back just before you'd forget it. There is a "My words" deck for your own words, and speaking practice scores you word by word using speech recognition. |
| **My learning** | A dashboard with **Continue where you left off**, course progress, a weekly goal, a streak, an activity calendar and a to-do list. |
| **Live lessons** | Booking shows times in your own timezone. It handles lesson credits (in US dollars), rescheduling and cancellation, calendar export (.ics or Google Calendar), and a classroom page with a whiteboard, notes and vocabulary. |
| **Quality** | Responsive from 320px up, light and dark themes, keyboard support, accessible dialogs, and a `Ctrl/⌘ + K` search across all lessons. |

**Try it in one click:** on **Sign in**, choose **"Explore with a demo student account"**.

## Run locally

Open `index.html` in a browser. For the microphone features, serve the folder over `http://localhost`:

```bash
python3 -m http.server 8000
```

## Adding or editing lessons

Lessons live in `assets/js/content/<language>-<level>.js`. Each lesson has this shape:

```js
{
  title: 'My family', focus: 'Possessive adjectives · have got', minutes: 20,
  goals: ['…'],
  slides: [ { t: 'table', title, head: [...], rows: [[...]] }, { t: 'text', title, body: ['…'] },
            { t: 'dialogue', title, lines: [[speaker, line, translation?]] }, { t: 'examples', title, items: [[sentence, note]] },
            { t: 'vocab', title, words: [[term, meaning]] }, { t: 'mistakes', title, items: [[wrong, right, why]] } ],
  vocab: [[term, meaning], …],
  practice: [ ['choice', question, [correct, ...wrong], explanation],
              ['gap', 'Text with ___', ['answer', 'alternative'], explanation],
              ['match', instruction, [[left, right], …]],
              ['order', 'Sentence to rebuild.', 'translation (optional)'],
              ['listen', 'Sentence to dictate.'] ],
  summary: ['…']
}
```

Text supports `**bold**`, `*italic*` and `~~strikethrough~~`. A cover slide, a key-vocabulary slide and a summary slide are added automatically.

## Customise

`assets/js/config.js` holds the teacher profile, availability, live-lesson prices (USD), lesson topics and booking rules.

## Project structure

```
index.html
assets/css/styles.css          design system (light + dark)
assets/js/config.js            teacher & business settings
assets/js/data.js              course registry, placement test, FAQ
assets/js/content/*.js         the 40 lessons
assets/js/core.js              storage, time zones, accounts, progress, SRS, booking, speech
assets/js/ui.js                icons, dialogs, toasts, search, certificates
assets/js/exercises.js         exercise engine
assets/js/router.js, app.js    routing and app shell
assets/js/pages/*.js           one file per page
```

## About the data

This portfolio version stores accounts and progress in the browser (`localStorage`), and checkout is a demo.
In production, the same modules would talk to an API (for example Node/Express or Firebase), with Stripe or PayPal for payments.
