/**
 * Responsive Utility Hooks
 * 
 * Collection of custom hooks for responsive behavior,
 * breakpoint detection, and layout utilities.
 */

import { useEffect, useState } from 'react';
import { useLayout } from '@/contexts/LayoutContext';
import { breakpoints } from '@/config/design-system';

// Hook for media query matching
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      // Legacy browser support
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
};

// Hook for specific breakpoint detection
export const useBreakpoints = () => {
  const isXs = useMediaQuery(`(min-width: ${breakpoints.xs})`);
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm})`);
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl})`);
  const is2Xl = useMediaQuery(`(min-width: ${breakpoints['2xl']})`);

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    // Convenience properties
    isMobile: !isMd,
    isTablet: isMd && !isLg,
    isDesktop: isLg,
    isLargeDesktop: isXl,
  };
};

// Hook for container queries (when supported)
export const useContainerQuery = (containerRef: React.RefObject<HTMLElement>, query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    // For now, we'll use ResizeObserver as a fallback
    // Container queries are not widely supported yet
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        
        // Parse simple width queries like "(min-width: 400px)"
        const widthMatch = query.match(/min-width:\s*(\d+)px/);
        if (widthMatch) {
          const minWidth = parseInt(widthMatch[1]);
          setMatches(width >= minWidth);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, query]);

  return matches;
};

// Hook for viewport dimensions
export const useViewport = () => {
  const [viewport, setViewport] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 1024, height: 768 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
};

// Hook for orientation detection
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (typeof window === 'undefined') return 'landscape';
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
};

// Hook for responsive values
export const useResponsiveValue = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}): T | undefined => {
  const breakpoints = useBreakpoints();

  if (breakpoints.is2Xl && values['2xl'] !== undefined) return values['2xl'];
  if (breakpoints.isXl && values.xl !== undefined) return values.xl;
  if (breakpoints.isLg && values.lg !== undefined) return values.lg;
  if (breakpoints.isMd && values.md !== undefined) return values.md;
  if (breakpoints.isSm && values.sm !== undefined) return values.sm;
  if (breakpoints.isXs && values.xs !== undefined) return values.xs;

  // Return the largest available value as fallback
  return values['2xl'] || values.xl || values.lg || values.md || values.sm || values.xs;
};

// Hook for responsive grid columns
export const useResponsiveColumns = (
  columns: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; '2xl'?: number }
): number => {
  const value = useResponsiveValue(columns);
  return value || 1;
};

// Hook for responsive spacing
export const useResponsiveSpacing = (
  spacing: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string; '2xl'?: string }
): string => {
  const value = useResponsiveValue(spacing);
  return value || '1rem';
};

// Hook to combine layout context with additional responsive utilities
export const useResponsiveLayout = () => {
  const layout = useLayout();
  const breakpoints = useBreakpoints();
  const viewport = useViewport();
  const orientation = useOrientation();

  return {
    ...layout,
    ...breakpoints,
    viewport,
    orientation,
    // Utility functions
    getValue: useResponsiveValue,
    getColumns: useResponsiveColumns,
    getSpacing: useResponsiveSpacing,
  };
};

export default useResponsiveLayout;