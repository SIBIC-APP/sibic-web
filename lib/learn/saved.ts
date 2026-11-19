import "server-only";

import { completedSectionIds } from "@/lib/learn/progress";
import type { HistoryLesson } from "@/lib/learn/types";
import { getSessionUser } from "@/lib/session";
import { listLearnResponses } from "@/lib/sheets/learn";

export async function savedLessonIds(lessons: HistoryLesson[]) {
  const user = await getSessionUser();
  if (!user) return [];
  const responses = await listLearnResponses(user.id);
  return completedSectionIds(lessons, responses);
}

export async function hasSessionUser() {
  const user = await getSessionUser();
  return Boolean(user);
}
