import { StyleSheet, View, ViewStyle } from 'react-native';
import { maxContentWidth, spacing } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
};

export function ResponsiveContainer({ children, style, padded = true }: Props) {
  return (
    <View
      style={[
        styles.outer,
        padded && { paddingHorizontal: spacing.lg },
        style,
      ]}
    >
      <View style={styles.inner}>{children}</View>
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
    maxWidth: maxContentWidth,
  },
});
