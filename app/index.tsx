import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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

const pillars = [
  {
    icon: 'heart-outline' as const,
    title: 'Indywidualne wsparcie',
    desc: 'Dla dorosłych mierzących się z lękiem, stresem, wypaleniem lub trudnym momentem życia.',
    tone: 'clay' as const,
  },
  {
    icon: 'people-outline' as const,
    title: 'Terapia par',
    desc: 'Praca nad komunikacją, zaufaniem i wspólnymi decyzjami — w bliskości, którą warto zatrzymać.',
    tone: 'sage' as const,
  },
  {
    icon: 'leaf-outline' as const,
    title: 'Wsparcie młodzieży',
    desc: 'Bezpieczna przestrzeń dla nastolatków i ich rodziców. Bez pouczania, z uważnością.',
    tone: 'blush' as const,
  },
  {
    icon: 'sparkles-outline' as const,
    title: 'Interwencja kryzysowa',
    desc: 'Krótkoterminowa pomoc, kiedy ziemia osuwa się pod stopami. Konkretne kroki, ciepły kontakt.',
    tone: 'sage' as const,
  },
];

const stats = [
  { value: '10+', label: 'lat praktyki' },
  { value: '4', label: 'specjalistów' },
  { value: '100%', label: 'poufność' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isMd, isLg } = useResponsive();

  const heroSize = isLg ? 72 : isMd ? 60 : 44;
  const heroLine = isLg ? 78 : isMd ? 66 : 50;

  return (
    <View style={styles.root}>
      <GradientBackground />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <AnimatedFade>
            {/* HERO */}
            <ResponsiveContainer maxWidth={1080}>
              <Pill label="Stowarzyszenie psychologów · Warszawa" tone="clay" />

              <Text
                style={[styles.heroTitle, { fontSize: heroSize, lineHeight: heroLine }]}
              >
                Spotykamy się{' '}
                <Text style={styles.heroTitleItalic}>tam, gdzie jesteś</Text>
              </Text>

              <Text style={styles.heroLead}>
                Centrum Dobrego Dialogu to mała, kameralna pracownia. Wspieramy
                dorosłych, pary i młodzież — z uważnością, bez pośpiechu i bez
                oceniania. Pierwsza rozmowa służy temu, żebyśmy się poznali.
              </Text>

              <View style={styles.heroActions}>
                <GradientButton
                  label="Poznaj nasz zespół"
                  iconRight="arrow-forward"
                  onPress={() => router.push('/psychologists')}
                />
                <GradientButton
                  label="Napisz do nas"
                  variant="glass"
                  icon="chatbubble-ellipses-outline"
                  onPress={() => router.push('/contact')}
                />
              </View>
            </ResponsiveContainer>

            {/* TRUST STRIP */}
            <ResponsiveContainer maxWidth={1080}>
              <GlassCard padding="lg" rounded="lg" style={styles.trustCard}>
                <View style={[styles.statsRow, !isMd && styles.statsCol]}>
                  {stats.map((s, i) => (
                    <View key={s.label} style={styles.statWrap}>
                      <View style={styles.stat}>
                        <Text style={styles.statValue}>{s.value}</Text>
                        <Text style={styles.statLabel}>{s.label}</Text>
                      </View>
                      {i < stats.length - 1 && isMd ? <View style={styles.statDivider} /> : null}
                    </View>
                  ))}
                </View>
              </GlassCard>
            </ResponsiveContainer>

            {/* PILLARS */}
            <ResponsiveContainer maxWidth={1080}>
              <View style={styles.sectionHead}>
                <Pill label="Czym się zajmujemy" tone="sage" />
                <Text style={styles.sectionTitle}>Pomoc dopasowana do Ciebie</Text>
                <Text style={styles.sectionSub}>
                  Cztery przestrzenie wsparcia. Każda z innym specjalistą — i własnym
                  rytmem pracy.
                </Text>
              </View>

              <View style={[styles.pillarsGrid, isMd && styles.pillarsGridMd]}>
                {pillars.map((p) => (
                  <View
                    key={p.title}
                    style={[styles.pillarItem, isMd && styles.pillarItemMd]}
                  >
                    <PillarCard {...p} />
                  </View>
                ))}
              </View>
            </ResponsiveContainer>

            {/* CTA */}
            <ResponsiveContainer maxWidth={1080}>
              <GlassCard padding="xl" rounded="xl" variant="blush" style={styles.ctaCard}>
                <View style={[styles.ctaInner, isMd && styles.ctaInnerRow]}>
                  <View style={[styles.ctaText, isMd && styles.ctaTextMd]}>
                    <Text style={styles.ctaTitle}>Nie wiesz, od czego zacząć?</Text>
                    <Text style={styles.ctaSub}>
                      Napisz parę zdań o tym, co Cię tu przyprowadza. Pomożemy
                      dobrać specjalistę i pierwszy termin — bez zobowiązań.
                    </Text>
                  </View>

                  <View style={styles.ctaActions}>
                    <GradientButton
                      label="Umów konsultację"
                      iconRight="arrow-forward"
                      onPress={() => router.push('/contact')}
                    />
                    <GradientButton
                      label="O stowarzyszeniu"
                      variant="ghost"
                      iconRight="arrow-forward"
                      onPress={() => router.push('/about')}
                    />
                  </View>
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

function PillarCard({
  icon,
  title,
  desc,
  tone,
}: (typeof pillars)[number]) {
  const accent: Record<typeof tone, { bg: string; fg: string }> = {
    clay: { bg: colors.blush, fg: colors.clayDeep },
    sage: { bg: colors.sageWash, fg: colors.sageDeep },
    blush: { bg: colors.blushDeep, fg: colors.wine },
  };
  const t = accent[tone];

  return (
    <View style={styles.pillarCard}>
      <View style={[styles.pillarIcon, { backgroundColor: t.bg }]}>
        <Ionicons name={icon} size={22} color={t.fg} />
      </View>
      <Text style={styles.pillarTitle}>{title}</Text>
      <Text style={styles.pillarDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  scroll: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },

  heroTitle: {
    fontFamily: fonts.serif,
    color: colors.ink,
    letterSpacing: -1.4,
    marginTop: spacing.lg,
    maxWidth: 880,
  },
  heroTitleItalic: {
    fontFamily: fonts.serifItalic,
    color: colors.clayDeep,
  },
  heroLead: {
    ...typography.bodyLarge,
    fontSize: 18,
    lineHeight: 30,
    marginTop: spacing.lg,
    maxWidth: 580,
    color: colors.inkSoft,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },

  trustCard: {
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statsCol: {
    flexDirection: 'column',
    gap: spacing.lg,
  },
  statWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: fonts.serif,
    fontSize: 42,
    lineHeight: 48,
    color: colors.ink,
    letterSpacing: -1,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.stone,
    letterSpacing: 0.4,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 40,
    backgroundColor: colors.hairline,
  },

  sectionHead: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.title,
    marginTop: spacing.sm,
    maxWidth: 640,
  },
  sectionSub: {
    ...typography.bodyLarge,
    fontSize: 17,
    maxWidth: 560,
    color: colors.inkSoft,
  },

  pillarsGrid: {
    gap: spacing.md,
    flexDirection: 'column',
    marginBottom: spacing.xl,
  },
  pillarsGridMd: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pillarItem: {
    width: '100%',
  },
  pillarItemMd: {
    width: '48.5%',
  },
  pillarCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    minHeight: 180,
  },
  pillarIcon: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  pillarTitle: {
    ...typography.heading,
    marginBottom: spacing.xs,
  },
  pillarDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkSoft,
  },

  ctaCard: {
    marginBottom: spacing.md,
  },
  ctaInner: {
    flexDirection: 'column',
    gap: spacing.lg,
  },
  ctaInnerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.xl,
  },
  ctaText: { flex: 1 },
  ctaTextMd: { flex: 1.4 },
  ctaTitle: {
    ...typography.title,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  ctaSub: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 25,
    color: colors.inkSoft,
    maxWidth: 480,
  },
  ctaActions: {
    flexDirection: 'column',
    gap: spacing.sm,
    alignItems: 'flex-start',
    minWidth: 220,
  },
});
