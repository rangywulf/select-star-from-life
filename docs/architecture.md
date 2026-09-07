# Architecture

## Overview

`select-star-from-life` is a single-page, client-side tracker for an Open
Window 64 (Harada Method) chart mapping the path from data analyst to data
engineer. No backend, no build step, no frameworks. Everything runs in the
browser off one HTML file, one stylesheet, and one script (or a small set
of scripts, see below).

## Tech stack

- HTML, CSS, JavaScript only
- No npm, no bundler, no framework
- Persistence via `localStorage` (browser-only, no server)
- Hosted as a static site (e.g. GitHub Pages)

## File structure

```
select-star-from-life/
├── README.md
├── ARCHITECTURE.md
├── .gitignore
├── index.html
├── style.css
└── script.js
```

If `script.js` grows unwieldy, it can split into a `js/` folder loaded as
multiple `<script>` tags in order (data and storage helpers before the
render logic that depends on them). Not required to start.

## Page architecture

One `index.html`. Four "pages" exist as sibling `<div>` containers, each
tagged with a shared class (e.g. `.page`) plus a unique id. A nav bar with
four buttons toggles which page is visible by swapping a class (e.g.
`.active`) rather than navigating to a new URL. There is no routing, no
separate HTML files per page.

Pages:

- **Chart** — the mandala (8 pillars × 8 items =
