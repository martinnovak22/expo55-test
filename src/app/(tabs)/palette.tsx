import type { ColorValue } from 'react-native';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { Border, ControlSize, Radius, ScreenSpacing, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';
import { useScrollContentPaddingBottom } from '@/theme/use-scroll-content-padding';

function Swatch({ label, color }: { label: string; color: ColorValue }) {
  const theme = useAppTheme();

  return (
    <View style={styles.swatchRow}>
      <View
        style={[
          styles.swatch,
          { backgroundColor: color, borderWidth: Border.thin, borderColor: theme.border },
        ]}
      />
      <ThemeText>{label}</ThemeText>
    </View>
  );
}

export default function PaletteScreen() {
  const theme = useAppTheme();
  const isAndroid = Platform.OS === 'android';
  const paddingBottom = useScrollContentPaddingBottom();

  return (
    <ThemeSurface variant={'background'} style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: paddingBottom }]}>
        <ThemeText variant={'title'}>Platform Palette</ThemeText>
        <ThemeText variant={'muted'}>
          Switch light and dark mode in your OS settings to verify live color updates.
        </ThemeText>

        <ThemeSurface
          variant={'surface'}
          style={[
            styles.tonePanel,
            isAndroid && styles.androidTonePanel,
            { borderColor: theme.border },
          ]}
        >
          <View
            pointerEvents={'none'}
            style={[styles.toneOrb, styles.toneOrbLeft, { backgroundColor: theme.secondary }]}
          />
          <View
            pointerEvents={'none'}
            style={[styles.toneOrb, styles.toneOrbRight, { backgroundColor: theme.tertiary }]}
          />
          <ThemeText variant={'subtitle'}>Material Tone Preview</ThemeText>
          <View style={styles.toneRow}>
            <View style={[styles.toneChip, { backgroundColor: theme.accent }]}>
              <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
                Primary
              </ThemeText>
            </View>
            <View style={[styles.toneChip, { backgroundColor: theme.secondary }]}>
              <ThemeText variant={'badge'} style={{ color: theme.onSecondary }}>
                Secondary
              </ThemeText>
            </View>
            <View style={[styles.toneChip, { backgroundColor: theme.tertiary }]}>
              <ThemeText variant={'badge'} style={{ color: theme.onTertiary }}>
                Tertiary
              </ThemeText>
            </View>
          </View>
        </ThemeSurface>

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
    padding: ScreenSpacing.contentPadding,
  },
  swatchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  swatch: {
    borderRadius: Radius.xs,
    height: ControlSize.swatch,
    width: ControlSize.swatch,
  },
  tonePanel: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    gap: Spacing.sm,
    padding: Spacing.md,
    overflow: 'hidden',
  },
  androidTonePanel: {
    borderWidth: Border.thin,
  },
  toneRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  toneChip: {
    flex: 1,
    minHeight: ControlSize.button,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toneOrb: {
    position: 'absolute',
    opacity: 0.2,
    borderRadius: Radius.pill,
    height: ControlSize.probe + ControlSize.badge,
    width: ControlSize.probe + ControlSize.badge,
  },
  toneOrbLeft: {
    top: -Spacing.sm,
    left: -Spacing.sm,
  },
  toneOrbRight: {
    top: -Spacing.md,
    right: -Spacing.sm,
  },
});
