import { TOrder, TUser } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

interface UserState {
  isAuthenticating: boolean;
  user: TUser | null;
  orders: TOrder[];
}

const userString = localStorage.getItem('user');
const initialState: UserState = {
  isAuthenticating: false,
  user: userString ? JSON.parse(userString) : null,
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isAuthenticating = true;
    });

    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.isAuthenticating = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    );

    builder.addCase(register.rejected, (state) => {
      state.isAuthenticating = false;
      state.user = null;
      localStorage.removeItem('user');
    });

    builder.addCase(logout.pending, (state) => {
      state.isAuthenticating = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticating = false;
      state.user = null;
      localStorage.removeItem('user');
    });

    builder.addCase(logout.rejected, (state) => {
      state.isAuthenticating = false;
      state.user = null;
      localStorage.removeItem('user');
    });

    builder.addCase(login.pending, (state) => {
      state.isAuthenticating = true;
    });

    builder.addCase(login.fulfilled, (state, action: PayloadAction<TUser>) => {
      state.isAuthenticating = false;
      state.user = action.payload;
    });

    builder.addCase(login.rejected, (state) => {
      state.isAuthenticating = false;
      state.user = null;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isAuthenticating = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      state.user = action.payload;
    });

    builder.addCase(getUser.rejected, (state) => {
      state.isAuthenticating = false;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isAuthenticating = true;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      state.user = action.payload;
    });

    builder.addCase(updateUser.rejected, (state) => {
      state.isAuthenticating = false;
    });

    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, thunkApi) => {
    try {
      const response = await registerUserApi(data);
      return response.user;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData, thunkApi) => {
    try {
      const response = await loginUserApi(data);
      return response.user;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    return await logoutApi();
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const getUser = createAsyncThunk(
  'user/get-user',
  async (_, thunkApi) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update-user',
  async (data: Partial<TUser>, thunkApi) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const getOrders = createAsyncThunk(
  'user/get-orders',
  async (_, thunkApi) => {
    try {
      return await getOrdersApi();
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
