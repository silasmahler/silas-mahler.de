import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { openSource, bigProjects, socialMediaLinks } from '../portfolio';
import { animationPresets, getMotionVariants } from '../config/motion';

// TypeScript Interfaces
interface GitHubRepo {
  node: {
    id: string;
    name: string;
    url: string;
    description: string;
    primaryLanguage: {
      name: string;
      color: string;
    };
    stargazers: {
      totalCount: number;
    };
    forkCount: number;
    diskUsage: number;
  };
}

interface BigProject {
  image: string;
  projectKey: string;
  footerLink: Array<{
    nameKey: string;
    url: string;
  }>;
}

interface ProjectsProps {
  className?: string;
}

// Lazy Image Component with loading states
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '', onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '200px' });

  useEffect(() => {
    if (inView && !isInView) {
      setIsInView(true);
    }
  }, [inView, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-pulse" />
      )}
      
      {/* Actual image - only load when in view */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleLoad}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [repoData, setRepoData] = useState<GitHubRepo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch GitHub repos
  useEffect(() => {
    if (openSource.showGithubProfile) {
      setIsLoading(true);
      fetch('/profile.json')
        .then(result => {
          if (result.ok) {
            return result.json();
          }
          throw new Error('Failed to fetch profile data');
        })
        .then(response => {
          if (response?.data?.user?.pinnedItems?.edges) {
            setRepoData(response.data.user.pinnedItems.edges);
          }
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Error fetching profile.json", error);
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, []);

  // Filter repos based on search
  const filteredRepos = useMemo(() => {
    if (!searchTerm) return repoData;
    return repoData.filter(repo => 
      repo.node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.node.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [repoData, searchTerm]);

  // Clear search function
  const clearSearch = () => {
    setSearchTerm('');
  };

  // Get unique categories from big projects
  const categories = useMemo(() => {
    const cats = new Set<string>(['all']);
    bigProjects.projects.forEach((project: BigProject) => {
      const category = t(`projects.bigProjects.${project.projectKey}.category`, 'Other');
      cats.add(category);
    });
    return Array.from(cats);
  }, [t]);

  // Filter big projects by category
  const filteredBigProjects = useMemo(() => {
    if (selectedCategory === 'all') return bigProjects.projects;
    return bigProjects.projects.filter((project: BigProject) => {
      const category = t(`projects.bigProjects.${project.projectKey}.category`, 'Other');
      return category === selectedCategory;
    });
  }, [selectedCategory, t]);

  if (!bigProjects.display && !openSource.display) return null;

  const containerVariants = getMotionVariants(animationPresets.stagger.container, prefersReducedMotion ?? false);
  const itemVariants = getMotionVariants(animationPresets.slideUp, prefersReducedMotion ?? false);

  return (
    <section 
      id="projects" 
      className={`py-20 section-dark relative ${className}`}
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            id="projects-heading"
            className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
            variants={itemVariants}
          >
            {t('sections.projects')}
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('projects.subtitle', 'Featured projects and contributions')}
          </motion.p>
        </motion.div>

        {/* Big Projects Section */}
        {bigProjects.display && (
          <div className="mb-16">
            <motion.h3
              className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              {t('projects.bigProjects.title')}
            </motion.h3>

            {/* Projects Grid - Smaller */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {bigProjects.projects.map((project: BigProject) => (
                <motion.a
                  key={project.projectKey}
                  href={project.footerLink[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group text-center cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  {/* Project Image */}
                  <div className="relative h-32 mb-4 flex items-center justify-center">
                    <LazyImage
                      src={project.image}
                      alt={t(`projects.bigProjects.${project.projectKey}.name`)}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Project Name */}
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                    {t(`projects.bigProjects.${project.projectKey}.name`)}
                  </h4>

                  {/* Project Tag */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                    {t(`projects.bigProjects.${project.projectKey}.tag`)}
                  </p>

                  {/* External Link Icon */}
                  <div className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fas fa-external-link-alt" aria-hidden="true" />
                    <span>{t(`projects.bigProjects.${project.projectKey}.${project.footerLink[0]?.nameKey}`)}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        )}

        {/* GitHub Projects Section */}
        {openSource.display && (
          <div>
            <motion.h3
              className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              {t('projects.openSource.title')}
            </motion.h3>

            {/* Search Bar */}
            {repoData.length > 0 && (
              <motion.div
                className="max-w-md mx-auto mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('projects.search', 'Search repositories...')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 text-neutral-900 dark:text-neutral-100 text-sm"
                    aria-label="Search repositories"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm" aria-hidden="true" />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                      aria-label="Clear search"
                    >
                      <i className="fas fa-times text-sm" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <motion.div
                  className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  {t('projects.loading', 'Loading projects...')}
                </p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-4" aria-hidden="true" />
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  {t('projects.error', 'Failed to load projects')}
                </p>
              </motion.div>
            )}

            {/* Repositories Grid */}
            {!isLoading && !error && filteredRepos.length > 0 && (
              <>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                >
                  {filteredRepos.map((repo) => {
                    const node = repo.node;
                    return (
                      <motion.a
                        key={node.id}
                        href={node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white dark:bg-neutral-800 rounded-xl shadow-md dark:shadow-neutral-900/20 p-6 flex flex-col h-full border border-neutral-200 dark:border-neutral-700 hover:shadow-xl dark:hover:shadow-neutral-900/30 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                      >
                        {/* Repo Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <i className="fab fa-github text-xl text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate">
                              {node.name}
                            </h3>
                          </div>
                          {node.primaryLanguage && (
                            <span className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 ml-2 flex-shrink-0">
                              <span 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: node.primaryLanguage.color }}
                                aria-hidden="true"
                              />
                              {node.primaryLanguage.name}
                            </span>
                          )}
                        </div>

                        {/* Repo Description */}
                        <p className="text-neutral-600 dark:text-neutral-300 mb-4 flex-grow text-sm line-clamp-3">
                          {node.description || t('projects.noDescription', 'No description available')}
                        </p>

                        {/* Repo Stats */}
                        <div className="flex justify-between items-center text-sm text-neutral-600 dark:text-neutral-400 mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <i className="fas fa-star text-yellow-500" aria-hidden="true" />
                              {node.stargazers.totalCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="fas fa-code-branch" aria-hidden="true" />
                              {node.forkCount}
                            </span>
                          </div>
                          <span className="text-xs">
                            {Math.round(node.diskUsage / 1024)} MB
                          </span>
                        </div>
                      </motion.a>
                    );
                  })}
                </motion.div>

                {/* View More Button */}
                <motion.div
                  className="text-center mt-12"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                >
                  <motion.a
                    href={socialMediaLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-github text-lg" aria-hidden="true" />
                    {t('buttons.moreProjects')}
                  </motion.a>
                </motion.div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
