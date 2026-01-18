# Profile Website - "The Interview" Concept

## Chosen Direction

**Concept:** The Interview
**Risk Level:** All in
**Core idea:** Your portfolio IS a job interview, and the visitor is the interviewer.

---

## The Experience

### Opening Scene

The visitor lands on a minimal, cinematic screen:

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                                                                     │
│                                                                     │
│                                                                     │
│                         THE INTERVIEW                               │
│                                                                     │
│                                                                     │
│                                                                     │
│            You're about to interview Sean Kennedy.                  │
│                                                                     │
│                                                                     │
│                        [ Begin Interview ]                          │
│                                                                     │
│                                                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

Minimal. Intriguing. One button.

### The Interview Room

After clicking "Begin Interview", the screen transitions to:

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│     ┌─────────┐                                                     │
│     │  Photo  │   Sean Kennedy                                      │
│     │   or    │   Full-Stack Developer                              │
│     │ Avatar  │   Ready to answer your questions                    │
│     └─────────┘                                                     │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│     What would you like to ask?                                     │
│                                                                     │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │                                                         │     │
│     │  "Tell me about yourself"                               │     │
│     │                                                         │     │
│     │  "Walk me through a technical challenge you solved"     │     │
│     │                                                         │     │
│     │  "What's your experience with [technology]?"            │     │
│     │                                                         │     │
│     │  "Why should we hire you?"                              │     │
│     │                                                         │     │
│     │  ───────────────────────────────────────────────────    │     │
│     │  Or ask your own question...                            │     │
│     │                                                         │     │
│     └─────────────────────────────────────────────────────────┘     │
│                                                                     │
│                                                                     │
│     ┌──────────┐  ┌──────────┐  ┌──────────┐                       │
│     │  Resume  │  │  GitHub  │  │ LinkedIn │                       │
│     └──────────┘  └──────────┘  └──────────┘                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### The Conversation Flow

When they ask a question (click a suggested one or type their own):

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│     ┌─────────┐   Sean Kennedy                                      │
│     │  Photo  │   Full-Stack Developer                              │
│     └─────────┘                                                     │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│     You: "Tell me about yourself"                                   │
│                                                                     │
│     Sean: I'm a full-stack developer who loves building             │
│     things end-to-end. I started coding because...                  │
│     [streaming response]                                            │
│                                                                     │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│     Follow-up questions:                                            │
│                                                                     │
│     │  "What got you into programming?"                             │
│     │  "What are you most proud of building?"                       │
│     │  "What are you looking for in your next role?"                │
│                                                                     │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │  Or ask something else...                               │     │
│     └─────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key UX detail:** After each response, suggest 2-3 natural follow-up questions. This keeps the conversation flowing without forcing them to think of questions.

---

## What Makes This Different

1. **Framing is everything** - Same AI chat, completely different perception
2. **Visitor has control** - They're not being sold to, they're evaluating
3. **Maps to reality** - This IS what recruiters want to do
4. **Conversation feels natural** - It's literally an interview
5. **No dead ends** - Always have follow-up suggestions
6. **Memorable** - "I interviewed his website" is a story they'll tell

---

## The AI's Personality

The AI should respond as YOU - first person, authentic voice.

**System prompt direction:**
- Confident but not arrogant
- Specific and concrete (not generic platitudes)
- Shows personality and humor where appropriate
- Admits when you don't know something
- Can discuss technical topics in depth
- Knows your actual background, projects, and experience

**Example response style:**

Bad (generic):
> "I'm a passionate full-stack developer with experience in modern web technologies."

Good (specific, human):
> "I've been coding for about 8 years. Started with Python scripts to automate boring stuff at my first job, then fell down the web development rabbit hole. These days I mostly work with React and Node, but I genuinely enjoy jumping between frontend, backend, and infrastructure - whatever the problem needs."

---

## Edge Cases to Handle

