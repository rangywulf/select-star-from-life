// chart-data.js
// All the content for the Chart page (index.html): the mandala, the
// 4-week map, and the code-practice rotation. Loaded by index.html only.

// GOAL is the center of the mandala, the ultimate goal the whole chart
// is built around.
const GOAL = {
  title: "Become a Data Engineer",
  sub: "while finishing the software dev certificate"
};

// PILLARS is the 8 pillars of the Open Window 64 chart. Each pillar has
// 8 items, so 8 x 8 = 64 total actions.
//
// Field notes:
//   id      - short unique slug for the pillar. PILLARS is a plain
//             ordered array, so this order IS the left-to-right order
//             of sections on the board, first pillar is the first
//             section, last pillar is the last one before the goal
//   phase   - "now" if this is something to work on today, "later" if
//             it's an end goal that starts once the certificate is done
//   items[].sz    - how big the task is:
//                   "quick"     = one sitting (about 30-60 minutes)
//                   "session"   = several sittings over 1-2 weeks
//                   "milestone" = a multi-week project
//   items[].steps - only present on some "milestone" items, a short
//                   breakdown of sub-steps so the big task isn't just
//                   one intimidating line
const PILLARS = [
  {
    id: "sql", name: "SQL Fluency",
    sub: "Turn 1 year of on-and-off SQL into real depth.",
    phase: "now",
    items: [
      { t: "Learn window functions: ROW_NUMBER, RANK, LAG/LEAD", sz: "session" },
      { t: "Practice CTEs, including recursive CTEs for hierarchies", sz: "session" },
      { t: "Read EXPLAIN plans and learn basic indexing", sz: "session" },
      { t: "Study star vs. snowflake schema design", sz: "quick" },
      { t: "Drill interview-style problems weekly (StrataScratch, LeetCode SQL)", sz: "session" },
      { t: "Query a real messy dataset every week, not just clean practice sets", sz: "session" },
      { t: "Learn how dbt uses SQL: models, refs, materializations", sz: "quick" },
      { t: "Keep a personal SQL pattern cheat sheet", sz: "quick" }
    ]
  },
  {
    id: "python", name: "Python for Data Engineering",
    sub: "Move from analyst scripts to pipeline code.",
    phase: "now",
    items: [
      { t: "Solidify core Python: functions, classes, error handling", sz: "session" },
      { t: "Go deep on pandas for ETL-style transforms", sz: "session" },
      {
        t: "Build one script that does a full extract-transform-load", sz: "milestone",
        steps: [
          "Extract: pull data from one real source (an API or a CSV)",
          "Transform: clean and reshape it into a usable table",
          "Load: write the result into a file or database table",
          "Wire all three steps together and run it end to end once"
        ]
      },
      { t: "Practice calling APIs: requests, pagination, auth basics", sz: "session" },
      { t: "Learn pytest basics so functions are testable", sz: "quick" },
      { t: "Build on your venv habit: understand packaging, not just usage", sz: "quick" },
      {
        t: "Automate a real recurring task end to end", sz: "milestone",
        steps: [
          "Pick one task you already do by hand (a Sea of Conquest or Shopify report)",
          "Script the manual steps one at a time",
          "Add basic error handling so it doesn't fail silently",
          "Schedule or trigger it so it runs without you"
        ]
      },
      { t: "Study Python DAGs, since Airflow pipelines are written in Python", sz: "quick" }
    ]
  },
  {
    id: "infrastructure", name: "Data Infrastructure & Tools",
    sub: "The systems data engineers actually run. Comes as an actual course later in the program, park it until then.",
    phase: "later",
    items: [
      { t: "Learn dbt fundamentals: models, tests, docs", sz: "session" },
      { t: "Spin up a free-tier cloud warehouse (BigQuery or Snowflake)", sz: "quick" },
      { t: "Learn orchestration concepts: DAGs, scheduling, retries", sz: "quick" },
      { t: "Explore data cataloging through OpenMetadata", sz: "quick" },
      { t: "Understand batch vs. streaming at a conceptual level", sz: "quick" },
      { t: "Practice fact/dimension modeling for a warehouse", sz: "session" },
      { t: "Get comfortable with git branches and PRs for data projects", sz: "session" },
      { t: "Learn Docker basics as the shipping unit for pipelines", sz: "session" }
    ]
  },
  {
    id: "certificate", name: "Software Dev Certificate",
    sub: "The credential you're finishing right now.",
    phase: "now",
    items: [
      { t: "Stay current on coursework and assignments", sz: "session" },
      { t: "Map each CS fundamental (data structures, OOP) to a DE use case", sz: "quick" },
      {
        t: "Build one certificate project that touches real data", sz: "milestone",
        steps: [
          "Pick an assignment or side project you can bend toward data",
          "Add a data source: a CSV, database, or API",
          "Have it read, process, and output something",
          "Write two sentences on how it connects to data engineering"
        ]
      },
      { t: "Practice algorithm problems in Python, SQL, and Java, building on data structures coursework", sz: "session" },
      { t: "Keep a running glossary to translate into Python later", sz: "quick" },
      { t: "Track milestones and deadlines so nothing sneaks up", sz: "quick" },
      { t: "Connect with classmates headed toward software or data roles", sz: "quick" },
      { t: "Finish on schedule, it's the anchor credential", sz: "milestone" }
    ]
  },
  {
    id: "portfolio", name: "Portfolio Projects",
    sub: "Proof you can build the whole pipeline. End goal, starts after the certificate.",
    phase: "later",
    items: [
      { t: "Pick one end-to-end project: extract, transform, load, visualize", sz: "quick" },
      { t: "Base it on something you actually care about (garden data, game data)", sz: "quick" },
      { t: "Document it like a case study: problem, approach, tradeoffs", sz: "session" },
      { t: "Add a Tableau or dashboard layer to show the 'so what'", sz: "session" },
      { t: "Push clean, commented code to GitHub (rangywulf)", sz: "session" },
      { t: "Write a Medium post walking through the build", sz: "session" },
      { t: "Get one project reviewed by someone more senior", sz: "quick" },
      {
        t: "Iterate: add tests or scheduling to make it feel production-grade", sz: "milestone",
        steps: [
          "Add one or two automated tests for your core function",
          "Add basic logging so failures are visible",
          "Set it to run on a schedule (cron, Task Scheduler, or Airflow)",
          "Write down what would break it and how you'd know"
        ]
      }
    ]
  },
  {
    id: "open-source", name: "Open Source Contribution",
    sub: "Real-world codebases, real review process. End goal, starts after the certificate.",
    phase: "later",
    items: [
      { t: "Pick one project first: dbt-core, OpenMetadata, pandas, or JabRef", sz: "quick" },
      { t: "Read the contributing guide and set up the dev environment", sz: "session" },
      { t: "Find a 'good first issue' to start with", sz: "quick" },
      { t: "Make one small documentation or bug-fix PR", sz: "session" },
      { t: "Join the project's community chat and lurk to learn", sz: "quick" },
      { t: "Review someone else's PR to learn how review works", sz: "quick" },
      { t: "Log contributions in your brag doc system", sz: "quick" },
      {
        t: "Aim for one merged PR as a portfolio-worthy proof point", sz: "milestone",
        steps: [
          "Open a draft PR early so maintainers see it's coming",
          "Respond to review feedback within a few days",
          "Keep the change small and focused",
          "Follow up politely if it goes quiet for a week"
        ]
      }
    ]
  },
  {
    id: "job-search", name: "Job Search & Interview Prep",
    sub: "Turning skill into an offer. End goal, starts after the certificate.",
    phase: "later",
    // resources here are extra links tied to just this one pillar,
    // separate from the site-wide Resources page
    resources: ["Paradigm - technical question practice"],
    items: [
      { t: "Keep every application and its status in one tracker", sz: "quick" },
      { t: "Practice SQL/Python interview questions on a regular cadence", sz: "session" },
      { t: "Prep 3-5 STAR stories from real experience (shop, Plancuterie work)", sz: "session" },
      { t: "Run a mock interview with a friend or mentor", sz: "quick" },
      { t: "Tailor resume and portfolio links per role type", sz: "session" },
      { t: "Research each target company's data stack beforehand", sz: "quick" },
      { t: "Follow up and log outcomes to refine your approach", sz: "quick" },
      { t: "Grow your network: LinkedIn, local meetups, data Discords", sz: "session" }
    ]
  },
  {
    id: "habits", name: "Habits & Mindset",
    sub: "The pace that makes the other 7 pillars possible.",
    phase: "now",
    items: [
      { t: "Protect a consistent weekly study block around business + school", sz: "quick" },
      { t: "Track small wins, not just a to-do list of what's left", sz: "quick" },
      { t: "Set boundaries so Plancuterie work doesn't crowd out learning time", sz: "quick" },
      { t: "Use your Medium writing to process and cement what you learn", sz: "session" },
      { t: "Rest on purpose, this is a marathon, not a sprint", sz: "quick" },
      { t: "Revisit this chart monthly and adjust as skills grow", sz: "quick" },
      { t: "Celebrate certificate, portfolio, and interview milestones as they land", sz: "quick" },
      { t: "Remember: beginner right now, not beginner forever", sz: "quick" }
    ]
  }
];

