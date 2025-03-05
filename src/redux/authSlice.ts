
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

export const ADMIN_EMAIL = 'admin@example.com';
export const ADMIN_PASSWORD = 'admin123';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        state.user = { email, isAdmin: true };
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid email or password';
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { login, logout, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
