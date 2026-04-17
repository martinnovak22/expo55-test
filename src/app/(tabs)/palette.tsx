import { ScrollView, StyleSheet, View } from 'react-native';
import type { ColorValue } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

function Swatch({ label, color }: { label: string; color: ColorValue }) {
  return (
    <View style={styles.swatchRow}>
      <View style={[styles.swatch, { backgroundColor: color }]} />
      <ThemeText>{label}</ThemeText>
    </View>
  );
}

export default function PaletteScreen() {
  const theme = useAppTheme();

  return (
    <ThemeSurface variant={'background'} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemeText variant={'title'}>Platform Palette</ThemeText>
        <ThemeText variant={'muted'}>
          Switch light and dark mode in your OS settings to verify live color updates.
        </ThemeText>

        <DemoCard
          title={'Core Surface Colors'}
          subtitle={'Resolved from Color.android.dynamic / Color.ios.*'}
        >
          <Swatch label={'Background'} color={theme.background} />
          <Swatch label={'Surface'} color={theme.surface} />
          <Swatch label={'Muted Surface'} color={theme.mutedSurface} />
          <Swatch label={'Border'} color={theme.border} />
        </DemoCard>

        <DemoCard title={'Semantic Colors'} subtitle={'Used for text, actions, and status UI.'}>
          <Swatch label={'Text'} color={theme.text} />
          <Swatch label={'Muted Text'} color={theme.mutedText} />
          <Swatch label={'Accent'} color={theme.accent} />
          <Swatch label={'Danger'} color={theme.danger} />
        </DemoCard>
      </ScrollView>
    </ThemeSurface>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: Spacing.md,
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  swatchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  swatch: {
    borderRadius: 6,
    height: 28,
    width: 28,
  },
});
