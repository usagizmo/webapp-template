# `mockup` app

A starting point for building a static site.

[[Demo](https://webapp-template-mockup.usagizmo.com/)]

## Commands

```bash
pnpm build       # Output `public/styles.css`
pnpm dev         # Watch input.css and launch browser-sync server on port 8000
pnpm lint        # markuplint + cspell
pnpm test        # Check links (href/src) + image file names
pnpm format      # Format with `prettier`

# `commands/*`
pnpm add-size-to-img  # Add width, height attributes to <img /> based on actual image size
pnpm clean-image      # Remove unused image files in `public/images/*`
pnpm deploy           # When deploying to a VPS such as DigitalOcean using `rsync`
```

## tests/external-links.txt

This is a list of external URLs or non-existent file paths specified by links (`href/src`) in HTML files.
If this file does not exist, it is output by `pnpm test`.
If present, test for any changes to the content.

## Deploy to Vercel (apps/mockup)

- Framework Preset: `Other`
- Root Directory: `apps/mockup`
- Build Command: `cd ../.. && npx turbo run build --filter=mockup`

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
printf "const path = require('path');
const cors = require('cors');
const express = require('express');
const basicAuth = require('express-basic-auth');
const app = express();

// Local runtime port number
// Any number will be ignored by Vercel and will work
const port = 49160;

app.use(cors());

app.use(
  basicAuth({
    users: {
      <username>: '<password>',
    },
    challenge: true,
  })
);

app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
  console.log(\`Listening on http://localhost:\${port}\`);
});

module.exports = app;
" > index.cjs
```

You can verify basic authentication by running `node index.cjs`.
