// flashcards-data.js
// Content for the Flashcards page (flashcards.html): a question/answer
// deck, tagged by category so the page can filter by SQL, Python, or
// Java. Loaded by flashcards.html only.

// FLASHCARDS is a flat array, not grouped, since a flashcard deck gets
// shuffled and filtered rather than displayed section by section like
// the cheat sheets. Each card has:
//   category - "SQL" | "Python" | "Java", matches the cheat sheet tabs
//   question - shown on the front of the card
//   answer   - shown when the card is flipped
const FLASHCARDS = [

  // --- SQL ---
  {
    category: "SQL",
    question: "What's the difference between WHERE and HAVING?",
    answer: "WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY runs."
  },
  {
    category: "SQL",
    question: "What does a LEFT JOIN return that an INNER JOIN doesn't?",
    answer: "Every row from the left table, even ones with no match in the right table, NULLs fill the right side's columns."
  },
  {
    category: "SQL",
    question: "What's a CTE?",
    answer: "A named, temporary result set defined with WITH, used to break a complex query into readable steps."
  },
  {
    category: "SQL",
    question: "What's the difference between RANK and DENSE_RANK?",
    answer: "RANK leaves gaps after ties (1, 2, 2, 4). DENSE_RANK doesn't (1, 2, 2, 3)."
  },
  {
    category: "SQL",
    question: "How do you fill in a default value when a column is NULL?",
    answer: "COALESCE(column, default_value) returns the first non-NULL value it finds."
  },
  {
    category: "SQL",
    question: "What's the difference between UNION and UNION ALL?",
    answer: "UNION removes duplicate rows across the combined results. UNION ALL keeps everything and is faster."
  },
  {
    category: "SQL",
    question: "What does EXPLAIN show you?",
    answer: "The query plan the database will use to run a query, without actually running it, useful for spotting slow steps like full table scans."
  },
  {
    category: "SQL",
    question: "What's a self join used for?",
    answer: "Joining a table to itself, common for hierarchies, like matching each employee to their manager in the same table."
  },

  // --- Python ---
  {
    category: "Python",
    question: "What does a list comprehension do?",
    answer: "Builds a new list in one line by looping (and optionally filtering), e.g. [n*n for n in range(5)]."
  },
  {
    category: "Python",
    question: "What's the difference between *args and **kwargs?",
    answer: "*args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments into a dict."
  },
  {
    category: "Python",
    question: 'What does the "with" keyword do when opening a file?',
    answer: "Automatically closes the file when the block ends, even if an error happens inside it."
  },
  {
    category: "Python",
    question: "What order do try/except/finally run in?",
    answer: "try runs first. except only runs if a matching error happens. finally always runs last, error or not."
  },
  {
    category: "Python",
    question: "What does __init__ do in a Python class?",
    answer: "It's the constructor, it runs automatically whenever a new object is created from the class."
  },
  {
    category: "Python",
    question: "What's the difference between a list and a tuple?",
    answer: "Lists are ordered and changeable. Tuples are ordered but unchangeable (immutable) once created."
  },
  {
    category: "Python",
    question: "What does super().__init__() do?",
    answer: "Calls the parent class's constructor from inside a subclass, so the parent's setup still runs."
  },
  {
    category: "Python",
    question: "What turns JSON text into a Python dict?",
    answer: "The json module, using json.load() to read from a file or json.loads() to parse from a string."
  },

  // --- Java ---
  {
    category: "Java",
    question: "What's the difference between == and .equals() for Strings in Java?",
    answer: "== compares whether two variables point to the same object in memory. .equals() compares whether the actual content is the same."
  },
  {
    category: "Java",
    question: "What's the difference between an interface and an abstract class?",
    answer: "A class can implement multiple interfaces but only extend one class. An interface just defines a contract of methods to implement."
  },
  {
    category: "Java",
    question: 'What does "extends" do?',
    answer: "Lets one class inherit the fields and methods of another, a subclass builds on a parent class."
  },
  {
    category: "Java",
    question: "What's a static field?",
    answer: "A field shared across every instance of a class, rather than each object getting its own separate copy."
  },
  {
    category: "Java",
    question: "What does @Override do?",
    answer: "Signals that a method is intentionally replacing a method from the parent class, and lets the compiler check it actually matches."
  },
  {
    category: "Java",
    question: "What's the difference between an ArrayList and a plain array?",
    answer: "An array has a fixed size set at creation. An ArrayList can grow and shrink as items are added or removed."
  },
  {
    category: "Java",
    question: "What does a finally block guarantee?",
    answer: "It always runs after a try/catch, whether an exception was thrown or not."
  },
  {
    category: "Java",
    question: "Why does 7 / 2 give 3 instead of 3.5 in Java?",
    answer: "Integer division truncates the decimal. At least one operand needs to be a double to get a decimal result."
  }

];
