import { StyleSheet, View, ViewStyle } from 'react-native';
import { maxContentWidth, spacing } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
  maxWidth?: number;
};

export function ResponsiveContainer({
  children,
  style,
  padded = true,
  maxWidth = maxContentWidth,
}: Props) {
  return (
    <View
      style={[
        styles.outer,
        padded && { paddingHorizontal: spacing.lg },
        style,
      ]}
    >
      <View style={[styles.inner, { maxWidth }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
  },
  inner: {
    width: '100%',
  },
});
