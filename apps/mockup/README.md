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

### With Basic Authentication (Draft)

```bash
# Add packages
pnpm add -D static-auth safe-compare
```

Run the following, then change the `username` and `password` in `index.js`.

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
printf "const path = require('path')
const protect = require('static-auth')
const safeCompare = require('safe-compare')
const directory = path.join(__dirname, '/apps/web/public')

const app = protect(
  '/',
  (username, password) =>
    safeCompare(username, '<username>') && safeCompare(password, '<password>'),
  {
    directory,
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
"build": "turbo run build",
+ "vercel-build": "npm run build",
```
