import { deleteProduct } from "./api.js";

const id = new URLSearchParams(window.location.search).get("id");

document.getElementById("yes").addEventListener("click", async () => {
  await deleteProduct(id);
  window.location.href = "index.html";
});