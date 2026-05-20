import { Text, type TextProps, type TextStyle } from 'react-native';

import type { SpacingKey, Theme } from '@theme/index';
import { useTheme } from '@theme/index';

// All variant keys from the theme (excludes 'defaults' which is internal)
type TextVariant = Exclude<keyof Theme['textVariants'], 'defaults'>;

// All color token keys from the theme
type TextColor = keyof Theme['colors'];

interface AppTextProps extends Omit<TextProps, 'style'> {
  /**
   * Maps to a textVariant defined in src/theme/index.ts.
   * Sets fontSize, fontWeight, lineHeight, and default color automatically.
   * Defaults to 'body'.
   */
  variant?: TextVariant;
  /**
   * Overrides the variant's default color with any theme color token.
   * @example color="textSecondary"
   */
  color?: TextColor;
  /** Text alignment shorthand */
  align?: TextStyle['textAlign'];
  /** Additional styles merged after variant + color */
  style?: TextStyle;

  // ─── Spacing shorthands (theme token keys, not raw pixels) ───────────────
  /** margin-top */
  mt?: SpacingKey;
  /** margin-bottom */
  mb?: SpacingKey;
  /** margin-left */
  ml?: SpacingKey;
  /** margin-right */
  mr?: SpacingKey;
  /** margin-horizontal (left + right) */
  mx?: SpacingKey;
  /** margin-vertical (top + bottom) */
  my?: SpacingKey;
}

export function AppText({
  variant = 'body',
  color,
  align,
  style,
  children,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  ...rest
}: AppTextProps) {
  const { textVariants, colors, spacing } = useTheme();

  const variantStyle = textVariants[variant] as {
    fontSize: number;
    lineHeight?: number;
    fontWeight?: TextStyle['fontWeight'];
    color: TextColor;
  };

  // Resolve color: explicit prop > variant default > falls back to textPrimary
  const resolvedColor = colors[color ?? (variantStyle.color as TextColor)] ?? colors.textPrimary;

  // Resolve spacing shorthands — mx/my are overridden by individual mt/mb/ml/mr
  const marginTop = mt ? spacing[mt] : my ? spacing[my] : undefined;
  const marginBottom = mb ? spacing[mb] : my ? spacing[my] : undefined;
  const marginLeft = ml ? spacing[ml] : mx ? spacing[mx] : undefined;
  const marginRight = mr ? spacing[mr] : mx ? spacing[mx] : undefined;

  return (
    <Text
      style={[
        {
          fontSize: variantStyle.fontSize,
          lineHeight: variantStyle.lineHeight,
          fontWeight: variantStyle.fontWeight,
          color: resolvedColor,
          textAlign: align,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
