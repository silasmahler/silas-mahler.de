/**
 * Language Switcher Component
 * 
 * Modern language toggle component with enhanced styling and animations.
 * Supports German and English language switching with visual feedback.
 * Persists language preference in localStorage.
 */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const LANGUAGE_STORAGE_KEY = 'preferred-language';

/**
 * Language Switcher Component
 * 
 * Provides a toggle button to switch between German and English languages
 * with smooth animations, theme-aware styling, and localStorage persistence.
 */
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
    // Persist language preference
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
  };

  const currentLanguage = i18n.language === 'en' ? 'de' : 'en';
  const displayText = i18n.language === 'en' ? '🇩🇪 DE' : '🇬🇧 EN';
  const ariaLabel = `Switch to ${currentLanguage.toUpperCase()}`;

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`
        px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-out
        ${isDark 
          ? 'bg-neutral-700 text-white hover:bg-neutral-600 focus:ring-neutral-500' 
          : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-primary-500'
        }
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDark ? 'focus:ring-offset-neutral-900' : 'focus:ring-offset-white'}
        hover:scale-105 active:scale-95
      `}
      aria-label={ariaLabel}
      title={ariaLabel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        key={i18n.language}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {displayText}
      </motion.span>
    </motion.button>
  );
};

export default LanguageSwitcher;