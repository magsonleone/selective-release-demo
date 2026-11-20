import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeTax } from '../src/tax.js';

test('computes the tax for a rate', () => {
  assert.equal(computeTax(100, 0.08), 8);
});

test('no rate means no tax', () => {
  assert.equal(computeTax(100), 0);
});

test('rejects invalid rates', () => {
  assert.throws(() => computeTax(100, -0.1), RangeError);
  assert.throws(() => computeTax(100, 8), RangeError);
});
