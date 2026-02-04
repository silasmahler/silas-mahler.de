/**
 * Comprehensive Design System Configuration
 * 
 * This file defines the complete design system tokens including colors,
 * typography, spacing, breakpoints, and animation configurations.
 * All values are used throughout the application for consistency.
 */

// Color System - Navy Blue Professional Theme (matching suit)
export const colors = {
  // Primary brand colors - Navy Blue (Professional/Trust)
  primary: {
    50: '#e6f0ff',
    100: '#cce0ff',
    200: '#99c2ff',
    300: '#66a3ff',
    400: '#3385ff',
    500: '#1a3a5c', // Main primary - Navy Blue (suit color)
    600: '#152e4a',
    700: '#102338',
    800: '#0b1726',
    900: '#060c14',
    950: '#030609',
  },
  
  // Secondary colors - Steel Blue (Complement)
  secondary: {
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98', // Steel Blue
    600: '#486581',
    700: '#334e68',
    800: '#243b53',
    900: '#102a43',
    950: '#081521',
  },
  
  // Accent colors - Refined Gold for highlights
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#d4af37', // Refined Gold
    600: '#b8941f',
    700: '#8b6914',
    800: '#6b4e0a',
    900: '#4a3306',
    950: '#2d1f04',
  },
  
  // Neutral colors - Cool grays
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  // Semantic colors for states and feedback
  semantic: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
} as const;

// Typography System - Modern, readable font stack
export const typography = {
  fontFamilies: {
    heading: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },
  
  // Fluid typography scale using clamp() for responsive sizing
  fontSizes: {
    xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',      // 12px -> 14px
    sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',        // 14px -> 16px
    base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',        // 16px -> 18px
    lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',       // 18px -> 20px
    xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',        // 20px -> 24px
    '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',       // 24px -> 30px
    '3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',  // 30px -> 36px
    '4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',       // 36px -> 48px
    '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',           // 48px -> 64px
    '6xl': 'clamp(3.75rem, 3rem + 3.75vw, 5rem)',         // 60px -> 80px
  },
  
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Spacing System - Consistent spacing scale
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const;

// Responsive Breakpoints
export const breakpoints = {
  xs: '320px',    // Small mobile
  sm: '640px',    // Mobile
  md: '768px',    // Tablet
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px', // Extra large desktop
} as const;

// Animation Configuration
export const animations = {
  // Duration values
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },
  
  // Easing functions - Natural motion curves
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom easing for more natural feel
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  
  // Common animation presets
  presets: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { transform: 'translateY(20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideDown: {
      from: { transform: 'translateY(-20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideLeft: {
      from: { transform: 'translateX(20px)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    slideRight: {
      from: { transform: 'translateX(-20px)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    scale: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  },
} as const;

// Shadow System - Layered depth
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  // Colored shadows for modern effects
  primaryGlow: '0 0 20px rgb(59 130 246 / 0.3)',
  accentGlow: '0 0 20px rgb(6 182 212 / 0.3)',
} as const;

// Border Radius System
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
} as const;

// Z-Index Scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Complete Design System Export
export const designSystem = {
  colors,
  typography,
  spacing,
  breakpoints,
  animations,
  shadows,
  borderRadius,
  zIndex,
} as const;

// Type definitions for design system
export type ColorShades = typeof colors.primary;
export type SemanticColors = typeof colors.semantic;
export type FontSizes = keyof typeof typography.fontSizes;
export type FontWeights = keyof typeof typography.fontWeights;
export type Spacing = keyof typeof spacing;
export type Breakpoints = keyof typeof breakpoints;
export type AnimationDuration = keyof typeof animations.duration;
export type AnimationEasing = keyof typeof animations.easing;
export type Shadows = keyof typeof shadows;
export type BorderRadius = keyof typeof borderRadius;
export type ZIndex = keyof typeof zIndex;

export default designSystem;