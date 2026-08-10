# Personal website

A minimal personal portfolio with three sections:

- Home for a portrait and biography
- Research & Projects for papers, PDFs, talks, datasets, and project links
- Writings for blog posts, short fiction, and quick takes

The site uses the Twilight palette, includes a persistent light/dark theme, and
shows clear in-progress states until content is added.

## Add content

See [`content/README.md`](content/README.md). Profile text and research entries
live in small JSON files under `content/`. Each writing is a normal Markdown
file under `content/writings/`. Portraits and PDFs live under `public/`.

## Work locally

This project requires Node.js 22.13 or newer and pnpm 11.16.

```bash
pnpm install
pnpm dev
```

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` builds a static version on every
push to `main`.

1. Put this project in a GitHub repository. A repository named
   `<your-github-name>.github.io` gets the cleanest address.
2. Open the repository's **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push `main`, or run the workflow manually from the **Actions** tab.

The build also supports project repositories published below a path such as
`https://<name>.github.io/<repository>/`.

## Verify

```bash
pnpm build
pnpm test
GITHUB_PAGES_BUILD=true pnpm build:pages
```
