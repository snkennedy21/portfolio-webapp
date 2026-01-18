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
import InterviewComplete from '@/components/InterviewComplete';
import {
  getPrewrittenAnswer,
  getFollowUpQuestions,
  getInitialQuestions,
} from '@/lib/interview-qa';

type AppState = 'landing' | 'interview';
type ContentState = 'questions' | 'response' | 'complete';
type ResponseMode = 'graph' | 'ai';

interface QAPair {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

const TOTAL_QUESTIONS = 5;

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [contentState, setContentState] = useState<ContentState>('questions');
  const [history, setHistory] = useState<QAPair[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string>('');
  const [activeAnswer, setActiveAnswer] = useState<string>('');
  const [currentFollowUps, setCurrentFollowUps] = useState<string[]>(getInitialQuestions());
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [responseKey, setResponseKey] = useState(0);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [responseMode, setResponseMode] = useState<ResponseMode>('graph');

  const { messages, sendMessage, status } = useChat({
    id: 'interview-chat',
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    onFinish: () => {
      // For AI responses, use generic follow-ups since we don't have contextual ones
      setCurrentFollowUps(getInitialQuestions());
    },
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  const isStreaming = isUsingAI && (status === 'submitted' || status === 'streaming');

  const getMessageContent = useCallback((message: (typeof messages)[0]) => {
    if (!message.parts || message.parts.length === 0) {
      return '';
    }
    return message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map((part) => part.text)
      .join('');
  }, []);

  // Watch for new assistant messages and update activeAnswer (only when using AI)
  useEffect(() => {
    if (isUsingAI && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const content = getMessageContent(lastMessage);
        setActiveAnswer(content);
      }
    }
  }, [messages, getMessageContent, isUsingAI]);

  // Save to history when response is complete
  useEffect(() => {
    if (contentState === 'response' && !isStreaming && activeAnswer && activeQuestion) {
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
  }, [contentState, isStreaming, activeAnswer, activeQuestion, history]);

  const handleBeginInterview = useCallback(() => {
    setAppState('interview');
  }, []);

  const handleAskQuestion = useCallback(
    (question: string) => {
      setActiveQuestion(question);
      setActiveAnswer('');
      setResponseKey((prev) => prev + 1); // Increment key to trigger animation
      setContentState('response');

      // In AI mode, always use AI
      if (responseMode === 'ai') {
        setIsUsingAI(true);
        sendMessage({ text: question });
        return;
      }

      // In Graph mode, check for pre-written answer first
      const prewrittenAnswer = getPrewrittenAnswer(question);
      if (prewrittenAnswer) {
        // Use pre-written answer (no AI)
        setIsUsingAI(false);
        setActiveAnswer(prewrittenAnswer);
        // Get contextual follow-ups based on this question
        const followUps = getFollowUpQuestions(question);
        setCurrentFollowUps(followUps.length > 0 ? followUps : getInitialQuestions());
      } else {
        // Fall back to AI for custom questions not in the graph
        setIsUsingAI(true);
        sendMessage({ text: question });
      }
    },
    [sendMessage, responseMode]
  );

  const handleFollowUp = useCallback(
    (question: string) => {
      handleAskQuestion(question);
    },
    [handleAskQuestion]
  );

  const handleAskDifferent = useCallback(() => {
    setContentState('questions');
  }, []);

  const handleFinish = useCallback(() => {
    setContentState('complete');
  }, []);

  const handleRestart = useCallback(() => {
    setHistory([]);
    setActiveQuestion('');
    setActiveAnswer('');
    setCurrentFollowUps(getInitialQuestions());
    setContentState('questions');
    setResponseKey(0);
  }, []);

  const handleOpenHistory = useCallback(() => {
    setIsHistoryOpen(true);
  }, []);

  const handleCloseHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  const handleToggleMode = useCallback(() => {
    setResponseMode((prev) => (prev === 'graph' ? 'ai' : 'graph'));
  }, []);

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
              questionCount={history.length}
              totalQuestions={TOTAL_QUESTIONS}
              onOpenHistory={handleOpenHistory}
              hasHistory={history.length > 0}
              hideInput={contentState === 'complete'}
              responseMode={responseMode}
              onToggleMode={handleToggleMode}
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
                    question={activeQuestion}
                    answer={activeAnswer}
                    isStreaming={isStreaming}
                    followUpQuestions={currentFollowUps}
                    onFollowUp={handleFollowUp}
                    onAskDifferent={handleAskDifferent}
                    isLastQuestion={history.length >= TOTAL_QUESTIONS}
                    onFinish={handleFinish}
                  />
                )}

                {contentState === 'complete' && (
                  <InterviewComplete
                    key="complete"
                    totalQuestions={TOTAL_QUESTIONS}
                    history={history}
                    onRestart={handleRestart}
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
      />
    </main>
  );
}
