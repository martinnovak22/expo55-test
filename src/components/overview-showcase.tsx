import { useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { DemoCard } from '@/components/demo-card';
import { LivePressable } from '@/components/live-pressable';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { Product } from '@/constants/product';
import { Border, ControlSize, Elevation, Radius, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

const accountCards = [
  { title: 'Everyday Cash', amount: '$12,480.22', delta: '+$243.90 today' },
  { title: 'Investments', amount: '$84,390.47', delta: '+1.84% this week' },
] as const;

const insightItems = [
  {
    title: 'Spending is below plan',
    description: 'You are 11% under monthly dining and subscriptions budget.',
  },
  {
    title: 'Income received',
    description: 'Payroll from Northstar Labs posted this morning.',
  },
  {
    title: 'Recurring payment due',
    description: 'Card statement auto-pay is scheduled for Friday.',
  },
  {
    title: 'Savings goal progress',
    description: 'Emergency fund reached 68% of your target.',
  },
] as const;

export function OverviewShowcase() {
  const theme = useAppTheme();
  const isAndroid = Platform.OS === 'android';
  const [transferTo, setTransferTo] = useState('High Yield Savings');
  const [transferAmount, setTransferAmount] = useState('350');
  const [lastAction, setLastAction] = useState<'none' | 'reset' | 'schedule' | 'quick-action'>(
    'none',
  );

  return (
    <View style={styles.container}>
      <ThemeSurface
        variant={'surface'}
        style={[styles.heroCard, isAndroid && styles.androidPanel, { borderColor: theme.border }]}
      >
        <View style={styles.heroTop}>
          <View style={styles.heroTextWrap}>
            <ThemeText variant={'muted'}>{Product.name}</ThemeText>
            <ThemeText variant={'title'}>$96,870.69</ThemeText>
            <ThemeText variant={'muted'}>Total portfolio value</ThemeText>
          </View>
          <View style={[styles.heroPill, { backgroundColor: theme.accent }]}>
            <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
              +2.34%
            </ThemeText>
          </View>
        </View>
        <View style={styles.heroMetrics}>
          <View style={[styles.metricCard, { backgroundColor: theme.mutedSurface }]}>
            <ThemeText variant={'muted'}>Month Gain</ThemeText>
            <ThemeText>$2,904.31</ThemeText>
          </View>
          <View style={[styles.metricCard, { backgroundColor: theme.mutedSurface }]}>
            <ThemeText variant={'muted'}>Cash Available</ThemeText>
            <ThemeText>$6,128.11</ThemeText>
          </View>
        </View>
      </ThemeSurface>

      <View style={styles.accountRow}>
        {accountCards.map((account) => (
          <ThemeSurface
            key={account.title}
            variant={'muted'}
            style={[styles.accountCard, isAndroid && styles.androidPanel, { borderColor: theme.border }]}
          >
            <ThemeText variant={'muted'}>{account.title}</ThemeText>
            <ThemeText variant={'subtitle'}>{account.amount}</ThemeText>
            <ThemeText variant={'muted'}>{account.delta}</ThemeText>
          </ThemeSurface>
        ))}
      </View>

      <DemoCard
        title={'Quick Actions'}
        subtitle={'Native-touch action chips for common finance workflows.'}
      >
        <View style={styles.quickActionRow}>
          <LivePressable
            onPress={() => setLastAction('quick-action')}
            containerStyle={styles.quickActionPressable}
            contentStyle={[styles.quickAction, { backgroundColor: theme.accent }]}
            androidRippleColor={theme.mutedSurface}
          >
            <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
              Add Funds
            </ThemeText>
          </LivePressable>
          <LivePressable
            onPress={() => setLastAction('quick-action')}
            containerStyle={styles.quickActionPressable}
            contentStyle={[styles.quickAction, { backgroundColor: theme.secondary }]}
            androidRippleColor={theme.mutedSurface}
          >
            <ThemeText variant={'badge'} style={{ color: theme.onSecondary }}>
              Move Money
            </ThemeText>
          </LivePressable>
          <LivePressable
            onPress={() => setLastAction('quick-action')}
            containerStyle={styles.quickActionPressable}
            contentStyle={[styles.quickAction, { backgroundColor: theme.tertiary }]}
            androidRippleColor={theme.mutedSurface}
          >
            <ThemeText variant={'badge'} style={{ color: theme.onTertiary }}>
              Export
            </ThemeText>
          </LivePressable>
        </View>
      </DemoCard>

      <ThemeSurface
        variant={'surface'}
        style={[
          styles.allocationPanel,
          isAndroid && styles.androidPanel,
          { borderColor: theme.border },
        ]}
      >
        <ThemeText variant={'subtitle'}>Allocation Snapshot</ThemeText>
        <ThemeText variant={'muted'}>Sample portfolio composition using live app theme roles.</ThemeText>
        <View style={styles.allocationTrack}>
          <View style={[styles.allocationSegment, { flex: 5, backgroundColor: theme.accent }]} />
          <View style={[styles.allocationSegment, { flex: 3, backgroundColor: theme.secondary }]} />
          <View style={[styles.allocationSegment, { flex: 2, backgroundColor: theme.tertiary }]} />
        </View>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.accent }]} />
            <ThemeText variant={'muted'}>Stocks 50%</ThemeText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.secondary }]} />
            <ThemeText variant={'muted'}>Bonds 30%</ThemeText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.tertiary }]} />
            <ThemeText variant={'muted'}>Cash 20%</ThemeText>
          </View>
        </View>
      </ThemeSurface>

      <ThemeText variant={'subtitle'}>Finance Scenario Components</ThemeText>
      <ThemeText variant={'muted'}>
        Realistic modules for spacing, motion, and touch target validation.
      </ThemeText>

      {insightItems.map((item, index) => (
        <LivePressable
          key={item.title}
          containerStyle={[
            styles.cardPressable,
            isAndroid && styles.cardPressableAndroid,
            { shadowColor: theme.text },
          ]}
          contentStyle={styles.cardContent}
          androidRippleColor={theme.mutedSurface}
          onPress={() => setLastAction('none')}
        >
          <ThemeSurface
            variant={index % 2 === 0 ? 'surface' : 'muted'}
            style={[
              styles.itemCard,
              isAndroid && styles.androidPanel,
              { borderColor: theme.border },
            ]}
          >
            <View style={styles.itemRow}>
              <View style={styles.itemTextWrap}>
                <ThemeText variant={'subtitle'}>{item.title}</ThemeText>
                <ThemeText variant={'muted'}>{item.description}</ThemeText>
              </View>

              <View style={[styles.itemBadge, { backgroundColor: theme.accent }]}>
                <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
                  {index + 1}
                </ThemeText>
              </View>
            </View>
          </ThemeSurface>
        </LivePressable>
      ))}

      <ThemeSurface
        variant={'surface'}
        style={[
          styles.formSection,
          isAndroid && styles.androidPanel,
          { borderColor: theme.border },
        ]}
      >
        <View
          pointerEvents={'none'}
          style={[styles.colorOrb, styles.formOrb, { backgroundColor: theme.tertiary }]}
        />
        <ThemeText variant={'subtitle'}>Transfer Draft</ThemeText>
        <ThemeText variant={'muted'}>
          Static draft form to preview transfer interactions and control states.
        </ThemeText>

        <View style={styles.fieldGroup}>
          <ThemeText variant={'muted'} style={styles.fieldLabel}>
            Transfer To
          </ThemeText>
          <TextInput
            value={transferTo}
            placeholder={'Transfer To'}
            placeholderTextColor={theme.mutedText}
            onChangeText={setTransferTo}
            autoCorrect={false}
            autoCapitalize={'words'}
            style={[
              styles.input,
              isAndroid && styles.inputAndroid,
              {
                backgroundColor: theme.mutedSurface,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />
        </View>

        <View style={styles.fieldGroup}>
          <ThemeText variant={'muted'} style={styles.fieldLabel}>
            Amount
          </ThemeText>
          <TextInput
            value={transferAmount}
            placeholder={'Amount'}
            placeholderTextColor={theme.mutedText}
            onChangeText={setTransferAmount}
            autoCorrect={false}
            keyboardType={'decimal-pad'}
            style={[
              styles.input,
              isAndroid && styles.inputAndroid,
              {
                backgroundColor: theme.mutedSurface,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />
        </View>

        <View style={styles.buttonRow}>
          <LivePressable
            onPress={() => {
              setTransferTo('High Yield Savings');
              setTransferAmount('350');
              setLastAction('reset');
            }}
            containerStyle={styles.buttonPressable}
            contentStyle={[
              styles.secondaryButton,
              isAndroid && styles.secondaryButtonAndroid,
              { borderColor: theme.border },
            ]}
            androidRippleColor={theme.mutedSurface}
          >
            <ThemeText>Cancel</ThemeText>
          </LivePressable>
          <LivePressable
            onPress={() => setLastAction('schedule')}
            containerStyle={styles.buttonPressable}
            contentStyle={[
              styles.primaryButton,
              isAndroid && styles.primaryButtonAndroid,
              { backgroundColor: theme.accent },
            ]}
            androidRippleColor={theme.mutedSurface}
          >
            <ThemeText style={{ color: theme.onAccent }}>Schedule</ThemeText>
          </LivePressable>
        </View>
        <ThemeText variant={'muted'} style={styles.actionHint}>
          {lastAction === 'none'
            ? 'Try actions and form fields to preview native interaction states.'
            : lastAction === 'schedule'
              ? 'Transfer draft marked for scheduling.'
              : lastAction === 'quick-action'
                ? 'Quick action triggered.'
                : 'Form reset to defaults.'}
        </ThemeText>
      </ThemeSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  heroCard: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    overflow: 'hidden',
  },
  heroTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  heroTextWrap: {
    flex: 1,
    gap: Spacing.xs,
  },
  heroPill: {
    borderRadius: Radius.pill,
    minHeight: ControlSize.badge,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    justifyContent: 'center',
  },
  heroMetrics: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  metricCard: {
    flex: 1,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  accountRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  accountCard: {
    flex: 1,
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    gap: Spacing.xs,
  },
  quickActionRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  quickAction: {
    alignItems: 'center',
    borderRadius: Radius.sm,
    justifyContent: 'center',
    minHeight: ControlSize.button,
  },
  quickActionPressable: {
    flex: 1,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  allocationPanel: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  allocationTrack: {
    flexDirection: 'row',
    borderRadius: Radius.pill,
    height: Spacing.sm + Spacing.xs,
    overflow: 'hidden',
  },
  allocationSegment: {
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    height: Spacing.xs,
    width: Spacing.xs,
    borderRadius: Radius.pill,
  },
  itemCard: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  cardPressable: {
    borderRadius: Radius.md,
    shadowOpacity: 0.08,
    shadowRadius: Spacing.xs,
    shadowOffset: { width: 0, height: 2 },
    elevation: Elevation.low,
    overflow: 'hidden',
  },
  cardPressableAndroid: {
    elevation: 0,
    shadowOpacity: 0,
  },
  cardContent: {
    borderRadius: Radius.md,
  },
  itemRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.md,
  },
  itemTextWrap: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.xs,
  },
  itemBadge: {
    alignItems: 'center',
    borderRadius: Radius.pill,
    height: ControlSize.badge,
    justifyContent: 'center',
    width: ControlSize.badge,
  },
  formSection: {
    borderWidth: Border.regular,
    borderRadius: Radius.md,
    gap: Spacing.sm,
    padding: Spacing.md,
    overflow: 'hidden',
  },
  fieldGroup: {
    gap: Spacing.xs,
  },
  fieldLabel: {
    fontSize: Spacing.sm,
  },
  input: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    minHeight: ControlSize.input,
    fontSize: Spacing.sm + Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  buttonPressable: {
    flex: 1,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  secondaryButton: {
    borderWidth: Border.regular,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: ControlSize.button,
  },
  primaryButton: {
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: ControlSize.button,
  },
  actionHint: {
    marginTop: Spacing.xs,
  },
  androidPanel: {
    borderWidth: Border.thin,
    elevation: Elevation.low,
  },
  inputAndroid: {
    borderWidth: Border.thin,
  },
  secondaryButtonAndroid: {
    borderWidth: Border.thin,
  },
  primaryButtonAndroid: {
    elevation: Elevation.mid,
  },
  colorOrb: {
    position: 'absolute',
    opacity: 0.2,
    borderRadius: Radius.pill,
    height: ControlSize.probe + ControlSize.badge,
    width: ControlSize.probe + ControlSize.badge,
  },
  formOrb: {
    top: -Spacing.lg,
    right: Spacing.sm,
  },
});
