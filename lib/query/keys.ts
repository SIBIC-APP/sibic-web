export const catalogKeys = {
  all: ["catalog"] as const,
};

export const compassKeys = {
  all: ["compass"] as const,
  responses: (userId: string) => ["compass", "responses", userId] as const,
};
