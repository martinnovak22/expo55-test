import { View, type ViewProps } from 'react-native';

import { useAppTheme } from '@/theme/use-app-theme';

type SurfaceVariant = 'background' | 'surface' | 'muted';

type ThemeSurfaceProps = ViewProps & {
  variant?: SurfaceVariant;
};

export function ThemeSurface({ style, variant = 'surface', ...props }: ThemeSurfaceProps) {
  const theme = useAppTheme();

  const backgroundColor =
    variant === 'background'
      ? theme.background
      : variant === 'muted'
        ? theme.mutedSurface
        : theme.surface;

  return <View style={[{ backgroundColor: backgroundColor }, style]} {...props} />;
}
