import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';

type Tone = 'lavender' | 'sage' | 'peach' | 'sand' | 'sky' | 'ink';

type Props = {
  label: string;
  tone?: Tone;
  style?: ViewStyle;
};

const toneStyles: Record<Tone, { bg: string; fg: string }> = {
  lavender: { bg: '#EDE9FE', fg: '#5B21B6' },
  sage: { bg: '#D1FAE5', fg: '#065F46' },
  peach: { bg: '#FFE4E1', fg: '#9B2226' },
  sand: { bg: '#FEF3C7', fg: '#92400E' },
  sky: { bg: '#E0F2FE', fg: '#075985' },
  ink: { bg: '#E5E7EB', fg: colors.ink },
};

export function Pill({ label, tone = 'lavender', style }: Props) {
  const t = toneStyles[tone];
  return (
    <View style={[styles.base, { backgroundColor: t.bg }, style]}>
      <Text style={[styles.text, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
