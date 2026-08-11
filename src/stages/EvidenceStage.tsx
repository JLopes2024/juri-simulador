import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Evidence, ImpactChoice } from "../data/caseContent";
import { StageHeader } from "../components/StageHeader";
import { ChoiceList } from "../components/ChoiceList";
import { NextButton } from "../components/Buttons";

interface Props {
  evidence: Evidence;
  total: number;
  value?: ImpactChoice;
  onImpact: (choice: ImpactChoice) => void;
  onNext: () => void;
}

const IMPACT_OPTIONS: { id: ImpactChoice; label: string }[] = [
  { id: "muito", label: "Sim, muda bastante" },
  { id: "parcial", label: "Sim, muda parcialmente" },
  { id: "nenhum", label: "Não muda minha opinião" },
  { id: "insuficiente", label: "Ainda não tenho informações suficientes" },
];

const KIND_LABEL: Record<Evidence["kind"], string> = {
  mensagem: "Mensagem",
  depoimento: "Depoimento",
  testemunha: "Testemunha",
  contexto: "Contexto",
};

export function EvidenceStage({ evidence, total, value, onImpact, onNext }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <StageHeader
        eyebrow={`Fase de investigação · ${evidence.index} de ${total}`}
        title={evidence.title}
        icon={<evidence.icon className="h-3.5 w-3.5" />}
      />

      <div className="court-card court-card-gold animate-scale-in overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10">
            <evidence.icon className="h-5 w-5 text-gold-400" />
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-gold-400">
              {KIND_LABEL[evidence.kind]}
            </p>
            <p className="text-sm font-semibold text-white">{evidence.source}</p>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <p className="text-lg leading-relaxed text-slate-100 text-pretty sm:text-xl">
            {evidence.body}
          </p>
          {evidence.meta && (
            <p className="mt-5 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm leading-relaxed text-slate-400">
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-teal-400">
                Nota
              </span>
              <span>{evidence.meta}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 animate-fade-up" style={{ animationDelay: "150ms" }}>
        <h3 className="mb-4 font-display text-xl font-bold text-white">
          Esta informação altera sua interpretação do caso?
        </h3>
        <ChoiceList
          options={IMPACT_OPTIONS}
          value={value}
          onSelect={(id) => onImpact(id as ImpactChoice)}
          helper={
            value ? (
              <span className="inline-flex items-center gap-1.5 text-teal-400">
                <CheckCircle2 className="h-4 w-4" />
                Escolha registrada.
              </span>
            ) : (
              "Sua escolha fica registrada e pode ser revisada a qualquer momento."
            )
          }
        />
      </div>

      <div className="mt-10 flex justify-end">
        <NextButton onClick={onNext} disabled={!value}>
          {evidence.index === total ? "AVANÇAR PARA DECISÃO" : "PRÓXIMA EVIDÊNCIA"}
          <ArrowRight className="h-4 w-4" />
        </NextButton>
      </div>
    </div>
  );
}
