/**
 * AppLayout Component
 * 
 * Main layout wrapper component that provides responsive context
 * and consistent layout structure throughout the application.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutProvider } from '@/contexts/LayoutContext';
import { AppLayoutProps } from '@/types';
import { pageVariants } from '@/config/motion';

/**
 * AppLayout Component
 * 
 * Provides:
 * - Responsive layout context
 * - Consistent container structure
 * - Page-level animations
 * - Scroll behavior management
 */
const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <LayoutProvider>
      <motion.div
        className={`min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 ${className}`}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
      >
        {/* Main content container */}
        <div className="relative">
          {children}
        </div>
      </motion.div>
    </LayoutProvider>
  );
};

export default AppLayout;