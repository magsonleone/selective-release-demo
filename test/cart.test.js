import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCart, lineTotal, subtotal } from '../src/cart.js';

test('quantity defaults to 1', () => {
  const cart = createCart([{ sku: 'A', name: 'Apple', price: 2 }]);
  assert.equal(cart.items[0].quantity, 1);
});

test('line total is unit price times quantity', () => {
  assert.equal(lineTotal({ price: 2.5, quantity: 4 }), 10);
});

test('subtotal adds all lines', () => {
  const cart = createCart([
    { sku: 'A', name: 'Apple', price: 2, quantity: 5 },
    { sku: 'B', name: 'Bread', price: 5, quantity: 2 },
  ]);
  assert.equal(subtotal(cart), 20);
});
