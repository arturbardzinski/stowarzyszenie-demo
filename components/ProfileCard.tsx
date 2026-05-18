import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, gradients, radius, shadows, spacing, typography } from '@/constants/theme';
import type { Psychologist } from '@/types/psychologist';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const accentByIndex = [
  gradients.cool,
  gradients.warm,
  gradients.accent,
  gradients.heroDeep,
] as const;

type Props = {
  psychologist: Psychologist;
  index?: number;
  onPress?: () => void;
  style?: ViewStyle;
};

export function ProfileCard({ psychologist, index = 0, onPress, style }: Props) {
  const scale = useSharedValue(1);
  const elevate = useSharedValue(0);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: -elevate.value }],
  }));

  const onIn = () => {
    scale.value = withSpring(0.985, { damping: 18, stiffness: 240 });
    elevate.value = withSpring(2, { damping: 18, stiffness: 240 });
  };
  const onOut = () => {
    scale.value = withSpring(1, { damping: 18, stiffness: 240 });
    elevate.value = withSpring(0, { damping: 18, stiffness: 240 });
  };

  const accent = accentByIndex[index % accentByIndex.length];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onIn}
      onPressOut={onOut}
      style={[styles.card, aStyle, style]}
    >
      <LinearGradient
        colors={accent as unknown as string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.avatarRing}
      >
        <Image source={{ uri: psychologist.photo }} style={styles.photo} />
      </LinearGradient>

      <View style={styles.body}>
        <Text style={styles.name}>{psychologist.name}</Text>
        <Text style={styles.spec}>{psychologist.specialization}</Text>
        <Text style={styles.desc} numberOfLines={3}>
          {psychologist.shortDescription}
        </Text>
      </View>

      <View style={styles.chev}>
        <Ionicons name="chevron-forward" size={20} color={colors.inkSoft} />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.md,
    gap: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  avatarRing: {
    padding: 3,
    borderRadius: radius.pill,
  },
  photo: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.bgWarm,
  },
  body: { flex: 1, minWidth: 0 },
  name: {
    ...typography.heading,
    fontSize: 17,
    marginBottom: 2,
  },
  spec: {
    color: colors.lavenderDeep,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  desc: {
    ...typography.muted,
  },
  chev: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.bgWarm,
  },
});
