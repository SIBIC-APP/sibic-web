import "server-only";

import type { Catalog, Candidate, Proposal, Theme } from "@/lib/types";
import { readTables } from "@/lib/sheets/table";

const TTL_MS = 60_000;

let memory: { data: Catalog; expiresAt: number } | null = null;
let inflight: Promise<Catalog> | null = null;

function numberFrom(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

const disclaimer =
  /fictici|simulad|inventad|demostraci|ilustrativ|texto de prueba|prototipo|de ejemplo|no corresponde a una persona|no corresponde a una norma|no como compromiso real|ejemplo de interfaz/i;

function publicText(value: string) {
  const kept = value
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence && !disclaimer.test(sentence));
  return kept.join(" ");
}

function photoUrlFrom(photoId: string) {
  const id = photoId.trim();
  if (!id) return "";
  return `https://lh3.googleusercontent.com/d/${id}=w800`;
}

function toCandidate(row: Record<string, string>): Candidate {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    party: row.party,
    partyColor: row.party_color || "#6d5efc",
    office: row.office,
    age: numberFrom(row.age ?? ""),
    bio: publicText(row.bio),
    background: publicText(row.background),
    photoUrl: photoUrlFrom(row.photo_id ?? ""),
    sortOrder: numberFrom(row.sort_order ?? "") ?? 0,
  };
}

function toTheme(row: Record<string, string>): Theme {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    icon: row.icon,
    color: row.color,
    sortOrder: numberFrom(row.sort_order ?? "") ?? 0,
  };
}

function toProposal(row: Record<string, string>): Proposal {
  return {
    id: row.id,
    candidateId: row.candidate_id,
    themeId: row.theme_id,
    title: row.title,
    summary: publicText(row.summary),
    body: publicText(row.body),
    sourceLabel: /simulad/i.test(row.source_label) ? "" : publicText(row.source_label),
    sourceDocument: row.source_document,
    sourceSection: row.source_section,
  };
}

async function fetchCatalog(): Promise<Catalog> {
  const [candidates, themes, proposals] = await readTables(["candidates", "themes", "proposals"]);
  return {
    candidates: candidates.filter((row) => row.id && row.slug).map(toCandidate),
    themes: themes.filter((row) => row.id && row.slug).map(toTheme),
    proposals: proposals.filter((row) => row.id && row.candidate_id && row.theme_id).map(toProposal),
  };
}

export async function loadCatalogUncached() {
  if (memory && memory.expiresAt > Date.now()) return memory.data;
  if (inflight) return inflight;

  inflight = fetchCatalog()
    .then((data) => {
      memory = { data, expiresAt: Date.now() + TTL_MS };
      return data;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function invalidateCatalogMemory() {
  memory = null;
}
