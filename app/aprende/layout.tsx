import { Suspense, type ReactNode } from "react";
import { LearnLocked } from "@/components/learn/learn-locked";
import { LearnHomeSkeleton } from "@/components/shell/skeletons";
import { getSessionUser } from "@/lib/session";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LearnHomeSkeleton />}>
      <LearnGate>{children}</LearnGate>
    </Suspense>
  );
}

async function LearnGate({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) return <LearnLocked />;
  return children;
}
