import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { GradientButton } from '@/components/GradientButton';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, gradients, radius, spacing, typography } from '@/constants/theme';
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
    tone: '#EDE9FE',
    fg: '#7C3AED',
    actionLabel: 'Napisz wiadomość',
    actionIcon: 'arrow-up-outline' as const,
    onPress: () => Linking.openURL(`mailto:${EMAIL}`),
  },
  {
    icon: 'call-outline' as const,
    label: 'Telefon',
    value: PHONE,
    tone: '#D1FAE5',
    fg: '#059669',
    actionLabel: 'Zadzwoń',
    actionIcon: 'arrow-up-outline' as const,
    onPress: () => Linking.openURL(`tel:${PHONE.replace(/\s+/g, '')}`),
  },
  {
    icon: 'location-outline' as const,
    label: 'Adres gabinetu',
    value: ADDRESS,
    tone: '#FEF3C7',
    fg: '#B45309',
    actionLabel: 'Otwórz w Google Maps',
    actionIcon: 'navigate-outline' as const,
    onPress: () => Linking.openURL(mapsUrl),
  },
];

export default function ContactScreen() {
  const { isMd } = useResponsive();

  return (
    <View style={styles.root}>
      <GradientBackground colors={gradients.hero} blobs />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <AnimatedFade>
            <ResponsiveContainer>
              <Pill label="Kontakt" tone="sage" />

              <Text style={styles.title}>Porozmawiajmy</Text>

              <Text style={styles.intro}>
                Chętnie odpowiemy na pytania i pomożemy umówić pierwszą
                konsultację. Napisz, zadzwoń albo odwiedź nas osobiście.
              </Text>

              <View style={[styles.grid, isMd && styles.gridRow]}>
                {rows.map((r) => (
                  <View
                    key={r.label}
                    style={[styles.gridItem, isMd && styles.gridItemThird]}
                  >
                    <Pressable
                      onPress={r.onPress}
                      style={({ pressed }) => [
                        styles.contactCard,
                        pressed && styles.contactCardPressed,
                      ]}
                    >
                      <View style={styles.contactCardTop}>
                        <View style={[styles.icon, { backgroundColor: r.tone }]}>
                          <Ionicons name={r.icon} size={22} color={r.fg} />
                        </View>
                        <Text style={styles.rowLabel}>{r.label}</Text>
                        <Text style={styles.rowValue}>{r.value}</Text>
                      </View>
                      <View style={styles.actionHint}>
                        <Ionicons name={r.actionIcon} size={14} color={colors.lavenderDeep} />
                        <Text style={styles.actionHintText}>{r.actionLabel}</Text>
                      </View>
                    </Pressable>
                  </View>
                ))}
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
                  icon="navigate-outline"
                  onPress={() => Linking.openURL(mapsUrl)}
                />
              </View>

              <GlassCard style={styles.note}>
                <Text style={typography.muted}>
                  Pierwsza konsultacja trwa około 50 minut i służy wzajemnemu
                  poznaniu oraz ustaleniu, w jakiej formie wsparcie będzie
                  najbardziej pomocne.
                </Text>
              </GlassCard>
            </ResponsiveContainer>
          </AnimatedFade>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingTop: spacing.lg, paddingBottom: spacing.xxxl },
  title: {
    ...typography.display,
    fontSize: 38,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  intro: {
    ...typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.lg,
    maxWidth: 560,
  },
  grid: { gap: spacing.md, marginBottom: spacing.lg },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' },
  gridItem: { width: '100%' },
  gridItemThird: { flex: 1, minWidth: 200, alignSelf: 'stretch' },
  contactCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 200,
    justifyContent: 'space-between',
  },
  contactCardTop: {
    // group icon + label + value so actionHint sits at the bottom
  },
  contactCardPressed: {
    backgroundColor: colors.bgWarm,
    borderColor: colors.lavenderDeep,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  rowLabel: {
    ...typography.label,
    color: colors.inkSoft,
    marginBottom: 4,
  },
  rowValue: {
    fontSize: 16,
    color: colors.ink,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  actionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
  },
  actionHintText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.lavenderDeep,
    letterSpacing: 0.3,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  note: { marginTop: spacing.sm },
});
