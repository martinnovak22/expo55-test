import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { IS_ANDROID, IS_IOS } from '@/theme/platform';
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

  return (
    <ThemeSurface
      variant={IS_IOS ? 'muted' : 'surface'}
      style={[
        styles.card,
        IS_IOS && styles.cardIos,
        IS_ANDROID && styles.cardAndroid,
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
