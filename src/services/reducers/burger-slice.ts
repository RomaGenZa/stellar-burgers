import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TBurgerConstructor, TIngredient } from '@utils-types';

interface BurgerState {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
  burgerConstructor: TBurgerConstructor;
  ingredientsData: TIngredient | null;
}

const initialState: BurgerState = {
  isIngredientsLoading: false,
  ingredients: [],
  burgerConstructor: {
    ingredients: []
  },
  ingredientsData: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.burgerConstructor.bun = ingredient;
      } else {
        state.burgerConstructor.ingredients.push(ingredient);
      }
    },
    removeIngredient(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > -1 && index < state.burgerConstructor.ingredients.length) {
        state.burgerConstructor.ingredients.splice(index, 1);
      }
    },
    moveUpIngredient(state, action: PayloadAction<number>) {
      const index = action.payload;
      const ingredients = state.burgerConstructor.ingredients;

      [ingredients[index], ingredients[index - 1]] = [
        ingredients[index - 1],
        ingredients[index]
      ];
    },
    moveDownIngredient(state, action: PayloadAction<number>) {
      const index = action.payload;
      const ingredients = state.burgerConstructor.ingredients;

      [ingredients[index], ingredients[index + 1]] = [
        ingredients[index + 1],
        ingredients[index]
      ];
    },
    clearIngredientsState(state) {
      state.ingredientsData = null;
    },
    updateIngredientsData(state, action: PayloadAction<string>) {
      const id = action.payload;
      const ingredient = state.ingredients.find(
        (ingredient) => ingredient._id === id
      );
      state.ingredientsData = ingredient ?? null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      }
    );
    builder.addCase(fetchIngredients.rejected, (state) => {
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
