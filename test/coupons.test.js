import { test } from 'node:test';
import assert from 'node:assert/strict';
import { discountFor } from '../src/coupons.js';

test('no coupon means no discount', () => {
  assert.equal(discountFor(undefined, 50), 0);
});

test('percent coupon', () => {
  assert.equal(discountFor('SAVE10', 50), 5);
});

test('fixed coupon, case insensitive', () => {
  assert.equal(discountFor('welcome5', 50), 5);
});

test('the discount never exceeds the amount', () => {
  assert.equal(discountFor('WELCOME5', 3), 3);
});

test('rejects unknown coupons', () => {
  assert.throws(() => discountFor('FREE100', 50), /Unknown coupon/);
});
