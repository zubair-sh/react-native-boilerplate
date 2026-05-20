// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

// ─── Auth state (Redux slice) ─────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// ─── API payloads ─────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * API returns only the user — access and refresh tokens are set as HTTP cookies
 * by the server and are managed automatically by the native HTTP layer.
 */
export interface AuthResponse {
  user: User;
}

// ─── Credentials (passed to setCredentials action) ───────────────────────────

export type AuthCredentials = Pick<AuthState, 'user'>;
