export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseStatus = "Draft" | "Published" | "Archived";
export type LessonType = "Video" | "Text" | "Quiz" | "Assignment" | "Code";
export type UserRole = "Student" | "Instructor" | "Admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  specialization?: string[];
  joinedDate: string;
  totalStudents?: number; // For instructors
  totalCourses?: number; // For instructors
  rating?: number; // For instructors
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  duration: number; // in minutes
  videoUrl?: string;
  content?: string; // For text lessons
  codeExample?: string;
  resources?: string[]; // URLs to downloadable resources
  quiz?: Quiz;
  isCompleted?: boolean; // For student progress
  isFree?: boolean; // Preview lessons
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructor: User;
  price: number;
  originalPrice?: number; // For discounts
  level: CourseLevel;
  category: string;
  subcategory: string;
  tags: string[];
  language: string;
  chapters: Chapter[];
  totalDuration: number; // in minutes
  totalLessons: number;
  studentsEnrolled: number;
  rating: number;
  reviewsCount: number;
  lastUpdated: string;
  status: CourseStatus;
  requirements: string[];
  learningObjectives: string[];
  certificate: boolean;
  createdDate: string;
  features: string[]; // e.g., "Lifetime access", "Mobile accessible"
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledDate: string;
  progress: number; // 0-100
  completedLessons: string[];
  currentLesson?: string;
  certificateEarned: boolean;
  lastAccessed: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
  courseCount: number;
}

// Sample data
export const categories: Category[] = [
  {
    id: "web-development",
    name: "Web Development",
    icon: "💻",
    description: "Build websites and web applications",
    subcategories: [
      "Frontend",
      "Backend",
      "Full Stack",
      "JavaScript",
      "React",
      "Angular",
      "Vue",
    ],
    courseCount: 156,
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    icon: "📱",
    description: "Create mobile apps for iOS and Android",
    subcategories: ["React Native", "Flutter", "iOS", "Android", "Ionic"],
    courseCount: 89,
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: "📊",
    description: "Analyze data and build ML models",
    subcategories: [
      "Python",
      "Machine Learning",
      "Data Analysis",
      "Statistics",
      "AI",
    ],
    courseCount: 124,
  },
  {
    id: "design",
    name: "Design",
    icon: "🎨",
    description: "UI/UX design and graphic design",
    subcategories: ["UI/UX", "Graphic Design", "Figma", "Adobe", "Prototyping"],
    courseCount: 78,
  },
  {
    id: "business",
    name: "Business",
    icon: "💼",
    description: "Business and entrepreneurship skills",
    subcategories: [
      "Marketing",
      "Management",
      "Entrepreneurship",
      "Finance",
      "Sales",
    ],
    courseCount: 203,
  },
  {
    id: "programming",
    name: "Programming",
    icon: "⚡",
    description: "Learn programming languages and concepts",
    subcategories: ["JavaScript", "Python", "Java", "C++", "Go", "Rust"],
    courseCount: 142,
  },
];

export const instructors: User[] = [
  {
    id: "instructor-1",
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/instructors/sarah.jpg",
    role: "Instructor",
    bio: "Full-stack developer with 10+ years of experience. Former tech lead at Google.",
    specialization: ["Web Development", "JavaScript", "React", "Node.js"],
    joinedDate: "2020-01-15",
    totalStudents: 45000,
    totalCourses: 12,
    rating: 4.8,
  },
  {
    id: "instructor-2",
    name: "Prof. Michael Chen",
    email: "michael@example.com",
    avatar: "/instructors/michael.jpg",
    role: "Instructor",
    bio: "Data scientist and ML engineer. PhD in Computer Science from Stanford.",
    specialization: ["Data Science", "Machine Learning", "Python", "AI"],
    joinedDate: "2019-08-22",
    totalStudents: 32000,
    totalCourses: 8,
    rating: 4.9,
  },
  {
    id: "instructor-3",
    name: "Emma Rodriguez",
    email: "emma@example.com",
    avatar: "/instructors/emma.jpg",
    role: "Instructor",
    bio: "Senior UX Designer at Adobe. Passionate about creating user-centered designs.",
    specialization: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
    joinedDate: "2021-03-10",
    totalStudents: 28000,
    totalCourses: 6,
    rating: 4.7,
  },
];

