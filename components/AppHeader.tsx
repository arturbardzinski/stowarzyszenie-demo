import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, gradients, radius, spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

const BRAND_FULL = 'Centrum Dobrego Dialogu';
const BRAND_SHORT = 'CDD';

export function AppHeader({ navigation, back }: NativeStackHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isSm } = useResponsive();

  const goHome = () => {
    // replace zamiast push: nie stackujemy home na stos aktualnej trasy
    router.replace('/');
  };

  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      <BlurView
        intensity={50}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.tintOverlay} pointerEvents="none" />
      <View style={styles.row}>
        <View style={styles.left}>
          {back ? (
            <Pressable
              accessibilityLabel="Cofnij"
              onPress={navigation.goBack}
              style={({ pressed }) => [
                styles.iconBtn,
                pressed && styles.iconBtnPressed,
              ]}
            >
              <Ionicons name="chevron-back" size={20} color={colors.ink} />
            </Pressable>
          ) : null}

          <Pressable
            accessibilityLabel="Strona główna"
            onPress={goHome}
            style={({ pressed }) => [
              styles.brand,
              pressed && styles.brandPressed,
            ]}
          >
            <LinearGradient
              colors={gradients.accent as unknown as string[]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.brandDot}
            >
              <Ionicons name="heart" size={12} color="#fff" />
            </LinearGradient>
            <Text style={styles.brandText} numberOfLines={1}>
              {isSm ? BRAND_FULL : BRAND_SHORT}
            </Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(31,27,58,0.06)',
    backgroundColor:
      Platform.OS === 'android' ? 'rgba(255,255,255,0.85)' : 'transparent',
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  row: {
    height: 56,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: {
    backgroundColor: colors.bgWarm,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: radius.pill,
    flexShrink: 1,
  },
  brandPressed: {
    opacity: 0.7,
  },
  brandDot: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.2,
    flexShrink: 1,
  },
});
