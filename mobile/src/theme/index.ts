// GigShield Design System - "Kinetic Anchor" Theme
// Based on Zepto brand identity with premium insurance-tech aesthetics

export const colors = {
  // Primary - Zepto Purple
  primary: '#681df7',
  'primary-dim': '#5b00e5',
  'primary-container': '#aa8fff',
  'primary-fixed': '#aa8fff',
  'primary-fixed-dim': '#9e7dff',
  'on-primary': '#f7f0ff',
  'on-primary-container': '#290071',
  'on-primary-fixed': '#000000',
  'on-primary-fixed-variant': '#330089',

  // Secondary - Neon Green (High-Vis)
  secondary: '#4e6300',
  'secondary-container': '#c3f400',
  'secondary-dim': '#435600',
  'secondary-fixed': '#c3f400',
  'secondary-fixed-dim': '#b7e500',
  'on-secondary': '#e1ff88',
  'on-secondary-container': '#455900',
  'on-secondary-fixed': '#354500',
  'on-secondary-fixed-variant': '#4e6300',

  // Tertiary
  tertiary: '#af2700',
  'tertiary-container': '#ff9479',
  'tertiary-dim': '#9a2100',
  'tertiary-fixed': '#ff9479',
  'tertiary-fixed-dim': '#ff7d5c',
  'on-tertiary': '#ffefec',
  'on-tertiary-container': '#621200',
  'on-tertiary-fixed': '#360600',
  'on-tertiary-fixed-variant': '#721600',

  // Error
  error: '#b41340',
  'error-container': '#f74b6d',
  'error-dim': '#a70138',
  'on-error': '#ffefef',
  'on-error-container': '#510017',

  // Surface Hierarchy (No-Line Rule - use tonal shifts instead of borders)
  surface: '#fdf3ff',
  'surface-dim': '#e4caff',
  'surface-bright': '#fdf3ff',
  'surface-container-lowest': '#ffffff',
  'surface-container-low': '#f9edff',
  'surface-container': '#f2e2ff',
  'surface-container-high': '#eedbff',
  'surface-container-highest': '#ead5ff',
  'surface-variant': '#ead5ff',
  'surface-tint': '#681df7',

  // Text & Foreground
  'on-background': '#38274d',
  'on-surface': '#38274d',
  'on-surface-variant': '#66537c',
  'inverse-surface': '#16052a',
  'inverse-on-surface': '#aa94c1',
  'inverse-primary': '#9b7aff',

  // Outline
  outline: '#826e99',
  'outline-variant': '#baa4d2',

  // Background
  background: '#fdf3ff',
};

export const typography = {
  fonts: {
    headline: 'PlusJakartaSans',
    body: 'Manrope',
    label: 'PlusJakartaSans',
  },
  sizes: {
    // Display - For "Big Moments" (heroic, oversized)
    'display-sm': 36,
    'display-md': 44,
    'display-lg': 56,

    // Headline
    'headline-sm': 24,
    'headline-md': 28,
    'headline-lg': 32,

    // Title
    'title-sm': 14,
    'title-md': 16,
    'title-lg': 22,

    // Body
    'body-sm': 12,
    'body-md': 14,
    'body-lg': 16,

    // Label (all-caps with tracking)
    'label-sm': 10,
    'label-md': 11,
    'label-lg': 14,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  letterSpacing: {
    tight: -0.8,
    normal: 0,
    wide: 0.8,
    widest: 2, // for label uppercase
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  default: 16, // 1rem
  lg: 32, // 2rem
  xl: 48, // 3rem (pill buttons)
  full: 9999,
};

export const shadows = {
  // Ambient shadows - use sparingly, prefer tonal layering
  sm: {
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  // Kinetic trigger shadow (primary buttons)
  kinetic: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 12,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;
