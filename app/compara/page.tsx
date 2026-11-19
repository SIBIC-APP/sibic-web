import { Suspense } from "react";
import { CompareView } from "@/components/compare/compare-view";
import { CompareSkeleton } from "@/components/shell/skeletons";
import { loadRequestCatalog } from "@/lib/get-catalog";

export const metadata = { title: "Compara" };

export default function ComparePage() {
  return (
    <Suspense fallback={<CompareSkeleton />}>
      <CompareContent />
    </Suspense>
  );
}

async function CompareContent() {
  const catalog = await loadRequestCatalog();
  return <CompareView catalog={catalog} />;
}
