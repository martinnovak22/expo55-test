import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenSpacing } from '@/theme/spacing';

export function useScrollContentPaddingTop() {
  const insets = useSafeAreaInsets();

  return ScreenSpacing.contentPadding + insets.top;
}

export function useScrollContentPaddingBottom() {
  const insets = useSafeAreaInsets();

  return ScreenSpacing.contentBottomPadding + insets.bottom;
}
