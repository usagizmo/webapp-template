# WebApp Template

Monorepo template for creating a web application.

> [!Caution]
> Currently, `svelte-hmr`, `@markuplint`, and `prettier-plugin-svelte` do not support Svelte 5.
> We have overridden `pnpm-lock.yaml` to forcibly upgrade to Svelte 5, which may cause issues during package updates.
> When updating dependencies, please refer to [#6a5906](https://github.com/usagizmo/webapp-template/pull/787/commits/6a5906b5866623b223867c4dd5de98755821cd49) to correct `pnpm-lock.yaml`.

## What's inside?

### Uses

- [Turborepo](https://turborepo.org/) x [pnpm](https://pnpm.io/)
- [Prettier](https://prettier.io/) (w/ [prettier-plugin-svelte](https://github.com/sveltejs/prettier-plugin-svelte) + [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss))
- [ESLint](https://eslint.org/) / [CSpell](https://cspell.org/)
- [lint-staged](https://github.com/okonet/lint-staged) / [husky](https://github.com/typicode/husky)
- GitHub Actions (Linting + Testing (Validate `href` and `src` paths))
- Execute `eslint --fix` and `prettier` when saving with VS Code

### Apps and Packages

#### `apps/`

- [`backend`](./apps/backend/)  
  A [Supabase](https://supabase.io/) [Local Dev / CLI](https://supabase.com/docs/guides/cli).
- [`mockup`](./apps/mockup/) [[Demo](https://webapp-template-mockup.usagizmo.com/)]  
  A starting point for building a static site.  
  [Tailwind CSS](https://tailwindcss.com/) + Vanilla JS + [Vitest](https://vitest.dev/) (Check links + file names)
- [`web`](./apps/web/) [[Demo](https://webapp-template.usagizmo.com/)]  
  A starting point for building Svelte application.  
  [SvelteKit](https://kit.svelte.dev/) (w/ [Tailwind CSS](https://tailwindcss.com/))  
  [Supabase](https://supabase.io/) / [Vitest](https://vitest.dev/)

#### `packages/`

- `eslint-config`  
  ESLint 9 (flat) configuration for JavaScript and TypeScript.
  [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte) + [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

### VS Code Extensions (Recommend)

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Breaking changes

### v2.0.0

- **Update Framework/Library Versions:**
  - Switch to Svelte 5 (integrated with TypeScript and using the Rune)
  - Update to Tailwind CSS 4 (removed `tailwind.config.js`)
  - Upgrade to ESLint 9 and implement Flat Config
- **Backend Change:**
  - Replace [Nhost](https://nhost.io/) with [Supabase](https://supabase.com/) for backend services

### v1.9.0

- **Language and Compiler Changes:**
  - Migrated codebase from JavaScript to TypeScript
  - Upgraded from Svelte 4 to Svelte 5 (Rune)
- **Package Naming and Structure:**
  - Custom package names now prefixed with `@repo/`
  - Merged `eslint-config-custom-typescript` into `eslint-config-custom`

### v1.6.0

- **Language Reversion and Documentation:**
  - Reverted codebase from TypeScript back to JavaScript, supplementing with JSDoc for documentation

### v1.0.0

- **Frontend Framework Change:**
  - Switched from [Next.js](https://nextjs.org/) to [SvelteKit](https://kit.svelte.jp/) for the frontend framework in `apps/web`
- **Repository Rebranding:**
  - Renamed `nextjs-template` repository to `webapp-template`

### v0.23.0

- **Backend Services Integration:**
  - Replaced individual [Firebase](https://firebase.google.com/) and [Hasura](https://hasura.io/) applications with a unified [Nhost](https://nhost.io/) application in `apps/nhost`

## Commands

```bash
pnpm i  # Resolve dependency packages and prepare .env files
# Then set up /.env

pnpm build   # Build all apps and packages
pnpm dev     # Set up file monitoring builds and local servers for development
pnpm lint    # markuplint + eslint + prettier --check
pnpm test    # Testing
pnpm format  # eslint --fix + prettier --write + format project-words.txt
```

## List of listening port numbers

- `apps/backend/` - Supabase Local Dev / CLI
  - `54321`: API / GraphQL / S3 Storage
  - `54322`: DB (Postgres)
  - `54323`: Studio
  - `54324`: Inbucket
- `apps/web/` - SvelteKit application
  - `5173`: Development server
- `apps/mockup/` - Static site
  - `8000`: BrowserSync server
  - `49160`: Express server

## Registering environment variables for GitHub / Vercel

If you need to prepare GitHub / Vercel environment, you need to set all environment variables (`.env` items) in each service.
