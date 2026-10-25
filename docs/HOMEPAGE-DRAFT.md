# Homepage draft — local only

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
