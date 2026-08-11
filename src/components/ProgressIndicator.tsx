import { type ReactNode } from "react";

interface Props {
  current: number;
  total: number;
  decisionsCount: number;
  rightSlot?: ReactNode;
}

export function ProgressIndicator({ current, total, decisionsCount, rightSlot }: Props) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="flex items-center gap-4">
      <div className="progress-track flex-1">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-teal-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="hidden items-center gap-3 font-mono text-xs text-slate-400 sm:flex">
        <span className="tabular-nums">{pct}%</span>
        <span className="text-slate-600">·</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse-soft" />
          {decisionsCount} {decisionsCount === 1 ? "decisão" : "decisões"}
        </span>
      </div>
      {rightSlot}
    </div>
  );
}
