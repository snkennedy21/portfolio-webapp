/**
 * Conversation tree for the interview.
 * Each question has a pre-written response and contextually relevant follow-ups.
 */

export interface QuestionNode {
  question: string;
  answer: string;
  followUps: string[]; // Keys to other questions in the tree
}

export const conversationTree: Record<string, QuestionNode> = {
  // ============================================
  // INITIAL QUESTIONS (Entry Points)
  // ============================================

  'tell-me-about-yourself': {
    question: 'Tell me about yourself',
    answer:
      "I'm a full-stack developer who came to software from teaching PE. Started coding in 2020 just for fun, fell in love with building things, and made it my career. I have a philosophy degree from Colgate which probably explains why I like solving problems that don't have obvious answers.",
    followUps: [
      'react-experience',
      'teaching-to-software',
      'philosophy-background',
    ],
  },

  'technical-challenge': {
    question: 'Walk me through a technical challenge you solved',
    answer:
      "At Data Machines, I built a custom SQL migration tool for zero-downtime updates. Our production systems couldn't go offline, so I designed a way to apply schema changes incrementally while the app stayed live. It involved careful sequencing and rollback logic.",
    followUps: [
      'debugging-approach',
      'devops-tools',
      'proud-of-building',
    ],
  },

  'why-hire-you': {
    question: 'Why should we hire you?',
    answer:
      "I ship fast and I care about the details. At my current role I delivered a full feature within 6 weeks of joining, and I regularly knock out P0 bugs within 24-48 hours. I also like finding ways to make the whole team more effective, not just my own work.",
    followUps: [
      'proud-of-building',
      'looking-for-next-role',
      'team-effectiveness',
    ],
  },

  'what-got-you-into-programming': {
    question: 'What got you into programming?',
    answer:
      "Honestly, I just started tinkering in 2020 because I was curious. Built a few small projects, realized I loved the problem-solving aspect, and it snowballed from there. The transition from teaching wasn't planned - I just followed what excited me.",
    followUps: [
      'teaching-to-software',
      'proud-of-building',
      'what-keeps-you-motivated',
    ],
  },

  // ============================================
  // REACT & FRONTEND
  // ============================================

  'react-experience': {
    question: "What's your experience with React?",
    answer:
      "React's been my main frontend tool for a few years now. I've maintained shared component libraries, led a Redux to Redux Toolkit migration that cut our boilerplate in half, and shipped features across multiple production apps. It's where I feel most at home.",
    followUps: [
      'react-project-example',
      'typescript-experience',
      'component-library-work',
    ],
  },

  'react-project-example': {
    question: 'Tell me about a project where you worked with React',
    answer:
      "At Data Machines, I maintained a shared React component library used across 5+ production systems. I also led our migration from Redux to Redux Toolkit - we reduced boilerplate by about 50% and the codebase became much easier for new devs to understand.",
    followUps: [
      'redux-migration-challenges',
      'component-library-work',
      'typescript-experience',
    ],
  },

  'redux-migration-challenges': {
    question: 'What was challenging about the Redux migration?',
    answer:
      "The biggest challenge was doing it incrementally without breaking things. We couldn't just rewrite everything at once - production apps depended on it. I created a migration guide for the team and we tackled it slice by slice over a few sprints.",
    followUps: [
      'debugging-approach',
      'team-effectiveness',
      'looking-for-next-role',
    ],
  },

  'component-library-work': {
    question: 'How do you approach building reusable components?',
    answer:
      "I focus on making them flexible without overcomplicating the API. Good defaults, sensible prop names, and I always think about the developer experience of someone using the component. I also spearheaded Material UI adoption at Data Machines which taught me a lot about component design patterns.",
    followUps: [
      'typescript-experience',
      'debugging-approach',
      'proud-of-building',
    ],
  },

  'typescript-experience': {
    question: 'Can you tell me more about your experience with TypeScript?',
    answer:
      "I use TypeScript daily - it's my default for any new project. The type safety catches so many bugs before they hit production. I've worked with it across React frontends and Node/Express backends.",
    followUps: [
      'debugging-approach',
      'devops-tools',
      'proud-of-building',
    ],
  },

  // ============================================
  // BACKGROUND & CAREER TRANSITION
  // ============================================

  'teaching-to-software': {
    question: 'What was the transition from teaching to software like?',
    answer:
      "It was a leap, but teaching gave me skills that transferred well - explaining complex things simply, patience with debugging, and understanding that everyone learns differently. The hardest part was just building enough projects to be credible.",
    followUps: [
      'philosophy-background',
      'what-keeps-you-motivated',
      'looking-for-next-role',
    ],
  },

  'philosophy-background': {
    question: 'How does your philosophy background help you as a developer?',
    answer:
      "Philosophy taught me to sit with ambiguity and break down complex arguments into smaller pieces. In code, that's basically debugging and system design. I'm comfortable when there's no obvious right answer.",
    followUps: [
      'debugging-approach',
      'what-keeps-you-motivated',
      'teaching-to-software',
    ],
  },

  // ============================================
  // WORK STYLE & MOTIVATION
  // ============================================

  'what-keeps-you-motivated': {
    question: 'What keeps you motivated?',
    answer:
      "Building things that actually get used. There's something satisfying about seeing code you wrote solve real problems for real people. Also, I just genuinely enjoy the puzzle-solving aspect of programming.",
    followUps: [
      'proud-of-building',
      'looking-for-next-role',
      'team-effectiveness',
    ],
  },

  'looking-for-next-role': {
    question: "What are you looking for in your next role?",
    answer:
      "Growth opportunities and the chance to lead. I like being part of an organization, spotting pain points, and building solutions that make everyone's work easier - devs and non-devs alike.",
    followUps: [
      'team-effectiveness',
      'proud-of-building',
      'what-keeps-you-motivated',
    ],
  },

  'proud-of-building': {
    question: 'What are you most proud of building?',
    answer:
      "The clinical language standardization feature I shipped at Black Cape. It helps medical professionals map their terminology to FDA requirements. Shipped it in 6 weeks and it's actually being used to help real healthcare workflows.",
    followUps: [
      'debugging-approach',
      'looking-for-next-role',
      'what-keeps-you-motivated',
    ],
  },

  'team-effectiveness': {
    question: 'How do you make teams more effective?',
    answer:
      "I look for friction points - slow processes, confusing code, missing documentation - and fix them. At Data Machines, I used Ansible to automate monitoring software installation across 50+ servers. Small wins that save everyone time add up.",
    followUps: [
      'devops-tools',
      'looking-for-next-role',
      'proud-of-building',
    ],
  },

  // ============================================
  // TECHNICAL SKILLS
  // ============================================

  'debugging-approach': {
    question: 'How do you approach debugging complex issues?',
    answer:
      "I start by reproducing the issue reliably, then narrow down the scope. Logs, breakpoints, and stepping through the code path. I also like to check recent changes in that area - often the culprit is something new.",
    followUps: [
      'typescript-experience',
      'devops-tools',
      'team-effectiveness',
    ],
  },

  'devops-tools': {
    question: 'What DevOps tools have you worked with?',
    answer:
      "Docker and Kubernetes for containerization, Ansible for automation - I used it to install monitoring software across 50+ servers. CI/CD pipelines, and deploying to air-gapped environments which has its own challenges.",
    followUps: [
      'debugging-approach',
      'team-effectiveness',
      'proud-of-building',
    ],
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Initial questions shown at the start of the interview
 */
export const initialQuestionKeys = [
  'tell-me-about-yourself',
  'technical-challenge',
  'why-hire-you',
  'what-got-you-into-programming',
];

/**
 * Get a question node by its key
 */
export function getQuestionNode(key: string): QuestionNode | null {
  return conversationTree[key] || null;
}

/**
 * Find a question key by matching the question text (case-insensitive)
 */
export function findQuestionKey(questionText: string): string | null {
  const normalized = questionText.trim().toLowerCase();

  for (const [key, node] of Object.entries(conversationTree)) {
    if (node.question.toLowerCase() === normalized) {
      return key;
    }
  }

  return null;
}

/**
 * Get the answer for a question (by text, case-insensitive)
 * Returns null if not found (falls back to AI)
 */
export function getPrewrittenAnswer(questionText: string): string | null {
  const key = findQuestionKey(questionText);
  if (key) {
    return conversationTree[key].answer;
  }
  return null;
}

/**
 * Get follow-up questions for a given question (by text)
 * Returns the actual question strings, not keys
 */
export function getFollowUpQuestions(questionText: string): string[] {
  const key = findQuestionKey(questionText);
  if (!key) return [];

  const node = conversationTree[key];
  return node.followUps
    .map((followUpKey) => conversationTree[followUpKey]?.question)
    .filter(Boolean) as string[];
}

/**
 * Get initial questions as strings
 */
export function getInitialQuestions(): string[] {
  return initialQuestionKeys
    .map((key) => conversationTree[key]?.question)
    .filter(Boolean) as string[];
}
