/**
 * Header Component
 * 
 * Modern navigation header with sticky behavior, background blur effects,
 * smooth scroll navigation, active section highlighting, and responsive design.
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { greeting } from '../portfolio';
import { useTheme } from '@/contexts/ThemeContext';
import { useLayout, useScrollDirection } from '@/contexts/LayoutContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { NavigationProps } from '@/types';
import { navVariants, mobileMenuVariants } from '@/config/motion';

/**
 * Custom hook for active section detection
 */
const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sections = ['skills', 'education', 'certifications', 'experience', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
};

/**
 * Smooth scroll utility function
 */
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId.replace('#', ''));
  if (element) {
    const headerHeight = 80; // Account for sticky header
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};
const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'auto':
        return '🌓';
      default:
        return '🌓';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to Dark Mode';
      case 'dark':
        return 'Switch to Auto Mode';
      case 'auto':
        return 'Switch to Light Mode';
      default:
        return 'Toggle Theme';
    }
  };

  return (
    <motion.button
      onClick={handleThemeChange}
      className={`
        icon-button transition-all duration-300 ease-out
        ${isDark 
          ? 'bg-neutral-800 text-yellow-400 hover:bg-neutral-700 focus:ring-yellow-400' 
          : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-primary-500'
        }
      `}
      aria-label={getThemeLabel()}
      title={getThemeLabel()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-xl"
      >
        {getThemeIcon()}
      </motion.span>
    </motion.button>
  );
};

/**
 * Theme Toggle Button Component
 */
/**
 * Navigation Link Component
 */
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  mobile = false, 
  onClick, 
  isActive = false 
}) => {
  const { isDark } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo(href);
    onClick?.();
  };

  const baseClasses = `
    font-medium transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    dark:focus:ring-offset-neutral-900 relative
  `;

  const desktopClasses = `
    ${baseClasses}
    ${isActive 
      ? 'text-primary-600 dark:text-accent-400 font-semibold' 
      : isDark ? 'text-neutral-300 hover:text-accent-400' : 'text-neutral-700 hover:text-primary-600'
    }
    hover:scale-105 px-4 py-2 rounded-lg transition-all duration-300
  `;

  const mobileClasses = `
    ${baseClasses}
    block px-4 py-3 rounded-lg text-base
    ${isActive 
      ? 'text-primary-600 dark:text-accent-400 bg-primary-50 dark:bg-primary-900/30 font-semibold' 
      : isDark 
        ? 'text-neutral-300 hover:text-white hover:bg-neutral-700/50' 
        : 'text-neutral-700 hover:bg-neutral-50'
    }
  `;

  return (
    <motion.a
      href={href}
      className={mobile ? mobileClasses : desktopClasses}
      onClick={handleClick}
      whileHover={mobile ? {} : { y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
};

/**
 * Header Component
 */
const Header: React.FC<NavigationProps> = ({ 
  isFixed = true, 
  showBackground = true 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { isScrolled } = useLayout();
  const scrollDirection = useScrollDirection();
  const activeSection = useActiveSection();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Hide header when scrolling down on mobile for better UX
  const shouldHideHeader = scrollDirection === 'down' && isScrolled && !isMenuOpen;

  const headerClasses = `
    ${isFixed ? 'fixed top-0 left-0 right-0' : 'relative'}
    z-[100] transition-all duration-500 ease-out
    ${shouldHideHeader ? '-translate-y-full' : 'translate-y-0'}
    ${showBackground && isScrolled
      ? `${isDark ? 'bg-neutral-900/90' : 'bg-white/90'} backdrop-blur-xl shadow-2xl` 
      : showBackground
        ? `${isDark ? 'bg-neutral-900/70' : 'bg-white/70'} backdrop-blur-lg`
        : 'bg-transparent'
    }
    ${isScrolled 
      ? `border-b ${isDark ? 'border-primary-800/30' : 'border-primary-200/30'}` 
      : 'border-b border-transparent'
    }
  `;

  const navigationItems = [
    { href: '#skills', key: 'navigation.skills', id: 'skills' },
    { href: '#education', key: 'navigation.education', id: 'education' },
    { href: '#certifications', key: 'navigation.certifications', id: 'certifications' },
    { href: '#experience', key: 'navigation.experience', id: 'experience' },
    { href: '#projects', key: 'navigation.projects', id: 'projects' },
    { href: '#contact', key: 'navigation.contact', id: 'contact' },
  ];

  return (
    <motion.header
      className={headerClasses}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <button 
              onClick={() => smoothScrollTo('top')}
              className={`
                font-bold text-2xl transition-all duration-300
                ${isDark ? 'text-white' : 'text-neutral-900'}
                hover:text-primary-600 dark:hover:text-accent-400
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                dark:focus:ring-offset-neutral-900 rounded-lg px-2 py-1
                hover:scale-105
              `}
            >
              {greeting.username}
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href}
                  isActive={activeSection === item.id}
                >
                  {t(item.key)}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Controls */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className={`
                p-2 rounded-md transition-colors duration-300
                ${isDark 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-700' 
                  : 'text-neutral-900 hover:bg-neutral-100'
                }
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                dark:focus:ring-offset-neutral-900
              `}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div 
              className={`
                px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-2xl
                ${isDark ? 'bg-neutral-900/95' : 'bg-white/95'}
                backdrop-blur-xl border-t ${isDark ? 'border-primary-800/30' : 'border-primary-200/30'}
              `}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <NavLink 
                    href={item.href} 
                    mobile 
                    onClick={closeMenu}
                    isActive={activeSection === item.id}
                  >
                    {t(item.key)}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;