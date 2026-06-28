/* ============================================================
   animations.js — Train arrival sequence (Milestone 2)
   ============================================================
   Responsibilities:
     - Runs the single cinematic arrival sequence on page load
     - Uses the Web Animations API for the main train translate
     - Calls window.STATION.train.* helpers for layer effects
     - Marks STATION.state.arrived = true when complete
     - Stops at closed doors — Milestone 3 opens them

   Timeline (wall-clock from page load):
     T+0ms    Page ready, train off-screen left
     T+600ms  Headlights fade in
     T+700ms  Motion blur appears, train begins moving
     T+700ms–2300ms  Train travels across viewport
                     (cubic-bezier: fast entry, heavy deceleration)
     T+1900ms Window reflections settle (mid-decel)
     T+2000ms Brake sparks flash (300ms)
     T+2000ms Bogie vibration starts
     T+2300ms Train body reaches center — Web Animation ends
     T+2300ms Coupling bounce plays
     T+2350ms Settle animation on train body
     T+2400ms Motion blur cleared
     T+2700ms 400ms silence — nothing happens
     T+3100ms Interior lights fade in
     T+3200ms Destination sign glows
     T+3200ms STATION.state.arrived = true
              Milestone 3 may now open doors
   ============================================================ */

(function () {
  'use strict';

  /* ── Timing constants (ms) — tweak here if needed ─────── */
  var T = {
    START_DELAY:          600,   // delay before anything moves
    HEADLIGHTS_ON:        600,   // when headlights appear
    MOTION_BLUR_ON:       700,   // when blur starts
    TRAVEL_DURATION:     1600,   // total train translate duration
    TRAVEL_START:         700,   // when translation begins
    BRAKE_START:         2000,   // when sparks + bogie shudder start
    TRAVEL_END:          2300,   // when train reaches center
    COUPLING_BOUNCE:     2300,
    SETTLE:              2350,
    BLUR_OFF:            2400,
    SILENCE_END:         2700,   // 400ms pause after stop
    INTERIOR_LIGHTS:     3100,
    DESTINATION_GLOW:    3200,
    ARRIVED:             3200,
  };

  /* ── Utility: promise-based delay ─────────────────────── */
  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  /* ── Utility: schedule callback at absolute T offset ──── */
  function at(ms, fn) {
    setTimeout(fn, ms);
  }

  /* ── Main sequence ────────────────────────────────────── */
  function runArrivalSequence() {
    var S   = window.STATION;
    var T$  = S.train;        // train API from train.js
    var el  = S.els.train;    // the .train DOM element

    if (!T$) {
      console.warn('[ANIM] STATION.train not ready — did train.js load?');
      return;
    }

    /* ──────────────────────────────────────────────────────
       STEP 1: Headlights fade in before movement
    ────────────────────────────────────────────────────── */
    at(T.HEADLIGHTS_ON, function () {
      T$.setHeadlights('approaching');
      console.log('[ANIM] Headlights on.');
    });

    /* ──────────────────────────────────────────────────────
       STEP 2: Motion blur appears
    ────────────────────────────────────────────────────── */
    at(T.MOTION_BLUR_ON, function () {
      T$.setMotionBlur(true);
      // Shift window reflections while moving
      T$.shiftWindowReflections(8);
      console.log('[ANIM] Motion blur on, train starting.');
    });

    /* ──────────────────────────────────────────────────────
       STEP 3 + 4: Train translate — off-screen left → center
       Uses Web Animations API for fine cubic-bezier control.

       Easing breakdown:
         - First ~60%: near-linear fast entry (train already at speed)
         - Last ~40%: heavy deceleration (cubic ease-out with overshoot feel)
       We achieve this with a single cubic-bezier that has a low
       p1x so the curve is nearly linear early, then steepens late.
       cubic-bezier(0.12, 0, 0.22, 1) — aggressive ease-out.
    ────────────────────────────────────────────────────── */
    at(T.TRAVEL_START, function () {
      /*
        Starting translateX is whatever CSS set (far left).
        Ending translateX is 0 (centered — train-container uses
        justify-content:center so 0 = centered in container).
      */
      var startX = 'calc(-50vw - var(--train-width, 1100px))';
      var endX   = '0px';

      var anim = el.animate(
        [
          { transform: 'translate3d(' + startX + ', 0, 0)' },
          { transform: 'translate3d(' + endX   + ', 0, 0)' },
        ],
        {
          duration:   T.TRAVEL_DURATION,
          easing:     'cubic-bezier(0.12, 0, 0.22, 1)',
          fill:       'forwards',
        }
      );

      anim.onfinish = function () {
        /*
          Lock the element at final position via inline style
          so removing the fill:'forwards' animation doesn't snap.
        */
        el.style.transform = 'translate3d(0, 0, 0)';
        console.log('[ANIM] Train reached center.');
      };
    });

    /* ──────────────────────────────────────────────────────
       STEP 4a: Brake effects — sparks + bogie shudder
    ────────────────────────────────────────────────────── */
    at(T.BRAKE_START, function () {
      T$.flashBrakeSparks(300);
      T$.vibrateBogies();
      // Motion blur starts fading (CSS transition handles it
      // as we remove the class a bit later at BLUR_OFF)
      console.log('[ANIM] Braking — sparks + bogie vibration.');
    });

    /* ──────────────────────────────────────────────────────
       STEP 4b: Window reflections settle mid-deceleration
    ────────────────────────────────────────────────────── */
    at(T.BRAKE_START - 100, function () {
      T$.shiftWindowReflections(0);
    });

    /* ──────────────────────────────────────────────────────
       STEP 5: Train at center — coupling bounce
    ────────────────────────────────────────────────────── */
    at(T.COUPLING_BOUNCE, function () {
      T$.bounceCoupling();
      console.log('[ANIM] Coupling bounce.');
    });

    /* ──────────────────────────────────────────────────────
       STEP 6: Body settle — tiny suspension drop
    ────────────────────────────────────────────────────── */
    at(T.SETTLE, function () {
      T$.settleBody();
      console.log('[ANIM] Body settle.');
    });

    /* ──────────────────────────────────────────────────────
       STEP 6b: Clear motion blur
    ────────────────────────────────────────────────────── */
    at(T.BLUR_OFF, function () {
      T$.setMotionBlur(false);
      // Headlights dim slightly now that the train is stopped
      T$.setHeadlights('stopped');
      console.log('[ANIM] Motion blur cleared, headlights dimmed.');
    });

    /* ──────────────────────────────────────────────────────
       STEP 7: 400ms silence — nothing happens.
       The station is quiet. The train simply exists.
       (T.SILENCE_END = T.BLUR_OFF + 300 ≈ T.TRAVEL_END + 400)
    ────────────────────────────────────────────────────── */

    /* ──────────────────────────────────────────────────────
       STEP 8: Interior lights fade in
    ────────────────────────────────────────────────────── */
    at(T.INTERIOR_LIGHTS, function () {
      T$.illuminateInterior();
      console.log('[ANIM] Interior lights on.');
    });

    /* ──────────────────────────────────────────────────────
       STEP 9: Destination sign glows
    ────────────────────────────────────────────────────── */
    at(T.DESTINATION_GLOW, function () {
      T$.illuminateDestination();
    });

    /* ──────────────────────────────────────────────────────
       STEP 10: Mark sequence complete
       Milestone 3 watches this flag to know it can open doors.
    ────────────────────────────────────────────────────── */
    at(T.ARRIVED, function () {
      window.STATION.state.arrived = true;
      console.log('[ANIM] Arrival sequence complete. Awaiting Milestone 3.');
    });
  }

  /* ── Reduced-motion: skip to final state immediately ──── */
  function runInstantArrive() {
    var S  = window.STATION;
    var T$ = S.train;
    var el = S.els.train;

    if (!T$) return;

    el.style.transform = 'translate3d(0, 0, 0)';
    T$.setHeadlights('stopped');
    T$.illuminateInterior();
    T$.illuminateDestination();
    S.state.arrived = true;
    console.log('[ANIM] Reduced motion — instant arrival.');
  }

  /* ── Boot ─────────────────────────────────────────────── */
  window.STATION.ready(function () {
    /*
      train.js also uses STATION.ready(). Script load order is:
        work.js → train.js → animations.js
      So by the time animations.js fires its ready callback,
      train.js has already registered STATION.train.
      We add a single rAF to be safe.
    */
    requestAnimationFrame(function () {
      var prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        runInstantArrive();
      } else {
        runArrivalSequence();
      }
    });
  });

})();