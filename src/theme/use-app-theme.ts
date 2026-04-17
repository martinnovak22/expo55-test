import { Color } from 'expo-router';
import { Platform, useColorScheme, type ColorValue } from 'react-native';

export type AppTheme = {
  scheme: 'light' | 'dark';
  background: ColorValue;
  surface: ColorValue;
  mutedSurface: ColorValue;
  text: ColorValue;
  mutedText: ColorValue;
  accent: ColorValue;
  onAccent: ColorValue;
  border: ColorValue;
  danger: ColorValue;
};

function getFallbackScheme(scheme: ReturnType<typeof useColorScheme>): 'light' | 'dark' {
  return scheme === 'dark' ? 'dark' : 'light';
}

export function useAppTheme(): AppTheme {
  // Important for Android dynamic colors: this hook ensures rerenders on system theme changes.
  const colorScheme = useColorScheme();
  const scheme = getFallbackScheme(colorScheme);

  const defaults =
    scheme === 'dark'
      ? {
          background: '#0D1117',
          surface: '#161B22',
          mutedSurface: '#1F2937',
          text: '#F9FAFB',
          mutedText: '#9CA3AF',
          accent: '#38BDF8',
          onAccent: '#0F172A',
          border: '#334155',
          danger: '#F87171',
        }
      : {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          mutedSurface: '#E2E8F0',
          text: '#0F172A',
          mutedText: '#475569',
          accent: '#0EA5E9',
          onAccent: '#FFFFFF',
          border: '#CBD5E1',
          danger: '#DC2626',
        };

  return {
    scheme,
    background:
      Platform.select({
        android: Color.android.dynamic.background,
        ios: Color.ios.systemBackground,
        default: defaults.background,
      }) ?? defaults.background,
    surface:
      Platform.select({
        android: Color.android.dynamic.surface,
        ios: Color.ios.secondarySystemBackground,
        default: defaults.surface,
      }) ?? defaults.surface,
    mutedSurface:
      Platform.select({
        android: Color.android.dynamic.surfaceContainer,
        ios: Color.ios.tertiarySystemBackground,
        default: defaults.mutedSurface,
      }) ?? defaults.mutedSurface,
    text:
      Platform.select({
        android: Color.android.dynamic.onSurface,
        ios: Color.ios.label,
        default: defaults.text,
      }) ?? defaults.text,
    mutedText:
      Platform.select({
        android: Color.android.dynamic.onSurfaceVariant,
        ios: Color.ios.secondaryLabel,
        default: defaults.mutedText,
      }) ?? defaults.mutedText,
    accent:
      Platform.select({
        android: Color.android.dynamic.primary,
        ios: Color.ios.systemBlue,
        default: defaults.accent,
      }) ?? defaults.accent,
    onAccent:
      Platform.select({
        android: Color.android.dynamic.onPrimary,
        ios: Color.ios.systemBackground,
        default: defaults.onAccent,
      }) ?? defaults.onAccent,
    border:
      Platform.select({
        android: Color.android.dynamic.outline,
        ios: Color.ios.separator,
        default: defaults.border,
      }) ?? defaults.border,
    danger:
      Platform.select({
        android: Color.android.dynamic.error,
        ios: Color.ios.systemRed,
        default: defaults.danger,
      }) ?? defaults.danger,
  };
}
