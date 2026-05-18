import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors, fonts, radius, shadows, spacing } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'glass' | 'copper' | 'soft';
  icon?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  fullWidth?: boolean;
  rounded?: 'pill' | 'md';
};

// Warm buttons with web hover + focus states:
// - primary / copper:  filled clay rose gradient
// - glass:             cream surface with hairline border
// - soft:              blush surface (warm secondary)
// - ghost:             text-only chevron
export function GradientButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconRight,
  style,
  fullWidth = false,
  rounded = 'pill',
}: Props) {
  const scale = useSharedValue(1);
  const hoverOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: hoverOpacity.value,
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 220 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 220 });
  };
  const onHoverIn = () => {
    hoverOpacity.value = withTiming(0.88, { duration: 140 });
  };
  const onHoverOut = () => {
    hoverOpacity.value = withTiming(1, { duration: 140 });
  };

  const radiusValue = rounded === 'md' ? radius.md : radius.pill;
  const isFilled = variant === 'primary' || variant === 'copper';
  const isSoft = variant === 'soft';

  const labelColor = (() => {
    if (isFilled) return '#FFF7EC';
    if (variant === 'ghost') return colors.clayDeep;
    if (isSoft) return colors.clayDeep;
    return colors.ink;
  })();

  // Web-only style additions — cursor + focus outline
  const webStyle = Platform.OS === 'web' ? (webButtonStyle as any) : null;

  if (isFilled) {
    return (
      <AnimatedPressable
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        style={[
          styles.shadowWrap,
          { borderRadius: radiusValue },
          fullWidth && styles.fullWidth,
          animatedStyle,
          webStyle,
          style,
        ]}
      >
        <LinearGradient
          colors={[colors.clay, colors.clayDeep] as unknown as string[]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, { borderRadius: radiusValue }]}
        >
          {icon ? <Ionicons name={icon} size={16} color={labelColor} style={styles.iconLeft} /> : null}
          <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
          {iconRight ? <Ionicons name={iconRight} size={16} color={labelColor} style={styles.iconRight} /> : null}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  let surface: any = styles.glass;
  if (variant === 'ghost') surface = styles.ghost;
  if (isSoft) surface = styles.soft;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      style={[
        styles.base,
        surface,
        { borderRadius: radiusValue },
        fullWidth && styles.fullWidth,
        animatedStyle,
        webStyle,
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={16} color={labelColor} style={styles.iconLeft} /> : null}
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      {iconRight ? <Ionicons name={iconRight} size={16} color={labelColor} style={styles.iconRight} /> : null}
    </AnimatedPressable>
  );
}

const webButtonStyle = {
  cursor: 'pointer',
  outlineStyle: 'solid',
  outlineWidth: 0,
  outlineColor: colors.focus,
  outlineOffset: 2,
  transition: 'outline-width 120ms ease',
};

const styles = StyleSheet.create({
  shadowWrap: {
    ...shadows.warm,
  },
  base: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairlineStrong,
  },
  soft: {
    backgroundColor: colors.blush,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.clayHairline,
  },
  ghost: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.sm,
  },
  fullWidth: { width: '100%' },
  label: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    letterSpacing: 0.3,
  },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});
