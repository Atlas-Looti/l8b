# Changesets

This repository uses [changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

## Adding a changeset

When you make a change that should be included in the next release:

1. Run `bun changeset` from the repository root
2. Select the packages that were modified
3. Choose the version bump: `patch`, `minor`, or `major`
4. Write a summary of the change
5. Commit the generated `.changeset/*.md` file

## Release process

1. A maintainer reviews and merges your PR
2. The "Release" workflow automatically:
   - Bumps versions in `package.json` files
   - Updates `CHANGELOG.md`
   - Creates a release PR
3. Merge the release PR to publish to npm

## Example changeset

```
---
"@al8b/runtime": patch
"@al8b/runtime-react": patch
---

Fix memory leak in hot reload cleanup
```
