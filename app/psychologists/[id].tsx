import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { Footer } from '@/components/Footer';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { GradientButton } from '@/components/GradientButton';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, fonts, radius, shadows, spacing, typography } from '@/constants/theme';
import psychologists from '@/data/psychologists.json';
import { useResponsive } from '@/hooks/useResponsive';
import type { Psychologist } from '@/types/psychologist';

const data = psychologists as Psychologist[];

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return data.map((p) => ({ id: p.id }));
}

export default function PsychologistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isMd } = useResponsive();
  const index = data.findIndex((p) => p.id === id);
  const person = index >= 0 ? data[index] : undefined;

  if (!person) {
    return (
      <View style={styles.root}>
        <GradientBackground />
        <SafeAreaView style={styles.notFoundWrap}>
          <Text style={typography.heading}>Nie znaleziono profilu</Text>
          <GradientButton
            label="Wróć do listy"
            onPress={() => router.push('/psychologists')}
            style={{ marginTop: spacing.md }}
          />
        </SafeAreaView>
      </View>
    );
  }

  const firstName = person.name.split(' ')[0] ?? person.name;
  const ringColors =
    index % 2 === 0
      ? ([colors.clay, colors.blushDeep] as const)
      : ([colors.sage, colors.sageWash] as const);

  return (
    <View style={styles.root}>
      <GradientBackground />
      <Stack.Screen options={{ title: person.name }} />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <AnimatedFade>
            <ResponsiveContainer>
              {/* Hero portrait */}
              <View style={styles.heroWrap}>
                <LinearGradient
                  colors={ringColors as unknown as string[]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatarRing}
                >
                  <Image source={{ uri: person.photo }} style={styles.photo} />
                </LinearGradient>
              </View>

              <Text style={styles.name}>{person.name}</Text>

              <View style={styles.pillRow}>
                <Pill label={person.specialization} tone="clay" />
              </View>

              <Text style={styles.shortDesc}>{person.shortDescription}</Text>

              <GlassCard padding="lg" rounded="lg" style={styles.block}>
                <Text style={styles.blockEyebrow}>Doświadczenie</Text>
                <Text style={styles.experienceText}>{person.experience}</Text>
              </GlassCard>

              <View style={styles.block}>
                <Text style={styles.blockEyebrow}>Obszary pomocy</Text>
                <View style={styles.tags}>
                  {person.areas.map((area) => (
                    <View key={area} style={styles.tag}>
                      <View style={styles.tagDot} />
                      <Text style={styles.tagText}>{area}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <GlassCard padding="lg" rounded="lg" style={styles.block}>
                <Text style={styles.blockEyebrow}>Praktyka</Text>
                <View style={[styles.specs, isMd && styles.specsRow]}>
                  <View style={[styles.specWrap, isMd && styles.specWrapHalf]}>
                    <SpecItem icon="time-outline" label="Czas sesji" value={person.consultationDuration} />
                  </View>
                  <View style={[styles.specWrap, isMd && styles.specWrapHalf]}>
                    <SpecItem icon="pricetag-outline" label="Cena" value={person.price} />
                  </View>
                  <View style={[styles.specWrap, isMd && styles.specWrapHalf]}>
                    <SpecItem icon="calendar-outline" label="Dostępność" value={person.availability} />
                  </View>
                  <View style={[styles.specWrap, isMd && styles.specWrapHalf]}>
                    <SpecItem
                      icon="videocam-outline"
                      label="Format"
                      value={person.consultationFormats.join(' · ')}
                    />
                  </View>
                </View>
              </GlassCard>

              <View style={styles.ctaRow}>
                <GradientButton
                  label={`Umów konsultację u ${firstName}`}
                  icon="calendar-outline"
                  iconRight="arrow-forward"
                  onPress={() => router.push(`/book/${person.id}`)}
                />
                <GradientButton
                  label="Wróć do listy"
                  variant="ghost"
                  icon="arrow-back"
                  onPress={() => router.push('/psychologists')}
                />
              </View>

              <GlassCard variant="blush" padding="lg" rounded="lg" style={styles.note}>
                <Text style={styles.noteText}>
                  Profil i opis są przykładowe — przygotowane na potrzeby prezentacji
                  aplikacji stowarzyszenia.
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

function SpecItem({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.specItem}>
      <View style={styles.specIcon}>
        <Ionicons name={icon} size={16} color={colors.clayDeep} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.specLabel}>{label}</Text>
        <Text style={styles.specValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: spacing.lg, paddingBottom: spacing.xl },

  heroWrap: { alignItems: 'center', marginBottom: spacing.md },
  avatarRing: {
    padding: 5,
    borderRadius: radius.pill,
    ...shadows.warm,
  },
  photo: {
    width: 168,
    height: 168,
    borderRadius: radius.pill,
    backgroundColor: colors.paperWarm,
  },

  name: {
    ...typography.title,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  pillRow: { alignItems: 'center', marginBottom: spacing.lg },
  shortDesc: {
    ...typography.bodyLarge,
    fontSize: 17,
    textAlign: 'center',
    color: colors.inkSoft,
    marginBottom: spacing.xl,
    maxWidth: 560,
    alignSelf: 'center',
  },

  block: { marginBottom: spacing.lg },
  blockEyebrow: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.clayDeep,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  experienceText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 25,
    color: colors.ink,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.clay,
  },
  tagText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.ink,
  },

  specs: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.md,
    columnGap: spacing.md,
  },
  specWrap: { width: '100%' },
  specWrapHalf: { width: '48%' },
  specItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    width: '100%',
  },
  specIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    color: colors.stone,
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  specValue: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.ink,
  },

  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  note: {},
  noteText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 21,
    color: colors.inkSoft,
  },

  notFoundWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
