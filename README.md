# Anderson Computer Consulting Website

Jekyll-based GitHub Pages site for Anderson Computer Consulting.

## Tech Stack

- **Framework:** Jekyll (GitHub Pages native)
- **Styling:** Custom CSS (MAC-OPS color scheme)
- **Icons:** Bootstrap Icons
- **Code highlight:** highlight.js
- **Chatbot:** Botpress (free tier)
- **Forms:** Formspree (free tier)

## Local Development

```bash
gem install bundler
bundle install
bundle exec jekyll serve --livereload
```

Site runs at `http://localhost:4000`

## Content Editing Workflow

The site is intentionally structured so the most common edits do **not** require touching raw HTML.

### Best places to edit in VS Code

| What you want to change | Where to edit |
|---|---|
| About and company pages | `about/*.md` |
| Service pages | `services/*.md` |
| Market pages | `markets/*.md` |
| Blog posts | `_posts/*.md` |
| Knowledge base articles | `_kb/**/*.md` |
| Code snippets | `_snippets/**/*.md` |
| Download inventory | `_data/downloads.yml` |
| Company profile and homepage highlights | `_data/company.yml` |
| Contact details and intake options | `_data/contact.yml` |
| Downloadable templates and guides | `assets/downloads/**` |

### WYSIWYG-friendly editing

If you prefer a richer editor experience, use a Markdown-aware editor such as:

- **Typora**
- **MarkText**
- **Obsidian**

These work well with the Markdown-based pages, posts, KB articles, snippets, and downloadable templates in this repo.

### VS Code recommendations

This repo includes `.vscode/extensions.json` with recommended extensions for:

- Markdown authoring
- YAML editing
- formatting
- linting

## Deploying to GitHub Pages

1. Push to `main` branch
2. GitHub Actions deploys automatically via `.github/workflows/deploy.yml`
3. Enable GitHub Pages in repo Settings → Pages → Source: GitHub Actions

## Chatbot Setup (Botpress)

1. Sign up at [botpress.com](https://botpress.com)
2. Create a bot and configure responses
3. Go to Share → Embed → copy webchat URL
4. Edit `assets/js/chatbot.js` — set `BOTPRESS_EMBED_URL` to your URL

## Contact Form Setup (Optional Hosted Form)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your form ID
3. Edit `_data/contact.yml` and set `form_action` to your hosted form endpoint
4. If `form_action` is blank, the site automatically shows direct email/LinkedIn contact options instead of a broken form

## Adding Content

### Knowledge Base Article
Create `_kb/<category>/article-name.md` with front matter:
```yaml
---
title: Article Title
description: One-line description
category: Networking
tags: [cisco, ios]
updated: 2026-03-28
---
```

### Code Snippet
Create `_snippets/<language>/snippet-name.md` with front matter:
```yaml
---
title: Snippet Title
description: What it does
language: Ansible
tags: [ansible, freeipa]
---
```

### Blog Post
Create `_posts/YYYY-MM-DD-post-title.md` with front matter:
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
category: Category
author: Mike Anderson
read_time: 5
excerpt: Brief description
---
```

### Download File
Place file in `assets/downloads/<category>/` and add an entry to `_data/downloads.yml`.

## Structure

```
anderson-computer-consulting/
├── _config.yml          # Site config
├── _data/               # Navigation, services data
├── _includes/           # Header, footer, chatbot
├── _layouts/            # Page templates
├── _kb/                 # Knowledge base articles
├── _snippets/           # Code share snippets
├── _posts/              # Blog posts
├── assets/              # CSS, JS, images, downloads
├── services/            # Service pages
├── markets/             # Market pages
├── about/               # About pages
├── knowledge-base/      # KB index
├── code-share/          # Code share index
├── downloads/           # Downloads index
├── blog/                # Blog index
├── contact/             # Contact form
├── case-studies/        # Case studies
└── legal/               # Privacy, terms
```
