import { Platform, ScrollView, StyleSheet } from 'react-native';
import { OverviewShowcase } from '@/components/overview-showcase';
import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { Product } from '@/constants/product';
import { ScreenSpacing, Spacing } from '@/theme/spacing';
import { useScrollContentPaddingBottom } from '@/theme/use-scroll-content-padding';

export default function HomeScreen() {
  const isIos = Platform.OS === 'ios';
  const paddingBottom = useScrollContentPaddingBottom();

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
        <ThemeText variant={'title'}>{Product.tabs.overview}</ThemeText>
        <ThemeText variant={'muted'}>
          {Product.name} demonstrates production-style finance screens while staying lightweight as an
          example app.
        </ThemeText>
        <OverviewShowcase />
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
});
