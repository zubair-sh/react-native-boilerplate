/**
 * Auth RTK Query API — src/features/auth/services/authApi.ts
 *
 * Cookie-based auth: the server sets access + refresh tokens as HttpOnly cookies.
 *
 * Mock mode: set EXPO_PUBLIC_USE_MOCK=true in .env — the entire baseQuery is
 * swapped to createMockBaseQuery(AUTH_MOCK_HANDLERS). Endpoints stay unchanged.
 */
import { createApi } from '@reduxjs/toolkit/query/react';

import { IS_MOCK } from '@shared/services/api';
import { authBaseQuery } from '@shared/services/baseQuery';
import { createMockBaseQuery } from '@shared/services/mockBaseQuery';

import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { AUTH_MOCK_HANDLERS } from '../mocks/auth.mocks';
import { setCredentials } from '../store/authSlice';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth.types';

// ─── API definition ───────────────────────────────────────────────────────────

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: IS_MOCK ? createMockBaseQuery(AUTH_MOCK_HANDLERS) : authBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: AUTH_ENDPOINTS.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user }));
        } catch {
          // Errors surface via isError in the component
        }
      },
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: AUTH_ENDPOINTS.REGISTER,
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user }));
        } catch {
          // handled by RTK Query
        }
      },
    }),

    me: builder.query<User, void>({
      query: () => ({ url: AUTH_ENDPOINTS.ME, method: 'GET' }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data }));
        } catch {
          // 401 handled by authBaseQuery (auto-refresh + logout)
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
