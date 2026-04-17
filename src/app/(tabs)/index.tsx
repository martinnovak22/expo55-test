import { ScrollView, StyleSheet } from 'react-native';

import { HomePlaceholderShowcase } from '@/components/home-placeholder-showcase';
import { ThemeSurface } from '@/components/theme-surface';
import { ScreenSpacing, Spacing } from '@/theme/spacing';
import { useScrollContentPaddingBottom } from '@/theme/use-scroll-content-padding';

export default function HomeScreen() {
  const paddingBottom = useScrollContentPaddingBottom();

  return (
    <ThemeSurface variant={'background'} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: paddingBottom }]}
        showsVerticalScrollIndicator={false}
      >
        <HomePlaceholderShowcase />
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
});
