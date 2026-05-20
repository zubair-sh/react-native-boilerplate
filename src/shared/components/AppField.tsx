import { useState } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from 'react-native';

import { useTheme } from '@theme/index';

// ─── Type presets ─────────────────────────────────────────────────────────────

/**
 * Convenience shorthand that pre-configures keyboard, autoCapitalize,
 * autoComplete, and secureTextEntry. Explicit props still override presets.
 */
export type AppFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'newPassword'
  | 'confirmPassword'
  | 'phone'
  | 'number'
  | 'name';

type PresetConfig = Pick<
  TextInputProps,
  'keyboardType' | 'autoCapitalize' | 'autoComplete' | 'secureTextEntry'
>;

const TYPE_PRESETS: Record<AppFieldType, PresetConfig> = {
  text: {},
  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
  },
  password: {
    secureTextEntry: true,
    autoCapitalize: 'none',
    autoComplete: 'password',
  },
  newPassword: {
    secureTextEntry: true,
    autoCapitalize: 'none',
    autoComplete: 'new-password',
  },
  confirmPassword: {
    secureTextEntry: true,
    autoCapitalize: 'none',
    autoComplete: 'new-password',
  },
  phone: {
    keyboardType: 'phone-pad',
    autoComplete: 'tel',
  },
  number: {
    keyboardType: 'number-pad',
  },
  name: {
    autoCapitalize: 'words',
    autoComplete: 'name',
  },
};

// ─── Component props ──────────────────────────────────────────────────────────

interface AppFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  /** react-hook-form control object from useForm() */
  control: Control<TFieldValues>;
  /** Field name — must match a key in your form values type */
  name: TName;
  /** Validation rules (not needed when using zodResolver) */
  rules?: RegisterOptions<TFieldValues, TName>;
  /** Optional label rendered above the input */
  label?: string;
  /**
   * Input type preset — auto-configures keyboard, autoComplete, secureTextEntry.
   * Explicit TextInput props still take priority over the preset.
   * Defaults to 'text'.
   */
  type?: AppFieldType;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AppField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  rules,
  label,
  type = 'text',
  secureTextEntry,
  ...inputProps
}: AppFieldProps<TFieldValues, TName>) {
  const { colors, spacing, borderRadii } = useTheme();

  const preset = TYPE_PRESETS[type];

  // Explicit prop wins over preset; preset wins over default
  const isPassword = secureTextEntry ?? preset.secureTextEntry ?? false;
  const [isSecureVisible, setIsSecureVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error, isTouched } }) => {
        const hasError = !!error && isTouched;

        return (
          <View style={[styles.wrapper, { marginBottom: spacing.md }]}>
            {label ? (
              <Text
                style={[styles.label, { color: hasError ? colors.error : colors.textSecondary }]}
              >
                {label}
              </Text>
            ) : null}

            <View
              style={[
                styles.inputWrapper,
                {
                  borderColor: hasError ? colors.error : colors.inputBorder,
                  backgroundColor: colors.inputBackground,
                  borderRadius: borderRadii.md,
                },
              ]}
            >
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                value={value as string}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor={colors.textDisabled}
                // Merge: preset first, then explicit props override
                {...preset}
                {...inputProps}
                // secureTextEntry is handled separately for the toggle
                secureTextEntry={isPassword && !isSecureVisible}
              />

              {isPassword ? (
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsSecureVisible((v) => !v)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={[styles.eyeIcon, { color: colors.textSecondary }]}>
                    {isSecureVisible ? '🙈' : '👁'}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {hasError ? (
              <Text style={[styles.errorText, { color: colors.error }]}>{error.message}</Text>
            ) : null}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  eyeButton: {
    paddingLeft: 8,
  },
  eyeIcon: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
