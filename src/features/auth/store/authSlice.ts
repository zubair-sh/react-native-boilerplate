import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthCredentials, AuthState } from '../types/auth.types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Called after a successful login or register.
     * Tokens are NOT stored here — they live in HTTP cookies managed by
     * the native networking layer (NSURLSession on iOS, OkHttp on Android).
     */
    setCredentials: (state, action: PayloadAction<AuthCredentials>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    /**
     * Called on explicit logout or unrecoverable 401.
     * The server is responsible for clearing the cookie on the logout endpoint.
     */
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
