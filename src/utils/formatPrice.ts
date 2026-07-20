/**
 * Formatea un número como precio en ARS (peso argentino).
 * Ej: 1234.56 → "$ 1.234,56"
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Formato USD simple.
 * Ej: 1234.56 → "$1,234.56"
 */
export function formatUSD(price: number): string {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}
