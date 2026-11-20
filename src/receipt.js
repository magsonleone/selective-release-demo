import { lineTotal } from './cart.js';

const WIDTH = 36;

/**
 * Renders a checkout summary as a plain-text receipt.
 */
export function renderReceipt(summary) {
  const lines = [];

  for (const item of summary.items) {
    lines.push(row(`${item.quantity} x ${item.name}`, `$${lineTotal(item).toFixed(2)}`));
  }

  lines.push(separator());
  lines.push(row('Subtotal', `$${summary.subtotal.toFixed(2)}`));
  lines.push(row('Total', `$${summary.total.toFixed(2)}`));

  return lines.join('\n');
}

function row(label, value) {
  const padding = Math.max(1, WIDTH - label.length - value.length);
  return label + ' '.repeat(padding) + value;
}

function separator() {
  return '-'.repeat(WIDTH);
}
