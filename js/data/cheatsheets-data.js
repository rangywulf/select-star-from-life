// cheatsheets-data.js
// Content for the Cheat Sheets page (cheatsheets.html): condensed
// reference code, grouped by language. Loaded by cheatsheets.html only.

// CHEATSHEETS is grouped by language so the page can render one tab per
// language. Each entry in a language's list has:
//   label - short heading for this block (e.g. "Joins")
//   code  - the actual reference code, comments included so it reads
//           like a set of instructions, not just syntax
const CHEATSHEETS = {

  SQL: [
    {
      label: "Basics: SELECT, WHERE, ORDER BY",
      code:
`-- Pick columns, filter rows, set the order
SELECT name, hire_date
FROM employees
WHERE department = 'Engineering'
ORDER BY hire_date DESC;

-- LIMIT caps how many rows come back
SELECT name FROM employees LIMIT 10;

-- Combine conditions with AND / OR, use parentheses to be explicit
SELECT name
FROM employees
WHERE (department = 'Engineering' OR department = 'Data')
  AND salary > 60000;`
    },
    {
      label: "NULLs",
      code:
`-- NULL means "unknown/missing," it's not the same as 0 or empty text,
-- so you can't compare it with = or !=
SELECT name FROM employees WHERE manager_id IS NULL;
SELECT name FROM employees WHERE manager_id IS NOT NULL;

-- COALESCE returns the first non-NULL value in the list, handy for
-- filling in a default
SELECT name, COALESCE(nickname, name) AS display_name
FROM employees;`
    },
    {
      label: "Joins",
      code:
`-- INNER JOIN: only rows that match in both tables
SELECT o.id, c.name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;

-- LEFT JOIN: every row from the left table, matched rows from the
-- right, NULL in the right table's columns where there's no match
SELECT o.id, c.name
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id;

-- RIGHT JOIN: the mirror of LEFT JOIN, every row from the right table
SELECT o.id, c.name
FROM orders o
RIGHT JOIN customers c ON o.customer_id = c.id;

-- FULL OUTER JOIN: everything from both sides, matched where possible
-- (not every database supports this directly, e.g. MySQL doesn't)
SELECT o.id, c.name
FROM orders o
FULL OUTER JOIN customers c ON o.customer_id = c.id;

-- Self join: a table joined to itself, common for hierarchies like
-- "who is this employee's manager"
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`
    },
    {
      label: "Group by + aggregates",
      code:
`-- One row per department, with a count and an average
SELECT department, COUNT(*) AS num_employees, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- WHERE filters rows BEFORE grouping, HAVING filters groups AFTER
-- grouping, this is the difference people mix up most often
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE hire_date > '2020-01-01'   -- filters individual rows first
GROUP BY department
HAVING AVG(salary) > 70000;      -- then filters the grouped results`
    },
    {
      label: "Window functions",
      code:
`-- ROW_NUMBER: a running number per row, restarting each department
SELECT
  name,
  department,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept
FROM employees;

-- RANK vs DENSE_RANK: both number rows by some order, but RANK leaves
-- gaps after ties (1,2,2,4) while DENSE_RANK doesn't (1,2,2,3)
SELECT
  name,
  salary,
  RANK() OVER (ORDER BY salary DESC) AS salary_rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_dense_rank
FROM employees;

-- LAG/LEAD: look at the previous or next row without a self-join
SELECT
  name,
  salary,
  LAG(salary) OVER (ORDER BY hire_date) AS previous_hire_salary,
  LEAD(salary) OVER (ORDER BY hire_date) AS next_hire_salary
FROM employees;`
    },
    {
      label: "CTEs (the WITH clause)",
      code:
`-- A CTE is a named, temporary result you can reference below it,
-- useful for breaking a complex query into readable steps
WITH high_earners AS (
  SELECT * FROM employees WHERE salary > 100000
)
SELECT department, COUNT(*)
FROM high_earners
GROUP BY department;

-- You can chain more than one CTE
WITH high_earners AS (
  SELECT * FROM employees WHERE salary > 100000
),
by_department AS (
  SELECT department, COUNT(*) AS num_high_earners
  FROM high_earners
  GROUP BY department
)
SELECT * FROM by_department WHERE num_high_earners > 5;

-- A recursive CTE references itself, used for hierarchies like an
-- org chart or a category tree
WITH RECURSIVE org_chart AS (
  -- base case: the top of the hierarchy
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- recursive case: join back to org_chart to go one level deeper
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart;`
    },
    {
      label: "Subqueries",
      code:
`-- A subquery in WHERE
SELECT name
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- A subquery in FROM, treated like a temporary table
SELECT dept_summary.department, dept_summary.avg_salary
FROM (
  SELECT department, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department
) AS dept_summary
WHERE dept_summary.avg_salary > 70000;

-- IN with a subquery: match against a list a subquery produces
SELECT name
FROM employees
WHERE department_id IN (SELECT id FROM departments WHERE region = 'West');`
    },
    {
      label: "CASE WHEN",
      code:
`-- SQL's if/else, used inside a SELECT
SELECT
  name,
  CASE
    WHEN salary > 100000 THEN 'high'
    WHEN salary > 60000 THEN 'mid'
    ELSE 'entry'
  END AS pay_band
FROM employees;`
    },
    {
      label: "INSERT, UPDATE, DELETE",
      code:
`-- Add a new row
INSERT INTO employees (name, department, salary)
VALUES ('Sam Lee', 'Engineering', 72000);

-- Update existing rows, WHERE matters here, without it every row
-- in the table gets changed
UPDATE employees
SET salary = salary * 1.05
WHERE department = 'Engineering';

-- Delete rows, same warning applies, no WHERE means the whole table
DELETE FROM employees
WHERE department = 'Discontinued';`
    },
    {
      label: "UNION",
      code:
`-- Stacks the results of two queries into one result set, both
-- queries need the same number of columns and compatible types
SELECT name FROM current_employees
UNION
SELECT name FROM former_employees;

-- UNION removes duplicate rows, UNION ALL keeps everything and is
-- faster since it skips the duplicate check
SELECT name FROM current_employees
UNION ALL
SELECT name FROM former_employees;`
    },
    {
      label: "Reading EXPLAIN + indexes (conceptual)",
      code:
`-- EXPLAIN shows the plan the database will use to run a query,
-- without actually running it, useful for spotting slow steps
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';

-- Look for a "full table scan" in the output, that usually means
-- there's no index helping this query, it's checking every row

-- An index is a lookup structure built on one or more columns,
-- created separately from the table itself
CREATE INDEX idx_employees_department ON employees (department);

-- After that index exists, filtering on department gets much faster,
-- but indexes aren't free: they speed up reads and slow down
-- writes (INSERT/UPDATE/DELETE), so they're not added blindly
-- everywhere, only on columns queried often`
    }
  ],

  Python: [
    {
      label: "Variables + basic types",
      code:
`age = 27          # int
gpa = 3.8          # float
name = "Jess"      # str
active = True      # bool
tags = ["sql", "python"]        # list, ordered, changeable
person = {"name": "Jess", "age": 27}   # dict, key-value pairs
coords = (10, 20)               # tuple, ordered, unchangeable
unique_tags = {"sql", "python"} # set, unordered, no duplicates`
    },
    {
      label: "Strings",
      code:
`name = "Jess"

# f-strings: the easiest way to build a string with variables in it
greeting = f"Hi {name}, you have {age} years of experience"

# common string methods
"hello".upper()          # "HELLO"
"HELLO".lower()          # "hello"
"  hi  ".strip()         # "hi", removes leading/trailing whitespace
"a,b,c".split(",")       # ["a", "b", "c"]
",".join(["a", "b", "c"])  # "a,b,c"
"hello world".replace("world", "there")  # "hello there"`
    },
    {
      label: "Control flow",
      code:
`# if/elif/else
if age < 18:
    print("minor")
elif age < 65:
    print("adult")
else:
    print("senior")

# for loop over a list
for tag in tags:
    print(tag)

# enumerate gives you the index alongside each item
for i, tag in enumerate(tags):
    print(i, tag)

# zip pairs up two lists item by item
names = ["a", "b"]
scores = [90, 85]
for n, s in zip(names, scores):
    print(n, s)

# while loop
count = 0
while count < 3:
    count += 1`
    },
    {
      label: "Lists in depth",
      code:
`nums = [5, 3, 1, 4]

nums.append(9)          # add to the end
nums.sort()              # sorts in place, low to high
nums.sort(reverse=True)  # high to low

# sort by a custom rule using key
people = [{"name": "A", "age": 30}, {"name": "B", "age": 20}]
people.sort(key=lambda p: p["age"])

# slicing: list[start:stop], stop is not included
nums[0:2]    # first two items
nums[-1]     # last item
nums[::-1]   # reversed copy`
    },
    {
      label: "Functions",
      code:
`# a basic function with a default argument
def greet(name, excited=False):
    if excited:
        return f"HEY {name}!"
    return f"Hi {name}."

# *args collects extra positional arguments into a tuple
# **kwargs collects extra keyword arguments into a dict
def log(*args, **kwargs):
    print(args, kwargs)

log(1, 2, user="jess")   # args = (1, 2), kwargs = {"user": "jess"}`
    },
    {
      label: "Comprehensions",
      code:
`# list comprehension: build a new list in one line
squares = [n * n for n in range(5)]

# with a filter condition
evens = [n for n in range(10) if n % 2 == 0]

# dict comprehension
lengths = {tag: len(tag) for tag in tags}`
    },
    {
      label: "Classes (OOP)",
      code:
`class Employee:
    # runs when a new Employee is created
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def give_raise(self, amount):
        self.salary += amount

    # controls what print(some_employee) shows
    def __str__(self):
        return f"{self.name} (\${self.salary})"

e = Employee("Jess", 65000)
e.give_raise(5000)

# inheritance: Manager gets everything Employee has, plus more
class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)   # runs Employee's __init__
        self.team_size = team_size`
    },
    {
      label: "Error handling",
      code:
`try:
    result = 10 / 0
except ZeroDivisionError:
    print("can't divide by zero")
except Exception as e:
    # a general fallback, catches anything not already caught above
    print(f"something else went wrong: {e}")
finally:
    print("this runs either way")

# raising your own error
def set_age(age):
    if age < 0:
        raise ValueError("age can't be negative")`
    },
    {
      label: "Files + JSON",
      code:
`# "with" automatically closes the file when the block ends,
# even if something goes wrong inside it
with open("data.txt", "r") as f:
    contents = f.read()

with open("output.txt", "w") as f:
    f.write("hello")

# reading/writing JSON
import json

with open("data.json", "r") as f:
    data = json.load(f)          # JSON text -> Python dict/list

with open("out.json", "w") as f:
    json.dump(data, f)           # Python dict/list -> JSON text`
    },
    {
      label: "pandas basics",
      code:
`import pandas as pd

df = pd.read_csv("data.csv")
df_filtered = df[df["department"] == "Engineering"]
by_dept = df.groupby("department")["salary"].mean()
merged = df.merge(other_df, on="employee_id")

# quick looks at the data
df.head()          # first 5 rows
df.info()          # column types + non-null counts
df.describe()       # summary stats for numeric columns`
    },
    {
      label: "Calling an API (requests)",
      code:
`import requests

response = requests.get(
    "https://api.example.com/data",
    params={"page": 1}
)
data = response.json()

# check the status before trusting the response
if response.status_code == 200:
    print(data)
else:
    print(f"request failed: {response.status_code}")`
    }
  ],

  Java: [
    {
      label: "Variables + types",
      code:
`// primitives hold raw values
int age = 27;
double gpa = 3.8;
boolean active = true;
char grade = 'A';

// String is an object, not a primitive, hence the capital S
String name = "Jess";

// arrays: fixed size, set at creation
int[] numbers = {1, 2, 3};
String[] names = new String[3];   // 3 empty slots`
    },
    {
      label: "Control flow",
      code:
`if (age < 18) {
    System.out.println("minor");
} else if (age < 65) {
    System.out.println("adult");
} else {
    System.out.println("senior");
}

for (int i = 0; i < 3; i++) {
    System.out.println(i);
}

// enhanced for-loop, cleaner when you don't need the index
int[] scores = {90, 85, 77};
for (int score : scores) {
    System.out.println(score);
}

int count = 0;
while (count < 3) {
    count++;
}

// switch: a cleaner alternative to a long if/else chain
switch (grade) {
    case 'A':
        System.out.println("excellent");
        break;   // without break, it falls through to the next case
    case 'B':
        System.out.println("good");
        break;
    default:
        System.out.println("keep going");
}`
    },
    {
      label: "Methods",
      code:
`// a method belongs to a class, declares its return type up front
public String greet(String name) {
    return "Hi " + name + ".";
}

// void means it returns nothing
public void printGreeting(String name) {
    System.out.println(greet(name));
}

// overloading: same method name, different parameters
public int add(int a, int b) {
    return a + b;
}
public double add(double a, double b) {
    return a + b;
}`
    },
    {
      label: "Classes + objects (OOP)",
      code:
`public class Employee {
    // fields: the data each Employee object holds
    private String name;
    private double salary;

    // constructor: runs when a new Employee is created
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    // a second constructor (overloading works for constructors too)
    public Employee(String name) {
        this(name, 0);   // calls the constructor above with a default
    }

    public void giveRaise(double amount) {
        this.salary += amount;
    }

    // controls what System.out.println(someEmployee) shows
    @Override
    public String toString() {
        return name + " ($" + salary + ")";
    }
}

// creating an object from the class
Employee e = new Employee("Jess", 65000);
e.giveRaise(5000);`
    },
    {
      label: "OOP concepts (Ch. 10 territory)",
      code:
`// Encapsulation: keep fields private, expose behavior through methods
// (see the "salary" field above, private + a giveRaise() method)

// Inheritance: one class builds on another with "extends"
public class Manager extends Employee {
    private int teamSize;

    public Manager(String name, double salary, int teamSize) {
        super(name, salary);   // calls Employee's constructor
        this.teamSize = teamSize;
    }
}

// Polymorphism: a subclass can override a parent method
public class Manager extends Employee {
    @Override
    public void giveRaise(double amount) {
        // managers might get a different raise calculation
    }
}

// Abstraction: an abstract class can't be built directly, it just
// defines what subclasses must implement
public abstract class Shape {
    public abstract double area();   // no body, subclasses must define this
}`
    },
    {
      label: "Error handling (Ch. 12 territory)",
      code:
`// try/catch: run risky code, handle what goes wrong instead of
// crashing the whole program
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("can't divide by zero: " + e.getMessage());
} finally {
    // finally always runs, whether an exception happened or not
    System.out.println("this runs either way");
}

// you can catch more than one exception type
try {
    int[] numbers = new int[3];
    System.out.println(numbers[5]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("index doesn't exist");
} catch (Exception e) {
    // a general fallback, catches anything not already caught above
    System.out.println("something else went wrong");
}

// throwing your own exception
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("age can't be negative");
    }
}`
    },
    {
      label: "Collections: ArrayList, HashMap, HashSet",
      code:
`import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

// ArrayList: like an array, but it can grow and shrink
ArrayList<String> names = new ArrayList<>();
names.add("Jess");
names.add("Sam");
names.remove("Sam");
names.get(0);          // "Jess"
names.size();           // 1

// HashMap: key-value pairs, like a Python dict
HashMap<String, Double> salaries = new HashMap<>();
salaries.put("Jess", 65000.0);
salaries.get("Jess");            // 65000.0
salaries.containsKey("Jess");    // true

// HashSet: unique values, no duplicates, no guaranteed order
HashSet<String> uniqueTags = new HashSet<>();
uniqueTags.add("sql");
uniqueTags.add("sql");   // ignored, already there
uniqueTags.size();        // 1`
    },
    {
      label: "Interfaces vs abstract classes",
      code:
`// an interface defines a contract, a class that "implements" it
// must provide every method the interface declares
public interface Payable {
    double getPaymentAmount();
}

public class Employee implements Payable {
    private double salary;

    @Override
    public double getPaymentAmount() {
        return salary;
    }
}

// the difference from an abstract class: a class can implement
// multiple interfaces, but can only extend one class`
    },
    {
      label: "Static vs instance members",
      code:
`public class Employee {
    private static int totalEmployees = 0;  // shared across ALL objects
    private String name;                     // unique to EACH object

    public Employee(String name) {
        this.name = name;
        totalEmployees++;   // every new Employee bumps the shared count
    }
}

// access a static member through the class, not an object
Employee.totalEmployees;   // no object needed`
    },
    {
      label: "Common gotchas",
      code:
`// == compares references for objects, not their actual content
String a = new String("hi");
String b = new String("hi");
a == b          // false, different objects in memory
a.equals(b)     // true, same content, use .equals() for Strings

// arrays have a fixed size once created
int[] numbers = new int[3];   // holds exactly 3 ints, no more

// integer division truncates instead of rounding
int result = 7 / 2;       // 3, not 3.5
double result2 = 7.0 / 2; // 3.5, at least one side needs to be a double`
    }
  ]

};