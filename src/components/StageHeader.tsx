import { type ReactNode } from "react";
import { Scale } from "lucide-react";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  icon?: ReactNode;
}

export function StageHeader({ eyebrow, title, subtitle, children, icon }: Props) {
  return (
    <div className="mb-8 animate-fade-up">
      {eyebrow && (
        <div className="section-eyebrow mb-3 flex items-center gap-2">
          {icon ?? <Scale className="h-3.5 w-3.5" />}
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400 text-pretty sm:text-lg">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
