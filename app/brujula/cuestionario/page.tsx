import { Suspense } from "react";
import { CompassLocked } from "@/components/compass/compass-locked";
import { Quiz } from "@/components/compass/quiz";
import { QuizSkeleton } from "@/components/shell/skeletons";
import { loadCompassResponses } from "@/lib/compass-actions";
import { loadCompassQuestions } from "@/lib/compass/load";
import { getSessionUser } from "@/lib/session";

export const metadata = { title: "Cuestionario" };

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizSkeleton />}>
      <QuizContent />
    </Suspense>
  );
}

async function QuizContent() {
  const [user, saved, questions] = await Promise.all([
    getSessionUser(),
    loadCompassResponses(),
    loadCompassQuestions(),
  ]);
  if (!user) return <CompassLocked />;
  const initialAnswers = Object.fromEntries(saved.map((response) => [response.questionId, response.value]));
  return <Quiz initialAnswers={initialAnswers} questions={questions} />;
}
