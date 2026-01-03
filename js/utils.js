/* ---------- CAPITALIZE FIRST LETTER ---------- */
export function capitalizeFirstLetter(value) {
  if (!value) return "";

  const normalized = value.trim().toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

/* ---------- VALIDATION ---------- */
export function validatePrice(value) {
  const price = Number(value);

  if (Number.isNaN(price)) {
    throw new Error("Ціна повинна бути числом");
  }

  if (price <= 0) {
    throw new Error("Ціна повинна бути більшою за 0");
  }

  return price;
}

/* ---------- FORMAT PRICE ---------- */
export function formatPrice(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}