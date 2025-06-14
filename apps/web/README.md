# Web App ([SvelteKit](https://svelte.dev/docs/kit/))

Modern web application built with [Svelte 5](https://svelte.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS 4](https://tailwindcss.com/), and [markuplint](https://markuplint.dev/) for HTML validation.

[[Demo](https://webapp-template.usagizmo.com/)]

## Commands

```bash
pnpm dev       # Start development server (port 5173)
pnpm build     # Build for production
pnpm preview   # Preview production build
pnpm test      # Run Vitest tests
pnpm lint      # Run linting
pnpm generate  # Copy Supabase types from backend
```

## Development

1. Start Supabase backend: `cd ../backend && pnpm start`
2. Generate types: `pnpm generate`
3. Start dev server: `pnpm dev`
4. Open http://localhost:5173

## Deploy to Vercel

- **Framework Preset**: SvelteKit
- **Root Directory**: `apps/web`
- **Build Command**: `cd ../.. && pnpm build --filter=web`
- **Environment Variables**: Set Supabase credentials
- **Corepack**: Add `ENABLE_EXPERIMENTAL_COREPACK=1`

See the [root README](../../README.md) for complete setup instructions.
