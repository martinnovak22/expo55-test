import { useRef, type ReactNode } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  type ColorValue,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type LivePressableProps = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  scaleTo?: number;
  androidRippleColor?: ColorValue;
};

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
  const isAndroid = Platform.OS === 'android';

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 28,
      bounciness: 0,
    }).start();
  };

  return (
    <Pressable
      {...props}
      android_ripple={
        isAndroid
          ? {
              color: androidRippleColor ?? '#D4D4D8',
              borderless: false,
            }
          : undefined
      }
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
