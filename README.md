# Next.js Template

From: NextJS Typescript Boilerplate  
https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest

> Bootstrap a developer-friendly NextJS app configured with:
> 
> - [Typescript](https://www.typescriptlang.org/)
> - Linting with [ESLint](https://eslint.org/)
> - Formatting with [Prettier](https://prettier.io/)
> - Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
> - Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

In addition,

- [Pinegrow](https://pinegrow.com/)
- [PostCSS](https://postcss.org/) x [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Storybook](https://storybook.js.org/)
- [react-mitt](https://www.npmjs.com/package/react-mitt)
- [react-use](https://github.com/streamich/react-use)
- [react-spring](https://www.react-spring.io/)

## How to use

Install it and run:

```bash
cd app
yarn
yarn dev
```

## Develop mock

```bash
cd app
yarn mock:dev #=> Run `browser-sync`, then watch `mock/pages` files

# Output mock/pages/styles.css
yarn mock:build
yarn mock:build:watch #=> Build and watch mock css files
yarn mock:build:prod  #=> cssnano + purge
```

## Pinegrow

### Activate Tailwind

1. [Open project] > Select `mock` directory
2. [File] > [Manage libraries & plugins...] > Activate `Tailwind`

### Apply customized themes

1. Open [Settings & Tools.] > [Customize visual controls...] > Select `pages/styles.css`

For details, check [here](https://pinegrow.com/docs/tailwind/customized-themes/).

## (Optional) Basic Authentication

```
cd app
yarn add nextjs-basic-auth-middleware

# The environment variable BASIC_AUTH_CREDENTIALS can be set to perform basic authentication.
# In the local environment
echo "BASIC_AUTH_CREDENTIALS={USERNAME}:{PASSWORD}" > .env.local
```

Add `app/src/pages/_document.tsx`

```tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import basicAuthMiddleware from 'nextjs-basic-auth-middleware'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    if (ctx.req && ctx.res) {
      await basicAuthMiddleware(ctx.req, ctx.res, {})
    }
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

## (Optional) How to use husky

```bash
# In the repository root directory
yarn # setup husky and lint-staged

ls -la .git/hooks
# If you see the *.sample file, do the following

rm -rf .git/hooks
yarn add -D husky

# Make sure that all the *.sample have been removed
ls -la .git/hooks
```
