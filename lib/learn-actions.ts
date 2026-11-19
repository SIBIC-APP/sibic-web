"use server";

import { getSessionUser } from "@/lib/session";
import { saveLearnResponse } from "@/lib/sheets/learn";

export async function saveLearnAnswerAction(input: { sectionId: string; questionId: string; value: string }) {
  const user = await getSessionUser();
  if (!user) return null;
  return saveLearnResponse({
    userId: user.id,
    sectionId: input.sectionId,
    questionId: input.questionId,
    value: input.value,
  });
}
