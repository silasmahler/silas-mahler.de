import { designSystem } from './src/config/design-system.ts';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        // Override default Tailwind theme with our design system
        colors: {
          // Keep Tailwind's transparent, current, inherit, white, and black
          transparent: 'transparent',
          current: 'currentColor',
          inherit: 'inherit',
          white: '#ffffff',
          black: '#000000',
          
          // Our design system colors
          primary: designSystem.colors.primary,
          secondary: designSystem.colors.secondary,
          accent: designSystem.colors.accent,
          neutral: designSystem.colors.neutral,
          
          // Semantic colors
          success: designSystem.colors.semantic.success,
          warning: designSystem.colors.semantic.warning,
          error: designSystem.colors.semantic.error,
          info: designSystem.colors.semantic.info,
          
          // Legacy color mappings for backward compatibility
          dark: designSystem.colors.neutral[900],
          light: designSystem.colors.neutral[50],
          cardLight: '#ffffff',
          cardDark: designSystem.colors.neutral[800],
          cardBorderLight: designSystem.colors.neutral[200],
          cardBorderDark: designSystem.colors.neutral[700],
          textLight: designSystem.colors.neutral[800],
          textDark: designSystem.colors.neutral[100],
        },
        
        fontFamily: {
          heading: designSystem.typography.fontFamilies.heading,
          body: designSystem.typography.fontFamilies.body,
          mono: designSystem.typography.fontFamilies.mono,
          // Keep sans as alias for body
          sans: designSystem.typography.fontFamilies.body,
        },
        
        fontSize: designSystem.typography.fontSizes,
        fontWeight: designSystem.typography.fontWeights,
        lineHeight: designSystem.typography.lineHeights,
        letterSpacing: designSystem.typography.letterSpacing,
        
        spacing: designSystem.spacing,
        
        screens: designSystem.breakpoints,
        
        boxShadow: designSystem.shadows,
        borderRadius: designSystem.borderRadius,
        zIndex: designSystem.zIndex,
        
        extend: {
          // Animation system
          transitionDuration: designSystem.animations.duration,
          transitionTimingFunction: designSystem.animations.easing,
          
          animation: {
            'fade-in': 'fadeIn 300ms cubic-bezier(0, 0, 0.2, 1)',
            'slide-up': 'slideUp 300ms cubic-bezier(0, 0, 0.2, 1)',
            'slide-down': 'slideDown 300ms cubic-bezier(0, 0, 0.2, 1)',
            'slide-left': 'slideLeft 300ms cubic-bezier(0, 0, 0.2, 1)',
            'slide-right': 'slideRight 300ms cubic-bezier(0, 0, 0.2, 1)',
            'scale-in': 'scaleIn 300ms cubic-bezier(0, 0, 0.2, 1)',
            'float': 'float 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
            'bounce-gentle': 'bounceGentle 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
          },
          
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            slideUp: {
              '0%': { transform: 'translateY(20px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            slideDown: {
              '0%': { transform: 'translateY(-20px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            slideLeft: {
              '0%': { transform: 'translateX(20px)', opacity: '0' },
              '100%': { transform: 'translateX(0)', opacity: '1' },
            },
            slideRight: {
              '0%': { transform: 'translateX(-20px)', opacity: '0' },
              '100%': { transform: 'translateX(0)', opacity: '1' },
            },
            scaleIn: {
              '0%': { transform: 'scale(0.95)', opacity: '0' },
              '100%': { transform: 'scale(1)', opacity: '1' },
            },
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            bounceGentle: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-5px)' },
            },
          },
          
          // Gradient utilities
          backgroundImage: {
            'gradient-primary': `linear-gradient(135deg, ${designSystem.colors.primary[500]}, ${designSystem.colors.primary[700]})`,
            'gradient-secondary': `linear-gradient(135deg, ${designSystem.colors.secondary[500]}, ${designSystem.colors.secondary[700]})`,
            'gradient-accent': `linear-gradient(135deg, ${designSystem.colors.accent[400]}, ${designSystem.colors.accent[600]})`,
            'gradient-hero': `linear-gradient(135deg, ${designSystem.colors.primary[500]} 0%, ${designSystem.colors.secondary[500]} 50%, ${designSystem.colors.accent[500]} 100%)`,
          },
          
          // Backdrop blur utilities
          backdropBlur: {
            xs: '2px',
            sm: '4px',
            md: '8px',
            lg: '12px',
            xl: '16px',
            '2xl': '24px',
            '3xl': '40px',
          },
        },
    },
    plugins: [],
}
