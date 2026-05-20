/**
 * @shopify/restyle theme
 *
 * Design tokens for light and dark mode.
 * Import useTheme() from this file — never from @shopify/restyle directly.
 *
 * @example
 * const { colors, spacing } = useTheme<Theme>();
 */
import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';

// ─── Colour palette (raw values — not used directly in components) ────────────

const palette = {
  // Brand
  primary50: '#EFF6FF',
  primary100: '#DBEAFE',
  primary200: '#BFDBFE',
  primary400: '#60A5FA',
  primary500: '#3B82F6',
  primary600: '#2563EB',
  primary700: '#1D4ED8',
  primary900: '#1E3A8A',

  // Neutral
  white: '#FFFFFF',
  neutral50: '#F8FAFC',
  neutral100: '#F1F5F9',
  neutral200: '#E2E8F0',
  neutral300: '#CBD5E1',
  neutral400: '#94A3B8',
  neutral500: '#64748B',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1E293B',
  neutral900: '#0F172A',
  black: '#000000',

  // Semantic
  success500: '#22C55E',
  success600: '#16A34A',
  warning500: '#F59E0B',
  warning600: '#D97706',
  error500: '#EF4444',
  error600: '#DC2626',
  info500: '#06B6D4',
} as const;

// ─── Light theme ──────────────────────────────────────────────────────────────

const theme = createTheme({
  // ── Colors ────────────────────────────────────────────────────────────────
  colors: {
    // Backgrounds
    background: palette.neutral50,
    surface: palette.white,
    surfaceSecondary: palette.neutral100,
    overlay: 'rgba(0,0,0,0.5)',

    // Brand
    primary: palette.primary600,
    primaryLight: palette.primary100,
    primaryDark: palette.primary700,

    // Text
    textPrimary: palette.neutral900,
    textSecondary: palette.neutral500,
    textDisabled: palette.neutral300,
    textInverse: palette.white,

    // Borders
    border: palette.neutral200,
    borderStrong: palette.neutral300,

    // Semantic
    success: palette.success500,
    warning: palette.warning500,
    error: palette.error500,
    info: palette.info500,

    // Interactive
    buttonPrimary: palette.primary600,
    buttonPrimaryText: palette.white,
    buttonSecondary: palette.neutral100,
    buttonSecondaryText: palette.neutral800,
    inputBackground: palette.white,
    inputBorder: palette.neutral200,
    inputFocusBorder: palette.primary500,
  },

  // ── Spacing ───────────────────────────────────────────────────────────────
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  // ── Border radii ──────────────────────────────────────────────────────────
  borderRadii: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },

  // ── Text variants ─────────────────────────────────────────────────────────
  textVariants: {
    // Display
    displayLarge: {
      fontSize: 57,
      lineHeight: 64,
      fontWeight: '400' as const,
      color: 'textPrimary',
    },
    displaySmall: {
      fontSize: 36,
      lineHeight: 44,
      fontWeight: '400' as const,
      color: 'textPrimary',
    },

    // Headings
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700' as const,
      color: 'textPrimary',
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '700' as const,
      color: 'textPrimary',
    },
    h3: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600' as const,
      color: 'textPrimary',
    },
    h4: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600' as const,
      color: 'textPrimary',
    },

    // Body
    bodyLarge: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
      color: 'textPrimary',
    },
    body: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
      color: 'textPrimary',
    },
    bodySmall: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as const,
      color: 'textSecondary',
    },

    // UI
    label: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500' as const,
      color: 'textPrimary',
    },
    caption: {
      fontSize: 11,
      lineHeight: 16,
      fontWeight: '400' as const,
      color: 'textSecondary',
    },
    button: {
      fontSize: 15,
      lineHeight: 20,
      fontWeight: '600' as const,
      color: 'buttonPrimaryText',
    },
    link: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500' as const,
      color: 'primary',
    },

    // Required by @shopify/restyle
    defaults: {
      fontSize: 14,
      color: 'textPrimary',
    },
  },

  // ── Breakpoints ───────────────────────────────────────────────────────────
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

// ─── Dark theme ───────────────────────────────────────────────────────────────

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    // Backgrounds
    background: palette.neutral900,
    surface: palette.neutral800,
    surfaceSecondary: palette.neutral700,

    // Text
    textPrimary: palette.neutral50,
    textSecondary: palette.neutral400,
    textDisabled: palette.neutral600,

    // Brand (slightly lighter for dark backgrounds)
    primary: palette.primary400,
    primaryDark: palette.primary500,

    // Borders
    border: palette.neutral700,
    borderStrong: palette.neutral600,

    // Interactive
    buttonSecondary: palette.neutral700,
    buttonSecondaryText: palette.neutral100,
    inputBackground: palette.neutral800,
    inputBorder: palette.neutral700,
    inputFocusBorder: palette.primary400,
  },
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export type Theme = typeof theme;

/** Typed spacing token key — 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' */
export type SpacingKey = keyof Theme['spacing'];

/**
 * Typed useTheme hook.
 * Use this instead of importing from @shopify/restyle directly
 * so the Theme type is always inferred correctly.
 */
export const useTheme = () => useRestyleTheme<Theme>();

export { theme };
