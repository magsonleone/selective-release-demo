# Changelog

All notable changes to this project are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-11-20

### Added

- Sales tax, with the rate taken from the order (`taxRate`) (#1).
- Validation of item prices and quantities (#2).
- Release process guide (`docs/release-process.md`).

## [1.0.0] - 2026-11-20

### Added

- Cart with items, quantities and subtotal.
- Checkout summary and plain-text receipt.
- Command line interface: `node src/cli.js <order.json>`.
