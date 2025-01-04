# WebApp Template

Monorepo template for creating a web application.

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
  [SvelteKit](https://svelte.dev/docs/kit/) (w/ [Tailwind CSS](https://tailwindcss.com/))  
  [Supabase](https://supabase.io/) / [Vitest](https://vitest.dev/)

#### `packages/`

- `eslint-config`  
  ESLint 9 (Flat Config) for JavaScript and TypeScript.
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
  - [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte)
  - [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
  - [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)

### VS Code Extensions (Recommend)

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Commands

```bash
pnpm i  # Resolve dependency packages and prepare .env files
# Then set up /.env

# Run command for each package (apps/ + packages/)
pnpm generate  # Generate and sync Supabase type definitions between backend and web apps
pnpm build     #
pnpm lint      # root: cspell + prettier --check
pnpm test      #
pnpm format    # root: Format project-words.txt + prettier --write
```

### Supabase Type Generation

Run `pnpm generate` to generate Supabase types. This command will:

1. Generate types in `apps/backend/$generated/supabase-types.ts`
2. Copy the types to `apps/web/src/lib/$generated/supabase-types.ts`

This ensures type consistency between the backend and frontend applications.

## List of listening port numbers

- `apps/backend/` - Supabase Local Dev / CLI
  - `54321`: API / GraphQL / S3 Storage
  - `54322`: DB (Postgres)
  - `54323`: Studio
  - `54324`: Inbucket
- `apps/web/` - SvelteKit application
  - `5173`: Development server
- `apps/mockup/` - Static site
  - `3000`: BrowserSync server
  - `49160`: Express server

## Registering environment variables for GitHub / Vercel

If you need to prepare GitHub / Vercel environment, you need to set all environment variables (`.env` items) in each service.

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
  - Switched from [Next.js](https://nextjs.org/) to [SvelteKit](https://svelte.dev/docs/kit/) for the frontend framework in `apps/web`
- **Repository Rebranding:**
  - Renamed `nextjs-template` repository to `webapp-template`

### v0.23.0

- **Backend Services Integration:**
  - Replaced individual [Firebase](https://firebase.google.com/) and [Hasura](https://hasura.io/) applications with a unified [Nhost](https://nhost.io/) application in `apps/nhost`
