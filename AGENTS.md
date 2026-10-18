<!-- xs-company:start -->
# Pastore's Italian Delly — X Solutions client website

This repository is the complete, portable working record for Pastore's Italian Delly's website:
source, deployment configuration **and** the company knowledge base in `kb/`.
Any agent (Codex, Claude or another) that clones it should be able to continue
without Derek's or Abdul's private workspace.

## Resume here

1. Read `kb/HANDOFF.md` first: current state, last change, open work and next step.
2. Read `kb/INDEX.md`, then only the KB files your task needs. `kb/design-brief.md`
   holds the accepted direction and X Solutions' standing design rules; read it
   before any visual change.
3. Read `xsolutions.json` for identity, environments and pipeline stage status.
4. Check `git log -5` and your own preview environment's live `/version.json`.

When you finish a working session, update `kb/HANDOFF.md` (what changed, what is
verified, what is next) and any KB file whose facts changed, in the same commit as
the work. If the XSolutions skills are installed, `xs_company.py handoff` also
refreshes the generated status block.

## Branches and environments

| Branch | Environment | URL |
|---|---|---|
| `main` | production | https://pastores.xsolutionsmd.com |
| `derek-dev` | derek-dev | https://d-pastores.xsolutionsmd.com |
| `abdul-dev` | abdul-dev | https://a-pastores.xsolutionsmd.com |

- There is no shared `dev` branch. Derek works on `derek-dev`; Abdul works on
  `abdul-dev`. Pushing to your branch deploys **only** your preview.
- Production changes go through a reviewed PR from a preview branch into `main`;
  merging deploys production automatically. Merging into `main` needs release
  authorization from Derek or Abdul for that change.
- After a production release, sync the authorized preview branches while preserving
  documented branch-only differences. Never merge the final Derek-only menu-photo
  variation into main or Abdul. Its deliberate product difference has its own scoped
  update/review record, not a false source-parity claim.
- Do not push to the other person's branch without asking them. The one exception is
  the initial pipeline run, which syncs all three branches.

## Rules for this repository

- REA is preferred tooling, not a required gate (Derek, October 18, 2026). If it
  cannot work after bounded recovery, use ordinary browser/devtools inspection,
  record the method/limitation and continue without a permission or repair wait.
  Sufficient browser evidence can pass reconstruction; actual reference inspection,
  populated implementation and desktop/mobile interaction checks remain required.

- Current XS workflow: no Stitch, including trial attempts. Reconcile older design
  rules with the current user request before delegation. Use researched company
  facts/assets to choose functionality and a premium reference, accept sufficient
  content, then Sol reconstructs/populates with REA/browser evidence, Astra checks
  backend/integrations and Claude refines the existing frontend. Strongly prefer
  Claude; evidenced exhausted usage permits Astra after stopping the old task.
  Publish/check the first version and send its URL to Slack before full infrastructure
  and independent live review. The coordinator accepts phases in order, announces
  their completion and prevents interrupted/replaced agents from resuming writes.

- It is public. Commit only sourced public business facts, the design brief and
  project state. Pricing, quotes, lead/sales status, private contact details,
  credentials and the full raw media archive stay out (they live in X
  Solutions' private workspace or Slack). Run `xs_company.py check-public` before
  pushing when the skills are installed.
- Every factual claim on the site must trace to `kb/sources.md`. Unknowns stay
  unknown; never invent reviews, ratings, prices, credentials or service areas.
- Media: Derek confirms owner permission for all gathered business assets across
  sources, not only the shortlist. Use suitable photos/assets in every environment,
  including production, without asking again per file or source. Old reference-only,
  public-unverified and permission-pending labels do not override this confirmation.
  Preserve provenance and accurate captions; include optimized site copies in the
  repository and keep the full raw archive private. Pass this rule to every delegate.
  See `kb/media.md` for the library and recorded Slack delivery.
  Placement follows the reference: if its menu has no item photos, main and Abdul's
  menu remain text-only. After normal delivery, add a separately reviewed photo
  variation only to Derek's branch; keep its source/image identity mappings.
- Previews are `noindex` and use test data and test integrations only.
- Keep `kb/`, `AGENTS.md`, `CLAUDE.md` and `xsolutions.json` out of the production
  image (`.dockerignore`).
<!-- xs-company:end -->

# Repository development

Read the README, WORKFLOW.md and current validation record before changing the app.
For a new website, new app interface or substantial visual redesign (including
“build me a beautiful website”), use the repository's
[reference-design skill](.agents/skills/reference-design/SKILL.md) and
[setup guide](docs/DESIGN_WORKFLOW.md). Complete requirements, visual references,
implementation and real desktop/mobile checks; ordinary backend fixes skip this.
Develop on dev or an explicit feature branch targeting dev. Preserve the configured
release policy; merging into main and publishing/deploying require release authorization.
An authorization already given for the current task remains effective.

Before publishing, follow [release compute](docs/RELEASE-COMPUTE.md): verify the app
repository's live visibility; private repos use the prepared local PC environment
for release tests/builds, public repos use standard GitHub-hosted runners. This
selects build compute, not production hosting or release authorization.

Use [Graft](docs/GRAFT.md) for whole-repository discovery: application source,
Dockerfiles, Compose, CI, deployment scripts, configuration and documentation.
Use its bounded text search/read or direct source reads where graph coverage is absent.
Inspect status for the actual repository, branch, revision and excluded/untracked paths.
Do not treat graph results as proof that a behavior works or as authority to deploy.

For browser behavior, follow [runtime verification](docs/RUNTIME-VERIFICATION.md).
Keep Reticle available but use it only when requested for the task; do not ask every
time. A full pass with Reticle combines normal suites and selected browser flows.
Keep required tests and direct desktop/mobile inspection regardless. When Reticle
is selected, verify a connected session before claiming observations.
Record genuine failures and unknown observations; a missing connection is not a pass.
Keep context caches, runtime recordings, credentials and developer tooling out of
production images. Separate local, container, CI and live evidence in the validation record.

## Current website design route

Derek's latest instruction supersedes the earlier Stitch route: do not use Stitch,
including attempts or fallbacks. Follow the canonical XS workflow in
`~/.codex/skills/xs-website/SKILL.md`, especially
`~/.codex/skills/xs-website/references/coordinator.md`, and its reconstruction/delivery
references. The main coordinator owns ordered acceptance and completion updates.
The repository's reference-design skill and `docs/DESIGN_WORKFLOW.md` provide the
local implementation route; preserve task-specific role restrictions and existing
branch, endpoint and release boundaries. Keep separate pages where requested,
no decorative numbering, and the already confirmed business-asset authorization.

## Branch contract

This repository has no shared dev branch. Long-lived branches: `main` (production) and `derek-dev`, `abdul-dev` (personal preview environments). Wherever this guide says dev, use your own preview branch; promote with a reviewed PR from it into main, then merge main back into each preview branch.
