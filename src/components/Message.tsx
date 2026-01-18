interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function Message({ role, content }: MessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[#f0f9ff] text-[#18181b]'
            : 'bg-white text-[#18181b] border border-[#e7e5e4]'
        }`}
      >
        {isUser && (
          <p className="text-xs text-[#71717a] mb-1 font-medium">You</p>
        )}
        {!isUser && (
          <p className="text-xs text-[#8b5cf6] mb-1 font-medium">Sean</p>
        )}
        <p className="whitespace-pre-wrap text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
