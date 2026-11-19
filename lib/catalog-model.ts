import type { Candidate, Catalog, Proposal, Theme } from "@/lib/types";

export function sortedCandidates(catalog: Catalog) {
  return [...catalog.candidates].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "es"),
  );
}

export function sortedThemes(catalog: Catalog) {
  return [...catalog.themes].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "es"),
  );
}

export function findCandidate(catalog: Catalog, slug: string) {
  return catalog.candidates.find((candidate) => candidate.slug === slug) ?? null;
}

export function findTheme(catalog: Catalog, slug: string) {
  return catalog.themes.find((theme) => theme.slug === slug) ?? null;
}

export function findProposal(catalog: Catalog, id: string) {
  return catalog.proposals.find((proposal) => proposal.id === id) ?? null;
}

export function proposalFor(catalog: Catalog, candidateId: string, themeId: string) {
  return (
    catalog.proposals.find(
      (proposal) => proposal.candidateId === candidateId && proposal.themeId === themeId,
    ) ?? null
  );
}

export function candidateProposals(catalog: Catalog, candidate: Candidate) {
  return sortedThemes(catalog).map((theme) => ({
    theme,
    proposal: proposalFor(catalog, candidate.id, theme.id),
  }));
}

export function themeComparison(catalog: Catalog, theme: Theme) {
  return sortedCandidates(catalog).map((candidate) => ({
    candidate,
    proposal: proposalFor(catalog, candidate.id, theme.id),
  }));
}

export function sourceLine(proposal: Proposal, party: string) {
  return [proposal.sourceDocument, party, proposal.sourceSection].filter(Boolean).join(" · ");
}
