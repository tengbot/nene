# Contributing to nene-desktop

Thanks for helping with `nene-desktop`.

This repository is the open-source desktop client for `nene`. The paid value lives in the separate SaaS at `nene.im`, not in hidden desktop code.

## Before you start

- Keep the upstream `nexu` shape intact unless there is a strong reason not to
- Prefer thin adaptation layers over large rewrites
- Do not add private SaaS logic, billing rules, or secrets to this repo
- Do not vendor Qclaw source code into this repository

## Local setup

```bash
pnpm install
pnpm typecheck
pnpm build
```

Useful targeted commands:

- `pnpm --filter @nexu/controller typecheck`
- `pnpm --filter @nexu/desktop typecheck`
- `pnpm --filter @nexu/web build`

## Contribution guidelines

- Keep public branding changes in public-facing layers
- Avoid renaming internal `@nexu/*` scopes or workspace structure in Phase 1
- Keep store/path changes backward compatible
- If you touch upstream-shaped modules, explain how the change affects future upstream sync
- Add or update tests when behavior changes
- Update docs when architecture or workflow changes

## Sync-aware rule of thumb

- Safe to customize: README, docs, public copy, thin `nene-web` adapter files
- Be conservative in: controller store internals, desktop bootstrap paths, workspace/package naming

For upstream workflow details, read [docs/upstream-sync.md](./docs/upstream-sync.md).
