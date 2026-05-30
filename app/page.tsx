"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { 
  SiJavascript, 
  SiPython, 
  SiTypescript, 
  SiRuby,
  SiCplusplus,
  SiC,
  SiGo,
  SiRust
} from "react-icons/si";
import { FaJava, FaPhp } from "react-icons/fa";
import { TbBrandCSharp, TbBrandSwift, TbBrandKotlin } from "react-icons/tb";
import { FiCode, FiSearch, FiX } from "react-icons/fi";

// ─── Types ──────────────────────────────────────────────────────────────

interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
}

interface Language {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  syntax: string;
}

// ─── Snippets Data by Language ─────────────────────────────────────────

const snippetsData: Record<string, Snippet[]> = {
  javascript: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse any string in one line.",
      code: `const reverseString = (str) => str.split('').reverse().join('');
// Example
console.log(reverseString("hello")); // "olleh"`,
      category: "String",
      tags: ["string", "utility"]
    },
    {
      id: 2,
      title: "Check Palindrome",
      description: "Check if a string reads the same backwards.",
      code: `const isPalindrome = (str) => str === str.split('').reverse().join('');
// Example
console.log(isPalindrome("racecar")); // true`,
      category: "String",
      tags: ["string", "validation"]
    },
    {
      id: 3,
      title: "Remove Duplicates from Array",
      description: "Clean an array removing duplicate values.",
      code: `const removeDuplicates = (arr) => [...new Set(arr)];
// Example
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]`,
      category: "Array",
      tags: ["array", "utility"]
    },
    {
      id: 4,
      title: "Fibonacci Sequence",
      description: "Generate Fibonacci numbers up to n terms.",
      code: `const fibonacci = (n) => {
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib.slice(0, n);
};
// Example
console.log(fibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
      category: "Algorithm",
      tags: ["algorithm", "math"]
    },
    {
      id: 5,
      title: "Factorial",
      description: "Calculate factorial using recursion.",
      code: `const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
// Example
console.log(factorial(5)); // 120`,
      category: "Math",
      tags: ["math", "recursion"]
    },
    {
      id: 6,
      title: "Fetch API with Async/Await",
      description: "Make HTTP requests using modern async/await.",
      code: `const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
// Example
fetchData('https://api.github.com/users/octocat');`,
      category: "API",
      tags: ["api", "async"]
    }
  ],
  python: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse any string using slicing.",
      code: `def reverse_string(s):
    return s[::-1]
# Example
print(reverse_string("hello")) # "olleh"`,
      category: "String",
      tags: ["string", "utility"]
    },
    {
      id: 2,
      title: "List Comprehension",
      description: "Create lists using comprehension syntax.",
      code: `squares = [x**2 for x in range(10)]
# Example
print(squares) # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`,
      category: "List",
      tags: ["list", "comprehension"]
    },
    {
      id: 3,
      title: "Check Palindrome",
      description: "Check if a string is a palindrome.",
      code: `def is_palindrome(s):
    return s == s[::-1]
# Example
print(is_palindrome("racecar")) # True`,
      category: "String",
      tags: ["string", "validation"]
    },
    {
      id: 4,
      title: "Fibonacci Sequence",
      description: "Generate Fibonacci numbers using generator.",
      code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
# Example
print(list(fibonacci(10)))`,
      category: "Algorithm",
      tags: ["algorithm", "generator"]
    },
    {
      id: 5,
      title: "Read File",
      description: "Read and process a file line by line.",
      code: `with open('file.txt', 'r') as file:
    lines = [line.strip() for line in file]
# Example
print(lines)`,
      category: "File I/O",
      tags: ["file", "io"]
    }
  ],
  java: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string using StringBuilder.",
      code: `public static String reverseString(String str) {
    return new StringBuilder(str).reverse().toString();
}
// Example
System.out.println(reverseString("hello")); // "olleh"`,
      category: "String",
      tags: ["string", "utility"]
    },
    {
      id: 2,
      title: "Factorial",
      description: "Calculate factorial using recursion.",
      code: `public static long factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}
// Example
System.out.println(factorial(5)); // 120`,
      category: "Math",
      tags: ["math", "recursion"]
    },
    {
      id: 3,
      title: "Check Prime",
      description: "Check if a number is prime.",
      code: `public static boolean isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}`,
      category: "Math",
      tags: ["math", "algorithm"]
    }
  ],
  cpp: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string using std::reverse.",
      code: `#include <algorithm>
#include <string>
using namespace std;

string reverseString(string str) {
    reverse(str.begin(), str.end());
    return str;
}`,
      category: "String",
      tags: ["string", "utility"]
    },
    {
      id: 2,
      title: "Factorial",
      description: "Calculate factorial iteratively.",
      code: `long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
      category: "Math",
      tags: ["math", "iteration"]
    }
  ],
  c: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string in C.",
      code: `#include <string.h>

void reverseString(char* str) {
    int n = strlen(str);
    for (int i = 0; i < n / 2; i++) {
        char temp = str[i];
        str[i] = str[n - i - 1];
        str[n - i - 1] = temp;
    }
}`,
      category: "String",
      tags: ["string", "utility"]
    },
    {
      id: 2,
      title: "Factorial",
      description: "Calculate factorial using recursion.",
      code: `long long factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}`,
      category: "Math",
      tags: ["math", "recursion"]
    }
  ],
  typescript: [
    {
      id: 1,
      title: "Type-safe Reverse String",
      description: "Reverse a string with TypeScript types.",
      code: `const reverseString = (str: string): string => str.split('').reverse().join('');
