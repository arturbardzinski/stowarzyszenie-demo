// "Ciepły dialog" — warm editorial.
// Refined for contrast, hierarchy, and intentional italic usage.

export const colors = {
  // surfaces — warm cream tones
  paper: '#F8F0E3',
  paperDeep: '#F1E5D2',
  paperWarm: '#E8D7BC',
  paperGlow: '#FBF4E8',
  surface: '#FFFFFF',

  // ink — aubergine, warmer than pure black
  ink: '#3B2A2E',
  inkSoft: '#5C4448',
  inkMuted: '#806B6A',
  stone: '#7A6862',
  stoneSoft: '#A89A8E',

  // primary accent — clay rose
  // clay = filled-button background (light text on it)
  // clayDeep = readable text on light backgrounds (passes AA on blush)
  clay: '#C97B5C',
  clayDeep: '#8C4830',
  claySoft: 'rgba(201,123,92,0.14)',
  clayHairline: 'rgba(140,72,48,0.32)',
  blush: '#F2D9C5',
  blushDeep: '#E5BFA3',

  // secondary accent — dusty sage
  sage: '#7E9176',
  sageDeep: '#4D5F47',
  sageSoft: 'rgba(126,145,118,0.16)',
  sageHairline: 'rgba(77,95,71,0.32)',
  sageWash: '#D8DECF',

  // tertiary emphasis — wine (dark rose), passes AA on blush
  wine: '#6F2E36',

  // focus ring (web)
  focus: 'rgba(140,72,48,0.45)',

  // rules
  hairline: 'rgba(59,42,46,0.12)',
  hairlineStrong: 'rgba(59,42,46,0.20)',
  hairlineSoft: 'rgba(59,42,46,0.06)',

  // shadows — soft, warm
  shadow: 'rgba(59,42,46,0.08)',
  shadowSoft: 'rgba(59,42,46,0.04)',

  // legacy aliases — keep older code typechecking
  bg: '#F8F0E3',
  bgWarm: '#F1E5D2',
  border: 'rgba(59,42,46,0.12)',
  copper: '#C97B5C',
  copperDeep: '#8C4830',
  copperSoft: 'rgba(201,123,92,0.14)',
  copperHairline: 'rgba(140,72,48,0.32)',
};

export const fonts = {
  serif: 'Fraunces_400Regular',
  serifMedium: 'Fraunces_500Medium',
  serifSemibold: 'Fraunces_600SemiBold',
  serifItalic: 'Fraunces_400Regular_Italic',
  serifItalicMedium: 'Fraunces_500Medium_Italic',
  sans: 'Geist_400Regular',
  sansMedium: 'Geist_500Medium',
  sansSemibold: 'Geist_600SemiBold',
  sansBold: 'Geist_700Bold',
  mono: 'GeistMono_400Regular',
  monoMedium: 'GeistMono_500Medium',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 36,
  xxl: 56,
  xxxl: 72,
  xxxxl: 96,
};

export const radius = {
  none: 0,
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
  pill: 999,
};

// CLEAN HIERARCHY — three levels: display, title, item.
// Each level has consistent size + line height. No micro-variants.
export const typography = {
  // DISPLAY — hero only. Italic is the *one* moment of personality.
  display: {
    fontFamily: fonts.serif,
    fontSize: 56,
    lineHeight: 62,
    color: colors.ink,
    letterSpacing: -1,
  },
  displayItalic: {
    fontFamily: fonts.serifItalic,
    fontSize: 56,
    lineHeight: 62,
    color: colors.ink,
    letterSpacing: -1,
  },
  // SECTION — top of a content block.
  title: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 42,
    color: colors.ink,
    letterSpacing: -0.5,
  },
  // ITEM heading — for cards, blocks. No italic by default.
  heading: {
    fontFamily: fonts.serifMedium,
    fontSize: 22,
    lineHeight: 30,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  subhead: {
    fontFamily: fonts.serifMedium,
    fontSize: 18,
    lineHeight: 26,
    color: colors.ink,
    letterSpacing: -0.1,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 16,
    lineHeight: 26,
    color: colors.ink,
  },
  bodyLarge: {
    fontFamily: fonts.sans,
    fontSize: 18,
    lineHeight: 30,
    color: colors.inkSoft,
  },
  muted: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.stone,
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: 12,
    lineHeight: 18,
    color: colors.stone,
  },
  label: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.clayDeep,
    letterSpacing: 0.4,
  },
  formLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.stone,
    letterSpacing: 0.4,
  },
  button: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
};

export const shadows = {
  soft: {
    shadowColor: colors.ink,
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  glass: {
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 14 },
    elevation: 5,
  },
  warm: {
    shadowColor: colors.clayDeep,
    shadowOpacity: 0.22,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 6,
  },
};

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
};

export const maxContentWidth = 680;

// Web-only paper grain
export const noiseDataUri =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/></svg>\")";

export const paperGrainOpacity = 0.05;
