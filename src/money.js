const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/**
 * Formats an amount as US dollars: 1234.5 -> "$1,234.50", -5 -> "-$5.00".
 */
export function formatMoney(amount) {
  return usd.format(amount);
}
