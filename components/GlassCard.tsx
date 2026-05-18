import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  intensity?: number; // back-compat, unused
  tint?: 'light' | 'dark' | 'default'; // back-compat
  style?: ViewStyle;
  padding?: keyof typeof spacing | number;
  rounded?: keyof typeof radius;
  variant?: 'paper' | 'outlined' | 'ink' | 'blush';
};

// Warm card with soft rounded corners. Subtle warm shadow gives it lift
// without feeling heavy. "blush" is a soft rose tint for accents.
export function GlassCard({
  children,
  style,
  padding = 'lg',
  rounded = 'lg',
  variant = 'paper',
}: Props) {
  const padValue = typeof padding === 'number' ? padding : spacing[padding];
  const rad = radius[rounded];

  let surfaceStyle: ViewStyle;
  switch (variant) {
    case 'ink':
      surfaceStyle = styles.ink;
      break;
    case 'outlined':
      surfaceStyle = styles.outlined;
      break;
    case 'blush':
      surfaceStyle = styles.blush;
      break;
    default:
      surfaceStyle = styles.paper;
  }

  return (
    <View
      style={[
        surfaceStyle,
        { padding: padValue, borderRadius: rad },
        shadows.soft,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  paper: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairlineStrong,
  },
  ink: {
    backgroundColor: colors.ink,
  },
  blush: {
    backgroundColor: colors.blush,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.clayHairline,
  },
});
