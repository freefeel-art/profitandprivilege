// Run with PP_PLAYWRIGHT=/absolute/path/to/playwright-core node tests/browser_homepage.cjs /absolute/evidence-dir
// Existing system Chrome only; isolated contexts and loopback. Never sends analytics or follows affiliate links.
const { chromium } = require(process.env.PP_PLAYWRIGHT || 'playwright-core');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const baseline = '80e5ad45672b1a58ad426219a4ba85aa04b0a6e4';
const output = path.resolve(process.argv[2]);
fs.mkdirSync(output, { recursive: true });
const mime = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.woff2':'font/woff2'};
const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  let name = decodeURIComponent(u.pathname);
  const isBaseline = name.startsWith('/baseline/');
  if (isBaseline) name = name.slice('/baseline'.length);
  if (name.endsWith('/')) name += 'index.html';
  name = name.replace(/^\//, '');
  if (!(name === 'index.html' || name === 'about/index.html' || name.startsWith('assets/') || name === 'docs/assets/authors/jarmo-halonen-author.png') || name.split('/').includes('..')) {
    res.writeHead(404); res.end(); return;
  }
  try {
    const body = isBaseline ? execFileSync('git', ['show', `${baseline}:${name}`], {cwd:root,maxBuffer:20*1024*1024}) : fs.readFileSync(path.join(root, name));
    res.writeHead(200, {'Content-Type':mime[path.extname(name)] || 'application/octet-stream'});res.end(body);
  } catch { res.writeHead(404);res.end(); }
});
const { createHash } = require('node:crypto');
const sourcePaths = ['index.html', 'tests/browser_homepage.cjs', 'tests/check_public_links.py',
  'tests/test_homepage.py', 'tests/test_public_links.py'];
const sourceSha256 = Object.fromEntries(sourcePaths.map(file =>
  [file, createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex')]));
const report = { baseline, sourceSha256, cases: [], errors: [], blockedExternal: [], screenshots: [] };
async function restrictToLoopback(context, origin) {
  await context.route('**/*', route => {
    if (new URL(route.request().url()).origin === origin) return route.continue();
    report.blockedExternal.push(route.request().url()); return route.abort();
  });
}
let browser;
async function check(name, fn) { await fn(); report.cases.push(name); }
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({executablePath:process.env.PP_CHROME || '/usr/bin/google-chrome-stable', headless:true});
  report.browser = browser.version();
  for (const width of [320,375,390,768,860,861,1024,1440]) {
    const context = await browser.newContext({viewport:{width,height:900}, reducedMotion:'reduce'});
    await restrictToLoopback(context, origin);
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('response', r => {if(r.status() >= 400) report.errors.push(`${r.status()} ${r.url()}`);});
    await page.goto(origin + '/');await page.evaluate(() => document.fonts.ready);
    await page.locator('img').scrollIntoViewIfNeeded();await page.locator('img').evaluate(img => img.decode());await page.evaluate(()=>scrollTo(0,0));
    await check(`${width}: no horizontal overflow`, async () => assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false));
    await check(`${width}: skip-link keyboard focus`, async () => {
      await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),true);
      await page.keyboard.press('Enter');assert.equal(await page.locator('main').evaluate(e=>e===document.activeElement),true);
    });
    await check(`${width}: Projects navigation`, async () => {
      if(width <= 860) {await page.locator('#navToggle').click();assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'),'true');}
      await page.locator('#siteNav a[href="#practice"]').click();
      assert.equal(new URL(page.url()).hash,'#practice');
      if(width <= 860) assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'),'false');
    });
    if(width <= 860) await check(`${width}: Escape closes mobile menu`,async()=>{
      await page.locator('#navToggle').click();await page.keyboard.press('Escape');
      assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'),'false');
      assert.equal(await page.locator('#navToggle').evaluate(e=>e===document.activeElement),true);
    });
    await check(`${width}: every fragment resolves`,async()=>{
      assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(links=>links.filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)),[]);
    });
    await check(`${width}: footer Home stays on apex`,async()=>{
      await page.locator('footer a[href="/"]').click();assert.equal(page.url(),origin+'/');
    });
    await check(`${width}: About round trip`,async()=>{
      const r=await page.locator('footer a[href="/about/"]').click();
      assert.equal(page.url(),origin+'/about/');assert.equal(await page.locator('h1').count(),1);
      await page.goto(origin+'/');
    });
    await check(`${width}: identity geometry preserved`,async()=>{
      const geometry=()=>Array.from(document.querySelectorAll('.intro,.intro h1,#explore,.portrait-crop')).map(e=>{const r=e.getBoundingClientRect();return {x:r.x,width:r.width,height:r.height};});
      const current=await page.evaluate(geometry);
      await page.goto(origin+'/baseline/');await page.evaluate(()=>document.fonts.ready);await page.locator('img').scrollIntoViewIfNeeded();await page.locator('img').evaluate(img=>img.decode());
      assert.deepEqual(await page.evaluate(geometry),current);
      await page.goto(origin+'/');await page.evaluate(()=>document.fonts.ready);
    });
    if([320,390,1440].includes(width)) {
      await page.locator('img').scrollIntoViewIfNeeded();await page.locator('img').evaluate(img=>img.decode());await page.evaluate(()=>scrollTo(0,0));
      const file=path.join(output,`home-${width}.png`);await page.screenshot({path:file,fullPage:true});report.screenshots.push(file);
      if(width===390){await page.locator('#navToggle').click();const f=path.join(output,'menu-390.png');await page.screenshot({path:f});report.screenshots.push(f);}
    }
    if([320,1440].includes(width)) await check(`${width}: 200 percent text reflow`,async()=>{
      await page.evaluate(()=>document.documentElement.style.fontSize='200%');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    });
    await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:900}});
  await restrictToLoopback(context, origin);
  const page=await context.newPage();await page.goto(origin+'/');
  await check('no JavaScript: project content and footer navigation remain available',async()=>{
    assert.equal(await page.locator('#practice article').count(),4);
    assert.equal(await page.locator('footer a[href="#practice"]').isVisible(),true);
    assert.equal(await page.locator('a[href*="/reviews/dataforseo-review/"]').count(),1);
  });
  await context.close();assert.deepEqual(report.errors,[]);assert.deepEqual(report.blockedExternal,[]);
  report.passed=true;
})().catch(error=>{report.passed=false;report.failure=error.stack;process.exitCode=1;}).finally(async()=>{
  if(browser) await browser.close();server.close();
  fs.writeFileSync(path.join(output,'browser-results.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
});
