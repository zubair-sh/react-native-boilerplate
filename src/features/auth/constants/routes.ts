/**
 * Auth feature route constants.
 *
 * RULE: These are the only place auth route strings are defined.
 * Import via the feature barrel: import { AUTH_ROUTES } from '@features/auth'
 */
export const AUTH_ROUTES = {
  LOGIN: '/(auth)/login',
  REGISTER: '/(auth)/register',
  FORGOT_PASSWORD: '/(auth)/forgot-password',
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
