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
- **⚠️ CARRIED OVER, STILL UNRESOLVED ACROSS MULTIPLE SESSIONS: the row--5 reorder/repositioning AND the new hobbies section (image cluster + header) have never been explicitly confirmed as committed by Veroushka. No code was changed in the most recent session (it was planning/discussion only about image optimization), so this status is unchanged. Confirm `git status` first thing next session before making any further edits.**

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
- **NEW this session (discussion only, no code changes):** Veroushka flagged that the site loads slowly due to the large number of images in `img/`. A full image optimization plan was discussed and documented (target display sizes, Squoosh workflow) but explicitly deferred to the end of the project rather than done now. See Section 10 and Section 13.
- NEW this session: Homepage (index.html / main.css) restructuring session — moved from about-page work to homepage refinement. Multiple structural and style changes made, detailed below. Git status at end of session: UNCONFIRMED — Veroushka has not verified git status or run any commit yet. Do not assume any of this session's changes are committed.


---

## 2. FOLDER & FILE STRUCTURE

```
project/
├── css/
│   ├── main.css          # global styles — reset, fonts, nav, hero, about-strip, experience-projects, skills, footer. Footer background scoped via .footer--home modifier. no longer unchanged. Multiple new/modified rules prior session (full list in Section 8/9 below): .about-strip background + min-height, .experience-projects/.skills/.footer--home backgrounds, .about-strip__notebook img, .about-strip__photo, .about-strip__sticky-text, new .about-strip__intro-text + .about-strip__intro-text--top, new .about-strip__bio-text, new .about-strip__arrow, new .about-strip__roles wrapper, .roles-list__heading, .roles-list.
│   ├── about.css         # row--5 (writing/book) fully repositioned; hobbies section styles present (.about-school__row--hobbies, .about-school__hobbies-title, .about-school__hobbies-cluster, and 11 individual .about-school__hobby-img--* classes). Unchanged this session — reviewed only, to extract image display widths for the resize plan. See Section 8 and Section 10.
│   ├── work.css          # clean minimal file with just `.work-intro` placeholder. Unchanged.
│   └── contact.css       # contains dead CSS (.contact-card__fake-caret, .contact-card__mirror, @keyframes contact-caret-blink) since contact.js no longer exists. Not cleaned up. Reviewed this session (for image widths) but not edited.
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
│   ├── favicon.png / logo.png / nav icons / footer icons — unchanged. FLAGGED THIS SESSION for eventual compression/resize pass (see Section 10) — not yet touched.
│   ├── aboutpage/
│   │   ├── background2.png       # about-intro bg, displays at 800px wide — resize target ~1600px (see Section 10)
│   │   ├── aboutme-header.png    # about-intro header img, displays at 700px wide — resize target ~1400px
│   │   ├── paramaribo.png        # displays at 400px wide — resize target ~800px
│   │   ├── tape1.png             # displays at 90px wide — resize target ~180px
│   │   ├── id.png                # displays at 220px wide — resize target ~440px
│   │   ├── arrow1.png             # unchanged, see prior handoff
│   │   ├── unasat.jpg            # UNASAT campus photo, displays at 480px wide — resize target ~960px. Veroushka has confirmed all filenames used in the project are correct as named — DO NOT flag filename mismatches again.
│   │   ├── arrow2.png            # used twice: row--1 (`.about-school__arrow--1-big`), row--2 (`.about-school__arrow--2-big`)
│   │   ├── unasat-fair.jpeg      # fair/class project photo, row--2, displays at 400px wide — resize target ~800px
│   │   ├── havo3.jpeg            # Havo 3 photo, row--3, displays at 400px wide (shared `.about-school__image` default) — resize target ~800px
│   │   ├── arrow6.png            # Havo 3 row arrow
│   │   ├── HSKKH2.jpg / HSKH.jpg # volunteering photo, used TWICE (stacked/overlapping) in row--4, each displays at 350px wide — resize target ~700px each. Veroushka has confirmed these filenames (as currently in the HTML) are correct as named — DO NOT flag or "fix" these again.
│   │   ├── arrow3.png            # volunteer row arrow
│   │   ├── news-paperclipping.jpg # writing competition clipping, row--5, displays at 380px wide — resize target ~760px. Veroushka has confirmed this filename is correct as named — DO NOT flag again.
│   │   ├── nana-aisa.jpeg        # published book photo, row--5, overlaps bottom portion of the newspaper clipping image, displays at 200px wide — resize target ~400px
│   │   ├── arrow4.png            # writing row arrow (next to writing text)
│   │   ├── arrow5.png            # writing row second arrow (next to book text) — NOTE: `.about-school__arrow--5` is set to width 1100px in CSS, intentionally large per Veroushka. See Section 9/11/13 for a flagged possible contradiction worth double-checking visually.
│   │   ├── 50s-music.png         # hobbies cluster, displays at 100px wide — resize target ~200px
│   │   ├── 80s-stuff.png         # hobbies cluster, displays at 100px wide — resize target ~200px
│   │   ├── books.png             # hobbies cluster, displays at 100px wide — resize target ~200px
│   │   ├── burger-king.png       # hobbies cluster, displays at 80px wide — resize target ~160px
│   │   ├── coding.png            # hobbies cluster, displays at 100px wide — resize target ~200px
│   │   ├── daydreaming.png       # hobbies cluster, displays at 100px wide — resize target ~200px
│   │   ├── fantasy.png           # hobbies cluster, displays at 100px wide — resize target ~200px
│   │   ├── movies.png            # hobbies cluster, displays at 100px wide — resize target ~200px
│   │   ├── swimming.png          # hobbies cluster, displays at 90px wide — resize target ~180px
│   │   ├── volunteering.png      # hobbies cluster (separate image from the HSKH2 photos used in row--4), displays at 100px wide — resize target ~200px
│   │   └── writing.png           # hobbies cluster (separate image from the writing/book row content), displays at 100px wide — resize target ~200px
│   ├── contactpage/ — unchanged. Postcard background displays at 750px wide — resize target ~1500px. Contact icons display at 60px — resize target ~120px.
│   ├── homepage/, workpage/ — unchanged
├── index.html              # unchanged. KNOWN ISSUE: `.about-strip__sticky-wrap` and `.about-strip__notebook` still missing closing tags — low priority, carried over. no longer unchanged. Restructured .about-strip__right this session: sticky-note text replaced with nav links, added intro text block, bio text block, and arrow6 image as new elements. Closing-tag issue on .about-strip__sticky-wrap was fixed as part of this restructuring (bio-text/arrow moved outside it); .about-strip__notebook and .about-strip__right still missing explicit closing tags — carried over, still unresolved.
├── about.html              # unchanged this session (row--5 reorder + hobbies section from a prior session — still unconfirmed as committed, see Git Rules above)
├── work.html                # unchanged
└── contact.html             # unchanged
```

