/**
 * Redux Store
 *
 * - redux-persist whitelists only 'auth' (minimal persisted surface area)
 * - AsyncStorage is the persist adapter (expo-secure-store is for raw tokens only,
 *   it has a 2 KB per-key limit — not suitable for the full state blob)
 * - RTK Query middleware is wired in for cache invalidation and refetching
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { authApi } from '@features/auth/services/authApi';
import { apiLogger } from '@shared/services/apiLogger';

import { rootReducer } from './rootReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  /**
   * Only persist the auth slice.
   * Sensitive tokens are NOT stored here — they live in expo-secure-store.
   * This only persists non-sensitive auth state (user profile, isAuthenticated).
   */
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches non-serializable actions internally — ignore them
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, apiLogger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
