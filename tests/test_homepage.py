"""Static homepage regression checks. Run: python3 -m unittest discover -s tests -v."""
from html.parser import HTMLParser
from pathlib import Path
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
BASE = '80e5ad45672b1a58ad426219a4ba85aa04b0a6e4'


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.elements = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


def baseline(path):
    return subprocess.check_output(['git', 'show', f'{BASE}:{path}'], cwd=ROOT)


class HomepageTests(unittest.TestCase):
    def setUp(self):
        self.html = (ROOT / 'index.html').read_text()
        self.doc = Document(self.html)

    def test_skip_link_targets_focusable_main(self):
        skip = next(a for t, a in self.doc.elements if t == 'a' and a.get('class') == 'skip-link')
        main = next(a for t, a in self.doc.elements if t == 'main')
        self.assertEqual(skip['href'], '#' + main['id'])
        self.assertEqual(main.get('tabindex'), '-1')

    def test_navigation_distinguishes_home_projects_and_project_policies(self):
        header = self.html.split('<header ')[1].split('</header>')[0]
        self.assertIn('<a href="#practice">Projects</a>', header)
        footer = self.html.split('<footer ')[1].split('</footer>')[0]
        self.assertIn('<a href="/">Home</a>', footer)
        self.assertIn('<a href="/about/">About Me</a>', footer)
        self.assertIn('aria-label="On this site"', footer)
        self.assertIn('aria-label="Independent projects"', footer)
        self.assertIn('>OLSP privacy</a>', footer)
        self.assertIn('>OLSP affiliate disclosure</a>', footer)
        self.assertNotIn('>Privacy</a>', footer)
        self.assertNotIn('>Guides</a>', footer)
        self.assertNotIn('Chatbot Guides', footer)

    def test_published_project_reading_is_directly_accessible(self):
        practice = self.html.split('id="practice"')[1].split('</section>')[0]
        for href in ('https://bestbuybounty.com/neolife-hub/',
                     'https://olsp.profitandprivilege.com/reviews/dataforseo-review/',
                     'https://mlmtraining.profitandprivilege.com/reviews/mlmrod-cardly-training-review/'):
            with self.subTest(href=href):
                self.assertIn(f'href="{href}"', practice)
        self.assertEqual(practice.count('Start here:'), 3)

    def test_protected_files_and_sections_are_unchanged(self):
        protected = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', BASE], cwd=ROOT, text=True).splitlines()
        for path in protected:
            if path.startswith(('assets/', 'about/', 'docs/assets/')):
                with self.subTest(path=path):
                    self.assertEqual((ROOT / path).read_bytes(), baseline(path))
        old = baseline('index.html').decode()
        for start, end in [('<section aria-labelledby="intro-title"', '</section>'),
                           ('<section aria-labelledby="explore-title"', '</section>'),
                           ('<section aria-labelledby="thoughtful-title"', '</section>'),
                           ('<section aria-labelledby="research-title"', '</section>')]:
            self.assertEqual(self.html.split(start)[1].split(end)[0], old.split(start)[1].split(end)[0])
        self.assertEqual(self.html.count('<h1 '), 1)
        self.assertIn('<p class="status practice-status">In Development</p>', self.html)
        chatbot = self.html.split('<h3>Chatbot Guides</h3>')[1].split('</article>')[0]
        self.assertNotIn('href=', chatbot)

    def test_all_fragment_targets_and_local_resources_exist(self):
        ids = [a['id'] for _, a in self.doc.elements if 'id' in a]
        self.assertEqual(len(ids), len(set(ids)))
        for tag, attrs in self.doc.elements:
            for key in ('href', 'src'):
                value = attrs.get(key, '')
                if value.startswith('#'):
                    self.assertIn(value[1:], ids)
                elif value and not value.startswith(('https:', 'http:')):
                    path = ROOT / value.lstrip('/')
                    self.assertTrue(path.exists(), value)


if __name__ == '__main__':
    unittest.main()
