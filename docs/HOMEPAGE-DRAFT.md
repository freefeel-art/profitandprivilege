# Homepage draft — development preview only

> Current status and remaining release requirements are in the follow-up section below.
> Historical About Me notes describe the old combined draft, not the approved live page.

## Scope

Branch: `design/value-before-profit-home`. Starting point: main commit
`8c9042ae4d3486ff11025ef6e1e2bef2a177569c`.

The homepage and About Me page remain static HTML with a shared local CSS file: no framework migration, dependencies, JavaScript, remote
fonts, tracking, or changes to the Opportunity Validator / Netlify / Cloudflare.
The owner subsequently authorized a development-branch commit and upload.
Main merge and production deployment remain outside scope.

## Content

The four approved sentences are preserved verbatim (HTML line layout aside).
Navigation uses existing on-page sections plus the implemented local About Me
page at `about/`. Topic areas remain planned, and Research & Insights has no
invented articles or results. The Thoughtful Man now introduces the author and
links to the combined About Me story. The owner supplied the original document
and a new approved version and authorized an editorial merge; see
`ABOUT-ME-DRAFT.md` and the current `about-me.md` content source.

## Palette provenance

The black-background direction was explicitly superseded by the user.

This draft uses exact existing tokens from the `:root` style block
in `freefeel-art/bestbuybounty-site`, `direct-selling/index.html`, source commit
`6d809db75f5812790eeff167a8b26e7bcf9b48fb`, blob
`fb2430f6ea67d04bd58381526c15b75adc4e1a24`:

| Draft token | Existing source token | Exact value |
| --- | --- | --- |
| paper | cream | `#FBF8F0` |
| paper-deep | cream-dark | `#F0EBDD` |
| gold | gold | `#C8962E` |
| gold-light (selection only) | gold-light | `#E8C870` |
| brown | gold-dark | `#8B6914` |
| ink | ink | `#1A1A1A` |
| muted | ink-muted | `#555555` |
| line | border | `#E0D8C8` |
| surface (skip link only) | white | `#FFFFFF` |

Source: https://github.com/freefeel-art/bestbuybounty-site/blob/6d809db75f5812790eeff167a8b26e7bcf9b48fb/direct-selling/index.html

Only color tokens were reused: no templates, layouts, green palette, logos,
images, copy or scripts were copied from that project. The layout is specific
to this homepage; typography remains the existing system-font/Georgia approach.
No third-party resources are requested.

Owner decision, 2026-10-25: the current warm gold/brown direction is approved
for experimentation, including `#FBF8F0`, `#F0EBDD`, `#C8962E`, `#8B6914`.
No new palette was designed. The remaining existing supporting tokens remain
unchanged. This approval supersedes the earlier pending-palette clarification;
it is not approval to publish or a claim that the palette is a permanent brand
standard. No other project was read or changed during the About Me extension.

## Preview

From this repository:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ on this Lenovo. Only a loopback listener is used.
The file can also be opened directly in a browser. This is not a public preview.


## Initial homepage verification — 2026-10-25

Headless Chromium via the existing Playwright Core installation; no packages
installed. Temporary check script: `/tmp/profitandprivilege-home-check.cjs`.
Results: `/tmp/profitandprivilege-home-check-results.json`.

- Exact approved copy: all four strings match, including punctuation.
- Viewports: 320, 375, 390, 768, 1024 and 1440 CSS px; no horizontal overflow.
- One h1, English document language, named main sections and primary navigation.
- Initial homepage links were verified as on-page anchors. The About Me extension
  adds tested local page links; see the current checks below.
- Skip link becomes visible on keyboard focus; navigation tested with Enter.
- No page errors, HTTP errors or external requests in browser checks.
- Reduced-motion preference exercised; no animated interactions.
- Desktop and mobile screenshots inspected visually.
- `git diff --check` passes.

Text contrast against actual section backgrounds:

| Text | Background | Contrast |
| --- | --- | --- |
| ink | paper | 16.40:1 |
| muted | paper | 7.02:1 |
| brown | paper | 4.79:1 |
| ink | paper-deep | 14.61:1 |
| muted | paper-deep | 6.26:1 |

The brown/paper-deep combination was 4.27:1 and is not used for small text:
the research eyebrow uses muted instead. Gold rules and section numbers are
decorative, not the only means of identifying content or interactive controls.

This is a focused browser/keyboard/contrast review, not a complete assistive-
technology audit. Safari, Firefox and screen-reader behavior remain unverified.

