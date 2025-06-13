# WebApp Template

Monorepo template for creating a modern web application.

## Tech Stack

- **Frontend**: [Svelte 5](https://svelte.dev/) + [SvelteKit](https://svelte.dev/docs/kit/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime, Storage)
- **Build System**: [Turborepo](https://turborepo.org/) + [pnpm](https://pnpm.io/) + [Vite](https://vitejs.dev/)
- **Quality Tools**: [ESLint 9](https://eslint.org/), [Prettier](https://prettier.io/), [CSpell](https://cspell.org/), [Vitest](https://vitest.dev/)
- **Development**: VS Code extensions, [lint-staged](https://github.com/okonet/lint-staged), [husky](https://github.com/typicode/husky), GitHub Actions

## Apps and Packages

### `apps/`

- **`backend`** - [Supabase](https://supabase.com/) Local Development  
  PostgreSQL database, authentication, and API services
- **`web`** [[Demo](https://webapp-template.usagizmo.com/)] - [SvelteKit](https://svelte.dev/docs/kit/) Frontend  
  Main web application with Supabase integration
- **`mockup`** [[Demo](https://webapp-template-mockup.usagizmo.com/)] - Static Prototyping  
  [Tailwind CSS](https://tailwindcss.com/) + Vanilla JS for rapid prototyping

### `packages/`

- **`eslint-config`** - Shared [ESLint](https://eslint.org/) configuration
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - Prettier integration
  - [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte) - Svelte linting
  - [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) - Import sorting
  - [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) - JSDoc validation
- **`types`** - Shared TypeScript type definitions

## Quick Start

### 1. Installation & Setup

```bash
# Install dependencies
pnpm install

# Initialize environment files (.env from .env.example)
pnpm init

# Start Supabase backend
cd apps/backend && pnpm start

# Generate TypeScript types from Supabase schema
pnpm generate

# Start all development servers
pnpm dev
```

### 2. Development Workflow

#### Starting Development

```bash
# 1. Start Supabase (in apps/backend)
pnpm start

# 2. Generate types (from root)
pnpm generate

# 3. Start web app (from root)
pnpm --filter web dev
```

#### Environment Configuration

**Development (Local Supabase)**:

```env
PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
PUBLIC_SUPABASE_ANON_KEY=[shown when Supabase starts]
```

**Production**:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=[from Supabase project settings]
```

### VS Code Extensions (Recommended)

- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Available Commands

### Root Level Commands

```bash
# Project Setup
pnpm install          # Install all dependencies
pnpm init             # Create .env files from examples

# Development
pnpm dev              # Start all apps in development mode
pnpm generate         # Generate Supabase TypeScript types
pnpm build            # Build all applications
pnpm lint             # Run linting across all apps
pnpm test             # Run tests across all apps
pnpm format           # Format code with Prettier

# Utilities
pnpm use-mockup       # Setup for mockup-only usage
```

### App-Specific Commands

#### Backend (Supabase)

```bash
cd apps/backend
pnpm start            # Start Supabase locally
pnpm stop             # Stop Supabase
pnpm pull             # Pull schema changes from remote
pnpm generate         # Generate TypeScript types
```

#### Web App

```bash
cd apps/web
pnpm dev              # Start development server (port 5173)
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm test             # Run Vitest tests
pnpm lint             # Run linting
```

#### Mockup

```bash
cd apps/mockup
pnpm dev              # Start development server (port 3000)
pnpm build            # Build static site
pnpm test             # Validate links and images
pnpm deploy           # Deploy to server (rsync)
```

## Port Configuration

| Service           | Port  | Description                  |
| ----------------- | ----- | ---------------------------- |
| Supabase API      | 54321 | REST API, GraphQL, Storage   |
| Supabase DB       | 54322 | PostgreSQL database          |
| Supabase Studio   | 54323 | Admin dashboard              |
| Supabase Inbucket | 54324 | Email testing                |
| Web App           | 5173  | SvelteKit development server |
| Mockup            | 3000  | Static site with BrowserSync |

## Environment Switching

You can easily switch between development and production environments:

1. **For Development**: Use local Supabase (started with `pnpm start`)
2. **For Production Testing**: Update `.env` with production Supabase credentials
3. **Type Safety**: Always run `pnpm generate` after schema changes

## Deployment

### Vercel Deployment (Web App)

- **Framework Preset**: SvelteKit
- **Root Directory**: `apps/web`
- **Build Command**: `cd ../.. && pnpm build --filter=web`
- **Environment Variables**: Set Supabase credentials from your project settings
- **Corepack**: Add `ENABLE_EXPERIMENTAL_COREPACK=1`

### Vercel Deployment (Mockup)

- **Framework Preset**: Other
- **Root Directory**: `apps/mockup`
- **Build Command**: `cd ../.. && pnpm build --filter=mockup`

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
