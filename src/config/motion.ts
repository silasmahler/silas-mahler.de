/**
 * Framer Motion Configuration
 * 
 * This file contains all motion variants, transitions, and animation
 * configurations used throughout the application for consistent animations.
 */

import { Variants, Transition } from 'framer-motion';
import { designSystem } from './design-system';

// Base transition configurations
export const transitions: Record<string, Transition> = {
  // Quick micro-interactions
  fast: {
    duration: 0.15,
    ease: [0, 0, 0.2, 1], // easeOut
  },
  
  // Standard UI transitions
  normal: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1], // easeInOut
  },
  
  // Slower, more dramatic transitions
  slow: {
    duration: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94], // smooth
  },
  
  // Bouncy, playful transitions
  bounce: {
    duration: 0.6,
    ease: [0.68, -0.55, 0.265, 1.55], // bounce
  },
  
  // Elastic, spring-like transitions
  elastic: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  
  // Gentle spring for natural feel
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
};

// Common animation variants
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: transitions.fast,
  },
};

export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: transitions.fast,
  },
};

export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: transitions.fast,
  },
};

export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: transitions.fast,
  },
};

export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: transitions.fast,
  },
};

// Stagger animations for lists and grids
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  out: {
    opacity: 0,
    y: -20,
    transition: transitions.fast,
  },
};

// Modal and overlay variants
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: transitions.fast,
  },
};

export const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.fast,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

// Navigation variants
export const navVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: transitions.fast,
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: transitions.normal,
  },
};

// Hover and tap animations
export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

export const tapScale = {
  scale: 0.95,
  transition: transitions.fast,
};

export const hoverLift = {
  y: -2,
  boxShadow: designSystem.shadows.lg,
  transition: transitions.fast,
};

// Loading and skeleton variants
export const pulseVariants: Variants = {
  pulse: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const skeletonVariants: Variants = {
  loading: {
    backgroundPosition: '-200px 0',
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Scroll-triggered animation variants
export const scrollVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.normal,
      delay: 0.1,
    },
  },
};

// Complex animation sequences
export const heroVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const heroItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

// Floating animation for decorative elements
export const floatVariants: Variants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Typing animation for text
export const typingVariants: Variants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: 'auto',
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

// Reduced motion variants (for accessibility)
export const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
};

// Utility function to get appropriate variants based on user preferences
export const getMotionVariants = (
  defaultVariants: Variants,
  prefersReducedMotion: boolean = false
): Variants => {
  return prefersReducedMotion ? reducedMotionVariants : defaultVariants;
};

// Animation presets for common use cases
export const animationPresets = {
  fadeIn: fadeVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scale: scaleVariants,
  stagger: { container: staggerContainer, item: staggerItem },
  page: pageVariants,
  modal: modalVariants,
  overlay: overlayVariants,
  nav: navVariants,
  mobileMenu: mobileMenuVariants,
  scroll: scrollVariants,
  hero: { container: heroVariants, item: heroItemVariants },
  float: floatVariants,
  typing: typingVariants,
  pulse: pulseVariants,
  skeleton: skeletonVariants,
} as const;

export default animationPresets;