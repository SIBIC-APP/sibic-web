"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { listResponses, saveResponse } from "@/lib/sheets/compass";

export async function loadCompassResponses() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) return [];
  return listResponses(userId);
}

export async function saveCompassResponseAction(input: { questionId: string; value: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Necesitas iniciar sesión.");
  }
  return saveResponse({
    userId,
    questionId: input.questionId,
    value: input.value,
  });
}
