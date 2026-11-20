export const STANDARD_SHIPPING = 7.99;
export const FREE_SHIPPING_THRESHOLD = 50;

/**
 * Shipping cost for an amount (after discounts): free from $50, $7.99 below that.
 */
export function shippingFor(amount) {
  return amount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}

/**
 * How much more the customer has to buy to get free shipping.
 */
export function amountToFreeShipping(amount) {
  return Math.max(0, Math.round((FREE_SHIPPING_THRESHOLD - amount) * 100) / 100);
}
