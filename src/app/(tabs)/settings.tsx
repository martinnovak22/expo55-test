import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { isIos26OrLater } from '@/theme/platform';
import { Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

function DiagnosticRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <ThemeText variant={'muted'}>{label}</ThemeText>
      <ThemeText>{value}</ThemeText>
    </View>
  );
}

export default function SettingsScreen() {
  const theme = useAppTheme();
  const ios26OrLater = isIos26OrLater();

  return (
    <ThemeSurface variant={'background'} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemeText variant={'title'}>Diagnostics</ThemeText>
        <ThemeText variant={'muted'}>
          Quick checks for native tabs behavior and platform color loading.
        </ThemeText>

        <DemoCard title={'Runtime'} subtitle={'Environment details used by this demo.'}>
          <DiagnosticRow label={'Platform'} value={Platform.OS} />
          <DiagnosticRow label={'Platform version'} value={String(Platform.Version)} />
          <DiagnosticRow label={'Resolved scheme'} value={theme.scheme} />
          <DiagnosticRow label={'iOS 26+ features'} value={ios26OrLater ? 'enabled' : 'fallback'} />
        </DemoCard>

        <DemoCard
          title={'Manual Test Steps'}
          subtitle={'No unit tests for this sample, only manual validation.'}
        >
          <ThemeText variant={'muted'}>1. Switch tabs and verify icons/labels update.</ThemeText>
          <ThemeText variant={'muted'}>
            2. Toggle device theme and confirm colors change instantly.
          </ThemeText>
          <ThemeText variant={'muted'}>
            3. On iOS 26+, confirm bottom glass accessory is visible.
          </ThemeText>
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
  row: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
    paddingBottom: Spacing.xs,
  },
});
