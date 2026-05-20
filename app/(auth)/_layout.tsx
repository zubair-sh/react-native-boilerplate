/**
 * Auth group layout — app/(auth)/_layout.tsx
 *
 * If the user is already authenticated, redirect them straight to the app.
 */
import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@features/auth';
import { HOME_ROUTES } from '@features/home';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href={HOME_ROUTES.INDEX} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    />
  );
}
