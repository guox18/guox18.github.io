# Xu Guo

Official academic homepage of **Xu Guo (郭旭)**, a PhD student at the School of Computer Science, Fudan University. Built with [al-folio](https://github.com/alshedivat/al-folio) and hosted on GitHub Pages.

Site: <https://guox18.github.io>

Academic profiles: [Xu Guo on Google Scholar](https://scholar.google.com/citations?user=XFs39mgAAAAJ) · [DBLP](https://dblp.org/pid/46/5508-4) · [ORCID](https://orcid.org/0000-0002-6510-8579)

## Maintenance

- Edit `_pages/about.md` for the homepage bio.
- Edit `_bibliography/papers.bib` for publications.
- Edit `_data/socials.yml` for Google Scholar, GitHub, email, and other links.
- Edit `_pages/blog.md` for the blog index. Publish articles as `_posts/YYYY-MM-DD-slug-zh.md` and `-en.md`, using `layout: bilingual-post`, `title`, `date`, `description`, `lang` (`zh-CN` or `en`), and a shared `translation_key`. Give each version a unique `permalink` (for example, `/blog/2026/slug/` and `/blog/2026/slug/en/`). Publish only completed language versions.
- Use `topic: research`, `engineering`, `workflow`, or `preview` for the index filters. Mark style tests with `preview: true`. Store article images in `assets/img/posts/`.
- Heading navigation is automatic. Set `navigation_graph: true` to offer a collapsed article map; set it to `false` to omit the map. The map derives same-language references and backlinks from links in the published articles. Keep links within the same language unless deliberately linking to a translation.
- Push to `main`; GitHub Actions builds the site and deploys to `gh-pages`.
