/**
 * TypeScript Type Definitions
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the portfolio website application.
 */

import { ReactNode, ComponentType } from 'react';

// Design System Types
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Theme Types
export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

// Layout Types
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
export interface NavigationItem {
  id: string;
  labelKey: string;
  href: string;
  icon?: ComponentType;
}

export interface NavigationProps {
  isFixed?: boolean;
  showBackground?: boolean;
}

// Social Media Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: ComponentType;
}

// Skills Types
export interface Skill {
  name: string;
  level: number; // 1-100
  icon?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  nameKey: string;
  skills: Skill[];
}

export interface SkillsProps {
  skillCategories?: SkillCategory[];
  displayMode?: 'grid' | 'list' | 'interactive';
}

// Hero/Greeting Types
export interface HeroSectionProps {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLink[];
}

// Projects Types
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
}

export interface ProjectsGalleryProps {
  projects: Project[];
  layout?: 'grid' | 'masonry' | 'carousel';
  filterEnabled?: boolean;
}

// Experience Types
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
}

export interface ExperienceTimelineProps {
  experiences: Experience[];
  layout?: 'vertical' | 'horizontal';
}

// Education Types
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  achievements?: string[];
}

// Certification Types
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

// Contact Types
export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
  availability: string;
}

// Personal Info Types
export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  profileImage: string;
  location: string;
  availability: string;
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

// Language Types
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

// Animation Types
export interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Error Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Search and Filter Types
export interface SearchFilters {
  query: string;
  category?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
}

// Accessibility Types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}

// SEO Types
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
}

// Performance Types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

// Export all types
export type {
  // Re-export design system types
  ColorVariant,
  Size,
  Breakpoint,
  Theme,
};