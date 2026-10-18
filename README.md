# Pastore's Italian Delly

## Infrastructure

The five-page Vite website runs as a stateless, unprivileged nginx container on
Oracle ARM64. GitHub-hosted Actions check every long-lived branch. A push publishes
only that branch's immutable image and release; its independent Oracle updater
verifies a read-only candidate before replacing that environment.

| Branch | Website | GHCR package |
|---|---|---|
| `main` | https://pastores.xsolutionsmd.com | `pastore-s-italian-delly` |
| `derek-dev` | https://d-pastores.xsolutionsmd.com | `pastore-s-italian-delly-derek-dev` |
| `abdul-dev` | https://a-pastores.xsolutionsmd.com | `pastore-s-italian-delly-abdul-dev` |

Production requires an authorized PR into protected `main`. Preview pushes never
publish production. All environments currently serve the same text-only menu;
any later Derek-only menu variation must remain on his branch.

Run `python3 scripts/app.py check` for the application container checks. CI also
exercises the actual production/preview Compose settings and all five routes with
`scripts/check_oracle.py`. Operating commands, installation, rollback and retention
are documented in [Oracle deployment](docs/ORACLE_DEPLOYMENT.md).
