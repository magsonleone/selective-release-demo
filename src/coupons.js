const COUPONS = {
  SAVE10: { type: 'percent', value: 10 },
  WELCOME5: { type: 'fixed', value: 5 },
};

/**
 * Discount given by a coupon code on an amount. No code means no discount.
 * The discount is rounded to cents and never exceeds the amount.
 */
export function discountFor(code, amount) {
  if (!code) {
    return 0;
  }

  const coupon = COUPONS[code.toUpperCase()];

  if (!coupon) {
    throw new Error(`Unknown coupon: ${code}`);
  }

  const discount = coupon.type === 'percent' ? Math.round(amount * coupon.value) / 100 : coupon.value;
  return Math.min(discount, amount);
}
