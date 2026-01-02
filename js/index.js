import { getProducts } from "./api.js";

const container = document.getElementById("products");
const totalEl = document.getElementById("total");
let products = [];

async function render(items) {
  container.innerHTML = "";
  let total = 0;

  items.forEach((p) => {
    total += p.price;

    const card = document.createElement("div");
    card.className = "product-card";
    const imageBlock = p.image ? `<img src="${p.image}" alt="${p.name}">` : "";
    card.innerHTML = `
  <div class="product-card__image ${
    p.image ? "" : "product-card__image--empty"
  }">
    ${imageBlock}
  </div>

  <div class="product-card__content">
    <h3 class="product-card__title">${p.name}</h3>
    <p class="product-card__brand">${p.brand}</p>
    <p class="product-card__price">${p.price} грн</p>
  </div>

  <div class="product-card__actions">
    <a href="edit.html?id=${p.id}" class="btn btn--primary">Редагувати</a>
    <a href="delete.html?id=${p.id}" class="btn btn--danger">Видалити</a>
  </div>
`;
    container.appendChild(card);
  });

  totalEl.textContent = total;
}

document.getElementById("search").addEventListener("input", (e) => {
  const regex = new RegExp(e.target.value, "i");
  render(products.filter((p) => regex.test(p.name)));
});

document.getElementById("sort").addEventListener("change", (e) => {
  if (e.target.value === "price") {
    products.sort((a, b) => a.price - b.price);
  }
  if (e.target.value === "name") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }
  render(products);
});

(async function init() {
  products = await getProducts();
  render(products);
})();
