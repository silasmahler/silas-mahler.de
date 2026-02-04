import React, { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { educationInfo } from '../portfolio';
import { animationPresets, getMotionVariants } from '../config/motion';

// TypeScript Interfaces
interface School {
  schoolName: string;
  logo: string;
  subHeader: string;
  duration: string;
  desc: string;
  descBullets?: string[];
}

interface EducationProps {
  className?: string;
}

const Education: React.FC<EducationProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  if (!educationInfo.display) return null;

  const containerVariants = getMotionVariants(animationPresets.stagger.container, prefersReducedMotion ?? false);
  const itemVariants = getMotionVariants(animationPresets.slideUp, prefersReducedMotion ?? false);

  return (
    <section 
      id="education" 
      className={`py-20 section-light relative ${className}`}
      aria-labelledby="education-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 10, 
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
            id="education-heading"
            className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
            variants={itemVariants}
          >
            {t('sections.education')}
          </motion.h1>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('education.subtitle', 'My academic background and qualifications')}
          </motion.p>
        </motion.div>

        {/* Education Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {educationInfo.schools.map((school: School, index: number) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const isInView = useInView(cardRef, { once: true, margin: '-50px' });

            return (
              <motion.div
                key={index}
                ref={cardRef}
                className="group bg-white dark:bg-neutral-800 rounded-xl shadow-md dark:shadow-neutral-900/20 border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl dark:hover:shadow-neutral-900/30 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                {/* Card Header with Logo */}
                <div className="relative h-32 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center p-6">
                  <motion.div
                    className="bg-white p-4 rounded-xl shadow-lg"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <img 
                      src={school.logo} 
                      alt={school.schoolName} 
                      className="w-20 h-20 object-contain"
                      loading="lazy"
                    />
                  </motion.div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-bl-full" />
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* School Name and Duration */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex-1">
                        {school.schoolName}
                      </h3>
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium flex-shrink-0">
                        <i className="fas fa-calendar-alt text-xs" aria-hidden="true" />
                        {school.duration}
                      </span>
                    </div>
                    
                    {/* Degree */}
                    <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                      {school.subHeader}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                    {school.desc}
                  </p>

                  {/* Bullets */}
                  {school.descBullets && school.descBullets.length > 0 && (
                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <ul className="space-y-2">
                        {school.descBullets.map((bullet, i) => (
                          <li 
                            key={i}
                            className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300 text-sm"
                          >
                            <i className="fas fa-graduation-cap text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-primary-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
