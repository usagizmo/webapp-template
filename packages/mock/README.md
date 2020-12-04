# `@nextjs-template/mock` (Mock HTML)

## Development

### Pinegrow

#### Activate Tailwind

1. [Open project] > Select `mock` directory
2. [File] > [Manage libraries & plugins...] > Activate `Tailwind`

#### Apply customized themes

1. Open [Settings & Tools.] > [Customize visual controls...] > Select `pages/styles.css`

※Every time you change the style in `@nextjs-template/postcss`, you need to customize visual controls on Pinegrow.

For details, check [here](https://pinegrow.com/docs/tailwind/customized-themes/).

## Basic Authentication on Vercel

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
    directory: __dirname + '/pages',
    onAuthFailed: (res) => {
      res.end('Authentication failed')
    },
  }
)

module.exports = app
" > index.js
```

Add the `vercel-build` command to `package.json`.

```diff
"build": "cross-env NODE_ENV=production postcss ../postcss/styles.css -o pages/styles.css",
+ "vercel-build": "yarn build",
```

### Deploy on Vercel

```bash
# Link
vercel link
# ? What’s your project’s name? <kebab-case-project-name>

# Set the `Environment Variables` in the Vercel.
vercel env add BASIC_USER
vercel env add BASIC_PASS
# ? What’s the value of BASIC_PASS? [hidden]
# ? Add BASIC_PASS to which Environments (select multiple)? Production, Preview, Development

# Develop
vercel dev

# Deploy
vercel
# Or integrate with Vercel and GitHub
# In that case, don't forget to set the `packages/mock` option to "Settings > General > Root Directory" on Vercel
```
