import { createProduct, getProductById, updateProduct } from "./api.js";
import { Product } from "./product.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.getElementById("form");

if (id) {
  const product = await getProductById(id);
  Object.entries(product).forEach(([key, value]) => {
    if (form[key]) form[key].value = value;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = new Product({
    id: id || Date.now().toString(),
    name: form.name.value,
    brand: form.brand.value,
    price: Number(form.price.value),
    image: form.image.value,
  });

  id ? await updateProduct(product) : await createProduct(product);
  window.location.href = "index.html";
});