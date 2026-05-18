import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, gradients, radius, spacing, typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

const values = [
  {
    icon: 'heart-outline' as const,
    name: 'Empatia',
    desc: 'Słuchamy z uważnością i bez oceniania. Relacja jest podstawą naszej pracy.',
    tone: '#EDE9FE',
    fg: '#7C3AED',
  },
  {
    icon: 'lock-closed-outline' as const,
    name: 'Poufność',
    desc: 'Wszystko, co dzieje się w gabinecie, pozostaje między klientem a specjalistą.',
    tone: '#E0F2FE',
    fg: '#0369A1',
  },
  {
    icon: 'ribbon-outline' as const,
    name: 'Profesjonalizm',
    desc: 'Pracujemy w oparciu o aktualną wiedzę i kodeks etyczny zawodu psychologa.',
    tone: '#D1FAE5',
    fg: '#059669',
  },
  {
    icon: 'sparkles-outline' as const,
    name: 'Rozwój',
    desc: 'Regularnie szkolimy się i korzystamy z superwizji, aby lepiej wspierać klientów.',
    tone: '#FEF3C7',
    fg: '#B45309',
  },
];

export default function AboutScreen() {
  const { isMd } = useResponsive();

  return (
    <View style={styles.root}>
      <GradientBackground colors={gradients.hero} blobs />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <AnimatedFade>
            <ResponsiveContainer>
              <Pill label="O nas" tone="lavender" />

              <Text style={styles.title}>Nasza misja</Text>

              <Text style={styles.intro}>
                Centrum Dobrego Dialogu to stowarzyszenie psychologów, których
                łączy przekonanie, że dobra rozmowa potrafi zmienić bardzo
                wiele. Tworzymy przestrzeń bezpiecznego kontaktu — dla osób w
                kryzysie, dla par, dla młodzieży i dla wszystkich, którzy chcą
                lepiej rozumieć siebie.
              </Text>

              <Text style={styles.sectionEyebrow}>Co nas prowadzi</Text>
              <Text style={styles.sectionTitle}>Nasze wartości</Text>

              <View style={[styles.grid, isMd && styles.gridTwoCols]}>
                {values.map((v) => (
                  <View
                    key={v.name}
                    style={[styles.gridItem, isMd && styles.gridItemHalf]}
                  >
                    <View style={styles.valueCard}>
                      <View style={[styles.iconBadge, { backgroundColor: v.tone }]}>
                        <Ionicons name={v.icon} size={22} color={v.fg} />
                      </View>
                      <Text style={styles.valueName}>{v.name}</Text>
                      <Text style={styles.valueDesc}>{v.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <GlassCard padding="lg" style={{ marginTop: spacing.md }}>
                <Text style={typography.muted}>
                  Treści prezentowane w aplikacji mają charakter przykładowy i
                  nie stanowią oferty w rozumieniu przepisów prawa.
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
  scroll: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  title: {
    ...typography.display,
    fontSize: 38,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  intro: {
    ...typography.body,
    fontSize: 16,
    color: colors.inkSoft,
    marginBottom: spacing.xl,
    maxWidth: 600,
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
  grid: { gap: spacing.md, marginBottom: spacing.lg },
  gridTwoCols: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '100%' },
  gridItemHalf: { width: '48%' },
  valueCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 180,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  valueName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: spacing.xs,
    letterSpacing: -0.2,
  },
  valueDesc: typography.muted,
});
