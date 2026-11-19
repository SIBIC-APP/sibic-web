import type { ReactNode } from "react";

function Block({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-100 ${className}`} />;
}

function Frame({ children }: { children: ReactNode }) {
  return <div className="px-5 pt-6 pb-8 md:px-8">{children}</div>;
}

export function HomeSkeleton() {
  return (
    <Frame>
      <Block className="h-8 w-40" />
      <Block className="mt-4 h-16 w-72" />
      <Block className="mt-3 h-12 w-64" />
      <div className="mt-8 grid gap-3 lg:grid-cols-2">
        <Block className="h-24" />
        <Block className="h-24" />
        <Block className="h-24" />
        <Block className="h-24" />
      </div>
    </Frame>
  );
}

export function ElectionsSkeleton() {
  return (
    <Frame>
      <Block className="h-11 rounded-full" />
      <div className="mt-4 grid gap-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Block key={index} className="h-20" />
        ))}
      </div>
    </Frame>
  );
}

export function CompareSkeleton() {
  return (
    <Frame>
      <Block className="h-11 rounded-full" />
      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Block key={index} className="h-28" />
        ))}
      </div>
    </Frame>
  );
}

export function CompareResultsSkeleton() {
  return (
    <Frame>
      <Block className="h-12 w-64" />
      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Block key={index} className="h-24 rounded-[24px]" />
        ))}
      </div>
    </Frame>
  );
}

export function LearnHomeSkeleton() {
  return (
    <Frame>
      <Block className="h-16 w-48" />
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <Block className="h-28" />
        <Block className="h-28" />
        <Block className="h-28" />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <Block className="h-24" />
        <Block className="h-24" />
        <Block className="h-24" />
      </div>
    </Frame>
  );
}

export function LearnRoutesSkeleton() {
  return (
    <Frame>
      <div className="flex gap-2">
        <Block className="h-9 w-20 rounded-full" />
        <Block className="h-9 w-28 rounded-full" />
        <Block className="h-9 w-28 rounded-full" />
      </div>
      <div className="mx-auto mt-8 grid max-w-sm justify-items-center gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <Block key={index} className="size-16 rounded-full" />
        ))}
      </div>
    </Frame>
  );
}

export function LearnLessonSkeleton() {
  return (
    <Frame>
      <Block className="h-4 w-40" />
      <Block className="mt-3 h-10 w-64" />
      <Block className="mt-3 h-20" />
      <Block className="mt-6 h-6 w-48" />
      <div className="mt-4 grid gap-3">
        <Block className="h-14" />
        <Block className="h-14" />
        <Block className="h-14" />
      </div>
    </Frame>
  );
}

export function CompassSkeleton() {
  return (
    <Frame>
      <Block className="h-12 w-48" />
      <Block className="mt-4 h-40" />
      <Block className="mt-5 h-12 w-40" />
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: 6 }, (_, index) => (
          <Block key={index} className="h-8 w-28 rounded-full" />
        ))}
      </div>
    </Frame>
  );
}

export function QuizSkeleton() {
  return (
    <Frame>
      <Block className="h-4 w-32" />
      <Block className="mt-3 h-16" />
      <div className="mt-5 grid gap-3">
        <Block className="h-16" />
        <Block className="h-16" />
        <Block className="h-16" />
        <Block className="h-16" />
      </div>
    </Frame>
  );
}

export function ResultSkeleton() {
  return (
    <Frame>
      <Block className="h-5 w-72" />
      <Block className="mt-5 aspect-square w-full rounded-[28px]" />
      <Block className="mt-5 h-8 w-48" />
    </Frame>
  );
}

export function CandidateSkeleton() {
  return (
    <div>
      <Block className="h-44 rounded-none" />
      <Frame>
        <div className="flex gap-2">
          <Block className="h-10 w-28" />
          <Block className="h-10 w-28" />
          <Block className="h-10 w-32" />
        </div>
        <Block className="mt-4 h-28" />
      </Frame>
    </div>
  );
}

export function ProposalsListSkeleton() {
  return (
    <Frame>
      <div className="grid gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <Block key={index} className="h-24" />
        ))}
      </div>
    </Frame>
  );
}

export function BackgroundSkeleton() {
  return (
    <Frame>
      <Block className="h-16" />
      <div className="mt-6 grid gap-4 border-l border-slate-200 pl-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Block key={index} className="h-16" />
        ))}
      </div>
    </Frame>
  );
}

export function ProposalDetailSkeleton() {
  return (
    <Frame>
      <Block className="h-8 w-56" />
      <Block className="mt-3 h-5 w-40" />
      <Block className="mt-5 h-28" />
      <Block className="mt-3 h-20" />
    </Frame>
  );
}
