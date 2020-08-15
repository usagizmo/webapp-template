# NextJS Template

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
- [Recoil](https://recoiljs.org/)
- [Storybook](https://storybook.js.org/)
- [react-mitt](https://www.npmjs.com/package/react-mitt)
- [react-use](https://github.com/streamich/react-use)

## How to use

Install it and run:

```bash
yarn
yarn dev
```

## Pinegrow

### Output pinegrow/pages/styles.css
```bash
yarn build:tailwindcss
yarn build:tailwindcss:prod #=> cssnano + purge
```

### Set up Tailwind CSS

#### Activate Tailwind

1. [Open project] > Select `pinegrow` directory
2. [File] > [Manage libraries & plugins...] > Activate `Tailwind`

#### Apply customized themes

1. Open [Settings & Tools.] > [Customize visual controls...] > Select customized CSS file

For details, check [here](https://pinegrow.com/docs/tailwind/customized-themes/).

#### Update components

1. Open [Class Styles.] Panel > [Update whole project & save changes]

For details, check [here](https://pinegrow.com/docs/tailwind/class-styles/).

## What if husky doesn't work?

```bash
rm -rf .git/hooks
yarn add -D husky

# Check *.sample is removed
ls -la .git/hooks/
```
