/**
 * Auth RTK Query API — src/features/auth/services/authApi.ts
 *
 * Cookie-based auth: the server sets access + refresh tokens as HttpOnly cookies.
 * No token storage needed — the native HTTP layer manages cookies automatically.
 */
import { createApi } from '@reduxjs/toolkit/query/react';

import { authBaseQuery } from '@shared/services/baseQuery';

import { AUTH_ENDPOINTS } from '../constants/endpoints';
import { setCredentials } from '../store/authSlice';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth.types';

// ─── API definition ───────────────────────────────────────────────────────────

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: authBaseQuery,
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
          // Server sets tokens as HttpOnly cookies — just store the user in Redux
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
          // Keep Redux user state fresh from the server
          dispatch(setCredentials({ user: data }));
        } catch {
          // 401 handled by authBaseQuery (auto-refresh + logout)
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
