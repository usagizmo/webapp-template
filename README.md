# Next.js Template

Monorepo template for creating a web service with Next.js.

## Uses

- [Turborepo](https://turborepo.org/) x [pnpm](https://pnpm.io/)
- [Prettier](https://prettier.io/) / [ESLint](https://eslint.org/) (w/ [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import))
- [lint-staged](https://github.com/okonet/lint-staged) / [husky](https://github.com/typicode/husky)
- [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) (w/ [renovate-approve](https://github.com/apps/renovate-approve))
- GitHub Actions (Linting + Formatting)
- Execute `eslint --fix` and `prettier` when saving with VS Code

### Apps and Packages

- **Apps**

  - [`nhost`](./apps/nhost/README.md):  
    [Nhost](https://nhost.io/) dev server for prod/test server migration
  - [`mockup`](./apps/mockup/README.md): [[Demo](https://nextjs-template-mockup.usagizmo.com/)]  
    A starting point for building a static site.
  - [`storybook`](./apps/storybook/README.md): [[Demo](https://nextjs-template-storybook.usagizmo.com/)]  
    [Storybook](https://storybook.js.org/) for `apps/web`.
  - [`web`](./apps/web/README.md): [[Demo](https://nextjs-template.usagizmo.com/)]  
    A starting point for building a Next.js application.  
    [Next.js](https://nextjs.org/) x [Tailwind CSS](https://tailwindcss.com/) (w/ [TypeScript](https://www.typescriptlang.org/))  
    Page Transition ([react-transition-group](https://reactcommunity.org/react-transition-group/) x [GSAP](https://greensock.com/gsap/))  
    [pathpida](https://github.com/aspida/pathpida) / [Jotai](https://jotai.org/)  
    [Nhost](https://nhost.io/) (w/ [Apollo Client](https://www.apollographql.com/apollo-client) x [GraphQL Code Generator](https://www.graphql-code-generator.com/))

- **Packages**

  - `constatns`: As the name implies
  - `eslint-preset`: The base preset for [ESLint](https://eslint.org/)  
    inc. `eslint-config-next` / `eslint-config-prettier` / `eslint-plugin-import`
  - `generated`: The files output from graphql-codegen
  - `lintstagedrc`: The settings for applying [husky](https://github.com/typicode/husky) x [lint-staged](https://github.com/okonet/lint-staged) in each JS/TS file
  - `pathtest-utils`: The utilities used in `apps/mockup` for URL checking
  - `script-modules`: static site script used in `apps/mockup`
  - `tailwind-preset`: The base preset for Tailwind CSS  
    inc. `postcss.config.cjs` / `@tailwindcss/typography`
  - `tsconfig`: The base `tsconfig.json`
  - `types`: Various types
  - `utils`: Simple utilities

### VS Code Extensions (Recommend)

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint) / [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) / [webhint](https://marketplace.visualstudio.com/items?itemName=webhint.vscode-webhint)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) / [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Commands

```bash
pnpm i  # Resolve dependency packages and prepare .env files
# Then set up /.env

pnpm build   # Build all apps and packages
pnpm dev     # Set up file monitoring builds and local servers for development
pnpm lint    # eslint + prettier --check
pnpm format  # eslint --fix + prettier --write
pnpm clean   # rm .turbo, node_module and generated files
```

## List of listening port numbers

- `1337`: `apps/nhost/` - Hasura
  - `* (auto)`: GraphQL Endpoint
  - `* (auto)`: MailHog
- `3000`: `apps/web/` - Next.js application
- `6006`: `apps/storybook/` - Storybook
- `8000`: `apps/mockup/` - Static site
- `49160`: `apps/mockup/` - Express server

## Registering environment variables for GitHub / Vercel

If you need to prepare GitHub / Vercel environment, you need to set environment variables (`.env` items) in each service.

## Deploy to Vercel

ref: https://vercel.com/docs/concepts/git/monorepos#setup-turborepo

Make the following settings in Vercel's `Project Settings`.
※Change the <mockup/storybook/web> parts below

- `General` > `Build` & `Development Settings`
  - `BUILD COMMAND`: `cd ../.. && pnpm exec turbo run build --scope=<mockup/storybook/web> --include-dependencies --no-deps`
  - `OUTPUT DIRECTORY`:
    - for `mockup`: `public`
    - for `storybook`: `storybook-static`
- `General` > `Root Directory`: `apps/<mockup/storybook/web>`
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
