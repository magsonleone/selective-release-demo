# Selective release demo

This repository demonstrates the team's release process. It contains a tiny Node.js application, an order receipt calculator, with a prepared history:

- `master` has the production version.
- `develop` has five merged changes, and not all of them are ready for production.

The demo shows how to release only the ready changes: create the release branch from `master` and bring those changes into it with `git cherry-pick`, either by hand or with Claude Code.

**The process itself is described in [docs/release-process.md](docs/release-process.md).** That guide includes the Claude Code prompts.

## The application

It needs Node.js 18 or later and has no dependencies.

```bash
npm start   # prints the receipt of examples/order.json
npm test
```

## State of the branches

**`master`** has version 1.1.0, tag `v1.1.0`, which is in production:

- 1.0.0: cart, checkout and plain-text receipt.
- 1.1.0: sales tax (#1) and item validation (#2), released through `release/1.1.0` created from `develop` (#3).

**`develop`** has everything in `master` plus five merged pull requests that are not released yet:

| PR | Change | Status |
| --- | --- | --- |
| #4 | feat: discount coupons | Ready for production |
| #5 | refactor: extract money formatting helper | Ready for production |
| #6 | feat: loyalty points | **Not ready**: the points rule is waiting for business approval |
| #7 | fix: round tax to cents so receipt lines add up | Ready for production |
| #8 | feat: free shipping on orders from $50 | Ready for production |

Each pull request also shows its status as a label.

**Goal of the demo:** release 1.2.0 with every ready change and without #6.

## Demo script

In the commands, `<sha-N>` is the SHA of the commit of PR #N, which step 2 lists. The commands work in Git Bash and in PowerShell.

### 1. Show production and develop

```bash
git clone https://github.com/magsonleone/selective-release-demo.git
cd selective-release-demo
git log --oneline --graph --all
git switch master
npm start
git switch develop
npm start
```

- On `master`, the receipt has no coupon and no shipping.
- On `develop`, the receipt has a coupon, shipping and loyalty points.

### 2. Show what is waiting in develop

```bash
git log --oneline --reverse --no-merges origin/master..origin/develop
```

```text
<sha-4> feat: discount coupons (#4)
<sha-5> refactor: extract money formatting helper (#5)
<sha-6> feat: loyalty points (#6)
<sha-7> fix: round tax to cents so receipt lines add up (#7)
<sha-8> feat: free shipping on orders from $50 (#8)
```

The old process created the release from `develop`, so all five changes would reach production, including #6, which is not ready.

### 3. Check the dependencies

Can the four ready changes go without #6? Start with the most recent one, #8:

```bash
git show --stat <sha-8>
git log --oneline --reverse origin/master..<sha-8>^ -- $(git show --name-only --format= <sha-8>)
```

The second command lists #4 and #5: they changed the same files earlier. `git show <sha-8>` shows why #8 needs them:

- It uses `formatMoney`, which #5 created.
- It computes shipping on the amount after the coupon discount, which #4 introduced.

Both are ready, so both go in the release. In contrast:

- #6 changes only `src/cli.js` and its own files, so no ready change depends on it.
- #7 changes only the tax files, so it is independent.

### 4. Optional: forget a dependency

```bash
git switch -c try/without-5 origin/master
git cherry-pick -x <sha-4> <sha-7> <sha-8>
git status
git cherry-pick --abort
git switch develop
git branch -D try/without-5
```

The cherry-pick of #8 stops with a conflict in `src/receipt.js`, and `git status` lists that file as `both modified`. The conflict is the signal that #8 depends on a change that was left out, here #5. `--abort` puts everything back as it was.

### 5. Create the selective release by hand

```bash
git switch -c release/1.2.0 origin/master
git cherry-pick -x <sha-4> <sha-5> <sha-7> <sha-8>
npm test
npm start
git log --oneline origin/master..HEAD
git log -1
```

- `npm start` shows the coupon and the shipping, but no loyalty points.
- `git log -1` shows that the message ends with `(cherry picked from commit <sha-8>)`.

Then set the version and the changelog:

1. In `package.json`, set `"version": "1.2.0"`.
2. In `CHANGELOG.md`, add a section above `[1.1.0]`:

   ```markdown
   ## [1.2.0] - YYYY-MM-DD

   ### Added

   - Discount coupons (#4).
   - Free shipping on orders from $50 (#8).

   ### Changed

   - Money amounts are formatted by a shared helper (#5).

   ### Fixed

   - Tax is rounded to cents so the receipt lines add up (#7).
   ```

Commit, push and open the pull request:

```bash
git commit -am "chore(release): 1.2.0"
git push -u origin release/1.2.0
gh pr create --base master --head release/1.2.0 --title "Release 1.2.0" --body "Included: #4, #5, #7, #8. Left out: #6 (not ready)."
```

### 6. Do the same with Claude Code

First discard the manual release. Close its pull request if you opened one, then run:

```bash
git switch develop
git branch -D release/1.2.0
git push origin --delete release/1.2.0
```

Now run `claude` and paste the [selective release prompt](docs/release-process.md#62-prompt-selective-release) with:

```text
Version: 1.2.0
Changes to release: #4, #5, #7, #8
```

To show the dependency check, ask instead for `#7, #8` only. Claude Code must stop and say that #8 depends on #4 and #5.

The [prompt to see what is waiting](docs/release-process.md#61-prompt-what-is-waiting-in-develop) is a good opening for the demo, because it changes nothing.

### 7. Reset the demo

The annotated tag `demo-start` marks the initial state of `develop`. To start over, delete the release branch and tag. If the release pull request was merged, also put `master` and `develop` back:

```bash
git push origin --delete release/1.2.0
git push origin --delete v1.2.0
git push --force origin v1.1.0~0:refs/heads/master
git push --force origin demo-start~0:refs/heads/develop
```

The last two commands rewrite `master` and `develop`. Use them only in this demo repository.
