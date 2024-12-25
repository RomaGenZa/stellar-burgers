import {
  burgerSlice,
  fetchIngredients,
  initialState,
  orderBurger
} from './burger-slice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('Тестирование burgerSlice', () => {
  const mockIngredient1: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa093e',
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main'
  } as TConstructorIngredient;

  const mockIngredient2: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0941',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main'
  } as TConstructorIngredient;

  test('Тестирование экшена добавления ингредиента', () => {
    const action = burgerSlice.actions.addIngredient(mockIngredient1);
    const state = burgerSlice.reducer(initialState, action);

    expect(state.burgerConstructor.ingredients).toHaveLength(1);
    expect(state.burgerConstructor.ingredients[0]).toEqual(mockIngredient1);
  });

  test('Тестирование экшена удаления ингредиента', () => {
    const initialStateWithIngredient = {
      ...initialState,
      burgerConstructor: {
        ingredients: [mockIngredient1]
      }
    };

    const action = burgerSlice.actions.removeIngredient(mockIngredient1.id);
    const state = burgerSlice.reducer(initialStateWithIngredient, action);

    expect(state.burgerConstructor.ingredients).toHaveLength(0);
  });

  test('Тестирование экшена перемещения ингредиента вверх', () => {
    const initialStateWithIngredient = {
      ...initialState,
      burgerConstructor: {
        ingredients: [mockIngredient1, mockIngredient2]
      }
    };

    const action = burgerSlice.actions.moveUpIngredient(mockIngredient2.id);
    const state = burgerSlice.reducer(initialStateWithIngredient, action);

    expect(state.burgerConstructor.ingredients[0]).toEqual(mockIngredient2);
    expect(state.burgerConstructor.ingredients[1]).toEqual(mockIngredient1);
  });

  test('Тестирование экшена перемещения ингредиента вниз', () => {
    const initialStateWithIngredient = {
      ...initialState,
      burgerConstructor: {
        ingredients: [mockIngredient1, mockIngredient2]
      }
    };

    const action = burgerSlice.actions.moveDownIngredient(mockIngredient1.id);
    const state = burgerSlice.reducer(initialStateWithIngredient, action);

    expect(state.burgerConstructor.ingredients[0]).toEqual(mockIngredient2);
    expect(state.burgerConstructor.ingredients[1]).toEqual(mockIngredient1);
  });

  test('Тестрование fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = burgerSlice.reducer(initialState, action);

    expect(state.isIngredientsLoading).toBe(true);
    expect(state.ingredients).toEqual([]);
  });

  it('Тестрование fetchIngredients.fulfilled', () => {
    const ingredients: TIngredient[] = [mockIngredient1, mockIngredient2];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };

    const state = burgerSlice.reducer(initialState, action);

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  it('Тестрование fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = burgerSlice.reducer(initialState, action);

    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toEqual([]);
  });

  test('Тестрование orderBurger.pending', () => {
    const ingredients = [mockIngredient1, mockIngredient2];
    const ingredientsState = {
      ...initialState,
      ingredients: ingredients
    };

    const action = { type: orderBurger.pending.type };
    const state = burgerSlice.reducer(ingredientsState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.ingredients).toEqual(ingredients);
  });

  test('Тестрование orderBurger.fulfilled', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: [mockIngredient1._id, mockIngredient2._id]
    };

    const state = burgerSlice.reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.ingredients).toEqual([]);
  });

  test('Тестрование orderBurger.rejected', () => {
    const ingredients = [mockIngredient1, mockIngredient2];
    const ingredientsState = {
      ...initialState,
      ingredients: ingredients
    };

    const action = { type: orderBurger.rejected.type };
    const state = burgerSlice.reducer(ingredientsState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });
});
