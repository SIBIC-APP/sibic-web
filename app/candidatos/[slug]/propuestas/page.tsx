import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProposalsView } from "@/components/candidates/proposals-view";
import { ProposalsListSkeleton } from "@/components/shell/skeletons";
import { findCandidate } from "@/lib/catalog-model";
import { loadRequestCatalog } from "@/lib/get-catalog";

export const metadata = { title: "Propuestas" };

export default function ProposalsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ProposalsListSkeleton />}>
      <ProposalsContent params={params} />
    </Suspense>
  );
}

async function ProposalsContent({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, catalog] = await Promise.all([params, loadRequestCatalog()]);
  if (!findCandidate(catalog, slug)) notFound();
  return <ProposalsView catalog={catalog} slug={slug} />;
}
