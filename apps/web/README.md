# Web App ([SvelteKit](https://svelte.dev/docs/kit/))

Production-ready SvelteKit app with a page-based component organization and class-based design patterns.

See the [root README](../../README.md) for the tech stack, setup, commands, and deployment.

[[Demo](https://webapp-template.usagizmo.com/)]

## Architecture

```text
src/lib/
├── components/
│   ├── pages/           # Page-specific components (auth, home, layout)
│   └── ui/              # Reusable UI components (shadcn-svelte)
├── constants/           # Application constants
├── helpers/             # Business logic and API operations (pure functions)
├── schemas/             # Valibot validation schemas
├── stores/              # Class-based state management
│   └── local/           # Component-scoped stores
├── types/               # TypeScript type definitions
└── utils/               # Generic utility functions
```

**Layer communication rules** (enforced by [`@repo/eslint-config`](../../packages/eslint-config/)):

- **Components** access Helpers via Stores/LocalStores (direct Helper dependency is prohibited)
- **Stores/LocalStores** can access Helpers directly and pass state to them for execution
- **Helpers/Utils** cannot depend on Stores — they must be pure functions that receive values as arguments

This keeps Helpers/Utils testable, enforces unidirectional data flow, and improves type inference through dependency injection.

## State Management

Class-based stores using the Svelte 5 Runes API (`$state`, `$derived`):

| Type            | Location                  | Instantiation         | Purpose                          |
| --------------- | ------------------------- | --------------------- | -------------------------------- |
| **Stores**      | `src/lib/stores/index.ts` | Singleton (automatic) | Application-wide shared state    |
| **LocalStores** | `src/lib/stores/local/`   | `new` in component    | Component-scoped state and logic |

Singleton stores: `supabaseStore`, `userStore`, `commentStore`.
