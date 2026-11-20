/**
 * Sales tax for an amount, rounded to cents. `rate` is a fraction: 0.08 means 8%.
 */
export function computeTax(amount, rate = 0) {
  if (!Number.isFinite(rate) || rate < 0 || rate > 1) {
    throw new RangeError(`Invalid tax rate: ${rate}`);
  }

  return Math.round(amount * rate * 100) / 100;
}
