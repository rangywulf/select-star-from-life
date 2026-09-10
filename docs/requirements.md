# Requirements

What the site must actually do, page by page, plus the constraints that
apply across all of it. This is the "what" and "must," `architecture.md`
covers the "how."

## Chart page (index.html)

- Displays all 8 pillars as one horizontal board game, one section per
  pillar, left to right, ending at a final "Data Engineer" tile
- A character/token shows current position on the board, moving right
  as items get checked off
- Each pillar shows its progress as a fraction (e.g. 3/8 complete)
- Clicking a pillar opens a detail view showing its 8 items
- Each item is checkable; checked state persists across page reloads and
  browser sessions
- Pillars marked "later" phase are visually distinguished from "now"
  phase pillars
- Displays the 4-week map with a tab per week
- Each week shows its Java chapter target and its 7-day schedule
- SQL and Python days show the next not-yet-completed item from that
  pillar
- Code Practice days rotate through Python, SQL, and Java per the
  defined weekly schedule
- Rest day is static, no dynamic content pulled in

## Resources page (resources.html)

- Lists practice sites grouped by category (SQL, Python, Code Practice,
  Interview Prep)
- Each entry shows a name, a working link, and a one-line reason it's
  useful

## Cheat sheets page (cheatsheets.html)

- Provides reference content organized by language (SQL, Python, Java)
- Content is readable and findable without leaving the page

## Flashcards page (flashcards.html)

- Supports filtering the deck by category
- Supports flipping a card to reveal its answer
- Supports moving to the next and previous card
- Tracks current position in the deck

## Gamification (scoring & rewards)

These sit on top of the one board above, not a separate system:

- Awards points once per calendar day of activity, not per action
- Tracks and displays current streak and longest streak
- Calculates rank from total items completed (see rank table in
  `architecture.md`)
- Awards a badge when all 8 items in a pillar are complete
- Does NOT implement a health/damage mechanic or a gold/reward-shop,
  that's explicitly out of scope for now

## Non-functional requirements

- No backend, no build tools, no frameworks, plain HTML/CSS/JS only
- Runs entirely client-side in the browser
- State persists via `localStorage` across reloads and page navigation
- Navigation between pages uses real links between separate HTML files,
  no client-side routing
- Hosted as a static site (e.g. GitHub Pages)

## Out of scope (for now)

- Backend or server-side sync across devices
- User accounts or authentication
- A mobile app version