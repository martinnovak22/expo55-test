import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/theme/spacing';
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

  return (
    <ThemeSurface variant={'surface'} style={[styles.card, { borderColor: theme.border }]}>
      <ThemeText variant={'subtitle'}>{title}</ThemeText>
      <ThemeText variant={'muted'}>{subtitle}</ThemeText>
      {children ? <View style={styles.content}>{children}</View> : null}
    </ThemeSurface>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  content: {
    marginTop: Spacing.xs,
  },
});
