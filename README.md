# WebApp Template

Monorepo template for creating a web application.

## What's inside?

### Uses

- [Turborepo](https://turborepo.org/) x [pnpm](https://pnpm.io/)
- [Prettier](https://prettier.io/) (w/ [prettier-plugin-svelte](https://github.com/sveltejs/prettier-plugin-svelte) + [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss))
- [ESLint](https://eslint.org/) (w/ [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)) / [CSpell](https://cspell.org/)
- [lint-staged](https://github.com/okonet/lint-staged) / [husky](https://github.com/typicode/husky)
- GitHub Actions (Linting + Testing (Validate `href` and `src` paths))
- Execute `eslint --fix` and `prettier` when saving with VS Code

### Apps and Packages

#### `apps/`

- [`nhost`](./apps/nhost/)  
  Local environment test server and production [Nhost](https://nhost.io/) migration.
- [`mockup`](./apps/mockup/) [[Demo](https://webapp-template-mockup.usagizmo.com/)]  
  A starting point for building a static site.  
  [Tailwind CSS](https://tailwindcss.com/) + Vanilla JS + [Vitest](https://vitest.dev/) (Check links + file names)
- [`story`](./apps/story/)  
  Stories for the Svelte Components.  
  [Storybook](https://storybook.js.org/) (w/ [Svelte](https://svelte.jp/) + [Tailwind CSS](https://tailwindcss.com/))
- [`web`](./apps/web/) [[Demo](https://webapp-template.usagizmo.com/)]  
  A starting point for building Svelte application.  
  [SvelteKit](https://kit.svelte.dev/) (w/ [Tailwind CSS](https://tailwindcss.com/))  
  [Nhost](https://nhost.io/) (w/ [Houdini](https://www.houdinigraphql.com/)) / [Vitest](https://vitest.dev/)

#### `packages/`

- `ui`  
  A stub Svelte component library.
- `tailwind-preset-base`  
  A preset for use with `tailwind.config.js` and `global.css`.
- `eslint-config-custom`  
  `eslint` configurations. (w/ [prettier-plugin-svelte](https://github.com/sveltejs/prettier-plugin-svelte) + eslint-config-[[prettier](https://github.com/prettier/eslint-config-prettier)|[turbo](https://www.npmjs.com/package/eslint-config-turbo)])

### VS Code Extensions (Recommend)

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Breaking changes

### v1.6.0

- Change from TypeScript to JavaScript + JSDoc

### v1.0.0

- Change frontend framework (`apps/web`): [Next.js](https://nextjs.org/) → [SvelteKit](https://kit.svelte.jp/)
- Change repository name: `nextjs-template` → `webapp-template`

### v0.23.0

- Replace [Firebase](https://firebase.google.com/) (`apps/firebase`) and [Hasura](https://hasura.io/) (`apps/hasura`) apps with [Nhost](https://nhost.io/) (`apps/nhost`)

## Commands

```bash
pnpm i  # Resolve dependency packages and prepare .env files
# Then set up /.env

pnpm build   # Build all apps and packages
pnpm dev     # Set up file monitoring builds and local servers for development
pnpm lint    # eslint + markuplint | prettier --check
pnpm test    # Testing
pnpm format  # eslint --fix + prettier --write + format project-words.txt
```

## List of listening port numbers

- `1337`: `apps/nhost/` - Hasura
  - `3030`: Nhost Dashboard
  - `5432`: Postgres
  - `8080`: GraphQL Endpoint
  - `8025`: MailHog
  - `9695`: Hasura Console
- `5173`: `apps/web/` - SvelteKit application
- `6006`: `apps/story/` - Storybook
- `8000`: `apps/mockup/` - Static site
- `49160`: `apps/mockup/` - Express server

## Registering environment variables for GitHub / Vercel

If you need to prepare GitHub / Vercel environment, you need to set all environment variables (`.env` items) in each service.
