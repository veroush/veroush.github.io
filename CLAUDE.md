# Session Handoff Document — Veroushka Ramjiawan Portfolio

---

## ⚠️ GIT RULES — READ THIS FIRST

- After EVERY task, no matter how small, remind Veroushka to stage, commit, and push
- Always suggest a commit message in this format:
  - `feat:` new feature or section added
  - `fix:` bug or broken thing corrected
  - `style:` CSS or visual changes only
  - `refactor:` restructuring code without changing behavior
  - `chore:` moving files, renaming, cleanup
- For any significant feature, suggest creating a branch first:
  ```bash
  git checkout -b feature/branch-name
  ```
  and merging back to main when done
- **Veroushka tends to forget git entirely — remind proactively, do not wait to be asked**
- **⚠️ CARRIED OVER: confirm `git status` at the start of the next session before making any further edits, to make sure nothing from the previous session was left uncommitted.**

---

## 1. PROJECT OVERVIEW

- Personal portfolio website for Veroushka Ramjiawan
- IT student at UNASAT (Stichting University of Applied Sciences and Technology Suriname), Paramaribo
- School assignment requiring: home, about, work, and contact pages
- Visual direction: origami + graffiti school aesthetic, ripped/torn paper texture imagery for nav and footer, continuous color gradient flowing down the homepage. About page uses a "taped-up scrapbook/sticky-note" visual motif (tape graphics, overlapping photos, handwriting font).
- Tech stack: plain vanilla HTML, CSS, JavaScript only — no frameworks, no libraries (teacher requirement)
- GitHub base: `https://github.com/Veroush/`
- Site is already published via GitHub Pages — standard `git add . / git commit / git push` workflow triggers redeploy automatically. No separate deploy step needed. Browser hard refresh may be needed if changes don't appear live immediately.
- Veroushka uses Microsoft Edge as her primary browser — relevant for any browser-specific rendering bugs (previously documented: Chromium/Edge caret-under-rotated-ancestor rendering bug, see Section 13).
- Site loads slowly due to the large number of images in `img/`. A full image optimization plan has been discussed and documented (see Section 10) but is **explicitly deferred to the end of the project**.

---

## 2. FOLDER & FILE STRUCTURE

```
project/
├── css/
│   ├── main.css          # global styles — reset, fonts, nav, hero, about-strip, experience-projects,
│   │                      # skills, footer. Footer background scoped via .footer--home modifier.
│   │                      # Homepage restructuring changes confirmed committed — see Section 8.
│   ├── about.css         # row--5 (writing/book) fully repositioned; hobbies section styles present
│   │                      # (.about-school__row--hobbies, .about-school__hobbies-title,
│   │                      # .about-school__hobbies-cluster, 11 individual .about-school__hobby-img--* classes).
│   │                      # Confirmed committed.
│   ├── work.css          # Full ruleset for .work-console, .work-console__bg, .work-console__screen,
│   │                      # .work-topbar, .work-nav-row, .work-subnav, .work-visual-cluster,
│   │                      # .project-cards + .project-card__* classes. Reworked to fully static/
│   │                      # independently-positioned system this session — see Section 8.
│   └── contact.css       # contains dead CSS (.contact-card__fake-caret, .contact-card__mirror,
│                          # @keyframes contact-caret-blink) since contact.js no longer exists. Not cleaned up.
├── fonts/
│   ├── ModularAmplitude-mR6a.ttf       # removed from use — @font-face block deletion still unconfirmed in main.css
│   ├── Sprinklescolors-njrJ.ttf        # unused — confirm if intentional
│   ├── HalfTermSchoolsOut-V4q5l.ttf    # handwriting font — used across all about-story__ and about-school__ text elements
│   ├── ShinyPaint-ZpWEZ.otf            # hero name, nav links, h2, h3, .about-intro__title, .about-school__hobbies-title
│   └── RightRound-Wq7G.ttf             # roles-list font, purple color, contact page header
├── js/
│   ├── main.js             # mobile hamburger nav toggle logic — still not re-tested against current nav structure
│   └── contact.js          # removed/emptied in a prior session — still unconfirmed whether file was deleted or just emptied
├── img/
│   ├── favicon.png / logo.png / nav icons / footer icons — unchanged. Flagged for eventual compression/resize pass
│   │   (see Section 10) — not yet touched.
│   ├── aboutpage/
│   │   ├── background2.png       # about-intro bg, displays at 800px wide — resize target ~1600px
│   │   ├── aboutme-header.png    # about-intro header img, displays at 700px wide — resize target ~1400px
│   │   ├── paramaribo.png        # displays at 400px wide — resize target ~800px
│   │   ├── tape1.png             # displays at 90px wide — resize target ~180px
│   │   ├── id.png                # displays at 220px wide — resize target ~440px
│   │   ├── arrow1.png            # unchanged
│   │   ├── unasat.jpg            # UNASAT campus photo, displays at 480px wide — resize target ~960px.
│   │   │                          # Filenames confirmed correct by Veroushka — DO NOT flag mismatches again.
│   │   ├── arrow2.png            # used twice: row--1 (`.about-school__arrow--1-big`), row--2 (`.about-school__arrow--2-big`)
│   │   ├── unasat-fair.jpeg      # fair/class project photo, row--2, displays at 400px wide — resize target ~800px
│   │   ├── havo3.jpeg            # Havo 3 photo, row--3, displays at 400px wide (shared `.about-school__image` default) — resize target ~800px
│   │   ├── arrow6.png            # Havo 3 row arrow; also reused on homepage `.about-strip__arrow`
│   │   ├── HSKKH2.jpg / HSKH.jpg # volunteering photo, used TWICE (stacked/overlapping) in row--4, each displays at
│   │   │                          # 350px wide — resize target ~700px each. Filenames confirmed correct — DO NOT flag again.
│   │   ├── arrow3.png            # volunteer row arrow
│   │   ├── news-paperclipping.jpg # writing competition clipping, row--5, displays at 380px wide — resize target ~760px.
│   │   │                           # Filename confirmed correct — DO NOT flag again.
│   │   ├── nana-aisa.jpeg        # published book photo, row--5, overlaps bottom portion of the newspaper clipping
│   │   │                          # image, displays at 200px wide — resize target ~400px
│   │   ├── arrow4.png            # writing row arrow (next to writing text)
│   │   ├── arrow5.png            # writing row second arrow (next to book text) — NOTE:
│   │   │                          # `.about-school__arrow--5` is set to width: 1100px intentionally.
│   │   │                          # DO NOT "fix" this width. See Section 13 for a flagged possible
│   │   │                          # contradiction worth a visual sanity check.
│   │   ├── 50s-music.png / 80s-stuff.png / books.png / coding.png / daydreaming.png / fantasy.png /
│   │   │   movies.png / volunteering.png / writing.png  # hobbies cluster, display at 100px wide each —
│   │   │                                                  # resize target ~200px each
│   │   ├── burger-king.png       # hobbies cluster, displays at 80px wide — resize target ~160px
│   │   └── swimming.png          # hobbies cluster, displays at 90px wide — resize target ~180px
│   ├── contactpage/ — unchanged. Postcard background displays at 750px wide — resize target ~1500px.
│   │   Contact icons display at 60px — resize target ~120px.
│   ├── homepage/ — unchanged
│   └── workpage/ — console.png, url-bar.png, hamburger.png, work-github.png, searchbar.png, copilot.png,
│                   create-new.png, issues.png, pulls.png, notifications.png, flork2.png, overview.png,
│                   repositories.png, projects.png, packages.png, stars.png, smiley-face.png,
│                   project-card.png, public-icon.png, yellow-circle.png, redcircle.png
├── index.html              # Restructured `.about-strip__right` — sticky-note text replaced with nav links,
│                            # added intro text block, bio text block, and arrow6 image. Confirmed committed.
│                            # KNOWN ISSUE: `.about-strip__notebook` and `.about-strip__right` still missing
│                            # explicit closing tags — low priority, carried over.
├── about.html              # row--5 reorder + hobbies section confirmed committed.
├── work.html                # Full GitHub-style console mockup: url-bar, hamburger+github row, 7-icon nav
│                             # cluster, 5-icon subnav, visual cluster (flork2.png + smiley-face.png), and
│                             # 4 project cards (studie4su, taskflow, pixel-jumper-arcade-odyssey,
│                             # chronicles_of_booksteria). Reworked this session to fully static/independent
│                             # positioning — see Section 8. project-card--1/2/3/4 classes added to each card.
└── contact.html             # unchanged
```

