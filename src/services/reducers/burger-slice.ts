import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface BurgerState {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
}

const initialState: BurgerState = {
  isIngredientsLoading: false,
  ingredients: []
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      }
    );
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isIngredientsLoading = false;
      state.ingredients = [];
    });
  }
});

export const fetchIngredients = createAsyncThunk(
  'burger/fetch_ingredients',
  async (_, thunkApi) => {
    try {
      return await getIngredientsApi();
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
