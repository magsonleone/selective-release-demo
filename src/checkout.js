import { subtotal } from './cart.js';
import { computeTax } from './tax.js';

/**
 * Computes the amounts shown on the receipt.
 * Options: `taxRate` (fraction, e.g. 0.08 for 8%).
 */
export function checkout(cart, { taxRate = 0 } = {}) {
  const itemsTotal = subtotal(cart);
  const tax = computeTax(itemsTotal, taxRate);

  return {
    items: cart.items,
    subtotal: itemsTotal,
    taxRate,
    tax,
    total: itemsTotal + tax,
  };
}
