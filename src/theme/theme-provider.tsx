import { createContext, useContext, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME, type AppTheme } from '@/theme/app-theme';

const ThemeContext = createContext<AppTheme>(LIGHT_THEME);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Single subscription to the system color scheme. Consumers read the
  // resulting AppTheme via context, so they re-render only when the
  // scheme flips — not on every Platform.select per role per render.
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DARK_THEME : LIGHT_THEME;

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): AppTheme {
  return useContext(ThemeContext);
}
