import { Color, usePathname, useRouter } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemeText } from '@/components/theme-text';
import { Product } from '@/constants/product';
import { ACTIVITY_ITEMS } from '@/features/activity/data';
import { ActivityTabStateProvider, useActivityTabState } from '@/features/activity/tab-state';
import { HAS_NATIVE_BOTTOM_ACCESSORY, IS_ANDROID, IS_IOS } from '@/theme/platform';
import { ControlSize, Radius, ScreenSpacing, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

function BottomAccessoryChip() {
  const router = useRouter();
  const { filter, cycleFilter } = useActivityTabState();

  const filterCount =
    filter === 'all'
      ? ACTIVITY_ITEMS.length
      : ACTIVITY_ITEMS.filter((item) => item.status === filter).length;

  const accessoryLabel =
    filter === 'all' ? `Activity: all (${filterCount})` : `Activity: ${filter} (${filterCount})`;

  return (
    <View style={styles.accessoryInset}>
      <Pressable
        onPress={() => {
          cycleFilter();
          router.navigate('/palette');
        }}
        style={styles.accessory}
      >
        <ThemeText variant={'badge'} style={styles.accessoryText}>
          {accessoryLabel}
        </ThemeText>
      </Pressable>
    </View>
  );
}

function TabsContent() {
  const pathname = usePathname();
  const theme = useAppTheme();
  const { filter } = useActivityTabState();

  const pendingCount = ACTIVITY_ITEMS.filter((item) => item.status === 'pending').length;

  const tabIconColors = IS_ANDROID
    ? { default: theme.mutedText, selected: theme.onAccent }
    : undefined;

  const tabLabelColors = IS_ANDROID
    ? {
        default: { color: theme.mutedText },
        selected: { color: theme.onAccent },
      }
    : undefined;
  const showActivityAccessory = pathname === '/palette';

  return (
    <NativeTabs
      backgroundColor={IS_ANDROID ? theme.surface : Color.ios.systemGroupedBackground}
      blurEffect={HAS_NATIVE_BOTTOM_ACCESSORY ? 'systemUltraThinMaterial' : undefined}
      minimizeBehavior={IS_IOS ? 'onScrollDown' : undefined}
      indicatorColor={IS_ANDROID ? theme.accent : undefined}
      iconColor={tabIconColors}
      labelStyle={tabLabelColors}
    >
      <NativeTabs.Trigger name={'overview'}>
        <NativeTabs.Trigger.Label>{Product.tabs.overview}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'chart.line.uptrend.xyaxis',
            selected: 'chart.line.uptrend.xyaxis.circle.fill',
          }}
          md={'show_chart'}
          selectedColor={IS_ANDROID ? theme.onAccent : undefined}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name={'palette'}>
        <NativeTabs.Trigger.Label>{Product.tabs.activity}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'list.bullet.rectangle', selected: 'list.bullet.rectangle.fill' }}
          md={'receipt_long'}
          selectedColor={IS_ANDROID ? theme.onAccent : undefined}
        />
      </NativeTabs.Trigger>

      {IS_IOS ? (
        <NativeTabs.Trigger name={'search'} role={'search'}>
          <NativeTabs.Trigger.Label>{'Search'}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      ) : (
        <NativeTabs.Trigger name={'search'}>
          <NativeTabs.Trigger.Label>{'Search'}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon md={'search'} />
        </NativeTabs.Trigger>
      )}

      <NativeTabs.Trigger name={'settings'}>
        <NativeTabs.Trigger.Label>{Product.tabs.diagnostics}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
          md={'settings'}
          selectedColor={IS_ANDROID ? theme.onAccent : undefined}
        />
        <NativeTabs.Trigger.Badge>
          {pendingCount > 0 ? String(pendingCount) : undefined}
        </NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>

      {HAS_NATIVE_BOTTOM_ACCESSORY && showActivityAccessory ? (
        <NativeTabs.BottomAccessory>
          <BottomAccessoryChip />
        </NativeTabs.BottomAccessory>
      ) : null}
    </NativeTabs>
  );
}

export default function TabsLayout() {
  return (
    <ActivityTabStateProvider>
      <TabsContent />
    </ActivityTabStateProvider>
  );
}

const styles = StyleSheet.create({
  accessoryInset: {
    width: '100%',
    paddingHorizontal: ScreenSpacing.accessoryInsetHorizontal,
  },
  accessory: {
    alignSelf: 'center',
    minHeight: ControlSize.accessoryMinHeight,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    marginVertical: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.pill,
  },
  accessoryText: {
    color: Color.ios.secondaryLabel,
    textAlign: 'center',
    lineHeight: Spacing.md + Spacing.xxs,
  },
});
