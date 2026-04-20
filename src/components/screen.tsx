import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, type StyleProp, View, type ViewStyle } from 'react-native';

import { ThemeSurface } from '@/components/theme-surface';
import { ThemeText } from '@/components/theme-text';
import { IS_ANDROID } from '@/theme/platform';
import { ScreenSpacing, Spacing } from '@/theme/spacing';
import { useAppTheme } from '@/theme/use-app-theme';
import {
  useScrollContentPaddingBottom,
  useScrollContentPaddingTop,
} from '@/theme/use-scroll-content-padding';

type ScreenProps = {
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  useNativeHeader?: boolean;
  androidHeaderLeft?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export function Screen({
  title,
  subtitle,
  showTitle = true,
  useNativeHeader = false,
  androidHeaderLeft,
  contentContainerStyle,
  children,
}: ScreenProps) {
  const theme = useAppTheme();
  const safeAreaPaddingTop = useScrollContentPaddingTop();
  const paddingBottom = useScrollContentPaddingBottom();
  const useAndroidHeaderBand = IS_ANDROID && !useNativeHeader && (showTitle || Boolean(subtitle));
  const resolvedPaddingTop = useNativeHeader ? 0 : useAndroidHeaderBand ? 0 : safeAreaPaddingTop;

  return (
    <ThemeSurface collapsable={false} variant={'background'} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: resolvedPaddingTop,
            paddingBottom,
          },
          contentContainerStyle,
        ]}
        contentInsetAdjustmentBehavior={useNativeHeader ? 'automatic' : 'never'}
        showsVerticalScrollIndicator={false}
      >
        {useAndroidHeaderBand ? (
          <ThemeSurface
            variant={'surface'}
            style={[
              styles.androidHeaderBand,
              {
                backgroundColor: theme.accent,
                borderBottomColor: theme.border,
                paddingTop: safeAreaPaddingTop,
              },
            ]}
          >
            <View style={styles.androidHeaderRow}>
              <View style={styles.androidHeaderSide}>{androidHeaderLeft}</View>
              {showTitle && title ? (
                <ThemeText
                  variant={'subtitle'}
                  style={[styles.androidHeaderTitle, { color: theme.onAccent }]}
                >
                  {title}
                </ThemeText>
              ) : (
                <View style={styles.androidHeaderTitle} />
              )}
              <View style={styles.androidHeaderSide} />
            </View>
          </ThemeSurface>
        ) : (
          <>
            {showTitle && title ? <ThemeText variant={'title'}>{title}</ThemeText> : null}
            {subtitle ? <ThemeText variant={'muted'}>{subtitle}</ThemeText> : null}
          </>
        )}
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
  androidHeaderBand: {
    marginHorizontal: -ScreenSpacing.contentPadding,
    paddingHorizontal: ScreenSpacing.contentPadding,
    paddingBottom: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  androidHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  androidHeaderTitle: {
    flex: 1,
    textAlign: 'center',
    lineHeight: Spacing.xl,
  },
  androidHeaderSide: {
    width: Spacing.xl + Spacing.xs,
    justifyContent: 'center',
  },
});
