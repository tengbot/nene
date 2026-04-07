# Architecture

## Why keep the `nexu` monorepo shape

Phase 1 keeps the upstream monorepo layout on purpose.

- It minimizes long-term drift from `nexu`
- It keeps upstream merges practical
- It lets us bootstrap `nene-desktop` quickly without a risky repo reshape
- It keeps `apps/web` available as the desktop-local UI instead of inventing a second frontend stack

This repository is an independent project, but it is intentionally shaped to stay sync-friendly with `upstream`.

## System model

```text
Electron shell (`apps/desktop`)
  -> local desktop UI (`apps/web`)
  -> local controller (`apps/controller`)
  -> local OpenClaw runtime
```

`nene-web` is not part of this repository. The desktop can run standalone in `Local Mode`. A thin adapter layer is reserved for `Nene Account Mode`.

## Product modes

- `Local Mode`
  - no login required
  - BYOK
  - local runtime only
  - no SaaS dependency required to boot or operate
- `Nene Account Mode`
  - optional connection to `nene-web`
  - device registration, entitlement sync, release lookup, heartbeat
  - still local runtime execution

## Upstream core vs nene-owned layer

### Upstream-shaped core

- `apps/controller`
- `apps/desktop`
- `apps/web`
- `packages/shared`
- build scripts and workspace layout
- existing cloud/profile persistence model

### `nene`-owned adaptation layer

- public branding and documentation
- `NENE_*` configuration aliases
- thin `nene-web` schemas and client
- minimal desktop status surface for `Local Mode` vs `Nene Account Mode`
- repository governance for upstream sync

## Storage and config stance in Phase 1

- The physical storage defaults remain compatible with upstream, including `~/.nexu`
- `NENE_HOME` is supported as a public alias
- `NEXU_HOME` remains compatible internally
- No forced data migration is performed in Phase 1

## SaaS seam added in Phase 1

The repo now reserves a thin public seam for:

- `POST /api/desktop/devices/register`
- `GET /api/desktop/entitlements`
- `GET /api/desktop/releases/latest`
- `POST /api/desktop/heartbeat`

This seam is intentionally thin:

- shared schemas
- config/env aliases
- `NeneWebClient`
- persisted minimal status
- controller route for desktop status inspection

It does not include:

- private auth flows
- billing or subscription rules
- server-side entitlement logic
- large UI/account-system rewrites

## `apps/web` role in this repo

`apps/web` remains the desktop-local UI / console frontend in this repository.

It is not the closed-source `nene-web` SaaS application.

## Upstream sync

See [docs/upstream-sync.md](./docs/upstream-sync.md) for the practical workflow, merge boundaries, and remote setup notes.
