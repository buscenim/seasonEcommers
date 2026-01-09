// filtros
(() => {
  function initFilters() {
    const buttons = document.querySelectorAll('.filter');
    if (!buttons.length) return;

    const container = document.querySelector('[data-filter-container]');
    if (!container) return;

    const cards = container.querySelectorAll('[data-category]');
    if (!cards.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');

        const f = btn.dataset.filter;

        cards.forEach(card => {
          const show = (f === 'todo') || (card.dataset.category === f);
          card.classList.toggle('d-none', !show);
        });
      });
    });
  }

  window.addEventListener('DOMContentLoaded', initFilters);
})();