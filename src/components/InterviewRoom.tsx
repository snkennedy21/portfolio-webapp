'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SuggestedQuestions from './SuggestedQuestions';
import QuickLinks from './QuickLinks';

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

export default function InterviewRoom() {
  const [input, setInput] = useState('');
  const [currentQuestions, setCurrentQuestions] = useState(initialQuestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    id: 'interview-chat',
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    onFinish: () => {
      // Rotate through follow-up questions after each response
      const categories = Object.keys(followUpQuestions);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setCurrentQuestions(followUpQuestions[randomCategory]);
    },
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleQuestionSelect = (question: string) => {
    if (isLoading) return;
    sendMessage({ text: question });
  };

  const getMessageContent = (message: (typeof messages)[0]) => {
    if (!message.parts || message.parts.length === 0) {
      return '';
    }

    return message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map((part) => part.text)
      .join('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#fafaf9]">
      {/* Header */}
      <header className="p-6 border-b border-[#e7e5e4] bg-white">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <img
            src="/profile-picture.png"
            alt="Sean Kennedy"
            className="w-16 h-16 rounded-full object-cover border border-[#e7e5e4]"
          />
          <div>
            <h1 className="text-xl font-semibold text-[#18181b]">Sean Kennedy</h1>
            <p className="text-[#71717a]">Full-Stack Developer</p>
            <p className="text-sm text-[#22d3ee]">Ready to answer your questions</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="space-y-6">
              <p className="text-[#71717a] text-center">What would you like to ask?</p>
              <SuggestedQuestions
                questions={currentQuestions}
                onSelect={handleQuestionSelect}
                disabled={isLoading}
              />
            </div>
          )}

          {messages.map((message) => (
            <Message
              key={message.id}
              role={message.role as 'user' | 'assistant'}
              content={getMessageContent(message)}
            />
          ))}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#e7e5e4] rounded-2xl px-4 py-3">
                <p className="text-xs text-[#8b5cf6] mb-1 font-medium">Sean</p>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#71717a] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#71717a] rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 bg-[#71717a] rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}

          {messages.length > 0 && !isLoading && (
            <div className="pt-4 space-y-3">
              <p className="text-sm text-[#71717a]">Follow-up questions:</p>
              <SuggestedQuestions
                questions={currentQuestions}
                onSelect={handleQuestionSelect}
                disabled={isLoading}
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#e7e5e4] bg-white p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Or ask your own question..."
                className="flex-1 px-4 py-3 rounded-lg border border-[#e7e5e4] bg-white text-[#18181b] placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] text-white font-medium hover:from-[#06b6d4] hover:to-[#7c3aed] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                Ask
              </button>
            </div>
          </form>

          <QuickLinks />
        </div>
      </div>
    </div>
  );
}
