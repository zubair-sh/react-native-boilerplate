import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@theme/index';

type Variant = 'primary' | 'secondary' | 'danger';

interface AppButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  loading?: boolean;
  variant?: Variant;
  fullWidth?: boolean;
  /** Extra styles applied to the TouchableOpacity — use for margins/positioning. */
  style?: ViewStyle;
}

export function AppButton({
  title,
  loading = false,
  variant = 'primary',
  fullWidth = true,
  disabled,
  style,
  ...rest
}: AppButtonProps) {
  const { colors, spacing, borderRadii } = useTheme();
  const isDisabled = disabled || loading;

  const bgColor: Record<Variant, string> = {
    primary: colors.buttonPrimary,
    secondary: colors.buttonSecondary,
    danger: colors.error,
  };

  const textColor: Record<Variant, string> = {
    primary: colors.buttonPrimaryText,
    secondary: colors.buttonSecondaryText,
    danger: '#FFFFFF',
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor: bgColor[variant],
          borderRadius: borderRadii.md,
          paddingHorizontal: spacing.lg,
          opacity: isDisabled ? 0.55 : 1,
          alignSelf: fullWidth ? 'stretch' : 'auto',
        },
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.75}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor[variant]} size="small" />
      ) : (
        <Text style={[styles.label, { color: textColor[variant] }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
