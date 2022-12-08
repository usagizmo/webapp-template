# `web` app

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

[[Demo](https://webapp-template.usagizmo.com/)]

## A few words

- When GraphQL errors occur, it is usually due to Hasura's Permissions.

## Commands

```bash
pnpm generate  # Output `.svelte-kit` and `schema.graphql`
pnpm build     # Output `.svelte-kit/output/`
pnpm preview   # Preview the production build (after `pnpm build`)

pnpm dev       # start the server and open the app in a new browser tab on port 3000
pnpm lint      # markuplint + cspell + eslint
pnpm format    # Format with `prettier`

# Others
pnpm package
pnpm check[:watch]
```

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deploy to Vercel (apps/web)

- Framework Preset: `SvelteKit`
- Root Directory: `apps/web`
- Environment Variables: Set 5 environment variables in `env`
