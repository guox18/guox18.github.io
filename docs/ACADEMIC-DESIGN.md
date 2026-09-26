# Academic profile design

Reference reviewed on 2026-09-26: https://jiaxuanzou0714.github.io/

The visual reference uses a compact academic biography, a circular portrait,
serif reading text, blue links, and paper thumbnails. This site adapts those
principles to Xu Guo's research and existing content. It retains the Jekyll
publication database and existing public URLs.

## Design choices

- Palette: cool paper `#f7f9fc`, white figures `#ffffff`, text `#192a3a`,
  secondary text `#52677c`, links `#1b63a0`, dividers `#dce4ec`.
- Type: Lora for reading; Source Sans 3 for headings, navigation and metadata.
- Layout: a left-aligned biography beside a compact portrait and contact links;
  research interests, recent news and publications follow in one column.
- Portrait: the original travel photograph is framed around the head and
  shoulders using CSS clipping; the original image file is preserved.
- Research identity comes from the actual paper figures and readable titles.
  Paper records have lightweight links and native keyboard-accessible BibTeX
  disclosures. The footer sits after the content.
- Small screens stack the biography and contact area, dates and announcements,
  and publication images and text. Dark mode and reduced motion are supported.

```text
Name / affiliation                 Portrait
Biography                          Contact links

Research interests
News                               All updates
Date      Announcement

Selected publications              All publications
Figure    Title / authors / venue / links
```

The reference's blog and CV navigation are not added because this site's
current public content does not include those sections.

## Maintenance

- `_layouts/academic-home.liquid`: homepage structure.
- `_layouts/academic-bib.liquid`: paper rows; reads `_bibliography/papers.bib`.
- `_sass/_academic-profile.scss`: site typography, color and responsive layout.
- `assets/css/main.scss`: intentional theme entry-point override, based on
  `al_folio_core` 1.0.11 and appending the site stylesheet. Its upstream hash is
  acknowledged in `.al-folio-overrides.yml`.
- `_pages/about.md`: biography, structured identity data and research interests.
- `_news/`: announcements; Hong Kong time keeps local announcement dates correct.
  Do not add announcements solely for uploading a preprint to arXiv.

Build with Ruby 3.3.5 and Bundler 4.0.6, matching the deployment workflow:

```sh
bundle install
npm ci
JEKYLL_ENV=production bundle exec jekyll build
npx purgecss -c purgecss.config.js
bundle exec al-folio upgrade overrides audit --fail-on-stale
```

## Figure provenance

Thumbnails are reduced copies of figures from the author's existing paper
sources or images supplied by the author. No assets from the reference website
are redistributed. JSA alone carries the author-requested CCF-B label, stored
in `_data/venues.yml`.

| Thumbnail | Paper and source figure |
| --- | --- |
| `synthetic-data-scaling.png` | [Synthetic Data Scaling](https://arxiv.org/abs/2607.01727), `figures/teaser.pdf` |
| `synthetic-prepretraining.png` | [Synthetic Pre-Pre-Training](https://arxiv.org/abs/2605.10129), token-saving panel of the overview figure |
| `mcq-rlvr.png` | [MCQ RLVR](https://arxiv.org/abs/2603.12826), distractor quantity/quality motivation figure |
| `ifdecorator.png` | [IFDECORATOR](https://arxiv.org/abs/2508.04632), `figure/exp_ifeval_ifhack.pdf` |
| `jsa-transferable-attacks.png` | [JSA transferable attacks](https://doi.org/10.1016/j.sysarc.2024.103155), attack overview supplied by the author on 2026-09-26 |

For a review, check desktop and mobile screenshots, horizontal overflow, image
loading after scrolling, keyboard BibTeX disclosure, publication filtering,
navigation and dark mode. Keep the canonical title, description and structured
identity links intact when revising display copy.
