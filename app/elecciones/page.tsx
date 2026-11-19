import { Suspense } from "react";
import { ElectionsView } from "@/components/elections/elections-view";
import { ElectionsSkeleton } from "@/components/shell/skeletons";
import { loadRequestCatalog } from "@/lib/get-catalog";

export const metadata = { title: "Elecciones 2027" };

export default function ElectionsPage() {
  return (
    <Suspense fallback={<ElectionsSkeleton />}>
      <ElectionsContent />
    </Suspense>
  );
}

async function ElectionsContent() {
  const catalog = await loadRequestCatalog();
  return <ElectionsView catalog={catalog} />;
}
