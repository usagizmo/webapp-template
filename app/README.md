# `app` (Next.js) or static mock html

## How to use

Install it and run:

```bash
yarn
yarn dev
```

## Develop mock

```bash
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

## Basic Authentication (`mock/pages/` on Vercel)

```bash
# Add packages
yarn add -D static-auth safe-compare
```

```bash
# vercel.json
printf "{
  \"builds\": [
    {
      \"src\": \"index.js\",
      \"use\": \"@vercel/node\"
    }
  ],
  \"routes\": [{ \"src\": \"/.*\", \"dest\": \"index.js\" }]
}
" > vercel.json

# index.js
printf "const protect = require('static-auth')
const safeCompare = require('safe-compare')

const app = protect(
  '/',
  (username, password) =>
    safeCompare(username, process.env.BASIC_USER) && safeCompare(password, process.env.BASIC_PASS),
  {
    directory: __dirname + '/mock/pages',
    onAuthFailed: (res) => {
      res.end('Authentication failed')
    },
  }
)

module.exports = app
" > index.js
```

```bash
# Develop
vercel dev
# ? What’s your project’s name? <kebab-case-project-name>

# Deploy
vercel
```

Set the `Environment Variables` in the Vercel.

```bash
vercel env add BASIC_USER
vercel env add BASIC_PASS

# ? What’s the value of BASIC_PASS? [hidden]
# ? Add BASIC_PASS to which Environments (select multiple)? Production, Preview, Development
```

## (Optional) Basic Authentication (SSR - Draft)

```
yarn add nextjs-basic-auth-middleware

# The environment variable BASIC_AUTH_CREDENTIALS can be set to perform basic authentication.
# In the local environment
echo "BASIC_AUTH_CREDENTIALS={USERNAME}:{PASSWORD}" > .env.local
```

Add `app/src/pages/_document.tsx`

```tsx
import Document, { DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // TODO: fix it
    if (ctx.req && ctx.res) {
      await basicAuthMiddleware(ctx.req, ctx.res, {})
    }
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }
}

export default MyDocument
```
