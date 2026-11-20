import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatMoney } from '../src/money.js';

test('formats dollars and cents', () => {
  assert.equal(formatMoney(12.5), '$12.50');
});

test('uses a thousands separator', () => {
  assert.equal(formatMoney(1234.5), '$1,234.50');
});

test('formats negative amounts', () => {
  assert.equal(formatMoney(-5), '-$5.00');
});
