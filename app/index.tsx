import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { GradientButton } from '@/components/GradientButton';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, gradients, radius, spacing, typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

const features = [
  {
    icon: 'heart-outline' as const,
    title: 'Indywidualne wsparcie',
    desc: 'Konsultacje dla dorosłych w lęku, stresie i kryzysie.',
    tone: 'lavender' as const,
  },
  {
    icon: 'people-outline' as const,
    title: 'Terapia par',
    desc: 'Komunikacja, zaufanie, decyzje o wspólnej przyszłości.',
    tone: 'sage' as const,
  },
  {
    icon: 'leaf-outline' as const,
    title: 'Wsparcie młodzieży',
    desc: 'Bezpieczna przestrzeń dla nastolatków i ich rodziców.',
    tone: 'peach' as const,
  },
  {
    icon: 'sparkles-outline' as const,
    title: 'Interwencja kryzysowa',
    desc: 'Krótkoterminowa pomoc w trudnych momentach życiowych.',
    tone: 'sand' as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isMd } = useResponsive();

  return (
    <View style={styles.root}>
      <GradientBackground colors={gradients.hero} blobs />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <AnimatedFade>
            <ResponsiveContainer>
              <View style={styles.eyebrowRow}>
                <Pill label="Stowarzyszenie psychologów" tone="lavender" />
              </View>

              <Text style={styles.title}>
                Centrum{'\n'}Dobrego Dialogu
              </Text>

              <Text style={styles.subtitle}>
                Spotykamy się z Tobą tam, gdzie jesteś. Wspieramy dorosłych,
                pary i młodzież w trudnych momentach i codziennych wyzwaniach.
              </Text>

              <View style={styles.heroActions}>
                <GradientButton
                  label="Poznaj psychologów"
                  icon="people-circle-outline"
                  onPress={() => router.push('/psychologists')}
                />
                <GradientButton
                  label="Kontakt"
                  variant="glass"
                  icon="chatbubble-ellipses-outline"
                  onPress={() => router.push('/contact')}
                />
              </View>

              <GlassCard style={styles.statsCard}>
                <View style={styles.statsRow}>
                  <Stat value="10+" label="lat doświadczenia" />
                  <Divider />
                  <Stat value="4" label="specjalizacje" />
                  <Divider />
                  <Stat value="100%" label="poufność" />
                </View>
              </GlassCard>

              <Text style={styles.sectionEyebrow}>Czym się zajmujemy</Text>
              <Text style={styles.sectionTitle}>Pomoc dopasowana do Ciebie</Text>

              <View style={[styles.grid, isMd && styles.gridTwoCols]}>
                {features.map((f) => (
                  <View
                    key={f.title}
                    style={[styles.gridItem, isMd && styles.gridItemHalf]}
                  >
                    <FeatureCard {...f} />
                  </View>
                ))}
              </View>

              <GlassCard style={styles.ctaCard} padding="xl">
                <Text style={styles.ctaTitle}>Nie wiesz, od czego zacząć?</Text>
                <Text style={styles.ctaSub}>
                  Napisz do nas — pomożemy dobrać formę wsparcia.
                </Text>
                <View style={styles.ctaActions}>
                  <GradientButton
                    label="Umów konsultację"
                    iconRight="arrow-forward"
                    onPress={() => router.push('/contact')}
                  />
                  <GradientButton
                    label="O stowarzyszeniu"
                    variant="ghost"
                    onPress={() => router.push('/about')}
                  />
                </View>
              </GlassCard>
            </ResponsiveContainer>
          </AnimatedFade>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function FeatureCard({
  icon,
  title,
  desc,
  tone,
}: (typeof features)[number]) {
  const tones: Record<typeof tone, string> = {
    lavender: '#EDE9FE',
    sage: '#D1FAE5',
    peach: '#FFE4E1',
    sand: '#FEF3C7',
  };
  const iconColors: Record<typeof tone, string> = {
    lavender: '#7C3AED',
    sage: '#059669',
    peach: '#DC2626',
    sand: '#D97706',
  };
  return (
    <View style={styles.feature}>
      <View style={[styles.featureIcon, { backgroundColor: tones[tone] }]}>
        <Ionicons name={icon} size={22} color={iconColors[tone]} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  eyebrowRow: { marginBottom: spacing.md },
  title: {
    ...typography.display,
    fontSize: 44,
    lineHeight: 50,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    fontSize: 17,
    lineHeight: 26,
    color: colors.inkSoft,
    marginBottom: spacing.lg,
    maxWidth: 560,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  statsCard: {
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.5,
  },
  statLabel: {
    ...typography.label,
    color: colors.inkSoft,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },

  sectionEyebrow: {
    ...typography.label,
    color: colors.lavenderDeep,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.lg,
  },

  grid: {
    flexDirection: 'column',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  gridTwoCols: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: { width: '100%' },
  gridItemHalf: { width: '48%' },

  feature: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 160,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    ...typography.heading,
    fontSize: 17,
    marginBottom: spacing.xs,
  },
  featureDesc: {
    ...typography.muted,
  },

  ctaCard: {
    alignItems: 'flex-start',
  },
  ctaTitle: {
    ...typography.title,
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  ctaSub: {
    ...typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.lg,
  },
  ctaActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
