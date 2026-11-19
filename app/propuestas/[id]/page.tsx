import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProposalDetail } from "@/components/proposals/proposal-detail";
import { ProposalDetailSkeleton } from "@/components/shell/skeletons";
import { findProposal } from "@/lib/catalog-model";
import { loadRequestCatalog } from "@/lib/get-catalog";

export const metadata = { title: "Propuesta" };

export default function ProposalPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<ProposalDetailSkeleton />}>
      <ProposalContent params={params} />
    </Suspense>
  );
}

async function ProposalContent({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, catalog] = await Promise.all([params, loadRequestCatalog()]);
  if (!findProposal(catalog, id)) notFound();
  return <ProposalDetail catalog={catalog} id={id} />;
}
