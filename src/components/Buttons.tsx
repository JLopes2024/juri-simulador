import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, ...rest }: Props) {
  return (
    <button {...rest} className="btn-primary">
      {children}
    </button>
  );
}

export function GhostButton({ children, ...rest }: Props) {
  return (
    <button {...rest} className="btn-ghost">
      {children}
    </button>
  );
}

export function NextButton({ children = "PRÓXIMA EVIDÊNCIA", ...rest }: Props) {
  return (
    <button {...rest} className="btn-primary">
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