---

## 3–7. ROUTES / DATABASE / CONTROLLERS / MIDDLEWARE / AUTH

Not applicable — static HTML/CSS/JS only, no backend. Skipping.

---

## 8. FEATURES ALREADY WORKING

### Homepage (`index.html` / `main.css`) — confirmed committed
- `.about-strip` background simplified to two-stop `linear-gradient(180deg, #3e6881 0%, #ffffff 45%)`
- `.experience-projects`, `.skills`, `.footer--home` backgrounds changed to plain `#ffffff`
- `.about-strip` `min-height` reduced from 950px toward 700px (exact final value TBD — was mid-tuning)
- `.about-strip__notebook img` given its own width override, independent of container width
- `.about-strip__photo` given `border: 3px solid #000`
- Sticky note content replaced: original bio `<p>` swapped for an About/Work/Contact `<ul>` nav
  (`.about-strip__sticky-text`), links to about.html/work.html/contact.html, `font-size: 1.4rem`,
  `flex-direction: column` + `gap`, `transform: translateX(-20px)` combined with existing `rotate(3deg)`
- New `.about-strip__intro-text` added above the sticky note ("Hello there!..."), `HalfTermSchoolsOut` font,
  manually line-broken via `<br>`, first two lines wrapped in `.about-strip__intro-text--top` with its own
  `top: -10px` offset
- New `.about-strip__bio-text` added ("I'm a curious, adventure-seeking tech enthusiast...")
- New `.about-strip__arrow` added — reuses `arrow6.png`, independently sizable/movable/rotatable
- `.roles-list__heading` / `.roles-list` restyled to `HalfTermSchoolsOut`/`#333`/`1.4rem`
- New `.about-strip__roles` wrapper added around heading + list so both move together via one `top`/`left`

### About page (`about.html`) — `.about-school` section, all rows confirmed committed
- **Row 1 — UNASAT**: text wrapper (two lines moving as one unit), big rotated arrow, enlarged campus image
- **Row 2 — Fair**: image left, rotated arrow, text right (mentions the rotatable tracking camera)
- **Row 3 — Havo 3**: text, arrow6.png, havo3.jpeg
- **Row 4 — Volunteering**: image stack → arrow → text. `.about-school__visual--volunteer` wraps
  `HSKKH2.jpg` (`--volunteer-back`) and `HSKH.jpg` (`--volunteer-front`), overlapping, independently positioned/rotated
- **Row 5 — Writing / Book**: final confirmed HTML order is text block → both arrows → both images
  (reads left to right). Three wrapper divs: `.about-school__text-group-writing`,
  `.about-school__arrows-writing`, `.about-school__visual--writing`. All six elements individually
  positioned via their own `top`/`left`/`width`/`transform`. `.about-school__arrow--5` is intentionally
  `width: 1100px` — **do not "fix" this** (see Section 13 for a flagged contradiction worth a visual check)
- **Hobbies section**: new row `.about-school__row--hobbies` after row--5, inside `.about-school`.
  Centered `<h2 class="about-school__hobbies-title">Some of my hobbies:</h2>` (ShinyPaint font) +
  `.about-school__hobbies-cluster` (flex-wrap) holding 11 images, each with a shared base class
  (`.about-school__hobby-img`, 150px) plus its own override class (actual live widths 80–100px, smaller
  than the 150px base). Cluster gap `0.5rem`, nudged right via `margin-left: 80px`.
  `margin-top: -150px` currently applied to move the section up — not yet explicitly reconfirmed as final.

### Work page (`work.html` / `work.css`) — major refactor this session, confirmed committed
- `.work-console` changed from `overflow: hidden` to `overflow: visible` — nothing clips at the console edge
- `.work-console__screen` had its fixed `height` and `overflow: hidden` removed — now just a positioning anchor
- All nav-row icons (hamburger, github, searchbar, copilot, create, issues, pulls, notifications, flork)
  converted to individually positioned classes (`.work-nav-row__hamburger`, `.work-nav-row__github`, etc.),
  each with its own `top`/`left`, fully independent
- `.work-visual-cluster__flork` and `.work-visual-cluster__smiley` confirmed independently positioned
- Project cards converted from CSS grid to fully independent absolute-positioned blocks —
  `.project-card--1/2/3/4` classes added to each card's `<div>` in `work.html`, each with its own `top`/`left`
