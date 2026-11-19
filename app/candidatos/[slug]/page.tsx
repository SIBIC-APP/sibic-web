import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProfileView } from "@/components/candidates/profile-view";
import { CandidateSkeleton } from "@/components/shell/skeletons";
import { findCandidate } from "@/lib/catalog-model";
import { loadRequestCatalog } from "@/lib/get-catalog";

export const metadata = { title: "Candidatura" };

export default function CandidatePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<CandidateSkeleton />}>
      <CandidateContent params={params} />
    </Suspense>
  );
}

async function CandidateContent({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, catalog] = await Promise.all([params, loadRequestCatalog()]);
  if (!findCandidate(catalog, slug)) notFound();
  return <ProfileView catalog={catalog} slug={slug} />;
}
