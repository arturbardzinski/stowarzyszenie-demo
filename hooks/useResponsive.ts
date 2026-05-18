import { useWindowDimensions } from 'react-native';
import { breakpoints } from '@/constants/theme';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  return {
    width,
    height,
    isSm: width >= breakpoints.sm,
    isMd: width >= breakpoints.md,
    isLg: width >= breakpoints.lg,
    isMobile: width < breakpoints.md,
  };
}
