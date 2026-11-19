import { HISTORY_SEED } from "@/lib/learn/history-seed";
import { TABLES } from "@/lib/sheets/schema";

function cell(row: string[], index: number) {
  return index === -1 ? "" : (row[index] ?? "").trim();
}

export function questionsFromSectionTable(rows: string[][]): string[][] {
  const header = rows[0] ?? [];
  const idIndex = header.indexOf("id");
  const promptIndex = header.indexOf("question");
  if (idIndex === -1 || promptIndex === -1) return [];

  const optionA = header.indexOf("option_a");
  const optionB = header.indexOf("option_b");
  const optionC = header.indexOf("option_c");
  const correctIndex = header.indexOf("correct");
  const questions: string[][] = [];

  for (const row of rows.slice(1)) {
    const sectionId = cell(row, idIndex);
    const prompt = cell(row, promptIndex);
    if (!sectionId || !prompt) continue;
    const correct = cell(row, correctIndex);
    questions.push([
      `${sectionId}-1`,
      sectionId,
      "1",
      prompt,
      cell(row, optionA),
      cell(row, optionB),
      cell(row, optionC),
      correct === "b" || correct === "c" ? correct : "a",
    ]);
  }

  return questions;
}

export function questionsFromHistorySeed() {
  return questionsFromSectionTable([[...TABLES.history_sections], ...HISTORY_SEED]);
}
