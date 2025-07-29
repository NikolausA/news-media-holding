import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { NewsPost } from "@shared/types/news";
import { getNews } from "@shared/api/news-api";

interface NewsState {
  items: NewsPost[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: NewsState = {
  items: [],
  isLoading: false,
  error: null,
  page: 0,
  limit: 10,
  hasMore: true,
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { news: NewsState };
      const { page, limit } = state.news;
      const skip = page * limit;

      const data = await getNews({ limit, skip });
      return data.posts;
    } catch (e) {
      console.error(e);
      return rejectWithValue("Ошибка загрузки новостей");
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    resetNews: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(...action.payload);
        state.page += 1;
        if (action.payload.length < state.limit) {
          state.hasMore = false;
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetNews } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
