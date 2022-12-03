# WebApp Template

Monorepo template for creating a web application.

## What's inside?

### Uses

- [Turborepo](https://turborepo.org/) x [pnpm](https://pnpm.io/)
- [Prettier](https://prettier.io/) (w/ [prettier-plugin-svelte](https://github.com/sveltejs/prettier-plugin-svelte) + [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss))
- [ESLint](https://eslint.org/) (w/ [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import))
- [lint-staged](https://github.com/okonet/lint-staged) / [husky](https://github.com/typicode/husky)
- [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) (w/ [renovate-approve](https://github.com/apps/renovate-approve))
- GitHub Actions (Linting + Testing)
- Execute `eslint --fix` and `prettier` when saving with VS Code

### Apps and Packages

#### `apps/`

- [`nhost`](./apps/nhost/README.md):  
  [Nhost](https://nhost.io/) a prod/test server for migration to Nhost
- [`mockup`](./apps/mockup/README.md): [[Demo](https://webapp-template-mockup.usagizmo.com/)]  
  a starting point for building a static site.  
  [Tailwind CSS](https://tailwindcss.com/) + Vanilla JS (w/ [GSAP](https://greensock.com/gsap/))
- [`web`](./apps/web/README.md): [[Demo](https://webapp-template.usagizmo.com/)]  
  a starting point for building a svelte application.  
  [SvelteKit](https://kit.svelte.dev/) (w/ [Tailwind CSS](https://tailwindcss.com/) + [TypeScript](https://www.typescriptlang.org/))  
  [Nhost](https://nhost.io/) (w/ [Apollo Client](https://www.apollographql.com/apollo-client) x [GraphQL Code Generator](https://www.graphql-code-generator.com/))

#### `packages/`

- `ui`: a stub Svelte component library
- `eslint-config-custom`: `eslint` configurations (w/ `eslint-plugin-svelte` and `eslint-config-prettier`)

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

pnpm build   # Build all apps and packages
pnpm dev     # Set up file monitoring builds and local servers for development
pnpm lint    # eslint + markuplint | prettier --check
pnpm format  # eslint --fix + prettier --write
```

## List of listening port numbers

- `1337`: `apps/nhost/` - Hasura
  - `* (auto)`: GraphQL Endpoint
  - `* (auto)`: MailHog
- `3000`: `apps/web/` - SvelteKit application
- `8000`: `apps/mockup/` - Static site
- `49160`: `apps/mockup/` - Express server

## Registering environment variables for GitHub / Vercel

If you need to prepare GitHub / Vercel environment, you need to set environment variables (`.env` items) in each service.

## Deploy to Vercel

ref: https://vercel.com/docs/concepts/git/monorepos#setup-turborepo

Make the following settings in Vercel's `Project Settings`.
※Change the <mockup/storybook/web> parts below

- `General` > `Build` & `Development Settings`
  - `BUILD COMMAND`: `cd ../.. && pnpm exec turbo run build --scope=<mockup/web> --include-dependencies --no-deps`
  - `OUTPUT DIRECTORY`:
    - for `mockup`: `public`
- `General` > `Root Directory`: `apps/<mockup/web>`
  - [x] Include source files outside of the Root Directory in the Build Step.

## How to check for dependent packages

```bash
# If graphviz is not installed
# ref: https://graphviz.org/download/
brew install graphviz

# Output a graph to check dependencies
pnpm build -- --graph
```

## Use renovate on GitHub

Give [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) and [renovate-approve](https://github.com/apps/renovate-approve) permission to operate the repository.

Then change your GitHub settings as follows.

`Settings` > `Branches` > `Branch protection rule`

- Branch name pattern: `main`
- Protect matching branches:
  - [x] Require a pull request before merging
    - [x] Require approvals: `[1]`
  - [x] Require status checks to pass before merging
    - Status checks that are required:
      - `Build (Node 16 on ubuntu-latest)`
      - `Vercel – <project-name-on-vercel>`
      - ...
