import { useEffect, useMemo, useState } from "react";
import { Scale } from "lucide-react";
import { EVIDENCE, type VerdictChoice } from "./data/caseContent";
import { useSession } from "./hooks/useSession";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { OpeningScreen } from "./stages/OpeningScreen";
import { CasePresentation } from "./stages/CasePresentation";
import { EvidenceStage } from "./stages/EvidenceStage";
import { DecisionStage } from "./stages/DecisionStage";
import { ContradictionStage } from "./stages/ContradictionStage";
import { PressureStage } from "./stages/PressureStage";
import { FinalDecisionStage, ResultStage } from "./stages/ResultStage";
import { JustificationStage } from "./stages/JustificationStage";
import { DebriefingStage } from "./stages/DebriefingStage";

type Step =
  | "opening"
  | "presentation"
  | "ev1"
  | "dec_mid"
  | "ev2"
  | "ev3"
  | "ev4"
  | "dec_contradiction"
  | "ev5"
  | "ev6"
  | "dec_pressure"
  | "dec_final"
  | "justification"
  | "result"
  | "debriefing";

const STEP_ORDER: Step[] = [
  "opening",
  "presentation",
  "ev1",
  "dec_mid",
  "ev2",
  "ev3",
  "ev4",
  "dec_contradiction",
  "ev5",
  "ev6",
  "dec_pressure",
  "dec_final",
  "justification",
  "result",
  "debriefing",
];

const EVIDENCE_STEP_MAP: Record<string, string> = {
  ev1: EVIDENCE[0].id,
  ev2: EVIDENCE[1].id,
  ev3: EVIDENCE[2].id,
  ev4: EVIDENCE[3].id,
  ev5: EVIDENCE[4].id,
  ev6: EVIDENCE[5].id,
};

export default function App() {
  const session = useSession();
  const [step, setStep] = useState<Step>("opening");

  const stepIndex = useMemo(() => STEP_ORDER.indexOf(step), [step]);

  // Scroll to top on step change for clean transitions (especially on mobile/projector)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const goNext = () => {
    const next = STEP_ORDER[stepIndex + 1];
    if (next) setStep(next);
  };

  const restart = () => {
    session.reset();
    setStep("opening");
  };

  // Progress only counts the "working" steps (not opening/presentation/result/debrief)
  const workingSteps = STEP_ORDER.length - 4; // exclude 4 non-progress steps
  const workingIndex = Math.max(0, stepIndex - 2); // offset by opening + presentation
  const progressCurrent = Math.min(workingIndex, workingSteps);
  const decisionsCount = session.state.decisions.length;

  return (
    <div className="min-h-screen">
      {step !== "opening" && (
        <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/80 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={restart}
                className="flex items-center gap-2 text-left transition-opacity hover:opacity-80"
                aria-label="Reiniciar"
              >
                <Scale className="h-5 w-5 text-gold-400" />
                <span className="font-display text-sm font-bold tracking-wide text-white">
                  JÚRI
                  <span className="ml-1.5 font-normal text-slate-500">
                    O Caso do Corredor
                  </span>
                </span>
              </button>
              {step !== "presentation" &&
                step !== "result" &&
                step !== "debriefing" && (
                  <div className="hidden max-w-md flex-1 px-4 sm:block">
                    <ProgressIndicator
                      current={progressCurrent}
                      total={workingSteps}
                      decisionsCount={decisionsCount}
                    />
                  </div>
                )}
            </div>
            {/* Mobile progress */}
            {step !== "presentation" &&
              step !== "result" &&
              step !== "debriefing" && (
                <div className="mt-2 sm:hidden">
                  <ProgressIndicator
                    current={progressCurrent}
                    total={workingSteps}
                    decisionsCount={decisionsCount}
                  />
                </div>
              )}
          </div>
        </header>
      )}

      <main>
        {step === "opening" && <OpeningScreen onStart={() => setStep("presentation")} />}

        {step === "presentation" && (
          <CasePresentation onContinue={() => setStep("ev1")} />
        )}

        {/* Evidence stages */}
        {step.startsWith("ev") && (
          <EvidenceStage
            evidence={EVIDENCE[Number(step.slice(2)) - 1]}
            total={EVIDENCE.length}
            value={session.impactFor(EVIDENCE_STEP_MAP[step])?.choice}
            onImpact={(choice) =>
              session.recordImpact(
                EVIDENCE_STEP_MAP[step],
                Number(step.slice(2)),
                choice
              )
            }
            onNext={goNext}
          />
        )}

        {step === "dec_mid" && (
          <DecisionStage
            prompt={session.midDecision}
            value={session.decisionFor(session.midDecision.id)?.choice}
            onSelect={(id) => session.recordDecision(session.midDecision, id)}
            onContinue={goNext}
            eyebrow="MOMENTO DE DECISÃO"
          />
        )}

        {step === "dec_contradiction" && (
          <ContradictionStage
            value={session.decisionFor(session.contradictionDecision.id)?.choice}
            onSelect={(id) =>
              session.recordDecision(session.contradictionDecision, id)
            }
            onContinue={goNext}
          />
        )}

        {step === "dec_pressure" && (
          <PressureStage
            value={session.decisionFor(session.pressureDecision.id)?.choice}
            onSelect={(id) => session.recordDecision(session.pressureDecision, id)}
            onContinue={goNext}
          />
        )}

        {step === "dec_final" && (
          <FinalDecisionStage
            value={session.state.finalVerdict ?? undefined}
            onSelect={(id) => {
              session.recordFinalVerdict(id as VerdictChoice);
              session.recordDecision(session.finalDecision, id);
            }}
            onContinue={goNext}
          />
        )}

        {step === "justification" && (
          <JustificationStage
            value={session.state.justification ?? undefined}
            onSelect={(id) => session.recordJustification(id)}
            onContinue={goNext}
          />
        )}

        {step === "result" && (
          <ResultStage
            state={session.state}
            onRestart={restart}
            onDebrief={() => setStep("debriefing")}
          />
        )}

        {step === "debriefing" && <DebriefingStage onRestart={restart} />}
      </main>

      {step !== "opening" && (
        <footer className="border-t border-white/5 px-6 py-6 text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-600">
            Protótipo educativo · Caso fictício para fins de ensino. Nenhuma
            empresa, pessoa ou situação é real.
          </p>
        </footer>
      )}
    </div>
  );
}
