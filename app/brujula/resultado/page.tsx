import type { Metadata } from "next";
import { Suspense } from "react";
import { CompassLocked } from "@/components/compass/compass-locked";
import { ResultView } from "@/components/compass/result-view";
import { ResultSkeleton } from "@/components/shell/skeletons";
import { loadCompassResponses } from "@/lib/compass-actions";
import { loadCompassQuestions } from "@/lib/compass/load";
import { COMPASS_DISCLAIMER, labelForAxes, parseAxes } from "@/lib/compass/score";
import { getSessionUser } from "@/lib/session";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; a?: string }>;
}): Promise<Metadata> {
  const { e, a } = await searchParams;
  const axes = parseAxes(e, a);
  if (!axes) {
    return {
      title: "Tu Brújula",
      description: COMPASS_DISCLAIMER,
    };
  }
  const label = labelForAxes(axes.economic, axes.authority);
  const title = `Mi Brújula: ${label}`;
  const image = `/brujula/og?e=${axes.economic}&a=${axes.authority}`;
  return {
    title,
    description: COMPASS_DISCLAIMER,
    openGraph: {
      title: `${title} · SIBIC`,
      description: COMPASS_DISCLAIMER,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · SIBIC`,
      description: COMPASS_DISCLAIMER,
      images: [image],
    },
  };
}

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultSkeleton />}>
      <ResultContent />
    </Suspense>
  );
}

async function ResultContent() {
  const [user, saved, questions] = await Promise.all([
    getSessionUser(),
    loadCompassResponses(),
    loadCompassQuestions(),
  ]);
  if (!user) return <CompassLocked />;
  const initialAnswers = Object.fromEntries(saved.map((response) => [response.questionId, response.value]));
  return <ResultView initialAnswers={initialAnswers} questions={questions} />;
}
