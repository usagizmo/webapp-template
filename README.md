# Next.js Template

- [Lerna](https://github.com/lerna/lerna) (with Yarn)
- GitHub Actions (test + commit to format)

## `@nextjs-template/app`

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)
- [Zustand](https://github.com/pmndrs/zustand)
- [react-mitt](https://www.npmjs.com/package/react-mitt)
- [react-use](https://github.com/streamich/react-use)
- [react-spring](https://www.react-spring.io/)
- `@nextjs-template/postcss`
- `@nextjs-template/graphql`

## `@nextjs-template/mock`

- [Pinegrow](https://pinegrow.com/)
- [Alpine.js](https://github.com/alpinejs/alpine)
- `@nextjs-template/postcss`

## `@nextjs-template/postcss`

- [PostCSS](https://postcss.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## `@nextjs-template/graphql`

- [GraphQL Code Generator](https://graphql-code-generator.com/)

# Development

```
# setup .env
cp -i packages/app/.env.local.example packages/app/.env.local
cp -i packages/graphql/.env.example packages/graphql/.env

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

# graphql
cd packages/graphql
yarn build  #=> Output files to `/generated/*` and `/dist/*`
```

# Lerna x Yarn Workspaces

```
# Install common npm package
yarn add -D <package-name> -W

# Install @nextjs-template/postcss to @nextjs-template/app in devDependencies
npx lerna add -D @nextjs-template/postcss --scope=@nextjs-template/app
```

# References

- [NextJS TypeScript Boilerplate](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest)
