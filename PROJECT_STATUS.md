# PROJECT STATUS

## 3 November 2026 — masthead parity, curated sites and return links released

Owner's follow-up is complete. About Me and the homepage now use the same
scoped dark P&P masthead, brand mark, fonts and responsive menu. About's story,
portrait and article styling remain unchanged. Keyboard fixes keep its focused
skip link above the masthead and give brand/menu links the canonical gold outline.

Faucet was removed from apex navigation, footers and the project card. The apex
directory now contains OLSP, MLMTraining and Chatbot Guides. The independent
Faucet experiment was not deleted, changed or deployed. Share controls remain.

MLMTraining and Chatbot Guides now have one explicit P&P Home footer link on every
rendered page, including their real 404 pages. Own Home and existing footer links
remain intact. Removing the added anchor restores every HTML byte to baseline;
all other assets remain unchanged. Canonical source branches were safely
fast-forwarded while preserving inherited dirty work.

Verified source delivery and production versions:
- Apex: source `f7b6a244f92627f865ab87a0c25655cb72fa71ad`, branch
  `fix/apex-masthead-20261102`, version `791e2f8d-d926-4bbc-bc33-a816c4b74ab7`.
- MLMTraining: source `af58c2a59b926588d1a8e6cc15204d7467240296`, branch
  `feat/mlmtraining-foundation`, version `0f7d0bdf-b4a8-4eda-86cf-4507bce207b0`.
- Chatbot Guides: source `790c5a7e6fe8278d0bd349e1674a54c94069ea8d`, branch
  `feat/fastbots-preparation-20261024`, version `c2dd4926-9677-45ad-b60d-9d5a707039f7`.

All three versions have 100% traffic and exact public artifact readback. Scoped
Git HEADs/blobs and skipped native CI checks were verified. Settings, routes,
domains, credentials and unrelated production sites were preserved.

QA: independent source reviews PASS; apex 15 Python and 4 Node tests, 90 browser
regressions, 24 final local and 24 production layout/share cases PASS. Both legacy
About accessibility defects were reproduced RED before their targeted corrections.
Footer source builds/contracts, reversible byte-deltas and local browser cases
PASS; 8 actual public keyboard/popup cases loaded the real main homepage with
null opener. All 119 previously audited safe subdomain routes return HTTP200 and
include the exact main-home link. OLSP and Faucet already had this link and were
not modified. Conversion paths remain excluded from this audit.

Limits: static browser/HTTP readback is verified, not a Safari/Firefox/physical-
device certification. Installed workerd cannot emulate the existing subdomain
compatibility date; settings were retained and frozen HTTP plus real production
checks were used. No new tracking, social posting or business outcome is claimed.
This dated task supersedes the earlier Faucet directory entry below, not the
independent experiment's existence or any standing authority boundary.

## 2 November 2026 — apex navigation and sharing released

Owner-requested bounded homepage/About update is published. Both pages now link
to OLSP, MLMTraining, Chatbot Guides and Faucet in the upper navigation and footer.
BestBuyBounty's homepage card and links were removed; its independent site was
not changed. Chatbot Guides' obsolete development label was replaced by a direct
link to the verified published site. Faucet is explicitly labelled an experiment.

Lightweight, user-initiated native sharing and canonical Copy link controls were
added without third-party widgets, tracking or automatic social publication.
Unsupported/denied clipboard access offers manual copying. Native sharing is
shown only when supported. About's approved story and all 20 unchanged published
assets remain intact; the production package contains 24 assets in total.

Source commit: f33fbdaf57b643fef28e0705c6c52f8593f3a011 on
`fix/apex-navigation-20261102`; all nine delivered Git blobs were read back.
Worker `profitandprivilege`, version `73e3291a-3e16-4f7f-9e63-046b0c887d41`,
deployment `76e07f89-96ac-47c2-8f3f-a0abec9e7690`, 100% traffic.
The version preview and public apex package match all 24 frozen asset hashes;
www Home/About match too. Rollback: `15d182c2-55c2-4c7b-a3a4-76133f5456e9`.

Verification: independent review PASS; 14 Python and 4 Node tests PASS; existing
homepage browser regression suite PASS; 24 local and 24 production browser cases
PASS (Home/About, 320–1440px, JavaScript on/off, 200% text), plus supported native
share success/cancel/error branches. Ten unique editorial destinations returned
HTTP200. Share API branches were tested without actually posting to social media;
physical-device share sheets, Safari and Firefox were not certified. Dedicated
Hermes Chrome/CDP9224 survived the test-client disconnect. Subdomain deployments,
domain routes, credentials and production settings were unchanged.

The older project-direction snapshot below is historical, not current apex
routing or a renewed validator assignment. This scoped Owner request does not
create standing permission for other main-domain changes.

Last Updated: 2026-06-20

## Current Direction

Opportunity Validator has shifted from a category-scoring tool toward an opportunity discovery platform.

Previous model:

Category → Score

Current model:

Problem → Opportunity

The user begins with a validated market problem and is guided toward a potential business opportunity.

---

## Completed

### Infrastructure

- Repository synchronized across development machines
- SSH authentication verified
- Local development environment operational
- Astro build process stable

### Validator Engine

- Opportunity scoring system operational
- Cluster modifier system implemented
- Score adjustment logic active
- Build verified after modifier implementation

### Discovery System

- Expanded from 5 to 10 problem clusters
- Discovery page operational
- Market evidence and recommended approaches displayed
- Problem-first navigation established

### Routing

Current route structure:

- / → redirects to /discover
- /discover → problem discovery interface
- /validator?cluster=... → opportunity evaluation

Validator moved off the homepage and into a dedicated route.

---

## Current Product Flow

Problem Discovery

↓

Select Problem Cluster

↓

Opportunity Evaluation

↓

Opportunity Score

↓

Decision Support

---

## Work In Progress

### Opportunity Recommendation System

Fields added to cluster model:

- recommendedOpportunity
- why[]
- firstAction

Initial implementation exposed data integrity issues inside clusters.ts.

Feature temporarily rolled back pending clean reconstruction.

---

## Next Priorities

1. Repair Opportunity Recommendation data model
2. Reintroduce Recommendation UI
3. Expand cluster library beyond 10 clusters
4. Prepare first public MVP deployment

---

## MVP Success Condition

A visitor leaves the site with a clear answer to:

"What business opportunity should I investigate next?"

The project should prioritize decision support over raw scoring.


## 27October2026 — Approved shared visual published, homepage only

Owner approved local main-home/DataForSEO preview and production publication.
Main source46b45fb, branchfeat/shared-visual-20261027; sourcepushSKIPPEDautomaticCI
verified, explicitversionupload/deploy. Mainversionf6552cdf-43bd-4ce3-8674-3b7eba1e2054,
deployment0a2c45d7-9716-4911-9bec-76baa5eea995100%. Homepageonly changed; About,
existingfivepublicassets andmanagedrobots unchanged, unpublishedlegacyroutes404.
Black/goldheader/footer, P&Plogo, ValueBeforeProfit, Newsreader/Karla, warmcards;
originalmaincontent/portrait retained. No previewstrip/noindex/localhostproduction.
OLSP paired review releaseea83f8a8, source367494a. Other siblings unchanged.
Local6/6+production6/6views,639/639OLSPtests,190/190combinedpublicresourcesexact.
Main rollbacke7f4364b retained. No DNS/account/credential/schedulerchange.
Current exactassetpackage and full private receipt:
/home/yampa/.openclaw/workspace/reports/visual-unification-2026-10-27/release/main-candidate
and parentREPORT-FI.md. Do not resume stale PersonalV1/currentdirtymain as live source.
