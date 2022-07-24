# `mockup` app

A starting point for building a static site.

[[Demo](https://nextjs-template-mockup.usagizmo.com/)]

## Commands

```bash
pnpm build     # Build and then output to `public/*`
pnpm dev       # Watch build files and launch browser-sync server on port 8000
pnpm lint      # Linting
pnpm list:fix  # Format with `eslint --fix`
pnpm test      # Testing
pnpm clean     # Delete `node_modules` etc.

# `commands/*`
pnpm clean-image  # Remove unused image files in `public/images/*`
pnpm deploy       # When deploying to a VPS such as DigitalOcean using `rsync`
```

## Subresource Integrity

You can use the openssl command to generate an SRI hash.

```bash
curl "<url>" | openssl dgst -sha384 -binary | openssl base64 -A
```

Ref: [Subresource Integrity - Web security | MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)

### With Basic Authentication

```bash
# Add packages
pnpm add -D express express-basic-auth cors
```

Run the following, then change the `username` and `password` in `index.cjs`.

```bash
# vercel.json
printf "{
  \"builds\": [
    {
      \"src\": \"index.cjs\",
      \"use\": \"@vercel/node\"
    }
  ],
  \"routes\": [{ \"src\": \"/.*\", \"dest\": \"index.cjs\" }]
}
" > vercel.json

# index.cjs
printf "const path = require('path')
const cors = require('cors')
const express = require('express')
const basicAuth = require('express-basic-auth')
const app = express()

// Local runtime port number
// Any number will be ignored by Vercel and will work
const port = 49160

app.use(cors())

app.use(
  basicAuth({
    users: {
      <username>: '<password>'
    },
    challenge: true,
  })
)

app.use(express.static(path.join(__dirname, '/public')))

app.listen(port, () => {
  console.log(\`Listening on port \${port}\`)
})

module.exports = app
" > index.cjs
```

Add the `vercel-build` command to `package.json`.

```diff
"build": "turbo run build",
+ "vercel-build": "npm run build",
```

Make the following settings in Vercel's `Project Settings`.

- `General` > `Root Directory`: `apps/mockup`
  - [x] Include source files outside of the Root Directory in the Build Step.
