/**
 * Mock base query factory — src/shared/services/mockBaseQuery.ts
 *
 * Creates a RTK Query base query that intercepts requests and returns
 * hardcoded mock data instead of making real HTTP calls.
 *
 * Usage:
 *   import { createMockBaseQuery } from '@shared/services/mockBaseQuery';
 *
 *   const mockHandlers: MockHandlers = {
 *     '/v1/auth/me': () => MOCK_USER,
 *     '/v1/auth/login': () => MOCK_AUTH_RESPONSE,
 *   };
 *
 *   createApi({ baseQuery: IS_MOCK ? createMockBaseQuery(mockHandlers) : authBaseQuery })
 */
import type { AppBaseQueryFn } from './baseQuery';

/** Map of URL path → handler that returns mock data for that endpoint. */
export type MockHandlers = Record<string, () => unknown>;

/**
 * Creates a base query that returns mock data keyed by URL path.
 * Simulates a 100ms network delay so loading states are visible.
 */
export const createMockBaseQuery =
  (handlers: MockHandlers): AppBaseQueryFn =>
  async (args) => {
    const url = typeof args === 'string' ? args : (args as { url: string }).url;

    // Simulate network latency so loading spinners are testable
    await new Promise((resolve) => setTimeout(resolve, 100));

    const handler = handlers[url];
    if (handler) {
      return { data: handler() };
    }

    // No handler registered — treat as a 404
    console.warn(`[Mock] No handler for: ${url}`);
    return { error: { status: 404, data: `No mock handler for ${url}` } };
  };
