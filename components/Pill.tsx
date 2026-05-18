import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, radius, spacing } from '@/constants/theme';

type Tone = 'clay' | 'sage' | 'ink' | 'blush' | 'lavender' | 'peach' | 'sand' | 'sky';

type Props = {
  label: string;
  tone?: Tone;
  style?: ViewStyle;
};

const toneStyles: Record<Tone, { bg: string; fg: string; dot: string; border: string }> = {
  clay: { bg: colors.blush, fg: colors.clayDeep, dot: colors.clay, border: colors.clayHairline },
  sage: { bg: colors.sageWash, fg: colors.sageDeep, dot: colors.sage, border: colors.sageHairline },
  ink: { bg: colors.paperWarm, fg: colors.ink, dot: colors.ink, border: colors.hairlineStrong },
  blush: { bg: colors.blush, fg: colors.wine, dot: colors.wine, border: colors.clayHairline },
  // legacy aliases
  lavender: { bg: colors.blush, fg: colors.clayDeep, dot: colors.clay, border: colors.clayHairline },
  peach: { bg: colors.blush, fg: colors.clayDeep, dot: colors.clay, border: colors.clayHairline },
  sand: { bg: colors.paperWarm, fg: colors.ink, dot: colors.stone, border: colors.hairlineStrong },
  sky: { bg: colors.sageWash, fg: colors.sageDeep, dot: colors.sage, border: colors.sageHairline },
};

export function Pill({ label, tone = 'clay', style }: Props) {
  const t = toneStyles[tone];
  return (
    <View
      style={[
        styles.base,
        { backgroundColor: t.bg, borderColor: t.border },
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: t.dot }]} />
      <Text style={[styles.text, { color: t.fg }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    borderWidth: StyleSheet.hairlineWidth,
  },
  dot: { width: 6, height: 6, borderRadius: 999 },
  text: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    letterSpacing: 0.4,
  },
});
