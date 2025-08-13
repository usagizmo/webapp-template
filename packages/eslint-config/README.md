# @repo/eslint-config

Centralized ESLint configuration package using ESLint 9 Flat Config for the webapp-template monorepo.

## Available Configurations

- **`root`** - For root-level files (Node.js + TypeScript environment)
- **`web`** - For SvelteKit application with TypeScript and Svelte support
- **`pages`** - For static site with mixed Node.js/browser environment

## Usage

### Root Level

```js
import { root } from '@repo/eslint-config';

export default root;
```

### Web App (SvelteKit)

```js
import { web } from '@repo/eslint-config';

export default web;
```

### Pages (Static Site)

```js
import { pages } from '@repo/eslint-config';

export default pages;
```

## Features

- **ESLint 9 Flat Config** - Modern configuration format
- **TypeScript Support** - Full TypeScript linting with typescript-eslint
- **Svelte Support** - Svelte-specific rules and parser
- **Environment-aware** - Proper globals for Node.js vs browser environments
- **Import Sorting** - Automatic import organization
- **Unused Import Cleanup** - Remove unused imports automatically
- **JSDoc Validation** - Enforce JSDoc documentation standards
- **Prettier Integration** - Seamless integration with Prettier formatting
- **Test File Detection** - Automatic relaxed rules for `*.test.{js,ts}` and `*.spec.{js,ts}`
- **Config File Detection** - Relaxed JSDoc requirements for `*.config.{js,ts}`

## Included Plugins

- [@eslint/js](https://www.npmjs.com/package/@eslint/js) - Core ESLint rules
- [typescript-eslint](https://typescript-eslint.io/) - TypeScript support
- [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte) - Svelte linting
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) - Import sorting
- [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports) - Unused imports
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) - JSDoc validation
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - Prettier integration

## Commands

```bash
bun lint    # Run linting
bun format  # Format code
```

## Design Philosophy

- **Centralized Management** - All ESLint configurations managed from a single source
- **Project-Specific** - Each configuration tailored to specific project needs
- **DRY Principle** - No duplication of rules across projects
- **Maintainable** - Easy to modify and extend configurations
- **Standard Compliant** - Follows Node.js package resolution conventions
