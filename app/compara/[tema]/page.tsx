import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CompareResults } from "@/components/compare/compare-results";
import { CompareResultsSkeleton } from "@/components/shell/skeletons";
import { findTheme } from "@/lib/catalog-model";
import { loadRequestCatalog } from "@/lib/get-catalog";

export const metadata = { title: "Resultados de comparación" };

export default function CompareThemePage({ params }: { params: Promise<{ tema: string }> }) {
  return (
    <Suspense fallback={<CompareResultsSkeleton />}>
      <CompareThemeContent params={params} />
    </Suspense>
  );
}

async function CompareThemeContent({ params }: { params: Promise<{ tema: string }> }) {
  const [{ tema }, catalog] = await Promise.all([params, loadRequestCatalog()]);
  if (!findTheme(catalog, tema)) notFound();
  return <CompareResults catalog={catalog} slug={tema} />;
}
