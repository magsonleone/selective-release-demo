/**
 * Creates a cart from a list of items.
 * Each item has a `sku`, a `name`, a unit `price` and an optional `quantity` (default 1).
 */
export function createCart(items = []) {
  return { items: items.map(normalizeItem) };
}

/**
 * Price of one cart line: unit price times quantity.
 */
export function lineTotal(item) {
  return item.price * item.quantity;
}

/**
 * Sum of all cart lines.
 */
export function subtotal(cart) {
  return cart.items.reduce((sum, item) => sum + lineTotal(item), 0);
}

function normalizeItem({ sku, name, price, quantity = 1 }) {
  if (!Number.isFinite(price) || price < 0) {
    throw new RangeError(`Invalid price for ${sku}: ${price}`);
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError(`Invalid quantity for ${sku}: ${quantity}`);
  }

  return { sku, name, price, quantity };
}
