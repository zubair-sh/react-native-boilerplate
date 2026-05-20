/**
 * Protected app layout — app/(app)/_layout.tsx
 *
 * Guards all (app) routes. Unauthenticated users are sent to login.
 */
import { Redirect, Stack } from 'expo-router';

import { AUTH_ROUTES, useAuth } from '@features/auth';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={AUTH_ROUTES.LOGIN} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: '',
      }}
    />
  );
}
