# Apex navigation and project discovery — 29 October 2026

Status: implemented and tested locally; production publication NOT authorized.
Branch: `fix/apex-discovery-20261029`.

## Source and preservation

Started at `80e5ad45672b1a58ad426219a4ba85aa04b0a6e4`, the existing
`feat/shared-visual-20261027` branch. Actual visual implementation is `46b45fb`.
The current live homepage and all 21 protected assets/About files were compared
with this source. They matched exactly before this change.

Existing Lenovo work remains in its original worktrees/branches:
- `design/value-before-profit-home`: `58bc615fc601ba348375fda91b2da2906d82dfe6`.
- `release/homepage-production`: `0035fe9825d4cecd8264c9f0fb4994aa91750648`.
- `release/about-me-production`: `41f80cbea3267d00b9c080cf03bb1a7a505d0ae3`.

No merge, reset, cherry-pick, owner-file replacement, HP access or Experientia
work was performed during this implementation. The new Lenovo worktree is
`/home/Yampales/profitandprivilege-apex-discovery`.

## Runtime delta: index.html only

- Projects navigation links directly to existing `#practice`.
- Skip link now targets existing `#main`; `tabindex="-1"` permits keyboard focus.
  Existing section IDs/routes remain intact.
- Footer separates apex Home/Projects/Research/About from independent projects.
- Home resolves to the apex, not OLSP. About resolves to the approved apex page.
- Existing OLSP privacy/disclosure links explicitly describe only that site.
  No new parent-wide privacy or affiliate policy is invented.
- Three contextual starting points in existing project cards:
  - BestBuyBounty NeoLife product directory, not a new claim of scientific validation.
  - OLSP's DataForSEO costs/limits/publisher-fit review.
  - MLMTraining's critical contact-page workflow review, not a sales/recruitment CTA.

All shared CSS, JavaScript, fonts, portrait files, About HTML/CSS and the hero,
Explore, Research and Thoughtful Man sections are unchanged. Both Chatbot Guides
and the main research collection retain their development status. No new project
is launched or added to public navigation. No new dependency/framework/tracking.

## Verification actually executed

- `python3 -m unittest discover -s tests -v`: 13/13 PASS.
  Skip, navigation and discovery changes were each preceded by an observed failing
  regression test; then the minimal HTML correction made the tests pass.
  Eight additional harness regressions cover initial/redirect HTTPS, approved
  hosts, no-query restrictions, multi-hop redirect rejection, no-JavaScript
  request isolation and exact evidence source hashes. The redirect boundary
  found in independent review was corrected before delivery; the complete unit,
  browser and public-link checks were rerun successfully after that correction.
- `tests/browser_homepage.cjs`: 64/64 PASS using existing Playwright Core and
  isolated system Chrome 156.0.8078.47. Widths 320, 375, 390, 768, 860, 861,
  1024 and 1440. Keyboard skip focus; Projects click; mobile menu close/Escape;
  footer Home and About round trip; all fragment targets; no horizontal overflow;
  unchanged hero/Explore/portrait geometry vs baseline. 200% text reflow at
  320/1440 and essential content/footer navigation without JavaScript checked.
  No page errors, failed HTTP resources or external rendering requests.
- Desktop/mobile screenshots visually inspected, including menu, new reading
  links, loaded unchanged portrait and footer wrapping.
- `tests/check_public_links.py`: 10/10 unique page destinations HTTP200;
  21/21 protected live assets/About resources match baseline bytes. All unchanged
  protected local resources also match baseline. HTTP checks are not a new
  content/fact audit of those external editorial pages.
- No pre-existing apex test suite or npm test script exists in this branch.
  The separate existing Opportunity Validator's locked dependencies were installed
  only inside this isolated worktree with lifecycle scripts disabled. Its existing
  `npm run build --prefix apps/opportunity-validator` passed, generating its three
  existing routes. No app source or lockfile changed. Existing warnings: npm9.2
  is below Astro's declared npm>=9.6.5; tsconfck deprecation; Astro sees an existing
  `.pre-discover-home` backup file. No package upgrades or unrelated cleanup.
- `git diff --check`: PASS. Added-line security scan: no secret, shell injection,
  eval or unsafe deserialization matches in the HTML patch.

Raw local receipts/screenshots:
`/home/Yampales/.hermes/workspaces/profitandprivilege/apex-discovery-20261029/qa/`.
These are private development evidence, not files to publish as site assets.

Re-run from this worktree:

    python3 -m unittest discover -s tests -v
    PP_PLAYWRIGHT=/path/to/existing/playwright-core node tests/browser_homepage.cjs /absolute/evidence-dir
    python3 tests/check_public_links.py /absolute/evidence-dir
    npm run build --prefix apps/opportunity-validator

`PP_CHROME` optionally selects another existing Chrome executable. Browser checks
use loopback only and block external requests. Public link checks use plain GETs,
never forms, signups, affiliate navigation or analytics events.

## Git delivery and later publication

Fresh Cloudflare reads confirm non-main branches can trigger `npx wrangler deploy`.
Use the established `[skip ci] [skip netlify]` markers on this branch, push only
its explicit ref, verify the resulting Cloudflare check is SKIPPED and re-read the
production pointer. Do not create a PR, merge main, change triggers or deploy.

Pre-push production: Worker `profitandprivilege`, deployment
`0a2c45d7-9716-4911-9bec-76baa5eea995`, version
`f6552cdf-43bd-4ce3-8674-3b7eba1e2054` at 100%.

Later publication requires separate Owner approval. Its web payload is ONLY
`index.html` over the current published asset set; tests, docs, private receipts,
legacy app output and unpublished draft pages are not public assets. Use the
existing explicit Worker versions release method with current live drift and
rollback verification. Do not deploy this entire repository or merge an old
Lenovo development branch into production.

This is targeted Chromium/layout/link verification, not Safari, Firefox, physical
device, full accessibility certification or legal-policy approval.
