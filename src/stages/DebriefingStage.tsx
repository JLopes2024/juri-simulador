import { MessageCircle, RotateCcw, Lightbulb } from "lucide-react";
import { DEBRIEFING_QUESTIONS } from "../data/caseContent";
import { StageHeader } from "../components/StageHeader";
import { GhostButton } from "../components/Buttons";

interface Props {
  onRestart: () => void;
}

export function DebriefingStage({ onRestart }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <StageHeader
        eyebrow="Debriefing final"
        title="Para discutir em sala"
        subtitle="Estas perguntas não têm resposta certa. Usem o veredito do grupo como ponto de partida para conversar."
        icon={<MessageCircle className="h-3.5 w-3.5" />}
      />

      <div className="space-y-4">
        {DEBRIEFING_QUESTIONS.map((q, idx) => (
          <div
            key={idx}
            className="court-card animate-fade-up flex items-start gap-4 p-5"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 font-display text-sm font-bold text-gold-300">
              {idx + 1}
            </div>
            <p className="pt-1 text-base leading-relaxed text-slate-100 text-pretty">
              {q}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 animate-fade-up rounded-2xl border border-teal-500/20 bg-teal-500/[0.06] p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
          <p className="text-sm leading-relaxed text-slate-300 text-pretty">
            <span className="font-semibold text-teal-300">Lembrete:</span> o
            objetivo não era descobrir um “culpado”, mas exercitar pensamento
            crítico, empatia, percepção de limites e a diferença entre opinião,
            suspeita e conclusão baseada em evidências.
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <GhostButton onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          REINICIAR JULGAMENTO
        </GhostButton>
      </div>
    </div>
  );
}
