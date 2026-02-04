/**
 * Theme Context Provider
 * 
 * Provides comprehensive theme management with light/dark/auto modes,
 * system preference detection, and smooth theme transitions.
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeContextType } from '@/types';

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'auto';
}

// Custom hook to detect system theme preference
const useSystemTheme = (): 'light' | 'dark' => {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return systemTheme;
};

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'auto' 
}) => {
  const systemTheme = useSystemTheme();
  
  // Initialize theme from localStorage or default
  const [theme, setThemeState] = useState<'light' | 'dark' | 'auto'>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
    return savedTheme || defaultTheme;
  });

  // Calculate the actual theme (resolving 'auto' to system preference)
  const resolvedTheme = theme === 'auto' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';

  // Theme setter that updates localStorage and state
  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light-theme', 'dark-theme');

    // Add new theme classes
    root.classList.add(resolvedTheme);
    body.classList.add(`${resolvedTheme}-theme`);

    // Set data attribute for CSS selectors
    root.setAttribute('data-theme', resolvedTheme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        isDark ? '#0f172a' : '#ffffff'
      );
    }

    // Smooth transition effect
    const transitionClass = 'theme-transition';
    root.classList.add(transitionClass);
    
    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      root.classList.remove(transitionClass);
    }, 300);

    return () => clearTimeout(timer);
  }, [resolvedTheme, isDark]);

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Hook to get system theme preference (useful for components)
export const useSystemThemePreference = (): 'light' | 'dark' => {
  return useSystemTheme();
};

// Hook to detect if user prefers reduced motion
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
};

export default ThemeProvider;