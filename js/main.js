
window.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[novalidate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    const input = document.getElementById('q');

    let feedback = document.getElementById('searchFeedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.id = 'searchFeedback';
      feedback.className = 'small text-secondary mt-2 d-none';
      feedback.setAttribute('aria-live', 'polite');
      searchForm.insertAdjacentElement('afterend', feedback);
    }

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = (input?.value || '').trim();

      if (!q) {
        feedback.textContent = 'Ingresá un texto para buscar.';
        feedback.classList.remove('d-none');
        return;
      }
      feedback.textContent = `Buscaste: "${q}"`;
      feedback.classList.remove('d-none');
    });
  }
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    const feedback = document.getElementById('newsletterFeedback');

    newsletterForm.addEventListener('submit', (e) => {
      if (!newsletterForm.checkValidity()) return;

      e.preventDefault();
      feedback.textContent = '¡Gracias por suscribirte! 💚';
      feedback.classList.remove('d-none');
      newsletterForm.reset();
      newsletterForm.classList.remove('was-validated');
    });
  }
});
