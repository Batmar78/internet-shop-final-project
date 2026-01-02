const STORAGE_KEY = "products_db";

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts() {
  await delay();
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export async function getProductById(id) {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function createProduct(product) {
  const products = await getProducts();
  products.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export async function updateProduct(updatedProduct) {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === updatedProduct.id);
  products[index] = updatedProduct;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export async function deleteProduct(id) {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}