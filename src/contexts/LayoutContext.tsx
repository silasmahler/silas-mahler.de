/**
 * Layout Context Provider
 * 
 * Provides responsive layout context with screen size detection,
 * scroll position tracking, and navigation effects.
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { LayoutContextType } from '@/types';

// Create the layout context
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Layout provider props
interface LayoutProviderProps {
  children: ReactNode;
}

// Custom hook to detect screen size
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      width,
      height,
      isMobile: width < 768, // md breakpoint
      isTablet: width >= 768 && width < 1024, // md to lg
      isDesktop: width >= 1024, // lg breakpoint
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

// Custom hook to track scroll position
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10); // Consider scrolled after 10px
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call handler right away so state gets updated with initial scroll position
    handleScroll();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, isScrolled };
};

// Layout provider component
export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const screenSize = useScreenSize();
  const scrollPosition = useScrollPosition();

  // Context value
  const contextValue: LayoutContextType = {
    isMobile: screenSize.isMobile,
    isTablet: screenSize.isTablet,
    isDesktop: screenSize.isDesktop,
    scrollY: scrollPosition.scrollY,
    isScrolled: scrollPosition.isScrolled,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook to use layout context
export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  
  return context;
};

// Responsive breakpoint hooks for convenience
export const useBreakpoint = () => {
  const { isMobile, isTablet, isDesktop } = useLayout();
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen: isMobile,
    isMediumScreen: isTablet,
    isLargeScreen: isDesktop,
  };
};

// Hook to detect if user is on a touch device
export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - for older browsers
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouchDevice();
  }, []);

  return isTouchDevice;
};

// Hook for scroll direction detection
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
};

export default LayoutProvider;