import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { Footer } from '@/components/Footer';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { GradientButton } from '@/components/GradientButton';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, fonts, radius, spacing, typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

const EMAIL = 'kontakt@centrumdobregodialogu.pl';
const PHONE = '+48 600 123 456';
const ADDRESS = 'ul. Spokojna 12, 00-001 Warszawa';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const rows = [
  {
    icon: 'mail-outline' as const,
    label: 'E-mail',
    value: EMAIL,
    tone: 'clay' as const,
    actionLabel: 'Napisz wiadomość',
    onPress: () => Linking.openURL(`mailto:${EMAIL}`),
  },
  {
    icon: 'call-outline' as const,
    label: 'Telefon',
    value: PHONE,
    tone: 'sage' as const,
    actionLabel: 'Zadzwoń',
    onPress: () => Linking.openURL(`tel:${PHONE.replace(/\s+/g, '')}`),
  },
  {
    icon: 'location-outline' as const,
    label: 'Adres gabinetu',
    value: ADDRESS,
    tone: 'blush' as const,
    actionLabel: 'Otwórz w Google Maps',
    onPress: () => Linking.openURL(mapsUrl),
  },
];

const hours = [
  { day: 'Poniedziałek – Czwartek', range: '10:00 – 20:00' },
  { day: 'Piątek', range: '10:00 – 18:00' },
  { day: 'Sobota', range: '10:00 – 14:00' },
  { day: 'Niedziela', range: 'Nieczynne' },
];

export default function ContactScreen() {
  const { isMd, isLg } = useResponsive();

  const titleSize = isLg ? 56 : isMd ? 48 : 36;
  const titleLine = isLg ? 62 : isMd ? 54 : 42;

  return (
    <View style={styles.root}>
      <GradientBackground />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <AnimatedFade>
            <ResponsiveContainer maxWidth={1080}>
              <Pill label="Kontakt" tone="clay" />

              <Text style={[styles.title, { fontSize: titleSize, lineHeight: titleLine }]}>
                <Text style={styles.titleItalic}>Porozmawiajmy.</Text>{' '}
                Jesteśmy tu, by wysłuchać
              </Text>

              <Text style={styles.intro}>
                Chętnie odpowiemy na pytania i pomożemy umówić pierwszą konsultację.
                Napisz, zadzwoń albo zajrzyj do nas — bez zobowiązań, bez pośpiechu.
              </Text>

              <View style={[styles.layout, isMd && styles.layoutMd]}>
                {/* Contact rows */}
                <View style={[styles.col, isMd && styles.colMain]}>
                  {rows.map((r) => (
                    <ContactRow key={r.label} {...r} />
                  ))}
                </View>

                {/* Hours card — sage variant (calmer than dark ink) */}
                <View style={[styles.col, isMd && styles.colAside]}>
                  <View style={styles.hoursCard}>
                    <View style={styles.hoursTopRow}>
                      <View style={styles.hoursIcon}>
                        <Ionicons name="time-outline" size={16} color={colors.sageDeep} />
                      </View>
                      <Text style={styles.hoursEyebrow}>Godziny pracy</Text>
                    </View>
                    <Text style={styles.hoursTitle}>Otwarci dla Was</Text>
                    <View style={styles.hoursList}>
                      {hours.map((h, i) => (
                        <View
                          key={h.day}
                          style={[
                            styles.hoursRow,
                            i < hours.length - 1 && styles.hoursRowBorder,
                          ]}
                        >
                          <Text style={styles.hoursDay}>{h.day}</Text>
                          <Text style={styles.hoursRange}>{h.range}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.actions}>
                <GradientButton
                  label="Napisz wiadomość"
                  icon="mail-outline"
                  onPress={() => Linking.openURL(`mailto:${EMAIL}`)}
                />
                <GradientButton
                  label="Zadzwoń"
                  variant="glass"
                  icon="call-outline"
                  onPress={() => Linking.openURL(`tel:${PHONE.replace(/\s+/g, '')}`)}
                />
                <GradientButton
                  label="Trasa dojazdu"
                  variant="ghost"
                  iconRight="navigate-outline"
                  onPress={() => Linking.openURL(mapsUrl)}
                />
              </View>

              <GlassCard variant="blush" padding="lg" rounded="lg" style={styles.note}>
                <View style={styles.noteRow}>
                  <Ionicons name="cafe-outline" size={20} color={colors.clayDeep} />
                  <Text style={styles.noteText}>
                    Pierwsza konsultacja trwa około{' '}
                    <Text style={styles.noteEmph}>50 minut</Text> i służy wzajemnemu
                    poznaniu oraz ustaleniu, w jakiej formie wsparcie będzie najbardziej
                    pomocne. Po sesji nie ma żadnego zobowiązania.
                  </Text>
                </View>
              </GlassCard>

              <Footer />
            </ResponsiveContainer>
          </AnimatedFade>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ContactRow({
  icon,
  label,
  value,
  tone,
  actionLabel,
  onPress,
}: (typeof rows)[number]) {
  const accent: Record<typeof tone, { bg: string; fg: string }> = {
    clay: { bg: colors.blush, fg: colors.clayDeep },
    sage: { bg: colors.sageWash, fg: colors.sageDeep },
    blush: { bg: colors.blushDeep, fg: colors.wine },
  };
  const t = accent[tone];
  return (
    <Pressable
      accessibilityRole="link"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={[styles.rowIcon, { backgroundColor: t.bg }]}>
        <Ionicons name={icon} size={22} color={t.fg} />
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
        <View style={styles.rowAction}>
          <Text style={[styles.rowActionText, { color: t.fg }]}>{actionLabel}</Text>
          <Ionicons name="arrow-forward" size={14} color={t.fg} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: spacing.lg, paddingBottom: spacing.xl },

  title: {
    fontFamily: fonts.serif,
    color: colors.ink,
    letterSpacing: -1.2,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    maxWidth: 880,
  },
  titleItalic: {
    fontFamily: fonts.serifItalic,
    color: colors.clayDeep,
  },
  intro: {
    ...typography.bodyLarge,
    fontSize: 17,
    maxWidth: 560,
    marginBottom: spacing.xl,
  },

  layout: {
    flexDirection: 'column',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  layoutMd: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  col: { width: '100%', gap: spacing.md },
  colMain: { flex: 1.3 },
  colAside: { flex: 1 },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  rowPressed: {
    backgroundColor: colors.paperGlow,
    transform: [{ scale: 0.995 }],
  },
  rowIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: { flex: 1, gap: 4 },
  rowLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.stone,
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  rowValue: {
    ...typography.subhead,
    marginBottom: spacing.xs,
  },
  rowAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xs,
  },
  rowActionText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    letterSpacing: 0.3,
  },

  // sage hours card — calmer than dark ink
  hoursCard: {
    backgroundColor: colors.sageWash,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.sageHairline,
  },
  hoursTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  hoursIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoursEyebrow: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.sageDeep,
    letterSpacing: 0.5,
  },
  hoursTitle: {
    ...typography.heading,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  hoursList: {},
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  hoursRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.sageHairline,
  },
  hoursDay: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.ink,
  },
  hoursRange: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.sageDeep,
  },

  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  note: { marginTop: spacing.sm },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  noteText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkSoft,
    flex: 1,
  },
  noteEmph: {
    fontFamily: fonts.sansSemibold,
    color: colors.clayDeep,
  },
});
