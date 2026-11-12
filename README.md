# Spring Boot 4: what's new and how to migrate

A one-page poster on Spring Boot 4. It covers the main new features and a migration checklist for teams moving from Spring Boot 3 to 4.

**Live site:** https://mariolecker.github.io/spring-boot-4-migration-guide/

[Print-ready PDF](https://mariolecker.github.io/spring-boot-4-migration-guide/downloads/spring-boot-4-poster.pdf)

## Repository layout

```
docs/                 the hosted site (GitHub Pages serves this folder)
  index.html          the page
  404.html            not-found page
  robots.txt          crawler rules and sitemap location
  sitemap.xml         sitemap for search engines
  assets/             css, js, fonts (with licenses), images
  downloads/          print-ready PDF
tools/export-pdf.mjs  exports docs/index.html as the print PDF
```

The site is plain HTML and CSS. There is no build step, and it makes no requests to third-party servers.

## Run locally

From the repository root:

```bash
python -m http.server 8123
```

Then open http://localhost:8123/docs/.

## Regenerate the PDF

With the local server running (needs Node 22 or later and Google Chrome):

```bash
node tools/export-pdf.mjs
```

This writes `docs/downloads/spring-boot-4-poster.pdf`, a single vector page 423 mm wide with embedded fonts.

## Updating content

Edit `docs/index.html`, then re-export the PDF and update the `lastmod` date in `docs/sitemap.xml` and `article:modified_time` and `dateModified` in the head of `docs/index.html`.

## Credits

- Content is compiled from the official Spring documentation listed in the poster's sources.
- Fonts: [Metropolis](https://github.com/dw5/Metropolis), [Work Sans](https://github.com/weiweihuanghuang/Work-Sans) and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), under the licenses in `assets/fonts/`.
- Icons: [Lucide](https://lucide.dev) (ISC).
- This is a community poster, not affiliated with the Spring team or Broadcom. Spring and Spring Boot are trademarks of Broadcom Inc.
