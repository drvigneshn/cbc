# Google Play listing & publishing guide — Code Blue Companion

This folder holds everything you need for the Play Console listing. The app is a
**Trusted Web Activity (TWA)** — a thin Android wrapper around https://cbc.pediaos.com.

---

## Store listing copy

**App name** (max 30 chars)
```
Code Blue Companion
```

**Short description** (max 80 chars)
```
Paediatric resuscitation aid — PALS doses, arrest timers & voice prompts.
```

**Full description** (max 4000 chars)
```
Code Blue Companion is a fast, weight-based decision-support aid for paediatric
resuscitation, built around AHA PALS 2020/2025 and APLS guidance. It is designed
for use by trained healthcare professionals during a paediatric arrest — a
recall-and-calculation aid, not a replacement for clinical judgement.

Enter a weight (or estimate it from age) and every dose is calculated for you.
Tap START CPR to open a hands-free arrest console with timers, a leader status
line, and optional voice guidance that reads each action aloud.

WHAT IT DOES
• Rapid assessment — responsive? breathing? central pulse? — tells you if it is
  an arrest and what to do.
• Weight-calculated doses — adrenaline, amiodarone, atropine, calcium,
  bicarbonate, magnesium, fluids, dextrose, naloxone and more, with safe caps.
• Arrest console — adrenaline and 2-minute reassess timers, shockable vs
  non-shockable prompts, defibrillation and cardioversion energies, ROSC.
• Airway & RSI — ETT size and insertion depth, laryngoscope blade, LMA size,
  and a full rapid-sequence-intubation drug list.
• Quick reference — the crash-card doses at a glance.
• Reversible causes — the 6 H's & 5 T's, plus MR SOPA and DOPE checklists.
• Voice guidance — spoken assessment and action prompts, repeated at 15-second
  intervals; choose accent (Indian / UK / US / Australian), voice and speed.
• Post-ROSC infusions with the rule-of-6 mixing guide.
• Printable, copyable code log.
• Works fully offline once opened.

WHO IT IS FOR
Paediatricians, emergency and critical-care teams, anaesthetists, nurses and
resuscitation trainees.

IMPORTANT
This app is a decision-support and training aid for qualified clinicians. A
trained clinician must verify every dose before administration. It does not
diagnose, does not replace clinical judgement, and the treating clinician
remains responsible for all decisions. Not a medical device.

Official guidelines: AHA PALS (cpr.heart.org) · IAP India BLS/PALS (iapindia.org)
Created by Dr Vignesh N, Kanchi Kamakoti CHILDS Trust Hospital.
```

**Category:** Medical
**Tags:** paediatrics, resuscitation, PALS, emergency medicine
**Contact email:** n.vignesh.1996@gmail.com
**Privacy policy URL:** https://cbc.pediaos.com/privacy.html
**Website:** https://cbc.pediaos.com

---

## Assets in this folder
- `feature-graphic.png` — 1024×500 feature graphic (required).
- `screenshot-1-assess.png` — first page: rapid assessment + weight.
- `screenshot-2-console.png` — arrest console + quick reference.
- `screenshot-3-reference.png` — quick reference + reversible causes.
- `screenshot-4-voice.png` — voice settings (accent / voice / speed).
- App icon for the listing (512×512): use `../icon-512.png`.

Screenshots are 1080×2160 (9:18). Play needs at least 2 phone screenshots.

---

## Build the Android app (.aab)

### Option A — PWABuilder (no coding)
1. Go to https://www.pwabuilder.com and enter `https://cbc.pediaos.com`.
2. Package For Stores → Android.
3. Set **Package ID = `com.pediaos.cbc.twa`** (must match `.well-known/assetlinks.json`).
4. Generate & download. The zip contains a signed `.aab` and `signing-key-info`
   with the SHA-256 fingerprint of the signing key.

### Option B — Bubblewrap CLI
```
npm i -g @bubblewrap/cli
# This repo already contains twa-manifest.json, so from the repo root:
bubblewrap build          # first run will prompt to create ./android.keystore
```
Outputs `app-release-signed.aab` plus the keystore. Keep the keystore safe — you
need it for every future update.

---

## CRITICAL — Digital Asset Links must match the signing key
The file `/.well-known/assetlinks.json` proves the app owns the website (this is
what removes the browser URL bar). Its `sha256_cert_fingerprints` MUST equal the
SHA-256 of the key that finally signs the app.

- If you enable **Play App Signing** (Google's default and recommended): after you
  create the app and upload the first `.aab`, open **Play Console → Test and
  release → App integrity → App signing key certificate** and copy the **SHA-256**.
  Put that value in `.well-known/assetlinks.json`, then redeploy the site.
- The fingerprint currently in the repo is a placeholder/local key and will very
  likely need replacing with the Play signing-key fingerprint above.

Paste me the SHA-256 from Play Console and I will update `assetlinks.json` and
redeploy — do this before you promote the app to production, or the app will show
an address bar.

---

## Play Console steps
1. Create a **Play Developer account** ($25 one-time) at play.google.com/console
   and complete identity verification.
2. **Create app** → name "Code Blue Companion", type App, free.
3. Upload the `.aab` to a testing track (start with **Closed testing**).
4. **Main store listing** — paste the copy above; upload the feature graphic,
   the 512 icon, and the screenshots.
5. Complete the required forms: **Content rating**, **Data safety** (this app
   collects only the optional login email via Firebase and stores code logs the
   user creates; no ads, no tracking/advertising IDs), **Target audience**
   (adults / professionals), and the **Health apps declaration** — declare it as
   a clinical **reference / decision-support aid for healthcare professionals**,
   not a diagnostic tool or medical device.
6. **New personal developer accounts** must run a **closed test with ~12 testers
   for 14 days** before applying for production access. Company/organisation
   accounts are exempt. Plan for this delay.
7. Once testing requirements are met → **Production** → submit for review.

---

## Notes
- `manifest.webmanifest` orientation is now `any`, so the installed app rotates
  into the landscape cockpit.
- Bump `appVersionCode` in `twa-manifest.json` (or in PWABuilder) for every
  update you upload.
