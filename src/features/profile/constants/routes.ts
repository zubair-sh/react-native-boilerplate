/**
 * Profile feature route constants.
 *
 * Import via the feature barrel: import { PROFILE_ROUTES } from '@features/profile'
 */
export const PROFILE_ROUTES = {
  INDEX: '/(app)/profile',
} as const;

export type ProfileRoute = (typeof PROFILE_ROUTES)[keyof typeof PROFILE_ROUTES];
