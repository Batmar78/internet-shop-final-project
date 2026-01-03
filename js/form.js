import {
  createProduct,
  getProductById,
  updateProduct,
} from "./api.js";
import { Product } from "./product.js";
import {
  capitalizeFirstLetter,
  validatePrice,
} from "./utils.js";

const form = document.getElementById("form");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

/* ---------- EDIT MODE ---------- */
if (id) {
  const product = await getProductById(id);

  if (product) {
    form.name.value = product.name;
    form.brand.value = product.brand;
    form.price.value = product.price;
    form.image.value = product.image || "";
  }
}

/* ---------- SUBMIT ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const price = validatePrice(form.price.value);

    const product = new Product({
      id: id || Date.now().toString(),
      name: capitalizeFirstLetter(form.name.value),
      brand: capitalizeFirstLetter(form.brand.value),
      price,
      image: form.image.value.trim() || null,
    });

    id ? await updateProduct(product) : await createProduct(product);
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});