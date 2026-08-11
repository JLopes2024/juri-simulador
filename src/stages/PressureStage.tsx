import { Users, Scale } from "lucide-react";
import { DECISION_PRESSURE } from "../data/caseContent";
import { DecisionStage } from "./DecisionStage";

interface Props {
  value?: string;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

const JURORS = [
  { count: 3, label: "acreditam que houve assédio", color: "crimson", pct: 50 },
  { count: 2, label: "acreditam que foi apenas brincadeira", color: "gold", pct: 33 },
  { count: 1, label: "considera que faltam informações", color: "teal", pct: 17 },
];

const COLOR_MAP: Record<string, { bar: string; dot: string; text: string }> = {
  crimson: { bar: "bg-crimson-500", dot: "bg-crimson-400", text: "text-crimson-400" },
  gold: { bar: "bg-gold-500", dot: "bg-gold-400", text: "text-gold-400" },
  teal: { bar: "bg-teal-500", dot: "bg-teal-400", text: "text-teal-400" },
};

export function PressureStage({ value, onSelect, onContinue }: Props) {
  return (
    <DecisionStage
      prompt={DECISION_PRESSURE}
      value={value}
      onSelect={onSelect}
      onContinue={onContinue}
      continueLabel="REGISTRAR E CONTINUAR"
      eyebrow="PRESSÃO DO JÚRI"
      icon={<Users className="h-3.5 w-3.5" />}
    >
      <div className="mb-6 court-card animate-fade-up p-6">
        <p className="mb-5 text-sm leading-relaxed text-slate-300">
          O júri se divide. Seis jurados, três interpretações diferentes:
        </p>
        <div className="space-y-4">
          {JURORS.map((j, idx) => {
            const c = COLOR_MAP[j.color];
            return (
              <div
                key={idx}
                className="animate-fade-up"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="flex items-center gap-2 text-sm text-slate-200">
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    <span className="font-display font-bold text-white">
                      {j.count} {j.count === 1 ? "jurado" : "jurados"}
                    </span>
                    <span className="text-slate-400">{j.label}</span>
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className={`h-full rounded-full ${c.bar} transition-all duration-700`}
                    style={{ width: `${j.pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm text-slate-400">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
          <span>
            Divergência não é problema — é parte do processo. O desafio é
            distinguir opinião de evidência e respeitar quem discorda.
          </span>
        </div>
      </div>
    </DecisionStage>
  );
}
