/**
 * API Logger Middleware — src/shared/services/apiLogger.ts
 *
 * RTK Query middleware that logs every fulfilled response and rejected query
 * in development. In production it logs only errors (replace with your
 * crash/analytics SDK — e.g. Sentry, Firebase Crashlytics).
 *
 * Registration: add `apiLogger` to the middleware chain in src/store/store.ts
 *
 *   .concat(authApi.middleware, apiLogger)
 */
import { isFulfilled, isRejectedWithValue, type Middleware } from '@reduxjs/toolkit';

import { IS_DEV } from './api';

// Logger is the one legitimate place for console — disable the rule file-wide
/* eslint-disable no-console */

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TAG = '[API]';

function logSuccess(endpoint: string, arg: unknown, data: unknown) {
  console.log(`${TAG} ✓ ${endpoint}`, IS_DEV ? { arg, data } : '');
}

function logError(endpoint: string, arg: unknown, status: unknown, data: unknown) {
  console.warn(`${TAG} ✗ ${endpoint} [${status}]`, IS_DEV ? { arg, error: data } : { status });
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export const apiLogger: Middleware = () => (next) => (action) => {
  // ── Fulfilled (only log in dev to avoid noise in prod) ──────────────────
  if (IS_DEV && isFulfilled(action)) {
    const meta = action.meta as {
      arg?: { endpointName?: string; originalArgs?: unknown };
    };
    const endpoint = meta?.arg?.endpointName ?? 'unknown';
    const arg = meta?.arg?.originalArgs;
    logSuccess(endpoint, arg, action.payload);
  }

  // ── Rejected (log in all envs — replace console.warn with Sentry etc.) ──
  if (isRejectedWithValue(action)) {
    const meta = action.meta as {
      arg?: { endpointName?: string; originalArgs?: unknown };
    };
    const payload = action.payload as {
      status?: number | string;
      data?: unknown;
      error?: string;
    };

    const endpoint = meta?.arg?.endpointName ?? 'unknown';
    const arg = meta?.arg?.originalArgs;
    const status = payload?.status ?? 'UNKNOWN';
    const data = payload?.data ?? payload?.error;

    logError(endpoint, arg, status, data);

    // TODO: replace with your crash reporter in production
    // if (!IS_DEV) Sentry.captureException(new Error(`API ${endpoint} failed`), { extra: { status, data } });
  }

  return next(action);
};
