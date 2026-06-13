# Changelog

Highlights of notable and breaking changes for selected releases — not every version is listed. For the complete history, see the [GitHub Releases](https://github.com/usagizmo/webapp-template/releases).

## [v2.13.0](https://github.com/usagizmo/webapp-template/releases/tag/v2.13.0)

- **Package Manager Migration:**
  - Migrated from pnpm to [Bun](https://bun.sh/) as the primary package manager
  - All `pnpm` commands must be replaced with `bun` equivalents
  - Replaced `pnpm-lock.yaml` with `bun.lock`
- **Build System Updates:**
  - Updated Turborepo filter syntax for GitHub Actions
  - Fixed Vercel deployment configurations for bun compatibility
  - Added generic `build` task to `turbo.json`

## [v2.12.0](https://github.com/usagizmo/webapp-template/releases/tag/v2.12.0)

- **Shared Package Introduction:**
  - Created `@repo/shared` package for common components, types, and utilities
  - Moved all UI components from `apps/web/src/lib/components/ui/` to `packages/shared/`
  - Migrated shared types (UserProfile) and constants (easing) to shared package
  - Updated all imports to use `@repo/shared` package instead of local paths
  - Centralized Tailwind CSS configuration and base styles in shared package
  - Applications now import shared CSS using `@source` directive

## [v2.9.0](https://github.com/usagizmo/webapp-template/releases/tag/v2.9.0)

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

## [v2.8.1](https://github.com/usagizmo/webapp-template/releases/tag/v2.8.1)

- **Directory Structure:**
  - Renamed `apps/backend` to `apps/api` for better semantic clarity
  - Updated all references in documentation, scripts, and configuration files

## [v2.8.0](https://github.com/usagizmo/webapp-template/releases/tag/v2.8.0)

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

## [v2.0.0](https://github.com/usagizmo/webapp-template/releases/tag/v2.0.0)

- **Update Framework/Library Versions:**
  - Switch to Svelte 5 (integrated with TypeScript and using the Rune)
  - Update to Tailwind CSS 4 (removed `tailwind.config.js`)
  - Upgrade to ESLint 9 and implement Flat Config
- **API Change:**
  - Replace [Nhost](https://nhost.io/) with [Supabase](https://supabase.com/) for API services

## [v1.6.0](https://github.com/usagizmo/webapp-template/releases/tag/v1.6.0)

- **Language Reversion and Documentation:**
  - Reverted codebase from TypeScript back to JavaScript, supplementing with JSDoc for documentation

## [v1.0.0](https://github.com/usagizmo/webapp-template/releases/tag/v1.0.0)

- **Frontend Framework Change:**
  - Switched from [Next.js](https://nextjs.org/) to [SvelteKit](https://svelte.dev/docs/kit/) for the frontend framework in `apps/web`
- **Repository Rebranding:**
  - Renamed `nextjs-template` repository to `webapp-template`

## [v0.23.0](https://github.com/usagizmo/webapp-template/releases/tag/v0.23.0)

- **API Services Integration:**
  - Replaced individual [Firebase](https://firebase.google.com/) and [Hasura](https://hasura.io/) applications with a unified [Nhost](https://nhost.io/) application in `apps/nhost`
