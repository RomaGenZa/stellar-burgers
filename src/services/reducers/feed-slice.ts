import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

interface FeedState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: FeedState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state) => {
      state.isLoading;
    });
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.orders = action.payload.orders;
    });
    builder.addCase(fetchFeed.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const fetchFeed = createAsyncThunk(
  'feed/fetch-feed',
  async (_, thunkApi) => {
    try {
      return await getFeedsApi();
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