## Current About Me extension checks — 2026-10-25

The browser checks in `/tmp/profitandprivilege-about-check.cjs` exercise both
pages, all local links/fragments, original-image integrity, six viewport widths,
keyboard navigation, actual rendered text/background contrasts and homepage
copy invariance. Results: `/tmp/profitandprivilege-about-results.json`.

## Changed files

- `index.html`: homepage with author portrait and About Me links; core copy unchanged.
- `about/index.html`: combined About Me story; no production publication.
- `docs/about-me.md`: editable source for the combined story.
- `assets/css/site.css`: shared existing palette/layout and responsive portrait crop.
- `docs/HOMEPAGE-DRAFT.md`: scope, palette approval, preview and checks.
- `docs/ABOUT-ME-DRAFT.md`: original source provenance, preservation checks and local-only boundary.

The existing author-profile text and original PNG are unchanged. Existing app
source, deployment settings and historical project status are untouched.
Earlier steps were local only. The owner now authorizes a development-branch
commit and upload; main merge and production publication remain prohibited.


## Image assignment follow-up — 2026-10-25

About Me now uses the owner-supplied AI portrait with the P&P logo, copied
byte-for-byte into `assets/images/` and labeled as AI-generated. The homepage
still shows the existing profile-graphic portrait crop: a separate authentic
original photograph has not yet been located or verified. Its filename/location
has been requested from the owner. See `ABOUT-ME-DRAFT.md` for hashes and scope.

## Visual refinement — 2026-10-25

Owner-approved navigation background #E5DED0 now spans the viewport on all three
pages, retaining shell alignment and responsive navigation. Header text/current
page/focus use existing ink/muted tokens for contrast. Gold content accents remain.
Existing homepage introductory copy has a white surface, restrained gold edge,
soft shadow and vertically centered desktop position. Mobile padding is reduced.
No HTML, text, images, typography or topic changes; no added decorative content.

All three pages passed Chromium/Playwright checks at 320, 375, 390, 768, 1024 and
1440 px: no overflow, local links/fragments, approved copy, images, navigation,
keyboard skip links/focus. Minimum text contrast 4.79:1; no browser errors/external
requests. Desktop/mobile screenshots visually inspected for all three pages.
Results: /tmp/pp-visual-after-results.json. Screenshots:
/tmp/profitandprivilege-{home,about,philosophy}-{desktop,mobile}.png.
Static HTML requires no build; unrelated app untouched. Not a multi-browser or
screen-reader certification.

GitHub CLI is now authenticated; existing remote development branch matches
starting commit bfdffbd. Its Cloudflare Workers check is skipped. No GitHub
workflows exist; Netlify still targets the separate validator app. Delivery uses
same skip-build markers to existing development branch, with host status and
production checksum verification. No main merge or deployment commands.
Preview: http://127.0.0.1:8765/ (loopback only).

## Homepage follow-up — 2026-10-25 (after About Me production release)

### Current scope

Continue the existing approved visual direction on `design/value-before-profit-home`,
starting at `41b2edf`. No new design, framework, package, production deployment,
main merge, configuration PR merge, or hosting-setting change.
The existing Python standard-library static server is adequate; reuse its loopback
preview at http://127.0.0.1:8765/ on the Lenovo. No public preview was created.

### Implemented and checked

- Preserve warm cream/gold/brown colors, taupe navigation, hero depth,
  typography, four topics and all four approved core strings.
- Load `assets/css/home.css` only on the homepage. It is an exact snapshot of the
  existing stylesheet, isolating subsequent homepage work from About/Philosophy.
  `assets/css/site.css` and both other HTML pages remain byte-for-byte untouched.
- Both About links now open the approved https://profitandprivilege.com/about/,
  not the obsolete local About draft. The published page is not modified.
- Remove the redundant second research-placeholder paragraph; retain the honest
  "In development" state and explicit statement that no articles are published.
- Retain preview-only notices until a separate production release is approved.
- Existing server responds HTTP 200 and serves the current working tree.

### Ready versus unfinished

