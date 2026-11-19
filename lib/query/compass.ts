"use client";

import type { QueryClient } from "@tanstack/react-query";
import { saveCompassResponseAction } from "@/lib/compass-actions";
import { compassKeys } from "@/lib/query/keys";
import { optimisticMutation } from "@/lib/query/optimistic";
import type { CompassResponse } from "@/lib/types";

export function compassResponseMutation(queryClient: QueryClient, userId: string) {
  return optimisticMutation<
    CompassResponse[],
    { questionId: string; value: string },
    CompassResponse
  >({
    queryClient,
    queryKey: compassKeys.responses(userId),
    mutationFn: (variables) => saveCompassResponseAction(variables),
    updater: (current, variables) => {
      const responses = current ?? [];
      const next: CompassResponse = {
        id: `pending-${variables.questionId}`,
        userId,
        questionId: variables.questionId,
        value: variables.value,
        updatedAt: new Date().toISOString(),
      };
      const index = responses.findIndex((response) => response.questionId === variables.questionId);
      if (index === -1) return [...responses, next];
      return responses.map((response, responseIndex) => (responseIndex === index ? { ...response, ...next, id: response.id } : response));
    },
  });
}
