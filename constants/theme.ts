export const colors = {
  bg: '#FAFAF7',
  bgWarm: '#F2EEE5',
  surface: '#FFFFFF',

  ink: '#1F1B3A',
  inkSoft: '#5C5780',
  inkMuted: '#8B86A8',

  lavender: '#A78BFA',
  lavenderDeep: '#7C6CE0',
  sage: '#7FBFA0',
  sageDeep: '#5FA088',
  peach: '#FCA5A5',
  mint: '#A7F3D0',
  sand: '#FDE68A',
  sky: '#BAE6FD',

  // glass
  glassTint: 'rgba(255,255,255,0.55)',
  glassTintDark: 'rgba(31,27,58,0.35)',
  glassBorder: 'rgba(255,255,255,0.75)',
  glassBorderDark: 'rgba(255,255,255,0.18)',

  border: 'rgba(31,27,58,0.08)',
  shadow: 'rgba(31,27,58,0.12)',
};

// reusable gradient stops
export const gradients = {
  hero: ['#E0E7FF', '#FCE7F3', '#FEF3C7'] as const,
  heroDeep: ['#C7D2FE', '#FBCFE8', '#FDE68A'] as const,
  accent: ['#A78BFA', '#7FBFA0'] as const,
  warm: ['#FDE68A', '#FCA5A5'] as const,
  cool: ['#BAE6FD', '#A78BFA'] as const,
  ink: ['#1F1B3A', '#3B3170'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  xxl: 36,
  pill: 999,
};

export const typography = {
  display: { fontSize: 36, fontWeight: '800' as const, color: colors.ink, letterSpacing: -0.5 },
  title: { fontSize: 28, fontWeight: '700' as const, color: colors.ink, letterSpacing: -0.3 },
  heading: { fontSize: 20, fontWeight: '700' as const, color: colors.ink, letterSpacing: -0.2 },
  body: { fontSize: 16, lineHeight: 24, color: colors.ink },
  muted: { fontSize: 14, lineHeight: 20, color: colors.inkSoft },
  label: { fontSize: 12, lineHeight: 16, color: colors.inkMuted, letterSpacing: 0.8, fontWeight: '600' as const, textTransform: 'uppercase' as const },
};

export const shadows = {
  soft: {
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  glass: {
    shadowColor: colors.ink,
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
};

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
};

export const maxContentWidth = 720;
