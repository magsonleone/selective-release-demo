import { subtotal } from './cart.js';

/**
 * Computes the amounts shown on the receipt.
 */
export function checkout(cart) {
  const itemsTotal = subtotal(cart);

  return {
    items: cart.items,
    subtotal: itemsTotal,
    total: itemsTotal,
  };
}
