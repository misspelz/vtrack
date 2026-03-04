"use client";

import { useRef, useEffect } from "react";

interface TranscriptPanelProps {
  transcript: string;
  isRecording: boolean;
  onCopy: () => void;
  onClear: () => void;
}

export default function TranscriptPanel({ transcript, isRecording, onCopy, onClear }: TranscriptPanelProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [transcript]);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="flex justify-between items-center px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-[9px] tracking-[3px] text-zinc-400 dark:text-zinc-500 uppercase font-mono">Live Transcript</span>
        <div className="flex gap-2">
          <button onClick={onCopy} className="border border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 font-mono text-[9px] tracking-[2px] uppercase px-2.5 py-1 hover:border-amber-500 hover:text-amber-500 transition-colors duration-200">
            Copy
          </button>
          <button onClick={onClear} className="border border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 font-mono text-[9px] tracking-[2px] uppercase px-2.5 py-1 hover:border-zinc-500 hover:text-zinc-700 dark:hover:border-zinc-400 dark:hover:text-zinc-300 transition-colors duration-200">
            Clear
          </button>
        </div>
      </div>
      <div ref={bodyRef} className="px-5 py-5 min-h-40 max-h-60 overflow-y-auto text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 font-mono">
        {transcript ? (
          <>
            {transcript}
            {isRecording && <span className="inline-block w-2 h-3.5 bg-amber-400 ml-0.5 align-text-bottom animate-blink" />}
          </>
        ) : (
          <span className="text-zinc-400 dark:text-zinc-600 text-xs tracking-wide">
            {isRecording ? "Listening…" : "Your transcript will appear here once you start recording."}
          </span>
        )}
      </div>
    </div>
  );
}