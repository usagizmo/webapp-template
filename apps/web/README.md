# Web App ([SvelteKit](https://svelte.dev/docs/kit/))

Modern web application built with [Svelte 5](https://svelte.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS 4](https://tailwindcss.com/), and comprehensive tooling for production-ready development.

## Tech Stack

- **Frontend**: Svelte 5 (Runes API), SvelteKit, TypeScript
- **Styling**: Tailwind CSS 4, shadcn-svelte UI components
- **Authentication**: @supabase/ssr for server-side auth
- **Forms**: Superforms with Formsnap for type-safe form handling
- **Icons**: Lucide Svelte for consistent iconography
- **Validation**: markuplint for HTML validation, Zod for schema validation
- **Testing**: Vitest
- **Linting**: ESLint, Prettier

## Architecture

This application follows a **page-based component organization** with **class-based design patterns** for improved maintainability:

```text
src/lib/
├── components/
│   ├── pages/           # Page-specific components
│   │   ├── auth/        # Authentication pages
│   │   ├── home/        # Home page components
│   │   └── layout/      # Layout components
│   └── ui/              # Reusable UI components (shadcn-svelte)
├── composables/         # Reusable reactive logic and state management
├── constants/           # Application constants
├── helpers/             # Business logic and API operations (comment handling, authentication, etc.)
├── schemas/             # Zod validation schemas
├── stores/              # State management (class-based)
├── types/               # TypeScript type definitions
└── utils/               # Generic utility functions (reusable, not feature-specific)
```

**Layer Communication Rules**:

- **Components**: Access Helpers via Stores (direct Helper dependency is prohibited)
- **Stores/Composables**: Can directly access Helpers, pass state to Helpers for execution

[[Demo](https://webapp-template.usagizmo.com/)]

## Commands

```bash
pnpm dev       # Start development server (port 5173)
pnpm build     # Build for production
pnpm preview   # Preview production build
pnpm test      # Run Vitest tests
pnpm lint      # Run linting
pnpm generate  # Copy Supabase types from api
```

## Development

1. Start Supabase API: `cd ../api && pnpm start`
2. Generate types: `pnpm generate`
3. Start dev server: `pnpm dev`
4. Open http://localhost:5173

## Deploy to Vercel

### Configuration

- **Framework Preset**: SvelteKit
- **Root Directory**: `apps/web`
- **Build Command**: Automatically configured via `vercel.json`
- **Install Command**: Automatically configured via `vercel.json`

### Environment Variables

Set these in your Vercel project settings:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional
ENABLE_EXPERIMENTAL_COREPACK=1
```

See the [root README](../../README.md) for complete setup instructions.
