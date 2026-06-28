/* ============================================================
   WORK PAGE — Milestone 1: Station Init
   ============================================================
   Minimal JavaScript. No train logic, no project switching,
   no scroll handlers. This file only:
     1. Confirms the station DOM is ready.
     2. Exposes a STATION object for Milestones 2–4 to attach to.
     3. Stubs out the containers that later milestones will populate.

   Do NOT add animation or project logic here until Milestone 2.
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM REFS ─────────────────────────────────────────── */
  const station        = document.getElementById('station');
  const trainContainer = document.getElementById('train-container');
  const uiContainer    = document.getElementById('ui-container');
  const fxContainer    = document.getElementById('fx-container');
  const dotNav         = document.getElementById('dot-nav');
  const mobileNav      = document.getElementById('mobile-nav');

  /* ── STATION NAMESPACE ───────────────────────────────── */
  // Attach to window so Milestone 2+ scripts can extend without
  // re-querying the DOM or duplicating references.
  window.STATION = {
    els: {
      station,
      trainContainer,
      uiContainer,
      fxContainer,
      dotNav,
      mobileNav,
    },
  };

  /* ── INIT ────────────────────────────────────────────── */
  function init() {
    // Milestone 1: nothing to animate. Station environment is
    // entirely CSS-driven. We just log readiness.
    console.log('[STATION] Milestone 1 — environment ready.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();