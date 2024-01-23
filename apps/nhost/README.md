# `nhost` app

Local environment for backend using [Nhost CLI](https://docs.nhost.io/development/cli/getting-started) (`v1.12`).

## Commands

```bash
nhost up             # Start the dev server
nhost down           # Stop the dev server
nhost logs --follow  # Show logs
nhost help           # Show help
nhost config show    # Show config
```

## Environment variables

Environment variables are specified in `[[global.environment]]` of nhost/nhost.toml.
If you want to use different values for production and development environments, set the values in .secrets and specify them.

## Secrets

Copy .secrets.example to .secrets

## (Nhost) Production settings

- Deployment Branch: `main`
- Base Directory: `./apps/nhost/`
