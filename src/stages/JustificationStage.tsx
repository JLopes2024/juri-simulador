import { Gavel, ArrowRight } from "lucide-react";
import { JUSTIFICATION_OPTIONS, type JustificationChoice } from "../data/caseContent";
import { StageHeader } from "../components/StageHeader";
import { ChoiceList } from "../components/ChoiceList";
import { PrimaryButton } from "../components/Buttons";

interface Props {
  value?: JustificationChoice;
  onSelect: (id: JustificationChoice) => void;
  onContinue: () => void;
}

export function JustificationStage({ value, onSelect, onContinue }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <StageHeader
        eyebrow="Justificativa da decisão"
        title="Qual foi o principal elemento que influenciou sua decisão?"
        subtitle="Antes de confirmar o veredito, escolha o fundamento principal. Uma decisão responsável depende da qualidade da justificativa — não apenas da conclusão."
        icon={<Gavel className="h-3.5 w-3.5" />}
      />

      <ChoiceList
        options={JUSTIFICATION_OPTIONS.map((o) => ({ id: o.id, label: o.label }))}
        value={value}
        onSelect={(id) => onSelect(id as JustificationChoice)}
        columns={2}
      />

      <div className="mt-10 flex justify-end">
        <PrimaryButton onClick={onContinue} disabled={!value}>
          REVELAR VEREDITO
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}
