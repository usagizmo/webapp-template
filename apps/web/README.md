# `web` app

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

[[Demo](https://webapp-template.usagizmo.com/)]

## Commands

```bash
pnpm generate  # Copy Supabase types from backend/$generated to src/lib/$generated/
pnpm build     # Output `.svelte-kit/output/`
pnpm preview   # Preview the production build (after `pnpm build`)

pnpm dev       # start the server and open the app in a new browser tab on port 5173
pnpm lint      # markuplint + cspell + eslint + prettier
pnpm format    # Format with eslint + prettier
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deploy to Vercel (apps/web)

- Framework Preset: `SvelteKit`
- Root Directory: `apps/web`
- Environment Variables: Set 2 environment variables in `.env`
