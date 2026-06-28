/* ============================================================
   WORK PAGE — Subway Station Controller
   ============================================================ */

(function () {
  'use strict';

  /* ── PROJECT DATA ────────────────────────────────────────── */
  const PROJECTS = [
    {
      id:       'taskflow',
      eyebrow:  'PROJECT_001',
      number:   '001',
      title:    'TaskFlow',
      tagline:  'Plan. Track. Deliver.',
      desc:     'A professional Scrum-based project management platform. Built for teams who want clarity, speed, and structure in their agile workflow.',
      tags:     ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
      github:   'https://github.com/Veroush/taskflow',
      dest:     'TASKFLOW',
      theme:    'taskflow',
      graffiti: ['SYS', ''],
    },
    {
      id:       'booksteria',
      eyebrow:  'PROJECT_002',
      number:   '002',
      title:    'Chronicles of Booksteria',
      tagline:  'Read. Browse. Discover.',
      desc:     'An online webshop for books and manga. Browse products, manage a cart, and complete purchases through a clean e-commerce experience.',
      tags:     ['HTML', 'CSS', 'JavaScript', 'PHP'],
      github:   'https://github.com/Veroush/chronicles_of_booksteria',
      dest:     'BOOKSTERIA',
      theme:    'booksteria',
      graffiti: ['READ', ''],
    },
    {
      id:       'pixeljumper',
      eyebrow:  'PROJECT_003',
      number:   '003',
      title:    'Pixel Jumper',
      tagline:  'INSERT COIN TO CONTINUE',
      desc:     'A retro 80s-style arcade platformer. Hop between game worlds, battle bosses, and chase the high score in this pixel-art adventure.',
      tags:     ['JavaScript', 'Phaser 3', 'HTML5 Canvas'],
      github:   'https://github.com/Veroush/pixel-jumper-arcade-odyssey',
      dest:     'PIXEL JUMPER',
      theme:    'pixeljumper',
      graffiti: ['PLAY', ''],
    },
    {
      id:       'studie',
      eyebrow:  'PROJECT_004',
      number:   '004',
      title:    'Studie4SU',
      tagline:  'Your path. Your future.',
      desc:     'A web platform for students in Suriname to explore higher-education options. Compare programs, view events, and find your path.',
      tags:     ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      github:   'https://github.com/Veroush/Studie4SU',
      dest:     'STUDIE4SU',
      theme:    'studie',
      graffiti: ['EDU', ''],
    },
  ];

  /* ── STATE ───────────────────────────────────────────────── */
  let current   = 0;
  let animating = false;

  /* ── DOM REFS ────────────────────────────────────────────── */
  const train        = document.getElementById('train');
  const doorLeft     = document.getElementById('door-left');
  const doorRight    = document.getElementById('door-right');
  const panel        = document.getElementById('project-panel');

  const ppEyebrow    = document.getElementById('pp-eyebrow');
  const ppTitle      = document.getElementById('pp-title');
  const ppTagline    = document.getElementById('pp-tagline');
  const ppDesc       = document.getElementById('pp-desc');
  const ppTags       = document.getElementById('pp-tags');
  const ppGithub     = document.getElementById('pp-github');

  const trainNumber  = document.getElementById('train-number');
  const trainDest    = document.getElementById('train-dest');
  const graffLeft    = document.getElementById('train-graffiti-left');
  const graffRight   = document.getElementById('train-graffiti-right');

  const abNow        = document.getElementById('ab-now');
  const abNext       = document.getElementById('ab-next');
  const abEta        = document.getElementById('ab-eta');

  const pcDots       = document.getElementById('pc-dots');
  const pcCurrent    = document.getElementById('pc-current');
  const pcTotal      = document.getElementById('pc-total');

  const mnPrev       = document.getElementById('mn-prev');
  const mnNext       = document.getElementById('mn-next');

  /* ── HELPERS ─────────────────────────────────────────────── */
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function nextIdx(delta) {
    return (current + delta + PROJECTS.length) % PROJECTS.length;
  }

  /* ── POPULATE CONTENT ────────────────────────────────────── */
  function applyProject(p, instant) {
    if (!instant) panel.style.opacity = '0';

    ppEyebrow.textContent  = p.eyebrow;
    ppTitle.textContent    = p.title;
    ppTagline.textContent  = p.tagline;
    ppDesc.textContent     = p.desc;
    ppGithub.href          = p.github;
    trainNumber.textContent = p.number;
    trainDest.textContent  = p.dest;
    graffLeft.textContent  = p.graffiti[0] || '';
    graffRight.textContent = p.graffiti[1] || '';

    // Tags
    ppTags.innerHTML = '';
    p.tags.forEach(t => {
      const s = document.createElement('span');
      s.className   = 'pp-tag';
      s.textContent = t;
      ppTags.appendChild(s);
    });

    // Theme
    train.className = train.className
      .replace(/train--theme-\S+/g, '')
      .trim();
    train.classList.add('train--theme-' + p.theme);

    if (!instant) {
      requestAnimationFrame(() => {
        panel.style.transition = 'opacity 0.3s ease';
        panel.style.opacity    = '1';
      });
    } else {
      panel.style.opacity = '1';
    }
  }

  /* ── DOTS ────────────────────────────────────────────────── */
  function buildDots() {
    pcDots.innerHTML = '';
    pcTotal.textContent = PROJECTS.length;
    PROJECTS.forEach((_, i) => {
      const d = document.createElement('button');
      d.className  = 'pc-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', 'Project ' + (i + 1));
      d.addEventListener('click', () => { if (!animating) goTo(i); });
      pcDots.appendChild(d);
    });
  }

  function updateDots() {
    document.querySelectorAll('.pc-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    pcCurrent.textContent = current + 1;
  }

  /* ── ARRIVAL BOARD ───────────────────────────────────────── */
  function updateBoard(nowProject, nextProject) {
    // Flip effect
    abNow.style.opacity = '0';
    setTimeout(() => {
      abNow.textContent  = nowProject.dest;
      abNext.textContent = nextProject.dest;
      abNow.style.opacity = '1';
    }, 200);
  }

  /* ── TRAIN ARRIVAL SEQUENCE ──────────────────────────────── */
  async function arriveFrom(direction) {
    // Start off-screen
    train.className = train.className
      .replace(/train--parked|train--depart-left|train--depart-right|train--arrive-right|train--settling/g, '')
      .trim();

    if (direction === 'right') {
      train.classList.add('train--arrive-right');
    }
    // else it's already off-screen left (default initial state)

    await wait(50); // let browser register start position

    // Slide in
    train.classList.remove('train--arrive-right', 'train--depart-left', 'train--depart-right');
    train.classList.add('train--parked');

    await wait(950); // wait for train to fully arrive

    // Settle shake
    train.classList.add('train--settling');
    await wait(450);
    train.classList.remove('train--settling');

    await wait(300); // brief pause

    // Open doors
    doorLeft.classList.add('door--open');
    doorRight.classList.add('door--open');
  }

  /* ── TRAIN DEPART SEQUENCE ───────────────────────────────── */
  async function depart(direction) {
    // Close doors first
    doorLeft.classList.remove('door--open');
    doorRight.classList.remove('door--open');

    await wait(600); // doors close

    // Depart
    train.classList.remove('train--parked', 'train--settling');
    if (direction === 'left') {
      train.classList.add('train--depart-left');
    } else {
      train.classList.add('train--depart-right');
    }

    await wait(700); // train gone
  }

  /* ── TRANSITION ──────────────────────────────────────────── */
  async function goTo(targetIdx) {
    if (animating || targetIdx === current) return;
    animating = true;

    const delta     = targetIdx - current;
    const goingNext = delta > 0 || (delta < -(PROJECTS.length / 2));

    // Depart current
    await depart(goingNext ? 'left' : 'right');

    // Update content
    current = targetIdx;
    applyProject(PROJECTS[current], false);
    updateDots();
    updateBoard(PROJECTS[current], PROJECTS[nextIdx(1)]);

    // Arrive from opposite side
    await arriveFrom(goingNext ? 'right' : 'left');

    animating = false;
  }

  function goNext() { goTo(nextIdx(1)); }
  function goPrev() { goTo(nextIdx(-1)); }

  /* ── INPUT ───────────────────────────────────────────────── */
  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
    if (e.key === 'Enter') {
      const link = document.getElementById('pp-github');
      if (link && link.href) window.open(link.href, '_blank', 'noopener');
    }
  });

  // Scroll wheel
  let wheelCooldown = false;
  window.addEventListener('wheel', e => {
    if (wheelCooldown || animating) return;
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 1200);
    if (e.deltaY > 0) goNext();
    else              goPrev();
  }, { passive: true });

  // Touch swipe
  let touchY = null;
  window.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchend', e => {
    if (touchY === null) return;
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) {
      if (dy > 0) goNext();
      else        goPrev();
    }
    touchY = null;
  }, { passive: true });

  // Mobile buttons
  if (mnNext) mnNext.addEventListener('click', goNext);
  if (mnPrev) mnPrev.addEventListener('click', goPrev);

  /* ── INIT ────────────────────────────────────────────────── */
  function init() {
    buildDots();
    applyProject(PROJECTS[0], true);
    updateBoard(PROJECTS[0], PROJECTS[1]);

    // Close doors before first arrival so they open dramatically
    doorLeft.classList.remove('door--open');
    doorRight.classList.remove('door--open');

    // Kick off initial arrival after a short delay
    setTimeout(async () => {
      train.classList.remove('train--parked');
      await arriveFrom('left');
    }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();