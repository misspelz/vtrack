import { WpmZone } from "@/types/vtrack";


export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export const getWpmZone = (wpm: number): WpmZone => {
  if (wpm === 0) return { label: "IDLE", cls: "idle" };
  if (wpm < 100) return { label: "TOO SLOW", cls: "slow" };
  if (wpm <= 160) return { label: "IDEAL RANGE", cls: "ideal" };
  return { label: "TOO FAST", cls: "fast" };
};

export const countWords = (text: string): number =>
  text.trim().split(/\s+/).filter(Boolean).length;