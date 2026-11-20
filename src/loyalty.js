export const POINTS_PER_DOLLAR = 2;

/**
 * Loyalty points earned on an order: 2 points per whole dollar of the total.
 */
export function pointsFor(total) {
  return Math.floor(total) * POINTS_PER_DOLLAR;
}
