import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { IS_IOS } from '@/theme/platform';
import { useAppTheme } from '@/theme/use-app-theme';

type TextVariant = 'default' | 'muted' | 'title' | 'subtitle' | 'badge';

type ThemeTextProps = TextProps & {
  variant?: TextVariant;
};

// Variant styles only depend on platform, not on theme or props, so
// StyleSheet.create runs once at module load.
const variantStyles = StyleSheet.create<Record<TextVariant, TextStyle>>({
  default: {
    fontSize: 16,
    fontWeight: IS_IOS ? '400' : '500',
    lineHeight: IS_IOS ? 23 : 24,
  },
  muted: {
    fontSize: 16,
    fontWeight: IS_IOS ? '400' : '500',
    lineHeight: IS_IOS ? 23 : 24,
  },
  title: {
    fontSize: IS_IOS ? 30 : 28,
    fontWeight: '700',
    lineHeight: IS_IOS ? 36 : 34,
    letterSpacing: IS_IOS ? 0.2 : 0,
  },
  subtitle: {
    fontSize: IS_IOS ? 21 : 20,
    fontWeight: '600',
    lineHeight: IS_IOS ? 27 : 26,
  },
  badge: {
    fontSize: 12,
    fontWeight: IS_IOS ? '600' : '700',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
});

export function ThemeText({ style, variant = 'default', ...props }: ThemeTextProps) {
  const theme = useAppTheme();
  const color = variant === 'muted' ? theme.mutedText : theme.text;

  return <Text style={[variantStyles[variant], { color: color }, style]} {...props} />;
}
