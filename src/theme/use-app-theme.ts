// Preserve the historical import path so consumers keep using
// `@/theme/use-app-theme`. The hook now reads from ThemeProvider context.
export type { AppTheme, ColorScheme } from '@/theme/app-theme';
export { useAppTheme, useThemePreferences } from '@/theme/theme-provider';
