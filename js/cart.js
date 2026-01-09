// js/cart.js
(() => {
  const STORAGE_KEY = "season_cart_v1";

  const els = {
    badges: [],
    list: null,
    total: null,
    empty: null,
    clear: null,
    msg: null,
    offcanvas: null,
  };

  function moneyARS(value) {
    const n = Number(value) || 0;
    return "$ " + n.toLocaleString("es-AR");
  }

  function getCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function cartCount(cart) {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  }

  function cartTotal(cart) {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  function upsertItem(product) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.id === product.id);

    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({ ...product, qty: 1 });

    saveCart(cart);
    render();
  }

  function removeItem(id) {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    render();
  }

  function updateQty(id, qty) {
    const q = Math.max(1, Math.min(99, Number(qty) || 1));
    const cart = getCart().map(i => (i.id === id ? { ...i, qty: q } : i));
    saveCart(cart);
    render();
  }

  function clearCart() {
    saveCart([]);
    render();
  }

  function setMsg(text) {
    if (!els.msg) return;
    els.msg.textContent = text || "";
  }

  function renderBadges(count) {
    if (!els.badges.length) return;

    els.badges.forEach(badge => {
      badge.textContent = String(count);
      if (count > 0) badge.classList.remove("d-none");
      else badge.classList.add("d-none");
    });
  }

  function render() {
    const cart = getCart();

    const count = cartCount(cart);
    renderBadges(count);

    if (els.total) els.total.textContent = moneyARS(cartTotal(cart));

    if (!els.list || !els.empty) return;

    if (cart.length === 0) {
      els.empty.classList.remove("d-none");
      els.list.classList.add("d-none");
      els.list.innerHTML = "";
      setMsg("");
      return;
    }

    els.empty.classList.add("d-none");
    els.list.classList.remove("d-none");

    els.list.innerHTML = cart
      .map(
        (item) => `
        <li class="border border-secondary rounded p-2 mb-2">
          <div class="d-flex gap-2">
            <img src="${item.img}" alt="${item.name}" width="56" height="56" class="rounded" style="object-fit:cover;">
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between gap-2">
                <strong class="small">${item.name}</strong>
                <button class="btn btn-sm btn-outline-light btn-remove-item" data-id="${item.id}" type="button" aria-label="Eliminar">
                  <i class="fa-solid fa-trash" aria-hidden="true"></i>
                </button>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-2">
                <span class="text-secondary small">${moneyARS(item.price)}</span>

                <div class="d-flex align-items-center gap-2">
                  <label class="visually-hidden" for="qty-${item.id}">Cantidad</label>
                  <input id="qty-${item.id}" class="form-control form-control-sm cart-qty"
                         data-id="${item.id}" type="number" min="1" max="99"
                         value="${item.qty}" style="width:78px;">
                  <span class="small">${moneyARS(item.price * item.qty)}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      `
      )
      .join("");
  }

  function readProductFromCard(btn) {
    const card = btn.closest(".product-card");
    if (!card) return null;

    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const img = card.dataset.img;

    if (!id || !name || !Number.isFinite(price) || !img) return null;
    return { id, name, price, img };
  }

  function wireEvents() {
    document.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".btn-add-to-cart");
      if (addBtn) {
        const product = readProductFromCard(addBtn);
        if (!product) {
          setMsg("No se puede leer los datos del producto.");
          return;
        }
        upsertItem(product);
        setMsg("Producto agregado ✅");
        return;
      }

      const removeBtn = e.target.closest(".btn-remove-item");
      if (removeBtn) {
        removeItem(removeBtn.dataset.id);
        setMsg("Producto eliminado.");
      }
    });

    document.addEventListener("change", (e) => {
      const qtyInput = e.target.closest(".cart-qty");
      if (!qtyInput) return;
      updateQty(qtyInput.dataset.id, qtyInput.value);
      setMsg("Cantidad actualizada.");
    });

    if (els.clear) {
      els.clear.addEventListener("click", () => {
        clearCart();
        setMsg("Carrito vacío.");
      });
    }

    const checkout = document.getElementById("cartCheckout");
    if (checkout) {
      checkout.addEventListener("click", () => {
        const cart = getCart();
        if (cart.length === 0) {
          setMsg("Tu carrito está vacío.");
          return;
        }
        setMsg("Checkout: redirigiendo al pago.");
      });
    }
  }

  function init() {
    els.badges = Array.from(document.querySelectorAll(".cart-badge"));

    els.list = document.getElementById("cartList");
    els.total = document.getElementById("cartTotal");
    els.empty = document.getElementById("cartEmpty");
    els.clear = document.getElementById("cartClear");
    els.msg = document.getElementById("cartMsg");
    els.offcanvas = document.getElementById("cartOffcanvas");

    wireEvents();
    render();

    if (els.offcanvas) {
      els.offcanvas.addEventListener("show.bs.offcanvas", () => render());
    }
  }

  window.addEventListener("DOMContentLoaded", init);
})();