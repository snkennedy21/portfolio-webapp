/**
 * Pre-written Q&A pairs for the interview.
 * Suggested questions use these answers directly (no AI).
 * Custom typed questions fall back to AI generation.
 */

export const prewrittenAnswers: Record<string, string> = {
  // Initial questions
  'Tell me about yourself':
    "I'm a full-stack developer who came to software from teaching PE. Started coding in 2020 just for fun, fell in love with building things, and made it my career. I have a philosophy degree from Colgate which probably explains why I like solving problems that don't have obvious answers.",

  'Walk me through a technical challenge you solved':
    "At Data Machines, I built a custom SQL migration tool for zero-downtime updates. Our production systems couldn't go offline, so I designed a way to apply schema changes incrementally while the app stayed live. It involved careful sequencing and rollback logic.",

  "What's your experience with React?":
    "React's been my main frontend tool for a few years now. I've maintained shared component libraries, led a Redux to Redux Toolkit migration that cut our boilerplate in half, and shipped features across multiple production apps. It's where I feel most at home.",

  'Why should we hire you?':
    "I ship fast and I care about the details. At my current role I delivered a full feature within 6 weeks of joining, and I regularly knock out P0 bugs within 24-48 hours. I also like finding ways to make the whole team more effective, not just my own work.",

  // Default follow-ups
  'What got you into programming?':
    "Honestly, I just started tinkering in 2020 because I was curious. Built a few small projects, realized I loved the problem-solving aspect, and it snowballed from there. The transition from teaching wasn't planned - I just followed what excited me.",

  'What are you most proud of building?':
    "The clinical language standardization feature I shipped at Black Cape. It helps medical professionals map their terminology to FDA requirements. Shipped it in 6 weeks and it's actually being used to help real healthcare workflows.",

  "What are you looking for in your next role?":
    "Growth opportunities and the chance to lead. I like being part of an organization, spotting pain points, and building solutions that make everyone's work easier - devs and non-devs alike.",

  // Technical follow-ups
  'Can you tell me more about your experience with TypeScript?':
    "I use TypeScript daily - it's my default for any new project. The type safety catches so many bugs before they hit production. I've worked with it across React frontends and Node/Express backends.",

  'How do you approach debugging complex issues?':
    "I start by reproducing the issue reliably, then narrow down the scope. Logs, breakpoints, and stepping through the code path. I also like to check recent changes in that area - often the culprit is something new.",

  'What DevOps tools have you worked with?':
    "Docker and Kubernetes for containerization, Ansible for automation - I used it to install monitoring software across 50+ servers. CI/CD pipelines, and deploying to air-gapped environments which has its own challenges.",

  // Background follow-ups
  'What was the transition from teaching to software like?':
    "It was a leap, but teaching gave me skills that transferred well - explaining complex things simply, patience with debugging, and understanding that everyone learns differently. The hardest part was just building enough projects to be credible.",

  'How does your philosophy background help you as a developer?':
    "Philosophy taught me to sit with ambiguity and break down complex arguments into smaller pieces. In code, that's basically debugging and system design. I'm comfortable when there's no obvious right answer.",

  'What keeps you motivated?':
    "Building things that actually get used. There's something satisfying about seeing code you wrote solve real problems for real people. Also, I just genuinely enjoy the puzzle-solving aspect of programming.",
};

/**
 * Check if a question has a pre-written answer.
 * Uses case-insensitive, trimmed matching.
 */
export function getPrewrittenAnswer(question: string): string | null {
  const normalizedQuestion = question.trim();

  // Try exact match first
  if (prewrittenAnswers[normalizedQuestion]) {
    return prewrittenAnswers[normalizedQuestion];
  }

  // Try case-insensitive match
  const lowerQuestion = normalizedQuestion.toLowerCase();
  for (const [key, value] of Object.entries(prewrittenAnswers)) {
    if (key.toLowerCase() === lowerQuestion) {
      return value;
    }
  }

  return null;
}
