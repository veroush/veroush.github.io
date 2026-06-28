# Veroushka Ramjiawan — Personal Portfolio

A multi-page personal portfolio website built with vanilla HTML, CSS, and JavaScript, powered by Vite. Features a custom spray-paint graffiti hero animation, scroll-reveal effects, and a fully responsive layout.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Preview the Production Build](#preview-the-production-build)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Accessibility](#accessibility)

---

## Prerequisites

You need the following installed on your machine before getting started:

| Tool | Minimum Version | Download |
|------|----------------|----------|
| [Node.js](https://nodejs.org/) | 18.x or higher | https://nodejs.org/ |
| npm | 9.x or higher | Comes bundled with Node.js |

To check if you already have them:

```bash
node --version
npm --version
```

---

## Installation

1. **Clone or download the project** into a folder on your machine.

2. **Navigate into the project directory:**
   ```bash
   cd your-project-folder
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs Vite (the only dependency) into `node_modules/`.

---

## Development

Start the local development server with live reload:

```bash
npm run dev
```

Vite will print a local URL — open it in your browser:

```
  VITE v5.x.x  ready in Xms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

The server hot-reloads when you save any HTML, CSS, or JS file. No page refresh needed for most changes.

---

## Building for Production

Compile and optimise all assets into the `dist/` folder:

```bash
npm run build
```

The output will include minified HTML, CSS, and JS for all four pages:

```
dist/
├── index.html
├── about.html
├── work.html
├── contact.html
└── assets/
    ├── main-[hash].css
    ├── main-[hash].js
    ├── about-[hash].css
    ├── work-[hash].css
    ├── contact-[hash].css
    ├── contact-[hash].js
    └── work-[hash].js
```

The `dist/` folder is what you upload to your hosting provider.

---

## Preview the Production Build

To locally serve the `dist/` output exactly as it will run in production:

```bash
npm run preview
```

This is useful for catching any issues that only appear in the built version before deploying.

---

## Project Structure

```
/
├── index.html            # Home page (hero animation + intro + skills)
├── about.html            # About page (bio, timeline, interests)
├── work.html             # Work/Projects page
├── contact.html          # Contact page (details + form)
│
├── css/
│   ├── main.css          # Global design tokens, reset, nav, footer,
│   │                     # hero animation styles, shared components
│   ├── about.css         # Styles for about.html only
│   ├── work.css          # Styles for work.html only
│   └── contact.css       # Styles for contact.html only
│
├── js/
│   ├── main.js           # SprayPaintAnimation class, nav, scroll reveal
│   ├── work.js           # Project card interactions
│   └── contact.js        # Contact form validation
│
├── img/
│   └── *.png             # Images used on the site
│
├── public/
│   └── vite.svg          # Static assets (copied as-is to dist/)
│
├── vite.config.js        # Vite multi-page build configuration
├── package.json          # Project metadata and scripts
└── README.md             # This file
```

---

## Pages

| File | URL | Description |
|------|-----|-------------|
| `index.html` | `/` | Home — spray-paint hero animation, intro, experience, recent work, skills |
| `about.html` | `/about.html` | About — bio, education timeline, interests |
| `work.html` | `/work.html` | Work — featured project cards |
| `contact.html` | `/contact.html` | Contact — details, social links, message form |

---

## Customization

All design tokens (colors, fonts, spacing, shadows) live in the `:root` block at the top of `css/main.css`. Change them once and they update everywhere:

```css
:root {
  --color-primary:    #3B6FE8;   /* Electric blue */
  --color-accent:     #FF1F9A;   /* Hot pink */
  --color-gold:       #F5C842;   /* Warm gold */
  --color-dark:       #111118;   /* Near-black background */
  --font-display:     'Boogaloo', cursive;
  --font-body:        'Inter', sans-serif;
  /* ... */
}
```

### Replacing placeholder content

Search for the following strings and replace them with real data:

| Placeholder | Where to replace |
|-------------|-----------------|
| `veroushka@example.com` | `contact.html` |
| `+597 xxx xxxx` | `contact.html` |
| `Project Alpha` / `Study Buddy` / `EcoTrack` | `work.html`, `index.html` |
| `Anton de Kom University of Suriname` | `about.html`, `index.html` |
| Social link `href="#"` values | All pages (nav, footer, contact) |

### Adding a real profile photo

Replace the placeholder `VR` monogram in `about.html`:

```html
<!-- Find this element in about.html and replace with an <img> tag -->
<div class="about-bio__image-placeholder">VR</div>
```

Replace with:

```html
<img src="./img/your-photo.jpg" alt="Veroushka Ramjiawan" class="about-bio__photo" />
```

Then add the appropriate CSS in `css/about.css`.

### Spray-paint animation

The hero animation is controlled by constants at the top of `js/main.js`:

- **`LETTER_DATA`** — colors assigned to each letter
- **`WORD1_DRIPS` / `WORD2_DRIPS`** — drip positions, heights, colors, and timing

Letter colors cycle through:

| Variable | Hex | Appearance |
|----------|-----|------------|
| Orange-red | `#C9421A` | Deep rust |
| Warm orange | `#E87A2A` | Bright orange |
| Teal | `#1A6B6B` | Dark teal |
| Gold | `#F5C842` | Warm yellow |

---

## Browser Support

The site targets modern evergreen browsers:

| Browser | Supported |
|---------|-----------|
| Chrome / Edge (latest) | ✅ |
| Firefox (latest) | ✅ |
| Safari 15+ / iOS Safari | ✅ |
| Older IE / Legacy browsers | ❌ |

Features used that require modern browser support:
- `SVG feTurbulence` + `feDisplacementMap` filters (hero animation)
- CSS `paint-order`, `-webkit-text-stroke`
- `IntersectionObserver` (scroll reveal)
- CSS `backdrop-filter` (nav frosted glass)
- CSS custom properties (`var()`)

On devices with limited CPU/GPU (`hardwareConcurrency ≤ 4` or `deviceMemory ≤ 2`), the SVG filter scale animation is automatically skipped for better performance — the letters still appear with the texture, just without the animated sharpening.

---

## Accessibility

- All animated elements have `aria-hidden="true"` so screen readers skip them
- The hero name has `role="heading" aria-level="1" aria-label="Veroushka Ramjiawan"` so it is announced correctly regardless of animation state
- `prefers-reduced-motion: reduce` is respected globally — all animations and transitions are disabled; the spray-paint name renders fully visible immediately
- All interactive elements have visible `:focus-visible` outlines in hot-pink (`#FF1F9A`)
- Color contrast meets WCAG AA (4.5:1 minimum) for all body text
- The contact form uses `aria-required`, `aria-invalid`, and live `role="alert"` error messages

---

## Deployment

After running `npm run build`, upload the contents of the `dist/` folder to any static hosting service:

- **Netlify** — drag and drop the `dist/` folder at [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — run `npx vercel --prod` from the project root
- **GitHub Pages** — push `dist/` to a `gh-pages` branch
- **Any web host** — upload via FTP/SFTP to your `public_html` or `www` directory

No server-side runtime or database is required — this is a fully static site.

---

*Built for Veroushka Ramjiawan's academic portfolio. Replace all placeholder content before going live.*
