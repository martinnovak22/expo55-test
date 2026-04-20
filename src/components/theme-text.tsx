import { Platform, Text, type TextProps } from 'react-native';

import { useAppTheme } from '@/theme/use-app-theme';

type TextVariant = 'default' | 'muted' | 'title' | 'subtitle' | 'badge';

type ThemeTextProps = TextProps & {
  variant?: TextVariant;
};

export function ThemeText({ style, variant = 'default', ...props }: ThemeTextProps) {
  const theme = useAppTheme();
  const isIos = Platform.OS === 'ios';

  const color = variant === 'muted' ? theme.mutedText : theme.text;

  const textStyle =
    variant === 'title'
      ? {
          fontSize: isIos ? 30 : 28,
          fontWeight: isIos ? ('700' as const) : ('700' as const),
          lineHeight: isIos ? 36 : 34,
          letterSpacing: isIos ? 0.2 : 0,
        }
      : variant === 'subtitle'
        ? {
            fontSize: isIos ? 21 : 20,
            fontWeight: isIos ? ('600' as const) : ('600' as const),
            lineHeight: isIos ? 27 : 26,
          }
        : variant === 'badge'
          ? {
              fontSize: 12,
              fontWeight: isIos ? ('600' as const) : ('700' as const),
              lineHeight: 16,
              letterSpacing: 0.2,
            }
          : {
              fontSize: 16,
              fontWeight: isIos ? ('400' as const) : ('500' as const),
              lineHeight: isIos ? 23 : 24,
            };

  return <Text style={[{ color: color }, textStyle, style]} {...props} />;
}
