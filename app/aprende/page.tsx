import { Suspense } from "react";
import { LearnHome } from "@/components/learn/learn-home";
import { LearnHomeSkeleton } from "@/components/shell/skeletons";
import { loadHistory } from "@/lib/learn/load";
import { savedLessonIds } from "@/lib/learn/saved";

export const metadata = { title: "Aprende" };

export default function LearnPage() {
  return (
    <Suspense fallback={<LearnHomeSkeleton />}>
      <LearnContent />
    </Suspense>
  );
}

async function LearnContent() {
  const history = await loadHistory();
  const saved = await savedLessonIds(history.lessons);
  return <LearnHome lessons={history.lessons} routes={history.routes} saved={saved} />;
}
