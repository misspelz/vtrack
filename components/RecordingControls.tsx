"use client";

interface RecordingControlsProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export default function RecordingControls({
  isRecording,
  onStart,
  onStop,
  onReset,
}: RecordingControlsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 w-full">
      {!isRecording ? (
        <button
          onClick={onStart}
          className="flex-1 bg-amber-400 text-zinc-900 border border-amber-400 font-display font-bold text-base tracking-[3px] uppercase py-4 px-8 hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-150 active:scale-[0.98]"
        >
          ▶ Start Recording
        </button>
      ) : (
        <button
          onClick={onStop}
          className="flex-1 bg-transparent text-red-500 dark:text-red-400 border border-red-400 dark:border-red-500 font-display font-bold text-base tracking-[3px] uppercase py-4 px-8 hover:bg-red-50 dark:hover:bg-red-950 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-150 active:scale-[0.98]"
        >
          ■ Stop Recording
        </button>
      )}
      <button
        onClick={onReset}
        className="bg-transparent text-zinc-400 dark:text-zinc-500 border border-zinc-300 dark:border-zinc-700 font-display font-bold text-base tracking-[3px] uppercase py-4 px-6 hover:border-zinc-500 hover:text-zinc-700 dark:hover:border-zinc-400 dark:hover:text-zinc-300 transition-all duration-150 active:scale-[0.98]"
      >
        ↺ Reset
      </button>
    </div>
  );
}
