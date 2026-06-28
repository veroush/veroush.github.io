/**
 * SprayPaintAnimation
 *
 * Renders "Veroushka Ramjiawan" as a frame-accurate spray-paint graffiti reveal.
 * Phases:
 *   0  — Pre-load pause (400ms)
 *   1  — Mist cloud blooms in (600ms)
 *   2  — Letter-by-letter spray reveal (approx 4.9s)
 *   3  — Paint drips form per-word
 *   4/5 — Blur/contrast paint texture + shimmer + mist pulse (ongoing)
 */

const COLORS = ['#C9421A', '#E87A2A', '#1A6B6B', '#F5C842'];
const RGBS   = ['201,66,26', '232,122,42', '26,107,107', '245,200,66'];

const LETTER_DATA = [
  ...['V','e','r','o','u','s','h','k','a'].map((ch, i) => ({
    char: ch, color: COLORS[i % 4], rgb: RGBS[i % 4],
  })),
  ...['R','a','m','j','i','a','w','a','n'].map((ch, i) => ({
    char: ch, color: COLORS[(i + 1) % 4], rgb: RGBS[(i + 1) % 4],
  })),
];

const WORD1_COUNT = 9;

const WORD1_DRIPS = [
  { xPct: 8,  height: 38, color: '#C9421A', delay: 0,   duration: 700,  width: 2.5 },
  { xPct: 28, height: 52, color: '#1A6B6B', delay: 120, duration: 900,  width: 3.5 },
  { xPct: 48, height: 44, color: '#F5C842', delay: 60,  duration: 800,  width: 3.0 },
  { xPct: 70, height: 35, color: '#E87A2A', delay: 200, duration: 650,  width: 2.5 },
  { xPct: 90, height: 60, color: '#C9421A', delay: 80,  duration: 1000, width: 3.5 },
];

const WORD2_DRIPS = [
  { xPct: 12, height: 42, color: '#E87A2A', delay: 0,   duration: 750,  width: 3.0 },
  { xPct: 38, height: 58, color: '#F5C842', delay: 150, duration: 950,  width: 3.5 },
  { xPct: 62, height: 36, color: '#1A6B6B', delay: 50,  duration: 680,  width: 2.5 },
  { xPct: 85, height: 48, color: '#C9421A', delay: 180, duration: 820,  width: 3.0 },
];

class SprayPaintAnimation {
  constructor() {
    this.canvas    = document.querySelector('.spray-paint-canvas');
    this.word1El   = document.getElementById('word-1');
    this.word2El   = document.getElementById('word-2');
    this.mistEl    = document.querySelector('.spray-mist');
    this.tagline   = document.querySelector('.hero-tagline');
    this.filterSVG = document.getElementById('spray-filters');
    this.letterEls = [];
    this.hazeEls   = [];
    this.isLowEnd  = false;
    this._dripSVGsBuilt = false;
  }

