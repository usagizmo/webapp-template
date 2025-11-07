# @repo/shared

Shared components, styles, types, constants, and utilities.

## Overview

This package contains all the common code shared between applications in the monorepo. It includes:

- **UI Components**: [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) components and custom components
- **Styles**: `app.css` - Base Tailwind CSS styles
- **Shared logic**: Types, constants, and utility functions

## Structure

```text
src/
├── lib/     # SvelteKit app structure
└── app.css  # Base styles and Tailwind theme
```

The `lib` directory structure follows the same organization pattern as [apps/web](../apps/web/) for consistency.

## Usage

### Installation

This package is automatically available in the monorepo. No separate installation needed.

### Importing Components

```typescript
// UI Components
import { Button } from '@repo/shared/components/ui/button';
import * as Card from '@repo/shared/components/ui/card';

// Other Components
import Meta from '@repo/shared/components/Meta.svelte';
import ModeSwitcherButton from '@repo/shared/components/ModeSwitcherButton.svelte';
```

### Importing Types

```typescript
import type { UserProfile } from '@repo/shared/types/user';
```

### Importing Constants

```typescript
import { DEFAULT_EASE } from '@repo/shared/constants/easing';
```

### Importing Styles

In your application's main CSS file:

```css
@import 'tailwindcss';
@source '../../../node_modules/@repo/shared/src';
@import 'tw-animate-css'; // for shadcn animations
@import '@repo/shared/app.css';
```

## Components

### UI Components

All UI components are built using [shadcn-svelte](https://www.shadcn-svelte.com/) and follow consistent design patterns:

### Meta Component

SEO-friendly meta tags component for setting page metadata:

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

### ModeSwitcherButton

Dark/light mode toggle button integrated with mode-watcher:

```svelte
<script>
  import ModeSwitcherButton from '@repo/shared/components/ModeSwitcherButton.svelte';
</script>

<ModeSwitcherButton />
```

## Theme Configuration

The package includes a comprehensive Tailwind CSS theme configuration in `app.css`:

- **Color Scheme**: Supports light and dark modes with CSS custom properties
- **Typography**: Uses Inter and Noto Sans JP fonts
- **Animations**: Custom easing functions for smooth transitions
- **Spacing**: Consistent radius values for rounded corners

### CSS Variables

The theme uses CSS custom properties for easy customization:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... and more */
}
```

## Commands

```bash
bun dev     # Watch mode for development
bun build   # Build package with svelte-package
bun lint    # Run linting
bun format  # Format code
```
