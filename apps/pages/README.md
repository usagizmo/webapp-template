# Pages (Static Site Publishing)

Static site builder with built-in quality assurance — link validation, image optimization, and HTML/accessibility checks — using [Tailwind CSS](https://tailwindcss.com/), vanilla JS, and [markuplint](https://markuplint.dev/).

See the [root README](../../README.md) for commands and deployment.

[[Demo](https://webapp-template-pages.usagizmo.com/)]

## Workflow

1. **Develop** — `bun run dev` serves `public/` at http://localhost:3000 with live reload. Edit the HTML/CSS directly.
2. **Size images while coding** _(optional)_ — `bun run add-size-to-img` bulk-adds `width`/`height` to every `<img>` for better Core Web Vitals.
3. **Validate** — `bun run test` confirms internal `href`/`src` paths resolve and tracks external links (see [Quality Assurance](#quality-assurance)); `bun run lint` runs markuplint and `bun run format` applies Prettier. These also run on commit via husky. If `bun run test` fails because links changed on purpose, run `bun run test:update` and review the `tests/external-links.txt` diff.
4. **Clean up images** — `bun run clean-images` removes images under `public/images/` that nothing references. It uses `git rm`, so removals are staged and recoverable; `bun run clean-images --dry-run` previews without deleting.
5. **Deploy** — `bun run build` compiles Tailwind, then `bun run deploy` uploads `public/` to your server with rsync (`DEPLOY_TARGET` — point it at staging or production).

## Quality Assurance

### Link Validation

`tests/external-links.txt` tracks every external URL found in the HTML files. `bun run test` fails when the current set diverges from this snapshot, so link changes are reviewed deliberately rather than slipping in unnoticed:

1. When URLs change, run `bun run test:update` to regenerate the snapshot
2. Review the `tests/external-links.txt` diff
3. Commit it alongside the content change

### Image Optimization

- `bun run add-size-to-img` adds `width`/`height` to `<img>` tags for better Core Web Vitals
- `bun run clean-images` removes images under `public/images/` that nothing references; `bun run clean-images --dry-run` previews the removals first

### HTML Standards

`bun run lint` runs markuplint to enforce semantic HTML, accessibility compliance, and SEO best practices.
