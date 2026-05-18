import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { Footer } from '@/components/Footer';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { Pill } from '@/components/Pill';
import { ProfileCard } from '@/components/ProfileCard';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, fonts, spacing, typography } from '@/constants/theme';
import psychologists from '@/data/psychologists.json';
import { useResponsive } from '@/hooks/useResponsive';
import type { Psychologist } from '@/types/psychologist';

const data = psychologists as Psychologist[];

export default function PsychologistsScreen() {
  const router = useRouter();
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
              <Pill label="Zespół" tone="clay" />

              <Text style={[styles.title, { fontSize: titleSize, lineHeight: titleLine }]}>
                Poznaj naszych{' '}
                <Text style={styles.titleItalic}>psychologów</Text>
              </Text>

              <Text style={styles.subtitle}>
                Każda osoba ma własny styl i własne specjalizacje. Wybierz tę,
                której podejście brzmi najbliżej Ciebie — a jeśli się wahasz,{' '}
                <Text style={styles.linkInline}>napisz do nas</Text> i pomożemy dobrać.
              </Text>

              <View style={[styles.list, isMd && styles.listGrid]}>
                {data.map((p, i) => (
                  <View
                    key={p.id}
                    style={[styles.listItem, isMd && styles.listItemGrid]}
                  >
                    <ProfileCard
                      psychologist={p}
                      index={i}
                      total={data.length}
                      layout={isMd ? 'vertical' : 'horizontal'}
                      onPress={() => router.push(`/psychologists/${p.id}`)}
                    />
                  </View>
                ))}
              </View>

              <GlassCard variant="blush" padding="lg" rounded="lg" style={styles.note}>
                <Text style={styles.noteText}>
                  Profile są przykładowe. W rzeczywistej praktyce stowarzyszenia każda
                  osoba publikuje pełne informacje o nurcie, kwalifikacjach i kodeksie
                  etyki, na podstawie którego pracuje.
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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: spacing.lg, paddingBottom: spacing.xl },
  title: {
    fontFamily: fonts.serif,
    color: colors.ink,
    letterSpacing: -1.2,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    maxWidth: 880,
  },
  titleItalic: {
    fontFamily: fonts.serifItalic,
    color: colors.clayDeep,
  },
  subtitle: {
    ...typography.bodyLarge,
    fontSize: 17,
    color: colors.inkSoft,
    marginBottom: spacing.xl,
    maxWidth: 580,
  },
  linkInline: {
    fontFamily: fonts.sansSemibold,
    color: colors.clayDeep,
  },

  list: { gap: spacing.md, marginBottom: spacing.xl },
  listGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  listItem: { width: '100%' },
  listItemGrid: {
    flexGrow: 1,
    flexBasis: '48%',
    maxWidth: '49.2%',
  },

  note: {},
  noteText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 21,
    color: colors.inkSoft,
  },
});
