import React from 'react';
import { greeting } from '../portfolio';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="section-dark py-12 text-center border-t border-neutral-200 dark:border-neutral-800">
            <div className="container mx-auto px-4">
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {t('footer.madeWith')} <span className="text-accent-600 dark:text-accent-400">❤️</span> {t('footer.by')} {greeting.username}
                </p>
                <p className="text-neutral-500 dark:text-neutral-500 text-xs mt-2">
                    © {new Date().getFullYear()} {greeting.username}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
