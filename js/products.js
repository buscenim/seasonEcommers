let allProducts = [];

async function loadProducts(gender, gridId) {
  const response = await fetch("../data/products.json");
  allProducts = await response.json();

  const filtered = allProducts.filter(
    product => product.gender === gender
  );

  renderProducts(filtered, gridId);
}

function renderProducts(products, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = `
    <p class="text-secondary mb-4">
      Explorá nuestra selección de prendas únicas, sostenibles y curadas con amor.
    </p>
  `;

  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";
    col.dataset.category = product.category;
    col.dataset.aos = "fade-up";

    col.innerHTML = `
      <article class="card product-card h-100"
        data-id="${product.id}"
        data-name="${product.name}"
        data-price="${product.price}"
        data-img="${product.image}">
        <img src="${product.image}" class="card-img-top"
          alt="${product.name}" loading="lazy" width="300" height="400">
        <div class="card-body py-3">
          <h3 class="card-title fs-6 mb-1">${product.name}</h3>
          <p class="card-text small text-secondary m-0">
            $ ${product.price.toLocaleString()}
          </p>
          <button class="btn btn-primary btn-sm mt-2 w-100 btn-add-to-cart">
            Agregar
          </button>
        </div>
      </article>
    `;

    grid.appendChild(col);
  });

  if (window.AOS) {
    AOS.refresh();
  }

  initFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("gridMujer")) {
    loadProducts("women", "gridMujer");
  }

  if (document.getElementById("gridHombre")) {
    loadProducts("men", "gridHombre");
  }
});