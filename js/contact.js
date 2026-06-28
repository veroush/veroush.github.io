/* ============================================================
   CONTACT PAGE — Form validation
   ============================================================ */

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  if (!field || !error) return;
  field.classList.add('field--error');
  field.setAttribute('aria-invalid', 'true');
  error.textContent = message;
  error.classList.add('visible');
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  if (!field || !error) return;
  field.classList.remove('field--error');
  field.setAttribute('aria-invalid', 'false');
  error.classList.remove('visible');
}

function clearAllErrors() {
  ['name', 'email', 'subject', 'message'].forEach(clearError);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (!form) return;

  ['name', 'email', 'subject', 'message'].forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('input', () => clearError(id));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearAllErrors();

    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    let valid = true;

    if (!name) {
      setError('name', 'Please enter your name.');
      valid = false;
    }
    if (!email) {
      setError('email', 'Please enter your email address.');
      valid = false;
    } else if (!validateEmail(email)) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!subject) {
      setError('subject', 'Please enter a subject.');
      valid = false;
    }
    if (!message) {
      setError('message', 'Please enter your message.');
      valid = false;
    }

    if (!valid) return;

    const btn = form.querySelector('.form-submit');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }

    setTimeout(() => {
      form.reset();
      if (success) success.classList.add('visible');
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Send Message →';
      }
      success?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
  });
});
