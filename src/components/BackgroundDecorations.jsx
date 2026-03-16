import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Subtle, modern background animations to add "pepp" without overloading
function BackgroundDecorations() {
    const { isDark } = useTheme();

    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        <div 
          className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[100px] animate-float ${isDark ? 'bg-primary-900/20' : 'bg-primary-200/40'}`}
          style={{ animationDuration: '15s', animationDelay: '0s' }}
        />
        <div 
          className={`absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[100px] animate-float ${isDark ? 'bg-secondary-900/20' : 'bg-secondary-200/40'}`}
          style={{ animationDuration: '18s', animationDelay: '2s' }}
        />
        <div 
          className={`absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply filter blur-[100px] animate-float ${isDark ? 'bg-accent-900/20' : 'bg-accent-200/40'}`}
          style={{ animationDuration: '20s', animationDelay: '4s' }}
        />
      </div>
    );
}

export default BackgroundDecorations;
