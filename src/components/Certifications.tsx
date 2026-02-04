import React, { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { certifications } from '../portfolio';
import { animationPresets, getMotionVariants } from '../config/motion';

// TypeScript Interfaces
interface Certification {
  title: string;
  date: string;
}

interface CertificationsProps {
  className?: string;
}

const Certifications: React.FC<CertificationsProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  if (!certifications.display) return null;

  const containerVariants = getMotionVariants(animationPresets.stagger.container, prefersReducedMotion ?? false);
  const itemVariants = getMotionVariants(animationPresets.slideUp, prefersReducedMotion ?? false);

  return (
    <section 
      id="certifications" 
      className={`py-20 section-dark relative ${className}`}
      aria-labelledby="certifications-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            id="certifications-heading"
            className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
            variants={itemVariants}
          >
            {t('sections.certifications')}
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('certifications.subtitle', 'Professional certifications and achievements')}
          </motion.p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {certifications.certifications.map((cert: Certification, index: number) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const isInView = useInView(cardRef, { once: true, margin: '-50px' });

              return (
                <motion.div
                  key={index}
                  ref={cardRef}
                  className="card group relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <motion.div
                      className="w-14 h-14 rounded-lg bg-primary-500 dark:bg-primary-600 flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
                    >
                      <i className="fas fa-certificate text-xl text-white" aria-hidden="true" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <div className="flex-1 mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <span className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                      <i className="fas fa-calendar text-xs" aria-hidden="true" />
                      {cert.date}
                    </span>
                    
                    <motion.div
                      className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                    >
                      <i className="fas fa-check-circle" aria-hidden="true" />
                      <span className="font-medium">{t('certifications.verified', 'Verified')}</span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats Summary */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {certifications.certifications.length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('certifications.totalCertifications', 'Total Certifications')}
              </div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                {new Date().getFullYear() - Math.min(...certifications.certifications.map((c: Certification) => parseInt(c.date)))}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('certifications.yearsOfLearning', 'Years of Learning')}
              </div>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {certifications.certifications.filter((c: Certification) => parseInt(c.date) >= new Date().getFullYear() - 1).length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('certifications.recentCertifications', 'Recent (Last Year)')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
