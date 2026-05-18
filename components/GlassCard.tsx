import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  style?: ViewStyle;
  padding?: keyof typeof spacing | number;
  rounded?: keyof typeof radius;
};

export function GlassCard({
  children,
  intensity = 40,
  tint = 'light',
  style,
  padding = 'lg',
  rounded = 'lg',
}: Props) {
  const padValue = typeof padding === 'number' ? padding : spacing[padding];
  const radiusValue = radius[rounded];

  const content = (
    <View style={{ padding: padValue }}>{children}</View>
  );

  // BlurView works on web via CSS backdrop-filter (Safari/Chromium)
  return (
    <View
      style={[
        styles.wrap,
        { borderRadius: radiusValue },
        shadows.glass,
        style,
      ]}
    >
      <BlurView
        intensity={intensity}
        tint={tint}
        style={[StyleSheet.absoluteFill, { borderRadius: radiusValue, overflow: 'hidden' }]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: radiusValue,
            backgroundColor:
              tint === 'dark' ? colors.glassTintDark : colors.glassTint,
            borderWidth: Platform.OS === 'web' ? 1 : StyleSheet.hairlineWidth,
            borderColor:
              tint === 'dark' ? colors.glassBorderDark : colors.glassBorder,
          },
        ]}
        pointerEvents="none"
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
