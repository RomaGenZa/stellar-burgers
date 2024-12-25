import { feedSlice, fetchFeed, initialState } from './feed-slice';

describe('Тестирование feedSlice', () => {
  const mockOrders = [
    {
      _id: '67694f7b750864001d373bba',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2024-12-23T11:54:35.570Z',
      updatedAt: '2024-12-23T11:54:36.526Z',
      number: 63840
    },
    {
      _id: '67694f67750864001d373bb9',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2024-12-23T11:54:15.812Z',
      updatedAt: '2024-12-23T11:54:16.812Z',
      number: 63839
    }
  ];

  test('Тестрование fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  test('Тестрование fetchFeed.fulfilled', () => {
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: {
        total: mockOrders.length,
        totalToday: mockOrders.length,
        orders: mockOrders
      }
    };

    const state = feedSlice.reducer(initialState, action);

    expect(state.totalToday).toBe(mockOrders.length);
    expect(state.total).toEqual(mockOrders.length);
    expect(state.orders).toEqual(mockOrders);
    expect(state.isLoading).toBe(false);
  });

  test('Тестрование fetchFeed.rejected', () => {
    const action = { type: fetchFeed.rejected.type };
    const state = feedSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });
});
