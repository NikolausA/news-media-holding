import type { RootState } from "@app/providers/store";

export const newsSelectors = {
  items: (state: RootState) => state.news.items,
  isLoading: (state: RootState) => state.news.isLoading,
  error: (state: RootState) => state.news.error,
  hasMore: (state: RootState) => state.news.hasMore,
};