- `.project-cards` (wrapper) changed from `position: relative` to `position: absolute` with its own
  `top`/`left` — moves all 4 cards together as one cluster, preserving their relative spacing
- Vertical gap between card rows 1–2 and 3–4 fixed by lowering `.project-card--3`/`--4`'s `top`
  (was `350px`, tuned down — exact final value still being adjusted by feel)
- `.project-card__public-icon` independently positioned (`position: absolute`, own `top`/`right`/`width`)
- `.project-card__lang-dot` and `.project-card__lang-text` separated out of the old flex layout into
  independent absolute-positioned elements — resizing/moving the yellow/red circle no longer affects
  the language text next to it
- `.project-card__public-text` ("Public" label) re-added as an independent absolute-positioned element
- Red circle image filename bug fixed (was `redcircle.png` mismatch — see Section 9)

### Other existing features (unchanged)
- `.about-story` section (Paramaribo photo, tape, ID, arrow, caption, intro text) — working, committed
- Footer page-scoped background via `.footer--home` modifier — working
- Contact page structure (postcard, icon column, thank-you section) — working structurally; message
  textarea has no JS behavior (paused)

---

## 9. BUGS & ERRORS WE FIXED (AND TECHNICAL DEBT FLAGGED)

### Row--5 element order was backwards from intent
- **Cause**: in this flexbox pattern, whichever element comes first in HTML source order renders leftmost.
- **Fix**: reordered wrapper divs to text-group → arrows → images.
- **Lesson**: "First in HTML" = "leftmost on screen" throughout `.about-school`. Confirm rendered order matches intent, don't assume.

### `.about-school__text--book` width change had no visible effect
- **Cause #1**: `flex: 1` was overriding the intended width.
- **Cause #2 (actual fix)**: parent wrapper `.about-school__text-group-writing` had no `max-width` of its
  own, implicitly constraining the child. Widening the wrapper resolved it.
- **Lesson**: if a child's width change appears to do nothing, check parent wrapper constraints first.

### Arrow width of `1100px` on `.about-school__arrow--5`
- Flagged as a likely typo, but confirmed intentional. **Do not "correct" this value.**

### `.about-strip__bio-text` / `.about-strip__arrow` nested inside `.about-strip__sticky-wrap`
- **Cause**: `.about-strip__sticky-wrap` is `position: absolute`, so absolutely-positioned children
  nested inside it position relative to the wrap div instead of `.about-strip`, breaking the intended
  coordinate space.
- **Fix**: moved both elements to be siblings of `.about-strip__sticky-wrap` so they position relative
  to `.about-strip` like the notebook/photo/tape.
- **Lesson**: always check the actual DOM ancestor of an absolutely-positioned element, not just visually
  where it appears to sit.

### `.experience-projects` appearing "too far down" (non-bug / clarification)
- Actually caused by `.about-strip`'s oversized `min-height: 950px` leaving dead white space, not by
  `.experience-projects`'s own positioning. Reducing `.about-strip`'s `min-height` was the correct fix
  rather than pulling `.experience-projects` up with margin.

### Resizing an in-flow image pushes surrounding content up/down
- **What happened**: resizing `.work-topbar__url` and later `.work-console__bg` caused everything below
  them (nav rows, project cards) to shift position.
- **Cause**: both images were in normal document flow (no `position: absolute`), so their own height
  directly determined their parent's height, and everything after them reflowed.
- **Fix**: gave the parent a fixed height of its own, then set the image to `position: absolute` so it's
  sized/positioned independently.
- **Lesson**: always check whether an element is in normal flow before resizing it if things nearby move unexpectedly.

### Work page cards 3 & 4 invisible
- **Cause**: `.work-console__screen`'s fixed `height: 70%` + `overflow: hidden` clipped content taller
  than the box.
- **Fix evolution**: first tried `overflow-y: auto` (scroll), then switched to a full static/independent
  layout instead (removing the clipping constraint entirely — see Section 8).

### Project cards stacked on top of each other
- **Cause**: `.project-card--1` through `--4` CSS rules existed but the matching classes were never added
  to the actual `<div>` elements in `work.html`.
- **Fix**: added `project-card--1/2/3/4` to each card's class attribute.

### "Public" and description text appearing below the card instead of inside it
- **Cause**: `.project-card` had no explicit `height`. With `position: absolute` and no height, the box
  collapsed to zero height, so `.project-card__content` (`inset: 0`) had no room and content overflowed downward.
- **Fix**: added an explicit `height` value to `.project-card`.

### Red circle image not displaying on card 4
- **NOT a positioning bug** — was a filename/path mismatch (404).
- **Lesson**: when an image doesn't appear, check dev tools Network/Console for a 404 before assuming it's a CSS positioning issue.

### Condensed prior fixes
- Large vertical gap between `.about-story` and `.about-school` — pragmatic `margin-top: -250px` nudge applied to `.about-school`.
- Class name collision: `.about-intro` reused for hero and story section — renamed to `.about-story`.
- Footer cream-block-on-non-homepage bug — fixed via `.footer--home` modifier scoping.
- Chromium/Edge caret-under-rotated-ancestor rendering bug — documented, proven fix (mirror-div technique) designed but not re-applied to live files.
- Missing CSS for row--5 writing visual — fixed.
- Volunteer row element order — fixed.
- Volunteer text overlapping images — fixed via `flex: none; max-width: 350px;`.
- Filenames flagged as unconfirmed — Veroushka has explicitly confirmed all filenames are correct as named. **Resolved — do not re-flag.**

---

## 10. WHAT STILL NEEDS TO BE DONE

### Work page — ACTIVE AREA, in progress
- [ ] Fine-tune exact `top`/`left` values for all 4 project cards — current values are a first pass, not confirmed final
- [ ] Subnav icons (`overview.png`, `repositories.png`, `projects.png`, `packages.png`, `stars.png`) still
  do NOT have individual position classes — currently all stacked at the same spot. Same treatment needed
  as the nav-row icons and project cards.
- [ ] `.project-card__lang` block's exact position (currently `bottom: -2rem`) not yet confirmed as final
- [ ] Confirm final sizing/position of `.project-card__public-icon` (currently `width: 80px` — notably
  larger than the original `20px`, worth double-checking this was intentional)
- [ ] `.work-console__screen`'s `top/left/width` values are still placeholder, not yet confirmed to align
  with the real visible screen area of `console.png`
