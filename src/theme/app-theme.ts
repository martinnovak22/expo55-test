import { Color } from 'expo-router';
import { Platform, type ColorValue } from 'react-native';

export type ColorScheme = 'light' | 'dark';

export type AppTheme = {
  scheme: ColorScheme;
  background: ColorValue;
  surface: ColorValue;
  mutedSurface: ColorValue;
  text: ColorValue;
  mutedText: ColorValue;
  accent: ColorValue;
  onAccent: ColorValue;
  secondary: ColorValue;
  onSecondary: ColorValue;
  tertiary: ColorValue;
  onTertiary: ColorValue;
  border: ColorValue;
  danger: ColorValue;
};

type ThemePalette = Omit<AppTheme, 'scheme'>;

const LIGHT_FALLBACK: ThemePalette = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  mutedSurface: '#E2E8F0',
  text: '#0F172A',
  mutedText: '#475569',
  accent: '#0EA5E9',
  onAccent: '#FFFFFF',
  secondary: '#10B981',
  onSecondary: '#FFFFFF',
  tertiary: '#7C3AED',
  onTertiary: '#FFFFFF',
  border: '#CBD5E1',
  danger: '#DC2626',
};

const DARK_FALLBACK: ThemePalette = {
  background: '#0D1117',
  surface: '#161B22',
  mutedSurface: '#1F2937',
  text: '#F9FAFB',
  mutedText: '#9CA3AF',
  accent: '#38BDF8',
  onAccent: '#0F172A',
  secondary: '#34D399',
  onSecondary: '#0F172A',
  tertiary: '#A78BFA',
  onTertiary: '#0F172A',
  border: '#334155',
  danger: '#F87171',
};

// Platform.select is evaluated once at module load. On Android the resolved
// Color.android.dynamic.* tokens natively track Material You scheme changes;
// on iOS the Color.ios.* tokens do the same. The fallback map only applies
// on web / non-native runtimes.
function resolvePalette(fallback: ThemePalette): ThemePalette {
  return {
    background:
      Platform.select({
        android: Color.android.dynamic.background,
        ios: Color.ios.systemGroupedBackground,
        default: fallback.background,
      }) ?? fallback.background,
    surface:
      Platform.select({
        android: Color.android.dynamic.surface,
        ios: Color.ios.secondarySystemGroupedBackground,
        default: fallback.surface,
      }) ?? fallback.surface,
    mutedSurface:
      Platform.select({
        android: Color.android.dynamic.surfaceContainer,
        ios: Color.ios.tertiarySystemGroupedBackground,
        default: fallback.mutedSurface,
      }) ?? fallback.mutedSurface,
    text:
      Platform.select({
        android: Color.android.dynamic.onSurface,
        ios: Color.ios.label,
        default: fallback.text,
      }) ?? fallback.text,
    mutedText:
      Platform.select({
        android: Color.android.dynamic.onSurfaceVariant,
        ios: Color.ios.secondaryLabel,
        default: fallback.mutedText,
      }) ?? fallback.mutedText,
    accent:
      Platform.select({
        android: Color.android.dynamic.primary,
        ios: Color.ios.systemBlue,
        default: fallback.accent,
      }) ?? fallback.accent,
    onAccent:
      Platform.select({
        android: Color.android.dynamic.onPrimary,
        ios: Color.ios.systemBackground,
        default: fallback.onAccent,
      }) ?? fallback.onAccent,
    secondary:
      Platform.select({
        android: Color.android.dynamic.secondary,
        ios: Color.ios.systemTeal,
        default: fallback.secondary,
      }) ?? fallback.secondary,
    onSecondary:
      Platform.select({
        android: Color.android.dynamic.onSecondary,
        ios: Color.ios.systemBackground,
        default: fallback.onSecondary,
      }) ?? fallback.onSecondary,
    tertiary:
      Platform.select({
        android: Color.android.dynamic.tertiary,
        ios: Color.ios.systemPurple,
        default: fallback.tertiary,
      }) ?? fallback.tertiary,
    onTertiary:
      Platform.select({
        android: Color.android.dynamic.onTertiary,
        ios: Color.ios.systemBackground,
        default: fallback.onTertiary,
      }) ?? fallback.onTertiary,
    border:
      Platform.select({
        android: Color.android.dynamic.outlineVariant,
        ios: Color.ios.separator,
        default: fallback.border,
      }) ?? fallback.border,
    danger:
      Platform.select({
        android: Color.android.dynamic.error,
        ios: Color.ios.systemRed,
        default: fallback.danger,
      }) ?? fallback.danger,
  };
}

export const LIGHT_THEME: AppTheme = { scheme: 'light', ...resolvePalette(LIGHT_FALLBACK) };
export const DARK_THEME: AppTheme = { scheme: 'dark', ...resolvePalette(DARK_FALLBACK) };
