import { Suspense } from "react";
import { HomeView } from "@/components/home/home-view";
import { HomeSkeleton } from "@/components/shell/skeletons";
import { loadRequestCatalog } from "@/lib/get-catalog";

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const catalog = await loadRequestCatalog();
  return <HomeView catalog={catalog} />;
}