// Example
console.log(reverseString("hello")); // "olleh"`,
      category: "String",
      tags: ["string", "typescript"]
    },
    {
      id: 2,
      title: "Generic Array Remove Duplicates",
      description: "Remove duplicates from any array type.",
      code: `const removeDuplicates = <T>(arr: T[]): T[] => [...new Set(arr)];
// Example
console.log(removeDuplicates([1, 2, 2, 3])); // [1, 2, 3]`,
      category: "Array",
      tags: ["array", "generic", "typescript"]
    }
  ],
  ruby: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string in Ruby.",
      code: `def reverse_string(str)
  str.reverse
end
# Example
puts reverse_string("hello") # "olleh"`,
      category: "String",
      tags: ["string", "utility"]
    },
    {
      id: 2,
      title: "FizzBuzz",
      description: "Classic FizzBuzz implementation.",
      code: `def fizzbuzz(n)
  (1..n).map do |i|
    if i % 15 == 0 then "FizzBuzz"
    elsif i % 3 == 0 then "Fizz"
    elsif i % 5 == 0 then "Buzz"
    else i end
  end
end`,
      category: "Algorithm",
      tags: ["algorithm", "game"]
    }
  ],
  csharp: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string in C#.",
      code: `using System.Linq;
public static string ReverseString(string str) {
    return new string(str.Reverse().ToArray());
}`,
      category: "String",
      tags: ["string", "linq"]
    }
  ],
  go: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string in Go.",
      code: `func reverseString(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}`,
      category: "String",
      tags: ["string", "utility"]
    }
  ],
  rust: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string in Rust.",
      code: `fn reverse_string(s: &str) -> String {
    s.chars().rev().collect()
}`,
      category: "String",
      tags: ["string", "utility"]
    }
  ],
  php: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string in PHP.",
      code: `<?php
function reverseString($str) {
    return strrev($str);
}
// Example
echo reverseString("hello"); // "olleh"
?>`,
      category: "String",
      tags: ["string", "utility"]
    }
  ],
  swift: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string in Swift.",
      code: `func reverseString(_ str: String) -> String {
    return String(str.reversed())
}
// Example
print(reverseString("hello")) // "olleh"`,
      category: "String",
      tags: ["string", "utility"]
    }
  ],
  kotlin: [
    {
      id: 1,
      title: "Reverse a String",
      description: "Reverse a string in Kotlin.",
      code: `fun reverseString(str: String): String {
    return str.reversed()
}`,
      category: "String",
      tags: ["string", "utility"]
    }
  ]
};

// ─── Languages with Icons ──────────────────────────────────────────────

