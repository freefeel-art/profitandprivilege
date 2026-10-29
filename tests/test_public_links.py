"""Local-only redirect boundary regressions; fake transport never opens sockets."""
import io
from email.message import Message
import unittest
from unittest.mock import patch
import urllib.request
from urllib.response import addinfourl

import check_public_links as links


class FakeTransport(urllib.request.BaseHandler):
    # Run before urllib's real HTTP(S) transports; no socket can be opened.
    handler_order = 100

    def __init__(self, destinations):
        self.destinations = iter(destinations)
        self.requested = []

    def https_open(self, request):
        self.requested.append(request.full_url)
        headers = Message()
        destination = next(self.destinations, None)
        if destination is not None:
            headers['Location'] = destination
        response = addinfourl(io.BytesIO(b'local fixture'), headers,
                              request.full_url, 302 if destination else 200)
        setattr(response, 'msg', 'Found' if destination else 'OK')
        return response

    http_open = https_open


class PublicLinkBoundaryTests(unittest.TestCase):
    source = 'https://profitandprivilege.com/start'

    def fetch_locally(self, url, destinations):
        transport = FakeTransport(destinations)
        real_build_opener = urllib.request.build_opener

        def build(*handlers):
            return real_build_opener(*handlers, transport)

        # Support the old urlopen path too, so RED exercises its actual redirect
        # handling without contacting any external host.
        with patch.object(links, 'build_opener', build, create=True), \
             patch.object(links, 'urlopen', build().open, create=True), \
             patch('socket.create_connection', side_effect=AssertionError('network forbidden')):
            try:
                result = links.fetch(url)
            except ValueError as error:
                result = {'error': str(error)}
        return result, transport.requested

    def test_rejects_http_redirect_before_fetch(self):
        result, requested = self.fetch_locally(self.source, ['http://profitandprivilege.com/next'])
        self.assertIn('error', result)
        self.assertEqual(requested, [self.source])

    def test_rejects_unknown_host_redirect_before_fetch(self):
        result, requested = self.fetch_locally(self.source, ['https://unapproved.invalid/next'])
        self.assertIn('error', result)
        self.assertEqual(requested, [self.source])

    def test_rejects_query_redirect_before_fetch(self):
        result, requested = self.fetch_locally(self.source, ['https://profitandprivilege.com/next?tracking=1'])
        self.assertIn('error', result)
        self.assertEqual(requested, [self.source])

    def test_allows_https_allowlisted_redirect_chain(self):
        middle = 'https://bestbuybounty.com/article'
        final = 'https://mlmtraining.profitandprivilege.com/guide'
        result, requested = self.fetch_locally(self.source, [middle, final])
        self.assertEqual(result.get('status'), 200)
        self.assertEqual(result.get('final_url'), final)
        self.assertEqual(requested, [self.source, middle, final])

    def test_checks_every_redirect_not_only_first(self):
        middle = 'https://bestbuybounty.com/article'
        result, requested = self.fetch_locally(self.source, [middle, 'https://unapproved.invalid/'])
        self.assertIn('error', result)
        self.assertEqual(requested, [self.source, middle])

    def test_rejects_unapproved_initial_urls_before_fetch(self):
        for url in ('http://profitandprivilege.com/', 'https://unapproved.invalid/',
                    'https://profitandprivilege.com/?tracking=1'):
            with self.subTest(url=url):
                result, requested = self.fetch_locally(url, [])
                self.assertIn('error', result)
                self.assertEqual(requested, [])


class BrowserHarnessBoundaryTests(unittest.TestCase):
    def test_no_javascript_context_installs_same_route_guard(self):
        source = (links.ROOT / 'tests/browser_homepage.cjs').read_text()
        no_js = source.split('javaScriptEnabled:false', 1)[1]
        setup = no_js.split('await context.newPage()', 1)[0]
        self.assertIn('await restrictToLoopback(context, origin)', setup)
        self.assertEqual(source.count('await restrictToLoopback(context, origin)'), 2)

    def test_evidence_records_actual_source_sha256(self):
        # Evaluate initialization only: fake server never starts, Chromium never
        # launches, no filesystem writes, and no network transport is present.
        import hashlib
        import json
        import subprocess
        script = r'''
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const file = path.resolve('tests/browser_homepage.cjs');
const sandbox = {
  require(name) {
    if(name === 'playwright-core') return {chromium:{}};
    if(name === 'node:http') return {createServer:()=>({listen(){}})};
    if(name === 'node:fs') return {...fs, mkdirSync(){}};
    return require(name);
  },
  __dirname:path.dirname(file), process:{env:{},argv:['node',file,'unused']}
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(file,'utf8'),sandbox);
console.log(JSON.stringify(vm.runInContext('report.sourceSha256 || {}',sandbox)));
'''
        result = subprocess.check_output(['node', '-e', script], cwd=links.ROOT, text=True)
        hashes = json.loads(result)
        paths = ['index.html', 'tests/browser_homepage.cjs', 'tests/check_public_links.py',
                 'tests/test_homepage.py', 'tests/test_public_links.py']
        self.assertEqual(hashes, {p: hashlib.sha256((links.ROOT / p).read_bytes()).hexdigest()
                                  for p in paths})


if __name__ == '__main__':
    unittest.main()
