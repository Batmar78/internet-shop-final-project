import { getProducts } from "./api.js";
import { formatPrice } from "./utils.js";

/* ---------- DOM ---------- */
const productsContainer = document.getElementById("products");
const nameFilterInput = document.getElementById("search");
const brandFilter = document.getElementById("brand-filter");
const sortSelect = document.getElementById("sort");
const totalEl = document.getElementById("total");

/* ---------- STATE ---------- */
let products = [];
let filteredProducts = [];

/* ---------- INIT ---------- */
async function init() {
  products = await getProducts();
  filteredProducts = [...products];

  initBrandFilter(products);
  applyFilters();
}

/* ---------- BRAND FILTER ---------- */
function initBrandFilter(items) {
  const brands = new Set(items.map((p) => p.brand));

  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}

/* ---------- FILTERS ---------- */
function applyFilters() {
  const nameValue = nameFilterInput.value.trim();
  const brandValue = brandFilter.value;

  const regex = new RegExp(nameValue, "i");

  filteredProducts = products.filter((product) => {
    const matchName = regex.test(product.name);
    const matchBrand = brandValue ? product.brand === brandValue : true;

    return matchName && matchBrand;
  });

  applySort();
}

/* ---------- SORT ---------- */
function applySort() {
  const value = sortSelect.value;

  if (value === "price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (value === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  renderProducts(filteredProducts);
}

/* ---------- RENDER ---------- */
function renderProducts(items) {
  productsContainer.innerHTML = "";

  let total = 0;

  if (!items.length) {
    productsContainer.innerHTML = "<p>Товари відсутні</p>";
    totalEl.textContent = "0";
    return;
  }

  items.forEach((product) => {
    total += product.price;

    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-card__image ${
        product.image ? "" : "product-card__image--empty"
      }">
        ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ""}
      </div>

      <div class="product-card__content">
        <h3 class="product-card__title">${product.name}</h3>
        <p class="product-card__brand">${product.brand}</p>
        <p class="product-card__price">
          ${formatPrice(product.price)} грн
        </p>
      </div>

      <div class="product-card__actions">
        <a href="edit.html?id=${product.id}" class="btn btn--primary">Редагувати</a>
        <a href="delete.html?id=${product.id}" class="btn btn--danger">Видалити</a>
      </div>
    `;

    productsContainer.appendChild(card);
  });

  totalEl.textContent = formatPrice(total);
}

/* ---------- EVENTS ---------- */
nameFilterInput.addEventListener("input", applyFilters);
brandFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applySort);

init();