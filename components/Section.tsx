import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '@/constants/theme';

type Props = {
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  variant?: 'plain' | 'card' | 'glass';
  style?: ViewStyle;
};

export function Section({ title, eyebrow, children, variant = 'plain', style }: Props) {
  return (
    <View
      style={[
        styles.base,
        variant === 'card' && styles.card,
        variant === 'glass' && styles.glassFallback,
        style,
      ]}
    >
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  glassFallback: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  eyebrow: {
    ...typography.label,
    color: colors.lavenderDeep,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.heading,
    marginBottom: spacing.sm,
  },
});
