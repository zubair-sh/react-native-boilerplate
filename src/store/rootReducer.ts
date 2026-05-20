/**
 * Root Reducer
 *
 * Add feature slices and RTK Query API reducers here.
 * Each feature owns its own slice — import only the default export.
 */
import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '@features/auth/services/authApi';
import authReducer from '@features/auth/store/authSlice';

export const rootReducer = combineReducers({
  // ─── Feature slices ──────────────────────────────────────────────────────
  auth: authReducer,

  // ─── RTK Query API reducers ───────────────────────────────────────────────
  [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