---

## 3–7. ROUTES / DATABASE / CONTROLLERS / MIDDLEWARE / AUTH

Not applicable — static HTML/CSS/JS only, no backend. Skipping.

---

## 8. FEATURES ALREADY WORKING

Homepage (index.html) — prior session's changes (⚠️ commit status unconfirmed)

.about-strip background changed from cream-ending gradient to blue→white gradient, then simplified to two-stop linear-gradient(180deg, #3e6881 0%, #ffffff 45%) (cream middle stop removed, white percentage pushed earlier per feedback)
.experience-projects, .skills, .footer--home backgrounds changed from cream/tan to plain #ffffff
.about-strip min-height reduced from 950px toward 700px (exact final value TBD — Veroushka was mid-tuning) to remove excess white space that was swallowing .experience-projects when nudged upward
Notebook image (.about-strip__notebook img) given its own width override (separate from container width) so it can be resized independently
Photo (.about-strip__photo) given border: 3px solid #000 (black border added)
Sticky note content replaced: original bio-style <p> text swapped for an About/Work/Contact <ul> nav (.about-strip__sticky-text), links to about.html/work.html/contact.html, font-size set to 1.4rem, flex-direction: column + gap added, transform: translateX(-20px) added to nudge the block left (combined with existing rotate(3deg))
New .about-strip__intro-text element added above the sticky note: "Hello there! My name is Veroushka Ramjiawan. Here's a little tour guide:" — uses HalfTermSchoolsOut font, manually line-broken via <br>, first two lines wrapped in .about-strip__intro-text--top span with independent top: -10px offset so only that portion moves
New .about-strip__bio-text element added: "I'm a curious, adventure-seeking tech enthusiast who is always up for what's next, whether that's a new project, a new challenge, or a new friend." (rewritten from original draft, typo "wether"→"whether" fixed) — HalfTermSchoolsOut font, 1.4rem
New .about-strip__arrow element added — arrow6.png (reused from img/aboutpage/), positioned between the photo and bio text, independently sizable/movable/rotatable via width/top/left/transform: rotate()
.roles-list__heading and .roles-list restyled: font-family changed from RightRound/purple to HalfTermSchoolsOut/#333, font-size set to 1.4rem to match sticky-note/bio-text styling
New .about-strip__roles wrapper div added around the heading + list so both can be repositioned together via one top/left on the wrapper instead of two separate values; heading/list changed to position: relative inside it

### About page (`about.html`) — `.about-school` section, rows 1–3 (built in prior sessions, confirmed committed)
- Row 1 — UNASAT (text wrapper with two lines moving as one unit, big rotated arrow, enlarged campus image)
- Row 2 — Fair (image left, rotated arrow, text right — caption mentions the rotatable tracking camera)
- Row 3 — Havo 3 (text, arrow6.png, havo3.jpeg)

### About page — Row 4: Volunteering
- Layout order: image stack → arrow → text
- Image stack: `.about-school__visual--volunteer` wraps `HSKKH2.jpg` (`--volunteer-back`) and `HSKH.jpg` (`--volunteer-front`), overlapping, independently positioned/rotated
- Filenames confirmed correct by Veroushka — do not flag as a mismatch

### About page — Row 5: Writing / Book
- **Final confirmed HTML order**: text block (writing + book, stacked) → both arrows → both images (stacked) — reads text → arrows → images left to right, per Veroushka's explicit correction
- HTML structure uses three wrapper divs inside `.about-school__row--5`, in this order:
  1. `.about-school__text-group-writing` — contains `.about-school__text--writing` and `.about-school__text--book`
  2. `.about-school__arrows-writing` — contains `.about-school__arrow--5` (arrow4.png) and `.about-school__arrow--6` (arrow5.png)
  3. `.about-school__visual--writing` — contains `.about-school__image--newspaper` and `.about-school__image--nanaaisa`
- All six elements inside row--5 are individually positioned via their own CSS classes (`top`/`left`/`width`/`transform`), fully independent of each other
- `.about-school__arrow--5` is intentionally width: 1100px per Veroushka's preference — **do not "fix" this width, it is intentional** (but see Section 13 for a flagged contradiction worth a visual sanity check)
- Content (live, unchanged):
  - Writing text: "I like writing stories too. I made the 4th place in the Sori Yu Talenti - writing competition in 2025 alongside four other amazing finalists, and it's still one of my proudest moments."
  - Book text: "All five of us finalists had our stories put together into one published book called Nana Aisa. Seeing my writing in an actual printed book, next to fellow young students, inspired me to pursue writing more."

### About page — Hobbies Section
- New row `.about-school__row--hobbies`, placed directly after `.about-school__row--5`, still inside `<section class="about-school">`
- Structure: a centered header, then a wrapping cluster of 11 images
- Header: `<h2 class="about-school__hobbies-title">Some of my hobbies:</h2>` — uses `ShinyPaint` font, centered via `width: 100%; text-align: center;`
- Image cluster: `.about-school__hobbies-cluster` — `display: flex; flex-wrap: wrap;` container holding all 11 hobby images
- Each image has a shared base class (`.about-school__hobby-img`, width 150px) plus its own individual class that overrides width/top/left/transform independently:
  - `--music` (50s-music.png, 100px), `--80s` (80s-stuff.png, 100px), `--books` (books.png, 100px), `--burgerking` (burger-king.png, 80px), `--coding` (coding.png, 100px), `--daydreaming` (daydreaming.png, 100px), `--fantasy` (fantasy.png, 100px), `--movies` (movies.png, 100px), `--swimming` (swimming.png, 90px), `--volunteering` (volunteering.png, 100px), `--writing` (writing.png, 100px)
  - **Correction/clarification confirmed this session while reviewing about.css:** the individual per-image classes override the shared 150px base width — actual live display widths are the smaller per-image values listed above (80–100px), not 150px. Worth keeping in mind for the eventual resize pass so the source files aren't over-sized relative to what's really rendered.
- Cluster gap: `0.5rem` (reduced from `1.5rem` in a prior session)
- Cluster nudged right via `margin-left: 80px` on `.about-school__hobbies-cluster` (parent row uses `align-items: flex-start`)
- `.about-school__row--hobbies` currently has `margin-top: -150px` applied — **this appears to already resolve the "move this section up" open item from the previous handoff.** Worth confirming with Veroushka next session whether this value is final, since the previous handoff had this listed as unresolved/not yet applied.

### Existing features (unchanged)
- `.about-story` section (Paramaribo photo, tape, ID, arrow, caption, intro text) — working, committed
- Footer page-scoped background via `.footer--home` modifier — working
- Work page shell (nav + footer + `.work-intro` placeholder) — no content built yet
- Contact page structure (postcard, icon column, thank-you section) — working structurally; message textarea has no JS behavior (paused)

---

## 9. BUGS & ERRORS WE FIXED (AND TECHNICAL DEBT FLAGGED)

### PRIOR SESSION — Row--5 element order was backwards from Veroushka's actual intent
- **What happened**: images ended up on the left instead of the right as intended.
- **Cause**: In this flexbox layout pattern, whichever element comes first in HTML source order renders leftmost.
- **Fix**: Reordered wrapper divs to text-group → arrows → images.
- **Lesson**: "First in HTML" = "leftmost on screen" throughout `.about-school`. Confirm rendered order matches intent, don't assume.

### PRIOR SESSION — `.about-school__text--book` width change had no visible effect
- **Cause #1**: `flex: 1` was overriding the intended width.
- **Cause #2 (actual fix)**: parent wrapper `.about-school__text-group-writing` had no `max-width` of its own, implicitly constraining the child. Widening the wrapper resolved it.
- **Lesson**: If a child's width change appears to do nothing, check parent wrapper constraints first, not just the child's own `flex` properties.

### PRIOR SESSION — Arrow width of `1100px` on `.about-school__arrow--5`
- Flagged as a likely typo, but Veroushka confirmed it's intentional. **Do not "correct" this value.** (See Section 13 — a separate contradiction around this same arrow is still flagged for visual double-check.)

### PRIOR SESSION — Filenames flagged as unconfirmed
- Veroushka has explicitly confirmed all filenames currently in the project are correct as named. **Resolved — do not re-flag.**

### PRIOR SESSIONS (condensed)
- Large vertical gap between `.about-story` and `.about-school` — pragmatic `margin-top: -250px` nudge applied to `.about-school`.
- Class name collision: `.about-intro` reused for hero and story section — renamed to `.about-story`.
- Footer cream-block-on-non-homepage bug — fixed via `.footer--home` modifier scoping.
- Chromium/Edge caret-under-rotated-ancestor rendering bug — documented, proven fix (mirror-div technique) designed but not re-applied to live files.
- Missing CSS for row--5 writing visual — fixed.
- Volunteer row element order — fixed.
- Volunteer text overlapping images — fixed via `flex: none; max-width: 350px;`.

PRIOR SESSION

Bug: .about-strip__bio-text and .about-strip__arrow were initially nested inside .about-strip__sticky-wrap in the HTML draft Veroushka wrote.

Cause: .about-strip__sticky-wrap is position: absolute, so any position: absolute children nested inside it position relative to the wrap div instead of .about-strip, breaking the intended coordinate space.
Fix: Moved both elements to be siblings of .about-strip__sticky-wrap (closing the wrap div right after the sticky-note <ul>), so they position relative to .about-strip like the notebook/photo/tape.
Lesson: Same pattern as the row--5 lesson in Section 9 — always check the actual DOM ancestor of an absolutely-positioned element, not just visually where it appears to sit.


Non-bug/clarification: .experience-projects appearing "too far down" was actually caused by .about-strip's oversized min-height: 950px leaving dead white space, not by .experience-projects's own positioning — reducing .about-strip's min-height was the correct fix rather than pulling .experience-projects up with margin (which was making it disappear behind the leftover white space instead).

---

## 10. WHAT STILL NEEDS TO BE DONE

### Performance — NEW THIS SESSION, EXPLICITLY DEFERRED TO END OF PROJECT
- [ ] **Full image compression + resize pass.** Veroushka flagged the site is loading slowly due to the large number of images in `img/`. A full plan was discussed and is documented below, but Veroushka explicitly said to leave this until the end of the project rather than do it now.
- **Agreed approach (for whenever this is picked up):**
  1. Use [Squoosh](https://squoosh.app) (free, browser-based, no install) to compress and resize each image manually
  2. Resize target = 2x the actual CSS display width (for retina sharpness), not the current source file size
  3. Format: MozJPEG for photos (unasat.jpg, havo3.jpeg, nana-aisa.jpeg, etc.), WebP for icon/graphic-style images (hobby cluster images, tape, arrows) where format swap won't break anything referencing the old extension
  4. Add `loading="lazy"` attribute to `<img>` tags for anything below the fold — free win, no risk, works in Edge
  5. Full resize target table (widths in px, all in `img/aboutpage/` unless noted):
     - Hobby cluster (11 images): 50s-music, 80s-stuff, books, coding, daydreaming, fantasy, movies, volunteering, writing → 200px each; burger-king → 160px; swimming → 180px
     - unasat.jpg → 960px; unasat-fair.jpeg → 800px; havo3.jpeg → 800px
     - HSKKH2.jpg / HSKH.jpg (volunteer stack) → 700px each
     - news-paperclipping.jpg → 760px; nana-aisa.jpeg → 400px
     - paramaribo.png → 800px; tape1.png → 180px; id.png → 440px
     - background2.png → 1600px; aboutme-header.png → 1400px
     - Contact postcard background → 1500px; contact icons → 120px
     - Arrow images (arrow1–6.png) → resize each to its largest used width across the site, since they're reused at different sizes in different rows (arrow--5 is a known exception at 1100px, intentional)
  6. **If format is changed (e.g. PNG → WebP), HTML/CSS references must be updated to match the new filename/extension** — the browser will not fall back automatically
  7. Keep original files backed up before replacing anything
- [ ] Also worth a look eventually: unused fonts/files already flagged (`Sprinklescolors-njrJ.ttf`, `ModularAmplitude-mR6a.ttf` @font-face block) — same "dead weight" category as the image cleanup, could be bundled into the same pass.

### About page — ACTIVE AREA, in progress
- [ ] **Confirm whether the current `margin-top: -150px` on `.about-school__row--hobbies` is the final "move this section up" fix**, or whether Veroushka wants it adjusted further. (Prior handoff had this as unresolved/unapplied — reviewing the live CSS this session shows a value is now present, but it hasn't been explicitly re-confirmed by Veroushka as final.)
- [ ] Fine-tune final position/size/rotation numbers for the hobbies image cluster — current values are a first pass, not confirmed as final by Veroushka.
- [ ] Consider whether the hobbies cluster should be truly centered (`align-items: center` on `.about-school__row--hobbies`) rather than left-aligned + manually nudged right (`margin-left: 80px` on the cluster) — not confirmed as final.
- [ ] Add the "Who I Am" text block and "Education" timeline section to the actual HTML. Wording drafted and approved in a prior session (see Section 12) but NOT yet added to `about.html`. Needs a placement decision (likely above `.about-story`).
- [ ] Photo section build order:
  1. ~~UNASAT campus~~ — done
  2. ~~First year / fair~~ — done
  3. ~~Havo 3~~ — done
  4. ~~STEM volunteering~~ — done
  5. ~~News clipping (writing contest)~~ — done
  6. ~~Published book~~ — done
  7. ~~Hobbies section~~ — built, positioning still being tuned
  8. **"People I admire" section — EXPLICITLY DEFERRED. Do not build unless Veroushka brings it up again.**
- [ ] Resolve naming/scope check: the "Who I Am" text mentions "IT support" — unclear if this maps to a specific job/internship/coursework or overlaps with Opo Doro volunteering. Not yet clarified by Veroushka.
- [ ] Consider pacing/order feedback: photo sections currently peak emotionally (writing contest, book) then move into a lower-key "hobbies" section. Nice-to-have.
- [ ] Consider adding one closing line tying the personal photo-story back to why she codes. Nice-to-have, not decided on.
- [ ] Optional: tape graphic overlays (`tape1.png`) on hobby images — offered, Veroushka declined for now.

### Spacing/positioning cleanup — GROWING LIST, flagged for a dedicated pass before final submission
- [ ] `.about-story__caption` and `.about-story__id` — original large offset values, never cleaned up.
- [ ] `.about-school { margin-top: -250px; }` — manual section-level nudge, not a structural fix.
- [ ] Large, growing set of per-element modifier classes across `.about-school`, each carrying its own `top`/`left`/`width`/`transform` values. Functional but a lot to track — worth consolidating/documenting before final submission.
- [ ] Full mobile responsive pass — still not started, and increasingly relevant given the number of fixed pixel widths/positions now across `.about-story`, `.about-school`, and the hobbies cluster.

### Contact page (`contact.html`) — PAUSED
- All items carried over unchanged: message textarea rebuild decision, `contact.js` file-deletion-vs-empty confirmation, orphaned CSS cleanup, postcard rotation mismatch confirmation, submit functionality, icon file verification.

### Work page (`work.html`)
- [ ] Build the 4 project cards: TaskFlow, Chronicles of Booksteria, Pixel Jumper: Arcade Odyssey, Studie4SU — full detail in Section 12. Nothing built yet beyond the shell.

### Global
- [ ] Image/performance optimization pass — see new dedicated section above. Explicitly deferred to end of project by Veroushka.
- [ ] Re-test mobile hamburger nav (`main.js`) against current nav structure. Still unresolved.

---

## 11. WHERE WE LEFT OFF

- **Prior session's topic**: Veroushka asked how to fix slow page load caused by too many images in `img/`. This was a planning/advice conversation only — no files were opened, edited, or created except reviewing `about.css`, `main.css`, and `contact.css` (which Veroushka pasted in) to extract actual CSS display widths for a resize plan.
- **What was covered, in order**:
  1. General explanation of why images slow down page load and the main levers available (compression, resizing to display size, lazy loading, WebP format, removing unused files)
  2. Explanation of how to use Squoosh (squoosh.app) — drag/drop, format selection, quality slider, resize field
  3. Clarified that resizing the image file does NOT break the CSS layout — CSS `width` controls display size independently of the file's actual pixel dimensions
  4. Went through `about.css` (and briefly `main.css`/`contact.css`) to build a full table of every image's actual CSS display width and doubled each for a retina-safe resize target (full table now in Section 10)
  5. Clarified the resize workflow doesn't require manually setting the Height field — the aspect-ratio "chain link" toggle in Squoosh handles it automatically, as long as it's left linked
  6. Veroushka decided to defer the entire image optimization pass to the end of the project rather than do it now
- **Nothing was implemented or changed in any project file this session.**
- **Very next step for next session**: 
  1. Confirm/commit the still-outstanding row--5 and hobbies section work from the prior session — **do this first, before any further edits.**
  2. Quick visual double-check of `.about-school__arrow--5` sizing (flagged as possibly contradictory to Veroushka's own "very small" description — carried over, still not resolved).
  3. Confirm whether the current `margin-top: -150px` on `.about-school__row--hobbies` is Veroushka's final answer to "move this section up," since the CSS shows a value is already applied but it was never explicitly confirmed as final by her.
  4. Continue fine-tuning hobbies image cluster (sizes, positions, rotations) per Veroushka's feedback.
  5. Decide whether to center the hobbies cluster (`align-items: center`) instead of the current manual `margin-left` nudge.
  6. Add the "Who I Am" + "Education" text block into `about.html` (wording finalized, see Section 12) and decide its placement relative to `.about-story`.
  7. Skip "people I admire" unless Veroushka brings it up again.
  8. Circle back to Contact page and Work page items once About page content is complete.
  9. Image optimization pass (Section 10) stays parked until Veroushka signals she's ready for it — likely near final submission.
- **Commits outstanding**: Row--5 reorder/repositioning AND the hobbies section are still not explicitly confirmed as committed by Veroushka, carried over from before this session. Suggested commit (unchanged, still valid if not yet run):

Prior session's topic: Homepage refinement/restructuring — background colors, notebook/photo/tape/arrow sizing and positioning, sticky note content swap (bio text → nav links), new intro text, new bio text, new arrow image, roles list restyle and unified positioning wrapper.
⚠️ Commits outstanding — NOT CONFIRMED: Veroushka was walked through suggested commit messages but never confirmed running git status or any commit/push for this session's changes. Next session must start with git status to check what (if anything) got committed. Suggested commit (if nothing has been run yet):

bash  git add index.html css/main.css
  git commit -m "style: refine about-strip section - white gradient backgrounds, resize notebook/photo/tape/arrow, add nav links and bio text to notebook, restyle roles list, fix section height"
  git push

Very next step for next session:

Run git status first — confirm whether this session's homepage changes are committed.
Finalize .about-strip min-height value (was mid-tuning between 950px and 700px).
Finalize .about-strip__arrow (arrow6.png) size/position/rotation — was just added, not yet tuned.
Finalize .about-strip__roles wrapper position (top/left) — restyled but not repositioned yet.
All prior outstanding About-page items (Section 10) remain unchanged/untouched this session.



Update to Git Rules reminder (top and bottom)
Add:

⚠️ NEW: The entire homepage restructuring session (backgrounds, notebook/photo/arrow sizing, sticky-note nav links, intro/bio text, roles list) has NOT been confirmed as committed. Run git status before any further edits.

```bash
git add about.html css/about.css
git commit -m "feat: reorder writing/book row, add hobbies section with image cluster"
git push
```

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

### Projects (Work page — full detail, still needs to be built into work.html)
- **TaskFlow** — `https://github.com/Veroush/taskflow` — React, Node.js, PostgreSQL, Prisma
- **Chronicles of Booksteria** — `https://github.com/Veroush/chronicles_of_booksteria` — HTML/CSS/vanilla JS
- **Pixel Jumper: Arcade Odyssey** — `https://github.com/Veroush/pixel-jumper-arcade-odyssey` — Phaser 3
- **Studie4SU** — `https://github.com/Veroush/studie4su` — Node.js/Express/Prisma/MySQL, JWT auth, admin dashboard

(All other personal/content details — roles list, skills section content, work experience, hero bio — unchanged from prior handoffs, not repeated here for brevity.)

---

## 13. SIDE TOPICS

- **Question: is it okay to use graduation/school photos on the about-me page for education content?** Discussed and confirmed as a good idea in a prior session. Resolved, no action item.
- **Question: are large pixel offset values in CSS "normal"?** Discussed at length in a prior session — not wrong, but flagged as fragile/non-responsive. Still an open item for a future dedicated cleanup pass.
- **Chromium/Edge caret-under-rotated-ancestor bug**: still worth remembering as a general pattern for this project — carried over.
- **Nokia phone contact page concept**: earlier fully-built interactive flip-phone contact page, scrapped in favor of postcard concept, code exists in history if she ever wants to revisit it for a different project. Carried over.
- **Filename confirmation**: Veroushka explicitly stated all filenames in use across the project are correct as she named them. Resolved — do not re-raise.
- **Possible contradiction flagged (carried over, still unresolved)**: Veroushka described `.about-school__arrow--5` as "very small" while asking to keep its `width: 1100px` value unchanged. Still worth a quick visual confirmation next session in case there's a mismatch between what she intended and what's actually live.
- **NEW THIS SESSION — Page load speed / image optimization:** Veroushka asked how to fix slow loading caused by too many images. Full discussion covered: why images slow load times, how to use Squoosh (squoosh.app) for manual compression and resizing, the difference between file size and CSS display size (resizing the file does not affect layout), a full per-image resize target table built directly from `about.css`/`main.css`/`contact.css` (now recorded in Section 10), and how the width/height aspect-ratio lock works in Squoosh so height never needs to be set manually. **Resolution: Veroushka chose to defer this entire pass to the end of the project.** Not urgent, but should be picked back up before final submission — flagged in Section 10.

---

## ⚠️ GIT RULES — REMINDER AT THE BOTTOM

- After EVERY task, remind Veroushka to stage, commit, and push
- Suggest commit messages using `feat:`, `fix:`, `style:`, `refactor:`, `chore:` prefixes
- Suggest branches for big features
- **Do not wait to be asked — remind proactively every time**
- **⚠️ CARRIED OVER, STILL UNRESOLVED: the row--5 reorder/repositioning AND the entire hobbies section have not been explicitly confirmed as committed. Confirm this first thing next session before making any further edits.**

```bash
git add .
git commit -m "your message here"
git push
```