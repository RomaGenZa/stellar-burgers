import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi, getOrderByNumberApi, orderBurgerApi } from '@api';
import {
  TBurgerConstructor,
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface BurgerState {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
  burgerConstructor: TBurgerConstructor;
  ingredientsData: TIngredient | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: BurgerState = {
  isIngredientsLoading: false,
  ingredients: [],
  burgerConstructor: {
    ingredients: []
  },
  ingredientsData: null,
  orderRequest: false,
  orderModalData: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => ({
        payload: {
          id: uuidv4(),
          ...ingredient
        }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.burgerConstructor.bun = ingredient;
        } else {
          state.burgerConstructor.ingredients.push(ingredient);
        }
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.burgerConstructor.ingredients.findIndex(
        (item) => id === item.id
      );

      if (index > -1) {
        state.burgerConstructor.ingredients.splice(index, 1);
      }
    },
    moveUpIngredient(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.burgerConstructor.ingredients.findIndex(
        (item) => id === item.id
      );
      const ingredients = state.burgerConstructor.ingredients;

      if (index > 0) {
        [ingredients[index], ingredients[index - 1]] = [
          ingredients[index - 1],
          ingredients[index]
        ];
      }
    },
    moveDownIngredient(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.burgerConstructor.ingredients.findIndex(
        (item) => id === item.id
      );
      const ingredients = state.burgerConstructor.ingredients;

      if (
        index > -1 &&
        index < state.burgerConstructor.ingredients.length - 1
      ) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
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
    },
    clearOrderData(state) {
      state.orderModalData = null;
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
    builder.addCase(orderBurger.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
      state.burgerConstructor = initialState.burgerConstructor;
    });
    builder.addCase(orderBurger.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(getOrderByNumber.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.orderRequest = false;
      const orders = action.payload.orders;
      if (orders.length > 0) {
        state.orderModalData = action.payload.orders[0];
      } else {
        state.orderModalData = null;
      }
    });
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.orderRequest = true;
      state.orderModalData = null;
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

export const orderBurger = createAsyncThunk(
  'burger/order_burger',
  async (data: string[], thunkApi) => {
    try {
      return await orderBurgerApi(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'burger/get_order_burger',
  async (data: number, thunkAPI) => {
    try {
      return await getOrderByNumberApi(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