  init() {
    if (!this.canvas) return;
    const cpus = navigator.hardwareConcurrency ?? 4;
    const mem  = navigator.deviceMemory ?? 4;
    this.isLowEnd = cpus <= 4 || mem <= 2;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.showStaticState();
      return;
    }
    this.buildFilters();
    this.buildLetters();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      this.buildDrips();
      this._dripSVGsBuilt = true;
    }));
    this.runAnimation();
  }

  async runAnimation() {
    await this.delay(400);
    await this.bloomMist();
    await this.revealLetters();
    await this.formDrips();
    this.applySettleEffects();
    this.fadeInTagline();
  }

  async bloomMist() {
    if (!this.mistEl) return;
    this.mistEl.classList.add('spray-mist--bloom');
    await this.delay(600);
    this.mistEl.style.opacity   = '1';
    this.mistEl.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  async revealLetters() {
    this.letterEls.forEach(el => { el.style.willChange = 'opacity, filter'; });
    this.hazeEls.forEach(el   => { el.style.willChange = 'opacity, transform'; });
    for (let i = 0; i < this.letterEls.length; i++) {
      this.revealLetter(i);
      if (i === WORD1_COUNT - 1) {
        await this.delay(160 + 300);
      } else {
        await this.delay(160);
      }
    }
    await this.delay(220);
    this.letterEls.forEach(el => { el.style.willChange = 'auto'; });
    this.hazeEls.forEach(el   => { el.style.willChange = 'auto'; });
  }

  async revealLetter(index) {
    const letter = this.letterEls[index];
    const haze   = this.hazeEls[index];
    if (!letter || !haze) return;
    haze.classList.remove('letter-haze--residual');
    haze.classList.add('letter-haze--bloom');
    await this.delay(80);
    letter.style.filter = 'url(#spray-texture-' + index + ')';
    letter.classList.add('spray-letter--reveal');
    if (!this.isLowEnd) {
      this.animateFilterScale('spray-texture-' + index, 18, 4, 180);
    }
    await this.delay(120);
    haze.classList.remove('letter-haze--bloom');
    haze.classList.add('letter-haze--residual');
    await this.delay(100);
    letter.style.filter = 'url(#spray-texture-settled-' + index + ')';
  }

  async formDrips() {
    if (!this._dripSVGsBuilt) await this.delay(100);
    this.triggerWordDrips('drips-1');
    await this.delay(280);
    this.triggerWordDrips('drips-2');
    await this.delay(1200);
  }

  triggerWordDrips(svgId) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    svg.querySelectorAll('.drip-line').forEach(line => {
      line.style.strokeDashoffset = '0';
    });
    svg.querySelectorAll('.drip-tip').forEach(tip => {
      tip.style.opacity   = '1';
      tip.style.transform = 'scale(1)';
    });
  }

  applySettleEffects() {
    if (this.canvas) this.canvas.classList.add('spray-paint-canvas--shimmer');
    if (this.mistEl) {
      this.mistEl.style.opacity   = '';
      this.mistEl.style.transform = '';
      this.mistEl.classList.add('spray-mist--pulse');
    }
  }

  async fadeInTagline() {
    await this.delay(500);
    if (this.tagline) {
      this.tagline.classList.add('hero-tagline--visible');
      this.tagline.setAttribute('aria-hidden', 'false');
    }
    await this.delay(400);
    const arrow = document.querySelector('.scroll-arrow');
    if (arrow) arrow.classList.add('scroll-arrow--visible');
  }

  showStaticState() {
    this.buildLetters();
    this.letterEls.forEach(el => {
      el.classList.add('spray-letter--reveal');
      el.style.filter = 'none';
    });
    this.hazeEls.forEach(el => {
      el.classList.add('letter-haze--residual');
    });
    if (this.mistEl) {
      this.mistEl.style.opacity   = '0.6';
      this.mistEl.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      this.buildDrips();
    }));
    if (this.tagline) {
      this.tagline.classList.add('hero-tagline--visible');
      this.tagline.setAttribute('aria-hidden', 'false');
    }
    const arrow = document.querySelector('.scroll-arrow');
    if (arrow) arrow.classList.add('scroll-arrow--visible');
  }

  buildFilters() {
    const defs = this.filterSVG?.querySelector('defs');
    if (!defs) return;
    for (let i = 0; i < LETTER_DATA.length; i++) {
      defs.appendChild(this.createFilterEl('spray-texture-' + i,         18, 1.5));
      defs.appendChild(this.createFilterEl('spray-texture-settled-' + i,  4, 0.4));
    }
  }

  createFilterEl(id, displaceScale, blurStd) {
    const NS = 'http://www.w3.org/2000/svg';
    const filter = document.createElementNS(NS, 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('x', '-20%');
    filter.setAttribute('y', '-20%');
    filter.setAttribute('width',  '140%');
    filter.setAttribute('height', '140%');
    const turbulence = document.createElementNS(NS, 'feTurbulence');
    turbulence.setAttribute('type',          'fractalNoise');
    turbulence.setAttribute('baseFrequency', '0.65');
    turbulence.setAttribute('numOctaves',    '3');
    turbulence.setAttribute('seed', String((id.charCodeAt(id.length - 1) * 7) % 99 + 1));
    turbulence.setAttribute('result', 'noise');
    const dispMap = document.createElementNS(NS, 'feDisplacementMap');
    dispMap.setAttribute('in',              'SourceGraphic');
    dispMap.setAttribute('in2',             'noise');
    dispMap.setAttribute('scale',           String(displaceScale));
    dispMap.setAttribute('xChannelSelector','R');
    dispMap.setAttribute('yChannelSelector','G');
    dispMap.setAttribute('result',          'displaced');
    const blur = document.createElementNS(NS, 'feGaussianBlur');
    blur.setAttribute('in',           'displaced');
    blur.setAttribute('stdDeviation', String(blurStd));
    blur.setAttribute('result',       'blurred');
    filter.appendChild(turbulence);
    filter.appendChild(dispMap);
    filter.appendChild(blur);
    return filter;
  }

  buildLetters() {
    this.letterEls = [];
    this.hazeEls   = [];
    this.buildWordLetters(this.word1El, LETTER_DATA.slice(0, WORD1_COUNT), 0);
    this.buildWordLetters(this.word2El, LETTER_DATA.slice(WORD1_COUNT),    WORD1_COUNT);
  }

  buildWordLetters(wordEl, letters, globalOffset) {
    if (!wordEl) return;
    wordEl.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'spray-letters-row';
    letters.forEach(function(item, localIdx) {
      var char = item.char, color = item.color, rgb = item.rgb;
      var globalIdx = globalOffset + localIdx;
      var wrap = document.createElement('span');
      wrap.className = 'spray-letter-wrap';
      var haze = document.createElement('span');
      haze.className = 'letter-haze';
      haze.setAttribute('aria-hidden', 'true');
      haze.style.setProperty('--haze-color', color);
      var letter = document.createElement('span');
      letter.className = 'spray-letter';
      letter.textContent = char;
      letter.style.setProperty('--letter-color',     color);
      letter.style.setProperty('--letter-color-rgb', rgb);
      letter.style.filter = 'url(#spray-texture-settled-' + globalIdx + ')';
      wrap.appendChild(haze);
      wrap.appendChild(letter);
      row.appendChild(wrap);
      this.letterEls.push(letter);
      this.hazeEls.push(haze);
    }.bind(this));
    wordEl.appendChild(row);
  }

  buildDrips() {
    this.buildDripSVGForWord(this.word1El, WORD1_DRIPS, 'drips-1');
    this.buildDripSVGForWord(this.word2El, WORD2_DRIPS, 'drips-2');
  }

  buildDripSVGForWord(wordEl, dripsConfig, svgId) {
    if (!wordEl) return;
    document.getElementById(svgId)?.remove();
    var wordW = wordEl.offsetWidth  || 300;
    var maxH  = Math.max.apply(null, dripsConfig.map(function(d){ return d.height; })) + 12;
    var NS    = 'http://www.w3.org/2000/svg';
    var svg   = document.createElementNS(NS, 'svg');
    svg.setAttribute('id',    svgId);
    svg.setAttribute('class', 'drips-svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('width',  wordW);
    svg.setAttribute('height', maxH);
    svg.style.cssText = 'position:absolute;top:100%;left:0;width:' + wordW + 'px;height:' + maxH + 'px;overflow:visible;pointer-events:none;filter:url(#drip-blob);';
    dripsConfig.forEach(function(drip) {
      var xPx = (drip.xPct / 100) * wordW;
      var g   = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'drip');
      var line = document.createElementNS(NS, 'line');
      line.setAttribute('class',         'drip-line');
      line.setAttribute('x1',            xPx.toFixed(1));
      line.setAttribute('y1',            '0');
      line.setAttribute('x2',            xPx.toFixed(1));
      line.setAttribute('y2',            drip.height);
      line.setAttribute('stroke',        drip.color);
      line.setAttribute('stroke-width',  drip.width);
      line.setAttribute('stroke-linecap','round');
      line.style.strokeDasharray  = drip.height;
      line.style.strokeDashoffset = drip.height;
      line.style.transition = 'stroke-dashoffset ' + drip.duration + 'ms cubic-bezier(0.25,0.1,0.15,1.0) ' + drip.delay + 'ms';
      var tip = document.createElementNS(NS, 'circle');
      tip.setAttribute('class', 'drip-tip');
      tip.setAttribute('cx',    xPx.toFixed(1));
      tip.setAttribute('cy',    drip.height);
      tip.setAttribute('r',     '4');
      tip.setAttribute('fill',  drip.color);
      tip.style.opacity         = '0';
      tip.style.transform       = 'scale(0)';
      tip.style.transformOrigin = xPx.toFixed(1) + 'px ' + drip.height + 'px';
      var tipDelay = drip.delay + drip.duration;
      tip.style.transition = 'opacity 200ms ease ' + tipDelay + 'ms, transform 200ms ease ' + tipDelay + 'ms';
      g.appendChild(line);
      g.appendChild(tip);
      svg.appendChild(g);
    });
    wordEl.appendChild(svg);
  }

  animateFilterScale(filterId, fromScale, toScale, duration) {
    var filter = document.getElementById(filterId);
    if (!filter) return;
    var dispMap = filter.querySelector('feDisplacementMap');
    if (!dispMap) return;
    var start = performance.now();
    var tick = function(now) {
      var t     = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var scale = fromScale + (toScale - fromScale) * eased;
      dispMap.setAttribute('scale', scale.toFixed(2));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  delay(ms) {
    return new Promise(function(resolve){ setTimeout(resolve, ms); });
  }
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════ */
function initNav() {
  var hamburger    = document.querySelector('.nav__hamburger');
  var overlay      = document.querySelector('.nav__overlay');
  var overlayLinks = document.querySelectorAll('.nav__overlay .nav__link');
  if (!hamburger || !overlay) return;
  hamburger.addEventListener('click', function() {
    var isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  overlayLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el) { observer.observe(el); });
}

/* ═══════════════════════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════════════════════ */
function initBackToTop() {
  var btn = document.querySelector('.footer__back-top');
  if (!btn) return;
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════
   SCROLL-DRIVEN TEXT GRADIENT REVEAL
═══════════════════════════════════════════════════════════ */
function initScrollGradient() {
  var headings = document.querySelectorAll('.section__heading');
  if (!headings.length) return;
  window.addEventListener('scroll', function() {
    var maxScroll      = document.documentElement.scrollHeight - window.innerHeight;
    var scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    var gradientX      = scrollProgress * 100;
    var gradientY      = (scrollProgress * 150) % 100;
    headings.forEach(function(heading) {
      heading.style.setProperty('--scroll-x', gradientX + '%');
      heading.style.setProperty('--scroll-y', gradientY + '%');
    });
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   SPLATTER CARDS
═══════════════════════════════════════════════════════════ */
function initSplatterCards() {
  document.querySelectorAll('.splatter-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() { card.style.willChange = 'transform'; });
    card.addEventListener('mouseleave', function() { card.style.willChange = 'auto'; });
  });
}

/* ═══════════════════════════════════════════════════════════
   PAGE TRANSITIONS — CRT TV turn-off effect with static noise
═══════════════════════════════════════════════════════════ */
function initPageTransitions() {
  var overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  var canvas = document.createElement('canvas');
  var ctx    = canvas.getContext('2d');
  overlay.appendChild(canvas);

  var noiseFrame;

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawNoise() {
    var w         = canvas.width;
    var h         = canvas.height;
    var imageData = ctx.createImageData(w, h);
    var data      = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var val    = Math.random() * 255;
      data[i]     = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    noiseFrame = requestAnimationFrame(drawNoise);
  }

  function startNoise() {
    resizeCanvas();
    drawNoise();
  }

  function stopNoise() {
    cancelAnimationFrame(noiseFrame);
  }

  if (sessionStorage.getItem('crt-transition') === 'true') {
    sessionStorage.removeItem('crt-transition');
    startNoise();
    overlay.classList.add('page-transition-overlay--in');
    overlay.addEventListener('animationend', stopNoise, { once: true });
  }

  document.querySelectorAll('a[href]').forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
    link.addEventListener('click', function(e) {
      e.preventDefault();
      sessionStorage.setItem('crt-transition', 'true');
      startNoise();
      overlay.classList.add('page-transition-overlay--out');
      setTimeout(function() {
        stopNoise();
        window.location.href = href;
      }, 500);
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  initNav();
  initScrollReveal();
  initBackToTop();
  initScrollGradient();
  initSplatterCards();
  initPageTransitions();

  if (document.querySelector('.spray-paint-canvas')) {
    var anim = new SprayPaintAnimation();
    anim.init();
  }
});