/**
 * Token Storage — src/shared/services/tokenStorage.ts
 *
 * Secure, encrypted on-device storage for JWT tokens via expo-secure-store.
 *
 * Design decisions:
 *  - Raw token strings NEVER go into Redux / AsyncStorage (not encrypted).
 *  - Redux holds only non-sensitive state: user profile + isAuthenticated flag.
 *  - This service is the single source of truth for token read/write.
 *
 * Lives in shared/ because it has no feature-specific logic — any feature
 * that needs to attach auth headers uses this directly.
 */
import * as SecureStore from 'expo-secure-store';

const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const tokenStorage = {
  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, accessToken),
      SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, refreshToken),
    ]);
  },

  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
  },

  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
  },

  async clearTokens(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
    ]);
  },
};
