import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { gradients } from '@/constants/theme';

type Props = {
  colors?: readonly [string, string, ...string[]];
  children?: React.ReactNode;
  style?: ViewStyle;
  blobs?: boolean;
};

export function GradientBackground({
  colors = gradients.hero,
  children,
  style,
  blobs = false,
}: Props) {
  return (
    <View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      <LinearGradient
        colors={colors as unknown as string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {blobs ? (
        <>
          <View style={[styles.blob, styles.blobA]} />
          <View style={[styles.blob, styles.blobB]} />
          <View style={[styles.blob, styles.blobC]} />
        </>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.5,
  },
  blobA: {
    width: 320,
    height: 320,
    backgroundColor: '#C7D2FE',
    top: -100,
    right: -120,
  },
  blobB: {
    width: 260,
    height: 260,
    backgroundColor: '#FBCFE8',
    bottom: -80,
    left: -80,
  },
  blobC: {
    width: 200,
    height: 200,
    backgroundColor: '#FDE68A',
    top: '40%',
    left: '60%',
    opacity: 0.35,
  },
});
