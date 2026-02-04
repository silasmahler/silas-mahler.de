/**
 * Design System Utility Functions
 * 
 * This file contains utility functions for working with the design system,
 * including color manipulation, responsive utilities, and theme helpers.
 */

import { designSystem } from '@/config/design-system';
import type { ColorVariant, Breakpoint, Size } from '@/types';

// Color utilities
export const getColorValue = (
  variant: ColorVariant,
  shade: keyof typeof designSystem.colors.primary = 500
): string => {
  const colorMap = {
    primary: designSystem.colors.primary,
    secondary: designSystem.colors.secondary,
    accent: designSystem.colors.accent,
    neutral: designSystem.colors.neutral,
    success: designSystem.colors.semantic.success,
    warning: designSystem.colors.semantic.warning,
    error: designSystem.colors.semantic.error,
    info: designSystem.colors.semantic.info,
  };

  return colorMap[variant][shade] || colorMap.primary[500];
};

// Generate CSS custom properties for colors
export const generateColorCSSVars = (prefix: string = '--color') => {
  const cssVars: Record<string, string> = {};
  
  // Primary colors
  Object.entries(designSystem.colors.primary).forEach(([shade, value]) => {
    cssVars[`${prefix}-primary-${shade}`] = value;
  });
  
  // Secondary colors
  Object.entries(designSystem.colors.secondary).forEach(([shade, value]) => {
    cssVars[`${prefix}-secondary-${shade}`] = value;
  });
  
  // Accent colors
  Object.entries(designSystem.colors.accent).forEach(([shade, value]) => {
    cssVars[`${prefix}-accent-${shade}`] = value;
  });
  
  // Neutral colors
  Object.entries(designSystem.colors.neutral).forEach(([shade, value]) => {
    cssVars[`${prefix}-neutral-${shade}`] = value;
  });
  
  return cssVars;
};

// Responsive utilities
export const getBreakpointValue = (breakpoint: Breakpoint): string => {
  return designSystem.breakpoints[breakpoint];
};

export const createMediaQuery = (breakpoint: Breakpoint, type: 'min' | 'max' = 'min'): string => {
  const value = getBreakpointValue(breakpoint);
  return `@media (${type}-width: ${value})`;
};

// Spacing utilities
export const getSpacing = (size: keyof typeof designSystem.spacing): string => {
  return designSystem.spacing[size];
};

// Typography utilities
export const getFontSize = (size: keyof typeof designSystem.typography.fontSizes): string => {
  return designSystem.typography.fontSizes[size];
};

export const getFontWeight = (weight: keyof typeof designSystem.typography.fontWeights): number => {
  return designSystem.typography.fontWeights[weight];
};

export const getLineHeight = (height: keyof typeof designSystem.typography.lineHeights): number => {
  return designSystem.typography.lineHeights[height];
};

// Shadow utilities
export const getShadow = (shadow: keyof typeof designSystem.shadows): string => {
  return designSystem.shadows[shadow];
};

// Border radius utilities
export const getBorderRadius = (radius: keyof typeof designSystem.borderRadius): string => {
  return designSystem.borderRadius[radius];
};

// Animation utilities
export const getAnimationDuration = (duration: keyof typeof designSystem.animations.duration): string => {
  return designSystem.animations.duration[duration];
};

export const getAnimationEasing = (easing: keyof typeof designSystem.animations.easing): string => {
  return designSystem.animations.easing[easing];
};

// Theme utilities
export const createThemeVariables = (isDark: boolean = false) => {
  const theme = isDark ? 'dark' : 'light';
  
  return {
    // Background colors
    '--bg-primary': isDark ? designSystem.colors.neutral[900] : designSystem.colors.neutral[50],
    '--bg-secondary': isDark ? designSystem.colors.neutral[800] : designSystem.colors.neutral[100],
    '--bg-tertiary': isDark ? designSystem.colors.neutral[700] : designSystem.colors.neutral[200],
    
    // Text colors
    '--text-primary': isDark ? designSystem.colors.neutral[100] : designSystem.colors.neutral[900],
    '--text-secondary': isDark ? designSystem.colors.neutral[300] : designSystem.colors.neutral[600],
    '--text-tertiary': isDark ? designSystem.colors.neutral[400] : designSystem.colors.neutral[500],
    
    // Border colors
    '--border-primary': isDark ? designSystem.colors.neutral[700] : designSystem.colors.neutral[200],
    '--border-secondary': isDark ? designSystem.colors.neutral[600] : designSystem.colors.neutral[300],
    
    // Card colors
    '--card-bg': isDark ? designSystem.colors.neutral[800] : '#ffffff',
    '--card-border': isDark ? designSystem.colors.neutral[700] : designSystem.colors.neutral[200],
  };
};

// Accessibility utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd use a proper color library
  const getLuminance = (color: string): number => {
    // This is a simplified version - use a proper color library in production
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

export const meetsWCAGContrast = (
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const ratio = getContrastRatio(color1, color2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

// Size utilities
export const getSizeClasses = (size: Size): Record<string, string> => {
  const sizeMap = {
    xs: {
      padding: 'px-2 py-1',
      fontSize: 'text-xs',
      borderRadius: 'rounded',
    },
    sm: {
      padding: 'px-3 py-1.5',
      fontSize: 'text-sm',
      borderRadius: 'rounded-md',
    },
    md: {
      padding: 'px-4 py-2',
      fontSize: 'text-base',
      borderRadius: 'rounded-md',
    },
    lg: {
      padding: 'px-6 py-3',
      fontSize: 'text-lg',
      borderRadius: 'rounded-lg',
    },
    xl: {
      padding: 'px-8 py-4',
      fontSize: 'text-xl',
      borderRadius: 'rounded-lg',
    },
  };
  
  return sizeMap[size];
};

// CSS-in-JS utilities
export const createStyleObject = (styles: Record<string, any>) => {
  const processedStyles: Record<string, any> = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    // Convert kebab-case to camelCase for CSS-in-JS
    const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    processedStyles[camelKey] = value;
  });
  
  return processedStyles;
};

// Validation utilities
export const validateDesignToken = (
  category: keyof typeof designSystem,
  token: string
): boolean => {
  return token in designSystem[category];
};

export const getValidatedToken = <T extends keyof typeof designSystem>(
  category: T,
  token: string,
  fallback: string
): string => {
  const categoryTokens = designSystem[category] as Record<string, any>;
  return categoryTokens[token] || fallback;
};

// Export all utilities
export const designSystemUtils = {
  colors: {
    getValue: getColorValue,
    generateCSSVars: generateColorCSSVars,
    getContrastRatio,
    meetsWCAGContrast,
  },
  responsive: {
    getBreakpointValue,
    createMediaQuery,
  },
  spacing: {
    get: getSpacing,
  },
  typography: {
    getFontSize,
    getFontWeight,
    getLineHeight,
  },
  shadows: {
    get: getShadow,
  },
  borderRadius: {
    get: getBorderRadius,
  },
  animations: {
    getDuration: getAnimationDuration,
    getEasing: getAnimationEasing,
  },
  theme: {
    createVariables: createThemeVariables,
  },
  size: {
    getClasses: getSizeClasses,
  },
  validation: {
    validateToken: validateDesignToken,
    getValidatedToken,
  },
  css: {
    createStyleObject,
  },
};

export default designSystemUtils;