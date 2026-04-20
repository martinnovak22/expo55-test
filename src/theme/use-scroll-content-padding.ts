import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenSpacing } from '@/theme/spacing';

export function useScrollContentPaddingTop() {
  const insets = useSafeAreaInsets();

  // Avoid platform skew (iOS notch can be very tall) while still keeping
  // content clear of the status area.
  return Math.max(insets.top, ScreenSpacing.contentPadding);
}

export function useScrollContentPaddingBottom() {
  const insets = useSafeAreaInsets();

  return ScreenSpacing.contentBottomPadding + insets.bottom;
}
