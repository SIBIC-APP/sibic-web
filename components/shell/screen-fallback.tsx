export function ScreenFallback() {
  return (
    <div className="px-5 pt-4">
      <div className="h-14" />
      <div className="space-y-3">
        <div className="h-28 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-20 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-20 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    </div>
  );
}
