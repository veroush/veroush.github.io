(() => {
  'use strict';

  /* ── CONFIG ──────────────────────────────────────────────────── */
  const MULTITAP_MAP = {
    '1': ['.', ',', '!', '?', "'", '-', '1'],
    '2': ['a','b','c','2'],
    '3': ['d','e','f','3'],
    '4': ['g','h','i','4'],
    '5': ['j','k','l','5'],
    '6': ['m','n','o','6'],
    '7': ['p','q','r','s','7'],
    '8': ['t','u','v','8'],
    '9': ['w','x','y','z','9'],
    '0': [' ','0'],
    'star': ['@', '.', '_', '-', '+', '~'],
    'hash': [' '],
  };

  const MULTITAP_DELAY = 900;

  const MENU_ACTIONS  = ['newMessage','contacts','settings','about'];
  const SETTINGS_OPTS = ['multitap','keyboard'];

  /* ── DOM ─────────────────────────────────────────────────────── */
  const phone     = document.getElementById('phone');
  const lcdEl     = document.getElementById('lcd');
  const lcdInner  = document.getElementById('lcd-inner');
  const statusBar = document.getElementById('status-bar');
  const signalEl  = document.getElementById('signal-el');
  const clockEl   = document.getElementById('clock-el');
  const homeClock = document.getElementById('home-time');
  const homeDate  = document.getElementById('home-date');
  const kbdProxy  = document.getElementById('kbd-proxy');
  const sendFill  = document.getElementById('send-fill');
  const bootWord  = document.getElementById('boot-word');
  const bootTag   = document.getElementById('boot-tag');
  const bootProg  = document.getElementById('boot-prog');
  const bootFill  = document.getElementById('boot-fill');
  const bootMsg   = document.getElementById('boot-msg');

  const screens = {};
  ['boot','home','contacts','settings','about',
   'cname','cemail','csubject','cmessage','sending','success']
    .forEach(id => { screens[id] = document.getElementById('s-' + id); });

  const displays = {
    name:    document.getElementById('d-name'),
    email:   document.getElementById('d-email'),
    subject: document.getElementById('d-subject'),
    message: document.getElementById('d-message'),
  };

  const modeBadges = {
    name:    document.getElementById('im-name'),
    email:   document.getElementById('im-email'),
    subject: document.getElementById('im-subject'),
    message: document.getElementById('im-message'),
  };

  const lsoftBtn = document.getElementById('btn-lsoft');
  const rsoftBtn = document.getElementById('btn-rsoft');

  /* ── STATE ───────────────────────────────────────────────────── */
  const S = {
    screen:      'boot',
    menuIdx:     0,
    settingsIdx: 0,
    inputMode:   'multitap',
    caps:        false,
    form:        { name:'', email:'', subject:'', message:'' },
    field:       'name',
    text:        '',
    pending:     null,
  };

  /* ── AUDIO ───────────────────────────────────────────────────── */
  let audioCtx = null;

  function ctx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e) { audioCtx = null; }
    }
    return audioCtx;
  }

  function tone(freq, dur, type = 'square', vol = 0.05) {
    const c = ctx();
    if (!c) return;
    try {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      osc.start();
      osc.stop(c.currentTime + dur);
    } catch(e) {}
  }

  function clickSound()   { tone(1100 + Math.random() * 200, 0.04); }
  function navSound()     { tone(800, 0.03); }
  function backSound()    { tone(600, 0.04); }
  function successSound() {
    [880, 1108, 1318, 1760].forEach((f, i) =>
      setTimeout(() => tone(f, 0.12, 'sine', 0.06), i * 80));
  }

  /* ── VIBRATION ───────────────────────────────────────────────── */
  function vibrate(pattern = [35, 25, 35]) {
    if (navigator.vibrate) navigator.vibrate(pattern);
    phone.classList.add('vibrating');
    setTimeout(() => phone.classList.remove('vibrating'), 350);
  }

  /* ── CLOCK ───────────────────────────────────────────────────── */
  function updateClock() {
    const now    = new Date();
    const h      = now.getHours();
    const m      = String(now.getMinutes()).padStart(2, '0');
    const str    = `${h % 12 || 12}:${m}`;
    const ap     = h >= 12 ? 'PM' : 'AM';
    const days   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

    clockEl.textContent   = str + ' ' + ap;
    homeClock.textContent = str;
    homeDate.textContent  = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
  }

  updateClock();
  setInterval(updateClock, 10000);

  /* ── BACKLIGHT / INACTIVITY ──────────────────────────────────── */
  let backlightTimer = null;

  function wakeScreen() {
    lcdEl.classList.remove('dim', 'off');
    lcdEl.classList.add('lit');
    lcdInner.classList.remove('dimmed');
    resetBacklightTimer();
  }

  function resetBacklightTimer() {
    clearTimeout(backlightTimer);
    if (S.screen === 'boot') return;
    backlightTimer = setTimeout(() => {
      lcdInner.classList.add('dimmed');
      backlightTimer = setTimeout(() => {
        lcdEl.classList.remove('lit');
        lcdEl.classList.add('dim');
      }, 12000);
    }, 8000);
  }

  document.addEventListener('click',   wakeScreen);
  document.addEventListener('keydown', wakeScreen);

  /* ── SCREEN MANAGEMENT ───────────────────────────────────────── */
  function showScreen(name) {
    Object.values(screens).forEach(el => el && el.classList.remove('active'));
    if (screens[name]) screens[name].classList.add('active');
    S.screen = name;
    lcdEl.classList.add('flicker');
    setTimeout(() => lcdEl.classList.remove('flicker'), 120);
    wakeScreen();
  }

  /* ── MENU HIGHLIGHT ──────────────────────────────────────────── */
  function highlightMenu() {
    document.querySelectorAll('#main-menu .menu-item').forEach((el, i) => {
      el.classList.toggle('sel', i === S.menuIdx);
      el.tabIndex = i === S.menuIdx ? 0 : -1;
    });
  }

  function highlightSettings() {
    document.querySelectorAll('#settings-menu .menu-item').forEach((el, i) => {
      el.classList.toggle('sel', i === S.settingsIdx);
      el.tabIndex = i === S.settingsIdx ? 0 : -1;
    });
  }

  function setSoftKeys(left, right) {
    lsoftBtn.textContent = left;
    rsoftBtn.textContent = right;
  }

  /* ── NAVIGATION ──────────────────────────────────────────────── */
  function navUp() {
    navSound();
    if (S.screen === 'home') {
      S.menuIdx = Math.max(0, S.menuIdx - 1);
      highlightMenu();
    } else if (S.screen === 'settings') {
      S.settingsIdx = Math.max(0, S.settingsIdx - 1);
      highlightSettings();
    }
  }

  function navDown() {
    navSound();
    if (S.screen === 'home') {
      S.menuIdx = Math.min(MENU_ACTIONS.length - 1, S.menuIdx + 1);
      highlightMenu();
    } else if (S.screen === 'settings') {
      S.settingsIdx = Math.min(SETTINGS_OPTS.length - 1, S.settingsIdx + 1);
      highlightSettings();
    }
  }

  function navSelect() {
    tone(1000, 0.05);

    if (S.screen === 'home') {
      const action = MENU_ACTIONS[S.menuIdx];
      if (action === 'newMessage') {
        S.form = { name:'', email:'', subject:'', message:'' };
        gotoField('name');
      } else if (action === 'contacts') {
        showScreen('contacts');
        setSoftKeys('Back', '');
      } else if (action === 'settings') {
        showScreen('settings');
        highlightSettings();
        setSoftKeys('Back', 'Select');
      } else if (action === 'about') {
        showScreen('about');
        setSoftKeys('Back', '');
      }
    } else if (S.screen === 'settings') {
      S.inputMode = SETTINGS_OPTS[S.settingsIdx];
      document.getElementById('settings-active').textContent =
        'Active: ' + (S.inputMode === 'keyboard' ? 'Keyboard' : 'Multi-Tap');
      vibrate([20]);
      tone(660, 0.07);
    }
  }

  function navBack() {
    backSound();
    commitPending();

    if (['contacts','settings','about'].includes(S.screen)) {
      goHome();
    } else if (S.screen === 'cname') {
      goHome();
    } else if (S.screen === 'cemail') {
      gotoField('name');
    } else if (S.screen === 'csubject') {
      gotoField('email');
    } else if (S.screen === 'cmessage') {
      gotoField('subject');
    } else if (S.screen === 'success') {
      goHome();
    }
  }

  function navNext() {
    tone(1000, 0.05);
    commitPending();

    const map = { cname:'name', cemail:'email', csubject:'subject', cmessage:'message' };
    const field = map[S.screen];
    if (!field) return;

    S.form[field] = S.text;

    const nextField = { name:'email', email:'subject', subject:'message', message:null };
    const nf = nextField[field];
    if (nf) {
      gotoField(nf);
    } else {
      doSend();
    }
  }

  function goHome() {
    showScreen('home');
    highlightMenu();
    setSoftKeys('Menu', 'Select');
  }

  /* ── COMPOSE FLOW ────────────────────────────────────────────── */
  const fieldToScreen = {
    name:    'cname',
    email:   'cemail',
    subject: 'csubject',
    message: 'cmessage',
  };

  function gotoField(field) {
    S.field = field;
    S.text  = S.form[field] || '';
    clearPending();
    showScreen(fieldToScreen[field]);
    setSoftKeys('Back', field === 'message' ? 'Send' : 'Next');
    updateModeBadge(field);
    renderDisplay(field);

    if (S.inputMode === 'keyboard') {
      kbdProxy.value = S.text;
      setTimeout(() => kbdProxy.focus(), 80);
    }
  }

  function updateModeBadge(field) {
    const b = modeBadges[field];
    if (!b) return;
    b.textContent = S.inputMode === 'keyboard' ? 'kbd' : (S.caps ? 'ABC' : 'abc');
  }

  function renderDisplay(field) {
    const el = displays[field];
    if (!el) return;

    let html = esc(S.text);

    if (S.pending) {
      const pc = S.pending.chars[S.pending.idx];
      const ch = S.caps ? pc.toUpperCase() : pc;
      html += `<span class="pending">${esc(ch)}</span>`;
    }

    html += '<span class="cursor"></span>';
    el.innerHTML = html;
  }

  function esc(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/ /g, '&nbsp;');
  }

  /* ── MULTI-TAP ───────────────────────────────────────────────── */
  function clearPending() {
    if (S.pending) {
      clearTimeout(S.pending.timer);
      S.pending = null;
    }
  }

  function commitPending() {
    if (!S.pending) return;
    clearTimeout(S.pending.timer);
    const c = S.pending.chars[S.pending.idx];
    S.text += S.caps ? c.toUpperCase() : c;
    S.pending = null;
    S.form[S.field] = S.text;
    renderDisplay(S.field);
  }

  function handleMultiTap(key) {
    const chars = MULTITAP_MAP[key];
    if (!chars) return;

    if (S.pending && S.pending.key === key) {
      clearTimeout(S.pending.timer);
      S.pending.idx = (S.pending.idx + 1) % chars.length;
    } else {
      commitPending();
      S.pending = { key, chars, idx: 0, timer: null };
    }

    renderDisplay(S.field);

    S.pending.timer = setTimeout(() => {
      commitPending();
    }, MULTITAP_DELAY);
  }

  /* ── KEY HANDLING ────────────────────────────────────────────── */
  const composeSet = new Set(['cname','cemail','csubject','cmessage']);

  function handleKey(key) {
    if (!composeSet.has(S.screen)) return;

    clickSound();

    if (key === 'clr') {
      if (S.pending) {
        clearPending();
        renderDisplay(S.field);
      } else {
        S.text = S.text.slice(0, -1);
        S.form[S.field] = S.text;
        renderDisplay(S.field);
      }
      return;
    }

    if (key === 'star') {
      if (S.inputMode === 'multitap') {
        handleMultiTap('star');
      } else {
        S.caps = !S.caps;
        updateModeBadge(S.field);
      }
      return;
    }

    if (key === 'hash') {
      if (S.inputMode === 'multitap') {
        commitPending();
        S.text += ' ';
        S.form[S.field] = S.text;
        renderDisplay(S.field);
      }
      return;
    }

    if (key === 'call' || key === 'end') return;

    if (S.inputMode === 'multitap') {
      handleMultiTap(key);
    } else {
      kbdProxy.value = S.text;
      kbdProxy.focus();
    }
  }

  /* ── KEYBOARD PROXY ──────────────────────────────────────────── */
  kbdProxy.addEventListener('input', () => {
    if (S.inputMode !== 'keyboard' || !composeSet.has(S.screen)) return;
    S.text = kbdProxy.value;
    S.form[S.field] = S.text;
    renderDisplay(S.field);
  });

  kbdProxy.addEventListener('keydown', e => {
    if (e.key === 'Enter')     { e.preventDefault(); navNext(); }
    if (e.key === 'Escape')    { e.preventDefault(); navBack(); }
    if (e.key === 'Backspace') {
      setTimeout(() => {
        if (S.inputMode !== 'keyboard') return;
        S.text = kbdProxy.value;
        S.form[S.field] = S.text;
        renderDisplay(S.field);
      }, 0);
    }
  });

  /* ── SEND ────────────────────────────────────────────────────── */
  function doSend() {
    showScreen('sending');
    setSoftKeys('', '');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 8;
      if (progress > 100) progress = 100;
      if (sendFill) sendFill.style.width = progress + '%';

      const cls = ['s1','s2','s3','s4'];
      signalEl.className = 'signal ' + cls[Math.floor(Math.random() * cls.length)];

      if (progress >= 100) {
        clearInterval(interval);
        signalEl.className = 'signal s4';
        setTimeout(showSuccess, 400);
      }
    }, 200);

    submitFormData({ ...S.form });
  }

  function showSuccess() {
    showScreen('success');
    vibrate([40, 30, 40, 30, 80]);
    successSound();
    setSoftKeys('Back', '');

    setTimeout(() => {
      S.form = { name:'', email:'', subject:'', message:'' };
      goHome();
    }, 4000);
  }

  async function submitFormData(data) {
    console.log('📬 Contact form:', data);
    // TODO: connect to real backend
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
  }

  /* ── BUTTON PRESS ANIMATION ──────────────────────────────────── */
  function press(el) {
    el.classList.add('pressed');
    setTimeout(() => el.classList.remove('pressed'), 130);
  }

  /* ── PHYSICAL BUTTON WIRING ──────────────────────────────────── */
  document.getElementById('btn-up').addEventListener('click', e => {
    press(e.currentTarget); navUp();
  });
  document.getElementById('btn-down').addEventListener('click', e => {
    press(e.currentTarget); navDown();
  });
  document.getElementById('btn-left').addEventListener('click', e => {
    press(e.currentTarget);
    if (composeSet.has(S.screen)) navBack();
  });
  document.getElementById('btn-right').addEventListener('click', e => {
    press(e.currentTarget);
    if (composeSet.has(S.screen)) navNext();
  });
  document.getElementById('btn-ok').addEventListener('click', e => {
    press(e.currentTarget); navSelect();
  });

  lsoftBtn.addEventListener('click', e => {
    press(e.currentTarget); backSound(); navBack();
  });
  rsoftBtn.addEventListener('click', e => {
    press(e.currentTarget);
    const t = e.currentTarget.textContent.trim();
    if (t === 'Select') navSelect();
    else if (t === 'Next' || t === 'Send') navNext();
  });

  document.querySelectorAll('.key[data-k]').forEach(btn => {
    btn.addEventListener('click', e => {
      const k = e.currentTarget.dataset.k;
      press(e.currentTarget);
      if (k === 'end')  { navBack(); return; }
      if (k === 'call') {
        composeSet.has(S.screen) ? navNext() : navSelect();
        return;
      }
      handleKey(k);
    });
  });

  document.querySelectorAll('#main-menu .menu-item').forEach((el, i) => {
    el.addEventListener('click', () => { S.menuIdx = i; highlightMenu(); navSelect(); });
  });

  document.querySelectorAll('#settings-menu .menu-item').forEach((el, i) => {
    el.addEventListener('click', () => { S.settingsIdx = i; highlightSettings(); navSelect(); });
  });

  /* ── PHYSICAL KEYBOARD ───────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (document.activeElement === kbdProxy && S.inputMode === 'keyboard') return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        press(document.getElementById('btn-up'));
        navUp();
        break;
      case 'ArrowDown':
        e.preventDefault();
        press(document.getElementById('btn-down'));
        navDown();
        break;
      case 'Enter':
        e.preventDefault();
        press(document.getElementById('btn-ok'));
        composeSet.has(S.screen) ? navNext() : navSelect();
        break;
      case 'Escape':
      case 'Backspace':
        if (!composeSet.has(S.screen)) {
          e.preventDefault();
          press(lsoftBtn);
          navBack();
        }
        break;
      default:
        if (S.inputMode === 'keyboard' && composeSet.has(S.screen)) {
          kbdProxy.value = S.text;
          kbdProxy.focus();
        }
    }
  });

  /* ── BOOT SEQUENCE ───────────────────────────────────────────── */
  function runBoot() {
    const steps = [
      { t: 100,  fn: () => { lcdEl.classList.remove('off'); lcdEl.classList.add('lit'); } },
      { t: 280,  fn: () => { bootWord.style.opacity = '1'; } },
      { t: 600,  fn: () => { bootTag.style.opacity  = '1'; } },
      { t: 900,  fn: () => { bootProg.style.opacity = '1'; bootMsg.textContent = 'Initializing...'; } },
      { t: 1100, fn: () => { bootFill.style.width = '30%'; } },
      { t: 1400, fn: () => { bootFill.style.width = '55%'; bootMsg.textContent = 'Searching network...'; } },
      { t: 1700, fn: () => { bootFill.style.width = '80%'; tone(440, 0.08); } },
      { t: 1950, fn: () => { bootFill.style.width = '100%'; bootMsg.textContent = 'Connected!'; tone(660, 0.08); } },
      { t: 2300, fn: () => {
          vibrate();
          statusBar.style.display = 'flex';
          showScreen('home');
          highlightMenu();
          setSoftKeys('Menu', 'Select');
          sessionStorage.setItem('vr_booted', '1');
        }
      },
    ];
    steps.forEach(s => setTimeout(s.fn, s.t));
  }

  if (sessionStorage.getItem('vr_booted')) {
    lcdEl.classList.remove('off');
    lcdEl.classList.add('lit');
    statusBar.style.display = 'flex';
    setTimeout(() => {
      showScreen('home');
      highlightMenu();
      setSoftKeys('Menu', 'Select');
      resetBacklightTimer();
    }, 50);
  } else {
    runBoot();
  }

})();