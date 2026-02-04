
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { greeting, illustration, socialMediaLinks } from '../portfolio';
import { FaGithub, FaLinkedin, FaGoogle, FaTwitter } from 'react-icons/fa';
import { animationPresets, transitions } from '../config/motion';
import undrawn2 from "../assets/images/undrawn2.svg";

// TypeScript interfaces
interface GreetingData {
  username: string;
  title: string;
  subTitle: string;
  resumeLink?: string;
  displayGreeting: boolean;
  profileImage?: string;
}

interface IllustrationData {
  animated: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType;
}

interface GreetingProps {
  className?: string;
}

// Typing animation hook
const useTypingAnimation = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    let index = 0;
    setDisplayText('');
    setIsComplete(false);
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

// Floating social media links component with professional icons
const FloatingSocialLinks: React.FC = () => {
  if (!socialMediaLinks.display) return null;

  const socialPlatforms = [
    { 
      key: 'github', 
      url: socialMediaLinks.github, 
      icon: FaGithub, 
      color: 'bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600' 
    },
    { 
      key: 'linkedin', 
      url: socialMediaLinks.linkedin, 
      icon: FaLinkedin, 
      color: 'bg-[#0077B5] hover:bg-[#006396] dark:bg-[#0077B5] dark:hover:bg-[#006396]' 
    },
    { 
      key: 'gmail', 
      url: socialMediaLinks.gmail, 
      icon: FaGoogle, 
      color: 'bg-[#D14836] hover:bg-[#B03C2D] dark:bg-[#D14836] dark:hover:bg-[#B03C2D]', 
      isEmail: true 
    },
    { 
      key: 'twitter', 
      url: socialMediaLinks.twitter, 
      icon: FaTwitter, 
      color: 'bg-[#1DA1F2] hover:bg-[#0c85d0] dark:bg-[#1DA1F2] dark:hover:bg-[#0c85d0]' 
    },
  ].filter(platform => platform.url);

  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center lg:justify-start"
      variants={animationPresets.stagger.container}
      initial="hidden"
      animate="visible"
    >
      {socialPlatforms.map((platform, index) => {
        const IconComponent = platform.icon;
        return (
          <motion.a
            key={platform.key}
            href={platform.isEmail ? `mailto:${platform.url}` : platform.url}
            target={platform.isEmail ? undefined : "_blank"}
            rel={platform.isEmail ? undefined : "noopener noreferrer"}
            className={`
              icon-button ${platform.color} text-white
              transition-all duration-200 transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              dark:focus:ring-offset-neutral-900 shadow-sm hover:shadow-md
            `}
            variants={animationPresets.stagger.item}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <IconComponent className="text-lg" />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

// Enhanced profile image component
const ProfileImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="relative max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transitions.slow}
    >

      
      {/* Profile image container with clean border */}
      <div className="relative overflow-hidden rounded-2xl aspect-square bg-white dark:bg-neutral-800 p-1.5 shadow-lg border-2 border-neutral-200 dark:border-neutral-700">
        {!imageError ? (
          <>
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-1.5 rounded-xl bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-pulse"></div>
            )}
            
            {/* Actual image */}
            <img
              src={src}
              alt={alt}
              className={`
                w-full h-full object-cover rounded-xl transition-all duration-300
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          /* Fallback illustration with professional icon */
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
            <i className="fas fa-user-tie text-6xl text-primary-600 dark:text-primary-400" aria-hidden="true" />
          </div>
        )}
      </div>

    </motion.div>
  );
};

const Greeting: React.FC<GreetingProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Typing animation for subtitle
  const subtitle = t('greeting.subtitle');
  const { displayText: typedSubtitle, isComplete } = useTypingAnimation(subtitle, 30);

  // Don't render if greeting is disabled
  if (!greeting.displayGreeting) return null;

  return (
    <motion.section
      ref={ref}
      className={`
        section-light
        relative flex flex-col-reverse lg:flex-row items-center justify-between 
        min-h-[calc(100vh-4rem)] py-16 lg:py-24 px-4 lg:px-8 max-w-7xl mx-auto
        ${className}
      `}
      variants={animationPresets.hero.container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Content Section */}
      <div className="w-full lg:w-1/2 lg:pr-16 text-center lg:text-left space-y-6">
        {/* Main Title */}
        <motion.div
          variants={animationPresets.hero.item}
          className="space-y-3"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white"
          >
            {t('greeting.title')}
          </motion.h1>
        </motion.div>

        {/* Animated Subtitle with Typing Effect */}
        <motion.div
          variants={animationPresets.hero.item}
          className="relative"
        >
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-light">
            {typedSubtitle}
            {!isComplete && (
              <motion.span
                className="inline-block w-0.5 h-5 bg-primary-500 ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          variants={animationPresets.hero.item}
          className="space-y-5"
        >
          <FloatingSocialLinks />
          
          {/* Resume Button */}
          {greeting.resumeLink && (
            <motion.div
              className="pt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={greeting.resumeLink}
                className="btn-primary inline-flex items-center space-x-2 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{t('buttons.seeResume')}</span>
                <motion.i
                  className="fas fa-arrow-right text-sm"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        className="w-full lg:w-1/2 mb-12 lg:mb-0"
        variants={animationPresets.hero.item}
      >
        {greeting.profileImage ? (
          <ProfileImage 
            src={greeting.profileImage} 
            alt={greeting.username || 'Profile'} 
          />
        ) : illustration.animated ? (
          <motion.div
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitions.slow}
          >
            <motion.img 
              src={undrawn2} 
              alt="Professional illustration" 
              className="w-full h-auto"
              animate={{ 
                y: [-10, 10, -10],
                rotate: [-1, 1, -1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            className="w-full h-auto max-w-lg mx-auto card p-12 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transitions.slow}
          >
            <div className="text-center">
              <i className="fas fa-code text-8xl text-primary-600 dark:text-primary-400 mb-4" aria-hidden="true" />
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium">
                {t('greeting.developer', 'Software Developer')}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>


    </motion.section>
  );
};

export default Greeting;

