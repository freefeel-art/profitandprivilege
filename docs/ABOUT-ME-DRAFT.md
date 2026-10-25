# About Me — merged story, development branch

## Current content and authority

The owner authorized merging the original story with a new approved version on
2026-10-25, preserving essential experiences while removing repetition. This
supersedes the earlier requirement for a verbatim rendering of the old version.
The combined source is `docs/about-me.md`, rendered in `about/index.html`.

Original source, read completely:
`/home/Yampales/Dokument/# The Thoughtful Man Behind Profit & Privilege`
SHA-256: `a101f1bbff0a5f72d389886ce9565513d5aa52461203152336e63916c5d8d040`.
New source: the owner's accompanying approved text headed
"The Thoughtful Man Behind Profit & Privilege", beginning with the subtitle
"An ordinary man, a curious mind, and a lifetime of learning."
Neither supplied original document was edited.

The owner now authorizes a commit and upload to the existing development branch.
This does not authorize a main merge or production deployment.

## What was preserved from the original

- Finland, Sweden since 2002, tanker driving / industrial chemicals and network
  marketing since 1996.
- Hatten treatment in 2020, learning to manage emotions, the difficult first
  month, the 2:30 AM realization, familiar principles from NeoLife / network
  marketing, and the distinction between knowing and living by that knowledge.
- The AA example, including "Have you ever been to one?", and the lesson about
  repeating unexamined claims.
- Value versus purchase price and usage cost; informing rather than pressuring.
- The named influences and the principle of learning without following blindly.
- Den fundersamma mannen, life itself as value, and freedom through personal
  responsibility and independent decisions.
- The exact agreed sobriety sentence and the requested Hatten link.
- Value Before Profit and Question Everything. Value What Matters.

## What was incorporated from the new version

- The ordinary-man / curious-mind subtitle and a reflective opening.
- Acknowledging mistakes without allowing regret to define the future.
- Curiosity and stubbornness, practical AI / website / automation / agent
  experiments, failed approaches, and knowing when to change direction.
- Personal experience is not universal evidence; admitting uncertainty and
  changing one's mind when better evidence becomes available.
- Commercial relationships can be legitimate, but genuine value comes first.
- Choosing one's own path and the concluding personal thought:
  "Dare to be yourself. Who are you following?"

Repetitive introductions, repeated explanations of value and repeated advice
about deciding independently were consolidated. No new biographical event,
relationship, credential, date or quotation was invented. The merged wording is
an editorial synthesis, not a claim that either source was copied verbatim.

## Presentation and images

No redesign: the existing stylesheet, typography, palette and images are retained.
The homepage's approved core-message strings remain unchanged.

About Me uses `assets/images/profit-and-privilege-author-portrait.png`, copied
byte-for-byte from the owner's Downloads file, with the existing AI caption.
1254 × 1254 PNG; SHA-256:
`d46db1dbcdaa1de2f73ddc4231760c709ea526962e3db4f8dc564c4a1f5a0f25`.

The homepage still uses the existing repository profile-graphic portrait crop.
A separate authentic original photograph has not been located or verified;
that earlier image-source question remains unresolved. The current task asks to
preserve existing images, so none was substituted. Repository source graphic:
`docs/assets/authors/jarmo-halonen-author.png`, SHA-256:
`8a536b7e3cf45e55e4727b4864f030b49f59d3e8d75caa13a4ec3bb6cbbaf89e`.

## Verification

- Combined Markdown and browser-rendered paragraphs/headings match in order.
- Explicit checks cover the Hatten details, 2020, 2:30 AM, 1996, 2002, AA question,
  Swedish name, sobriety sentence, and final personal thought.
- Homepage core-message strings unchanged; both core philosophies retained.
- Both pages checked at 320, 375, 390, 768, 1024 and 1440 CSS px: no overflow.
- All local links return HTTP 200 and all fragment targets exist.
- Home → About Me → home navigation, keyboard skip links and visible focus pass.
- Images load with alt text; the entire AI logo image and AI caption remain.
- Text contrast minimum 4.79:1; no browser errors or remote resource requests.
- Original document/image hashes checked; existing stylesheet unchanged.
- `git diff --check` passes. No packages installed.

Installed Chromium via existing Playwright Core. Temporary test script:
`/tmp/profitandprivilege-about-check.cjs`; results:
`/tmp/profitandprivilege-about-results.json`.
This is a focused browser review, not a complete screen-reader/multi-engine audit.

## Local preview

Home: http://127.0.0.1:8765/
About Me: http://127.0.0.1:8765/about/

If needed, from `/home/Yampales/profitandprivilege`:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

## Repository delivery

Branch: `design/value-before-profit-home`, based on main `8c9042a`.
The development commit uses `[skip ci] [skip netlify]` to avoid automatic builds
on upload, in addition to leaving main untouched. No production commands,
hosting settings changes or main merges are authorized or performed.
Production HTML checksum is compared before and after repository upload.


### Delivery result

Existing HTTPS Git has no credentials (dry-run push could not read Username).
The connected GitHub integration authenticates as `freefeel-art`, but the first
Git-data write returned HTTP 403, "Resource not accessible by integration".
No remote blob, tree, commit or branch was created by that failed request.
The existing SSH agent contains no identities; no GitHub host key is configured.
No key, credential, host-trust or integration setting was changed.

The completed work is committed locally using the agent identity OpenClaw.
Remote upload remains blocked until an existing GitHub connection is granted
repository-content write access or native Git authentication is connected.
This is a missing write connection, not a request for production approval.
