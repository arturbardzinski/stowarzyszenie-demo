import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, gradients, radius, shadows, spacing } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'glass';
  icon?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export function GradientButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconRight,
  style,
  fullWidth = false,
}: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 220 });
  };
  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 220 });
  };

  if (variant === 'ghost') {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.base,
          styles.ghost,
          fullWidth && styles.fullWidth,
          animatedStyle,
          style,
        ]}
      >
        {icon ? <Ionicons name={icon} size={18} color={colors.ink} style={styles.iconLeft} /> : null}
        <Text style={[styles.label, { color: colors.ink }]}>{label}</Text>
        {iconRight ? <Ionicons name={iconRight} size={18} color={colors.ink} style={styles.iconRight} /> : null}
      </AnimatedPressable>
    );
  }

  if (variant === 'glass') {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.base,
          styles.glass,
          fullWidth && styles.fullWidth,
          animatedStyle,
          style,
        ]}
      >
        {icon ? <Ionicons name={icon} size={18} color={colors.ink} style={styles.iconLeft} /> : null}
        <Text style={[styles.label, { color: colors.ink }]}>{label}</Text>
        {iconRight ? <Ionicons name={iconRight} size={18} color={colors.ink} style={styles.iconRight} /> : null}
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.shadowWrap, fullWidth && styles.fullWidth, animatedStyle, style]}
    >
      <LinearGradient
        colors={gradients.accent as unknown as string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.base, styles.primary]}
      >
        {icon ? <Ionicons name={icon} size={18} color="#fff" style={styles.iconLeft} /> : null}
        <Text style={[styles.label, styles.labelPrimary]}>{label}</Text>
        {iconRight ? <Ionicons name={iconRight} size={18} color="#fff" style={styles.iconRight} /> : null}
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: radius.pill,
    ...shadows.soft,
  },
  base: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {},
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  fullWidth: { width: '100%' },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  labelPrimary: { color: '#FFFFFF' },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});
