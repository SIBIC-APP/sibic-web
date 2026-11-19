import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackgroundView } from "@/components/candidates/background-view";
import { BackgroundSkeleton } from "@/components/shell/skeletons";
import { findCandidate } from "@/lib/catalog-model";
import { loadRequestCatalog } from "@/lib/get-catalog";

export const metadata = { title: "Antecedentes" };

export default function BackgroundPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<BackgroundSkeleton />}>
      <BackgroundContent params={params} />
    </Suspense>
  );
}

async function BackgroundContent({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, catalog] = await Promise.all([params, loadRequestCatalog()]);
  if (!findCandidate(catalog, slug)) notFound();
  return <BackgroundView catalog={catalog} slug={slug} />;
}
