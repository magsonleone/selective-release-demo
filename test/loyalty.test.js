import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pointsFor } from '../src/loyalty.js';

test('earns 2 points per whole dollar', () => {
  assert.equal(pointsFor(46.06), 92);
});

test('no points below $1', () => {
  assert.equal(pointsFor(0.99), 0);
});