const languages: Language[] = [
  { id: "javascript", name: "JavaScript", icon: <SiJavascript size={16} />, color: "#F7DF1E", syntax: "javascript" },
  { id: "python", name: "Python", icon: <SiPython size={16} />, color: "#3776AB", syntax: "python" },
  { id: "java", name: "Java", icon: <FaJava size={16} />, color: "#ED8B00", syntax: "java" },
  { id: "cpp", name: "C++", icon: <SiCplusplus size={16} />, color: "#00599C", syntax: "cpp" },
  { id: "c", name: "C", icon: <SiC size={16} />, color: "#A8B9CC", syntax: "c" },
  { id: "typescript", name: "TypeScript", icon: <SiTypescript size={16} />, color: "#3178C6", syntax: "typescript" },
  { id: "ruby", name: "Ruby", icon: <SiRuby size={16} />, color: "#CC342D", syntax: "ruby" },
  { id: "csharp", name: "C#", icon: <TbBrandCSharp size={16} />, color: "#239120", syntax: "csharp" },
  { id: "go", name: "Go", icon: <SiGo size={16} />, color: "#00ADD8", syntax: "go" },
  { id: "rust", name: "Rust", icon: <SiRust size={16} />, color: "#CE422B", syntax: "rust" },
  { id: "php", name: "PHP", icon: <FaPhp size={16} />, color: "#777BB4", syntax: "php" },
  { id: "swift", name: "Swift", icon: <TbBrandSwift size={16} />, color: "#FA7343", syntax: "swift" },
  { id: "kotlin", name: "Kotlin", icon: <TbBrandKotlin size={16} />, color: "#7F52FF", syntax: "kotlin" }
];

// ─── Components ─────────────────────────────────────────────────────────

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
    >
      {copied ? "✅ Copied!" : "📋 Copy"}
    </button>
  );
}

// Modal para ver código completo
function CodeModal({ snippet, syntax, onClose }: { snippet: Snippet | null; syntax: string; onClose: () => void }) {
  if (!snippet) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-4xl max-h-[80vh] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <div>
            <h3 className="font-semibold text-gray-900">{snippet.title}</h3>
            <p className="text-xs text-gray-500">{snippet.description}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-lg transition">
            <FiX size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-500">{syntax.toUpperCase()}</span>
              </div>
              <CopyButton code={snippet.code} />
            </div>
            <SyntaxHighlighter
              language={syntax}
              style={oneLight}
              customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "14px",
                borderRadius: "8px",
              }}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
}

function SnippetCard({ snippet, onViewCode }: { snippet: Snippet; onViewCode: () => void }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-3 hover:shadow-md transition">
      <h3 className="font-medium text-gray-900 text-sm mb-1">{snippet.title}</h3>
      <p className="text-xs text-gray-500 mb-2">{snippet.description}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {snippet.tags.slice(0, 2).map((tag, i) => (
          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={onViewCode}
        className="w-full py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition"
      >
        View Code
      </button>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalSnippet, setModalSnippet] = useState<Snippet | null>(null);

  const currentSnippets = snippetsData[selectedLanguage] || [];
  
  const filteredSnippets = currentSnippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentLanguage = languages.find(l => l.id === selectedLanguage)!;
  const totalSnippets = Object.values(snippetsData).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <>
      <CodeModal snippet={modalSnippet} syntax={currentLanguage.syntax} onClose={() => setModalSnippet(null)} />
      
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FiCode className="text-blue-600" size={28} />
              <h1 className="text-3xl font-bold text-gray-900">Code Snippets</h1>
            </div>
            <p className="text-sm text-gray-500">
              {totalSnippets} useful snippets across {languages.length} languages
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition ${
                  selectedLanguage === lang.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border hover:bg-gray-50"
                }`}
              >
                {lang.icon}
                <span className="hidden sm:inline">{lang.name}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder={`Search in ${currentLanguage.name} snippets...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Results count */}
          <div className="mb-3">
            <p className="text-xs text-gray-500">
              {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Snippets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredSnippets.map(snippet => (
              <SnippetCard 
                key={snippet.id} 
                snippet={snippet} 
                onViewCode={() => setModalSnippet(snippet)} 
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredSnippets.length === 0 && (
            <div className="text-center py-12">
              <FiCode className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No snippets found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}