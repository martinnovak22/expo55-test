import { StyleSheet } from 'react-native';

export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const Radius = {
  xs: Spacing.xs - Spacing.xxs / 2,
  sm: Spacing.sm,
  md: Spacing.md,
  lg: Spacing.lg,
  pill: 999,
} as const;

export const ControlSize = {
  swatch: 28,
  probe: 48,
  badge: 32,
  input: 44,
  button: 44,
  accessoryMinHeight: 36,
} as const;

export const ScreenSpacing = {
  contentPadding: Spacing.md,
  contentBottomPadding: Spacing.lg,
  accessoryInsetHorizontal: Spacing.lg,
} as const;

export const Border = {
  thin: StyleSheet.hairlineWidth,
  regular: 1,
} as const;

export const Elevation = {
  low: 1,
  mid: 2,
} as const;
