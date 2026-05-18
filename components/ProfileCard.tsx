import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Platform } from 'react-native';
import { colors, fonts, radius, shadows, spacing } from '@/constants/theme';
import type { Psychologist } from '@/types/psychologist';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  psychologist: Psychologist;
  index?: number;
  total?: number;
  onPress?: () => void;
  style?: ViewStyle;
  layout?: 'horizontal' | 'vertical';
};

// Warm directory card. Two layouts:
// - horizontal: portrait left, text right (single column, mobile)
// - vertical:   portrait top centered, text below (grid, desktop)
export function ProfileCard({ psychologist, index = 0, onPress, style, layout = 'horizontal' }: Props) {
  const scale = useSharedValue(1);
  const elevate = useSharedValue(0);
  const hover = useSharedValue(0);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: -elevate.value }],
    opacity: 1 - hover.value * 0.05,
  }));

  const onIn = () => {
    scale.value = withSpring(0.99, { damping: 18, stiffness: 240 });
    elevate.value = withSpring(4, { damping: 18, stiffness: 240 });
  };
  const onOut = () => {
    scale.value = withSpring(1, { damping: 18, stiffness: 240 });
    elevate.value = withSpring(0, { damping: 18, stiffness: 240 });
  };
  const onHoverIn = () => {
    hover.value = withTiming(1, { duration: 160 });
  };
  const onHoverOut = () => {
    hover.value = withTiming(0, { duration: 160 });
  };

  const ringColors =
    index % 2 === 0
      ? ([colors.clay, colors.blushDeep] as const)
      : ([colors.sage, colors.sageWash] as const);

  const webStyle = Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : null;

  const isVertical = layout === 'vertical';

  if (isVertical) {
    return (
      <AnimatedPressable
        accessibilityRole="link"
        onPress={onPress}
        onPressIn={onIn}
        onPressOut={onOut}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        style={[styles.cardVertical, aStyle, webStyle, style]}
      >
        <LinearGradient
          colors={ringColors as unknown as string[]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ringVertical}
        >
          <Image source={{ uri: psychologist.photo }} style={styles.photoVertical} />
        </LinearGradient>

        <View style={styles.bodyVertical}>
          <Text style={styles.nameVertical}>{psychologist.name}</Text>
          <Text style={styles.spec}>{psychologist.specialization}</Text>
          <Text style={styles.desc} numberOfLines={3}>
            {psychologist.shortDescription}
          </Text>
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaText}>Poznaj profil</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.clayDeep} />
        </View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      accessibilityRole="link"
      onPress={onPress}
      onPressIn={onIn}
      onPressOut={onOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      style={[styles.card, aStyle, webStyle, style]}
    >
      <LinearGradient
        colors={ringColors as unknown as string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ring}
      >
        <Image source={{ uri: psychologist.photo }} style={styles.photo} />
      </LinearGradient>

      <View style={styles.body}>
        <Text style={styles.name}>{psychologist.name}</Text>
        <Text style={styles.spec}>{psychologist.specialization}</Text>
        <Text style={styles.desc} numberOfLines={3}>
          {psychologist.shortDescription}
        </Text>

        <View style={styles.cta}>
          <Text style={styles.ctaText}>Poznaj profil</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.clayDeep} />
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  // horizontal
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    paddingRight: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    ...shadows.soft,
  },
  ring: { padding: 4, borderRadius: radius.pill },
  photo: {
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    backgroundColor: colors.paperWarm,
  },
  body: { flex: 1, minWidth: 0 },
  name: {
    fontFamily: fonts.serifMedium,
    fontSize: 22,
    lineHeight: 28,
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 2,
  },

  // vertical
  cardVertical: {
    flexDirection: 'column',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    alignItems: 'flex-start',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    ...shadows.soft,
    minHeight: 320,
  },
  ringVertical: { padding: 5, borderRadius: radius.pill },
  photoVertical: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.paperWarm,
  },
  bodyVertical: { width: '100%', flex: 1 },
  nameVertical: {
    fontFamily: fonts.serifMedium,
    fontSize: 24,
    lineHeight: 30,
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 2,
  },

  // shared
  spec: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.clayDeep,
    marginBottom: spacing.sm,
  },
  desc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.inkSoft,
    marginBottom: spacing.sm,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 'auto',
  },
  ctaText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.clayDeep,
    letterSpacing: 0.3,
  },
});
