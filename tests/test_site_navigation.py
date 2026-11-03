"""Public HTML contract for the three curated P&P editorial sites."""
from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
SITES = {
    'https://olsp.profitandprivilege.com/',
    'https://mlmtraining.profitandprivilege.com/',
    'https://chatbotguides.profitandprivilege.com/',

}


class Links(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.nav = None
        self.links = {}
        self.all_links = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'nav':
            self.nav = attrs.get('aria-label')
        if tag == 'a':
            self.all_links.append(attrs)
            if self.nav:
                self.links.setdefault(self.nav, []).append(attrs)

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.nav = None


class PublishedSitesTests(unittest.TestCase):
    def test_all_published_sites_in_navigation_and_footer(self):
        for path in ['index.html', 'about/index.html']:
            doc = Links((ROOT / path).read_text())
            for label in ['Our sites', 'Independent projects']:
                with self.subTest(page=path, navigation=label):
                    links = doc.links.get(label, [])
                    self.assertEqual({a['href'] for a in links}, SITES)
                    for a in links:
                        self.assertEqual(a.get('target'), '_blank')
                        self.assertEqual(set(a.get('rel', '').split()), {'noopener', 'noreferrer'})
            self.assertFalse(any('bestbuybounty' in a.get('href', '').lower() for a in doc.all_links))
            self.assertFalse(any('faucet.profitandprivilege.com' in a.get('href', '').lower() for a in doc.all_links))
            self.assertNotIn('Faucet', (ROOT / path).read_text())


if __name__ == '__main__':
    unittest.main()
