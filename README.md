# Veroushka Ramjiawan — Personal Portfolio
 
A four-page personal portfolio website built with plain **HTML, CSS, and JavaScript** — no frameworks, no build tools, no dependencies. Made for a school assignment at UNASAT (Stichting University of Applied Sciences and Technology Suriname).
 
The site follows an **origami + graffiti** visual direction: torn/ripped paper textures in the nav and footer, a taped-up scrapbook look on the About page, and a GitHub-console mockup on the Work page.
 
Live site: **https://veroush.github.io/**
 
---
 
## Table of Contents
 
- [Tech Stack](#tech-stack)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Known Limitations](#known-limitations)
---
 
## Tech Stack
 
Plain vanilla **HTML5, CSS3, and JavaScript** — a school requirement, so there is intentionally:
 
- No frameworks (React, Vue, etc.)
- No CSS libraries (Bootstrap, Tailwind, etc.)
- No build tool or bundler — **this project does not use Vite, Webpack, or npm scripts.** There is nothing to install and nothing to compile.
The only external service used is [Formspree](https://formspree.io) (free tier) for handling contact form submissions, since there's no backend.
 
---
 
## Running Locally
 
Because there's no build step, you can open the site in two ways:
 
**Option 1 — Just open the file**
Double-click `index.html` (or right-click → Open with → your browser). Good enough for quick visual checks, but some things (like `fetch` calls to Formspree) may behave oddly over the `file://` protocol.
 
**Option 2 — Serve it locally (recommended)**
Any simple static server works. For example, with the VS Code **Live Server** extension: right-click `index.html` → "Open with Live Server."
 
Or, if you have Python installed:
 
```bash
python -m http.server 8000
```
 
Then visit `http://localhost:8000` in your browser.
 
No `npm install`, no `node_modules`, no config file required.
 
---
 
## Project Structure
 
```
project/
├── index.html            # Home page
├── about.html             # About page (scrapbook/sticky-note motif)
├── work.html              # Work page (GitHub console mockup)
├── contact.html           # Contact page (postcard + typewriter easter egg)
│
├── css/
│   ├── main.css           # Global styles — reset, fonts, nav, hero,
│   │                       # about-strip, experience/projects, skills, footer
│   ├── about.css           # About page styles
│   ├── work.css            # Work page styles
│   └── contact.css         # Contact page styles
│
├── js/
│   ├── main.js             # Mobile hamburger nav toggle
│   └── contact.js           # Fake caret, submit-to-envelope flow, Formspree
│                             # submission, typewriter audio + beat-sync animation
│
├── fonts/
│   ├── half-term-schools-out-v4q5l.ttf   # Handwriting font (about/story text)
│   ├── shiny-paint-zpwez.otf              # Display font (hero name, nav, headings)
│   └── right-round-wq7g.ttf               # Accent font (roles list, contact header)
│
└── img/
    ├── aboutpage/          # Photos, tape/arrow graphics, hobbies cluster icons
    ├── contactpage/        # Postcard art, contact icons, typewriter audio + graphics
    ├── homepage/            # Homepage imagery
    └── workpage/             # GitHub-console mockup icons and graphics
```
 
---
 
## Pages
 
| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero intro, quick nav, roles list, experience/projects preview, skills |
| About | `about.html` | Personal story told through a taped-up scrapbook layout — school photos, volunteering, a writing competition and published book, and a hobbies cluster |
| Work | `work.html` | A GitHub-style console mockup showcasing project cards (TaskFlow, Chronicles of Booksteria, Pixel Jumper: Arcade Odyssey, Studie4SU) |
| Contact | `contact.html` | A postcard-style contact form (delivered via Formspree) plus a click-to-play typewriter audio easter egg |
 
---
 
## Deployment
 
The site is published via **GitHub Pages** as a root user page (`veroush.github.io`), so there is no separate deploy step:
 
```bash
git add .
git commit -m "your message here"
git push
```
 
Pushing to `main` triggers an automatic redeploy. A hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) may be needed in the browser if changes don't show up right away.
 
---
 
## Browser Support
 
Primarily tested in **Microsoft Edge**. Should work in any modern Chromium-based browser (Chrome, Edge) and Firefox. Not tested against older/legacy browsers.
 
---