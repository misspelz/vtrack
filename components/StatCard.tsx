import type { WpmZoneCls } from "@/types/vtrack";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  isActive?: boolean;
  valueColor?: "default" | "amber" | "green" | "red";
  badge?: { label: string; cls: WpmZoneCls };
}

const valueColorMap: Record<string, string> = {
  default: "text-zinc-900 dark:text-zinc-100",
  amber:   "text-amber-500 dark:text-amber-400",
  green:   "text-emerald-600 dark:text-emerald-400",
  red:     "text-red-600 dark:text-red-400",
};

const zoneBadgeMap: Record<WpmZoneCls, string> = {
  idle:  "border-zinc-300 text-zinc-400 dark:border-zinc-600 dark:text-zinc-500 bg-transparent",
  slow:  "border-red-400 text-red-500 bg-red-50 dark:border-red-500 dark:text-red-400 dark:bg-red-950",
  ideal: "border-emerald-400 text-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:bg-emerald-950",
  fast:  "border-amber-400 text-amber-600 bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:bg-amber-950",
};

export default function StatCard({ label, value, unit, isActive = false, valueColor = "default", badge }: StatCardProps) {
  return (
    <div className={`relative bg-white dark:bg-zinc-900 border p-5 overflow-hidden transition-colors duration-300 ${isActive ? "border-amber-400 dark:border-amber-500/60" : "border-zinc-200 dark:border-zinc-800"}`}>
      <div className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${isActive ? "w-full" : "w-0"}`} />

      <p className="text-[9px] tracking-[3px] text-zinc-400 dark:text-zinc-500 uppercase mb-2 font-mono">
        {label}
      </p>

      <p className={`font-display font-bold text-5xl leading-none tracking-tight ${valueColorMap[valueColor]}`}>
        {value}
      </p>

      {unit && <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 font-mono">{unit}</p>}

      {badge && (
        <span className={`inline-block mt-2 text-[9px] tracking-[2px] uppercase border px-2 py-0.5 font-mono ${zoneBadgeMap[badge.cls]}`}>
          {badge.label}
        </span>
      )}
    </div>
  );
}