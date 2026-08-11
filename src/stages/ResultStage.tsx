import {
  Gavel,
  Scale,
  FileText,
  ArrowRight,
  RotateCcw,
  History,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  DECISION_FINAL,
  DECISION_MID,
  type JustificationChoice,
  type VerdictChoice,
} from "../data/caseContent";
import type { SessionState } from "../hooks/useSession";
import { StageHeader } from "../components/StageHeader";
import { ChoiceList } from "../components/ChoiceList";
import { PrimaryButton, GhostButton } from "../components/Buttons";

interface Props {
  value?: VerdictChoice;
  onSelect: (id: VerdictChoice) => void;
  onContinue: () => void;
}

export function FinalDecisionStage({ value, onSelect, onContinue }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <StageHeader
        eyebrow="Decisão final"
        title={DECISION_FINAL.question}
        subtitle="Considere todas as evidências, contradições e decisões anteriores. Não existe resposta única — existe uma decisão fundamentada."
        icon={<Gavel className="h-3.5 w-3.5" />}
      />

      <ChoiceList
        options={DECISION_FINAL.options}
        value={value}
        onSelect={(id) => onSelect(id as VerdictChoice)}
      />

      <div className="mt-10 flex justify-end">
        <PrimaryButton onClick={onContinue} disabled={!value}>
          ESCOLHER JUSTIFICATIVA
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const VERDICT_LABELS: Record<VerdictChoice, string> = {
  A: "Não existem elementos suficientes para caracterizar o comportamento como assédio.",
  B: "Existem indícios de comportamento inadequado e a situação precisa ser formalmente investigada.",
  C: "As evidências apresentadas são suficientes para concluir que houve assédio.",
  D: "A situação deve ser ignorada porque não houve contato físico.",
};

const JUSTIFICATION_LABELS: Record<JustificationChoice, string> = {
  depoimentos: "Depoimentos",
  mensagens: "Mensagens",
  testemunhas: "Testemunhas",
  contradicoes: "Contradições",
  contexto: "Contexto da relação",
  repeticao: "Repetição do comportamento",
  desconforto: "Demonstração de desconforto",
  conjunto: "Conjunto das evidências",
};

interface ResultProps {
  state: SessionState;
  onRestart: () => void;
  onDebrief: () => void;
}

export function ResultStage({ state, onRestart, onDebrief }: ResultProps) {
  const verdict = state.finalVerdict;
  const just = state.justification;
  const midDecision = state.decisions.find((d) => d.promptId === DECISION_MID.id);
  const finalDecision = state.decisions.find((d) => d.promptId === DECISION_FINAL.id);

  // Most impactful evidence (the one the group said "muda bastante" most often, fallback to any)
  const strongImpacts = state.impacts.filter((i) => i.choice === "muito");
  const topEvidenceIndices = strongImpacts.length
    ? strongImpacts.map((i) => i.evidenceIndex)
    : state.impacts.map((i) => i.evidenceIndex);

  const shifted = state.opinionShifts.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <div className="text-center animate-scale-in">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/30 bg-gradient-to-b from-gold-500/10 to-transparent">
          <Gavel className="h-8 w-8 text-gold-400" />
        </div>
        <p className="section-eyebrow mb-3">Resultado</p>
        <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl text-balance">
          VEREDITO DO JÚRI
        </h2>
      </div>

      {/* Decision card */}
      {verdict && (
        <div className="court-card court-card-gold mt-10 animate-fade-up p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10">
              <Scale className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-gold-400">
                Decisão escolhida
              </p>
              <p className="mt-1 font-display text-xl font-bold leading-snug text-white text-pretty">
                {VERDICT_LABELS[verdict]}
              </p>
              {just && (
                <p className="mt-3 text-sm text-slate-300">
                  <span className="text-slate-500">Fundamento principal: </span>
                  <span className="font-semibold text-teal-400">
                    {JUSTIFICATION_LABELS[just]}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="mt-8 court-card animate-fade-up p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-2">
          <History className="h-4 w-4 text-teal-400" />
          <h3 className="font-display text-lg font-bold text-white">
            Sua linha do tempo
          </h3>
        </div>

        <div className="space-y-4">
          {midDecision && (
            <TimelineItem
              tag="Decisão intermediária"
              text={midDecision.label}
              accent="teal"
            />
          )}
          {state.impacts.map((imp, idx) => (
            <TimelineItem
              key={imp.evidenceId}
              tag={`Após a evidência ${imp.evidenceIndex}`}
              text={impactPhrase(imp.choice)}
              accent="gold"
              delay={idx * 50}
            />
          ))}
          {shifted &&
            state.opinionShifts.map((shift, idx) => (
              <TimelineItem
                key={`shift-${idx}`}
                tag="Mudança de interpretação"
                text={`Você pensava: “${truncate(shift.from)}” → passou a: “${truncate(shift.to)}”`}
                accent="crimson"
              />
            ))}
          {finalDecision && (
            <TimelineItem
              tag="Decisão final"
              text={finalDecision.label}
              accent="gold"
            />
          )}
          {!shifted && (
            <TimelineItem
              tag="Trajetória"
              text="Você manteve a mesma interpretação ao longo de todo o caso."
              accent="teal"
            />
          )}
        </div>
      </div>

      {/* Considered evidence */}
      {topEvidenceIndices.length > 0 && (
        <div className="mt-8 court-card animate-fade-up p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <FileText className="h-4 w-4 text-gold-400" />
            <h3 className="font-display text-lg font-bold text-white">
              Evidências com maior impacto
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {topEvidenceIndices.map((idx) => (
              <span key={idx} className="chip">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                Evidência {String(idx).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key message */}
      <div className="mt-8 animate-fade-up rounded-2xl border border-teal-500/20 bg-teal-500/[0.06] p-6 text-center sm:p-8">
        <CheckCircle2 className="mx-auto mb-3 h-7 w-7 text-teal-400" />
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-200 text-pretty sm:text-lg">
          Uma decisão responsável não depende apenas da conclusão, mas da{" "}
          <span className="font-semibold text-teal-300">
            qualidade da justificativa
          </span>{" "}
          utilizada para chegar até ela.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <PrimaryButton onClick={onDebrief}>
          IR PARA O DEBRIEFING
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
        <GhostButton onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          REINICIAR JULGAMENTO
        </GhostButton>
      </div>
    </div>
  );
}

function impactPhrase(choice: string): string {
  switch (choice) {
    case "muito":
      return "Você indicou que mudou bastante sua interpretação.";
    case "parcial":
      return "Você indicou que mudou parcialmente sua interpretação.";
    case "nenhum":
      return "Você indicou que não mudou sua opinião.";
    case "insuficiente":
      return "Você indicou que ainda não tinha informações suficientes.";
    default:
      return "";
  }
}

function truncate(s: string, n = 60): string {
  return s.length > n ? s.slice(0, n).trim() + "…" : s;
}

const ACCENT_DOT: Record<string, string> = {
  teal: "border-teal-400 bg-teal-500/40",
  gold: "border-gold-400 bg-gold-500/40",
  crimson: "border-crimson-400 bg-crimson-500/40",
};
const ACCENT_TEXT: Record<string, string> = {
  teal: "text-teal-300",
  gold: "text-gold-300",
  crimson: "text-crimson-300",
};

function TimelineItem({
  tag,
  text,
  accent,
  delay = 0,
}: {
  tag: string;
  text: string;
  accent: "teal" | "gold" | "crimson";
  delay?: number;
}) {
  return (
    <div
      className="animate-fade-up flex items-start gap-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative flex flex-col items-center">
        <span className={`mt-1 h-2.5 w-2.5 rounded-full border-2 ${ACCENT_DOT[accent]}`} />
        <span className="mt-1 w-px flex-1 bg-white/10" />
      </div>
      <div className="pb-1">
        <p className={`font-mono text-[10px] uppercase tracking-wider ${ACCENT_TEXT[accent]}`}>
          {tag}
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-slate-200 text-pretty">
          {text}
        </p>
      </div>
    </div>
  );
}