- [ ] Everything on the work page is now unclipped/static — worth a final visual pass to make sure nothing
  looks awkwardly spaced now that the old flex/grid alignment is gone
- [ ] No descriptions/content decided yet for anything below the project cards

### About page — ACTIVE AREA, in progress
- [ ] Confirm whether `margin-top: -150px` on `.about-school__row--hobbies` is the final "move this section up" fix
- [ ] Fine-tune final position/size/rotation numbers for the hobbies image cluster — first pass, not confirmed final
- [ ] Consider whether the hobbies cluster should be truly centered (`align-items: center`) rather than
  left-aligned + manually nudged right (`margin-left: 80px`) — not confirmed as final
- [ ] Add the "Who I Am" text block and "Education" timeline section to the actual HTML — wording drafted
  and approved (see Section 12) but NOT yet added to `about.html`. Needs a placement decision (likely above `.about-story`)
- [ ] Photo section build order: UNASAT ✅ / Fair ✅ / Havo 3 ✅ / Volunteering ✅ / News clipping ✅ /
  Book ✅ / Hobbies ✅ (positioning still being tuned) / **"People I admire" — EXPLICITLY DEFERRED, do not
  build unless Veroushka brings it up again**
- [ ] Resolve naming/scope check: the "Who I Am" text mentions "IT support" — unclear if this maps to a
  specific job/internship/coursework or overlaps with Opo Doro volunteering. Not yet clarified.
- [ ] Nice-to-have: consider pacing/order feedback (photo sections peak emotionally then move into a
  lower-key hobbies section); consider a closing line tying the photo-story back to why she codes.
- [ ] Optional: tape graphic overlays (`tape1.png`) on hobby images — offered, declined for now.

