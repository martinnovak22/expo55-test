import { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { LivePressable } from '@/components/live-pressable';
import { Screen } from '@/components/screen';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { Product } from '@/constants/product';
import { ActivityFilterChips } from '@/features/activity/components/filter-chips';
import { ACTIVITY_ITEMS, matchesSearch } from '@/features/activity/data';
import { useActivityTabState } from '@/features/activity/tab-state';
import { IS_ANDROID, IS_IOS } from '@/theme/platform';
import { Border, ControlSize, Radius, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

export default function PaletteScreen() {
  const router = useRouter();
  const theme = useAppTheme();
  const { filter, searchQuery } = useActivityTabState();

  const filteredItems = useMemo(
    () =>
      ACTIVITY_ITEMS.filter((item) => {
        const matchesFilter = filter === 'all' ? true : item.status === filter;
        return matchesFilter && matchesSearch(item, searchQuery);
      }),
    [filter, searchQuery]
  );

  return (
    <Screen
      title={Product.tabs.activity}
      subtitle={'Theme Inspector for finance activity UI with live iOS and Android system colors.'}
      showTitle={!IS_IOS}
      useNativeHeader={IS_IOS}
    >
      <ThemeSurface
        variant={'surface'}
        style={[
          styles.tonePanel,
          IS_ANDROID && styles.androidTonePanel,
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
        <ThemeText variant={'subtitle'}>Theme Inspector</ThemeText>
        <ThemeText variant={'muted'}>
          Validate tone usage for balances, state chips, and action containers.
        </ThemeText>
        <View style={styles.toneRow}>
          <View style={[styles.toneChip, { backgroundColor: theme.accent }]}>
            <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
              Credit
            </ThemeText>
          </View>
          <View style={[styles.toneChip, { backgroundColor: theme.secondary }]}>
            <ThemeText variant={'badge'} style={{ color: theme.onSecondary }}>
              Invest
            </ThemeText>
          </View>
          <View style={[styles.toneChip, { backgroundColor: theme.tertiary }]}>
            <ThemeText variant={'badge'} style={{ color: theme.onTertiary }}>
              Save
            </ThemeText>
          </View>
        </View>
      </ThemeSurface>

      <DemoCard
        title={'Recent Transactions Preview'}
        subtitle={
          'Production-like activity rows for spacing, typography, and status contrast checks.'
        }
      >
        <ThemeText variant={'muted'}>
          {`Active filter: ${filter}. Search query: ${searchQuery.trim() ? searchQuery : 'none'}.`}
        </ThemeText>
        <ActivityFilterChips />

        <View style={styles.transactionList}>
          {filteredItems.map((item) => (
            <LivePressable
              key={item.merchant}
              onPress={() => {
                router.push({
                  pathname: '/palette/[merchant]',
                  params: {
                    merchant: item.merchant,
                    category: item.category,
                    amount: item.amount,
                    status: item.status,
                  },
                });
              }}
              containerStyle={styles.transactionPressable}
              contentStyle={styles.transactionPressableContent}
              androidRippleColor={theme.mutedSurface}
            >
              <ThemeSurface
                variant={'surface'}
                style={[
                  styles.transactionRow,
                  {
                    borderColor: theme.border,
                  },
                ]}
              >
                <View style={styles.transactionLeft}>
                  <ThemeText>{item.merchant}</ThemeText>
                  <ThemeText variant={'muted'}>{item.category}</ThemeText>
                </View>
                <View style={styles.transactionRight}>
                  <ThemeText
                    style={{
                      color: item.amount.startsWith('+') ? theme.accent : theme.text,
                    }}
                  >
                    {item.amount}
                  </ThemeText>
                  <View
                    style={[
                      styles.statusChip,
                      {
                        backgroundColor:
                          item.status === 'pending' ? theme.mutedSurface : theme.secondary,
                        borderColor: item.status === 'pending' ? theme.border : theme.secondary,
                      },
                    ]}
                  >
                    <ThemeText
                      variant={'badge'}
                      style={{
                        color: item.status === 'pending' ? theme.mutedText : theme.onSecondary,
                      }}
                    >
                      {item.status}
                    </ThemeText>
                  </View>
                </View>
              </ThemeSurface>
            </LivePressable>
          ))}
        </View>

        {filteredItems.length === 0 ? (
          <ThemeSurface
            variant={'muted'}
            style={[styles.emptyState, { borderColor: theme.border }]}
          >
            <ThemeText>{'No transactions match the current filter/search input.'}</ThemeText>
          </ThemeSurface>
        ) : null}
      </DemoCard>

      <DemoCard
        title={'Token Application QA'}
        subtitle={'How role tokens render across common activity widgets.'}
      >
        <View style={styles.qaGrid}>
          <ThemeSurface variant={'muted'} style={[styles.qaTile, { borderColor: theme.border }]}>
            <ThemeText variant={'muted'}>Primary CTA</ThemeText>
            <View style={[styles.qaPill, { backgroundColor: theme.accent }]}>
              <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
                Transfer
              </ThemeText>
            </View>
          </ThemeSurface>
          <ThemeSurface variant={'muted'} style={[styles.qaTile, { borderColor: theme.border }]}>
            <ThemeText variant={'muted'}>Risk State</ThemeText>
            <View style={[styles.qaPill, { backgroundColor: theme.danger }]}>
              <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
                Overspent
              </ThemeText>
            </View>
          </ThemeSurface>
        </View>
      </DemoCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  transactionList: {
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  transactionRow: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  transactionPressable: {
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  transactionPressableContent: {
    borderRadius: Radius.sm,
  },
  transactionLeft: {
    gap: Spacing.xxs,
    flex: 1,
    minWidth: 0,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: Spacing.xxs,
  },
  statusChip: {
    borderRadius: Radius.pill,
    minHeight: ControlSize.badge - Spacing.xxs,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm + Spacing.xxs,
    paddingVertical: Spacing.xxs,
    borderWidth: Border.regular,
  },
  emptyState: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
    marginTop: Spacing.xs,
  },
  qaGrid: {
    gap: Spacing.sm,
  },
  qaTile: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  qaPill: {
    alignSelf: 'flex-start',
    borderRadius: Radius.pill,
    minHeight: ControlSize.button,
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
});
