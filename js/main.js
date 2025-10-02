// Inicializaciones
window.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ once: true, offset: 80 });

  // Validación Bootstrap estilo
  const forms = document.querySelectorAll('form[novalidate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault(); e.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Búsqueda simple (demo)
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('q').value.trim();
      if (q) alert(`Buscando: ${q}`);
    });
  }

  // Filtros en listados
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.filter;
      const grid = document.querySelector('#gridMujer, #gridHombre');
      const items = document.querySelectorAll('[data-category]');
      items.forEach(el => {
        el.classList.remove('d-none');
        if (group !== 'todo' && el.dataset.category !== group) el.classList.add('d-none');
      });
    });
  });
});