export const sampleCourses: Course[] = [
  {
    id: "course-1",
    title: "Complete React Developer Course 2024",
    description:
      "Learn React from scratch and build amazing web applications. This comprehensive course covers React fundamentals, hooks, context, routing, and state management with Redux. You'll build real-world projects and deploy them to production.",
    shortDescription:
      "Master React.js and build modern web applications from scratch",
    thumbnail: "/courses/react-course.jpg",
    instructor: instructors[0],
    price: 89.99,
    originalPrice: 199.99,
    level: "Intermediate",
    category: "Web Development",
    subcategory: "Frontend",
    tags: ["React", "JavaScript", "Frontend", "Web Development", "Hooks"],
    language: "English",
    totalDuration: 2400, // 40 hours
    totalLessons: 156,
    studentsEnrolled: 12500,
    rating: 4.8,
    reviewsCount: 2341,
    lastUpdated: "2024-01-15",
    status: "Published",
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Understanding of ES6+ features",
      "Node.js installed on your computer",
    ],
    learningObjectives: [
      "Build modern React applications from scratch",
      "Master React hooks and component lifecycle",
      "Implement state management with Redux",
      "Create responsive and interactive UIs",
      "Deploy React apps to production",
    ],
    certificate: true,
    createdDate: "2023-06-01",
    features: [
      "Lifetime access",
      "Mobile accessible",
      "Certificate of completion",
      "30-day money-back guarantee",
    ],
    chapters: [
      {
        id: "chapter-1",
        title: "React Fundamentals",
        description: "Learn the basics of React and JSX",
        order: 1,
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to React",
            description: "Understanding what React is and why it's popular",
            type: "Video",
            duration: 15,
            videoUrl: "/videos/react-intro.mp4",
            isFree: true,
          },
          {
            id: "lesson-1-2",
            title: "Setting up Your Development Environment",
            description: "Install Node.js, create-react-app, and VS Code setup",
            type: "Video",
            duration: 20,
            videoUrl: "/videos/react-setup.mp4",
            isFree: true,
          },
          {
            id: "lesson-1-3",
            title: "Your First React Component",
            description: "Creating and rendering your first component",
            type: "Video",
            duration: 25,
            videoUrl: "/videos/first-component.mp4",
          },
        ],
      },
      {
        id: "chapter-2",
        title: "Components and Props",
        description: "Deep dive into React components and data passing",
        order: 2,
        lessons: [
          {
            id: "lesson-2-1",
            title: "Functional vs Class Components",
            description: "Understanding different component types",
            type: "Video",
            duration: 30,
            videoUrl: "/videos/component-types.mp4",
          },
          {
            id: "lesson-2-2",
            title: "Props and Data Flow",
            description: "Passing data between components",
            type: "Video",
            duration: 35,
            videoUrl: "/videos/props-data-flow.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "course-2",
    title: "Python for Data Science Masterclass",
    description:
      "Comprehensive course covering Python programming for data science, including pandas, numpy, matplotlib, and machine learning with scikit-learn. Build real data science projects.",
    shortDescription:
      "Learn Python programming and data science from beginner to advanced",
    thumbnail: "/courses/python-data-science.jpg",
    instructor: instructors[1],
    price: 79.99,
    originalPrice: 149.99,
    level: "Beginner",
    category: "Data Science",
    subcategory: "Python",
    tags: ["Python", "Data Science", "Machine Learning", "Pandas", "NumPy"],
    language: "English",
    totalDuration: 1800, // 30 hours
    totalLessons: 120,
    studentsEnrolled: 8900,
    rating: 4.9,
    reviewsCount: 1876,
    lastUpdated: "2024-01-10",
    status: "Published",
    requirements: [
      "No prior programming experience needed",
      "Computer with Python 3.7+ installed",
      "Basic mathematics knowledge",
    ],
    learningObjectives: [
      "Master Python programming fundamentals",
      "Perform data analysis with pandas and numpy",
      "Create data visualizations with matplotlib",
      "Build machine learning models",
      "Work with real-world datasets",
    ],
    certificate: true,
    createdDate: "2023-05-15",
    features: [
      "Lifetime access",
      "Downloadable resources",
      "Coding exercises",
      "Real projects",
    ],
    chapters: [
      {
        id: "chapter-1",
        title: "Python Basics",
        description: "Learn Python programming fundamentals",
        order: 1,
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to Python",
            description: "What is Python and why use it for data science",
            type: "Video",
            duration: 12,
            videoUrl: "/videos/python-intro.mp4",
            isFree: true,
          },
        ],
      },
    ],
  },
  {
    id: "course-3",
    title: "UI/UX Design Complete Course",
    description:
      "Learn user interface and user experience design from scratch. Master design principles, wireframing, prototyping, and user research. Use Figma to create beautiful designs.",
    shortDescription: "Complete guide to UI/UX design with hands-on projects",
    thumbnail: "/courses/ui-ux-design.jpg",
    instructor: instructors[2],
    price: 69.99,
    originalPrice: 129.99,
    level: "Beginner",
    category: "Design",
    subcategory: "UI/UX",
    tags: ["UI/UX", "Design", "Figma", "Prototyping", "User Research"],
    language: "English",
    totalDuration: 1500, // 25 hours
    totalLessons: 98,
    studentsEnrolled: 6700,
    rating: 4.7,
    reviewsCount: 1234,
    lastUpdated: "2024-01-05",
    status: "Published",
    requirements: [
      "No design experience required",
      "Computer with internet access",
      "Figma account (free)",
    ],
    learningObjectives: [
      "Understand UI/UX design principles",
      "Create wireframes and prototypes",
      "Conduct user research and testing",
      "Master Figma for design",
      "Build a design portfolio",
    ],
    certificate: true,
    createdDate: "2023-07-20",
    features: [
      "Design resources",
      "Template files",
      "Portfolio guidance",
      "Industry insights",
    ],
    chapters: [
      {
        id: "chapter-1",
        title: "Design Fundamentals",
        description: "Learn the basics of design theory",
        order: 1,
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to UI/UX",
            description: "Understanding the difference between UI and UX",
            type: "Video",
            duration: 18,
            videoUrl: "/videos/ui-ux-intro.mp4",
            isFree: true,
          },
        ],
      },
    ],
  },
];

// Utility functions
export const getCourseById = (id: string): Course | undefined => {
  return sampleCourses.find((course) => course.id === id);
};

export const getCoursesByCategory = (categoryId: string): Course[] => {
  return sampleCourses.filter(
    (course) =>
      course.category.toLowerCase().replace(/\s+/g, "-") === categoryId,
  );
};

export const getCoursesByInstructor = (instructorId: string): Course[] => {
  return sampleCourses.filter(
    (course) => course.instructor.id === instructorId,
  );
};

export const searchCourses = (query: string): Course[] => {
  const lowercaseQuery = query.toLowerCase();
  return sampleCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      course.instructor.name.toLowerCase().includes(lowercaseQuery),
  );
};

export const getPopularCourses = (): Course[] => {
  return sampleCourses
    .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
    .slice(0, 6);
};

export const getTopRatedCourses = (): Course[] => {
  return sampleCourses.sort((a, b) => b.rating - a.rating).slice(0, 6);
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const calculateDiscountPercentage = (
  originalPrice: number,
  currentPrice: number,
): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
