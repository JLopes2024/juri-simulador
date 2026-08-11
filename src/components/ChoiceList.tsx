import { type ReactNode } from "react";

interface Option {
  id: string;
  label: string;
}

interface Props {
  options: Option[];
  value?: string;
  onSelect: (id: string) => void;
  columns?: 1 | 2;
  helper?: ReactNode;
}

export function ChoiceList({ options, value, onSelect, columns = 1, helper }: Props) {
  return (
    <div className="space-y-3">
      <div
        className={
          columns === 2
            ? "grid gap-3 sm:grid-cols-2"
            : "grid gap-3 grid-cols-1"
        }
      >
        {options.map((opt, idx) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`group option-btn animate-fade-up ${selected ? "option-btn-selected" : ""}`}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                  selected
                    ? "border-gold-500 bg-gold-500 text-ink-950"
                    : "border-white/20 text-slate-400 group-hover:border-gold-500/50"
                }`}
              >
                {opt.id}
              </span>
              <span className="text-sm leading-relaxed text-slate-200 text-pretty">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      {helper && <div className="pt-1 text-sm text-slate-500">{helper}</div>}
    </div>
  );
}