| Area | Status |
| --- | --- |
| Identity, hero and four core sentences | Implemented; preserved exactly |
| Navigation, mobile layout, keyboard skip link | Checked at six widths; minimum measured text contrast 4.79:1 |
| Four exploration areas | Ready as non-clickable topic introductions; no article listings invented |
| Research & Insights | Honest empty state implemented; real editorial material not supplied |
| The Thoughtful Man text and published About links | Implemented and checked |
| Original author photograph | Missing/unverified; current archive-graphic crop is not claimed authentic |
| Our Philosophy links | Point to existing local draft; production `/philosophy/` is still 404 |
| Production approval | Not granted; nothing from this follow-up is deployed |

### Image provenance — still unresolved

The homepage still references `docs/assets/authors/jarmo-halonen-author.png`,
1122×1402, introduced by owner commit `ac440f0` on 2026-06-25. SHA256:
`8a536b7e3cf45e55e4727b4864f030b49f59d3e8d75caa13a4ec3bb6cbbaf89e`.
It is a composed profile graphic, displayed through the already-existing CSS crop.
It is NOT the About AI/logo portrait (`d46db1d…`), and neither asset was modified.
An original photographic source has not been verified. A filename, crop, Git commit
or visual inspection does not prove authenticity.

Search covered the complete current repository and all Git object paths, current
inbound attachments, Downloads, Pictures and Documents. The history contains only
the profile graphic and the separate AI/logo portrait. Earlier session history and
notes also explicitly leave the original photograph unresolved. Do not misreport
this requirement as complete or create a synthetic replacement.

### Before production approval

1. Locate and verify the original photograph, then replace only the homepage image
   and review its crop/alt text. The owner has been asked for its path or existing URL.
2. Resolve the unpublished Philosophy links: separately authorize that page's release,
   or omit its homepage links from the isolated homepage release. Do not silently
   deploy it with the whole development branch.
3. Approve the final homepage preview and whether the research empty state is
   acceptable at launch. Real articles are not required for the layout check.
4. Release only the approved homepage files over current main, preserving the
   already-published About HTML, isolated About CSS, image and all other production
   blobs. Remove preview notices only in that separately authorized release.

### Verification evidence

Focused Chromium/Playwright checks: exact approved strings, one h1/four topics,
image load/source/hash preservation, local links/fragments, keyboard Tab/Enter,
reduced motion, widths 320/375/390/768/1024/1440 without horizontal overflow,
actual rendered text contrast (minimum 4.79:1), no page errors/failed resource
responses/external render requests. Desktop/mobile screenshots visually inspected.
Report: `qa/homepage-followup-2026-10-25.json`.

Local protected files unchanged: `about/index.html`, `philosophy/index.html`,
`assets/css/site.css` and both original image assets. Production home and About
bytes are compared against `origin/main` before/after the development push.
No Safari/Firefox/screen-reader certification is claimed.

## Ideas in Practice — 2026-10-25

Owner-authorized development-only addition after Explore What Matters and before
Research & Insights. Four cards in the requested order: BestBuyBounty, OLSP,
MLMTraining, Chatbot Guides. BestBuyBounty is described as an independent NeoLife
site sharing P&P values, not a subdomain. MLMTraining provides independent training
reviews, not recruitment. Chatbot Guides is forthcoming, marked In Development
without a public link; FastBots.ai is its first affiliate partnership, not its brand.

Reuses the existing topic cards, heading, links, palette and fonts with a two-column
desktop / one-column mobile grid. Only homepage HTML and isolated home.css change;
existing navigation, hero, four Explore topics and identity copy are preserved.
Research and Thoughtful Man section numbers advance to 03 and 04. No packages,
frameworks, shared styles, About/Philosophy pages, other projects, subdomain content
or deployment settings change. The existing standard-library static preview and
Playwright checks are adequate; no new platform or design system is needed.

Checks: balanced HTML tags, unique IDs/attributes, local links/fragments, four-card
order, three exact outbound URLs (each HTTP 200), no Chatbot Guides link, keyboard
navigation, reduced motion, unchanged protected files and approved copy. At
320/375/390/768/1024/1440 px there is no horizontal overflow, and the header, hero
and Explore HTML/bounding boxes exactly match the pre-change baseline. Minimum
measured text contrast is 4.79:1; no browser errors or external rendering requests.
Desktop (1440) and mobile (390) screenshots visually reviewed.

Evidence: `qa/ideas-in-practice-2026-10-25.json`; temporary browser script
`/tmp/pp-ideas-check.cjs`, screenshots `/tmp/pp-ideas-{1440,390}.png`.
Preview: http://127.0.0.1:8765/#practice (Lenovo loopback only).
Ready for owner visual review, not production publication. Main is not merged.
