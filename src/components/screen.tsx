import { type ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { IS_IOS } from '@/theme/platform';
import { ScreenSpacing, Spacing } from '@/theme/spacing';
import {
  useScrollContentPaddingBottom,
  useScrollContentPaddingTop,
} from '@/theme/use-scroll-content-padding';

type ScreenProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Screen({ title, subtitle, children }: ScreenProps) {
  const paddingTop = useScrollContentPaddingTop();
  const paddingBottom = useScrollContentPaddingBottom();

  return (
    <ThemeSurface variant={'background'} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          IS_IOS && styles.contentIos,
          { paddingTop, paddingBottom },
        ]}
        contentInsetAdjustmentBehavior={'never'}
        showsVerticalScrollIndicator={false}
      >
        <ThemeText variant={'title'}>{title}</ThemeText>
        {subtitle ? <ThemeText variant={'muted'}>{subtitle}</ThemeText> : null}
        {children}
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
    paddingHorizontal: ScreenSpacing.contentPadding,
  },
  contentIos: {
    paddingHorizontal: Spacing.lg,
  },
});
