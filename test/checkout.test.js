import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCart } from '../src/cart.js';
import { checkout } from '../src/checkout.js';

// Subtotal: 5 x $2.00 + 2 x $5.00 = $20.00
const cart = () =>
  createCart([
    { sku: 'A', name: 'Apple', price: 2, quantity: 5 },
    { sku: 'B', name: 'Bread', price: 5, quantity: 2 },
  ]);

test('total equals the subtotal', () => {
  const summary = checkout(cart());
  assert.equal(summary.subtotal, 20);
  assert.equal(summary.total, 20);
});

test('adds sales tax to the total', () => {
  const summary = checkout(cart(), { taxRate: 0.1 });
  assert.equal(summary.tax, 2);
  assert.equal(summary.total, 22);
});
