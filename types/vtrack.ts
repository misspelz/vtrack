export type Theme = "dark" | "light";

export type WpmZoneCls = "idle" | "slow" | "ideal" | "fast";

export interface WpmZone {
  label: string;
  cls: WpmZoneCls;
}

export interface SessionStats {
  wordCount: number;
  totalTime: number;
  activeTime: number;
  wpm: number;
}