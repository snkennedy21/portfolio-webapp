'use client';

interface LandingScreenProps {
  onBegin: () => void;
}

export default function LandingScreen({ onBegin }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafaf9] px-4">
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-[#18181b]">
          THE INTERVIEW
        </h1>

        <p className="text-lg md:text-xl text-[#71717a] max-w-md mx-auto">
          You&apos;re about to interview Sean Kennedy.
        </p>

        <button
          onClick={onBegin}
          className="mt-8 px-8 py-3 bg-[#0d9488] text-white text-lg font-medium rounded-lg hover:bg-[#0f766e] transition-colors duration-200"
        >
          Begin Interview
        </button>
      </div>
    </div>
  );
}
