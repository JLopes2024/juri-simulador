import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  User,
  Users,
  Shield,
  ScrollText,
  Repeat,
  AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ImpactChoice =
  | "muito"
  | "parcial"
  | "nenhum"
  | "insuficiente";

export type VerdictChoice = "A" | "B" | "C" | "D";

export type JustificationChoice =
  | "depoimentos"
  | "mensagens"
  | "testemunhas"
  | "contradicoes"
  | "contexto"
  | "repeticao"
  | "desconforto"
  | "conjunto";

export interface Person {
  id: string;
  role: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Evidence {
  id: string;
  index: number;
  kind: "mensagem" | "depoimento" | "testemunha" | "contexto";
  title: string;
  source: string;
  icon: LucideIcon;
  body: string;
  meta?: string;
}

export interface DecisionPrompt {
  id: string;
  title: string;
  question: string;
  options: { id: string; label: string }[];
  kind: "interpretacao" | "contradicao" | "pressao" | "final";
}

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

export const PEOPLE: Person[] = [
  {
    id: "denunciante",
    role: "Pessoa que fez a denúncia",
    name: "A. Lopes",
    description:
      "Jovem aprendiz, 17 anos. Trabalha há quatro meses no setor de atendimento. Afirma ter recebido comentários insistentes de um colega mais velho.",
    icon: User,
  },
  {
    id: "denunciado",
    role: "Pessoa denunciada",
    name: "R. Marques",
    description:
      "Analista de atendimento, 34 anos. Oito anos de empresa. Afirma que havia uma relação de amizade e que nunca teve intenção de ofender.",
    icon: User,
  },
  {
    id: "testemunha1",
    role: "Testemunha 1",
    name: "T. Nogueira",
    description:
      "Colega de equipe da jovem aprendiz. Convive diariamente com os dois no mesmo corredor de mesas.",
    icon: Users,
  },
  {
    id: "testemunha2",
    role: "Testemunha 2",
    name: "F. Cardoso",
    description:
      "Estagiário do setor ao lado. Não trabalha diretamente com os envolvidos, mas compartilha o mesmo corredor.",
    icon: Users,
  },
  {
    id: "gestor",
    role: "Gestor responsável",
    name: "S. Ferreira",
    description:
      "Coordenadora do setor. Recebeu a denúncia informalmente e encaminhou para o setor de pessoas.",
    icon: Shield,
  },
];

/* ------------------------------------------------------------------ */
/* Evidence sequence                                                   */
/* ------------------------------------------------------------------ */

export const EVIDENCE: Evidence[] = [
  {
    id: "ev1",
    index: 1,
    kind: "mensagem",
    title: "EVIDÊNCIA 01",
    source: "Mensagem enviada pelo denunciado",
    icon: MessageSquare,
    body: "“Você hoje está diferente... esse cabelo solto combina com o seu jeito. Não fica tímida, é um elogio de quem já te conhece bem. 😄”",
    meta: "Enviada às 09h12, em horário de expediente, pelo chat interno da empresa.",
  },
  {
    id: "ev2",
    index: 2,
    kind: "depoimento",
    title: "EVIDÊNCIA 02",
    source: "Depoimento da pessoa que fez a denúncia",
    icon: ScrollText,
    body: "“No começo eu ria junto, parecia brincadeira mesmo. Depois de algumas semanas, os comentários sobre o meu corpo e o meu jeito de me vestir começaram a ser quase todos os dias. Eu passava a evitar o corredor onde ele ficava. Cheguei a comentar que não gostava, mas de um jeito meio enrolado porque eu tinha medo de criar conflito.”",
  },
  {
    id: "ev3",
    index: 3,
    kind: "depoimento",
    title: "EVIDÊNCIA 03",
    source: "Depoimento do denunciado",
    icon: ScrollText,
    body: "“Sempre tive um jeito brincalhão com todo mundo, é a minha forma de deixar o clima leve. Com ela era assim também: a gente brincava, ela ria, respondia. Se ela tivesse falado claramente que se incomodava, eu teria parado na hora. Pra mim, era amizade.”",
  },
  {
    id: "ev4",
    index: 4,
    kind: "testemunha",
    title: "EVIDÊNCIA 04",
    source: "Depoimento da Testemunha 1 (colega de equipe)",
    icon: Users,
    body: "“Eu sentia que ela ficava encolhida quando ele passava. Ela não falava nada, mas dava pra ver que ela se incomodava. Uma vez eu perguntei se estava tudo bem e ela disse 'é só o Marques sendo o Marques de novo', meio que normalizando. Eu achei estranho, mas não falei nada.”",
  },
  {
    id: "ev5",
    index: 5,
    kind: "contexto",
    title: "EVIDÊNCIA 05",
    source: "Comportamento anterior entre os envolvidos",
    icon: Repeat,
    body: "Registros do chat interno mostram que, nas duas primeiras semanas, a jovem aprendiz respondia com emojis e brincadeiras de volta. A partir da terceira semana, as respostas dela passam a ser curtas — “kk”, “é”, “aha” — e, em alguns dias, simplesmente não responde. O denunciado continua enviando comentários no mesmo tom.",
    meta: "Análise do histórico de mensagens dos últimos 45 dias.",
  },
  {
    id: "ev6",
    index: 6,
    kind: "mensagem",
    title: "EVIDÊNCIA 06",
    source: "Mensagem que parece contradizer um dos depoimentos",
    icon: AlertTriangle,
    body: "Mensagem da jovem aprendiz ao denunciado, no dia 32 do período: “Já pedi algumas vezes pra você parar com esse tipo de comentário. Não é legal pra mim, ok?” — O denunciado respondeu: “Tá bom, foi mal, não falei sério. 😄” e, dois dias depois, voltou a fazer comentários no mesmo tom.",
    meta: "Esta mensagem parece contradizer parcialmente o depoimento do denunciado, que afirmou não ter sido avisado.",
  },
];

/* ------------------------------------------------------------------ */
/* Decision prompts                                                    */
/* ------------------------------------------------------------------ */

export const DECISION_MID: DecisionPrompt = {
  id: "dec_mid",
  title: "MOMENTO DE DECISÃO",
  question: "Até este momento, qual interpretação é mais adequada?",
  kind: "interpretacao",
  options: [
    { id: "A", label: "Foi apenas uma brincadeira mal interpretada." },
    { id: "B", label: "Existem indícios de comportamento inadequado." },
    { id: "C", label: "Há evidências suficientes para considerar que houve assédio." },
    { id: "D", label: "Ainda não existem informações suficientes para concluir." },
  ],
};

export const DECISION_CONTRADICTION: DecisionPrompt = {
  id: "dec_contradiction",
  title: "ATENÇÃO: ALGO NÃO BATE",
  question: "O que o júri deve fazer diante dessa contradição?",
  kind: "contradicao",
  options: [
    { id: "A", label: "Ignorar, porque é apenas uma mensagem." },
    { id: "B", label: "Considerar a mensagem como evidência relevante." },
    { id: "C", label: "Considerar automaticamente que o denunciado está mentindo." },
    { id: "D", label: "Encerrar o julgamento imediatamente." },
  ],
};

export const DECISION_PRESSURE: DecisionPrompt = {
  id: "dec_pressure",
  title: "PRESSÃO DO JÚRI",
  question: "Como o júri deve proceder diante dessa divergência?",
  kind: "pressao",
  options: [
    { id: "A", label: "Votar imediatamente, seguindo a maioria." },
    { id: "B", label: "Revisar as evidências e ouvir as diferentes interpretações antes de decidir." },
    { id: "C", label: "Ignorar quem discorda, para acelerar a decisão." },
    { id: "D", label: "Considerar apenas as opiniões mais firmes, sem distinguir opinião de evidência." },
  ],
};

export const DECISION_FINAL: DecisionPrompt = {
  id: "dec_final",
  title: "CHEGOU A HORA DA DECISÃO",
  question:
    "Considerando TODAS as informações apresentadas, qual é a decisão do júri?",
  kind: "final",
  options: [
    { id: "A", label: "Não existem elementos suficientes para caracterizar o comportamento como assédio." },
    { id: "B", label: "Existem indícios de comportamento inadequado e a situação precisa ser formalmente investigada." },
    { id: "C", label: "As evidências apresentadas são suficientes para concluir que houve assédio." },
    { id: "D", label: "A situação deve ser ignorada porque não houve contato físico." },
  ],
};

export const JUSTIFICATION_OPTIONS: { id: JustificationChoice; label: string }[] = [
  { id: "depoimentos", label: "Depoimentos" },
  { id: "mensagens", label: "Mensagens" },
  { id: "testemunhas", label: "Testemunhas" },
  { id: "contradicoes", label: "Contradições" },
  { id: "contexto", label: "Contexto da relação" },
  { id: "repeticao", label: "Repetição do comportamento" },
  { id: "desconforto", label: "Demonstração de desconforto" },
  { id: "conjunto", label: "Conjunto das evidências" },
];

export const DEBRIEFING_QUESTIONS: string[] = [
  "Em qual momento sua opinião mudou?",
  "Qual evidência teve maior peso?",
  "Houve alguma informação que parecia importante, mas depois perdeu força?",
  "Qual é a diferença entre uma opinião, uma suspeita e uma conclusão baseada em evidências?",
];
