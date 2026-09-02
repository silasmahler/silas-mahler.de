import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactInfo } from '../portfolio';
import SocialMedia from './SocialMedia';
import { animationPresets, getMotionVariants } from '../config/motion';

// TypeScript Interfaces
interface ContactProps {
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC<ContactProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.nameRequired', 'Name is required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired', 'Email is required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid', 'Email is invalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.form.errors.subjectRequired', 'Subject is required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.messageRequired', 'Message is required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Create mailto link with form data
      const mailtoLink = `mailto:${contactInfo.email_address}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      
      setIsSubmitting(false);
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
  }, [formData, validateForm]);

  const containerVariants = getMotionVariants(animationPresets.stagger.container, prefersReducedMotion ?? false);
  const itemVariants = getMotionVariants(animationPresets.slideUp, prefersReducedMotion ?? false);

  return (
    <section 
      id="contact" 
      className={`py-20 section-dark relative ${className}`}
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            id="contact-heading"
            className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
            variants={itemVariants}
          >
            {t('sections.contact')}
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('contact.subtitle', 'Get in touch with me')}
          </motion.p>
        </motion.div>
        
        {/* Contact Content */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Left Side - Contact Info */}
          <motion.div 
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <h1 
              id="contact-heading"
              className="text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 dark:text-neutral-100"
            >
              {t('contact.title')}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
              {t('contact.subtitle')}
            </p>

            {/* Social Media Links */}
            <div className="mb-8">
              <SocialMedia />
            </div>

            {/* Direct Email Button */}
            <motion.a
              href={`mailto:${contactInfo.email_address}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-envelope text-lg" aria-hidden="true" />
              {t('buttons.sayHello')}
            </motion.a>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            className="w-full lg:w-1/2"
            variants={itemVariants}
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl dark:shadow-neutral-900/30 p-8 border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                {t('contact.form.title', 'Send me a message')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    {t('contact.form.name', 'Your Name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500'
                    } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all duration-200 text-neutral-900 dark:text-neutral-100`}
                    placeholder={t('contact.form.namePlaceholder', 'John Doe')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    {t('contact.form.email', 'Your Email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500'
                    } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all duration-200 text-neutral-900 dark:text-neutral-100`}
                    placeholder={t('contact.form.emailPlaceholder', 'john@example.com')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    {t('contact.form.subject', 'Subject')} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border ${
                      errors.subject 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500'
                    } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all duration-200 text-neutral-900 dark:text-neutral-100`}
                    placeholder={t('contact.form.subjectPlaceholder', 'Project Inquiry')}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    {t('contact.form.message', 'Message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500'
                    } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all duration-200 text-neutral-900 dark:text-neutral-100 resize-none`}
                    placeholder={t('contact.form.messagePlaceholder', 'Tell me about your project...')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      {t('contact.form.sending', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane" aria-hidden="true" />
                      {t('contact.form.send', 'Send Message')}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
