import { subtotal } from './cart.js';
import { discountFor } from './coupons.js';
import { computeTax } from './tax.js';

/**
 * Computes the amounts shown on the receipt.
 * Options: `taxRate` (fraction, e.g. 0.08 for 8%) and `coupon` (code, e.g. "SAVE10").
 */
export function checkout(cart, { taxRate = 0, coupon } = {}) {
  const itemsTotal = subtotal(cart);
  const discount = discountFor(coupon, itemsTotal);
  const taxable = itemsTotal - discount;
  const tax = computeTax(taxable, taxRate);

  return {
    items: cart.items,
    subtotal: itemsTotal,
    coupon,
    discount,
    taxRate,
    tax,
    total: taxable + tax,
  };
}
