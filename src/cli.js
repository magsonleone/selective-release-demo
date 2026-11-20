#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { createCart } from './cart.js';
import { checkout } from './checkout.js';
import { pointsFor } from './loyalty.js';
import { renderReceipt } from './receipt.js';

const [file] = process.argv.slice(2);

if (!file) {
  console.error('Usage: node src/cli.js <order.json>');
  process.exit(1);
}

const order = JSON.parse(readFileSync(file, 'utf8'));
const summary = checkout(createCart(order.items), order);

console.log(renderReceipt(summary));
console.log(`\nLoyalty points earned: ${pointsFor(summary.total)}`);
