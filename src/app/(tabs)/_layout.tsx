import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform, StyleSheet, View } from 'react-native';

import { isIos26OrLater } from '@/theme/platform';
import { useAppTheme } from '@/theme/use-app-theme';
import { ThemeText } from '@/components/theme-text';

export default function TabsLayout() {
  const theme = useAppTheme();
  const ios26OrLater = isIos26OrLater();

  return (
    <NativeTabs
      backgroundColor={theme.surface}
      blurEffect={ios26OrLater ? 'systemMaterial' : undefined}
      minimizeBehavior={ios26OrLater ? 'onScrollDown' : undefined}
      indicatorColor={theme.accent}
      iconColor={{ default: theme.mutedText, selected: theme.accent }}
      labelStyle={{ default: { color: theme.mutedText }, selected: { color: theme.text } }}
    >
      <NativeTabs.Trigger name={'index'}>
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md={'home'} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name={'palette'}>
        <NativeTabs.Trigger.Label>Palette</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'paintpalette', selected: 'paintpalette.fill' }}
          md={'palette'}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name={'settings'}>
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
          md={'settings'}
        />
      </NativeTabs.Trigger>

      {ios26OrLater ? (
        <NativeTabs.BottomAccessory>
          <View
            style={[
              styles.accessory,
              { backgroundColor: theme.mutedSurface, borderColor: theme.border },
            ]}
          >
            <ThemeText variant={'badge'} style={{ color: theme.accent }}>
              iOS 26+ glass accessory active
            </ThemeText>
          </View>
        </NativeTabs.BottomAccessory>
      ) : null}
    </NativeTabs>
  );
}

const styles = StyleSheet.create({
  accessory: {
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
