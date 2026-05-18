import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, noiseDataUri, paperGrainOpacity } from '@/constants/theme';

type Props = {
  // back-compat — value ignored
  colors?: readonly [string, string, ...string[]];
  children?: React.ReactNode;
  style?: ViewStyle;
  blobs?: boolean;
  tone?: 'paper' | 'warm' | 'sage';
};

// Warm editorial background. Four organic blobs visible enough to *feel*
// without overwhelming. Cream wash + grain.
export function GradientBackground({ children, style, tone = 'paper', blobs = true }: Props) {
  const bg = tone === 'warm' ? colors.paperGlow : colors.paper;

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: bg }, style]} pointerEvents="none">
      {/* Subtle vertical wash for depth */}
      <LinearGradient
        colors={[colors.paperGlow, colors.paper, colors.paperDeep] as unknown as string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Organic warm blobs — stronger presence */}
      {blobs ? (
        <>
          <View style={[styles.blob, styles.blobA]} />
          <View style={[styles.blob, styles.blobB]} />
          <View style={[styles.blob, styles.blobC]} />
          <View style={[styles.blob, styles.blobD]} />
        </>
      ) : null}

      {/* Web-only paper grain noise overlay */}
      {Platform.OS === 'web' ? (
        <View
          style={
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: noiseDataUri,
              opacity: paperGrainOpacity,
              pointerEvents: 'none',
            } as any
          }
        />
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    borderRadius: 9999,
  },
  // top-right — warm blush, biggest
  blobA: {
    width: 620,
    height: 620,
    top: -220,
    right: -200,
    backgroundColor: colors.blushDeep,
    opacity: 0.65,
  },
  // bottom-left — dusty sage
  blobB: {
    width: 460,
    height: 460,
    bottom: -140,
    left: -160,
    backgroundColor: colors.sageWash,
    opacity: 0.55,
  },
  // mid-right — soft blush
  blobC: {
    width: 320,
    height: 320,
    top: '38%',
    right: '-12%',
    backgroundColor: colors.blush,
    opacity: 0.55,
  },
  // top-left subtle — paper warm
  blobD: {
    width: 280,
    height: 280,
    top: '8%',
    left: '-8%',
    backgroundColor: colors.paperWarm,
    opacity: 0.5,
  },
});
