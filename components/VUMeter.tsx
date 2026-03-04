"use client";

interface VUMeterProps {
  levels: number[];
  isLive: boolean;
}

export default function VUMeter({ levels, isLive }: VUMeterProps) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 transition-colors duration-300">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[9px] tracking-[3px] text-zinc-400 dark:text-zinc-500 uppercase font-mono">Audio Level</span>
        <span className={`text-[9px] tracking-[2px] font-mono ${isLive ? "text-red-500 dark:text-red-400" : "text-zinc-400 dark:text-zinc-600"}`}>
          {isLive ? "● LIVE" : "— OFFLINE"}
        </span>
      </div>
      <div className="flex gap-0.75 items-end h-8">
        {levels.map((level, i) => {
          const heightPx = Math.max(3, (level / 100) * 32);
          const color = level > 80 ? "bg-red-500" : level > 50 ? "bg-amber-400" : level > 5 ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700";
          return <div key={i} className={`flex-1 transition-all duration-50 ${color}`} style={{ height: `${heightPx}px` }} />;
        })}
      </div>
    </div>
  );
}