import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LearnLesson } from "@/components/learn/learn-lesson";
import { LearnLessonSkeleton } from "@/components/shell/skeletons";
import { loadHistory } from "@/lib/learn/load";
import { hasSessionUser, savedLessonIds } from "@/lib/learn/saved";

export const metadata = { title: "Lección" };

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<LearnLessonSkeleton />}>
      <LessonContent params={params} />
    </Suspense>
  );
}

async function LessonContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { lessons } = await loadHistory();
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) notFound();
  const routeLessons = lessons.filter((item) => item.routeSlug === lesson.routeSlug);
  const place = routeLessons.findIndex((item) => item.id === lesson.id);
  const [saved, signedIn] = await Promise.all([savedLessonIds(lessons), hasSessionUser()]);
  return (
    <LearnLesson
      lesson={lesson}
      index={place + 1}
      total={routeLessons.length}
      previousId={place > 0 ? routeLessons[place - 1].id : null}
      nextId={routeLessons[place + 1]?.id ?? null}
      saved={saved}
      signedIn={signedIn}
    />
  );
}
