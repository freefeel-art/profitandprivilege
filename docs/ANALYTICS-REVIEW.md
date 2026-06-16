# Analytics Review — ProfitAndPrivilege

Version: 1.0
Date: 2026-06-16
Status: Decision Pending

---

## Evaluation Criteria

| Criterion | Weight | Notes |
|---|---|---|
| Static site compatible | Required | Must work with Astro on Netlify |
| Privacy-friendly | Required | No cookies, no PII, no consent banners |
| Terminal-friendly | High | API access for querying data from CLI |
| Minimal maintenance | High | Solo operator, no devops overhead |
| Cost | Medium | Free preferred at validation stage |

---

## Options Evaluated

### Cloudflare Analytics

**How it works:** DNS-layer analytics. No JavaScript. Traffic is measured at the network edge before it reaches the origin.

**Compatibility:** Static site compatible. No snippet required.

**Privacy:** No cookies. No personal data collected. GDPR-compliant by default.

**Terminal access:** API available but requires a Cloudflare account with the site proxied through Cloudflare's DNS. Data is scoped to the zone, not a standalone service.

**Maintenance:** Near-zero once DNS is configured.

**Cost:** Free with Cloudflare's free tier.

**Constraint:** Requires migrating DNS to Cloudflare. ProfitAndPrivilege is currently deployed on Netlify with Netlify-managed DNS. This migration is non-trivial and introduces infrastructure dependency on Cloudflare solely for analytics. The Astro build and Netlify deployment pipeline would remain unchanged, but DNS ownership moves platforms.

**Assessment:** Strong privacy and zero JS, but the DNS migration cost is disproportionate to the benefit at this stage. Only worth pursuing if Cloudflare is adopted for other reasons (CDN, Workers, etc.).

---

### Netlify Analytics

**How it works:** Server-side analytics powered by Netlify's edge log data. No JavaScript required. Data is captured before the page renders.

**Compatibility:** Native to Netlify. Zero configuration for projects already deployed there.

**Privacy:** No cookies. No client-side tracking. No consent banner required. Data is processed by Netlify, not a third party.

**Terminal access:** Limited. Netlify CLI (`netlify` command) does not expose analytics data. The REST API exists but analytics endpoints are not well-documented or stable for programmatic querying. Realistically, dashboard-only access.

**Maintenance:** Zero. Enabled with a single toggle in the Netlify dashboard.

**Cost:** $9/month add-on. No free tier. Data retention is 30 days.

**Assessment:** The lowest-friction option given the existing Netlify deployment. Privacy is excellent. However, the $9/month cost with 30-day retention and no meaningful terminal access weakens the case. At the validation stage, paying for analytics before confirming that users are arriving at all is premature.

---

### Plausible

**How it works:** Lightweight JavaScript snippet (~1KB) sends page view events to Plausible's servers. Open source. Can be self-hosted.

**Compatibility:** Static site compatible. Add one script tag.

**Privacy:** No cookies. No fingerprinting. No PII. GDPR, CCPA, and PECR compliant without consent banners. EU-hosted by default.

**Terminal access:** REST API is documented and stable. Querying page views, referrers, and top pages via `curl` or a script is straightforward.

**Maintenance:** Minimal. Script tag stays in the HTML. No configuration drift.

**Cost:** $9/month for the hosted service (up to 10,000 page views). Self-hosting is free but requires a server.

**Assessment:** The strongest full-featured option. Good API, clean dashboard, strong privacy story. Cost is the friction point — same $9/month as Netlify Analytics but with better data access and longer retention. Self-hosting eliminates cost but adds infrastructure. Best fit for a later stage when traffic justifies the spend.

---

### GoatCounter

**How it works:** Lightweight JavaScript snippet or pixel-based tracking. Open source. Hosted service and self-host both available.

**Compatibility:** Static site compatible. One script tag or a pixel for no-JS environments.

**Privacy:** No cookies. No PII. No fingerprinting. Compliant with GDPR without consent banners. Designed specifically for privacy-first analytics.

**Terminal access:** REST API is well-documented. Endpoints for page counts, referrers, browsers, and paths are all queryable. A basic `curl` call returns JSON with no authentication complexity beyond an API token. The most terminal-friendly option in this evaluation.

**Maintenance:** Near-zero. Script tag in HTML, no configuration to manage.

**Cost:** Free for public sites (open source projects and personal projects). Self-hosting is free. Paid plans start at $5/month for private sites if needed later.

**Assessment:** Best match for current requirements. Free at this stage, strong API for terminal querying, no cookies, no maintenance burden, and no infrastructure dependency beyond a script tag. Portable — works on Netlify today and any other static host later.

---

## Comparison Summary

| | Cloudflare | Netlify | Plausible | GoatCounter |
|---|---|---|---|---|
| Static compatible | Yes | Yes | Yes | Yes |
| No JS required | Yes | Yes | No | Optional |
| Privacy-friendly | Yes | Yes | Yes | Yes |
| Terminal / API | Limited | No | Yes | Yes |
| Minimal maintenance | Yes | Yes | Yes | Yes |
| Cost | Free | $9/mo | $9/mo | Free |
| Setup friction | High (DNS) | Zero | Low | Low |
| Data retention | Unlimited | 30 days | Unlimited | Unlimited |

---

## Recommendation

**GoatCounter**

GoatCounter is the correct choice at this stage.

It is free for public sites, requires no DNS changes, no infrastructure migration, and no ongoing spend. A single script tag in `index.astro` is the entire implementation. Data is accessible via a documented REST API, making terminal querying practical without additional tooling. Privacy compliance is built in — no cookies, no consent banner, no PII.

The only viable alternative is Netlify Analytics, which has zero setup friction given the existing deployment. It loses on cost ($9/month), terminal access (none), and data retention (30 days). Those trade-offs are not justified until traffic volume makes server-side measurement materially important.

Plausible is a better long-term choice than GoatCounter for teams that outgrow GoatCounter's dashboard, but the cost delta is not warranted before validation results are in.

Cloudflare Analytics is not appropriate without a broader adoption of Cloudflare infrastructure.

---

## Implementation Note

Not in scope for this document.

When implementation is approved: add the GoatCounter script tag to `apps/opportunity-validator/src/pages/index.astro` and configure the site in the GoatCounter dashboard. No other files require changes.
