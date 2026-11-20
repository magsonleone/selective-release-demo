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

test('total equals the subtotal plus shipping', () => {
  const summary = checkout(cart());
  assert.equal(summary.subtotal, 20);
  assert.equal(summary.shipping, 7.99);
  assert.equal(summary.total, 27.99);
});

test('adds sales tax to the total', () => {
  const summary = checkout(cart(), { taxRate: 0.1 });
  assert.equal(summary.tax, 2);
  assert.equal(summary.total, 29.99);
});

test('applies the coupon before tax', () => {
  const summary = checkout(cart(), { taxRate: 0.1, coupon: 'WELCOME5' });
  assert.equal(summary.discount, 5);
  assert.equal(summary.tax, 1.5);
  assert.equal(summary.total, 24.49);
});

test('shipping is free from $50 after discounts', () => {
  const chair = () => createCart([{ sku: 'C', name: 'Chair', price: 55 }]);
  assert.equal(checkout(chair()).shipping, 0);
  assert.equal(checkout(chair(), { coupon: 'WELCOME5' }).shipping, 0);
  assert.equal(checkout(chair(), { coupon: 'SAVE10' }).shipping, 7.99);
});
