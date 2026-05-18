import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Subtle fade-in. No translate, short duration — entrance should not be felt.
 */
export function AnimatedFade({
  children,
  delay = 0,
  duration = 180,
  style,
}: Props) {
  return (
    <Animated.View entering={FadeIn.duration(duration).delay(delay)} style={style}>
      {children}
    </Animated.View>
  );
}
