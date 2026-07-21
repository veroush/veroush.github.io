document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('message');
  const fakeCaret = document.getElementById('fake-caret');

  if (!textarea || !fakeCaret) return;

  function showFakeCaret() {
    fakeCaret.classList.add('is-visible');
    textarea.style.caretColor = 'transparent';
  }

  function hideFakeCaret() {
    fakeCaret.classList.remove('is-visible');
    textarea.style.caretColor = '#333';
  }

  // Focus: show fake caret only if the box is still empty
  textarea.addEventListener('focus', () => {
    textarea.value.length === 0 ? showFakeCaret() : hideFakeCaret();
  });

  // Typing: switch to real caret as soon as there's content,
  // fall back to fake caret if the box gets cleared
  textarea.addEventListener('input', () => {
    textarea.value.length === 0 ? showFakeCaret() : hideFakeCaret();
  });

  // Blur: always hide the fake caret, box is no longer active
  textarea.addEventListener('blur', () => {
    fakeCaret.classList.remove('is-visible');
  });

  // Submit arrow — appears once the user starts typing
  const submitArrow = document.getElementById('submit-arrow');
  const submitBtn = document.getElementById('submit-btn');
  const fromNameInput = document.getElementById('from-name');
  const contactCard = document.querySelector('.contact-card');
  const sentConfirmation = document.getElementById('sent-confirmation');
  const sentText = document.getElementById('sent-text');

  textarea.addEventListener('input', () => {
    if (textarea.value.trim().length > 0) {
      submitArrow.classList.add('is-visible');
    } else {
      submitArrow.classList.remove('is-visible');
    }
  });

  submitBtn.addEventListener('click', async () => {
    const name = fromNameInput.value.trim() || 'friend';
    const message = textarea.value.trim();

    if (message.length === 0) return; // safety check, shouldn't happen since arrow is hidden until typing starts

    try {
      const response = await fetch('https://formspree.io/f/mojgvpld', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(document.querySelector('.contact-card__form'))
      });

      if (response.ok) {
        sentText.textContent = `Thank you for your message, ${name}!`;
        contactCard.style.display = 'none';
        sentConfirmation.classList.add('is-visible');
      } else {
        alert('Something went wrong sending your message — please try again or email me directly.');
      }
    } catch (error) {
      alert('Something went wrong sending your message — please try again or email me directly.');
    }
  });

  // Typewriter — click to play/stop (resets on explicit stop), pauses without resetting on tab/focus loss
  const typewriterImg = document.getElementById('typewriter-img');
  const typewriterAudio = document.getElementById('typewriter-audio');
  const florkImg = document.querySelector('.contact-typewriter__flork');

  if (typewriterImg && typewriterAudio) {

    // --- Manual beat schedule ---
    // Each entry: { time: seconds into the song, x: px left/right, y: px up/down }
    // Fill this in by ear to match the song's irregular rhythm.
    // Positive x = right, negative x = left. Positive y = down, negative y = up.
    const beatSchedule = [
      { time: 0.8, x: -6, y: 0 },
      { time: 1.6, x: 6, y: 0 },
      { time: 2.1, x: 0, y: -8 },
      { time: 3.4, x: 0, y: 8 },
      { time: 3.9, x: -6, y: -8 },
      // add as many entries as you want, kept in ascending time order
    ];

    let nextBeatIndex = 0;

    function checkSchedule() {
      if (typewriterAudio.paused) return;

      const t = typewriterAudio.currentTime;
      const next = beatSchedule[nextBeatIndex];

      if (next && t >= next.time) {
        typewriterImg.style.transform = `translate(${next.x}px, ${next.y}px)`;
        nextBeatIndex++;
      }

      requestAnimationFrame(checkSchedule);
    }

    typewriterImg.addEventListener('click', () => {
      if (typewriterAudio.paused) {
        typewriterAudio.play();
      } else {
        typewriterAudio.pause();
        typewriterAudio.currentTime = 0;
        nextBeatIndex = 0;
      }
    });

    // Sync the animations to actual play/pause state, not just clicks
    typewriterAudio.addEventListener('play', () => {
      if (florkImg) florkImg.classList.add('is-bopping');
      checkSchedule();
    });

    typewriterAudio.addEventListener('pause', () => {
      typewriterImg.style.transform = '';
      nextBeatIndex = 0;
      if (florkImg) florkImg.classList.remove('is-bopping');
    });

    // Just pause (keep position) when the tab/window loses focus —
    // clicking the image again resumes from where it left off
    const pauseOnLeave = () => {
      typewriterAudio.pause();
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pauseOnLeave();
    });

    window.addEventListener('blur', pauseOnLeave);
  }
});