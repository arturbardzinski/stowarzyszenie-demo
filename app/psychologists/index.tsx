import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { GradientBackground } from '@/components/GradientBackground';
import { Pill } from '@/components/Pill';
import { ProfileCard } from '@/components/ProfileCard';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, gradients, spacing, typography } from '@/constants/theme';
import psychologists from '@/data/psychologists.json';
import { useResponsive } from '@/hooks/useResponsive';
import type { Psychologist } from '@/types/psychologist';

const data = psychologists as Psychologist[];

export default function PsychologistsScreen() {
  const router = useRouter();
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
              <Pill label="Zespół" tone="lavender" />

              <Text style={styles.title}>Poznaj naszych psychologów</Text>

              <Text style={styles.subtitle}>
                Wybierz osobę, aby zobaczyć pełny profil, doświadczenie i
                obszary wsparcia.
              </Text>

              <View style={[styles.list, isMd && styles.grid]}>
                {data.map((p, i) => (
                  <View key={p.id} style={[isMd && styles.gridItem]}>
                    <ProfileCard
                      psychologist={p}
                      index={i}
                      onPress={() => router.push(`/psychologists/${p.id}`)}
                    />
                  </View>
                ))}
              </View>
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
    paddingTop: 96,
    paddingBottom: spacing.xxxl,
  },
  title: {
    ...typography.display,
    fontSize: 34,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.lg,
    maxWidth: 560,
  },
  list: { gap: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '48%', marginRight: '2%', marginBottom: spacing.md },
});
