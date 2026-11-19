import "server-only";

import { connection } from "next/server";
import type { CompassQuestion } from "@/lib/compass/questions";
import { ensureCompassQuestions } from "@/lib/sheets/bootstrap";
import { readTable } from "@/lib/sheets/table";

const keys = ["a", "b", "c", "d"] as const;

function inactive(value: string) {
  const normalized = value.trim().toLowerCase();
  return normalized === "false" || normalized === "0" || normalized === "no";
}

function axis(value: string) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export async function loadCompassQuestions(): Promise<CompassQuestion[]> {
  await connection();
  await ensureCompassQuestions();
  const rows = await readTable("compass_questions");
  return rows
    .filter((row) => row.id && row.prompt && !inactive(row.active))
    .map((row) => ({
      id: row.id,
      theme: row.theme,
      prompt: row.prompt,
      sort: Number(row.sort_order) || 0,
      options: keys.flatMap((key) => {
        const label = row[`option_${key}`]?.trim();
        if (!label) return [];
        return [{ id: key, label, economic: axis(row[`economic_${key}`]), authority: axis(row[`authority_${key}`]) }];
      }),
    }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ sort: _sort, ...question }) => question);
}
