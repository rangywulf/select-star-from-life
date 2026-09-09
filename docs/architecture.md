# Architecture

## Overview

`select-star-from-life` is a multi-page, client-side tracker for an Open
Window 64 (Harada Method) chart mapping the path from data analyst to data
engineer. No backend, no build step, no frameworks. Four real HTML pages,
linked to each other with normal `<a href>` navigation.

## Tech stack

- HTML, CSS, JavaScript only
- No npm, no bundler, no framework
- Persistence via `localStorage` (shared across all pages on the same
  site, since it's tied to the domain, not to a single page)
- Hosted as a static site (e.g. GitHub Pages)

## File structure

```
select-star-from-life/
├── docs/
│   └── architecture.md
├── js/
│   ├── app.js          (shared: renders whichever page is loaded)
│   ├── data.js         (shared content: GOAL, PILLARS, MONTH, etc.)
│   ├── nav.js          (shared: nav bar behavior, active-link styling)
│   └── storage.js      (shared localStorage load/save helpers)
├── README.md
├── index.html          (Chart: mandala + 4-week map)
├── resources.html      (not built yet)
├── cheatsheets.html    (not built yet)
├── flashcards.html     (not built yet)
└── style.css
```

All four HTML pages load the same shared scripts from `js/`, no new
script files needed as `resources.html`, `cheatsheets.html`, and
`flashcards.html` get built.

Every HTML file loads `style.css`, then `js/data.js`, `js/storage.js`,
`js/nav.js`, and `js/app.js`, in that order, since `app.js` depends on
the others being loaded first. There's one shared `app.js` for every
page rather than a separate script per page, it checks which elements
exist in the current page's HTML (e.g. is there a `#board`, a
`#flashcard-deck`) and only renders the piece that page actually has.

## Page architecture

Four separate HTML files, each a real page a browser can navigate to
directly:

- **index.html** — Chart: the mandala (8 pillars × 8 items = 64 cells),
  a pillar detail/zoom view, and the 4-week map
- **resources.html** — links to practice sites, grouped by category
- **cheatsheets.html** — reference material, tabbed by language (SQL,
  Python, Java)
- **flashcards.html** — a question/answer deck with category filtering

Each page includes the same nav bar markup at the top (four links, one
per page), duplicated across all four files since there's no templating
in plain HTML. The link for whichever page you're currently on gets a
hardcoded "active" style directly in that file's HTML, it's not
computed by JavaScript.

Navigating between pages is a real page load (clicking a link takes you
to an actual different `.html` file), not a JS-driven view swap.

## Data model

These are the shapes the data lives in, described conceptually, not as
finished code. All of it lives in `data.js` so every page can read it:

**GOAL** — one object: a title and a short subtitle describing the
ultimate goal.

**PILLARS** — an array of 8 objects, one per pillar. Each has: an id, a
compass coordinate, a name, a short subtitle, a phase (`now` or `later`),
an optional list of resources, and a list of 8 items. Each item has: the
task text, a size tag (`quick`, `session`, or `milestone`), and an
optional list of sub-steps for milestone-sized items.

**MONTH** — an array of 4 week objects. Each has a label, a Java chapter
target range, and which two languages that week's code-practice days
rotate through.

**DAY_TEMPLATE** — a 7-entry array describing the weekly shape (which
day maps to which pillar, or to a code-practice slot, or to rest). Reused
by every week in MONTH.

**RESOURCES** — practice sites grouped by category (SQL, Python, Code
Practice, Interview Prep), each entry a name, a link, and a one-line why.

**CHEATSHEETS** — reference content grouped by language, each language a
list of labeled code blocks.

**FLASHCARDS** — an array of cards, each with a category, a question, and
an answer.

## State

Each page only tracks state relevant to itself, in memory, while that
page is open:

- **index.html (Chart)** — which pillar is open in the detail view,
  checkbox progress per pillar, which week of the 4-week map is selected
- **flashcards.html** — active category filter, current card index,
  whether the current card is flipped
- **resources.html / cheatsheets.html** — no real state beyond what tab
  is showing, if tabs are used within the page

There's no single shared "current page" state, the current page is just
whichever HTML file the browser has loaded.

## Persistence

Saved to `localStorage` so progress survives both a page reload and
navigating to a different page (localStorage is shared across all pages
on the same site):

- pillar checkbox progress
- selected week

Flashcard position and flip state reset on page load, that's fine, they
don't need to survive navigation.

## Rendering approach

Plain DOM manipulation (`createElement`, `innerHTML`, `textContent`), no
virtual DOM. `app.js` is shared across every page: on load, it checks
which elements exist in the current page's HTML and only renders the
piece that page actually has (a `#board` means render the chart, a
`#flashcard-deck` means render flashcards, and so on). `nav.js` handles
the nav bar itself, mainly marking the current page's link as active.
There's no central router to write, navigation is just normal links
between real files, the browser does the actual "routing."

## Gamification

The chart's checklist gets a game layer on top, styled 8-bit/pixel-art,
inspired by Habitica's task-to-RPG mechanics but adapted to this
project's actual shape.

**Layout**: not zones/rows. One continuous linear path, like a level map,
starting at the beginning of the journey and ending at a final
"Data Engineer" tile. The path lays out all 64 chart items in order, in
the same sequence as the mandala's pillars, so completing tiles left to
right on the path mirrors completing pillars in the chart.

**Task types**, borrowed from Habitica's three-category split:

- **To-Dos** — the 64 one-time chart items themselves. Each is one tile
  on the path. Checking one off in the chart advances the player marker
  to that tile.
- **Dailies** — the recurring rotation days from the 4-week map (SQL,
  Python, Code Practice). These aren't tiles on the path, they drive the
  streak counter instead, the same way Habitica's dailies do.
- **Habits** — ongoing, no-fixed-day items like keeping the cheat sheet
  current. Tracked separately from the path, no penalty for skipping a
  day, just there to nudge at.

**Progression**:

- XP/leveling maps to the rank system already defined (Null through
  Data Engineer), based on total path tiles completed.
- Points come from daily practice (Dailies), same as before, separate
  from rank.
- Badges are placed at the boundary between one pillar's 8 tiles and
  the next, unlocked when that stretch of the path is fully complete.
- No health/damage mechanic and no gold/reward-shop, unless that gets
  added later, the goal here is progress visualization, not punishment.

**Visual style**: pixel-art tiles and marker, not the flat/minimal look
used elsewhere in this doc's earlier mockup exploration. This section
describes the concept only, the actual look gets designed later.
