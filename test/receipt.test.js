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
  assert.match(receipt, /^Total +\$20\.00$/m);
});
