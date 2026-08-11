import { type ReactNode } from "react";
import type { DecisionPrompt } from "../data/caseContent";
import { StageHeader } from "../components/StageHeader";
import { ChoiceList } from "../components/ChoiceList";
import { PrimaryButton } from "../components/Buttons";
import { ArrowRight } from "lucide-react";

interface Props {
  prompt: DecisionPrompt;
  value?: string;
  onSelect: (id: string) => void;
  onContinue: () => void;
  continueLabel?: string;
  eyebrow?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export function DecisionStage({
  prompt,
  value,
  onSelect,
  onContinue,
  continueLabel = "CONFIRMAR DECISÃO",
  eyebrow,
  icon,
  children,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <StageHeader
        eyebrow={eyebrow ?? prompt.title}
        title={prompt.question}
        icon={icon}
      />

      {children}

      <div className="mt-8">
        <ChoiceList
          options={prompt.options}
          value={value}
          onSelect={onSelect}
          columns={prompt.options.length === 4 ? 1 : 1}
        />
      </div>

      <div className="mt-10 flex justify-end">
        <PrimaryButton onClick={onContinue} disabled={!value}>
          {continueLabel}
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}
