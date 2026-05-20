/**
 * Auth feature barrel export.
 *
 * RULE: Other features may ONLY import from this file, never from internals.
 *
 * ✅  import { useAuth } from '@features/auth';
 * ❌  import { authSlice } from '@features/auth/store/authSlice';
 */

// Public hooks (the only interfaces screens need)
export { useAuth } from './hooks/useAuth';
export { useMeQuery } from './services/authApi';

// Route constants (use for navigation, never hardcode strings)
export { AUTH_ROUTES } from './constants/routes';
export type { AuthRoute } from './constants/routes';

// API endpoint constants (use in createAuthBaseQuery calls)
export { AUTH_ENDPOINTS } from './constants/endpoints';
export type { AuthEndpoint } from './constants/endpoints';

// Types needed by other features (e.g. to type a user prop)
export type { User, AuthState } from './types/auth.types';
