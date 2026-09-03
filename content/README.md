# Add your content

Your profile and research entries use small JSON files. Each piece of writing
gets its own Markdown file, so a typo in one draft cannot break the whole
archive.

## Profile and photo

Edit `site.json`:

- `name`: your public name
- `eyebrow`: the short role line above the Home headline
- `headline`: the large Home headline
- `bio`: one or more quoted paragraphs
- `photo`: the public path to your portrait, or an empty string
- `photoAlt`: a short description of the portrait
- `email`: your public email, or an empty string
- `links`: optional profile links

Example bio and links:

```json
"bio": [
  "First paragraph of your biography.",
  "Optional second paragraph."
],
"email": "hello@example.com",
"links": [
  { "label": "GitHub", "url": "https://github.com/your-name" }
]
```

Put a portrait at `public/profile.jpg`, then set:

```json
"photo": "/profile.jpg"
```

If the bio or photo path is empty, visitors see an in-progress message.

## Research and projects

Put PDFs under `public/files/`. Then add objects to `research.json`:

```json
[
  {
    "published": true,
    "title": "A useful paper title",
    "date": "July 2026",
    "sortDate": "2026-07-01",
    "affiliation": "NSF REU",
    "kind": "Paper",
    "summary": "One or two sentences about the work.",
    "pdf": "/files/paper-name.pdf",
    "pdfLabel": "PDF",
    "fileSize": "1.8 MB",
    "links": [
      {
        "label": "Project page",
        "url": "https://example.com",
        "comingSoon": false,
        "tooltip": ""
      }
    ],
    "tags": ["Methods", "Topic"]
  }
]
```

Allowed `kind` values are `Paper`, `Project`, `Talk`, `Dataset`, and `Other`.
Keep every field in the example; use `""` for unused text and `[]` for unused
lists. Use `sortDate` in `YYYY-MM-DD` form so published entries sort newest
first. Use `pdfLabel` to customize the PDF link text. For an unavailable link,
leave `url` empty and set `comingSoon` to
`true`. Set `tooltip` to the message shown on hover or keyboard focus; leave it
empty to use “Coming soon.” Set `published` to `false` while an entry is still
a draft.

## Writing

Copy `writings/_template.md` to a new lowercase, hyphenated filename such as
`writings/why-small-tools-matter.md`. The top of the file contains its details:

```yaml
---
title: "Why small tools matter"
date: "2026-08-10"
type: "quick-take"
excerpt: "A one-sentence preview."
published: false
tags:
  - "Tools"
  - "Practice"
---
```

Write the piece below the second `---` in normal Markdown. Use `blog-post`,
`short-fiction`, or `quick-take` for `type`. Set `published` to `true` when the
piece is ready. Each published piece gets its own shareable page and appears in
the filtered Writings archive, newest first.

Writing pages support LaTeX math. Wrap inline math in single dollar signs, such
as `$p < 0.05$`. Put display math between double dollar signs on separate lines:

```markdown
$$
E = mc^2
$$
```

To link to a piece published somewhere else, add `url:` to its header and leave
the Markdown body empty. Add `linkLabel:` when you want custom link text:

```yaml
url: "https://example.com/my-piece"
linkLabel: "Read on LessWrong"
```

Do not edit `writings.generated.json`; the build recreates it from the Markdown
files automatically.

Each writing needs a unique filename or `slug`. The build stops with a clear
error if two pieces would receive the same URL. Keep `site.json` and
`research.json` as valid JSON; the build names either file if its commas or
quotes are malformed.
