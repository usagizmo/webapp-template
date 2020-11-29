# Next.js Template

From: NextJS TypeScript Boilerplate  
https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest

> Bootstrap a developer-friendly NextJS app configured with:
>
> - [Typescript](https://www.typescriptlang.org/)
> - Linting with [ESLint](https://eslint.org/)
> - Formatting with [Prettier](https://prettier.io/)
> - Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
> - Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

In addition,

- [Lerna](https://github.com/lerna/lerna) (with Yarn)
- [Pinegrow](https://pinegrow.com/)
- [PostCSS](https://postcss.org/) x [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [react-mitt](https://www.npmjs.com/package/react-mitt)
- [react-use](https://github.com/streamich/react-use)
- [react-spring](https://www.react-spring.io/)
- GitHub Actions (test + commit to format)

# Development

```
# setup .env
cp packages/app/.env.local.example packages/app/.env.local
cp packages/graphql/.env.example packages/graphql/.env

# Initialize
yarn
yarn build

# app
cd packages/app
yarn dev

# mock
cd packages/mock
yarn dev
yarn build  #=> Output /pages/styles.css (cssnano + purge)

# postcss
cd packages/postcss
yarn dev  #=> watch for formatting
```

# Lerna x Yarn Workspaces

```
# Install common npm package
yarn add -W --D <package-name>

# Install @nextjs-template/postcss to @nextjs-template/app in devDependencies
npx lerna add -D @nextjs-template/postcss --scope=@nextjs-template/app
```
