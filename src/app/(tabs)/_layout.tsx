import { Color } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeText } from '@/components/theme-text';
import { hasNativeBottomAccessory } from '@/theme/platform';
import { ControlSize, ScreenSpacing, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

export default function TabsLayout() {
  const theme = useAppTheme();
  const ios26OrLater = hasNativeBottomAccessory();
  const isAndroid = Platform.OS === 'android';

  const tabIconColors = isAndroid
    ? { default: theme.mutedText, selected: theme.onAccent }
    : { default: theme.mutedText, selected: theme.text };

  const tabLabelColors = isAndroid
    ? { default: { color: theme.mutedText }, selected: { color: theme.text } }
    : { default: { color: theme.mutedText }, selected: { color: theme.text } };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <NativeTabs
        backgroundColor={isAndroid ? theme.surface : undefined}
        blurEffect={ios26OrLater ? 'systemUltraThinMaterial' : undefined}
        minimizeBehavior={ios26OrLater ? 'onScrollDown' : undefined}
        indicatorColor={isAndroid ? theme.accent : undefined}
        iconColor={tabIconColors}
        labelStyle={tabLabelColors}
      >
        <NativeTabs.Trigger name={'index'}>
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: 'house', selected: 'house.fill' }}
            md={'home'}
            selectedColor={isAndroid ? theme.onAccent : undefined}
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name={'palette'}>
          <NativeTabs.Trigger.Label>Palette</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: 'paintpalette', selected: 'paintpalette.fill' }}
            md={'palette'}
            selectedColor={isAndroid ? theme.onAccent : undefined}
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name={'settings'}>
          <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
            md={'settings'}
            selectedColor={isAndroid ? theme.onAccent : undefined}
          />
        </NativeTabs.Trigger>

        {ios26OrLater ? (
          <NativeTabs.BottomAccessory>
            <View style={styles.accessoryInset}>
              <View style={styles.accessory}>
                <ThemeText variant={'badge'} style={styles.accessoryText}>
                  iOS 26+ glass accessory active
                </ThemeText>
              </View>
            </View>
          </NativeTabs.BottomAccessory>
        ) : null}
      </NativeTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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
