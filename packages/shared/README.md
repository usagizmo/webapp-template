# @repo/shared

Shared components, styles, types, constants, and utilities used across the monorepo apps.

See the [root README](../../README.md) for setup and commands.

## Structure

```text
src/
├── lib/     # SvelteKit library (components, types, constants, utils)
└── app.css  # Base Tailwind theme and styles
```

The `lib` directory follows the same organization as [apps/web](../../apps/web/) for consistency.

## Usage

This package is available across the monorepo automatically — no separate installation needed.

### Components, types, and constants

```typescript
import { Button } from '@repo/shared/components/ui/button';
import * as Card from '@repo/shared/components/ui/card';
import Meta from '@repo/shared/components/Meta.svelte';
import ModeSwitcherButton from '@repo/shared/components/ModeSwitcherButton.svelte';

import type { UserProfile } from '@repo/shared/types/user';
import { DEFAULT_EASE } from '@repo/shared/constants/easing';
```

### Styles

In your application's main CSS file:

```css
@import 'tailwindcss';
@source '../../../node_modules/@repo/shared/src';
@import 'tw-animate-css'; /* for shadcn animations */
@import '@repo/shared/app.css';
```

## Key Components

- **`Meta`** — SEO-friendly meta tags for page metadata
- **`ModeSwitcherButton`** — dark/light mode toggle integrated with mode-watcher
- **UI components** — [shadcn-svelte](https://www.shadcn-svelte.com/) primitives under `components/ui/`

```svelte
<script>
  import Meta from '@repo/shared/components/Meta.svelte';

  const meta = {
    title: 'Page Title',
    description: 'Page description',
    url: 'https://example.com/page',
    image: 'https://example.com/image.jpg',
  };
</script>

<Meta {...meta} />
```

## Theme

`app.css` defines the Tailwind theme via CSS custom properties:

- **Color scheme** — light/dark modes with `oklch` custom properties
- **Typography** — Inter and Noto Sans JP
- **Animations** — custom easing functions for smooth transitions
- **Spacing** — consistent radius values for rounded corners
