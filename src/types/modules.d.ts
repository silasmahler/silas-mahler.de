/**
 * Module declarations for non-TypeScript files
 */

declare module '@/portfolio' {
  export interface Greeting {
    username: string;
    title: string;
    subTitle: string;
    resumeLink: string;
    displayGreeting: boolean;
    profileImage: string;
  }

  export interface SocialMediaLinks {
    github: string;
    linkedin: string;
    gmail: string;
    gitlab: string;
    facebook: string;
    twitter: string;
    display: boolean;
  }

  export interface SoftwareSkill {
    skillName: string;
    fontAwesomeClassname: string;
  }

  export interface SkillsSection {
    title: string;
    subTitle: string;
    skills: string[];
    softwareSkills: SoftwareSkill[];
    display: boolean;
  }

  export interface School {
    schoolName: string;
    logo: string;
    subHeader: string;
    duration: string;
    desc: string;
    descBullets: string[];
  }

  export interface EducationInfo {
    display: boolean;
    schools: School[];
  }

  export interface TechStackItem {
    Stack: string;
    progressPercentage: string;
  }

  export interface TechStack {
    viewSkillBars: boolean;
    experience: TechStackItem[];
    displayCodersrank: boolean;
  }

  export interface WorkExperience {
    companyKey: string;
    company: string;
    companylogo: string;
    date: string;
  }

  export interface WorkExperiences {
    display: boolean;
    experience: WorkExperience[];
  }

  export interface Certification {
    title: string;
    date: string;
  }

  export interface Certifications {
    display: boolean;
    certifications: Certification[];
  }

  export interface OpenSource {
    title: string;
    subtitle: string;
    showGithubProfile: string;
    display: boolean;
  }

  export interface FooterLink {
    nameKey: string;
    url: string;
  }

  export interface BigProject {
    image: string;
    projectKey: string;
    footerLink: FooterLink[];
  }

  export interface BigProjects {
    title: string;
    subtitle: string;
    projects: BigProject[];
    display: boolean;
  }

  export interface PodcastSection {
    title: string;
    subtitle: string;
    podcast: string[];
    display: boolean;
  }

  export interface ContactInfo {
    title: string;
    subtitle: string;
    number: string;
    email_address: string;
  }

  export interface TwitterDetails {
    userName: string;
    display: boolean;
  }

  export interface Illustration {
    animated: boolean;
  }

  export const illustration: Illustration;
  export const greeting: Greeting;
  export const socialMediaLinks: SocialMediaLinks;
  export const skillsSection: SkillsSection;
  export const educationInfo: EducationInfo;
  export const techStack: TechStack;
  export const workExperiences: WorkExperiences;
  export const openSource: OpenSource;
  export const bigProjects: BigProjects;
  export const podcastSection: PodcastSection;
  export const contactInfo: ContactInfo;
  export const twitterDetails: TwitterDetails;
  export const certifications: Certifications;
}

declare module '@/components/LanguageSwitcher' {
  import React from 'react';
  const LanguageSwitcher: React.FC;
  export default LanguageSwitcher;
}

// Image module declarations
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

// CSS module declarations
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// React Easy Emoji
declare module 'react-easy-emoji' {
  function emoji(text: string): string;
  export default emoji;
}