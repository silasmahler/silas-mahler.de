/**
 * Main App Component
 * 
 * The root component of the portfolio website with comprehensive theme management,
 * TypeScript typing, and modern React patterns.
 */

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './index.css';
import './i18n'; // Initialize i18n

// Components
import AppLayout from '@/components/AppLayout';
import Greeting from '@/components/Greeting';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import WorkExperience from '@/components/WorkExperience';
import Certifications from '@/components/Certifications';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundDecorations from '@/components/BackgroundDecorations';

/**
 * App Component Props
 */
interface AppProps {
  /** Optional default theme for the application */
  defaultTheme?: 'light' | 'dark' | 'auto';
}

/**
 * Main App Component
 * 
 * Provides the root structure for the portfolio website with:
 * - Theme management with light/dark/auto modes
 * - System preference detection
 * - Smooth theme transitions
 * - Proper TypeScript typing
 * - Modern component architecture
 */
const App: React.FC<AppProps> = ({ defaultTheme = 'auto' }) => {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <AppLayout>
        {/* Background decorative elements */}
        <BackgroundDecorations />
        
        {/* Header with navigation and theme controls */}
        <Header />
        
        {/* Main content sections */}
        <main className="space-y-0">
          <Greeting />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16">
            <Skills />
            <Education />
            <Certifications />
            <WorkExperience />
            <Projects />
            <Contact />
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;