import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { GradientButton } from '@/components/GradientButton';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, gradients, radius, shadows, spacing, typography } from '@/constants/theme';
import psychologists from '@/data/psychologists.json';
import type { Psychologist } from '@/types/psychologist';

const data = psychologists as Psychologist[];

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return data.map((p) => ({ id: p.id }));
}

const accentByIndex = [
  gradients.cool,
  gradients.warm,
  gradients.accent,
  gradients.heroDeep,
] as const;

function pickAccent(i: number) {
  const safe = i < 0 ? 0 : i % accentByIndex.length;
  return accentByIndex[safe] ?? accentByIndex[0]!;
}

export default function PsychologistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const index = data.findIndex((p) => p.id === id);
  const person = index >= 0 ? data[index] : undefined;
  const accent = pickAccent(index);

  if (!person) {
    return (
      <View style={styles.root}>
        <GradientBackground colors={gradients.hero} blobs />
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

  return (
    <View style={styles.root}>
      <GradientBackground colors={accent} blobs />
      <Stack.Screen options={{ title: person.name }} />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <AnimatedFade>
            <ResponsiveContainer>
              <View style={styles.heroWrap}>
                <LinearGradient
                  colors={accent as unknown as string[]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatarRing}
                >
                  <Image source={{ uri: person.photo }} style={styles.photo} />
                </LinearGradient>
              </View>

              <Text style={styles.name}>{person.name}</Text>

              <View style={styles.pillRow}>
                <Pill label={person.specialization} tone="lavender" />
              </View>

              <GlassCard padding="lg" style={styles.block}>
                <Text style={styles.blockEyebrow}>Doświadczenie</Text>
                <Text style={typography.body}>{person.experience}</Text>
              </GlassCard>

              <View style={styles.block}>
                <Text style={[styles.blockEyebrow, { marginLeft: spacing.xs }]}>
                  Obszary pomocy
                </Text>
                <View style={styles.tags}>
                  {person.areas.map((area) => (
                    <View key={area} style={styles.tag}>
                      <Ionicons name="checkmark-circle" size={16} color={colors.sageDeep} />
                      <Text style={styles.tagText}>{area}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <GradientButton
                label="Umów konsultację"
                icon="calendar-outline"
                iconRight="arrow-forward"
                onPress={() => router.push(`/book/${person.id}`)}
                style={{ marginTop: spacing.md }}
              />

              <GlassCard style={styles.note}>
                <Text style={typography.muted}>
                  Profil i opis są przykładowe — przygotowane na potrzeby
                  prezentacji aplikacji stowarzyszenia.
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
  scroll: { paddingTop: 96, paddingBottom: spacing.xxxl },
  heroWrap: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarRing: {
    padding: 5,
    borderRadius: radius.pill,
    ...shadows.glass,
  },
  photo: {
    width: 168,
    height: 168,
    borderRadius: radius.pill,
    backgroundColor: colors.bgWarm,
  },
  name: {
    ...typography.display,
    fontSize: 32,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  pillRow: { alignItems: 'center', marginBottom: spacing.lg },
  block: { marginBottom: spacing.md },
  blockEyebrow: {
    ...typography.label,
    color: colors.lavenderDeep,
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    color: colors.ink,
    fontWeight: '600',
    fontSize: 13,
  },
  note: { marginTop: spacing.lg },
  notFoundWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
