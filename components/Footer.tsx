import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

const links = [
  { label: 'Strona główna', href: '/' },
  { label: 'Zespół', href: '/psychologists' },
  { label: 'O nas', href: '/about' },
  { label: 'Kontakt', href: '/contact' },
] as const;

type Href = (typeof links)[number]['href'];

export function Footer() {
  const router = useRouter();
  const { isMd } = useResponsive();
  const webStyle = Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : null;

  return (
    <View style={styles.wrap}>
      <View style={styles.rule} />
      <View style={[styles.row, !isMd && styles.rowCol]}>
        <View style={styles.left}>
          <Text style={styles.brand}>Centrum Dobrego Dialogu</Text>
          <Text style={styles.tagline}>Warszawa · od 2014 · demo aplikacji</Text>
        </View>
        <View style={[styles.linksRow, !isMd && styles.linksRowCol]}>
          {links.map((l) => (
            <Pressable
              key={l.href}
              accessibilityRole="link"
              onPress={() => router.push(l.href as Href)}
              style={({ pressed }) => [
                styles.linkBtn,
                pressed && { opacity: 0.6 },
                webStyle,
              ]}
            >
              <Text style={styles.linkText}>{l.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
  },
  rule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.hairline,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  rowCol: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  left: { gap: 4 },
  brand: {
    fontFamily: fonts.serifMedium,
    fontSize: 16,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  tagline: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.stone,
  },
  linksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    alignItems: 'center',
  },
  linksRowCol: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  linkBtn: { paddingVertical: 4 },
  linkText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.inkSoft,
    letterSpacing: 0.2,
  },
});
