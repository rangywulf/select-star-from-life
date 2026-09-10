// resources-data.js
// Content for the Resources page (resources.html): practice sites,
// grouped by category. Loaded by resources.html only.

// RESOURCES is grouped by category so the page can render one section
// per category. Each entry has:
//   name - the site's name
//   url  - where it lives (leave this out if there's no link yet)
//   why  - a one-line reason it's useful, shown under the name
const RESOURCES = {
  SQL: [
    {
      name: "SQLZoo",
      url: "https://sqlzoo.net/",
      why: "Structured, beginner-friendly progression, good for closing gaps like joins and subqueries"
    },
    {
      name: "StrataScratch",
      url: "https://www.stratascratch.com/",
      why: "Real interview-style SQL questions, closer to what actually gets asked"
    },
    {
      name: "DataLemur",
      url: "https://datalemur.com/",
      why: "SQL and data analytics interview questions specifically, smaller and more focused than a general problem site"
    }
  ],

  Python: [
    {
      name: "Exercism",
      url: "https://exercism.org/",
      why: "Bite-sized exercises with mentor-style feedback, good for building real fluency, not just passing tests"
    },
    {
      name: "HackerRank",
      url: "https://www.hackerrank.com/",
      why: "Structured skill certifications, a credential to point to later if wanted"
    }
  ],

  "Code Practice": [
    {
      name: "LeetCode",
      url: "https://leetcode.com/",
      why: "The standard for algorithm and data-structure reps, supports both Python and Java"
    },
    {
      name: "HackerRank (Java domain)",
      url: "https://www.hackerrank.com/domains/java",
      why: "Pairs naturally with Java coursework, has data-structure-specific problem sets"
    }
  ],

  "Interview Prep": [
    {
      name: "Paradigm",
      why: "Used for technical question practice"
      // no url yet, add one once confirmed
    }
  ],

  "Learning Platforms": [
    {
      name: "Codédex",
      url: "https://www.codedex.io/",
      why: "Covers Python, SQL, and Java, where this challenge (and this whole project) comes from"
    }
  ]
};
