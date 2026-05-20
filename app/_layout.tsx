/**
 * Root layout — app/_layout.tsx
 *
 * Responsibilities:
 *  1. Initialize i18n (side-effect import)
 *  2. Wrap the entire app in Redux Provider + PersistGate
 *  3. Apply the @shopify/restyle ThemeProvider (auto light/dark)
 *  4. Apply SafeAreaProvider so react-native-safe-area-context works everywhere
 *  5. Render the Expo Router <Stack>
 */
import '@i18n/index';

import { ThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@store/store';
import { darkTheme, theme } from '@theme/index';

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const activeTheme = colorScheme === 'dark' ? darkTheme : theme;

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeProvider theme={activeTheme}>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
