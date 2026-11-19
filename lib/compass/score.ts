import { optionById, type CompassQuestion } from "@/lib/compass/questions";

export type CompassScore = {
  economic: number;
  authority: number;
  answered: number;
  label: string;
  explanation: string;
};

export const COMPASS_DISCLAIMER =
  "Este resultado es un punto de partida para explorar tus prioridades. No te asigna un partido ni un candidato.";

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

function economicWord(economic: number) {
  if (economic <= -0.45) return "Izquierda";
  if (economic <= -0.15) return "Centroizquierda";
  if (economic >= 0.45) return "Derecha";
  if (economic >= 0.15) return "Centroderecha";
  return "Centro";
}

function authorityWord(authority: number) {
  if (authority >= 0.2) return "autoritaria";
  if (authority <= -0.2) return "libertaria";
  return "moderada";
}

function explanation(economic: number, authority: number) {
  const economy =
    economic <= -0.15
      ? "En economía tiendes a pedir un Estado que reduzca desigualdades y regule lo básico."
      : economic >= 0.15
        ? "En economía tiendes a preferir menos intervención y más espacio para intercambiar y emprender."
        : "En economía te ubicas cerca del centro: ni un Estado que lo decida todo ni un mercado sin reglas.";
  const freedom =
    authority >= 0.2
      ? "En libertades aceptas más autoridad cuando crees que así se ordena la vida pública."
      : authority <= -0.2
        ? "En libertades priorizas que las personas decidan, protesten y accedan a información sin un filtro oficial."
        : "En libertades buscas un equilibrio entre reglas comunes y espacio para decidir.";
  return `${economy} ${freedom} ${COMPASS_DISCLAIMER}`;
}

export function parseAxes(economic: string | null | undefined, authority: string | null | undefined) {
  if (economic == null || authority == null || economic === "" || authority === "") return null;
  const e = Number(economic);
  const a = Number(authority);
  if (!Number.isFinite(e) || !Number.isFinite(a)) return null;
  return { economic: clamp(e), authority: clamp(a) };
}

export function labelForAxes(economic: number, authority: number) {
  const economy = economicWord(clamp(economic));
  const social = authorityWord(clamp(authority));
  return economy === "Centro" && social === "moderada" ? "Centro" : `${economy} ${social}`;
}

export function scoreAnswers(questions: CompassQuestion[], answers: Record<string, string>): CompassScore | null {
  let economic = 0;
  let authority = 0;
  let answered = 0;

  for (const question of questions) {
    const option = optionById(question, answers[question.id]);
    if (!option) continue;
    economic += option.economic;
    authority += option.authority;
    answered += 1;
  }

  if (answered === 0) return null;

  const scale = answered * 2;
  const economicScore = clamp(economic / scale);
  const authorityScore = clamp(authority / scale);
  const label = labelForAxes(economicScore, authorityScore);

  return {
    economic: economicScore,
    authority: authorityScore,
    answered,
    label,
    explanation: explanation(economicScore, authorityScore),
  };
}

export function isComplete(questions: CompassQuestion[], answers: Record<string, string>) {
  return questions.length > 0 && questions.every((question) => Boolean(answers[question.id]));
}
