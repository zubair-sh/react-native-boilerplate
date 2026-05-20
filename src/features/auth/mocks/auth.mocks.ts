/**
 * Auth mock data — src/features/auth/mocks/auth.mocks.ts
 *
 * Edit values here to match your real API response shape.
 * Handlers are keyed by URL path — one entry per endpoint.
 *
 * Remove this file once your backend is ready and set EXPO_PUBLIC_USE_MOCK=false.
 */
import type { MockHandlers } from '@shared/services/mockBaseQuery';

import { AUTH_ENDPOINTS } from '../constants/endpoints';
import type { AuthResponse, User } from '../types/auth.types';

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_USER: User = {
  id: 'mock-user-001',
  email: 'dev@example.com',
  firstName: 'Dev',
  lastName: 'User',
};

export const MOCK_AUTH_RESPONSE: AuthResponse = {
  user: MOCK_USER,
};

// ─── Handler map ──────────────────────────────────────────────────────────────

export const AUTH_MOCK_HANDLERS: MockHandlers = {
  [AUTH_ENDPOINTS.LOGIN]: () => MOCK_AUTH_RESPONSE,
  [AUTH_ENDPOINTS.REGISTER]: () => MOCK_AUTH_RESPONSE,
  [AUTH_ENDPOINTS.ME]: () => MOCK_USER,
  [AUTH_ENDPOINTS.LOGOUT]: () => ({}),
};
