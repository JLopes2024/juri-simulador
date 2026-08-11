import { Scale, ArrowRight, Gavel, FileText, Users, MessageSquare } from "lucide-react";
import { PrimaryButton } from "../components/Buttons";

interface Props {
  onStart: () => void;
}

export function OpeningScreen({ onStart }: Props) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="animate-scale-in">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-gold-500/30 bg-gradient-to-b from-gold-500/10 to-transparent shadow-lg shadow-gold-600/10">
          <Scale className="h-10 w-10 text-gold-400" />
        </div>
      </div>

      <p className="section-eyebrow mb-4 animate-fade-up" style={{ animationDelay: "80ms" }}>
        Simulação educativa · Júri
      </p>

      <h1
        className="animate-fade-up font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl text-balance"
        style={{ animationDelay: "140ms" }}
      >
        JÚRI
        <span className="block bg-gradient-to-r from-gold-300 via-gold-400 to-teal-400 bg-clip-text text-transparent">
          O Caso do Corredor
        </span>
      </h1>

      <p
        className="animate-fade-up mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 text-pretty sm:text-xl"
        style={{ animationDelay: "220ms" }}
      >
        Você não precisa descobrir quem parece culpado.
        <br className="hidden sm:block" />
        Precisa descobrir o que as{" "}
        <span className="font-semibold text-gold-300">evidências</span> permitem
        concluir.
      </p>

      <div
        className="animate-fade-up mt-10"
        style={{ animationDelay: "300ms" }}
      >
        <PrimaryButton onClick={onStart} className="px-8 py-4 text-base">
          <Gavel className="h-5 w-5" />
          INICIAR JULGAMENTO
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>

      <div
        className="animate-fade-up mt-16 grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
        style={{ animationDelay: "380ms" }}
      >
        {[
          { icon: FileText, label: "6 evidências" },
          { icon: MessageSquare, label: "Mensagens" },
          { icon: Users, label: "2 testemunhas" },
          { icon: Scale, label: "Veredito" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-4"
          >
            <item.icon className="h-5 w-5 text-teal-400" />
            <span className="font-mono text-xs text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>

      <p
        className="animate-fade-in mt-12 max-w-xl text-xs leading-relaxed text-slate-600"
        style={{ animationDelay: "500ms" }}
      >
        Caso fictício, criado exclusivamente para fins educativos. Nomes,
        empresas e situações são imaginários. O foco está em respeito, limites,
        consentimento e análise de evidências.
      </p>
    </div>
  );
}
