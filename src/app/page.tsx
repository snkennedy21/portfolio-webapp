'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import LandingScreen from '@/components/LandingScreen';
import InterviewShell from '@/components/InterviewShell';
import QuestionContent from '@/components/QuestionContent';
import ResponseContent from '@/components/ResponseContent';
import HistoryMenu from '@/components/HistoryMenu';
import TransitionWrapper from '@/components/TransitionWrapper';

type AppState = 'landing' | 'interview';
type ContentState = 'questions' | 'response';

interface QAPair {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

const initialQuestions = [
  'Tell me about yourself',
  'Walk me through a technical challenge you solved',
  "What's your experience with React?",
  'Why should we hire you?',
];

const followUpQuestions: Record<string, string[]> = {
  default: [
    'What got you into programming?',
    'What are you most proud of building?',
    "What are you looking for in your next role?",
  ],
  technical: [
    'Can you tell me more about your experience with TypeScript?',
    'How do you approach debugging complex issues?',
    'What DevOps tools have you worked with?',
  ],
  background: [
    'What was the transition from teaching to software like?',
    'How does your philosophy background help you as a developer?',
    'What keeps you motivated?',
  ],
};

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [contentState, setContentState] = useState<ContentState>('questions');
  const [history, setHistory] = useState<QAPair[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string>('');
  const [activeAnswer, setActiveAnswer] = useState<string>('');
  const [currentFollowUps, setCurrentFollowUps] = useState<string[]>(initialQuestions);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [viewingHistoryItem, setViewingHistoryItem] = useState<QAPair | null>(null);
  const [responseKey, setResponseKey] = useState(0);

  const { messages, sendMessage, status } = useChat({
    id: 'interview-chat',
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    onFinish: () => {
      const categories = Object.keys(followUpQuestions);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setCurrentFollowUps(followUpQuestions[randomCategory]);
    },
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  const isStreaming = status === 'submitted' || status === 'streaming';

  const getMessageContent = useCallback((message: (typeof messages)[0]) => {
    if (!message.parts || message.parts.length === 0) {
      return '';
    }
    return message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map((part) => part.text)
      .join('');
  }, []);

  // Watch for new assistant messages and update activeAnswer
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const content = getMessageContent(lastMessage);
        setActiveAnswer(content);
      }
    }
  }, [messages, getMessageContent]);

  // Save to history when response is complete
  useEffect(() => {
    if (contentState === 'response' && !isStreaming && activeAnswer && activeQuestion && !viewingHistoryItem) {
      const exists = history.some(
        (item) => item.question === activeQuestion && item.answer === activeAnswer
      );
      if (!exists) {
        setHistory((prev) => [
          ...prev,
          {
            id: `qa-${Date.now()}`,
            question: activeQuestion,
            answer: activeAnswer,
            timestamp: new Date(),
          },
        ]);
      }
    }
  }, [contentState, isStreaming, activeAnswer, activeQuestion, history, viewingHistoryItem]);

  const handleBeginInterview = useCallback(() => {
    setAppState('interview');
  }, []);

  const handleAskQuestion = useCallback(
    (question: string) => {
      setActiveQuestion(question);
      setActiveAnswer('');
      setViewingHistoryItem(null);
      setResponseKey((prev) => prev + 1); // Increment key to trigger animation
      setContentState('response');
      sendMessage({ text: question });
    },
    [sendMessage]
  );

  const handleFollowUp = useCallback(
    (question: string) => {
      handleAskQuestion(question);
    },
    [handleAskQuestion]
  );

  const handleAskDifferent = useCallback(() => {
    setViewingHistoryItem(null);
    setContentState('questions');
  }, []);

  const handleOpenHistory = useCallback(() => {
    setIsHistoryOpen(true);
  }, []);

  const handleCloseHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  const handleSelectHistoryItem = useCallback((id: string) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      setViewingHistoryItem(item);
      setActiveQuestion(item.question);
      setActiveAnswer(item.answer);
      setContentState('response');
    }
  }, [history]);

  const displayAnswer = viewingHistoryItem ? viewingHistoryItem.answer : activeAnswer;
  const displayQuestion = viewingHistoryItem ? viewingHistoryItem.question : activeQuestion;
  const isViewingHistory = viewingHistoryItem !== null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <LandingScreen
            key="landing"
            onBegin={handleBeginInterview}
            direction="forward"
          />
        )}

        {appState === 'interview' && (
          <TransitionWrapper key="interview" direction="forward" className="z-10">
            <InterviewShell
              onSubmitQuestion={handleAskQuestion}
              isLoading={isStreaming}
            >
              <AnimatePresence mode="wait">
                {contentState === 'questions' && (
                  <QuestionContent
                    key="questions"
                    suggestedQuestions={currentFollowUps}
                    onSelectQuestion={handleAskQuestion}
                    isLoading={isStreaming}
                  />
                )}

                {contentState === 'response' && (
                  <ResponseContent
                    key={`response-${responseKey}`}
                    question={displayQuestion}
                    answer={displayAnswer}
                    isStreaming={isStreaming && !isViewingHistory}
                    followUpQuestions={currentFollowUps}
                    onFollowUp={handleFollowUp}
                    onAskDifferent={handleAskDifferent}
                  />
                )}
              </AnimatePresence>
            </InterviewShell>
          </TransitionWrapper>
        )}
      </AnimatePresence>

      <HistoryMenu
        isOpen={isHistoryOpen}
        onClose={handleCloseHistory}
        history={history}
        onSelectItem={handleSelectHistoryItem}
      />
    </main>
  );
}
