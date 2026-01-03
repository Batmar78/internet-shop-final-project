import { deleteProduct, getProductById } from "./api.js";

const id = new URLSearchParams(window.location.search).get("id");
const infoContainer = document.getElementById("product-info");

const product = await getProductById(id);

if (product) {
  infoContainer.innerHTML = `
    <p><strong>Назва:</strong> ${product.name}</p>
    <p><strong>Бренд:</strong> ${product.brand}</p>
    <p><strong>Ціна:</strong> ${product.price} грн</p>
  `;
}

document.getElementById("confirm").addEventListener("click", async () => {
  await deleteProduct(id);
  window.location.href = "index.html";
});