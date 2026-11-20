import { test } from 'node:test';
import assert from 'node:assert/strict';
import { amountToFreeShipping, shippingFor } from '../src/shipping.js';

test('charges standard shipping below $50', () => {
  assert.equal(shippingFor(49.99), 7.99);
});

test('free shipping from $50', () => {
  assert.equal(shippingFor(50), 0);
});

test('tells how much is missing for free shipping', () => {
  assert.equal(amountToFreeShipping(35.25), 14.75);
  assert.equal(amountToFreeShipping(80), 0);
});
