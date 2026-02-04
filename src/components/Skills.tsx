import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Transition, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { skillsSection, techStack } from '../portfolio';
import { SkillsProps, SkillCategory, Skill } from '../types';
import { animationPresets, transitions, getMotionVariants } from '../config/motion';
import { designSystemUtils } from '../utils/design-system';
import skill from "../assets/images/skill.svg";

// Helper function to ensure transitions are never undefined
const safeTransition = (transition: Transition | undefined): Transition => 
  transition || { duration: 0.3, ease: 'easeInOut' };

// Enhanced skill data structure with categories and improved metadata
const skillCategories: SkillCategory[] = [
  {
    id: 'cloud-devops',
    nameKey: 'skills.categories.cloudDevops',
    skills: [
      { 
        name: 'AWS', 
        level: 95, 
        icon: 'fab fa-aws', 
        description: 'Cloud architecture and services' 
      },
      { 
        name: 'Terraform', 
        level: 95, 
        icon: 'fas fa-code', 
        description: 'Infrastructure as Code' 
      },
      { 
        name: 'Docker', 
        level: 90, 
        icon: 'fab fa-docker', 
        description: 'Containerization' 
      },
      { 
        name: 'Jenkins', 
        level: 85, 
        icon: 'fab fa-jenkins', 
        description: 'CI/CD automation' 
      },
      { 
        name: 'Linux', 
        level: 90, 
        icon: 'fab fa-linux', 
        description: 'System administration' 
      },
      { 
        name: 'Kubernetes', 
        level: 80, 
        icon: 'fas fa-dharmachakra', 
        description: 'Container orchestration' 
      },
    ]
  },
  {
    id: 'programming',
    nameKey: 'skills.categories.programming',
    skills: [
      { 
        name: 'Java', 
        level: 85, 
        icon: 'fab fa-java', 
        description: 'Enterprise applications' 
      },
      { 
        name: 'Spring Boot', 
        level: 85, 
        icon: 'fas fa-leaf', 
        description: 'Microservices framework' 
      },
      { 
        name: 'Python', 
        level: 80, 
        icon: 'fab fa-python', 
        description: 'Automation and scripting' 
      },
      { 
        name: 'JavaScript', 
        level: 75, 
        icon: 'fab fa-js', 
        description: 'Frontend development' 
      },
      { 
        name: 'TypeScript', 
        level: 80, 
        icon: 'fab fa-js-square', 
        description: 'Type-safe JavaScript' 
      },
      { 
        name: 'Git', 
        level: 90, 
        icon: 'fab fa-git-alt', 
        description: 'Version control' 
      },
    ]
  },
  {
    id: 'architecture',
    nameKey: 'skills.categories.architecture',
    skills: [
      { 
        name: 'Microservices', 
        level: 90, 
        icon: 'fas fa-cubes', 
        description: 'Distributed system design' 
      },
      { 
        name: 'API Design', 
        level: 85, 
        icon: 'fas fa-plug', 
        description: 'RESTful and GraphQL APIs' 
      },
      { 
        name: 'System Design', 
        level: 88, 
        icon: 'fas fa-sitemap', 
        description: 'Scalable architecture patterns' 
      },
      { 
        name: 'Security', 
        level: 82, 
        icon: 'fas fa-shield-alt', 
        description: 'Application and infrastructure security' 
      },
    ]
  }
];

