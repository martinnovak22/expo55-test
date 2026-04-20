import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { LivePressable } from '@/components/live-pressable';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { Product } from '@/constants/product';
import { Border, ControlSize, Radius, ScreenSpacing, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';
import { useScrollContentPaddingBottom } from '@/theme/use-scroll-content-padding';

const transactionItems = [
  { merchant: 'Whole Foods Market', category: 'Groceries', amount: '-$84.63', status: 'settled' },
  { merchant: 'Acme Payroll', category: 'Income', amount: '+$3,250.00', status: 'posted' },
  { merchant: 'Transit Pass', category: 'Transport', amount: '-$45.00', status: 'pending' },
] as const;

export default function PaletteScreen() {
  const theme = useAppTheme();
  const isAndroid = Platform.OS === 'android';
  const isIos = Platform.OS === 'ios';
  const paddingBottom = useScrollContentPaddingBottom();
  const [selectedMerchant, setSelectedMerchant] = useState(transactionItems[0]?.merchant ?? '');

  return (
    <ThemeSurface variant={'background'} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          isIos && styles.contentIos,
          { paddingBottom: paddingBottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ThemeText variant={'title'}>{Product.tabs.activity}</ThemeText>
        <ThemeText variant={'muted'}>
          Theme Inspector for finance activity UI with live iOS and Android system colors.
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
          subtitle={'Production-like activity rows for spacing, typography, and status contrast checks.'}
        >
          <View style={styles.transactionList}>
            {transactionItems.map((item) => (
              <LivePressable
                key={item.merchant}
                onPress={() => setSelectedMerchant(item.merchant)}
                containerStyle={styles.transactionPressable}
                contentStyle={styles.transactionPressableContent}
                androidRippleColor={theme.mutedSurface}
              >
                <ThemeSurface
                  variant={selectedMerchant === item.merchant ? 'surface' : 'muted'}
                  style={[
                    styles.transactionRow,
                    {
                      borderColor: selectedMerchant === item.merchant ? theme.accent : theme.border,
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
  contentIos: {
    paddingHorizontal: Spacing.lg,
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
  transactionList: {
    gap: Spacing.xs,
  },
  transactionRow: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
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
    gap: Spacing.xs,
  },
  statusChip: {
    borderRadius: Radius.pill,
    minHeight: ControlSize.badge,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
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
