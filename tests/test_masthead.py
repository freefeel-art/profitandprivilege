"""Regression for the shared apex masthead and curated site directory."""
from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

class Elements(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.items = []
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        self.items.append((tag, dict(attrs)))

class MastheadTests(unittest.TestCase):
    def test_about_has_the_same_reusable_masthead_structure(self):
        for path in ['index.html', 'about/index.html']:
            doc = Elements((ROOT / path).read_text())
            with self.subTest(path=path):
                self.assertTrue(any(t == 'header' and 'apex-masthead' in a.get('class', '').split() for t, a in doc.items))
                self.assertTrue(any(a.get('class') == 'brand-mark' for _, a in doc.items))
                self.assertTrue(any(t == 'button' and a.get('id') == 'navToggle' for t, a in doc.items))
                self.assertTrue(any(t == 'script' and a.get('src') == '/assets/pp-visual-v1/shell.js' for t, a in doc.items))

if __name__ == '__main__':
    unittest.main()
