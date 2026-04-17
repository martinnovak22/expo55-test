import { ScrollView, StyleSheet, View } from 'react-native';

import { DemoCard } from '@/components/demo-card';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { ScreenSpacing, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';

export default function HomeScreen() {
  const theme = useAppTheme();

  return (
    <ThemeSurface variant={'background'} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemeText variant={'title'}>Expo Router v55 Demo</ThemeText>
        <ThemeText variant={'muted'}>
          This example highlights native tabs on iOS and dynamic Material colors on Android.
        </ThemeText>

        <DemoCard
          title={'Native Router Tabs'}
          subtitle={'Using expo-router/unstable-native-tabs with system icons and native behavior.'}
        />

        <DemoCard
          title={'Dynamic Theme Loading'}
          subtitle={
            'Colors are read from Expo Router Color API and update when system theme changes.'
          }
        >
          <View style={[styles.pill, { backgroundColor: theme.accent }]}>
            <ThemeText variant={'badge'} style={{ color: theme.onAccent }}>
              Accent from platform palette
            </ThemeText>
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
    paddingBottom: ScreenSpacing.contentBottomPadding,
  },
  pill: {
    borderRadius: 999,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
});