interface SkillBarProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-50px" });

  // Trigger animation when in view
  useEffect(() => {
    if (isInView && isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, isVisible, hasAnimated]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsHovered(!isHovered);
    }
  }, [isHovered]);

  const skillVariants = getMotionVariants(animationPresets.slideUp, prefersReducedMotion ?? false);

  return (
    <motion.div
      ref={barRef}
      className="group focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 rounded-lg"
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={skillVariants}
      transition={{ ...transitions.normal, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="progressbar"
      aria-valuenow={skill.level}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${skill.name}: ${skill.level}% proficiency`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          {skill.icon && (
            <motion.div
              className="relative"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0 
              }}
              transition={safeTransition(transitions.fast)}
            >
              <i
                className={`${skill.icon} text-lg text-primary-500 dark:text-primary-400 drop-shadow-sm`}
                aria-hidden="true"
              />
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-primary-500/20 rounded-full blur-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={safeTransition(transitions.fast)}
                />
              )}
            </motion.div>
          )}
          <div className="flex flex-col">
            <span className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              {skill.name}
            </span>
            {skill.description && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {skill.description}
              </span>
            )}
          </div>
        </div>
        <motion.div
          className="flex items-center gap-2"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={safeTransition(transitions.fast)}
        >
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            {skill.level}%
          </span>
          <div className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 opacity-60" />
        </motion.div>
      </div>
      
      <div className="relative">
        {/* Background track */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden shadow-inner">
          {/* Animated progress bar */}
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, 
                ${designSystemUtils.colors.getValue('primary', 500)} 0%, 
                ${designSystemUtils.colors.getValue('primary', 600)} 50%, 
                ${designSystemUtils.colors.getValue('accent', 500)} 100%)`
            }}
            initial={{ width: 0, opacity: 0.8 }}
            animate={{ 
              width: hasAnimated ? `${skill.level}%` : 0,
              opacity: isHovered ? 1 : 0.8
            }}
            transition={{ 
              width: { ...transitions.slow, delay: index * 0.1 + 0.3 },
              opacity: safeTransition(transitions.fast)
            }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: isHovered ? ['0%', '100%'] : '0%',
              }}
              transition={{
                duration: 1.2,
                ease: 'easeInOut',
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.5,
              }}
            />
            
            {/* Pulse effect for high-level skills */}
            {skill.level >= 85 && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.div>
        </div>
        
        {/* Skill level indicator */}
        <motion.div
          className="absolute top-0 h-3 w-1 bg-white dark:bg-neutral-900 rounded-full shadow-sm"
          style={{ left: `${skill.level}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hasAnimated ? 1 : 0, 
            scale: hasAnimated ? 1 : 0,
            y: isHovered ? -2 : 0
          }}
          transition={{ 
            ...transitions.normal, 
            delay: index * 0.1 + 0.5 
          }}
        />
      </div>
    </motion.div>
  );
};

interface SkillCategoryProps {
  category: SkillCategory;
  isExpanded: boolean;
  onToggle: () => void;
  searchTerm: string;
  index: number;
}

const SkillCategorySection: React.FC<SkillCategoryProps> = ({
  category,
  isExpanded,
  onToggle,
  searchTerm,
  index
}) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const filteredSkills = useMemo(() => {
    if (!searchTerm) return category.skills;
    return category.skills.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [category.skills, searchTerm]);

  const averageLevel = useMemo(() => {
    if (filteredSkills.length === 0) return 0;
    return Math.round(filteredSkills.reduce((acc, skill) => acc + skill.level, 0) / filteredSkills.length);
  }, [filteredSkills]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  }, [onToggle]);

  if (filteredSkills.length === 0) return null;

  const categoryVariants = getMotionVariants(animationPresets.scale, prefersReducedMotion ?? false);

  return (
    <motion.div
      ref={sectionRef}
      className="card overflow-hidden"
      layout
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={categoryVariants}
      transition={{ ...transitions.normal, delay: index * 0.1 }}
    >
      <motion.button
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/50 dark:hover:bg-neutral-700/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-2xl"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        aria-expanded={isExpanded}
        aria-controls={`skills-category-${category.id}`}
        role="button"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 dark:from-primary-500 dark:to-accent-400 flex items-center justify-center text-white font-semibold shadow-xl"
            animate={{ 
              rotate: isExpanded ? 180 : 0,
              scale: isExpanded ? 1.05 : 1
            }}
            transition={safeTransition(transitions.normal)}
          >
            <i className="fas fa-chevron-down text-base" aria-hidden="true" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              {t(category.nameKey)}
            </h3>
            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <span>
                {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
              </span>
              <span className="w-1 h-1 bg-neutral-400 rounded-full" />
              <span className="flex items-center gap-1">
                <i className="fas fa-star text-xs text-yellow-500" aria-hidden="true" />
                {averageLevel}% avg
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Category progress indicator */}
          <div className="hidden sm:flex flex-col items-end">
            <div className="w-16 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${averageLevel}%` : 0 }}
                transition={{ ...transitions.slow, delay: index * 0.1 + 0.2 }}
              />
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {averageLevel}%
            </span>
          </div>
          
          {/* Expand/collapse indicator */}
          <motion.div
            className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center"
            animate={{ 
              backgroundColor: isExpanded 
                ? designSystemUtils.colors.getValue('primary', 100)
                : designSystemUtils.colors.getValue('neutral', 100)
            }}
            transition={safeTransition(transitions.fast)}
          >
            <motion.i
              className={`fas ${isExpanded ? 'fa-minus' : 'fa-plus'} text-xs text-neutral-600 dark:text-neutral-300`}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={safeTransition(transitions.fast)}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`skills-category-${category.id}`}
            className="px-6 pb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={safeTransition(transitions.normal)}
            role="region"
            aria-labelledby={`skills-category-${category.id}-header`}
          >
            <div className="space-y-5">
              {filteredSkills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={skillIndex}
                  isVisible={isExpanded}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills: React.FC<SkillsProps> = ({ 
  skillCategories: propSkillCategories
}) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // Use prop categories if provided, otherwise use default
  const categories = propSkillCategories || skillCategories;

  if (!skillsSection.display) return null;

  const heroVariants = getMotionVariants(animationPresets.hero.container, prefersReducedMotion ?? false);
  const heroItemVariants = getMotionVariants(animationPresets.hero.item, prefersReducedMotion ?? false);

  return (
    <section 
      id="skills" 
      className="py-20 section-light relative"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={heroVariants}
        >
          <motion.h2
            id="skills-heading"
            className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
            variants={heroItemVariants}
          >
            {t('skills.title')}
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            variants={heroItemVariants}
          >
            {t('skills.subtitle')}
          </motion.p>
        </motion.div>

        {/* Skills Grid - Clean 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              className="card p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="w-12 h-12 rounded-lg bg-primary-500 dark:bg-primary-600 flex items-center justify-center text-white">
                  <i className={`fas ${catIndex === 0 ? 'fa-cloud' : catIndex === 1 ? 'fa-code' : 'fa-sitemap'} text-xl`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {t(category.nameKey)}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {skill.icon && (
                          <i className={`${skill.icon} text-primary-600 dark:text-primary-400`} aria-hidden="true" />
                        )}
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 + skillIndex * 0.05, duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;