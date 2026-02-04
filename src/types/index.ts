/**
 * Global TypeScript type definitions for the portfolio website
 */

import { ReactNode, ComponentType } from 'react';

// Design System Types
export interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

export interface SemanticColors {
  success: ColorShades;
  warning: ColorShades;
  error: ColorShades;
  info: ColorShades;
}

// Layout and Context Types
export interface LayoutContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  scrollY: number;
  isScrolled: boolean;
}

export interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

// Navigation Types
export interface NavigationProps {
  isFixed?: boolean;
  showBackground?: boolean;
}

export interface NavigationItem {
  id: string;
  labelKey: string;
  href: string;
  icon?: ComponentType;
}

// Content Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: ComponentType;
  label?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  profileImage: string;
  location: string;
  availability: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5 or 1-100
  icon?: string;
  description?: string;
  category?: string;
}

export interface SkillCategory {
  id: string;
  nameKey: string;
  skills: Skill[];
  icon?: ComponentType;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  achievements: string[];
  technologies: string[];
  location: string;
  companyLogo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  achievements?: string[];
  logo?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  verificationUrl?: string;
  badge?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
  availability: string;
}

// Component Props Types
export interface HeroSectionProps {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLink[];
}

export interface SkillsProps {
  skillCategories: SkillCategory[];
  displayMode?: 'grid' | 'list' | 'interactive';
}

export interface ProjectsGalleryProps {
  projects: Project[];
  layout?: 'grid' | 'masonry' | 'carousel';
  filterEnabled?: boolean;
}

export interface ExperienceTimelineProps {
  experiences: Experience[];
  layout?: 'vertical' | 'horizontal';
}

// Theme and Internationalization Types
export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface LanguageSwitcherProps {
  currentLanguage: string;
  availableLanguages: Language[];
  onLanguageChange: (language: string) => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  isDark: boolean;
}

// Animation Types
export type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';

export interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

// Portfolio Data Structure
export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  contact: ContactInfo;
}

// Utility Types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Event Handler Types
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;

// API Response Types (for future use)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Error Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface FallbackProps {
  error?: Error;
  resetError?: () => void;
}

// Performance Types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

// Accessibility Types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
  tabIndex?: number;
}

export default {};