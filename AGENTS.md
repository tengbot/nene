# AGENTS.md

## Repo identity

`nene-desktop` is the open-source desktop client for `nene`.

- Keep the upstream `nexu` monorepo structure in Phase 1
- `apps/web` here is the desktop-local UI, not the closed-source SaaS
- The separate SaaS repo is out of scope for this workspace
- Qclaw is roadmap reference only; do not vendor its source code here

## Working rules

- Preserve internal `@nexu/*` scopes, import paths, and workspace layout in Phase 1
- Prefer thin `nene` adaptation layers over large rewrites
- Do not move the default physical storage path away from `~/.nexu` unless you also implement migration logic
- Treat `NENE_HOME` as an alias to the existing home-path strategy
- Keep the existing cloud/profile persistence model; layer `nene-web` on top instead of replacing it

## Phase 1 focus

- public branding
- `NENE_*` config aliases
- thin `nene-web` schemas and client
- minimal status surface for `Local Mode` vs `Nene Account Mode`
- upstream sync governance docs

## Commands

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm test
pnpm generate-types
```

## Key paths

- `apps/controller/` — local controller and persistence
- `apps/desktop/` — Electron shell and host bridge
- `apps/web/` — desktop-local UI
- `packages/shared/` — shared schemas
- `docs/upstream-sync.md` — upstream workflow
- `ROADMAP.md` — phase plan

## Upstream sync stance

- This repo is independent, not a GitHub-visible fork
- Keep `upstream` pointed at `https://github.com/nexu-io/nexu.git`
- Keep `origin` pointed at the real `nene-desktop` repo once the actual remote URL is known
- Prefer small, well-bounded `nene`-owned files over broad edits across upstream core
