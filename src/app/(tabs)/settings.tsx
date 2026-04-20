import type { ColorValue } from 'react-native';
import { Platform, StyleSheet, View } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { Screen } from '@/components/screen';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { Product } from '@/constants/product';
import { IS_ANDROID, IS_IOS_26_OR_LATER } from '@/theme/platform';
import { Border, Radius, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

function DiagnosticRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <ThemeText variant={'muted'}>{label}</ThemeText>
      <ThemeText>{value}</ThemeText>
    </View>
  );
}

function TokenRow({ label, color }: { label: string; color: ColorValue }) {
  const theme = useAppTheme();

  return (
    <View style={styles.tokenRow}>
      <View
        style={[
          styles.tokenSwatch,
          {
            backgroundColor: color,
            borderColor: theme.border,
          },
        ]}
      />
      <ThemeText variant={'muted'}>{label}</ThemeText>
    </View>
  );
}

type StatusTone = 'good' | 'neutral';

function StatusChip({ label, tone }: { label: string; tone: StatusTone }) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.statusChip,
        {
          backgroundColor: tone === 'good' ? theme.secondary : theme.mutedSurface,
        },
      ]}
    >
      <ThemeText
        variant={'badge'}
        style={{
          color: tone === 'good' ? theme.onSecondary : theme.mutedText,
        }}
      >
        {label}
      </ThemeText>
    </View>
  );
}

export default function SettingsScreen() {
  const theme = useAppTheme();

  return (
    <Screen
      title={Product.tabs.diagnostics}
      subtitle={'Internal operations center for runtime status, platform capabilities, and release checks.'}
    >
      <ThemeSurface
        variant={'surface'}
        style={[styles.runtimeBanner, IS_ANDROID && styles.androidPanel, { borderColor: theme.border }]}
      >
        <View style={styles.bannerTopRow}>
          <View style={styles.bannerTextWrap}>
            <ThemeText variant={'subtitle'}>Runtime Snapshot</ThemeText>
            <ThemeText variant={'muted'}>Environment attached to this app session.</ThemeText>
          </View>
        </View>
        <View style={styles.bannerChipRow}>
          <StatusChip label={theme.scheme === 'dark' ? 'Dark mode' : 'Light mode'} tone={'good'} />
          <StatusChip label={Platform.OS.toUpperCase()} tone={'good'} />
          <StatusChip
            label={IS_IOS_26_OR_LATER ? 'iOS glass ready' : 'Standard accessory mode'}
            tone={IS_IOS_26_OR_LATER ? 'good' : 'neutral'}
          />
        </View>
      </ThemeSurface>

      <DemoCard title={'Environment Details'} subtitle={'Current runtime values and resolved capabilities.'}>
        <DiagnosticRow label={'Platform'} value={Platform.OS} />
        <DiagnosticRow label={'Platform version'} value={String(Platform.Version)} />
        <DiagnosticRow label={'Resolved scheme'} value={theme.scheme} />
        <DiagnosticRow
          label={'iOS 26+ features'}
          value={IS_IOS_26_OR_LATER ? 'enabled' : 'fallback mode'}
        />
        <DiagnosticRow
          label={'Dynamic color source'}
          value={IS_ANDROID ? 'Material dynamic' : 'iOS system colors'}
        />
      </DemoCard>

      <DemoCard
        title={'Capability Health'}
        subtitle={'Operational status of native navigation and theme synchronization.'}
      >
        <View style={styles.healthRow}>
          <ThemeText variant={'muted'} style={styles.healthLabel}>
            Native tab routing
          </ThemeText>
          <StatusChip label={'healthy'} tone={'good'} />
        </View>
        <View style={styles.healthRow}>
          <ThemeText variant={'muted'} style={styles.healthLabel}>
            Theme re-render hooks
          </ThemeText>
          <StatusChip label={'healthy'} tone={'good'} />
        </View>
        <View style={styles.healthRow}>
          <ThemeText variant={'muted'} style={styles.healthLabel}>
            Bottom accessory behavior
          </ThemeText>
          <StatusChip
            label={IS_IOS_26_OR_LATER ? 'enabled' : 'fallback'}
            tone={IS_IOS_26_OR_LATER ? 'good' : 'neutral'}
          />
        </View>
      </DemoCard>

      <DemoCard
        title={'Theme Token Snapshot'}
        subtitle={'Compact token check for diagnostics-only auditing.'}
      >
        <View style={styles.tokenGrid}>
          <TokenRow label={'Background'} color={theme.background} />
          <TokenRow label={'Surface'} color={theme.surface} />
          <TokenRow label={'Text'} color={theme.text} />
          <TokenRow label={'Accent'} color={theme.accent} />
        </View>
      </DemoCard>

      <DemoCard
        title={'Pre-Release QA Checklist'}
        subtitle={'Manual checks for this showcase screen set.'}
      >
        <ThemeText variant={'muted'}>
          1. Switch tabs and verify labels/icons track active state.
        </ThemeText>
        <ThemeText variant={'muted'}>
          2. Toggle device theme and confirm immediate palette updates.
        </ThemeText>
        <ThemeText variant={'muted'}>
          3. Validate transaction row readability on light and dark surfaces.
        </ThemeText>
        <ThemeText variant={'muted'}>
          4. On iOS 26+, confirm native glass accessory appears and collapses on scroll.
        </ThemeText>
      </DemoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
    paddingBottom: Spacing.xs,
  },
  runtimeBanner: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  bannerTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  bannerTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  bannerChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  statusChip: {
    borderRadius: Radius.pill,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    minHeight: Spacing.lg,
    maxWidth: '100%',
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: Spacing.sm,
  },
  healthLabel: {
    flex: 1,
  },
  androidPanel: {
    borderWidth: Border.thin,
  },
  tokenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    minWidth: 132,
  },
  tokenSwatch: {
    width: Spacing.md,
    height: Spacing.md,
    borderRadius: Radius.xs,
    borderWidth: Border.regular,
  },
});
