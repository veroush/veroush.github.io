/* ============================================================
   WORK PAGE — Project card interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feature-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform, box-shadow';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = 'auto';
    });
  });
});
