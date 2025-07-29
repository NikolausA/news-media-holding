import type { NewsResponse } from "@shared/types/news";
import { API_BASE_URL } from "@shared/config/api";

interface GetNewsParams {
  limit: number;
  skip: number;
}

export const getNews = async ({
  limit,
  skip,
}: GetNewsParams): Promise<NewsResponse> => {
  const res = await fetch(`${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`);

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data: NewsResponse = await res.json();
  return data;
};
