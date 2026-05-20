/**
 * Shared API service — src/shared/services/api.ts
 *
 * Provides the base URL and a factory for creating RTK Query base queries.
 * All feature APIs should import from here instead of reading env vars directly.
 *
 * Usage:
 *   // Unauthenticated feature API
 *   const rawQuery = createRawBaseQuery('/v1/public');
 *
 *   // Authenticated feature API (re-uses auth feature's reauth wrapper)
 *   import { baseQueryWithReauth } from '@features/auth';
 */
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

// ─── Environment ──────────────────────────────────────────────────────────────

/**
 * Root API URL — set EXPO_PUBLIC_API_BASE_URL in your .env file.
 * Falls back to the example URL so the app doesn't hard-crash without .env.
 */
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.example.com';

/**
 * App environment — 'development' | 'staging' | 'production'.
 * Use this to conditionally enable logging, Flipper, etc.
 */
export const APP_ENV =
  (process.env.EXPO_PUBLIC_APP_ENV as 'development' | 'staging' | 'production') ?? 'development';

export const IS_DEV = APP_ENV === 'development';

/**
 * When true, all queryFn endpoints return hardcoded mock data.
 * Controlled by EXPO_PUBLIC_USE_MOCK in your .env file.
 * Set to 'false' once your backend is ready.
 */
export const IS_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

// ─── Base query factory ───────────────────────────────────────────────────────

/**
 * Creates an **unauthenticated** RTK Query base query rooted at API_BASE_URL.
 *
 * @param basePath - Optional path appended to API_BASE_URL (e.g. '/v1').
 *
 * For **authenticated** requests, use baseQueryWithReauth from @features/auth.
 */
export const createRawBaseQuery = (basePath = '') =>
  fetchBaseQuery({ baseUrl: `${API_BASE_URL}${basePath}` });

// ─── Shared types ─────────────────────────────────────────────────────────────

/** RTK Query BaseQueryFn type alias — use for typing custom base queries. */
export type AppBaseQueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
