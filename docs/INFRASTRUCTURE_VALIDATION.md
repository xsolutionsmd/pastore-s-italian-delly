# Infrastructure bootstrap — October 18, 2026

This is a dated operating record, not a claim of formal visual acceptance.
Current deployed revisions always come from each HTTPS `/version.json` and its
matching `/var/lib/<slug>-deploy/current.json`.

## Initial managed release

All three push-triggered Oracle workflows and their Application CI checks passed
at source `b0feca2890dd8c3d4ab88025113ca4febf0cbe01`:

| Environment | Push workflow | Initial immutable image digest |
|---|---|---|
| Production | [39143758829](https://github.com/xsolutionsmd/pastore-s-italian-delly/actions/runs/39143758829) | `sha256:e4d2587895da9a2a22bfa1dd56aa11d6b388d3942af6820d0403ef8fefbed12a` |
| Derek | [39143759683](https://github.com/xsolutionsmd/pastore-s-italian-delly/actions/runs/39143759683) | `sha256:cc77f798da627cc030b5b35645f60f50afc5e3d0e21f958d4364c6d65915904c` |
| Abdul | [39143759426](https://github.com/xsolutionsmd/pastore-s-italian-delly/actions/runs/39143759426) | `sha256:c284011ebaec566ba9bcd7f94a5766c7957768c0c616d274c3f22c1d9ad93d86` |

The public source repository uses standard `ubuntu-latest` GitHub-hosted runners.
The normal package pages displayed Public for all three GHCR packages. Oracle
successfully pulled each digest with a new empty Docker credential directory.
No credentials were copied to GitHub or into repository files.

Each independent live container was healthy, ARM64, read-only, had no public port
binding or persistent mount, and exported its intended `APP_ENVIRONMENT`. All three
updater timers were enabled and active, with independent locks, release state,
templates, retention registrations and successful-update observers.

## Application preservation and HTTP checks

The application, runtime and Dockerfile are unchanged from accepted frontend
`a9d3209672c9ced5bbb048bfbbed053bd3589200`. All three branches initially shared the
same commit. The 32 served application/asset files, excluding `/version.json`, had
the same sorted manifest hash in all environments:

`7ef6949317a3d558495813471a43c15a929d319b3b9c7456eb5b18ebeaffd85b`

Normal certificate-validated HTTPS checks passed on `/`, `/menu/`, `/catering/`,
`/our-story/` and `/visit/`, plus health, uncached version, 15 linked assets, distinct
page titles, noindex headers/metadata and real missing-asset 404s. The menu retained
147 Toast-linked rows in 17 groups and stayed text-only in every environment.
The source content check reconciles names, prices and individual links against the
accepted public menu authority. Formal desktop/mobile visual review follows
infrastructure and is recorded separately.

## Release boundaries and recovery

Production's GitHub environment permits only `main`; each preview environment
permits only its identically named branch. Main requires a PR and strict
`Check deployable app` / `Check application container` checks. Force-pushes and
deletion are disabled. PR workflows check without publication. A push to a personal
branch publishes that preview only. Promote authorized work through the normal PR
path, then explicitly synchronize authorized previews while preserving any later
documented branch-only variation.

The existing first-live production container was preserved throughout host-file
installation. Its exact Compose/image setting and container receipt were saved in
`/var/lib/pastore-s-italian-delly-deploy/bootstrap-20261018-infra-r1`; adding
`release.env` made ordinary updater rollback possible before the first replacement.
Managed operations must use the updater or explicitly use `release.env`; the
legacy `.env` records the original first-live image only. Retain bootstrap recovery
until a subsequent verified managed release supplies its own recovery reference.

The gateway change added only the two preview routes and retained the production
block once. It acquired the existing shared lock, read fresh configuration inside
that lock, validated the staged file, compared again before atomic replacement and
gracefully reloaded. The gateway container, shared network and certificate mounts
were preserved. Company route fragments live in `deploy/`; no shared gateway
repository changes are part of this bootstrap.

Image retention keeps the current release plus two previous successfully observed
image sets, with a 24-hour observation grace period and recovery/active-container
protection. Initial histories correctly contained one successful managed release
each; no image deletion was eligible. These images and same-server configuration
copies are not independent disaster backups. No reboot or destructive fault test
was performed.
