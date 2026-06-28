/* ============================================================
   train.js — Train assembly & layer references (Milestone 2)
   ============================================================
   Responsibilities:
     - Caches every train layer DOM element
     - Exposes them on window.STATION.train
     - Provides helper methods that animations.js calls
       (setHeadlights, setMotionBlur, setBrakeSparks, etc.)
     - Does NOT run any animation sequences itself

   animations.js imports nothing from here directly;
   it uses window.STATION.train.* which this file populates.
   ============================================================ */

(function () {
  'use strict';

  /* ── Wait for STATION bootstrap ─────────────────────── */
  window.STATION.ready(function () {

    const trainEl = window.STATION.els.train;

    if (!trainEl) {
      console.warn('[TRAIN] #train element not found.');
      return;
    }

    /* ── LAYER REFS ──────────────────────────────────── */
    const layers = {
      base:             document.getElementById('tl-base'),
      bogies:           document.getElementById('tl-bogies'),
      access1:          document.getElementById('tl-access-1'),
      access2:          document.getElementById('tl-access-2'),
      doorTrack:        document.getElementById('tl-door-track'),
      interior:         document.getElementById('tl-interior'),
      interiorLight:    document.getElementById('tl-interior-light'),
      windowGlass:      document.getElementById('tl-window-glass'),
      windowReflections:document.getElementById('tl-window-reflections'),
      windows:          document.getElementById('tl-windows'),
      windowFrame:      document.getElementById('tl-window-frame'),
      doorsLeft:        document.getElementById('tl-doors-left'),
      doorsRight:       document.getElementById('tl-doors-right'),
      warningDecals:    document.getElementById('tl-warning-decals'),
      carNumber:        document.getElementById('tl-car-number'),
      destination:      document.getElementById('tl-destination'),
      roof:             document.getElementById('tl-roof'),
      headlights:       document.getElementById('tl-headlights'),
      coupling:         document.getElementById('tl-coupling'),
      brakeSparks:      document.getElementById('tl-brake-sparks'),
      doorSteam:        document.getElementById('tl-door-steam'),
      motionBlur:       document.getElementById('tl-motion-blur'),
    };

    /* ── LAYER CONTROL API ───────────────────────────── */
    /*
      These methods are the only way animations.js should
      interact with train layers. Keeps styling concerns here.
    */

    /**
     * Headlights on/off.
     * @param {'approaching'|'stopped'|'off'} state
     */
    function setHeadlights(state) {
      const el = layers.headlights;
      el.classList.remove('is-approaching', 'is-stopped');
      if (state === 'approaching') el.classList.add('is-approaching');
      if (state === 'stopped')     el.classList.add('is-stopped');
    }

    /**
     * Motion blur — call with true while train is moving.
     * @param {boolean} active
     */
    function setMotionBlur(active) {
      layers.motionBlur.classList.toggle('is-moving', active);
    }

    /**
     * Brake sparks — fires briefly, auto-clears after duration.
     * @param {number} [duration=300] ms
     */
    function flashBrakeSparks(duration) {
      duration = duration || 300;
      layers.brakeSparks.classList.add('is-sparking');
      setTimeout(function () {
        layers.brakeSparks.classList.remove('is-sparking');
      }, duration);
    }

    /**
     * Interior lights — call after train has fully stopped.
     */
    function illuminateInterior() {
      layers.interiorLight.classList.add('is-lit');
    }

    /**
     * Destination sign glow — call after train stops.
     */
    function illuminateDestination() {
      layers.destination.classList.add('is-lit');
    }

    /**
     * Bogie brake vibration — adds CSS animation class, cleans up.
     */
    function vibrateBogies() {
      const el = layers.bogies;
      el.classList.add('bogies--braking');
      el.addEventListener('animationend', function handler() {
        el.classList.remove('bogies--braking');
        el.removeEventListener('animationend', handler);
      });
    }

    /**
     * Coupling mechanical bounce — plays once.
     */
    function bounceCoupling() {
      const el = layers.coupling;
      el.classList.add('coupling--bouncing');
      el.addEventListener('animationend', function handler() {
        el.classList.remove('coupling--bouncing');
        el.removeEventListener('animationend', handler);
      });
    }

    /**
     * Settle animation on the whole train element.
     * Temporarily overrides transform, then restores.
     */
    function settleBody() {
      const el = window.STATION.els.train;
      el.classList.add('train--settling');
      el.addEventListener('animationend', function handler() {
        el.classList.remove('train--settling');
        el.removeEventListener('animationend', handler);
      });
    }

    /**
     * Window reflection shift while moving.
     * Pass 0 to reset once stopped.
     * @param {number} px  horizontal offset in pixels
     */
    function shiftWindowReflections(px) {
      layers.windowReflections.style.transform =
        px !== 0 ? 'translate3d(' + px + 'px, 0, 0)' : '';
    }

    /* ── EXPOSE ON STATION ───────────────────────────── */
    window.STATION.train = {
      el: trainEl,
      layers,
      setHeadlights,
      setMotionBlur,
      flashBrakeSparks,
      illuminateInterior,
      illuminateDestination,
      vibrateBogies,
      bounceCoupling,
      settleBody,
      shiftWindowReflections,
    };

    console.log('[TRAIN] Layers registered, API ready.');
  });

})();