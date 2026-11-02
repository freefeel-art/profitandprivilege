const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { runInNewContext } = require('node:vm');
const source = readFileSync(join(__dirname, '../assets/js/page-share.js'), 'utf8');
function fixture(navigator = {}) {
  const controls = Object.fromEntries(['share-url', 'share-status', 'copy-link', 'native-share'].map(name => [name, {
    hidden: true, textContent: '', value: '', addEventListener(type, fn) { this[type] = fn; },
    focus() { this.focused = true; }, select() { this.selected = true; }
  }]));
  const canonical = 'https://profitandprivilege.com/about/';
  const document = { title: 'About Jarmo Halonen', querySelector(selector) {
    if (selector === '[data-page-share]') return { querySelector: s => controls[s.slice(6, -1)] };
    if (selector === 'link[rel="canonical"]') return { href: canonical };
  }};
  runInNewContext(source, { document, navigator });
  return { controls, canonical };
}
test('copy uses the canonical URL, not a query-bearing visitor URL', async () => {
  let copied;
  const { controls, canonical } = fixture({ clipboard: { writeText: async text => { copied = text; } } });
  assert.equal(controls['copy-link'].hidden, false);
  await controls['copy-link'].click();
  assert.equal(copied, canonical);
  assert.equal(controls['share-status'].textContent, 'Link copied.');
});
test('unavailable and denied clipboard select a manual fallback without claiming success', async () => {
  for (const navigator of [{}, { clipboard: { writeText: async () => { throw new Error('denied'); } } }]) {
    const { controls } = fixture(navigator);
    await controls['copy-link'].click();
    assert.equal(controls['share-url'].focused, true);
    assert.equal(controls['share-url'].selected, true);
    assert.match(controls['share-status'].textContent, /Copy the selected link/);
  }
});
test('native share is hidden when unsupported and sends canonical URL when supported', async () => {
  assert.equal(fixture().controls['native-share'].hidden, true);
  let payload;
  const { controls, canonical } = fixture({ share: async data => { payload = data; } });
  assert.equal(controls['native-share'].hidden, false);
  await controls['native-share'].click();
  assert.equal(payload.url, canonical);
  assert.equal(payload.title, 'About Jarmo Halonen');
});
test('share cancellation is quiet and other errors use the manual fallback', async () => {
  for (const name of ['AbortError', 'NotAllowedError']) {
    const { controls } = fixture({ share: async () => { throw { name }; } });
    await controls['native-share'].click();
    if (name === 'AbortError') assert.equal(controls['share-status'].textContent, '');
    else assert.match(controls['share-status'].textContent, /Copy the selected link/);
  }
});
