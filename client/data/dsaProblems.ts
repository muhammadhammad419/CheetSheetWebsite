export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface Solution {
  language: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation?: string;
}

export interface DSAProblem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
  constraints?: string[];
  examples: TestCase[];
  testCases: TestCase[];
  solutions: Solution[];
  hints?: string[];
  companies?: string[];
  frequency?: number; // How often this problem appears in interviews
}

export interface ProblemCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  problems: DSAProblem[];
}

export const dsaProblems: DSAProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy",
    category: "Array",
    tags: ["Array", "Hash Table", "Two Pointers"],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        expectedOutput: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        expectedOutput: "[0,1]"
      }
    ],
    testCases: [
      {
        input: "[2,7,11,15], 9",
        expectedOutput: "[0,1]"
      },
      {
        input: "[3,2,4], 6",
        expectedOutput: "[1,2]"
      },
      {
        input: "[3,3], 6",
        expectedOutput: "[0,1]"
      }
    ],
    solutions: [
      {
        language: "javascript",
        code: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "Use a hash map to store numbers and their indices. For each number, check if its complement exists in the map."
      },
      {
        language: "python",
        code: `def two_sum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "Same approach using Python dictionary for O(1) lookup time."
      }
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "Can you use additional space to reduce time complexity?",
      "What if you could check if the complement exists in O(1) time?"
    ],
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple"],
    frequency: 95
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    difficulty: "Easy",
    category: "Linked List",
    tags: ["Linked List", "Recursion"],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        expectedOutput: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        expectedOutput: "[2,1]"
      },
      {
        input: "head = []",
        expectedOutput: "[]"
      }
    ],
    testCases: [
      {
        input: "[1,2,3,4,5]",
        expectedOutput: "[5,4,3,2,1]"
      },
      {
        input: "[1,2]",
        expectedOutput: "[2,1]"
      },
      {
        input: "[]",
        expectedOutput: "[]"
      }
    ],
    solutions: [
      {
        language: "javascript",
        code: `function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "Iteratively reverse the pointers of each node."
      },
      {
        language: "python",
        code: `def reverse_list(head):
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "Same iterative approach in Python."
      }
    ],
    hints: [
      "Think about what happens when you reverse the direction of pointers.",
      "You need to keep track of the previous node to avoid losing the list.",
      "Can you solve this both iteratively and recursively?"
    ],
    companies: ["Amazon", "Microsoft", "Facebook", "Google"],
    frequency: 88
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: "Easy",
    category: "Stack",
    tags: ["String", "Stack"],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      {
        input: 's = "()"',
        expectedOutput: "true"
      },
      {
        input: 's = "()[]{}"',
        expectedOutput: "true"
      },
      {
        input: 's = "(]"',
        expectedOutput: "false"
      }
    ],
    testCases: [
      {
        input: '"()"',
        expectedOutput: "true"
      },
      {
        input: '"()[]{}"',
        expectedOutput: "true"
      },
      {
        input: '"(]"',
        expectedOutput: "false"
      },
      {
        input: '"([)]"',
        expectedOutput: "false"
      }
    ],
    solutions: [
      {
        language: "javascript",
        code: `function isValid(s) {
    const stack = [];
    const mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in mapping) {
            const topElement = stack.length === 0 ? '#' : stack.pop();
            if (mapping[char] !== topElement) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "Use a stack to keep track of opening brackets and match them with closing brackets."
      },
      {
        language: "python",
        code: `def is_valid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    
    return not stack`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        explanation: "Same stack-based approach in Python."
      }
    ],
    hints: [
      "Use a stack data structure.",
      "Process the string character by character.",
      "What should you do when you encounter an opening bracket vs a closing bracket?"
    ],
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    frequency: 92
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    difficulty: "Easy",
    category: "Linked List",
    tags: ["Linked List", "Recursion"],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        expectedOutput: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        expectedOutput: "[]"
      },
      {
        input: "list1 = [], list2 = [0]",
        expectedOutput: "[0]"
      }
    ],
    testCases: [
      {
        input: "[1,2,4], [1,3,4]",
        expectedOutput: "[1,1,2,3,4,4]"
      },
      {
        input: "[], []",
        expectedOutput: "[]"
      },
      {
        input: "[], [0]",
        expectedOutput: "[0]"
      }
    ],
    solutions: [
      {
        language: "javascript",
        code: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Append remaining nodes
    current.next = list1 || list2;
    
    return dummy.next;
}`,
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(1)",
        explanation: "Use two pointers to merge the lists by comparing values."
      },
      {
        language: "python",
        code: `def merge_two_lists(list1, list2):
    dummy = ListNode(0)
    current = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    
    # Append remaining nodes
    current.next = list1 or list2
    
    return dummy.next`,
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(1)",
        explanation: "Same approach using Python."
      }
    ],
    hints: [
      "Use a dummy node to simplify the logic.",
      "Compare the values of the current nodes from both lists.",
      "Don't forget to handle the remaining nodes after one list is exhausted."
    ],
    companies: ["Amazon", "Microsoft", "Google"],
    frequency: 85
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.`,
    difficulty: "Medium",
    category: "Dynamic Programming",
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        expectedOutput: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        expectedOutput: "1"
      },
      {
        input: "nums = [5,4,-1,7,8]",
        expectedOutput: "23"
      }
    ],
    testCases: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        expectedOutput: "6"
      },
      {
        input: "[1]",
        expectedOutput: "1"
      },
      {
        input: "[5,4,-1,7,8]",
        expectedOutput: "23"
      }
    ],
    solutions: [
      {
        language: "javascript",
        code: `function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "Kadane's algorithm: at each position, decide whether to start a new subarray or extend the existing one."
      },
      {
        language: "python",
        code: `def max_sub_array(nums):
    max_so_far = nums[0]
    max_ending_here = nums[0]
    
    for i in range(1, len(nums)):
        max_ending_here = max(nums[i], max_ending_here + nums[i])
        max_so_far = max(max_so_far, max_ending_here)
    
    return max_so_far`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        explanation: "Kadane's algorithm implementation in Python."
      }
    ],
    hints: [
      "Try using dynamic programming.",
      "At each position, you can either start a new subarray or extend the previous one.",
      "This is a classic application of Kadane's algorithm."
    ],
    companies: ["Amazon", "Microsoft", "Google", "Facebook", "Apple"],
    frequency: 90
  }
];

export const problemCategories: ProblemCategory[] = [
  {
    id: "array",
    name: "Array",
    description: "Problems involving array manipulation and algorithms",
    icon: "📊",
    problems: dsaProblems.filter(p => p.category === "Array")
  },
  {
    id: "linked-list",
    name: "Linked List",
    description: "Problems involving linked list operations",
    icon: "🔗",
    problems: dsaProblems.filter(p => p.category === "Linked List")
  },
  {
    id: "stack",
    name: "Stack",
    description: "Problems using stack data structure",
    icon: "📚",
    problems: dsaProblems.filter(p => p.category === "Stack")
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    description: "Problems solved using dynamic programming techniques",
    icon: "🧮",
    problems: dsaProblems.filter(p => p.category === "Dynamic Programming")
  },
  {
    id: "tree",
    name: "Tree",
    description: "Problems involving tree data structures",
    icon: "🌳",
    problems: dsaProblems.filter(p => p.category === "Tree")
  },
  {
    id: "graph",
    name: "Graph",
    description: "Problems involving graph algorithms",
    icon: "🕸️",
    problems: dsaProblems.filter(p => p.category === "Graph")
  }
];

export const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-500";
    case "Medium":
      return "bg-yellow-500";
    case "Hard":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getProblemById = (id: string): DSAProblem | undefined => {
  return dsaProblems.find(problem => problem.id === id);
};

export const getProblemsByCategory = (category: string): DSAProblem[] => {
  return dsaProblems.filter(problem => problem.category === category);
};

export const getProblemsByDifficulty = (difficulty: Difficulty): DSAProblem[] => {
  return dsaProblems.filter(problem => problem.difficulty === difficulty);
};

export const searchProblems = (query: string): DSAProblem[] => {
  const lowercaseQuery = query.toLowerCase();
  return dsaProblems.filter(problem => 
    problem.title.toLowerCase().includes(lowercaseQuery) ||
    problem.description.toLowerCase().includes(lowercaseQuery) ||
    problem.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    problem.category.toLowerCase().includes(lowercaseQuery)
  );
};
