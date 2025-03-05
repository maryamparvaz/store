
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from '../redux/cartSlice';
import authReducer from '../redux/authSlice';
import { loadState, saveState } from '../utils/persistState';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
});

const persistedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
