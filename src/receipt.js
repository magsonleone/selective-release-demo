import { lineTotal } from './cart.js';
import { formatMoney } from './money.js';

const WIDTH = 36;

/**
 * Renders a checkout summary as a plain-text receipt.
 */
export function renderReceipt(summary) {
  const lines = [];

  for (const item of summary.items) {
    lines.push(row(`${item.quantity} x ${item.name}`, formatMoney(lineTotal(item))));
  }

  lines.push(separator());
  lines.push(row('Subtotal', formatMoney(summary.subtotal)));

  if (summary.discount > 0) {
    lines.push(row(`Discount (${summary.coupon})`, formatMoney(-summary.discount)));
  }

  if (summary.taxRate > 0) {
    lines.push(row(`Tax (${formatRate(summary.taxRate)})`, formatMoney(summary.tax)));
  }

  lines.push(row('Total', formatMoney(summary.total)));

  return lines.join('\n');
}

function row(label, value) {
  const padding = Math.max(1, WIDTH - label.length - value.length);
  return label + ' '.repeat(padding) + value;
}

function separator() {
  return '-'.repeat(WIDTH);
}

function formatRate(rate) {
  return `${Math.round(rate * 10000) / 100}%`;
}
