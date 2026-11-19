import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HomeActions, SearchFocus } from "@/components/shell/icon-buttons";

export function TopBar({
  title,
  backHref,
  searchId,
  home = false,
}: {
  title?: string;
  backHref?: string;
  searchId?: string;
  home?: boolean;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-1 bg-white/95 px-2 backdrop-blur">
      {home ? (
        <Link href="/" className="px-2 text-lg font-extrabold tracking-tight text-navy">
          SIBIC
        </Link>
      ) : backHref ? (
        <Link
          href={backHref}
          aria-label="Volver"
          className="grid size-10 place-items-center rounded-full text-navy hover:bg-slate-50"
        >
          <ArrowLeft className="size-5" />
        </Link>
      ) : (
        <span className="size-10" />
      )}
      {title ? (
        <h1 className="min-w-0 flex-1 truncate text-center text-[17px] font-semibold tracking-tight text-navy">
          {title}
        </h1>
      ) : (
        <span className="flex-1" />
      )}
      <div className="flex items-center">
        {searchId ? <SearchFocus searchId={searchId} /> : null}
        {home ? <HomeActions /> : <span className={searchId ? "hidden" : "size-2"} />}
      </div>
    </header>
  );
}
