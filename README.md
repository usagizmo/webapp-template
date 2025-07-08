# WebApp Template

Monorepo template for creating a modern web application.

## Tech Stack

- **Frontend**: [Svelte 5](https://svelte.dev/) + [SvelteKit](https://svelte.dev/docs/kit/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) + [Superforms](https://superforms.rocks/) + [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) + [Zod](https://zod.dev/)
- **API**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime, Storage)
- **Build System**: [Turborepo](https://turborepo.org/) + [pnpm](https://pnpm.io/) + [Vite](https://vitejs.dev/)
- **Quality Tools**: [ESLint 9](https://eslint.org/), [Prettier](https://prettier.io/), [CSpell](https://cspell.org/), [Vitest](https://vitest.dev/), [markuplint](https://markuplint.dev/)
- **Development**: VS Code extensions, [lint-staged](https://github.com/okonet/lint-staged), [husky](https://github.com/typicode/husky), GitHub Actions

## Apps and Packages

### `apps/`

- **[`api`](./apps/api/)** - [Supabase](https://supabase.com/) Local Development
  PostgreSQL database, authentication, and API services
- **[`web`](./apps/web/)** [[Demo](https://webapp-template.usagizmo.com/)] - [SvelteKit](https://svelte.dev/docs/kit/) Frontend
  Modern web application with page-based component organization, class-based design patterns, and comprehensive Supabase integration
- **[`pages`](./apps/pages/)** [[Demo](https://webapp-template-pages.usagizmo.com/)] - Static Site Publishing
  High-quality static websites with URL validation, accessibility checks, and SEO optimization

### `packages/`

- **[`eslint-config`](./packages/eslint-config/)** - Centralized [ESLint 9](https://eslint.org/) configuration with Flat Config
  - Pre-configured setups: `root`, `web` (Svelte), `pages` (Vanilla JS)
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - Prettier integration
  - [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte) - Svelte linting
  - [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) - Import sorting
  - [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) - JSDoc validation
  - [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports) - Unused import cleanup

## Quick Start

### Prerequisites

- [Node.js v22+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (for local database)

### Starting Development

```bash
# Install dependencies (.env file is created automatically)
pnpm install

# For static site development
pnpm --filter pages dev

# For web app development
pnpm --filter api start     # Start Supabase API
pnpm --filter api generate  # Generate TypeScript types (only when schema changes)
pnpm --filter web dev       # Start web development server
```

> **Note**: TypeScript types are committed to the repository, so you only need to run `generate` when the database schema changes.

#### Environment Configuration

After running `pnpm install`, a `.env` file is automatically created from `.env.example`. Fill in the required values:

**For local development**:

- `PUBLIC_SUPABASE_URL` - `http://127.0.0.1:54321`
- `PUBLIC_SUPABASE_ANON_KEY` - Copy the anon key displayed when running `pnpm --filter api start`

**For production deployment**:

- `PUBLIC_SUPABASE_URL` - `https://[project-id].supabase.co`
- `PUBLIC_SUPABASE_ANON_KEY` - Get from Supabase Dashboard > Project Settings > API Keys

**Optional (for advanced operations)**:

- `DATABASE_URL` - Enables `pnpm --filter api push/pull` to target production database
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side admin access for Edge Functions, Webhooks (never use in browser!)

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
pnpm install          # Install dependencies (.env file is created automatically)

# Development
pnpm dev              # Start all apps in development mode
pnpm generate         # Generate Supabase TypeScript types
pnpm build            # Build all applications
pnpm lint             # Run linting across all apps
pnpm test             # Run tests across all apps
pnpm format           # Format code with Prettier
```

### App-Specific Commands

#### API (Supabase)

```bash
cd apps/api
pnpm start            # Start Supabase locally
pnpm stop             # Stop Supabase
pnpm reset            # Reset database and regenerate types
pnpm diff             # Show schema changes
pnpm push             # Push migrations to remote
pnpm pull             # Pull schema changes from remote and regenerate types
pnpm migration        # Create new migration file
pnpm link             # Link to remote project
pnpm seed             # Seed storage buckets
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

#### Pages (Static Site Publishing)

```bash
cd apps/pages
pnpm dev              # Start development server (port 3000)
pnpm build            # Build static site with Tailwind CSS
pnpm test             # Validate links, images, and accessibility (Note: Delete tests/external-links.txt before pnpm test to update URL tracking)
pnpm lint             # Run HTML validation with markuplint
pnpm deploy           # Deploy to server (rsync)

# Optimization Utilities
pnpm add-size-to-img  # Add width/height to <img> tags for better performance
pnpm clean-image      # Remove unused images from project
```

## Port Configuration

| Service           | Port  | Description                  |
| ----------------- | ----- | ---------------------------- |
| Supabase API      | 54321 | REST API, GraphQL, Storage   |
| Supabase DB       | 54322 | PostgreSQL database          |
| Supabase Studio   | 54323 | Admin dashboard              |
| Supabase Inbucket | 54324 | Email testing                |
| Web App           | 5173  | SvelteKit development server |
| Pages             | 3000  | Static site with BrowserSync |

## Type Safety and Environment Switching

### Supabase Type Generation

TypeScript types are automatically generated from your Supabase database schema:

1. **Local Development**: Types are generated to `apps/api/$generated/supabase-types.ts`
2. **Frontend Usage**: Types are directly imported in `apps/web/src/lib/supabase.ts`
3. **After Schema Changes**: Run `pnpm generate` to update types

### Environment Switching

You can easily switch between development and production environments:

1. **For Development**: Use local Supabase (started with `pnpm start`)
2. **For Production Testing**: Update `.env` with production Supabase credentials
3. **Type Safety**: Types are committed to repository for CI/CD compatibility

## Deployment

### Vercel Deployment

The project supports deploying both apps as separate Vercel projects. Each app includes its own `vercel.json` configuration file.

#### Web App (SvelteKit)

**Configuration:**

- **Framework Preset**: SvelteKit
- **Root Directory**: `apps/web`
- **Build Command**: Automatically configured via `apps/web/vercel.json`
- **Install Command**: Automatically configured via `apps/web/vercel.json`

**Environment Variables:**
Set the following environment variables in your Vercel project settings:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional
ENABLE_EXPERIMENTAL_COREPACK=1
```

#### Static Pages

**Option 1: Vercel Deployment**

- **Framework Preset**: Other
- **Root Directory**: `apps/pages`
- **Build Command**: Automatically configured via `apps/pages/vercel.json`
- **Install Command**: Automatically configured via `apps/pages/vercel.json`
- **Output Directory**: `public`

**Option 2: Server Deployment (rsync)**

- Use `pnpm run deploy` command in `apps/pages`
- Configure server details in deployment script
- Direct file transfer to your server

#### Setup Instructions

1. Create two separate Vercel projects from the same GitHub repository
2. Set different **Root Directory** for each project:
   - Web App: `apps/web`
   - Static Pages: `apps/pages`
3. Each project will use its respective `vercel.json` configuration
4. Configure environment variables for the web app project

## Breaking changes

### [v2.9.0](https://github.com/usagizmo/webapp-template/releases/tag/v2.9.0)

- **Database Schema Changes:**
  - Reset and restructured Supabase database schema with improved type definitions
  - Added `updated_at` columns to `profiles` and `comments` tables
  - Enhanced RLS policies with more granular permissions
  - Updated TypeScript types to reflect new schema structure
- **Project Structure Optimization:**
  - Removed deprecated `apps/backend` directory completely
  - Streamlined development workflow with automatic `.env` file generation
  - Updated all references and documentation to use `apps/api` consistently
- **Application Structure:**
  - Renamed `apps/mockup` to `apps/pages` for better clarity and purpose alignment
  - Removed deprecated `commands/use-mockup.js` script and related references
  - Updated all import paths and package references to use the new naming convention
- **Deployment Configuration:**
  - Separated Vercel deployment configurations for independent app deployment
  - Moved root-level `vercel.json` to `apps/web/vercel.json`
  - Added separate `apps/pages/vercel.json` for static site deployment
  - Each application now deploys independently with its own configuration
- **Configuration Updates:**
  - Enhanced Supabase configuration with comprehensive settings
  - Updated Turbo configuration to include all necessary environment variables
  - Improved Prettier and linting configurations for new structure
- **Environment Setup:**
  - Updated `.env.example` with comprehensive Supabase environment variables
  - Enhanced environment configuration documentation with clearer setup instructions
  - Improved local and production environment switching guidance

### [v2.8.1](https://github.com/usagizmo/webapp-template/releases/tag/v2.8.1)

- **Directory Structure:**
  - Renamed `apps/backend` to `apps/api` for better semantic clarity
  - Updated all references in documentation, scripts, and configuration files

### [v2.8.0](https://github.com/usagizmo/webapp-template/releases/tag/v2.8.0)

- **Infrastructure Requirements:**
  - Node.js v22 is now required (added `.node-version` file)
- **Supabase Integration:**
  - Restructured Supabase type flow: Direct import from `apps/api/$generated/` instead of `apps/web/src/lib/$generated/`
  - Enhanced database schema with complete type generation
- **Build System:**
  - Updated Vercel deployment configuration with new build commands
  - Replaced `concurrently` with `npm-run-all2` for better performance
- **Development Tools:**
  - Enhanced ESLint configuration with modular structure
  - Restructured shared packages with proper TypeScript builds

### [v2.0.0](https://github.com/usagizmo/webapp-template/releases/tag/v2.0.0)

- **Update Framework/Library Versions:**
  - Switch to Svelte 5 (integrated with TypeScript and using the Rune)
  - Update to Tailwind CSS 4 (removed `tailwind.config.js`)
  - Upgrade to ESLint 9 and implement Flat Config
- **API Change:**
  - Replace [Nhost](https://nhost.io/) with [Supabase](https://supabase.com/) for API services

### [v1.6.0](https://github.com/usagizmo/webapp-template/releases/tag/v1.6.0)

- **Language Reversion and Documentation:**
  - Reverted codebase from TypeScript back to JavaScript, supplementing with JSDoc for documentation

### [v1.0.0](https://github.com/usagizmo/webapp-template/releases/tag/v1.0.0)

- **Frontend Framework Change:**
  - Switched from [Next.js](https://nextjs.org/) to [SvelteKit](https://svelte.dev/docs/kit/) for the frontend framework in `apps/web`
- **Repository Rebranding:**
  - Renamed `nextjs-template` repository to `webapp-template`

### [v0.23.0](https://github.com/usagizmo/webapp-template/releases/tag/v0.23.0)

- **API Services Integration:**
  - Replaced individual [Firebase](https://firebase.google.com/) and [Hasura](https://hasura.io/) applications with a unified [Nhost](https://nhost.io/) application in `apps/nhost`
