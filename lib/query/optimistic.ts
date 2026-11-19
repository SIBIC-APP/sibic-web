import type { QueryClient, QueryKey, UseMutationOptions } from "@tanstack/react-query";

type OptimisticContext<TQuery> = {
  previous: TQuery | undefined;
};

export function optimisticMutation<TQuery, TVariables, TResult = unknown>({
  queryClient,
  queryKey,
  mutationFn,
  updater,
}: {
  queryClient: QueryClient;
  queryKey: QueryKey;
  mutationFn: (variables: TVariables) => Promise<TResult>;
  updater: (current: TQuery | undefined, variables: TVariables) => TQuery;
}): UseMutationOptions<TResult, Error, TVariables, OptimisticContext<TQuery>> {
  return {
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<TQuery>(queryKey);
      queryClient.setQueryData<TQuery>(queryKey, (current) => updater(current, variables));
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  };
}
