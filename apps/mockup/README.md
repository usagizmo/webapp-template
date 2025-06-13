# Mockup (Static Site)

Static site generator for rapid prototyping with [Tailwind CSS](https://tailwindcss.com/) and Vanilla JS.

[[Demo](https://webapp-template-mockup.usagizmo.com/)]

## Commands

```bash
pnpm dev              # Start development server (port 3000)
pnpm build            # Build static site
pnpm test             # Validate links and images
pnpm lint             # Run linting
pnpm format           # Format with Prettier
pnpm deploy           # Deploy to server (rsync)

# Utilities
pnpm add-size-to-img  # Add width/height to <img> tags
pnpm clean-image      # Remove unused images
```

## Development

1. Start dev server: `pnpm dev`
2. Open http://localhost:3000
3. Edit files in `src/` and see live changes

## Deploy to Vercel

- **Framework Preset**: Other
- **Root Directory**: `apps/mockup`
- **Build Command**: `cd ../.. && pnpm build --filter=mockup`

## External Links Testing

The `tests/external-links.txt` file tracks external URLs found in HTML.
Run `pnpm test` to validate all links and generate this file if needed.

See the [root README](../../README.md) for complete setup instructions.
