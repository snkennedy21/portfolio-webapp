interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export default function SuggestedQuestions({
  questions,
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="space-y-2">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="w-full text-left px-4 py-3 rounded-lg border border-[#e7e5e4] bg-white hover:bg-[#f5f5f4] hover:border-[#0d9488] text-[#18181b] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-[#71717a] mr-2">&ldquo;</span>
          {question}
          <span className="text-[#71717a] ml-1">&rdquo;</span>
        </button>
      ))}
    </div>
  );
}
