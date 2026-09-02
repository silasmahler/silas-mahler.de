import React, { useState, useCallback, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { workExperiences } from '../portfolio';
import { animationPresets, getMotionVariants } from '../config/motion';

// TypeScript Interfaces
interface WorkExperience {
  company: string;
  companylogo: string;
  companyKey: string;
  date: string;
}

interface WorkExperienceProps {
  className?: string;
}

// Timeline Item Component
interface TimelineItemProps {
  experience: WorkExperience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ experience, index, isExpanded, onToggle }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

  const itemVariants = getMotionVariants(animationPresets.slideUp, prefersReducedMotion ?? false);

  // Get bullets based on company key
  const getBullets = () => {
    const bullets: string[] = [];
    
    switch (experience.companyKey) {
      case 'capgemini':
        bullets.push(
          t(`workExperience.${experience.companyKey}.bullets.header`),
          t(`workExperience.${experience.companyKey}.bullets.finops`),
          t(`workExperience.${experience.companyKey}.bullets.adas`),
          t(`workExperience.${experience.companyKey}.bullets.waf`),
          t(`workExperience.${experience.companyKey}.bullets.sovereignCloud`),
          t(`workExperience.${experience.companyKey}.bullets.modernization`),
          t(`workExperience.${experience.companyKey}.bullets.iac`),
          t(`workExperience.${experience.companyKey}.bullets.security`),
          t(`workExperience.${experience.companyKey}.bullets.migration`),
          t(`workExperience.${experience.companyKey}.bullets.coordination`),
          t(`workExperience.${experience.companyKey}.bullets.devops`)
        );
        break;
      case 'kreinn':
        bullets.push(
          t(`workExperience.${experience.companyKey}.bullet1`),
          t(`workExperience.${experience.companyKey}.bullet2`),
          t(`workExperience.${experience.companyKey}.bullet3`),
          t(`workExperience.${experience.companyKey}.bullet4`)
        );
        break;
      case 'appsAssociates':
        bullets.push(
          t(`workExperience.${experience.companyKey}.bullets.header`),
          t(`workExperience.${experience.companyKey}.bullets.ifs`),
          t(`workExperience.${experience.companyKey}.bullets.university`),
          t(`workExperience.${experience.companyKey}.bullets.football`),
          t(`workExperience.${experience.companyKey}.bullets.carRental`),
          t(`workExperience.${experience.companyKey}.bullets.energy`),
          t(`workExperience.${experience.companyKey}.bullets.payment`),
          t(`workExperience.${experience.companyKey}.bullets.consulting`),
          t(`workExperience.${experience.companyKey}.bullets.ims`),
          t(`workExperience.${experience.companyKey}.bullets.terraform`),
          t(`workExperience.${experience.companyKey}.bullets.training`)
        );
        break;
      case 'adesso':
        bullets.push(
          t(`workExperience.${experience.companyKey}.bullet1`),
          t(`workExperience.${experience.companyKey}.bullet2`),
          t(`workExperience.${experience.companyKey}.bullet3`)
        );
        break;
      case 'fhdo':
        bullets.push(
          t(`workExperience.${experience.companyKey}.bullet1`),
          t(`workExperience.${experience.companyKey}.bullet2`),
          t(`workExperience.${experience.companyKey}.bullet3`)
        );
        break;
    }
    
    return bullets;
  };

  const bullets = getBullets();

  return (
    <motion.div
      ref={itemRef}
      className="relative"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex gap-6">
        {/* Timeline Line */}
        <div className="relative flex flex-col items-center">
          {/* Timeline Dot */}
          <motion.div
            className="w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400 border-4 border-white dark:border-neutral-900 shadow-lg z-10"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
          />
          
          {/* Vertical Line */}
          {index < workExperiences.experience.length - 1 && (
            <motion.div
              className="w-0.5 flex-1 bg-gradient-to-b from-primary-500 to-neutral-300 dark:from-primary-400 dark:to-neutral-700 mt-2"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
              style={{ transformOrigin: 'top' }}
            />
          )}
        </div>

        {/* Content Card */}
        <motion.div
          className="flex-1 mb-12"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md dark:shadow-neutral-900/20 border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl dark:hover:shadow-neutral-900/30 transition-shadow duration-300">
            {/* Card Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Company Logo */}
                <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-sm">
                  <img 
                    src={experience.companylogo} 
                    alt={experience.company} 
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Company Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                    {experience.company}
                  </h3>
                  <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                    {t(`workExperience.${experience.companyKey}.role`)}
                  </h4>
                </div>

                {/* Date Badge */}
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    <i className="fas fa-calendar-alt" aria-hidden="true" />
                    {experience.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Description */}
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                {t(`workExperience.${experience.companyKey}.desc`)}
              </p>

              {/* Expand/Collapse Button */}
              <button
                onClick={onToggle}
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200 mb-4"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? t('workExperience.showLess', 'Show Less') : t('workExperience.showMore', 'Show More')}</span>
                <motion.i
                  className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                />
              </button>

              {/* Expandable Achievements */}
              <motion.div
                initial={false}
                animate={{ 
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <h5 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 uppercase tracking-wide">
                    {t('workExperience.keyAchievements', 'Key Achievements & Responsibilities')}
                  </h5>
                  <ul className="space-y-2">
                    {bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <i className="fas fa-check-circle text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const WorkExperience: React.FC<WorkExperienceProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0])); // First item expanded by default

  const toggleItem = useCallback((index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedItems(new Set(workExperiences.experience.map((_, i) => i)));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  if (!workExperiences.display) return null;

  const containerVariants = getMotionVariants(animationPresets.stagger.container, prefersReducedMotion ?? false);
  const itemVariants = getMotionVariants(animationPresets.slideUp, prefersReducedMotion ?? false);

  return (
    <section 
      id="experience" 
      className={`py-20 section-dark relative ${className}`}
      aria-labelledby="experience-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h1
            id="experience-heading"
            className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
            variants={itemVariants}
          >
            {t('sections.workExperience')}
          </motion.h1>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('workExperience.subtitle', 'My professional journey and key achievements')}
          </motion.p>
        </motion.div>

        {/* Expand/Collapse Controls */}
        <motion.div
          className="flex justify-center gap-3 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <button
            onClick={expandAll}
            className="px-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200"
          >
            <i className="fas fa-expand-arrows-alt mr-2" aria-hidden="true" />
            {t('workExperience.expandAll', 'Expand All')}
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors duration-200"
          >
            <i className="fas fa-compress-arrows-alt mr-2" aria-hidden="true" />
            {t('workExperience.collapseAll', 'Collapse All')}
          </button>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {workExperiences.experience.map((exp: WorkExperience, index: number) => (
            <TimelineItem
              key={index}
              experience={exp}
              index={index}
              isExpanded={expandedItems.has(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
