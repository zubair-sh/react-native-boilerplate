/**
 * Auth API endpoint constants.
 *
 * RULE: Every URL string used in authApi must come from here.
 * Import via the feature barrel: import { AUTH_ENDPOINTS } from '@features/auth'
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/v1/auth/login',
  REGISTER: '/v1/auth/register',
  REFRESH: '/v1/auth/refresh-tokens',
  LOGOUT: '/v1/auth/logout',
  ME: '/v1/users/me',
} as const;

export type AuthEndpoint = (typeof AUTH_ENDPOINTS)[keyof typeof AUTH_ENDPOINTS];
