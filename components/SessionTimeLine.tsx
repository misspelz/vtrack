import { formatTime } from "@/lib/utils";

interface SessionTimelineProps {
  totalTime: number;
  activeTime: number;
  maxSeconds?: number;
}

export default function SessionTimeline({ totalTime, activeTime, maxSeconds = 600 }: SessionTimelineProps) {
  const activeRatio = totalTime > 0 ? Math.round((activeTime / totalTime) * 100) : 0;
  const progressPct = Math.min(100, (totalTime / maxSeconds) * 100);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 transition-colors duration-300">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[9px] tracking-[3px] text-zinc-400 dark:text-zinc-500 uppercase font-mono">Session Duration</span>
        <span className="text-[9px] tracking-[2px] text-zinc-400 dark:text-zinc-500 font-mono">
          Active {activeRatio}% · Total {formatTime(totalTime)}
        </span>
      </div>
      <div className="h-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 relative overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-amber-700 to-amber-400 relative transition-[width] duration-500"
          style={{ width: `${progressPct}%` }}
        >
          {progressPct > 0 && <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white shadow-[0_0_6px_white]" />}
        </div>
      </div>
    </div>
  );
}