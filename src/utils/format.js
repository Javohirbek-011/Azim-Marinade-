export function formatPrice(amount) {
  return `${amount.toLocaleString('uz-UZ')} so'm`
}

export function parsePrice(priceStr) {
  return parseInt(String(priceStr).replace(/\D/g, ''), 10) || 0
}
