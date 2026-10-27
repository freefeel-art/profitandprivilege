# Shared P&P visual — approved27October2026

Owner approved the reviewed two-page preview and its publication: this homepage
and OLSP's /reviews/dataforseo-review/. Do not infer a whole-site migration.
Existing About/other pages, personal text, privacy/analytics policies and sibling
sites stay unchanged. Identity guidance remains the existing identity standard.

The shared visual asset bundle lives at assets/pp-visual-v1/ independently on
each hostname. The maintained counterpart is the OLSP public/assets/pp-visual-v1/
bundle, invoked only by OlspLayout visualVariant="unified-v1". Keep the bundle
byte-identical when updating this approved pair; there is no cross-domain runtime
stylesheet or new CMS. Reuses existing Gold Master tokens, Newsreader/Karla,
P&P logo markup, warm paper surfaces, black/gold header/footer and8px cards.

The root index.html is the approved current static homepage; do not regenerate
it from the stale opportunity-validator or PersonalV1 worktree. Preserve the
existing portrait source and page content. Local-preview switcher, localhost
URLs and noindex must never be shipped. OLSP consent/measurement stays intact;
preview-only removal of tracking was not an approved production policy change.

Git delivery uses [skip ci] [skip netlify], as already verified by skipped builds
on this repository. Workers builds otherwise run npx wrangler deploy on all
branches. Do not merge/push unmarked main or change triggers incidentally.
Production is published explicitly with the existing Worker versions flow,
with the exact validated asset package and existing compatibility date;
no DNS/route/secret reset. Keep a prior version for rollback and verify actual
public bodies, canonical/robots, fonts/images, menu and mobile behavior afterward.

The root page and five existing public assets are the current known production
source set; retain each before overlay. Cloudflare-managed robots.txt is a
managed response, not a source file to copy into an asset upload.
