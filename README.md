# Fluentia — English & French lessons platform

A complete online-teaching platform for **Abderrahmane Amar Chaouch**, an online English & French teacher based in Kuala Lumpur.
Students can find their level, book 1-on-1 lessons in their own timezone, join a virtual classroom and keep practising between lessons.

Built from scratch with **HTML, CSS and vanilla JavaScript**: no frameworks, no build step, no dependencies.

## Features

| Area | What it does |
|---|---|
| **Adaptive placement test** | 10 questions that get harder or easier as you answer (A1 → C1). Shows a breakdown by level, recommends courses and creates a downloadable PNG certificate. English & French. |
| **Timezone-smart booking** | Teacher availability is set in Malaysia time and shown in each student's local time. Includes minimum notice, a free trial lesson, a credit system, **.ics / Google Calendar export**, rescheduling, and cancellation with a 24-hour refund rule. |
| **Virtual classroom** | A whiteboard (pen, highlighter, text, eraser, undo, PNG export), autosaving lesson notes, a lesson timer, and vocabulary capture that turns new words into flashcards. Try it at `#/classroom/demo`. |
| **Spaced-repetition flashcards** | The SM-2 algorithm with Again / Hard / Good / Easy buttons, 4 built-in decks plus a personal "My words" deck, text-to-speech, and keyboard shortcuts. |
| **Pronunciation coach** | Native-speed and slow audio (Web Speech API), speech recognition, word-by-word scoring with highlights, and a best score saved for each phrase. |
| **Daily challenge** | 5 questions a day, the same for everyone on a given day, one attempt per day per language, with a countdown to the next challenge. |
| **Dashboard** | Upcoming lessons with a join button, a personal weekly learning plan (from an onboarding wizard), homework, a weekly-goal ring, a skills radar chart, a 17-week activity heatmap, badges, XP levels and streaks. |
| **Pricing** | Plans with a currency switcher (MYR / USD / EUR / GBP) and a demo checkout that adds lesson credits. |
| **Accounts** | Register and sign in (salted SHA-256 hashes), password strength meter, settings, data export (JSON), progress reset and account deletion. Guest progress carries over when you sign up. |
| **Polish** | Dark mode, a ⌘/Ctrl + K command palette, responsive layout, accessible dialogs (focus trap, Esc), toasts, and scroll-reveal animations. |

**One-click demo:** on the Sign in page, choose **"Explore with a demo student account"** to see a fully populated dashboard.

## Run it

Open `index.html` in a browser. It works straight from the file system.
For the microphone (pronunciation scoring), serve it over `http://localhost` or HTTPS, for example:

```bash
python3 -m http.server 8000
```

## Deploy (free)

- **GitHub Pages:** push this folder to a repository → Settings → Pages → deploy from the `main` branch.
- **Netlify / Vercel:** drag and drop the folder; there is no build command.

## Customise

All teacher details, availability, prices, lesson types and booking rules live in **`assets/js/config.js`**.
Learning content (courses, test questions, flashcards, phrases, FAQ, badges) lives in **`assets/js/data.js`**.

- Set `teacher.meetingLink` to your personal Google Meet or Zoom room.
- Optionally add `teacher.whatsapp` to show a WhatsApp contact button.
- Add real student feedback to `testimonials` and a testimonials section appears on the home page.

## Project structure

```
index.html                 app shell
assets/css/styles.css      design system (light + dark)
assets/js/config.js        teacher & business settings
assets/js/data.js          learning content
assets/js/core.js          storage, timezones, auth, data, XP/badges, SRS, scheduling, calendar, speech
assets/js/ui.js            icons, toasts, modals, command palette, certificate, charts
assets/js/router.js        hash router with auth guards
assets/js/app.js           header/footer, theme, global shortcuts, routes
assets/js/pages/*.js       one file per page
```

## A note on the demo backend

This portfolio version stores accounts, bookings and progress in the browser's `localStorage`.
In production, the same modules would call an API (for example Node/Express or Firebase), and the checkout would use Stripe or PayPal.
