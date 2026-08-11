import { AlertTriangle, FileText, MessageSquare } from "lucide-react";
import { DECISION_CONTRADICTION } from "../data/caseContent";
import { DecisionStage } from "./DecisionStage";

interface Props {
  value?: string;
  onSelect: (id: string) => void;
  onContinue: () => void;
}

export function ContradictionStage({ value, onSelect, onContinue }: Props) {
  return (
    <DecisionStage
      prompt={DECISION_CONTRADICTION}
      value={value}
      onSelect={onSelect}
      onContinue={onContinue}
      continueLabel="REGISTRAR E CONTINUAR"
      icon={<AlertTriangle className="h-3.5 w-3.5" />}
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="court-card animate-fade-up p-5">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-crimson-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-crimson-400">
              Depoimento do denunciado
            </span>
          </div>
          <p className="text-base italic leading-relaxed text-slate-200 text-pretty">
            “Ela nunca demonstrou desconforto. Se ela tivesse falado, eu teria
            parado.”
          </p>
        </div>
        <div
          className="court-card animate-fade-up p-5"
          style={{ animationDelay: "80ms" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-teal-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
              Mensagem da jovem aprendiz
            </span>
          </div>
          <p className="text-base italic leading-relaxed text-slate-200 text-pretty">
            “Já pedi algumas vezes pra você parar com esse tipo de comentário.
            Não é legal pra mim, ok?”
          </p>
        </div>
      </div>
    </DecisionStage>
  );
}
