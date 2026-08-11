import { ScrollText } from "lucide-react";
import { PEOPLE } from "../data/caseContent";
import { StageHeader } from "../components/StageHeader";
import { NextButton } from "../components/Buttons";

interface Props {
  onContinue: () => void;
}

export function CasePresentation({ onContinue }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <StageHeader
        eyebrow="Apresentação do caso"
        title="O que aconteceu no corredor"
        subtitle="Uma situação fictícia em uma empresa fictícia. Leia com atenção — as versões não são iguais."
        icon={<ScrollText className="h-3.5 w-3.5" />}
      />

      <div className="court-card court-card-gold animate-fade-up p-6 sm:p-8">
        <p className="text-base leading-relaxed text-slate-200 text-pretty sm:text-lg">
          Durante algumas semanas, uma jovem aprendiz afirma ter recebido
          comentários insistentes de um colega mais velho do setor. Segundo ela,
          os comentários começaram como brincadeiras, mas passaram a deixá-la
          desconfortável. O colega afirma que nunca teve intenção de ofendê-la e
          que acreditava existir uma relação de amizade entre os dois.
        </p>
        <div className="my-5 h-px gold-divider" />
        <p className="text-base leading-relaxed text-slate-300 text-pretty">
          Não houve agressão física. Existem mensagens trocadas entre os
          envolvidos, duas testemunhas e registros de conversas no ambiente de
          trabalho. Entretanto, cada pessoa apresenta uma versão diferente dos
          acontecimentos.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="section-eyebrow mb-5">As pessoas envolvidas</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {PEOPLE.map((person, idx) => (
            <div
              key={person.id}
              className="court-card animate-fade-up p-5"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <person.icon className="h-5 w-5 text-teal-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-gold-400">
                    {person.role}
                  </p>
                  <p className="mt-0.5 font-display text-lg font-bold text-white">
                    {person.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400 text-pretty">
                    {person.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <NextButton onClick={onContinue}>COMEÇAR INVESTIGAÇÃO</NextButton>
      </div>
    </div>
  );
}
