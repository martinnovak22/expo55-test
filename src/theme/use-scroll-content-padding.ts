import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenSpacing } from '@/theme/spacing';

export function useScrollContentPaddingBottom() {
  const insets = useSafeAreaInsets();

  return ScreenSpacing.contentBottomPadding + insets.bottom;
}
