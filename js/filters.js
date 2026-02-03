function initFilters() {
  const filterButtons = document.querySelectorAll(".filter");
  const productCards = document.querySelectorAll("[data-category]");

  if (!filterButtons.length || !productCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn =>
        btn.setAttribute("aria-pressed", "false")
      );
      button.setAttribute("aria-pressed", "true");

      productCards.forEach(card => {
        if (filter === "todo" || card.dataset.category === filter) {
          card.classList.remove("d-none");
        } else {
          card.classList.add("d-none");
        }
      });
    });
  });
}