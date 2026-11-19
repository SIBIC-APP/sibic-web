import "server-only";

import { ensureHistoryResponses } from "@/lib/sheets/bootstrap";
import { appendRow, readTable, updateRow } from "@/lib/sheets/table";

export type LearnResponseRow = {
  id: string;
  userId: string;
  sectionId: string;
  questionId: string;
  value: string;
  updatedAt: string;
};

export async function listLearnResponses(userId: string): Promise<LearnResponseRow[]> {
  await ensureHistoryResponses();
  const rows = await readTable("history_responses");
  return rows
    .filter((row) => row.user_id === userId)
    .map((row) => ({
      id: row.id,
      userId: row.user_id,
      sectionId: row.section_id,
      questionId: row.question_id,
      value: row.value,
      updatedAt: row.updated_at,
    }));
}

export async function saveLearnResponse(input: {
  userId: string;
  sectionId: string;
  questionId: string;
  value: string;
}): Promise<LearnResponseRow> {
  await ensureHistoryResponses();
  const rows = await readTable("history_responses");
  const existing = input.questionId
    ? rows.find((row) => row.user_id === input.userId && row.question_id === input.questionId)
    : rows.find((row) => row.user_id === input.userId && row.section_id === input.sectionId && !row.question_id);
  const updatedAt = new Date().toISOString();
  const response = {
    id: existing?.id || crypto.randomUUID(),
    userId: input.userId,
    sectionId: input.sectionId,
    questionId: input.questionId,
    value: input.value,
    updatedAt,
  };
  const record = {
    id: response.id,
    user_id: response.userId,
    section_id: response.sectionId,
    question_id: response.questionId,
    value: response.value,
    updated_at: response.updatedAt,
  };

  if (existing) {
    await updateRow("history_responses", existing.rowNumber, record);
    return response;
  }

  await appendRow("history_responses", record);
  return response;
}
