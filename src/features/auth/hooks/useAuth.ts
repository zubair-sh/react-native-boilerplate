/**
 * useAuth — the single interface between auth feature and all screens.
 *
 * Screens NEVER import from authSlice, authApi, or tokenStorage directly.
 * This hook is the auth feature's entire public API.
 *
 * @example
 * const { user, isAuthenticated, login, logout, isLoggingIn } = useAuth();
 */
import { useCallback } from 'react';

import { useAppDispatch } from '@shared/hooks/useAppDispatch';
import { useAppSelector } from '@shared/hooks/useAppSelector';

import { useLoginMutation, useRegisterMutation } from '../services/authApi';
import { logout as logoutAction } from '../store/authSlice';
import type { LoginRequest, RegisterRequest } from '../types/auth.types';

export function useAuth() {
  const dispatch = useAppDispatch();

  // ─── State ──────────────────────────────────────────────────────────────
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // ─── Mutations ───────────────────────────────────────────────────────────
  const [loginMutation, { isLoading: isLoggingIn, error: loginError, reset: resetLogin }] =
    useLoginMutation();
  const [
    registerMutation,
    { isLoading: isRegistering, error: registerError, reset: resetRegister },
  ] = useRegisterMutation();

  // ─── Actions ─────────────────────────────────────────────────────────────

  const login = useCallback(
    async (credentials: LoginRequest) => {
      return loginMutation(credentials).unwrap();
    },
    [loginMutation],
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      return registerMutation(data).unwrap();
    },
    [registerMutation],
  );

  const logout = useCallback(async () => {
    // Server clears the HttpOnly cookie via POST /auth/logout
    // Client just clears Redux state
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    // State
    user,
    isAuthenticated,

    // Auth actions
    login,
    register,
    logout,

    // Loading states
    isLoggingIn,
    isRegistering,

    // Errors
    loginError,
    registerError,

    // Reset helpers
    resetLogin,
    resetRegister,
  };
}
