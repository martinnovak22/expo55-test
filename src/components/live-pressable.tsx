import { useMemo, useRef, type ReactNode } from 'react';
import {
  Animated,
  Pressable,
  type ColorValue,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { IS_ANDROID } from '@/theme/platform';

type LivePressableProps = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  scaleTo?: number;
  androidRippleColor?: ColorValue;
};

const SPRING_CONFIG = {
  useNativeDriver: true,
  speed: 28,
  bounciness: 0,
} as const;

const DEFAULT_RIPPLE_COLOR: ColorValue = '#D4D4D8';

export function LivePressable({
  children,
  containerStyle,
  contentStyle,
  scaleTo = 0.97,
  androidRippleColor,
  onPressIn,
  onPressOut,
  ...props
}: LivePressableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const androidRipple = useMemo(
    () =>
      IS_ANDROID
        ? { color: androidRippleColor ?? DEFAULT_RIPPLE_COLOR, borderless: false }
        : undefined,
    [androidRippleColor]
  );

  const animateTo = (value: number) => {
    Animated.spring(scale, { ...SPRING_CONFIG, toValue: value }).start();
  };

  return (
    <Pressable
      {...props}
      android_ripple={androidRipple}
      onPressIn={(event) => {
        animateTo(scaleTo);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateTo(1);
        onPressOut?.(event);
      }}
      style={containerStyle}
    >
      <Animated.View style={[contentStyle, { transform: [{ scale: scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
