# @repo/eslint-config

Centralized ESLint 9 Flat Config for the monorepo. See the [root README](../../README.md) for the plugin list and commands.

## Available Configurations

- **`root`** — root-level files (Node.js + TypeScript)
- **`web`** — SvelteKit app with TypeScript and Svelte support
- **`pages`** — static site with mixed Node.js/browser environment

## Usage

```js
// eslint.config.js
import { web } from '@repo/eslint-config'; // or: root | pages

export default web;
```

## Architecture Rules (`web`)

The `web` config enforces the layered architecture described in [apps/web](../../apps/web/):

- Direct imports from `$lib/stores/*` are prohibited — use the `$lib/stores` index
- Components cannot import Helpers directly — access them via Stores/LocalStores
- Helpers/Utils cannot import from Stores — they must be pure functions receiving values as arguments

This enforces testability, unidirectional data flow, and better type inference through dependency injection.
