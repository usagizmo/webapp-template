# Next.js Template

Monorepo template for creating a web service with Next.js.

## Uses

- [Turborepo](https://turborepo.org/) x [pnpm](https://pnpm.io/)
- [Prettier](https://prettier.io/) / [ESLint](https://eslint.org/) (w/ [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import))
- [lint-staged](https://github.com/okonet/lint-staged) / [husky](https://github.com/typicode/husky)
- [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) (w/ [renovate-approve](https://github.com/apps/renovate-approve))
- GitHub Actions (Formatting + Linting)
- Execute `eslint --fix` and `prettier` when saving with VS Code

### Apps and Packages

- **Apps**
  - [`web`](./apps/web/README.md):  
    [Next.js](https://nextjs.org/) x [Tailwind CSS](https://tailwindcss.com/) (w/ [TypeScript](https://www.typescriptlang.org/))
    [pathpida](https://github.com/aspida/pathpida) / [NextAuth](https://next-auth.js.org/) / [Zustand](https://github.com/pmndrs/zustand)  
    [React Query](https://react-query.tanstack.com/) (w/ [GraphQL Code Generator](https://www.graphql-code-generator.com/))  
    [Storybook](https://storybook.js.org/)
- **Packages**
  - `constatns`: As the name implies
  - `eslint-preset`: The base preset for [ESLint](https://eslint.org/)  
    Include eslint-config-next / eslint-config-prettier / eslint-plugin-import
  - `generated`: The files output from graphql-codegen
  - `lintstagedrc`: The settings for applying [husky](https://github.com/typicode/husky) x [lint-staged](https://github.com/okonet/lint-staged) in each JS/TS file
  - `tailwind-config-base`: The base config for Tailwind CSS
  - `tsconfig`: The base `tsconfig.json`
  - `types`: Various types
  - `ui`: Common components
  - `utils`: Simple utilities
- **Services**
  - [`firebase`](./services/firebase/README.md):  
    [Firebase (Authentication/Firestore/Functions/Storage)](https://firebase.google.com/) settings.
  - [`hasura`](./services/hasura/README.md):  
    [Hasura Cloud](https://hasura.io/) settings.

## Commands

```bash
pnpm i # Resolve dependency packages and prepare .env files
# Then set up /.env

pnpm build   # Build all apps and packages
pnpm dev     # Set up file monitoring builds and local servers for development
pnpm lint    # eslint + prettier --check
pnpm format  # eslint --fix + prettier --write
pnpm clean   # rm .turbo, node_module and generated files
```

## Registering environment variables for GitHub / Vercel

If you need to prepare the GitHub / Vercel environment, you will need to set the environment variables (the contents of `.env`) at build time.

## Deploy to Vercel

Make the following settings in Vercel's `Project Settings`.

- `General` > `Build` & `Development Settings` > `INSTALL COMMAND`:  
  `npm i pnpm -g && pnpm i`
- `General` > `Root Directory`: `apps/web/`
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
      - `Vercel`
