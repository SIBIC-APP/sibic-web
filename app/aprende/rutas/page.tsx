import { Suspense } from "react";
import { LearnRoutes } from "@/components/learn/learn-routes";
import { LearnRoutesSkeleton } from "@/components/shell/skeletons";
import { loadHistory } from "@/lib/learn/load";
import { savedLessonIds } from "@/lib/learn/saved";

export const metadata = { title: "Rutas de aprendizaje" };

export default function LearnRoutesPage() {
  return (
    <Suspense fallback={<LearnRoutesSkeleton />}>
      <RoutesContent />
    </Suspense>
  );
}

async function RoutesContent() {
  const history = await loadHistory();
  const saved = await savedLessonIds(history.lessons);
  return <LearnRoutes routes={history.routes} saved={saved} />;
}
