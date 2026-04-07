# Upstream Sync

## Why this repo is not a GitHub fork

`nene-desktop` is intentionally maintained as an independent public repository.

- the public identity is `nene-desktop`, not `nexu`
- we want clean branding and governance boundaries
- the closed-source SaaS is separate
- we still want a practical way to keep consuming upstream improvements

So the strategy is:

- independent repository identity
- `upstream` remote for `nexu`
- thin `nene` adaptation layer on top

## Remote layout

Expected remotes:

```bash
origin   <your real nene-desktop repository URL>
upstream https://github.com/nexu-io/nexu.git
```

In this workspace, `upstream` is already configured. `origin` should be added once the canonical `nene-desktop` remote URL is available.

## Recommended sync workflow

```bash
git fetch upstream
git checkout main
git merge --no-ff upstream/main
```

If you prefer to test the merge in isolation first:

```bash
git checkout -b chore/sync-upstream-YYYYMMDD
git merge --no-ff upstream/main
```

## Merge boundaries

### Prefer to keep close to upstream

- monorepo shape
- `apps/controller` core orchestration
- `apps/desktop` bootstrap/runtime plumbing
- `apps/web` structure as the desktop-local UI
- shared workspace/build scripts

### Expected `nene`-owned layer

- README and governance docs
- public product copy
- `NENE_*` config aliases
- `nene-web` adapter schemas and client
- minimal mode/status surface

## Practical rules during conflict resolution

- choose upstream when the change is generic infrastructure or runtime plumbing
- preserve `nene` changes when they are clearly part of the public identity or SaaS adapter seam
- avoid broad renames that make future merges harder
- keep path/storage behavior backward compatible unless a migration is deliberately implemented