### Performance — deferred to end of project
- [ ] **Full image compression + resize pass.** Agreed approach:
  1. Use [Squoosh](https://squoosh.app) (free, browser-based, no install) to compress/resize each image manually
  2. Resize target = 2x the actual CSS display width (for retina sharpness), not the current source file size
  3. Format: MozJPEG for photos (unasat.jpg, havo3.jpeg, nana-aisa.jpeg, etc.), WebP for icon/graphic-style
     images (hobby cluster, tape, arrows) where format swap won't break references
  4. Add `loading="lazy"` to `<img>` tags below the fold
  5. Full resize target table is documented in Section 2 (folder structure) next to each image
  6. **If format changes (e.g. PNG → WebP), HTML/CSS references must be updated to match** — no automatic fallback
  7. Keep original files backed up before replacing anything
- [ ] Unused fonts/files (`Sprinklescolors-njrJ.ttf`, `ModularAmplitude-mR6a.ttf` @font-face block) —
  same "dead weight" category, could be bundled into the same pass

### Spacing/positioning cleanup — growing list, flagged for a dedicated pass before final submission
- [ ] `.about-story__caption` and `.about-story__id` — original large offset values, never cleaned up
- [ ] `.about-school { margin-top: -250px; }` — manual section-level nudge, not a structural fix
- [ ] Large, growing set of per-element modifier classes across `.about-school` — functional but a lot to
  track, worth consolidating/documenting before final submission
- [ ] Full mobile responsive pass — not started, increasingly relevant given the number of fixed pixel
  widths/positions across `.about-story`, `.about-school`, the hobbies cluster, and now the work page

### Contact page (`contact.html`) — PAUSED
- [ ] Message textarea rebuild decision
- [ ] `contact.js` file-deletion-vs-empty confirmation
- [ ] Orphaned CSS cleanup (`.contact-card__fake-caret`, `.contact-card__mirror`, `@keyframes contact-caret-blink`)
- [ ] Postcard rotation mismatch confirmation
- [ ] Submit functionality
- [ ] Icon file verification

### Global
- [ ] Re-test mobile hamburger nav (`main.js`) against current nav structure — still unresolved

---

## 11. WHERE WE LEFT OFF

- **This session's topic**: Full rework of `work.html`/`work.css` — converted the entire console mockup
  from flex/grid-based layout with clipping containers to a fully static, independently-positioned system
  (matching the `about.css` philosophy) so every element can be resized/moved without affecting anything else.
- **Completed**: console/screen unclipped, nav-row icons individually positioned, project cards separated
  and grouped into a movable cluster, public-icon/public-text/lang-dot/lang-text made independent, red
  circle filename bug fixed.
- **Not completed**: subnav icons still stacked (no individual classes yet); several values across the
  page are first-pass placeholders needing fine-tuning (see Section 10).
- **Very next step**: add individual position classes to the 5 subnav icons (same pattern as nav-row
  icons), then continue fine-tuning positions across the page.
- **Commits this session**: confirmed committed and pushed by Veroushka.

---

## 12. PERSONAL DETAILS & CONTENT

- **Name**: Veroushka Ramjiawan
- **Date of birth**: 2005-07-18
- **School**: UNASAT, Paramaribo — Software Engineering, 11/2024–Present
- **GitHub**: `https://github.com/Veroush/`
- **LinkedIn**: `https://www.linkedin.com/in/veroushka-ramjiawan-636114392/`
- **Email**: ramjiawanveroushka95@gmail.com (pre-filled in the contact page postcard's "To:" field)
- **Phone**: 7462470 (used in the contact page's `tel:` link as `+5977462470`)
- **Location**: Leysweg 105a, Paramaribo, Suriname
- **Primary browser**: Microsoft Edge

### About page — finalized/live text content

**`.about-story__text` (live):**
> My name is Veroushka Ramjiawan.
> I am a spirited Software Engineering student with hands-on experience in fullstack web development, ERP software testing and IT support. I combine my technical skills with strong communication, learn fast, and love working independently on problems that need solving.

**`.about-story__caption` (live):** "I live in Paramaribo, Suriname. This is my home."

**`.about-school` — UNASAT row (live):**
> I'm currently studying at Stichting University of Applied Sciences and Technology Suriname (UNASAT).
> I started in November 2024, and it's where I found my passion in tech, building projects that make me a better developer and student.

**`.about-school` — fair row (live):** "My first year: at the annual fair we built a rotatable tracking camera. It was one of my first real tastes of building something as a team and showing it off to other people."

**`.about-school` — Havo 3 row (live):** "Before this I was a student at Havo 3, from 2020 till 2022."

**`.about-school` — volunteer row (live):** "Outside of tech, giving back to my community matters a lot to me. I've spent time volunteering, from helping kids with STEM education to supporting disabled community members."

**`.about-school` — writing row (live):** "I like writing stories too. I made the 4th place in the Sori Yu Talenti - writing competition in 2025 alongside four other amazing finalists, and it's still one of my proudest moments."

**`.about-school` — book text (live):** "All five of us finalists had our stories put together into one published book called Nana Aisa. Seeing my writing in an actual printed book, next to fellow young students, inspired me to pursue writing more."

**`.about-school` — hobbies header (live):** "Some of my hobbies:" — rendered in the ShinyPaint font.

**Hobbies image list (live, no captions — image-only cluster):** 50s-music.png, 80s-stuff.png, books.png, burger-king.png, coding.png, daydreaming.png, fantasy.png, movies.png, swimming.png, volunteering.png, writing.png — all located in `img/aboutpage/`.

### Not-yet-placed drafted content

**Longer "Who I Am" draft (NOT currently in any file):**
> I'm Veroushka Ramjiawan and I am an enthusiastic Software Engineering student currently studying at UNASAT in Paramaribo, Suriname, with hands-on experience in fullstack web development, ERP software testing and IT support. I combine technical skills with strong communication, learn fast, and love working independently on problems that actually matter.
>
> From building fullstack platforms in JavaScript to testing enterprise systems and troubleshooting networks on the fly, I've worked across different sides of tech and every role has made me sharper. I care about writing code that works well and building projects that bring light to real problems.
>
> Outside of tech, giving back to my community matters a lot to me — I've spent time volunteering, from helping kids with STEM education to supporting clients through Opo Doro Thuisbegeleiding.

**Education section (drafted, NOT yet added to `about.html`):**
> **Nov 2024 – Present**
> UNASAT
> Software Engineering — Stichting University of Applied Sciences and Technology Suriname
> Studying fullstack development, software architecture, databases, and testing. Building real-world projects across the full web stack in JavaScript, C#, and Java.
>
> **Oct 2020 – Jul 2022**
> Havo 3
> Secondary School — Paramaribo
> Completed secondary education and developed an early interest in technology and creative problem-solving that eventually led to a career in software engineering.

**"People I admire" — DEFERRED, reference material only:**
Elon Musk, Billy Graham, Princess Diana, Sir David Attenborough, Keanu Reeves — quotes drafted per person in a prior chat, placeholder "why I admire them" reasoning left blank pending Veroushka's own reflection. Can be regenerated on request.

### Projects (Work page content)
- **TaskFlow** — `https://github.com/Veroush/taskflow` — React, Node.js, PostgreSQL, Prisma
- **Chronicles of Booksteria** — `https://github.com/Veroush/chronicles_of_booksteria` — HTML/CSS/vanilla JS
- **Pixel Jumper: Arcade Odyssey** — `https://github.com/Veroush/pixel-jumper-arcade-odyssey` — Phaser 3
- **Studie4SU** — `https://github.com/Veroush/studie4su` — Node.js/Express/Prisma/MySQL, JWT auth, admin dashboard

(All other personal/content details — roles list, skills section content, work experience, hero bio — unchanged from prior handoffs, not repeated here for brevity.)

---

## 13. SIDE TOPICS

- **Graduation/school photos on the about-me page**: discussed and confirmed as a good idea. Resolved, no action item.
- **Large pixel offset values in CSS "normal"?**: discussed at length — not wrong, but flagged as
  fragile/non-responsive. Still an open item for a future dedicated cleanup pass.
- **Chromium/Edge caret-under-rotated-ancestor bug**: worth remembering as a general pattern for this project — carried over.
- **Nokia phone contact page concept**: earlier fully-built interactive flip-phone contact page, scrapped
  in favor of postcard concept, code exists in history if revisited for a different project. Carried over.
- **Filename confirmation**: Veroushka explicitly stated all filenames in use are correct as named. Resolved — do not re-raise.
- **Possible contradiction flagged, still unresolved**: Veroushka described `.about-school__arrow--5` as
  "very small" while asking to keep its `width: 1100px` value unchanged. Worth a quick visual confirmation
  next session in case there's a mismatch between intent and what's actually live.
- **Page load speed / image optimization**: full discussion covered why images slow load times, Squoosh
  workflow, file size vs. CSS display size, and a full per-image resize target table (now in Section 2/10).
  **Resolution: deferred to end of project.** Not urgent, but should be picked back up before final submission.

---

## ⚠️ GIT RULES — REMINDER AT THE BOTTOM

- After EVERY task, remind Veroushka to stage, commit, and push
- Suggest commit messages using `feat:`, `fix:`, `style:`, `refactor:`, `chore:` prefixes
- Suggest branches for big features
- **Do not wait to be asked — remind proactively every time**
- **⚠️ Confirm `git status` at the start of the next session before making further edits**

```bash
git add .
git commit -m "your message here"
git push
```

# Session Handoff Document — Veroushka Ramjiawan Portfolio (Work Page Session)

---

## ⚠️ GIT RULES — READ THIS FIRST

- After EVERY task, no matter how small, remind Veroushka to stage, commit, and push
- Always suggest a commit message in this format:
  - `feat:` new feature or section added
  - `fix:` bug or broken thing corrected
  - `style:` CSS or visual changes only
  - `refactor:` restructuring code without changing behavior
  - `chore:` moving files, renaming, cleanup
- For any significant feature, suggest creating a branch first:
  ```bash
  git checkout -b feature/branch-name
  ```
  and merging back to main when done
- **Veroushka tends to forget git entirely — remind proactively, do not wait to be asked**
- Confirm `git status` at the start of the next session before making any further edits, to make sure nothing from this session was left uncommitted.

---

## 1. PROJECT OVERVIEW

- Personal portfolio website for Veroushka Ramjiawan
- IT student at UNASAT (Stichting University of Applied Sciences and Technology Suriname), Paramaribo
- School assignment requiring: home, about, work, and contact pages
- Tech stack: plain vanilla HTML, CSS, JavaScript only — no frameworks, no libraries (teacher requirement)
- GitHub base: `https://github.com/Veroush/`
- Site is published via GitHub Pages — standard `git add . / git commit / git push` triggers redeploy automatically
- This session focused entirely on **`work.html` / `work.css`** — the GitHub-style console mockup page

---

## 2. FOLDER & FILE STRUCTURE (files touched this session)

```
project/
├── css/
│   └── work.css   # All changes this session — see Section 8 for full breakdown
└── work.html      # Subnav icons given individual + label markup — see Section 8
```

All other files (`main.css`, `about.css`, `about.html`, `index.html`, `contact.html`, `contact.css`, fonts, images) — **unchanged this session**. Refer to the prior full handoff document for their state.

---

## 3–7. ROUTES / DATABASE / CONTROLLERS / MIDDLEWARE / AUTH

Not applicable — static HTML/CSS/JS only, no backend. Skipping.

---

## 8. FEATURES ALREADY WORKING (added/changed this session)

### Subnav icons + labels (`.work-subnav`)
- 5 subnav icons (`overview.png`, `repositories.png`, `projects.png`, `packages.png`, `stars.png`) each given their own position class (previously all stacked at `0,0`)
- Each icon wrapped in a `.work-subnav__item` div alongside a new `<span class="work-subnav__label work-subnav__label--*">` text element (Overview / Repositories / Projects / Packages / Stars)
- Labels positioned independently per item (`.work-subnav__label--overview`, etc.), each offset to sit just right of its matching icon
- `.work-subnav` (the whole cluster) is `position: relative` with its own `top`/`left` — moving it shifts all 5 icon+label pairs together as one unit without affecting anything else on the page
- Icon size controlled via shared `.work-subnav__icon { height: 30px }`; label size controlled via shared `.work-subnav__label { font-size: 1.2rem }`

### Nav row icons — split into independently movable left/right clusters (`.work-nav-row`)
- `.work-nav-row__left` (hamburger, github) and `.work-nav-row__right` (searchbar, copilot, create, issues, pulls, notifications, flork) both given `position: relative` with their own `top`/`left`
- This allows the two clusters to move independently — e.g. `.work-nav-row__right` was shifted down via `top: 100px; left: 480px`, and `.work-nav-row__left` was matched to `top: 100px` (same line) while keeping `left: 0px` (stays on the left side of the page)
- **Important pattern for next session**: these two clusters do NOT auto-sync — if the row is nudged up/down again, `top` must be updated on BOTH `.work-nav-row__left` and `.work-nav-row__right` manually to keep them aligned on the same line
- Every individual icon in the row (`.work-nav-row__hamburger`, `__github`, `__searchbar`, `__copilot`, `__create`, `__issues`, `__pulls`, `__notifications`, `__flork`) now has its own explicit `height` AND `width` (not just `height` with `auto` width as before) — sizes were hand-tuned individually this session, see live values in `work.css`
- **Note**: setting both `height` and `width` explicitly means these icons will stretch to fill that exact box rather than preserving natural image proportions. Fine for square-ish icons; `searchbar` specifically was set to `height: 80px; width: 200px` (a 2.5:1 ratio) — worth a visual check that this doesn't look stretched/squashed relative to the source image's real proportions

### Visual cluster (flork2 + smiley) — now independently movable
- `.work-visual-cluster` given `top: 50px` (previously had no `top` at all, which was the cause of a bug this session — see Section 9)
- Moving `.work-visual-cluster`'s `top`/`left` now shifts both `flork2.png` and `smiley-face.png` together without affecting the project cards, subnav, or nav row

### Project cards cluster
- `.project-cards`' `top` bumped from `230px` → `300px` to shift all 4 cards downward as a group, independent of everything else on the page (unchanged mechanism from prior session, just a new value)

---

## 9. BUGS & ERRORS WE FIXED (this session)

### Flork2 (in `.work-visual-cluster`) didn't move when project cards were shifted down
- **Cause**: `.work-visual-cluster` had `position: relative` and a `height`, but **no `top` value was ever added** — the instruction to add one was given, but the actual CSS edit was missed/not pasted in by Veroushka.
- **Fix**: added `top: 50px;` (matching the same downward shift as `.project-cards`) directly to `.work-visual-cluster`.
- **Lesson**: when a "move this cluster" pattern is applied, double-check the container itself actually received the new `top`/`left` — not just its children. If a container has no `top` set at all, it will not move no matter what its children's individual offsets are.

### Nav row left cluster (hamburger, github) didn't move when right cluster was shifted down
- **Cause**: `.work-nav-row__left` had no `position` set, so its child icons were anchoring straight to `.work-nav-row` (the original shared anchor) instead of to `.work-nav-row__left` itself — meaning giving `.work-nav-row__right` its own `top`/`left` only moved the right-side icons, leaving hamburger/github behind.
- **Fix**: gave `.work-nav-row__left` its own `position: relative` with a matching `top` value (`100px`, same as `.work-nav-row__right`) so both clusters sit on the same horizontal line, while keeping `.work-nav-row__left`'s `left: 0px` independent so it stays on the left side of the page.
- **Lesson**: this is the same "two clusters, two independent anchors" pattern as the subnav bug above — a wrapper div with no `position` set does not create a new positioning context for its children, so `top`/`left` on siblings/icons inside it will not move together unless the wrapper itself is explicitly positioned.

---

## 10. WHAT STILL NEEDS TO BE DONE

### Work page — ACTIVE AREA
- [ ] Fine-tune final `top`/`left` values for the 4 project cards — still a work in progress, not confirmed final
- [ ] Confirm `searchbar` icon's `height: 80px` / `width: 200px` doesn't look stretched compared to the source image's natural proportions (flagged this session, not yet visually confirmed)
- [ ] `.project-card__lang` block's exact position (`bottom: -2rem`) not yet confirmed final
- [ ] `.project-card__public-icon` width (`80px`, notably larger than original `20px`) — still not confirmed as intentional
- [ ] `.work-console__screen`'s `top`/`left`/`width` values still placeholder, not yet confirmed to align with the real visible screen area of `console.png`
- [ ] Subnav cluster's exact final `top`/`left` position (`60px`/`0px`) not yet confirmed final
- [ ] Nav row left/right clusters' final `top`/`left` values (`100px`/`0px` and `100px`/`480px`) not yet confirmed final
- [ ] No descriptions/content decided yet for anything below the project cards
- [ ] General visual pass across the whole work page once all clusters/sizes are finalized, to check spacing looks intentional rather than placeholder

### Everything else (about page, performance pass, contact page, mobile nav)
- Unchanged from prior handoff — not touched this session. Refer to the full project handoff document for the complete outstanding list.

---

## 11. WHERE WE LEFT OFF

- **This session's topic**: Continued refining `work.html`/`work.css` — subnav icons given individual position classes + text labels, nav-row icons split into independently movable left/right clusters, individual icon sizing (height + width) added throughout, visual-cluster (flork2 + smiley) and project-cards made independently movable as groups.
- **Completed**: subnav icon/label pairing and independent positioning; nav-row left/right cluster separation; per-icon height/width sizing across the nav row; visual-cluster top offset added (fixing the flork2 movement bug); project-cards shifted down to `top: 300px`.
- **Not completed**: final position/size values across the page are still first-pass/hand-tuned, not confirmed final by Veroushka. Searchbar icon proportions not yet visually confirmed.
- **Very next step**: visual proportion check on the searchbar icon, then continue fine-tuning cluster positions (subnav, nav-row left/right, visual-cluster, project-cards) until final placement is confirmed.
- **Commits this session**: not yet confirmed — remind Veroushka to check `git status` and commit/push before ending the session.

---

## 12. PERSONAL DETAILS & CONTENT

Unchanged this session. See prior full handoff document (Section 12) for name, contact details, bio text, and project descriptions — none of this was touched in this session.

---

## 13. SIDE TOPICS

- None this session — entire session stayed focused on the work page.

---

## ⚠️ GIT RULES — REMINDER AT THE BOTTOM

- After EVERY task, remind Veroushka to stage, commit, and push
- Suggest commit messages using `feat:`, `fix:`, `style:`, `refactor:`, `chore:` prefixes
- Suggest branches for big features
- **Do not wait to be asked — remind proactively every time**
- **⚠️ Confirm `git status` at the start of the next session before making further edits — this session's work is not yet confirmed committed**

```bash
git add .
git commit -m "style: independent positioning and sizing for work-nav-row, work-subnav, and work-visual-cluster"
git push
```

---

# Session Handoff Document — Veroushka Ramjiawan Portfolio (Work Page Session 2)

---

## ⚠️ GIT RULES — READ THIS FIRST

- After EVERY task, no matter how small, remind Veroushka to stage, commit, and push
- Always suggest a commit message in this format:
  - `feat:` new feature or section added
  - `fix:` bug or broken thing corrected
  - `style:` CSS or visual changes only
  - `refactor:` restructuring code without changing behavior
  - `chore:` moving files, renaming, cleanup
- For any significant feature, suggest creating a branch first:
```bash
  git checkout -b feature/branch-name
```
  and merging back to main when done
- **Veroushka tends to forget git entirely — remind proactively, do not wait to be asked**
- Confirm `git status` at the start of the next session before making any further edits, to make sure nothing from this session was left uncommitted.

---

## 1. PROJECT OVERVIEW

- Personal portfolio website for Veroushka Ramjiawan
- IT student at UNASAT (Stichting University of Applied Sciences and Technology Suriname), Paramaribo
- School assignment requiring: home, about, work, and contact pages
- Tech stack: plain vanilla HTML, CSS, JavaScript only — no frameworks, no libraries (teacher requirement)
- GitHub base: `https://github.com/Veroush/`
- Site is published via GitHub Pages — standard `git add . / git commit / git push` triggers redeploy automatically
- This session focused entirely on **`work.html` / `work.css`** again — continued refinement of the GitHub-style console mockup page

---

## 2. FOLDER & FILE STRUCTURE (files touched this session)
project/
├── css/
│   └── work.css   # All changes this session — see Section 8 for full breakdown
└── work.html      # work-hero section added, nav-cluster wrapper added, dividers added — see Section 8
All other files (`main.css`, `about.css`, `about.html`, `index.html`, `contact.html`, `contact.css`, fonts, images) — **unchanged this session**.

---

## 3–7. ROUTES / DATABASE / CONTROLLERS / MIDDLEWARE / AUTH

Not applicable — static HTML/CSS/JS only, no backend. Skipping.

---

## 8. FEATURES ALREADY WORKING (added/changed this session)

### New `.work-hero` section — "View my work"
- Added as its own `<section class="work-hero">` sibling of `.work-intro`, mirroring `.contact-hero`'s exact structure/styling from `contact.css` (same font `RightRound`, `font-size: 4rem`, `color: black`, `margin-top: -120px`)
- **Important structural lesson**: initially nested inside `.work-intro`, which caused it to not display correctly (padding/margin interaction issue). Fixed by pulling it out to be a direct sibling of `.work-intro` inside `<main>`, matching the contact page's DOM structure exactly.

### URL bar text
- Added `<span class="work-topbar__url-text">https://github.com/Veroush</span>` inside `.work-topbar`, positioned absolutely over `url-bar.png`
- Font size bumped from `1rem` → `1.3rem` per Veroushka's request (bigger/more legible)

### "Popular repositories" heading
- Added `<h2 class="project-cards__heading">Popular repositories</h2>` as a sibling directly above `.project-cards`, positioned to align with the cards' left edge

### "Veroush" name label under flork+smiley cluster
- Added `<span class="work-visual-cluster__name">Veroush</span>` inside `.work-visual-cluster`, positioned below the smiley badge

### "Veroush" text next to github icon (nav row left)
- Added `<span class="work-nav-row__github-text">Veroush</span>` inside `.work-nav-row__left`, positioned to the right of the github icon

### Smiley badge — solid circle background (transparent PNG fix)
- **Problem**: `smiley-face.png` has a transparent background, so simply overlapping it on flork didn't create the "badge" look from reference images
- **Fix**: wrapped the smiley image in a new `.work-visual-cluster__smiley-badge` div, styled as a real circle (`border-radius: 50%`, solid `background`, `border`, `box-shadow`) — the transparent PNG now sits centered inside a CSS-drawn circle instead of relying on the image's own background
- Badge color evolution: started white (`#ffffff`) → changed to cream `#faf6ee` to match `console.png`'s background tone (color eyedropper-matched by eye, not exact)
- Badge border color: changed to `#6b7685` (slate-gray) to match the divider color / hamburger icon line color
- Smiley image sizing inside badge: went through several iterations — percentage-based (`70%`) didn't allow growing past badge size due to a suspected global `img { max-width: 100% }` reset in `main.css`; switched to fixed `width` in `px` with explicit `max-width: none` override so the face can be sized larger than the badge itself and intentionally overflow its edges

### Two new visual dividers (GitHub-style separators)
- `.work-nav-row__divider`: thin vertical line between `create-new` and `issues` icons in the nav row
- `.work-subnav__divider`: thin horizontal line below the subnav (Overview/Repositories/Projects/Packages/Stars row), separating it from the project cards below
- Both dividers color-matched to `#6b7685` (slate-gray, sampled from `hamburger.png`'s icon line color), then lightened from an initial darker `#4a5568` since 2px-wide dark lines read as "too dark" at that thickness — kept width at 2px per Veroushka's preference, adjusted color instead of width

### New `.work-nav-cluster` wrapper
- Added to group `.work-nav-row` (both left/right icon clusters + the vertical divider) AND `.work-subnav` (+ its horizontal divider) under one shared positioning wrapper
- Lets Veroushka move the entire nav-row + subnav + both dividers as ONE unit via a single `top`/`left` on `.work-nav-cluster`, without affecting the URL bar above or the "Popular repositories"/project cards below
- **Important**: this wrapper does NOT include `.work-topbar` or `.project-cards`/`.project-cards__heading` — those remain independent

### Console vertical position adjustment
- `.work-console`'s `margin-top` changed from `-200px` → `-80px` (later fine-tuned to `-80px`) to stop the console from overlapping `.work-hero`'s "View my work" heading once `.work-hero` became a proper sibling section

---

## 9. BUGS & ERRORS WE FIXED (this session)

### "View my work" heading not visible at all
- **Cause**: `.work-hero` was nested inside `.work-intro` (which has its own `padding: 5rem 2rem`), unlike `.contact-hero` which sits as a direct sibling inside `<main>`. The padding/margin interaction pushed the heading out of the visible area.
- **Fix**: moved `.work-hero` to be a sibling of `.work-intro`, matching the contact page's exact DOM structure.
- **Lesson**: when copying a pattern from another page (e.g. `.contact-hero`), match its DOM position/nesting level exactly, not just its CSS class rules — nesting context changes how margins/padding interact.

### Console image overlapping the new "View my work" heading
- **Cause**: `.work-console` had a large negative `margin-top: -200px` (originally tuned for the old layout without `.work-hero` above it). Once `.work-hero` became a real sibling section, this negative margin pulled the console back up over the heading.
- **Fix**: reduced the negative margin to `-80px`.
- **Lesson**: negative margins tuned for one layout can silently break when new sibling elements are added above/below — always re-check after structural changes.

### Smiley image wouldn't grow past ~40px no matter the width value set
- **Cause**: a suspected global `img { max-width: 100%; height: auto; }` reset rule in `main.css` was capping the image at its containing block's width (the 40px badge).
- **Fix**: added `max-width: none;` directly on `.work-visual-cluster__smiley` to override the global reset.
- **Lesson**: if an image's explicit `width` value appears to have zero effect, check for a global `img { max-width: ... }` reset rule before assuming a specificity or typo issue.

### Nav row left/right clusters don't move together automatically
- Reconfirmed same open pattern from last session (see prior handoff) — solved this session by wrapping BOTH clusters (plus subnav) in the new `.work-nav-cluster`, so a single `top`/`left` value now moves everything together instead of needing manual sync between `.work-nav-row__left` and `.work-nav-row__right`.

---

## 10. WHAT STILL NEEDS TO BE DONE

### Work page — ACTIVE AREA
- [ ] Fine-tune final `top`/`left` values for the 4 project cards — still not confirmed final
- [ ] Confirm `searchbar` icon's `height: 80px` / `width: 200px` proportions — still flagged from last session, not yet visually confirmed
- [ ] `.project-card__lang` block's exact position (`bottom: -2rem`) — not yet confirmed final
- [ ] `.project-card__public-icon` width (`80px`) — still not confirmed as intentional vs. leftover from tuning
- [ ] `.work-console__screen`'s `top`/`left`/`width` values — still placeholder
- [ ] `.work-nav-cluster`'s `top`/`left` (currently `-80px`/`0px`) — first pass, not confirmed final
- [ ] `.work-console`'s `margin-top: -80px` — not yet confirmed as the final resting value now that `.work-hero` is above it
- [ ] Smiley badge cream color (`#faf6ee`) — approximate eyeball match to `console.png`, not confirmed via exact eyedropper/hex-pick
- [ ] Divider color (`#6b7685`) — approximate match to `hamburger.png`'s line color, same caveat
- [ ] Gap between hamburger and github icons in nav-row-left — was being discussed/tuned (`left: 60px`+ suggested), final value not yet confirmed
- [ ] No descriptions/content decided yet for anything below the project cards
- [ ] General visual pass across the whole work page once all positions are finalized

### Everything else (about page, performance pass, contact page, mobile nav)
- Unchanged from prior handoffs — not touched this session. Refer to the full project handoff document for the complete outstanding list.

---

## 11. WHERE WE LEFT OFF

- **This session's topic**: Added a `.work-hero` heading ("View my work"), URL bar text, "Popular repositories" heading, "Veroush" labels (under visual cluster + next to github icon), converted the transparent smiley PNG into a proper CSS circle badge, added two GitHub-style divider lines (vertical in nav row, horizontal under subnav), and grouped nav-row + subnav under one new `.work-nav-cluster` wrapper for unified movement.
- **Completed**: all of the above, confirmed committed and pushed.
- **Not completed**: final position/color/size fine-tuning across almost everything touched this session — see Section 10.
- **Very next step**: likely continue nudging `top`/`left` values (project cards, nav-cluster, console margin) by eye, and/or do an eyedropper color-pick on `console.png`/`hamburger.png` to lock in exact hex values for the smiley badge and dividers instead of approximate matches.
- **Commits this session**: confirmed committed and pushed by Veroushka — commit message used: `"style: add work-hero heading, url-bar text, nav-row/subnav dividers, smiley badge styling, and spacing tweaks"`

---

## 12. PERSONAL DETAILS & CONTENT

Unchanged this session. See prior full handoff document (Section 12) for name, contact details, bio text, and project descriptions.

---

## 13. SIDE TOPICS

- Considered switching `.work-nav-row__left` to `display: flex` with a real `gap` property (for easier icon spacing) — **decided against it**, staying consistent with the page's independent-absolute-positioning philosophy. Manual `left` value tuning remains the approach for spacing icons apart.

---

## ⚠️ GIT RULES — REMINDER AT THE BOTTOM

- After EVERY task, remind Veroushka to stage, commit, and push
- Suggest commit messages using `feat:`, `fix:`, `style:`, `refactor:`, `chore:` prefixes
- Suggest branches for big features
- **Do not wait to be asked — remind proactively every time**
- **✅ This session's work was confirmed committed and pushed before ending**

```bash
git add .
git commit -m "your message here"
git push
```