(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      const website = document.getElementById('website');
      if (website && website.value) {
        e.preventDefault();
      }
    }, false);
  });
})();