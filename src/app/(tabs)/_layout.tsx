import { Color } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { StyleSheet, View } from 'react-native';
import { Product } from '@/constants/product';
import { ThemeText } from '@/components/theme-text';
import { HAS_NATIVE_BOTTOM_ACCESSORY, IS_ANDROID } from '@/theme/platform';
import { ControlSize, ScreenSpacing, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

export default function TabsLayout() {
  const theme = useAppTheme();

  const tabIconColors = IS_ANDROID
    ? { default: theme.mutedText, selected: theme.onAccent }
    : { default: theme.mutedText, selected: theme.text };

  const tabLabelColors = {
    default: { color: theme.mutedText },
    selected: { color: theme.text },
  };

  return (
    <NativeTabs
      backgroundColor={IS_ANDROID ? theme.surface : Color.ios.systemGroupedBackground}
      blurEffect={HAS_NATIVE_BOTTOM_ACCESSORY ? 'systemUltraThinMaterial' : undefined}
      minimizeBehavior={HAS_NATIVE_BOTTOM_ACCESSORY ? 'onScrollDown' : undefined}
      indicatorColor={IS_ANDROID ? theme.accent : undefined}
      iconColor={tabIconColors}
      labelStyle={tabLabelColors}
    >
      <NativeTabs.Trigger name={'index'}>
        <NativeTabs.Trigger.Label>{Product.tabs.overview}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'chart.line.uptrend.xyaxis', selected: 'chart.line.uptrend.xyaxis.circle.fill' }}
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

      <NativeTabs.Trigger name={'settings'}>
        <NativeTabs.Trigger.Label>{Product.tabs.diagnostics}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
          md={'settings'}
          selectedColor={IS_ANDROID ? theme.onAccent : undefined}
        />
      </NativeTabs.Trigger>

      {HAS_NATIVE_BOTTOM_ACCESSORY ? (
        <NativeTabs.BottomAccessory>
          <View style={styles.accessoryInset}>
            <View style={styles.accessory}>
              <ThemeText variant={'badge'} style={styles.accessoryText}>
                {Product.shortName} native glass accessory
              </ThemeText>
            </View>
          </View>
        </NativeTabs.BottomAccessory>
      ) : null}
    </NativeTabs>
  );
}

const styles = StyleSheet.create({
  accessoryInset: {
    width: '100%',
    paddingHorizontal: ScreenSpacing.accessoryInsetHorizontal,
  },
  accessory: {
    alignSelf: 'stretch',
    width: '100%',
    minHeight: ControlSize.accessoryMinHeight,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    marginVertical: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessoryText: {
    color: Color.ios.secondaryLabel,
    textAlign: 'center',
    lineHeight: Spacing.md + Spacing.xxs,
  },
});
