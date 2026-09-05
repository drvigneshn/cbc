# Code Blue Companion — project context

Paediatric resuscitation decision-support web app (PALS-based). Single-page app,
no build step — plain HTML/CSS/JS. Read this before making changes.

## Live site & hosting
- **Live at:** https://cbc.pediaos.com
- **Hosting:** GitHub Pages, served from the **`main`** branch, root folder.
- **Repo:** `drvigneshn/cbc` (was `codebluecompanion` — renamed; old name still redirects).
- **Custom domain:** `CNAME` file holds `cbc.pediaos.com`; DNS is a CNAME at Hostinger
  (`cbc` → `drvigneshn.github.io`). `.nojekyll` is present so GitHub Pages serves the
  `.well-known/` folder.
- **Deploying:** commit and push to your working branch AND to `main` (GitHub Pages serves
  `main`). Example: `git push origin HEAD:main`.
- **Note:** more than one Claude session may work this repo. Always `git fetch` first; if the
  remote is ahead, rebase/reset onto `origin/main` before pushing — never clobber newer work.

## Files
- `index.html` — the whole app (HTML + CSS + JS inline, one big IIFE at the bottom).
- `about.html`, `privacy.html`, `dose-reference.html`, `next-action-prototype.html` — extra pages.
- `sw.js` — service worker (offline cache). `manifest.webmanifest` — PWA manifest.
- Icons: `icon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
- `store/feature-graphic.png` — Play Store graphic. `.well-known/assetlinks.json` — TWA verification.

## Versioning (IMPORTANT — do this on every change)
Bump the version on every change, in ALL of these places, and keep them in sync:
1. Header badge in `index.html`: `<span class="vbadge">vX.Y.Z</span>`
2. Disclaimer line in `index.html` footer: `... · vX.Y.Z · created by Dr Vignesh N`
3. Disclaimer gate version in `index.html`: `<span class="v">vX.Y.Z</span>` (inside `#dGate`)
4. `about.html` header badge
5. `sw.js` cache name: `const CACHE = 'cbc-vX.Y.Z';` (this is what pushes the update to
   installed users — never skip it, and it is the source of truth for the live version)

Scheme: **small change → patch** (v5.5.1 → v5.5.2). **Big change / new feature → minor**
(v5.5.x → v5.6). Current version at time of writing: **v5.5.1** — check `sw.js` `CACHE` for live.

## Attribution on commits
End commit messages with:
```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```
Never put a model identifier anywhere else (code, PRs). Do NOT open a PR unless asked.

## Auth, accounts & data (Firebase)
- **Firebase project:** `code-blue-companion`. Uses **Auth** (Email/Password + Anonymous)
  and **Firestore**. Config is inline in `index.html` (safe — public client key; security is
  enforced by Firestore rules).
- **Admin:** the account whose email is `ADMIN_EMAIL` in `index.html`
  (currently `n.vignesh.1996@gmail.com`). Admin sees the 🛡 panel + all logs.
- **Access model (email-keyed `access` collection in Firestore):**
  - Bare auth account with **no `access` doc** = free institution, works forever
    (e.g. KKCTH: `kkcth@cbc.com` / `kkcth123`).
  - **Individual sign-up** (in-app "Create an account") → `access` doc `status:'pending'`
    → blocked until admin approves.
  - **Paid institution** → admin sets an `access` doc with `plan:'paid'` + `expiresAt`;
    auto-blocks when it lapses. Admin buttons: Free ∞ / +1 month / +1 year / Revoke.
  - **Emergency break-glass** → anonymous sign-in; the tool always works, banner shows,
    log saved as `sessionType:'emergency'`. Never gate the emergency path.
- **Code logs:** collection `codelogs`, keyed by `owner` (auth uid). Newest **100** kept
  per owner; older auto-deleted on save (`pruneLogs`).
- **Firestore security rules** live in the Firebase console (NOT in the repo). If you change
  the data model or `ADMIN_EMAIL`, update the rules to match.
- **Monetization = manual billing.** No in-app payments. Hospitals pay offline; admin sets
  their `expiresAt`. Free logins for the alma mater / KKCTH.

## Key UI behaviours (all in index.html)
- **Disclaimer gate** (`#dGate`) — acknowledged once per device (`localStorage cbcDisclaimerAck`).
- **How-to overlay** (`#howOverlay`) — first-run guide (`localStorage cbcSeenGuide`).
- **Voice guidance** — Web Speech API, off by default (`#bVoice`). A voice settings panel
  (`#voiceOverlay`) picks accent / gender / speed. Speaks due actions (adrenaline volume,
  reassess, shock energy, ROSC), repeated ~3× at ~15s gaps per event.
- **Layout modes** (`#bLayout`): Auto → Portrait (`body.narrow`) → Wide (`body.wide`) →
  **Tab** (`body.tab`, the 40/60 console-left / content-right split, ≥700px).
- **Award:** header 🏆 chip (`#trophyChip`) + a footer card (Medshark Champion, ANBAI 2026).
- Themes: `body.theme-bright` (default) / `.theme-monitor` / navy (no class). Style via the
  CSS variables so all themes work.

## Android / Play Store
- Packaged as a **TWA** (PWABuilder) — the app just loads cbc.pediaos.com.
- **Package name:** `com.pediaos.cbc.twa`. `.well-known/assetlinks.json` holds the real
  signing SHA-256 (already set) so the address bar is removed.
- Publish **free**; monetize via the login (above), not the Play price.

## Testing / verifying
- No test suite. After JS edits, sanity-check by extracting the last `<script>` and running
  `node --check` on it.
- To see changes as a returning user, the `sw.js` cache bump is required (see Versioning).
