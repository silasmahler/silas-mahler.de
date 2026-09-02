import React from 'react';
import { socialMediaLinks } from '../portfolio';
import { FaGithub, FaLinkedin, FaGoogle, FaGitlab, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function SocialMedia() {
    if (!socialMediaLinks.display) return null;

    const iconClass = "icon-button bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white";

    return (
        <div className="flex space-x-4 mt-5">
            {socialMediaLinks.github && (
                <a href={socialMediaLinks.github} className={iconClass} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                </a>
            )}
            {socialMediaLinks.linkedin && (
                <a href={socialMediaLinks.linkedin} className={iconClass} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
            )}
            {socialMediaLinks.gmail && (
                <a href={`mailto:${socialMediaLinks.gmail}`} className={iconClass} target="_blank" rel="noopener noreferrer" aria-label="Email">
                    <FaGoogle />
                </a>
            )}
            {socialMediaLinks.gitlab && (
                <a href={socialMediaLinks.gitlab} className={iconClass} target="_blank" rel="noopener noreferrer" aria-label="GitLab">
                    <FaGitlab />
                </a>
            )}
            {socialMediaLinks.facebook && (
                <a href={socialMediaLinks.facebook} className={iconClass} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebook />
                </a>
            )}
            {socialMediaLinks.twitter && (
                <a href={socialMediaLinks.twitter} className={iconClass} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter />
                </a>
            )}
            {socialMediaLinks.instagram && (
                <a href={socialMediaLinks.instagram} className={iconClass} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram />
                </a>
            )}
        </div>
    );
}

export default SocialMedia;
