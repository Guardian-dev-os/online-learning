// Course data loader utility
// This module provides functions to get course curriculum data

export interface ModuleContent {
  id: number
  title: string
  content: string
  completed: boolean
  quiz?: QuizQuestion[]
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface CourseData {
  id: string
  title: string
  description: string
  duration: string
  modules: ModuleContent[]
  level: "certificate" | "diploma"
}

// Generic module templates for certificate courses (5-6 modules)
const certificateModuleTemplates: Record<string, ModuleContent[]> = {
  default: [
    {
      id: 1,
      title: "Introduction & Foundations",
      content: `Welcome to this comprehensive course. In this foundational module, you will learn the core principles and concepts that form the basis of this field. We'll explore the history, key terminology, and fundamental frameworks that practitioners use daily. Understanding these foundations is crucial for building expertise and applying knowledge effectively in real-world situations.`,
      completed: false,
      quiz: [
        { id: 1, question: "What is the primary purpose of this foundational module?", options: ["To test advanced skills", "To establish core principles and concepts", "To prepare for certification exam only", "To review previous knowledge"], correctAnswer: 1 },
        { id: 2, question: "Why is understanding foundations important?", options: ["It's not important", "For applying knowledge effectively", "Only for academic purposes", "To skip advanced modules"], correctAnswer: 1 },
      ]
    },
    {
      id: 2,
      title: "Core Concepts & Principles",
      content: `This module dives deeper into the essential concepts and principles that guide professional practice. You'll learn about industry standards, best practices, and the theoretical frameworks that inform decision-making. Through examples and case studies, you'll see how these concepts apply in various contexts.`,
      completed: false,
      quiz: [
        { id: 1, question: "What role do industry standards play in professional practice?", options: ["They are optional guidelines", "They guide decision-making and best practices", "They only apply to large organizations", "They are outdated concepts"], correctAnswer: 1 },
      ]
    },
    {
      id: 3,
      title: "Practical Applications",
      content: `Now we move from theory to practice. This module focuses on applying what you've learned to real-world scenarios. You'll work through practical exercises, learn problem-solving techniques, and develop the hands-on skills needed for professional success.`,
      completed: false,
      quiz: [
        { id: 1, question: "What is the focus of practical application modules?", options: ["Memorizing theory", "Applying knowledge to real scenarios", "Reading additional materials", "Reviewing previous modules"], correctAnswer: 1 },
      ]
    },
    {
      id: 4,
      title: "Case Studies & Analysis",
      content: `Learn from real-world examples in this case study module. We'll examine successful implementations, common challenges, and lessons learned from industry practitioners. You'll develop analytical skills and learn to apply frameworks to complex situations.`,
      completed: false,
      quiz: [
        { id: 1, question: "What can case studies teach us?", options: ["Only theoretical concepts", "Real-world lessons and practical applications", "Nothing relevant to practice", "Academic research methods only"], correctAnswer: 1 },
      ]
    },
    {
      id: 5,
      title: "Professional Skills & Assessment",
      content: `This final module focuses on professional development and prepares you for certification. You'll learn about career pathways, continuing education, and how to apply your new skills in your professional journey. Complete the final assessment to demonstrate your mastery.`,
      completed: false,
      quiz: [
        { id: 1, question: "What does the final module prepare you for?", options: ["Starting over", "Certification and professional development", "Unrelated topics", "Basic concepts only"], correctAnswer: 1 },
      ]
    },
  ],
}

// Generic module templates for diploma courses (8-10 modules)
const diplomaModuleTemplates: Record<string, ModuleContent[]> = {
  default: [
    {
      id: 1,
      title: "Advanced Foundations & Theory",
      content: `Welcome to this advanced diploma program. Building on foundational knowledge, this module explores sophisticated theoretical frameworks and advanced principles that distinguish experts in this field. You'll engage with cutting-edge research and develop a deeper understanding of the discipline.`,
      completed: false,
      quiz: [
        { id: 1, question: "How does this diploma differ from certificate level?", options: ["It's identical", "It covers advanced frameworks and deeper understanding", "It's easier", "It focuses only on basics"], correctAnswer: 1 },
      ]
    },
    {
      id: 2,
      title: "Specialized Knowledge Areas",
      content: `This module covers specialized knowledge areas that are essential for advanced practitioners. You'll explore niche topics, emerging trends, and specialized techniques that set professionals apart in the field.`,
      completed: false,
      quiz: [
        { id: 1, question: "Why is specialized knowledge important?", options: ["It's not important", "It differentiates advanced practitioners", "It's only for academics", "It's outdated"], correctAnswer: 1 },
      ]
    },
    {
      id: 3,
      title: "Industry Case Studies",
      content: `Analyze complex industry case studies that demonstrate advanced applications. You'll examine multi-faceted scenarios, evaluate decisions, and develop strategic thinking skills applicable to leadership roles.`,
      completed: false,
      quiz: [
        { id: 1, question: "What skills do complex case studies develop?", options: ["Basic memorization", "Strategic thinking and analysis", "Simple recall", "Only technical skills"], correctAnswer: 1 },
      ]
    },
    {
      id: 4,
      title: "Research & Analysis Methods",
      content: `Master research methodologies and analytical techniques used by industry leaders. Learn to conduct research, analyze data, and draw evidence-based conclusions that inform strategic decisions.`,
      completed: false,
      quiz: [
        { id: 1, question: "What is evidence-based decision making?", options: ["Making random choices", "Using research and data to inform decisions", "Following gut feelings", "Copying competitors"], correctAnswer: 1 },
      ]
    },
    {
      id: 5,
      title: "Professional Project Work",
      content: `Apply your knowledge through comprehensive project work. This hands-on module challenges you to integrate multiple concepts, work independently, and produce professional-quality deliverables.`,
      completed: false,
      quiz: [
        { id: 1, question: "What does project work demonstrate?", options: ["Only theoretical knowledge", "Integration of multiple concepts and practical skills", "Ability to copy examples", "Basic understanding only"], correctAnswer: 1 },
      ]
    },
    {
      id: 6,
      title: "Advanced Techniques & Innovation",
      content: `Explore cutting-edge techniques and innovative approaches that are shaping the future of this field. Learn about emerging technologies, methodologies, and trends that leaders are adopting.`,
      completed: false,
      quiz: [
        { id: 1, question: "Why should professionals stay updated on emerging trends?", options: ["It's not necessary", "To remain competitive and effective", "Only for curiosity", "It's discouraged"], correctAnswer: 1 },
      ]
    },
    {
      id: 7,
      title: "Leadership & Strategic Application",
      content: `Develop leadership capabilities and learn to apply knowledge strategically at organizational levels. This module prepares you for management and leadership roles where strategic thinking is essential.`,
      completed: false,
      quiz: [
        { id: 1, question: "What distinguishes leadership-level application?", options: ["Following instructions", "Strategic thinking at organizational levels", "Avoiding responsibility", "Working in isolation"], correctAnswer: 1 },
      ]
    },
    {
      id: 8,
      title: "Capstone Assessment & Certification",
      content: `Complete your diploma journey with a comprehensive capstone assessment. Demonstrate mastery across all modules, receive your diploma certification, and prepare for advanced career opportunities.`,
      completed: false,
      quiz: [
        { id: 1, question: "What does the capstone assessment demonstrate?", options: ["Partial knowledge", "Mastery across all program areas", "Only recent learning", "Basic concepts"], correctAnswer: 1 },
      ]
    },
  ],
}

// Course-specific module customization
const courseSpecificModules: Record<string, { certificate: ModuleContent[], diploma: ModuleContent[] }> = {
  "accounting": {
    certificate: [
      { id: 1, title: "The Language of Business: Accounting Fundamentals", content: "Accounting is the language of business. This module introduces core concepts including the accounting equation, financial statements, and the accounting cycle.", completed: false, quiz: [{ id: 1, question: "What is the fundamental accounting equation?", options: ["Revenue - Expenses = Profit", "Assets = Liabilities + Owner's Equity", "Cash In - Cash Out = Balance", "Income - Costs = Net Worth"], correctAnswer: 1 }] },
      { id: 2, title: "Double-Entry System and Transaction Analysis", content: "Master the double-entry bookkeeping system, understanding debits and credits, T-accounts, and how to analyze business transactions.", completed: false },
      { id: 3, title: "Recording Business Transactions", content: "Learn to record journal entries, post to ledgers, and create trial balances. Understand the complete transaction recording process.", completed: false },
      { id: 4, title: "Financial Statement Preparation", content: "Prepare income statements, balance sheets, and statements of cash flows. Understand how these statements interconnect.", completed: false },
      { id: 5, title: "Assessment & Certification", content: "Complete comprehensive exercises and demonstrate your accounting fundamentals knowledge through final assessment.", completed: false },
    ],
    diploma: [
      { id: 1, title: "Advanced Financial Accounting & Reporting", content: "Master complex financial instruments, fair value measurement, revenue recognition (ASC 606), and leases accounting (ASC 842).", completed: false },
      { id: 2, title: "Advanced Managerial & Cost Accounting", content: "Explore Activity-Based Costing, cost-volume-profit analysis, budgeting, and advanced decision analysis techniques.", completed: false },
      { id: 3, title: "Auditing Standards & Practices", content: "Learn GAAS, risk assessment, audit evidence, and internal control evaluation procedures.", completed: false },
      { id: 4, title: "Taxation & Tax Planning", content: "Understand tax regulations, corporate tax planning, individual taxation, and international tax considerations.", completed: false },
      { id: 5, title: "Financial Analysis & Valuation", content: "Master ratio analysis, cash flow analysis, business valuation methods, and financial modeling.", completed: false },
      { id: 6, title: "Accounting Information Systems", content: "Learn ERP systems, data analytics for accounting, cybersecurity considerations, and emerging technologies.", completed: false },
      { id: 7, title: "Professional Ethics & Governance", content: "Explore AICPA Code of Ethics, Sarbanes-Oxley compliance, and corporate governance frameworks.", completed: false },
      { id: 8, title: "Capstone: Strategic Financial Management", content: "Complete a comprehensive capstone project integrating all accounting disciplines for professional certification.", completed: false },
    ]
  },
  "digital-marketing": {
    certificate: [
      { id: 1, title: "Digital Marketing Foundations", content: "Understand the digital marketing landscape, customer journey mapping, and the integration of online and offline marketing.", completed: false },
      { id: 2, title: "Search Engine Optimization (SEO)", content: "Master on-page and off-page SEO, keyword research, technical SEO, and search engine algorithms.", completed: false },
      { id: 3, title: "Social Media Marketing", content: "Learn platform-specific strategies for Instagram, Facebook, LinkedIn, TikTok, and emerging social platforms.", completed: false },
      { id: 4, title: "Content Marketing & Strategy", content: "Develop content strategies, create engaging content, and measure content performance across channels.", completed: false },
      { id: 5, title: "Analytics & Performance Measurement", content: "Use Google Analytics, track KPIs, create reports, and optimize campaigns based on data insights.", completed: false },
    ],
    diploma: [
      { id: 1, title: "Strategic Digital Marketing", content: "Develop comprehensive digital marketing strategies aligned with business objectives and market opportunities.", completed: false },
      { id: 2, title: "Advanced SEO & SEM", content: "Master advanced SEO techniques, Google Ads, PPC campaigns, and search marketing automation.", completed: false },
      { id: 3, title: "Social Media Strategy & Advertising", content: "Create advanced social media strategies, manage paid social campaigns, and develop influencer partnerships.", completed: false },
      { id: 4, title: "Email Marketing Automation", content: "Build automated email sequences, segment audiences, and optimize email campaign performance.", completed: false },
      { id: 5, title: "Conversion Rate Optimization", content: "Apply CRO techniques, A/B testing, landing page optimization, and user experience improvements.", completed: false },
      { id: 6, title: "Marketing Analytics & Attribution", content: "Master multi-touch attribution, customer lifetime value analysis, and predictive marketing analytics.", completed: false },
      { id: 7, title: "E-commerce & Performance Marketing", content: "Develop e-commerce marketing strategies, affiliate programs, and performance-based marketing campaigns.", completed: false },
      { id: 8, title: "Digital Marketing Leadership", content: "Lead marketing teams, manage budgets, develop marketing technology stacks, and drive digital transformation.", completed: false },
    ]
  },
  "web-development": {
    certificate: [
      { id: 1, title: "HTML & CSS Fundamentals", content: "Build the foundation of web development with semantic HTML5 and modern CSS3 styling techniques.", completed: false },
      { id: 2, title: "JavaScript Essentials", content: "Learn JavaScript programming, DOM manipulation, events, and modern ES6+ features.", completed: false },
      { id: 3, title: "Responsive Web Design", content: "Create mobile-first, responsive layouts using Flexbox, CSS Grid, and media queries.", completed: false },
      { id: 4, title: "Introduction to Frameworks", content: "Get started with popular frameworks like React or Vue, understanding component-based architecture.", completed: false },
      { id: 5, title: "Web Development Projects", content: "Build portfolio-ready projects demonstrating your front-end development skills.", completed: false },
    ],
    diploma: [
      { id: 1, title: "Advanced JavaScript & TypeScript", content: "Master advanced JavaScript patterns, TypeScript, and modern development practices.", completed: false },
      { id: 2, title: "React/Next.js Development", content: "Build production-ready applications with React, Next.js, state management, and server-side rendering.", completed: false },
      { id: 3, title: "Backend Development with Node.js", content: "Create RESTful APIs, work with Express.js, handle authentication, and manage databases.", completed: false },
      { id: 4, title: "Database Design & Management", content: "Design database schemas, work with SQL and NoSQL databases, and implement data relationships.", completed: false },
      { id: 5, title: "API Development & Integration", content: "Build and consume RESTful and GraphQL APIs, implement webhooks, and work with third-party services.", completed: false },
      { id: 6, title: "DevOps & Deployment", content: "Deploy applications to cloud platforms, implement CI/CD pipelines, and manage production environments.", completed: false },
      { id: 7, title: "Testing & Security", content: "Write unit and integration tests, implement security best practices, and conduct code reviews.", completed: false },
      { id: 8, title: "Full Stack Capstone Project", content: "Build a complete full-stack application demonstrating all skills learned throughout the program.", completed: false },
    ]
  },
  "nursing": {
    certificate: [
      { id: 1, title: "Nursing Foundations", content: "Understand the nursing profession, healthcare systems, patient rights, and the nursing process framework.", completed: false },
      { id: 2, title: "Patient Assessment Skills", content: "Learn comprehensive health assessments, vital signs monitoring, and documentation standards.", completed: false },
      { id: 3, title: "Basic Clinical Procedures", content: "Master fundamental nursing procedures including medication administration, wound care, and infection control.", completed: false },
      { id: 4, title: "Patient Care & Communication", content: "Develop therapeutic communication skills, patient education techniques, and cultural competency.", completed: false },
      { id: 5, title: "Nursing Ethics & Practice", content: "Explore ethical principles, legal considerations, and professional standards in nursing practice.", completed: false },
    ],
    diploma: [
      { id: 1, title: "Advanced Nursing Assessment", content: "Master advanced assessment techniques, physical examination, and diagnostic reasoning skills.", completed: false },
      { id: 2, title: "Pharmacology & Medication Management", content: "Deep dive into drug classifications, pharmacokinetics, and safe medication administration practices.", completed: false },
      { id: 3, title: "Medical-Surgical Nursing", content: "Care for patients with complex medical and surgical conditions across various body systems.", completed: false },
      { id: 4, title: "Critical Care Nursing", content: "Manage critically ill patients, understand intensive care procedures, and emergency interventions.", completed: false },
      { id: 5, title: "Specialized Nursing Areas", content: "Explore pediatric, geriatric, mental health, and community health nursing specializations.", completed: false },
      { id: 6, title: "Evidence-Based Practice", content: "Apply research findings to clinical practice, conduct quality improvement projects.", completed: false },
      { id: 7, title: "Nursing Leadership", content: "Develop leadership skills, team management, and healthcare administration competencies.", completed: false },
      { id: 8, title: "Clinical Practicum", content: "Complete supervised clinical hours demonstrating competency in all nursing domains.", completed: false },
    ]
  },
}

/**
 * Get course modules for a specific course and level
 */
export function getCourseModules(courseId: string, level: "certificate" | "diploma"): ModuleContent[] {
  const normalizedId = courseId.toLowerCase().replace(/\s+/g, "-")
  
  // Check for course-specific modules
  if (courseSpecificModules[normalizedId]) {
    return level === "certificate" 
      ? courseSpecificModules[normalizedId].certificate 
      : courseSpecificModules[normalizedId].diploma
  }
  
  // Try partial match
  const matchedKey = Object.keys(courseSpecificModules).find(
    key => normalizedId.includes(key) || key.includes(normalizedId)
  )
  
  if (matchedKey) {
    return level === "certificate"
      ? courseSpecificModules[matchedKey].certificate
      : courseSpecificModules[matchedKey].diploma
  }
  
  // Return default templates
  return level === "certificate"
    ? certificateModuleTemplates.default
    : diplomaModuleTemplates.default
}

/**
 * Get the total number of modules for a level
 */
export function getModuleCount(level: "certificate" | "diploma"): string {
  return level === "certificate" ? "5-6" : "8-10"
}
