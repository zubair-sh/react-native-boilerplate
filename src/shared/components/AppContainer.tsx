import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@theme/index';

interface AppContainerProps {
  children: React.ReactNode;
  /**
   * Applies horizontal + vertical padding using the theme spacing.lg token.
   * @default false
   */
  padded?: boolean;
  /**
   * Centers children vertically (justifyContent: 'center').
   * Ideal for auth / onboarding screens.
   * @default false
   */
  centered?: boolean;
  /**
   * Wraps content in a ScrollView. Use for long-form screens.
   * @default false
   */
  scroll?: boolean;
  /**
   * Wraps content in a KeyboardAvoidingView so the keyboard never covers inputs.
   * Always set this on screens that contain forms.
   * @default false
   */
  keyboardAvoiding?: boolean;
  /**
   * Respects device safe area insets (notch, home indicator).
   * Disable only for screens that intentionally render edge-to-edge.
   * @default true
   */
  safe?: boolean;
  /** Additional styles applied to the inner content container. */
  style?: ViewStyle;
}

export function AppContainer({
  children,
  padded = false,
  centered = false,
  scroll = false,
  keyboardAvoiding = false,
  safe = true,
  style,
}: AppContainerProps) {
  const { colors, spacing } = useTheme();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
    padding: padded ? spacing.lg : undefined,
    justifyContent: centered ? 'center' : undefined,
  };

  // Inner content node
  let content = scroll ? (
    <ScrollView
      style={styles.fill}
      contentContainerStyle={[containerStyle, style]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[containerStyle, style]}>{children}</View>
  );

  // Keyboard avoiding wrapper (forms)
  if (keyboardAvoiding) {
    content = (
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  // Safe area wrapper
  if (safe) {
    return (
      <SafeAreaView style={[styles.fill, { backgroundColor: colors.background }]}>
        {content}
      </SafeAreaView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
