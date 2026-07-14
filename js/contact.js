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
});