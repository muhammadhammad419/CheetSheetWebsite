export interface CodeExample {
  title: string;
  description: string;
  code: string;
}

export interface LanguageCategory {
  name: string;
  examples: CodeExample[];
}

export interface ProgrammingLanguage {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  categories: LanguageCategory[];
}

export const programmingLanguages: ProgrammingLanguage[] = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "🟨",
    description:
      "High-level, interpreted programming language for web development",
    color: "bg-yellow-500",
    categories: [
      {
        name: "Variables & Data Types",
        examples: [
          {
            title: "Variable Declaration",
            description: "Different ways to declare variables",
            code: `// ES6+ preferred
let name = "John";
const age = 25;
var city = "NYC"; // avoid

// Data types
let string = "Hello";
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { key: "value" };
let nullValue = null;
let undefined = undefined;`,
          },
          {
            title: "Template Literals",
            description: "String interpolation with backticks",
            code: `const name = "Alice";
const age = 30;

// Template literal
const message = \`Hello, my name is \${name} and I'm \${age} years old.\`;

// Multi-line strings
const multiline = \`
  This is a
  multi-line string
  with \${name}
\`;`,
          },
        ],
      },
      {
        name: "Functions",
        examples: [
          {
            title: "Function Declaration",
            description: "Different ways to create functions",
            code: `// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function expression
const greet2 = function(name) {
  return \`Hello, \${name}!\`;
};

// Arrow function
const greet3 = (name) => \`Hello, \${name}!\`;

// Arrow function with block
const greet4 = (name) => {
  return \`Hello, \${name}!\`;
};`,
          },
          {
            title: "Async/Await",
            description: "Handling asynchronous operations",
            code: `// Promise
function fetchData() {
  return fetch('/api/data')
    .then(response => response.json())
    .then(data => data);
}

// Async/Await
async function fetchDataAsync() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
          },
        ],
      },
      {
        name: "Arrays & Objects",
        examples: [
          {
            title: "Array Methods",
            description: "Common array manipulation methods",
            code: `const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map(n => n * 2);

// Filter
const evens = numbers.filter(n => n % 2 === 0);

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Find
const found = numbers.find(n => n > 3);

// Destructuring
const [first, second, ...rest] = numbers;`,
          },
          {
            title: "Object Manipulation",
            description: "Working with objects",
            code: `const person = {
  name: "John",
  age: 30,
  city: "NYC"
};

// Destructuring
const { name, age } = person;

// Spread operator
const updatedPerson = { ...person, age: 31 };

// Object methods
const keys = Object.keys(person);
const values = Object.values(person);
const entries = Object.entries(person);`,
          },
        ],
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "High-level, interpreted language known for its simplicity",
    color: "bg-blue-600",
    categories: [
      {
        name: "Variables & Data Types",
        examples: [
          {
            title: "Variable Assignment",
            description: "Python variable declarations and types",
            code: `# Variables (no declaration needed)
name = "Alice"
age = 30
height = 5.8
is_student = True

# Multiple assignment
x, y, z = 1, 2, 3

# Data types
string = "Hello World"
integer = 42
float_num = 3.14
boolean = True
list_data = [1, 2, 3, 4]
tuple_data = (1, 2, 3)
dict_data = {"key": "value"}
set_data = {1, 2, 3}`,
          },
          {
            title: "String Formatting",
            description: "Different ways to format strings",
            code: `name = "Bob"
age = 25

# f-strings (Python 3.6+)
message = f"Hello, {name}! You are {age} years old."

# format() method
message = "Hello, {}! You are {} years old.".format(name, age)

# % formatting (older style)
message = "Hello, %s! You are %d years old." % (name, age)

# Multi-line strings
multi = """
This is a
multi-line string
"""`,
          },
        ],
      },
      {
        name: "Functions & Classes",
        examples: [
          {
            title: "Function Definition",
            description: "Creating and using functions",
            code: `# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameters
def greet_with_title(name, title="Mr/Ms"):
    return f"Hello, {title} {name}!"

# Function with *args and **kwargs
def flexible_function(*args, **kwargs):
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

# Lambda function
square = lambda x: x ** 2
numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))`,
          },
          {
            title: "Classes",
            description: "Object-oriented programming",
            code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."
    
    @property
    def is_adult(self):
        return self.age >= 18

# Inheritance
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
    
    def study(self):
        return f"{self.name} is studying."

# Usage
person = Person("Alice", 25)
student = Student("Bob", 20, "12345")`,
          },
        ],
      },
      {
        name: "Data Structures",
        examples: [
          {
            title: "Lists & Dictionaries",
            description: "Working with Python data structures",
            code: `# Lists
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.insert(1, "blueberry")
fruits.remove("banana")

# List comprehensions
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]

# Dictionaries
person = {"name": "John", "age": 30, "city": "NYC"}
person["email"] = "john@example.com"

# Dict comprehension
squared_dict = {x: x**2 for x in range(5)}`,
          },
          {
            title: "Loops & Conditionals",
            description: "Control flow in Python",
            code: `# For loop
for i in range(5):
    print(i)

for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# If statements
age = 20
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

# Ternary operator
status = "Adult" if age >= 18 else "Minor"`,
          },
        ],
      },
    ],
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    description: "JavaScript library for building user interfaces",
    color: "bg-cyan-500",
    categories: [
      {
        name: "Components",
        examples: [
          {
            title: "Functional Components",
            description: "Creating React functional components",
            code: `import React from 'react';

// Basic functional component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Component with props
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Arrow function component
const Button = ({ onClick, children }) => (
  <button onClick={onClick}>
    {children}
  </button>
);

export default Welcome;`,
          },
          {
            title: "Props & PropTypes",
            description: "Component props and validation",
            code: `import PropTypes from 'prop-types';

function UserCard({ user, onEdit, isEditable = false }) {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {isEditable && (
        <button onClick={() => onEdit(user.id)}>
          Edit
        </button>
      )}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool,
};`,
          },
        ],
      },
      {
        name: "Hooks",
        examples: [
          {
            title: "useState & useEffect",
            description: "Basic React hooks",
            code: `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  // Effect with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Effect for API call
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
          },
          {
            title: "Custom Hooks",
            description: "Creating reusable custom hooks",
            code: `import { useState, useEffect } from 'react';

// Custom hook for API calls
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
          },
        ],
      },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "🔷",
    description: "Typed superset of JavaScript",
    color: "bg-blue-500",
    categories: [
      {
        name: "Types & Interfaces",
        examples: [
          {
            title: "Basic Types",
            description: "TypeScript type annotations",
            code: `// Basic types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ["John", 30];

// Union types
let id: string | number = "123";

// Type aliases
type Status = "pending" | "success" | "error";
type User = {
  id: number;
  name: string;
  email: string;
};

// Optional and readonly
type Config = {
  readonly apiUrl: string;
  timeout?: number;
};`,
          },
          {
            title: "Interfaces",
            description: "Defining object shapes with interfaces",
            code: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

interface Admin extends User {
  permissions: string[];
  isSuper: boolean;
}

// Function interfaces
interface CalculatorFunc {
  (a: number, b: number): number;
}

const add: CalculatorFunc = (a, b) => a + b;

// Generic interfaces
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "John", email: "john@example.com" },
  status: 200,
  message: "Success"
};`,
          },
        ],
      },
      {
        name: "Advanced Types",
        examples: [
          {
            title: "Generics",
            description: "Generic functions and classes",
            code: `// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello");
const numberResult = identity<number>(42);

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Generic classes
class DataStorage<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  get(index: number): T | undefined {
    return this.data[index];
  }
}`,
          },
          {
            title: "Utility Types",
            description: "Built-in TypeScript utility types",
            code: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;

// Required - makes all properties required
type RequiredUser = Required<PartialUser>;

// Record - create object type with specific keys
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

// Mapped types
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};`,
          },
        ],
      },
    ],
  },
  {
    id: "css",
    name: "CSS",
    icon: "🎨",
    description: "Cascading Style Sheets for web styling",
    color: "bg-pink-500",
    categories: [
      {
        name: "Selectors & Properties",
        examples: [
          {
            title: "CSS Selectors",
            description: "Different ways to select elements",
            code: `/* Element selector */
h1 {
  color: blue;
}

/* Class selector */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

/* ID selector */
#header {
  background-color: #333;
}

/* Descendant selector */
.container p {
  margin-bottom: 16px;
}

/* Child selector */
.nav > li {
  display: inline-block;
}

/* Pseudo-classes */
.btn:hover {
  background-color: #007bff;
}

.input:focus {
  outline: 2px solid blue;
}

/* Attribute selector */
input[type="email"] {
  border: 1px solid #ccc;
}`,
          },
          {
            title: "CSS Grid",
            description: "Creating layouts with CSS Grid",
            code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  padding: 20px;
}

/* Grid areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

/* Responsive grid */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}`,
          },
        ],
      },
      {
        name: "Flexbox & Layout",
        examples: [
          {
            title: "Flexbox",
            description: "Flexible box layout",
            code: `.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* Flex direction */
.column {
  flex-direction: column;
}

.row-reverse {
  flex-direction: row-reverse;
}

/* Flex items */
.flex-item {
  flex: 1; /* grow, shrink, basis */
}

.flex-item-fixed {
  flex: 0 0 200px; /* no grow, no shrink, 200px basis */
}

/* Centering */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Responsive flex */
@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
}`,
          },
          {
            title: "CSS Animations",
            description: "Creating smooth animations",
            code: `/* Keyframe animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Transitions */
.button {
  background-color: #007bff;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* CSS Variables */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --border-radius: 4px;
}

.card {
  background: var(--primary-color);
  border-radius: var(--border-radius);
}`,
          },
        ],
      },
    ],
  },
  {
    id: "c",
    name: "C",
    icon: "🔧",
    description: "Low-level, compiled programming language",
    color: "bg-blue-600",
    categories: [
      {
        name: "Variables & Data Types",
        examples: [
          {
            title: "Variable Declaration",
            description: "Basic data types and variable declarations",
            code: `#include <stdio.h>

int main() {
    // Basic data types
    int age = 25;
    float height = 5.9f;
    double price = 99.99;
    char grade = 'A';
    char name[50] = "John";

    // Constants
    const int MAX_SIZE = 100;

    // Pointers
    int *ptr = &age;

    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Name: %s\\n", name);

    return 0;
}`,
          },
          {
            title: "Arrays and Strings",
            description: "Working with arrays and strings in C",
            code: `#include <stdio.h>
#include <string.h>

int main() {
    // Arrays
    int numbers[5] = {1, 2, 3, 4, 5};
    int matrix[3][3] = {{1,2,3}, {4,5,6}, {7,8,9}};

    // Strings
    char str1[20] = "Hello";
    char str2[] = "World";
    char result[50];

    // String operations
    strcpy(result, str1);
    strcat(result, " ");
    strcat(result, str2);

    printf("Result: %s\\n", result);
    printf("Length: %lu\\n", strlen(result));

    return 0;
}`,
          },
        ],
      },
      {
        name: "Functions & Pointers",
        examples: [
          {
            title: "Function Declaration",
            description: "Creating and using functions",
            code: `#include <stdio.h>

// Function prototypes
int add(int a, int b);
void swap(int *a, int *b);
int factorial(int n);

int main() {
    int x = 10, y = 20;

    printf("Sum: %d\\n", add(x, y));

    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\\n", x, y);

    printf("Factorial of 5: %d\\n", factorial(5));

    return 0;
}

int add(int a, int b) {
    return a + b;
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
          },
        ],
      },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚙️",
    description: "Object-oriented programming language based on C",
    color: "bg-blue-700",
    categories: [
      {
        name: "Classes & Objects",
        examples: [
          {
            title: "Class Definition",
            description: "Basic class structure and object creation",
            code: `#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;

public:
    // Constructor
    Person(std::string n, int a) : name(n), age(a) {}

    // Getter methods
    std::string getName() const { return name; }
    int getAge() const { return age; }

    // Setter methods
    void setName(const std::string& n) { name = n; }
    void setAge(int a) { age = a; }

    // Method
    void introduce() {
        std::cout << "Hi, I'm " << name << " and I'm "
                  << age << " years old." << std::endl;
    }
};

int main() {
    Person person("Alice", 25);
    person.introduce();

    person.setAge(26);
    std::cout << "New age: " << person.getAge() << std::endl;

    return 0;
}`,
          },
        ],
      },
    ],
  },
  {
    id: "csharp",
    name: "C#",
    icon: "🔷",
    description: "Modern, object-oriented programming language by Microsoft",
    color: "bg-purple-600",
    categories: [
      {
        name: "Classes & Properties",
        examples: [
          {
            title: "Class with Properties",
            description: "Modern C# class with auto-properties and methods",
            code: `using System;

public class Person
{
    // Auto-properties
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; private set; }

    // Constructor
    public Person(string name, int age, string email)
    {
        Name = name;
        Age = age;
        Email = email;
    }

    // Method
    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name}, {Age} years old.");
    }
}

class Program
{
    static void Main()
    {
        var person = new Person("Alice", 30, "alice@example.com");
        person.Introduce();
    }
}`,
          },
        ],
      },
    ],
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    description: "Object-oriented, platform-independent programming language",
    color: "bg-orange-600",
    categories: [
      {
        name: "Classes & Objects",
        examples: [
          {
            title: "Class Definition",
            description: "Basic Java class with constructors and methods",
            code: `public class Person {
    private String name;
    private int age;
    private String email;

    // Constructor
    public Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    // Getter methods
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }

    // Method
    public void introduce() {
        System.out.println("Hi, I'm " + name + " and I'm " + age + " years old.");
    }

    public static void main(String[] args) {
        Person person = new Person("Alice", 25, "alice@example.com");
        person.introduce();
    }
}`,
          },
        ],
      },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "⚡",
    description: "React framework for production-ready applications",
    color: "bg-black",
    categories: [
      {
        name: "Pages & Routing",
        examples: [
          {
            title: "App Router Setup",
            description: "Next.js 13+ App Router structure",
            code: `// app/layout.tsx
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 bg-blue-600 text-white">
          <h1>My Next.js App</h1>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}

// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js 13+</h1>
      <p>This is the home page using App Router.</p>
    </div>
  )
}`,
          },
          {
            title: "API Routes",
            description: "Creating API endpoints in Next.js",
            code: `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newUser: User = {
    id: users.length + 1,
    name: body.name,
    email: body.email,
  }

  users.push(newUser)

  return NextResponse.json(newUser, { status: 201 })
}`,
          },
        ],
      },
    ],
  },
  {
    id: "html",
    name: "HTML",
    icon: "🌐",
    description: "Markup language for creating web pages",
    color: "bg-orange-500",
    categories: [
      {
        name: "Document Structure",
        examples: [
          {
            title: "Basic HTML Document",
            description: "Complete HTML5 document structure",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Welcome to My Website</h1>
        <p>This is a sample HTML page.</p>
    </main>

    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>`,
          },
          {
            title: "HTML Forms",
            description: "Creating interactive forms",
            code: `<form action="/submit" method="POST">
    <fieldset>
        <legend>Contact Information</legend>

        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>

        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>

        <div>
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>

        <div>
            <input type="checkbox" id="newsletter" name="newsletter">
            <label for="newsletter">Subscribe to newsletter</label>
        </div>

        <button type="submit">Send Message</button>
    </fieldset>
</form>`,
          },
        ],
      },
    ],
  },
];

export const getLanguageById = (
  id: string,
): ProgrammingLanguage | undefined => {
  return programmingLanguages.find((lang) => lang.id === id);
};

export const searchLanguages = (query: string): ProgrammingLanguage[] => {
  const lowercaseQuery = query.toLowerCase();
  return programmingLanguages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(lowercaseQuery) ||
      lang.description.toLowerCase().includes(lowercaseQuery) ||
      lang.categories.some(
        (category) =>
          category.name.toLowerCase().includes(lowercaseQuery) ||
          category.examples.some(
            (example) =>
              example.title.toLowerCase().includes(lowercaseQuery) ||
              example.description.toLowerCase().includes(lowercaseQuery),
          ),
      ),
  );
};
