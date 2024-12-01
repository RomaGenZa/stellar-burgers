import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerSlice } from './reducers/burger-slice';
import { feedSlice } from './reducers/feed-slice';
import { loginSlice } from './reducers/login-slice';

const rootReducer = combineReducers({
  burger: burgerSlice.reducer,
  feed: feedSlice.reducer,
  user: loginSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
