import { Text, type TextProps } from 'react-native';

import { useAppTheme } from '@/theme/use-app-theme';

type TextVariant = 'default' | 'muted' | 'title' | 'subtitle' | 'badge';

type ThemeTextProps = TextProps & {
  variant?: TextVariant;
};

export function ThemeText({ style, variant = 'default', ...props }: ThemeTextProps) {
  const theme = useAppTheme();

  const color = variant === 'muted' ? theme.mutedText : theme.text;

  const textStyle =
    variant === 'title'
      ? { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 }
      : variant === 'subtitle'
        ? { fontSize: 20, fontWeight: '600' as const, lineHeight: 26 }
        : variant === 'badge'
          ? { fontSize: 12, fontWeight: '700' as const, lineHeight: 16 }
          : { fontSize: 16, fontWeight: '500' as const, lineHeight: 24 };

  return <Text style={[{ color: color }, textStyle, style]} {...props} />;
}
