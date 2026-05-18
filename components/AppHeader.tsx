import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

const BRAND_FULL = 'Centrum Dobrego Dialogu';
const BRAND_SHORT = 'CDD';

export function AppHeader({ navigation, back }: NativeStackHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isSm } = useResponsive();
  const webStyle = Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : null;

  const goHome = () => router.replace('/');

  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        {back ? (
          <Pressable
            accessibilityLabel="Cofnij"
            onPress={navigation.goBack}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed, webStyle]}
          >
            <Ionicons name="chevron-back" size={18} color={colors.ink} />
            <Text style={styles.backLabel}>Wstecz</Text>
          </Pressable>
        ) : (
          <View style={{ width: 80 }} />
        )}

        <Pressable
          accessibilityLabel="Strona główna"
          onPress={goHome}
          style={({ pressed }) => [styles.brand, pressed && styles.pressed, webStyle]}
        >
          <LinearGradient
            colors={[colors.clay, colors.clayDeep] as unknown as string[]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.brandDot}
          >
            <Ionicons name="heart" size={11} color="#FFF7EC" />
          </LinearGradient>
          <Text style={styles.brandText} numberOfLines={1}>
            {isSm ? BRAND_FULL : BRAND_SHORT}
          </Text>
        </Pressable>

        <View style={{ width: 80 }} />
      </View>
      <View style={styles.hairline} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.paperGlow,
    ...(Platform.OS === 'web' ? { position: 'sticky' as any, top: 0, zIndex: 50 } : {}),
  },
  row: {
    height: 64,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  backLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.ink,
    letterSpacing: 0.2,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  brandDot: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontFamily: fonts.serifMedium,
    fontSize: 17,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  pressed: { opacity: 0.6 },

  hairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.hairline,
  },
});
