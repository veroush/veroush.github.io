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
  // --- Beat detection setup ---
  let audioCtx, analyser, dataArray, source;
  let beatDetectionActive = false;
  let energyHistory = [];
  let lastBeatTime = 0;
  let shuffleStep = 0;
  const shufflePositions = ['up', 'down', 'left', 'right', 'center'];

  function setupAudioAnalyser() {
    if (audioCtx) return; // only set up once
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    source = audioCtx.createMediaElementSource(typewriterAudio);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  }

  function detectBeat() {
    if (!beatDetectionActive) return;

    analyser.getByteFrequencyData(dataArray);

    // Typewriter clacks/bell are sharp transients in the higher end —
    // sample a higher bin range instead of the low melodic content
    const clackEnergy = dataArray.slice(40, 90).reduce((sum, val) => sum + val, 0);

    const avgEnergy = energyHistory.length > 0
      ? energyHistory.reduce((a, b) => a + b, 0) / energyHistory.length
      : clackEnergy;

    console.log('clack:', clackEnergy.toFixed(1), 'avg:', avgEnergy.toFixed(1));

    const now = performance.now();

    if (clackEnergy > avgEnergy * 1.3 && clackEnergy > 30 && now - lastBeatTime > 150) {
      onBeat();
      lastBeatTime = now;
    }

   energyHistory.push(clackEnergy);
   if (energyHistory.length > 8) energyHistory.shift();

   requestAnimationFrame(detectBeat);
  }

  function onBeat() {
    // remove any previous position class, add the next one in sequence
    shufflePositions.forEach(pos => typewriterImg.classList.remove(`is-shuffle-${pos}`));
    typewriterImg.classList.add(`is-shuffle-${shufflePositions[shuffleStep]}`);
    shuffleStep = (shuffleStep + 1) % shufflePositions.length;
  }

    typewriterImg.addEventListener('click', () => {
        setupAudioAnalyser();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        if (typewriterAudio.paused) {
          typewriterAudio.play();
        } else {
          typewriterAudio.pause();
          typewriterAudio.currentTime = 0;
          shuffleStep = 0;
        }
      });

    // Sync the animations to actual play/pause state, not just clicks
    typewriterAudio.addEventListener('play', () => {
      if (florkImg) florkImg.classList.add('is-bopping');
      beatDetectionActive = true;
      detectBeat();
    });

    typewriterAudio.addEventListener('pause', () => {
      beatDetectionActive = false;
      typewriterImg.classList.remove('is-shuffle-up', 'is-shuffle-down', 'is-shuffle-left', 'is-shuffle-right', 'is-shuffle-center');
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