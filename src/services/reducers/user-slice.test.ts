import {
  userSlice,
  register,
  login,
  logout,
  getUser,
  getOrders,
  initialState, updateUser
} from './user-slice';
import { TUser } from '@utils-types';

describe('Тестирование userSlice', () => {
  const mockUser: TUser = {
    email: 'email@test.com',
    name: 'user'
  };

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

  test('Тестрование register.pending', () => {
    const action = { type: register.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthenticating).toBe(true);
    expect(state.user).toEqual(null);
  });

  test('Тестрование register.fulfilled', () => {
    const action = {
      type: register.fulfilled.type,
      payload: mockUser
    };

    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticating).toBe(false);
  });

  test('Тестрование register.rejected', () => {
    const action = { type: register.rejected.type, payload: 'REJECTED' };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthenticating).toBe(false);
    expect(state.user).toEqual(null);
  });

  test('Тестрование login.pending', () => {
    const action = { type: login.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.loginError).toEqual('');
    expect(state.isAuthenticating).toBe(true);
    expect(state.user).toEqual(null);
  });

  test('Тестрование login.fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: mockUser
    };

    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticating).toBe(false);
  });

  test('Тестрование login.rejected', () => {
    const action = {
      type: login.rejected.type,
      payload: { message: 'REJECTED' }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthenticating).toBe(false);
    expect(state.user).toEqual(null);
    expect(state.loginError).toEqual('REJECTED');
  });

  test('Тестрование logout.pending', () => {
    const userState = {
      ...initialState,
      user: mockUser
    };

    const action = { type: logout.pending.type };
    const state = userSlice.reducer(userState, action);

    expect(state.isAuthenticating).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  test('Тестрование logout.fulfilled', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: mockUser
    };

    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(null);
    expect(state.isAuthenticating).toBe(false);
  });

  test('Тестрование logout.rejected', () => {
    const action = { type: logout.rejected.type };

    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthenticating).toBe(false);
    expect(state.user).toEqual(null);
  });

  test('Тестрование getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthenticating).toBe(true);
    expect(state.user).toEqual(null);
  });

  test('Тестрование getUser.fulfilled', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: mockUser
    };

    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(null);
    expect(state.isAuthenticating).toBe(false);
  });

  test('Тестрование getUser.rejected', () => {
    const action = { type: logout.rejected.type };

    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthenticating).toBe(false);
    expect(state.user).toEqual(null);
  });

  test('Тестрование updateUser.pending', () => {
    const userState = {
      ...initialState,
      user: mockUser
    };

    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(userState, action);

    expect(state.isAuthenticating).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  test('Тестрование updateUser.fulfilled', () => {
    const userState = {
      ...initialState,
      user: mockUser
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        ...mockUser,
        email: 'someother@email.com'
      }
    };

    const state = userSlice.reducer(userState, action);

    expect(state.user?.email).toEqual('someother@email.com');
    expect(state.isAuthenticating).toBe(false);
    expect(state.updateUserError).toEqual('');
  });

  test('Тестрование updateUser.rejected', () => {
    const userState = {
      ...initialState,
      user: mockUser
    };

    const action = { type: updateUser.rejected.type, payload: { message: 'REJECTED' } };

    const state = userSlice.reducer(userState, action);

    expect(state.isAuthenticating).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.updateUserError).toBe('REJECTED');
  });

  test('Тестрование getOrders.fulfilled', () => {
    const userState = {
      ...initialState,
      user: mockUser
    };

    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    };

    const state = userSlice.reducer(userState, action);

    expect(state.orders).toEqual(mockOrders);
  });
});