// MONTH is the 4-week map. Each week has a Java chapter target (based on
// starting at chapter 10 and a pace of about 2 chapters a week) and which
// two languages that week's code-practice days rotate through.
const MONTH = [
  { label: "Week 1", javaChapters: "10-11", codeLangs: ["Python", "SQL"] },
  { label: "Week 2", javaChapters: "12-13", codeLangs: ["Java", "Python"] },
  { label: "Week 3", javaChapters: "14-15", codeLangs: ["SQL", "Java"] },
  { label: "Week 4", javaChapters: "16-17", codeLangs: ["Python", "SQL"] }
];

// DAY_TEMPLATE is the weekly shape, reused by every week in MONTH.
//   type: "pillar" -> pull the next unfinished item from pillarId
//   type: "code"   -> code practice day, language comes from
//                     MONTH[weekIndex].codeLangs[slot]
//   type: "rest"   -> no task, this is the review/rest day
const DAY_TEMPLATE = [
  { day: "Mon", type: "pillar", pillarId: "sql" },
  { day: "Tue", type: "pillar", pillarId: "python" },
  { day: "Wed", type: "code", slot: 0 },
  { day: "Thu", type: "pillar", pillarId: "sql" },
  { day: "Fri", type: "pillar", pillarId: "python" },
  { day: "Sat", type: "code", slot: 1 },
  { day: "Sun", type: "rest" }
];

// CODE_PRACTICE holds the instructions shown on a "code" type day,
// keyed by language name (matches the strings used in MONTH.codeLangs).
const CODE_PRACTICE = {
  Python: "3-5 problems on LeetCode/HackerRank, Python track",
  SQL: "3-5 SQL problems (StrataScratch or LeetCode SQL)",
  Java: "3-5 problems in Java, reinforcing whatever chapter you're on"
};