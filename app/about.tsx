import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { Footer } from '@/components/Footer';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, fonts, radius, spacing, typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';

const values = [
  {
    icon: 'heart-outline' as const,
    name: 'Empatia',
    desc: 'Słuchamy z uważnością i bez oceniania. Relacja jest fundamentem naszej pracy — nie technika, nie szybka odpowiedź.',
    tone: 'clay' as const,
  },
  {
    icon: 'lock-closed-outline' as const,
    name: 'Poufność',
    desc: 'Wszystko, co dzieje się w gabinecie, pozostaje między klientem a specjalistą. Tajemnica zawodowa to dla nas oczywistość.',
    tone: 'sage' as const,
  },
  {
    icon: 'ribbon-outline' as const,
    name: 'Profesjonalizm',
    desc: 'Pracujemy w oparciu o aktualną wiedzę, kodeks etyczny zawodu i regularną superwizję. Każdy w zespole ma pełne uprawnienia.',
    tone: 'blush' as const,
  },
  {
    icon: 'sparkles-outline' as const,
    name: 'Rozwój',
    desc: 'Regularnie się szkolimy i dzielimy refleksją w zespole, żeby coraz lepiej rozumieć osoby, którym towarzyszymy.',
    tone: 'sage' as const,
  },
];

export default function AboutScreen() {
  const { isMd, isLg } = useResponsive();

  const titleSize = isLg ? 56 : isMd ? 48 : 36;
  const titleLine = isLg ? 62 : isMd ? 54 : 42;

  return (
    <View style={styles.root}>
      <GradientBackground />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <AnimatedFade>
            <ResponsiveContainer maxWidth={1080}>
              <Pill label="O nas" tone="clay" />

              <Text style={[styles.title, { fontSize: titleSize, lineHeight: titleLine }]}>
                Dobra rozmowa{' '}
                <Text style={styles.titleItalic}>potrafi zmienić wiele</Text>
              </Text>

              <View style={[styles.essayLayout, isMd && styles.essayLayoutMd]}>
                <View style={[styles.essayCol, isMd && styles.essayColMain]}>
                  <Text style={styles.opener}>
                    Centrum Dobrego Dialogu to mała pracownia, która powstała z
                    przekonania, że dobrze poprowadzona rozmowa naprawdę leczy.
                  </Text>

                  <Text style={styles.paragraph}>
                    Tworzymy bezpieczne miejsce kontaktu — dla osób w kryzysie,
                    dla par, dla młodzieży i dla wszystkich, którzy chcą lepiej
                    siebie rozumieć. Działamy od 2014 roku. Najpierw kameralnie,
                    dziś jako zespół czterech specjalistów.
                  </Text>

                  <Text style={styles.paragraph}>
                    Łączy nas integracyjny styl pracy: nie trzymamy się
                    ortodoksyjnie jednego nurtu, dopasowujemy podejście do
                    osoby siedzącej naprzeciwko. W praktyce oznacza to, że
                    pierwsze spotkanie służy nam do poznania się i ustalenia,
                    jaki format będzie najbardziej pomocny.
                  </Text>
                </View>

                <View style={[styles.essayCol, isMd && styles.essayColAside]}>
                  <GlassCard variant="blush" padding="lg" rounded="lg" style={styles.quoteCard}>
                    <View style={styles.quoteMark}>
                      <Ionicons name="leaf" size={20} color={colors.clayDeep} />
                    </View>
                    <Text style={styles.quote}>
                      Pracujemy uważnie, bez pośpiechu — przekonani, że relacja
                      jest zaczynem każdej trwałej zmiany.
                    </Text>
                    <Text style={styles.quoteAttr}>— Zespół CDD</Text>
                  </GlassCard>

                  <GlassCard padding="lg" rounded="lg" style={styles.miniCard}>
                    <View style={styles.miniRow}>
                      <Text style={styles.miniLabel}>Założone</Text>
                      <Text style={styles.miniValue}>2014</Text>
                    </View>
                    <View style={styles.miniDivider} />
                    <View style={styles.miniRow}>
                      <Text style={styles.miniLabel}>Specjalistów</Text>
                      <Text style={styles.miniValue}>4 osoby</Text>
                    </View>
                    <View style={styles.miniDivider} />
                    <View style={styles.miniRow}>
                      <Text style={styles.miniLabel}>Miejsce</Text>
                      <Text style={styles.miniValue}>Warszawa</Text>
                    </View>
                  </GlassCard>
                </View>
              </View>

              <View style={styles.valuesHead}>
                <Pill label="Nasze wartości" tone="sage" />
                <Text style={styles.valuesTitle}>
                  Cztery zasady, na których stoi nasza praca
                </Text>
              </View>

              <View style={[styles.valuesGrid, isMd && styles.valuesGridMd]}>
                {values.map((v) => (
                  <View
                    key={v.name}
                    style={[styles.valueItem, isMd && styles.valueItemMd]}
                  >
                    <ValueCard {...v} />
                  </View>
                ))}
              </View>

              <GlassCard padding="lg" rounded="md" style={styles.footnote}>
                <Text style={styles.footnoteText}>
                  Treści prezentowane w aplikacji mają charakter przykładowy i
                  nie stanowią oferty w rozumieniu przepisów prawa.
                </Text>
              </GlassCard>

              <Footer />
            </ResponsiveContainer>
          </AnimatedFade>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ValueCard({ icon, name, desc, tone }: (typeof values)[number]) {
  const accent: Record<typeof tone, { bg: string; fg: string }> = {
    clay: { bg: colors.blush, fg: colors.clayDeep },
    sage: { bg: colors.sageWash, fg: colors.sageDeep },
    blush: { bg: colors.blushDeep, fg: colors.wine },
  };
  const t = accent[tone];

  return (
    <View style={styles.valueCard}>
      <View style={[styles.valueIcon, { backgroundColor: t.bg }]}>
        <Ionicons name={icon} size={22} color={t.fg} />
      </View>
      <Text style={styles.valueName}>{name}</Text>
      <Text style={styles.valueDesc}>{desc}</Text>
    </View>
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
    marginBottom: spacing.xl,
    maxWidth: 880,
  },
  titleItalic: {
    fontFamily: fonts.serifItalic,
    color: colors.clayDeep,
  },

  essayLayout: {
    flexDirection: 'column',
    gap: spacing.xl,
    marginBottom: spacing.xxl,
  },
  essayLayoutMd: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xl,
  },
  essayCol: { width: '100%' },
  essayColMain: { flex: 1.6 },
  essayColAside: { flex: 1, gap: spacing.md },

  opener: {
    fontFamily: fonts.serifItalic,
    fontSize: 26,
    lineHeight: 36,
    color: colors.ink,
    letterSpacing: -0.4,
    marginBottom: spacing.lg,
    maxWidth: 540,
  },
  paragraph: {
    ...typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.md,
    maxWidth: 560,
  },

  quoteCard: { gap: spacing.sm },
  quoteMark: { marginBottom: spacing.xs },
  quote: {
    fontFamily: fonts.serifItalic,
    fontSize: 20,
    lineHeight: 28,
    color: colors.ink,
    letterSpacing: -0.3,
  },
  quoteAttr: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.clayDeep,
    letterSpacing: 0.4,
    marginTop: spacing.xs,
  },

  miniCard: { backgroundColor: colors.surface },
  miniRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: spacing.md,
  },
  miniLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.stone,
    letterSpacing: 0.4,
  },
  miniValue: {
    fontFamily: fonts.serifMedium,
    fontSize: 18,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  miniDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.hairline,
    marginVertical: spacing.md,
  },

  valuesHead: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  valuesTitle: {
    ...typography.title,
    marginTop: spacing.sm,
    maxWidth: 720,
  },
  valuesGrid: {
    flexDirection: 'column',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  valuesGridMd: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueItem: { width: '100%' },
  valueItemMd: { width: '48.5%' },
  valueCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    minHeight: 200,
  },
  valueIcon: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  valueName: {
    ...typography.heading,
    marginBottom: spacing.xs,
  },
  valueDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkSoft,
  },

  footnote: {
    backgroundColor: colors.paperDeep,
  },
  footnoteText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.stone,
  },
});
