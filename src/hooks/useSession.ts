import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DECISION_CONTRADICTION,
  DECISION_FINAL,
  DECISION_MID,
  DECISION_PRESSURE,
  EVIDENCE,
  type ImpactChoice,
  type JustificationChoice,
  type VerdictChoice,
} from "../data/caseContent";

export interface ImpactRecord {
  evidenceId: string;
  evidenceIndex: number;
  choice: ImpactChoice;
}

export interface DecisionRecord {
  promptId: string;
  kind: "interpretacao" | "contradicao" | "pressao" | "final";
  choice: string;
  label: string;
  title: string;
}

export interface OpinionShift {
  from: string;
  to: string;
  at: string;
  evidenceId?: string;
}

export interface SessionState {
  impacts: ImpactRecord[];
  decisions: DecisionRecord[];
  finalVerdict: VerdictChoice | null;
  justification: JustificationChoice | null;
  opinionShifts: OpinionShift[];
}

const STORAGE_KEY = "juri-caso-corredor-session";

const emptyState: SessionState = {
  impacts: [],
  decisions: [],
  finalVerdict: null,
  justification: null,
  opinionShifts: [],
};

function load(): SessionState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as Partial<SessionState>;
    return {
      impacts: parsed.impacts ?? [],
      decisions: parsed.decisions ?? [],
      finalVerdict: parsed.finalVerdict ?? null,
      justification: parsed.justification ?? null,
      opinionShifts: parsed.opinionShifts ?? [],
    };
  } catch {
    return emptyState;
  }
}

const IMPACT_LABELS: Record<ImpactChoice, string> = {
  muito: "Sim, muda bastante",
  parcial: "Sim, muda parcialmente",
  nenhum: "Não muda minha opinião",
  insuficiente: "Ainda não tenho informações suficientes",
};

export function useSession() {
  const [state, setState] = useState<SessionState>(load);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  const recordImpact = useCallback(
    (evidenceId: string, evidenceIndex: number, choice: ImpactChoice) => {
      setState((prev) => {
        const others = prev.impacts.filter((i) => i.evidenceId !== evidenceId);
        return { ...prev, impacts: [...others, { evidenceId, evidenceIndex, choice }] };
      });
    },
    []
  );

  const recordDecision = useCallback(
    (
      prompt: {
        id: string;
        kind: DecisionRecord["kind"];
        title: string;
        options: { id: string; label: string }[];
      },
      choiceId: string
    ) => {
      const option = prompt.options.find((o) => o.id === choiceId);
      const label = option?.label ?? "";
      setState((prev) => {
        const others = prev.decisions.filter((d) => d.promptId !== prompt.id);
        const record: DecisionRecord = {
          promptId: prompt.id,
          kind: prompt.kind,
          choice: choiceId,
          label,
          title: prompt.title,
        };
        const decisions = [...others, record];

        // Track opinion shifts between interpretation-style decisions.
        let opinionShifts = prev.opinionShifts;
        if (prompt.kind === "interpretacao" || prompt.kind === "final") {
          const prior = prev.decisions.find((d) => d.kind === "interpretacao");
          if (prior && prior.choice !== choiceId) {
            opinionShifts = [
              ...opinionShifts,
              {
                from: prior.label,
                to: label,
                at: prompt.title,
              },
            ];
          }
        }
        return { ...prev, decisions, opinionShifts };
      });
    },
    []
  );

  const recordFinalVerdict = useCallback((verdict: VerdictChoice) => {
    setState((prev) => ({ ...prev, finalVerdict: verdict }));
  }, []);

  const recordJustification = useCallback((just: JustificationChoice) => {
    setState((prev) => ({ ...prev, justification: just }));
  }, []);

  const reset = useCallback(() => {
    setState(emptyState);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const totalSteps = useMemo(
    () => EVIDENCE.length + 3 + 1 + 1, // evidences + 3 mid decisions + final + justification
    []
  );

  const impactFor = useCallback(
    (evidenceId: string) => state.impacts.find((i) => i.evidenceId === evidenceId),
    [state.impacts]
  );

  const decisionFor = useCallback(
    (promptId: string) => state.decisions.find((d) => d.promptId === promptId),
    [state.decisions]
  );

  return {
    state,
    recordImpact,
    recordDecision,
    recordFinalVerdict,
    recordJustification,
    reset,
    totalSteps,
    impactFor,
    decisionFor,
    impactLabels: IMPACT_LABELS,
    midDecision: DECISION_MID,
    contradictionDecision: DECISION_CONTRADICTION,
    pressureDecision: DECISION_PRESSURE,
    finalDecision: DECISION_FINAL,
  };
}
