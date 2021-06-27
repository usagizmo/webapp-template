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
- `@nextjs-template/graphql`

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

# graphql
cd packages/graphql
yarn build  #=> Output files to `/generated/*` and `/dist/*`
```

# Lerna x Yarn Workspaces

```
# Install common npm package
yarn add -D <package-name> -W
```

# References

- [NextJS TypeScript Boilerplate](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest)
