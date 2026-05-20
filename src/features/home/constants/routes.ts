/**
 * Home feature route constants.
 *
 * Import via the feature barrel: import { HOME_ROUTES } from '@features/home'
 */
export const HOME_ROUTES = {
  INDEX: '/(app)',
} as const;

export type HomeRoute = (typeof HOME_ROUTES)[keyof typeof HOME_ROUTES];
