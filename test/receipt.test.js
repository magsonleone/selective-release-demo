import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCart } from '../src/cart.js';
import { checkout } from '../src/checkout.js';
import { renderReceipt } from '../src/receipt.js';

// Subtotal: 5 x $2.00 + 2 x $5.00 = $20.00
const cart = () =>
  createCart([
    { sku: 'A', name: 'Apple', price: 2, quantity: 5 },
    { sku: 'B', name: 'Bread', price: 5, quantity: 2 },
  ]);

test('lists the items, the subtotal and the total', () => {
  const receipt = renderReceipt(checkout(cart()));

  assert.match(receipt, /^5 x Apple +\$10\.00$/m);
  assert.match(receipt, /^2 x Bread +\$10\.00$/m);
  assert.match(receipt, /^Subtotal +\$20\.00$/m);
  assert.match(receipt, /^Total +\$27\.99$/m);
});

test('shows the tax line when there is a tax rate', () => {
  const receipt = renderReceipt(checkout(cart(), { taxRate: 0.08 }));

  assert.match(receipt, /^Tax \(8%\) +\$1\.60$/m);
  assert.match(receipt, /^Total +\$29\.59$/m);
});

test('shows the discount line when a coupon is used', () => {
  const receipt = renderReceipt(checkout(cart(), { coupon: 'SAVE10' }));

  assert.match(receipt, /^Discount \(SAVE10\) +-\$2\.00$/m);
  assert.match(receipt, /^Total +\$25\.99$/m);
});

test('shows shipping and how much is missing for free shipping', () => {
  const receipt = renderReceipt(checkout(cart()));

  assert.match(receipt, /^Shipping +\$7\.99$/m);
  assert.match(receipt, /^Add \$30\.00 more for free shipping\.$/m);
});

test('shows free shipping from $50', () => {
  const receipt = renderReceipt(checkout(createCart([{ sku: 'C', name: 'Chair', price: 55 }])));

  assert.match(receipt, /^Shipping +FREE$/m);
  assert.doesNotMatch(receipt, /more for free shipping/);
});
