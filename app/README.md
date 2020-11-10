# `app` (Next.js or mock html)

## How to use

Install it and run:

```bash
yarn # install packages
yarn dev
```

## Develop mock

When coding a mock in Pinegrow x Tailwind CSS.

```bash
yarn mock:dev #=> Run `browser-sync`, then watch `mock/pages` files

# Output mock/pages/styles.css
yarn mock:build
yarn mock:build:watch #=> Build and watch mock css files
yarn mock:build:prod  #=> cssnano + purge
```

### Pinegrow

#### Activate Tailwind

1. [Open project] > Select `mock` directory
2. [File] > [Manage libraries & plugins...] > Activate `Tailwind`

#### Apply customized themes

1. Open [Settings & Tools.] > [Customize visual controls...] > Select `pages/styles.css`

For details, check [here](https://pinegrow.com/docs/tailwind/customized-themes/).

## Basic Authentication (`mock/pages/` or `out/`) on Vercel

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

### When you want to publish `mock/pages/`.

Update `build` command in `package.json`.

```diff
- "build": "next build",
+ "build": "yarn mock:build:prod",
```

### When you want to publish `out/`.

Update `build` command in `package.json`.

```diff
- "build": "next build",
+ "build": "next build && next export",
```

Then, fix the publishing directory in `index.js`.

```diff
- directory: __dirname + '/mock/pages',
+ directory: __dirname + '/out',
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
# In that case, don't forget to set the `app` option to "Settings > General > Root Directory" on Vercel
```
