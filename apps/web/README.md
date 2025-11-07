# Web App ([SvelteKit](https://svelte.dev/docs/kit/))

Modern web application built with [Svelte 5](https://svelte.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS 4](https://tailwindcss.com/), and comprehensive tooling for production-ready development.

## Tech Stack

- **Frontend**: Svelte 5 (Runes API), SvelteKit, TypeScript
- **Styling**: Tailwind CSS 4, shadcn-svelte UI components
- **Authentication**: @supabase/ssr for server-side auth
- **Forms**: Superforms with Formsnap for type-safe form handling
- **Icons**: Lucide Svelte for consistent iconography
- **Validation**: markuplint for HTML validation, Zod for schema validation
- **Testing**: Bun test
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
├── constants/           # Application constants
├── helpers/             # Business logic and API operations (comment handling, authentication, etc.)
├── schemas/             # Zod validation schemas
├── stores/              # State management (class-based)
│   └── local/           # Component-scoped stores
├── types/               # TypeScript type definitions
└── utils/               # Generic utility functions (reusable, not feature-specific)
```

**Layer Communication Rules**:

- **Components**: Access Helpers via Stores/LocalStores (direct Helper dependency is prohibited)
- **Stores/LocalStores**: Can directly access Helpers, pass state to Helpers for execution

## State Management

Class-based stores using Svelte 5 Runes API (`$state`, `$derived`):

| Type            | Location                  | Instantiation         | Purpose                       |
| --------------- | ------------------------- | --------------------- | ----------------------------- |
| **Stores**      | `src/lib/stores/index.ts` | Singleton (automatic) | Application-wide shared state |
| **LocalStores** | `src/lib/stores/local/`   | `new` in component    | Component-scoped state        |

**Stores**: `supabaseStore`, `userStore`, `commentStore`

[[Demo](https://webapp-template.usagizmo.com/)]

## Commands

```bash
bun dev       # Start development server (port 5173)
bun build     # Build for production
bun preview   # Preview production build
bun test      # Run tests
bun lint      # Run linting
```

## Development

1. Start Supabase API: `cd ../api && bun start`
2. Generate types: `cd ../.. && bun generate`
3. Start dev server: `bun dev`
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
```

See the [root README](../../README.md) for complete setup instructions.
