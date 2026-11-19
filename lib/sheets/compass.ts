import "server-only";

import type { CompassResponse } from "@/lib/types";
import { ensureCompassResponses } from "@/lib/sheets/bootstrap";
import { appendRow, readTable, updateRow } from "@/lib/sheets/table";

export async function listResponses(userId: string) {
  await ensureCompassResponses();
  const rows = await readTable("compass_responses");
  return rows
    .filter((row) => row.user_id === userId && row.question_id && row.value)
    .map((row) => ({
      id: row.id,
      userId: row.user_id,
      questionId: row.question_id,
      value: row.value,
      updatedAt: row.updated_at,
    }));
}

export async function saveResponse(input: {
  userId: string;
  questionId: string;
  value: string;
}): Promise<CompassResponse> {
  await ensureCompassResponses();
  const rows = await readTable("compass_responses");
  const existing = rows.find(
    (row) => row.user_id === input.userId && row.question_id === input.questionId,
  );
  const updatedAt = new Date().toISOString();

  if (existing) {
    const response = {
      id: existing.id,
      userId: input.userId,
      questionId: input.questionId,
      value: input.value,
      updatedAt,
    };
    await updateRow("compass_responses", existing.rowNumber, {
      id: response.id,
      user_id: response.userId,
      question_id: response.questionId,
      value: response.value,
      updated_at: response.updatedAt,
    });
    return response;
  }

  const response = {
    id: crypto.randomUUID(),
    userId: input.userId,
    questionId: input.questionId,
    value: input.value,
    updatedAt,
  };
  await appendRow("compass_responses", {
    id: response.id,
    user_id: response.userId,
    question_id: response.questionId,
    value: response.value,
    updated_at: response.updatedAt,
  });
  return response;
}
