import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { buildTheme, type AppTheme } from '@/theme/app-theme';

type ThemePreferencesContextValue = {
  theme: AppTheme;
  useAndroidDynamicColor: boolean;
  setUseAndroidDynamicColor: (enabled: boolean) => void;
};

const ThemePreferencesContext = createContext<ThemePreferencesContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  const [useAndroidDynamicColor, setUseAndroidDynamicColor] = useState(true);

  const value = useMemo(() => {
    const resolvedScheme = scheme === 'dark' ? 'dark' : 'light';

    return {
      theme: buildTheme(resolvedScheme, { useAndroidDynamicColor }),
      useAndroidDynamicColor,
      setUseAndroidDynamicColor,
    };
  }, [scheme, useAndroidDynamicColor]);

  return (
    <ThemePreferencesContext.Provider value={value}>{children}</ThemePreferencesContext.Provider>
  );
}

export function useAppTheme(): AppTheme {
  const value = useContext(ThemePreferencesContext);

  if (!value) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }

  return value.theme;
}

export function useThemePreferences() {
  const value = useContext(ThemePreferencesContext);

  if (!value) {
    throw new Error('useThemePreferences must be used inside ThemeProvider');
  }

  return {
    useAndroidDynamicColor: value.useAndroidDynamicColor,
    setUseAndroidDynamicColor: value.setUseAndroidDynamicColor,
  };
}