1. **Hostile questions** - AI should handle gracefully, deflect inappropriate ones
2. **Off-topic questions** - Gently redirect: "That's outside my wheelhouse, but happy to talk about..."
3. **Technical deep-dives** - AI should be able to go deep on technologies you know
4. **"Can you prove it?"** - Link to GitHub, specific projects, code examples
5. **"Are you actually an AI?"** - Be honest: "Yes, I'm an AI trained on Sean's background. But everything I tell you is accurate to his experience."

---

## Visual Design

**Aesthetic:** Clean, professional, warm. Feels like a real interview - approachable, not intimidating.

**Palette:**
```css
--bg-primary: #fafaf9       /* Warm off-white */
--bg-secondary: #f5f5f4     /* Slightly darker for cards/sections */
--text-primary: #18181b     /* Near-black */
--text-secondary: #71717a   /* Muted gray */
--accent: #0d9488           /* Warm teal - buttons, links */
--accent-hover: #0f766e     /* Darker teal */
--border: #e7e5e4           /* Subtle warm border */
--interviewer-bg: #f0fdf4   /* Very light green for "You" messages */
--interviewee-bg: #ffffff   /* White for Sean's responses */
```

**Typography:**
- Headlines: Geist Sans, medium weight, large
- Body: 18px minimum for readability
- Conversation: Clear visual distinction between interviewer ("You") and interviewee (Sean)

**Layout:**
- Centered, generous whitespace
- Max-width container (~800px for conversation)
- Landing page: Full viewport, centered content
- Interview room: Clean header, scrollable conversation, fixed input at bottom

---

## Components to Build

| Component | Purpose |
|-----------|---------|
| `LandingScreen` | "THE INTERVIEW" + Begin button |
| `InterviewRoom` | Main conversation interface |
| `Message` | Single message bubble (you vs sean) |
| `SuggestedQuestions` | Clickable question buttons |
| `InputField` | Custom question input |
| `QuickLinks` | Resume, GitHub, LinkedIn buttons |
| `Transition` | Smooth animation between landing and room |

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/app/page.tsx` | Rewrite | Landing screen + transition logic |
| `src/app/globals.css` | Modify | New color scheme, typography |
| `src/components/LandingScreen.tsx` | Create | Opening cinematic |
| `src/components/InterviewRoom.tsx` | Create | Main interview UI |
| `src/components/Message.tsx` | Create | Chat message component |
| `src/components/SuggestedQuestions.tsx` | Create | Question buttons |
| `src/components/QuickLinks.tsx` | Create | Resume/GitHub/LinkedIn |
| `src/app/api/chat/route.ts` | Modify | Update system prompt |
| `src/lib/prompts.ts` | Create | System prompt and question bank |

---

## Implementation Phases

### Phase 1: Core Experience
1. Landing screen with transition
2. Interview room layout
3. Basic chat integration (reuse existing)
4. Suggested questions (static first)

### Phase 2: Polish the Conversation
5. Dynamic follow-up questions based on context
6. Better message styling
7. Typing indicator
8. Smooth scroll behavior

### Phase 3: Content & AI
9. Write comprehensive system prompt with your background
10. Create question bank with good follow-ups
11. Test edge cases
12. Refine AI responses

### Phase 4: Visual Polish
13. Transitions and animations (Framer Motion)
14. Mobile optimization
15. Quick links styling
16. Final typography and spacing

---

## Content Needed From You

To make the AI actually useful, I need:

1. **Your story** - How you got into coding, your journey
2. **Work history** - Companies, roles, what you actually did (not just titles)
3. **Technical skills** - What you're strong at, what you're learning
4. **Projects** - What you've built, challenges you solved, outcomes
5. **What you want** - Type of role, company culture, what excites you
6. **Your voice** - How do you actually talk? Casual? Precise? Humorous?

---

## Success Metrics

- Visitor stays past 30 seconds
- They ask at least 3 questions
- They click through to GitHub/LinkedIn/Resume
- They remember "that interview website"
