import { type ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Border, Elevation, Radius, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';

type DemoCardProps = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function DemoCard({ title, subtitle, children }: DemoCardProps) {
  const theme = useAppTheme();
  const isAndroid = Platform.OS === 'android';
  const isIos = Platform.OS === 'ios';

  return (
    <ThemeSurface
      variant={isIos ? 'muted' : 'surface'}
      style={[
        styles.card,
        isIos && styles.cardIos,
        isAndroid && styles.cardAndroid,
        { borderColor: theme.border },
      ]}
    >
      <ThemeText variant={'subtitle'}>{title}</ThemeText>
      <ThemeText variant={'muted'}>{subtitle}</ThemeText>
      {children ? <View style={styles.content}>{children}</View> : null}
    </ThemeSurface>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  cardIos: {
    shadowOpacity: 0.04,
    shadowRadius: Spacing.xs,
    shadowOffset: { width: 0, height: 1 },
  },
  cardAndroid: {
    borderWidth: Border.thin,
    elevation: Elevation.low,
    shadowOpacity: 0,
  },
  content: {
    marginTop: Spacing.xs,
  },
});
