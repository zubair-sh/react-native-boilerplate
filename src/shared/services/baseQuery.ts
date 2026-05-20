/**
 * Shared authenticated base query — src/shared/services/baseQuery.ts
 *
 * A single RTK Query base query that:
 *  1. Reads API_BASE_URL from the shared environment config.
 *  2. Sends cookies on every request via credentials: 'include'.
 *  3. On 401 — silently calls the refresh-tokens endpoint (cookie sent automatically).
 *  4. On refresh success — retries the original request.
 *  5. On refresh failure — dispatches logout() and returns the 401 error.
 */
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { logout } from '@features/auth/store/authSlice';

import { API_BASE_URL } from './api';

/** RTK Query BaseQueryFn alias used throughout the app. */
export type AppBaseQueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

const REFRESH_URL = '/v1/auth/refresh-tokens';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
});

/**
 * Authenticated base query with automatic cookie-based token refresh.
 * Use directly in createApi — no configuration needed.
 *
 * @example
 *   export const myApi = createApi({ baseQuery: authBaseQuery, ... });
 */
export const authBaseQuery: AppBaseQueryFn = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Hit the refresh endpoint — refresh cookie is sent automatically
    const refreshResult = await rawBaseQuery(
      { url: REFRESH_URL, method: 'POST' },
      api,
      extraOptions,
    );

    if (refreshResult.data !== undefined) {
      // New cookies set by server — retry the original request
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Refresh failed — session expired, force logout
      api.dispatch(logout());
    }
  }

  return result;
};
