# Architecture

## Overview

`select-star-from-life` is a multi-page, client-side tracker for an Open
Window 64 (Harada Method) chart mapping the path from data analyst to data
engineer. No backend, no build step, no frameworks. Four real HTML pages,
linked to each other with normal `<a href>` navigation.

## Tech stack

- HTML, CSS, JavaScript only
- No npm, no bundler, no framework
- IDE: VS Code
- Persistence via `localStorage` (shared across all pages on the same
  site, since it's tied to the domain, not to a single page)
- Hosted as a static site (e.g. GitHub Pages)

## File structure

```
select-star-from-life/
├── assets/
│   ├── sprites/
│   │   ├── tilemap-characters.png
│   │   └── tiny player spritesheet.png
│   └── tiles/
│       ├── Map Paths v1 18x18.png
│       ├── Map Snow Tiles v1 18x18.png
│       ├── Map Tiles 18x18 v2.png
│       ├── tilemap-backgrounds.png
│       └── tilemap.png
├── docs/
│   └── architecture.md
├── js/
│   ├── data/
│   │   ├── chart-data.js       (GOAL, PILLARS, MONTH, DAY_TEMPLATE)
│   │   ├── resources-data.js   (RESOURCES)
│   │   ├── cheatsheets-data.js (CHEATSHEETS)
│   │   └── flashcards-data.js  (FLASHCARDS)
│   ├── app.js          (shared: renders whichever page is loaded)
│   ├── nav.js          (shared: nav bar behavior, active-link styling)
│   └── storage.js      (shared localStorage load/save helpers)
├── README.md
├── index.html          (Chart: board + 4-week map)
├── resources.html      (not built yet)
├── cheatsheets.html    (not built yet)
├── flashcards.html     (not built yet)
└── style.css
```

`assets/sprites/` holds the player character sheets (from Kenney's Pixel
Platformer and the World Map Addons pack), `assets/tiles/` holds the
ground/path tilemaps used to build the board. Both are referenced from
`style.css` as background images, sliced via `background-position`
rather than split into separate files.

One practical note: `tiny player spritesheet.png` has spaces in its
filename. That works fine sitting in the folder, but spaces in a
filename get awkward once it's referenced in CSS or HTML (they need to
be written as `%20` in a URL, or the whole path wrapped in quotes).
Worth renaming it to `tiny-player-spritesheet.png` before you reference
it anywhere, one less thing to fight with later.

Data is split by page instead of one shared `data.js`, each page only
loads the data file it actually needs: `index.html` loads
`chart-data.js`, `flashcards.html` loads `flashcards-data.js`, and so on.
No page pulls in content it doesn't use.

Every HTML file loads `style.css`, then its own `js/data/*.js` file,
then `js/storage.js`, `js/nav.js`, and `js/app.js`, in that order, since
`app.js` depends on the others being loaded first. There's one shared
`app.js` for every page rather than a separate script per page, it
checks which elements exist in the current page's HTML (e.g. is there a
`#board`, a `#flashcard-deck`) and only renders the piece that page
actually has.

## Page architecture

Four separate HTML files, each a real page a browser can navigate to
directly:

- **index.html** — Chart: one horizontal board (8 pillars x 8 items =
  64 tiles, left to right), a pillar detail/zoom view, and the 4-week map
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
finished code. Split across four files under `js/data/` instead of one
shared file, so each page only loads what it needs:

**chart-data.js**, used by `index.html`:

**GOAL** — one object: a title and a short subtitle describing the
ultimate goal.

**PILLARS** — an array of 8 objects, one per pillar, in board order
(first pillar is the leftmost section, last pillar is the rightmost
before the goal). Each has: an id, a name, a short subtitle, a phase
(`now` or `later`), an optional list of resources, and a list of 8 items. Each item has: the
task text, a size tag (`quick`, `session`, or `milestone`), and an
optional list of sub-steps for milestone-sized items.

**MONTH** — an array of 4 week objects. Each has a label, a Java chapter
target range, and which two languages that week's code-practice days
rotate through.

**DAY_TEMPLATE** — a 7-entry array describing the weekly shape (which
day maps to which pillar, or to a code-practice slot, or to rest). Reused
by every week in MONTH.

**resources-data.js**, used by `resources.html`:

**RESOURCES** — practice sites grouped by category (SQL, Python, Code
Practice, Interview Prep), each entry a name, a link, and a one-line why.

**cheatsheets-data.js**, used by `cheatsheets.html`:

**CHEATSHEETS** — reference content grouped by language, each language a
list of labeled code blocks.

**flashcards-data.js**, used by `flashcards.html`:

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

The chart itself is styled as one continuous 8-bit/pixel-art game board,
inspired by Habitica's task-to-RPG mechanics but adapted to this
project's actual shape. This isn't a separate system layered on top of
the chart, the board IS the chart.

**Layout**: not zones/rows. One continuous linear path, like a level map,
starting at the beginning of the journey and ending at a final
"Data Engineer" tile. The path lays out all 64 chart items in order, in
the same sequence as the pillars on the board, since it IS the board,
not a separate view of it.

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