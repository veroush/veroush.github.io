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
});