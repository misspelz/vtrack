"use client";

import { useState, useCallback, useEffect } from "react";
import StatCard from "@/components/StatCard";
import VUMeter from "@/components/VUMeter";
import TranscriptPanel from "@/components/TranscriptPanel";
import RecordingControls from "@/components/RecordingControls";
import { useVTrack } from "@/hooks/useVTrack";
import { formatTime } from "@/lib/utils";
import SessionTimeline from "@/components/SessionTimeLine";

export default function VTrackPage() {
  const [isDark, setIsDark] = useState(true);
  const [toast, setToast] = useState(false);

  // Apply/remove "dark" class on <html> — this is where Tailwind v4 looks
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const {
    isRecording,
    transcript,
    wordCount,
    totalTime,
    activeTime,
    wpm,
    vuLevels,
    zone,
    startRecording,
    stopRecording,
    resetSession,
    setTranscript,
  } = useVTrack();

  const handleCopy = useCallback(() => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }, [transcript]);

  const wpmColor =
    zone.cls === "ideal"
      ? "green"
      : zone.cls === "slow"
      ? "red"
      : zone.cls === "fast"
      ? "amber"
      : "default";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 flex flex-col items-center px-4 py-6 pb-10 relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(245,158,11,0.06) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(245,158,11,0.04) 40px)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-3">
        {/* ── Header ── */}
        <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-2">
          <div>
            <p className="text-[9px] tracking-[3px] text-zinc-400 dark:text-zinc-500 uppercase font-mono mb-1">
              Voice Performance Monitor
            </p>
            <h1 className="font-display font-black text-[42px] leading-none text-zinc-900 dark:text-zinc-100 tracking-tight">
              V<span className="text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]">TRACK</span>
            </h1>
          </div>
          <button
            onClick={() => setIsDark((d) => !d)}
            className="
              border border-zinc-300 dark:border-zinc-700
              text-zinc-400 dark:text-zinc-500
              font-mono text-[10px] tracking-[2px] uppercase px-3 py-1.5
              hover:border-amber-500 hover:text-amber-500
              transition-colors duration-200
            "
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            label="Words / Min"
            value={wpm}
            isActive={isRecording}
            valueColor={wpmColor as "default" | "amber" | "green" | "red"}
            badge={{ label: zone.label, cls: zone.cls }}
          />
          <StatCard
            label="Active Time"
            value={formatTime(activeTime)}
            unit="mm:ss speaking"
            isActive={isRecording}
            valueColor="amber"
          />
          <StatCard
            label="Total Words"
            value={wordCount}
            unit="words captured"
            isActive={isRecording}
          />
        </div>

        {/* ── VU Meter ── */}
        <VUMeter levels={vuLevels} isLive={isRecording} />

        {/* ── Timeline ── */}
        <SessionTimeline totalTime={totalTime} activeTime={activeTime} />

        {/* ── Status ── */}
        <div className="flex items-center gap-2.5">
          <div
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${isRecording
                ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse"
                : "bg-zinc-400 dark:bg-zinc-600"
              }
            `}
          />
          <span className="text-[10px] tracking-[3px] text-zinc-400 dark:text-zinc-500 uppercase font-mono">
            {isRecording ? "Recording in progress" : "Ready to record"}
          </span>
        </div>

        {/* ── Controls ── */}
        <RecordingControls
          isRecording={isRecording}
          onStart={startRecording}
          onStop={stopRecording}
          onReset={resetSession}
        />

        {/* ── Transcript ── */}
        <TranscriptPanel
          transcript={transcript}
          isRecording={isRecording}
          onCopy={handleCopy}
          onClear={() => setTranscript("")}
        />
      </div>

      {/* ── Toast ── */}
      <div
        className={`
          fixed bottom-8 left-1/2 -translate-x-1/2
          bg-amber-400 text-zinc-900 font-mono text-[11px]
          tracking-[3px] uppercase px-6 py-2.5
          pointer-events-none z-50
          transition-all duration-300
          ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        Copied to clipboard
      </div>
    </div>
  );
}