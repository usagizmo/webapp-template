# Next.js Template

Monorepo template for creating a web service with Next.js.

## Uses

- [Turborepo](https://turborepo.org/)
- [TypeScript](https://www.typescriptlang.org/) / [Prettier](https://prettier.io/)
- Node (`v16+`) / [pnpm](https://pnpm.io/)
- GitHub Actions (Formatting + Testing)
- [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) (w/ [renovate-approve](https://github.com/apps/renovate-approve))

### Apps and Packages

- [`firebase`](./apps/firebase/README.md):  
  [Firebase (Authentication/Firestore/Functions/Storage)](https://firebase.google.com/)
- [`hasura`](./apps/hasura/README.md):  
  [Hasura Cloud](https://hasura.io/)
- [`web`](./apps/web/README.md):  
  [Next.js](https://nextjs.org/) x [Tailwind CSS](https://tailwindcss.com/)  
  [pathpida](https://github.com/aspida/pathpida)  
  [NextAuth](https://next-auth.js.org/)  
  [React Query](https://react-query.tanstack.com/) (w/ [GraphQL Code Generator](https://www.graphql-code-generator.com/))  
  [Zustand](https://github.com/pmndrs/zustand)
- `config`:  
  [ESLint](https://eslint.org/)  
  eslint-config-next / eslint-config-prettier / eslint-plugin-import
- `lintstagedrc`:  
  [husky](https://github.com/typicode/husky) x [lint-staged](https://github.com/okonet/lint-staged)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Setup

```bash
pnpm i # Resolve dependency packages and prepare .env files
# Then, set it up

pnpm build   # Build all apps and packages
pnpm dev     # Set up file monitoring builds and local servers for development
pnpm lint    # eslint + prettier --check
pnpm format  # eslint --fix + prettier --write
```

## Registering environment variables for GitHub / Vercel

If you need to prepare the GitHub / Vercel environment, you will need to set the environment variables (the contents of `.env`) at build time.

## Deploy to Vercel

To use `pnpm`, configure the following settings in Vercel `Project Settings`.

`General` > `Build` & `Development Settings` > `INSTALL COMMAND`:

```bash
npm i pnpm -g && pnpm i
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
