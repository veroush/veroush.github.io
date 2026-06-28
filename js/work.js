/* ============================================================
   work.js — Station bootstrap (updated for Milestone 2)
   ============================================================
   Responsibilities:
     - Sets up window.STATION namespace
     - Exposes all shared DOM refs
     - Calls train.js (build) then animations.js (run) via the
       STATION.ready() hook after DOMContentLoaded

   Do NOT put train or animation logic here.
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM REFS ─────────────────────────────────────────── */
  const station        = document.getElementById('station');
  const trainContainer = document.getElementById('train-container');
  const train          = document.getElementById('train');
  const uiContainer    = document.getElementById('ui-container');
  const fxContainer    = document.getElementById('fx-container');
  const dotNav         = document.getElementById('dot-nav');
  const mobileNav      = document.getElementById('mobile-nav');

  /* ── STATION NAMESPACE ───────────────────────────────── */
  window.STATION = {
    els: {
      station,
      trainContainer,
      train,
      uiContainer,
      fxContainer,
      dotNav,
      mobileNav,
    },

    // Lifecycle hooks — train.js and animations.js attach to these
    _readyCallbacks: [],
    ready(fn) {
      this._readyCallbacks.push(fn);
    },
    _fireReady() {
      this._readyCallbacks.forEach(fn => fn());
    },

    // State shared between modules
    state: {
      arrived: false,
      doorsOpen: false,      // Milestone 3
      currentProject: null,  // Milestone 3
    },
  };

  /* ── INIT ─────────────────────────────────────────────── */
  function init() {
    console.log('[STATION] Bootstrap — firing ready callbacks.');
    window.STATION._fireReady();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();