import { Suspense } from "react";
import { CompassLanding } from "@/components/compass/landing";
import { CompassLocked } from "@/components/compass/compass-locked";
import { CompassSkeleton } from "@/components/shell/skeletons";
import { loadCompassQuestions } from "@/lib/compass/load";
import { getSessionUser } from "@/lib/session";

export default function CompassPage() {
  return (
    <Suspense fallback={<CompassSkeleton />}>
      <CompassGate />
    </Suspense>
  );
}

async function CompassGate() {
  const [user, questions] = await Promise.all([getSessionUser(), loadCompassQuestions()]);
  if (!user) return <CompassLocked />;
  const themes = [...new Set(questions.map((question) => question.theme).filter(Boolean))];
  return <CompassLanding themes={themes} />;
}
