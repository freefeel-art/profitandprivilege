"""Read-only public link/resource check; no forms, affiliate links or analytics.
Run: python3 tests/check_public_links.py /absolute/evidence-dir
"""
from concurrent.futures import ThreadPoolExecutor
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess
import sys
from urllib.parse import urljoin, urlparse
from urllib.request import HTTPRedirectHandler, Request, build_opener

ROOT = Path(__file__).resolve().parents[1]
BASE = '80e5ad45672b1a58ad426219a4ba85aa04b0a6e4'
APEX = 'https://profitandprivilege.com/'
ALLOWED = {'profitandprivilege.com', 'bestbuybounty.com', 'olsp.profitandprivilege.com', 'mlmtraining.profitandprivilege.com'}


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a':
            href = attrs.get('href', '')
            if href and not href.startswith('#'):
                self.urls.add(urljoin(APEX, href))


def validate_destination(url):
    parsed = urlparse(url)
    if parsed.scheme != 'https' or parsed.hostname not in ALLOWED or parsed.query:
        raise ValueError('Not an approved plain editorial destination: ' + url)


class ApprovedRedirectHandler(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # urllib resolves relative Location headers before calling this hook.
        # Reject before the parent handler can open the redirected request.
        validate_destination(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(url):
    validate_destination(url)
    try:
        opener = build_opener(ApprovedRedirectHandler())
        with opener.open(Request(url, headers={'User-Agent': 'Mozilla/5.0 (P&P read-only link verification)'}), timeout=30) as response:
            data = response.read()
            return {'url': url, 'final_url': response.url, 'status': response.status,
                    'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}
    except Exception as error:
        return {'url': url, 'error': str(error)}


def main():
    parser = Links()
    parser.feed((ROOT / 'index.html').read_text())
    with ThreadPoolExecutor(max_workers=4) as pool:
        links = list(pool.map(fetch, sorted(parser.urls)))
    paths = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', BASE], cwd=ROOT, text=True).splitlines()
    protected = [p for p in paths if p.startswith(('assets/', 'about/', 'docs/assets/'))]
    with ThreadPoolExecutor(max_workers=4) as pool:
        resources = list(pool.map(fetch, [urljoin(APEX, '/about/' if p == 'about/index.html' else p) for p in protected]))
    for p, result in zip(protected, resources):
        result['path'] = p
        expected = subprocess.check_output(['git', 'show', f'{BASE}:{p}'], cwd=ROOT)
        result['matches_baseline'] = result.get('sha256') == hashlib.sha256(expected).hexdigest()
    report = {'links': links, 'protected_resources': resources,
              'passed': all(r.get('status') == 200 and r.get('bytes', 0) > 0 for r in links)
                        and all(r.get('matches_baseline') for r in resources)}
    output = Path(sys.argv[1])
    output.mkdir(parents=True, exist_ok=True)
    (output / 'public-links.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))
    return 0 if report['passed'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
