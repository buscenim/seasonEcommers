// Inicialización AOS y pequeños helpers accesibles
(() => {
  window.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
      AOS.init({ once: true, duration: 600, offset: 80 });
    }
  });
})();
