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

test('rejects a negative or missing price', () => {
  assert.throws(() => createCart([{ sku: 'A', name: 'Apple', price: -1 }]), RangeError);
  assert.throws(() => createCart([{ sku: 'A', name: 'Apple' }]), RangeError);
});

test('rejects a quantity that is not a positive integer', () => {
  assert.throws(() => createCart([{ sku: 'A', name: 'Apple', price: 2, quantity: 0 }]), RangeError);
  assert.throws(() => createCart([{ sku: 'A', name: 'Apple', price: 2, quantity: 1.5 }]), RangeError);
});
