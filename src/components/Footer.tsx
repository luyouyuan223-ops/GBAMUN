import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { motion } from 'framer-motion';

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative text-white overflow-hidden bg-[#0e7cc5]">
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-white/90 text-sm leading-relaxed max-w-md mx-auto mb-8">{t('为下一代青年领袖启蒙国际视野和领导力，致力于为全球青少年提供卓越的研学教育体验。')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/70 text-xs tracking-wide">
            © 2024 GBAEDU. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
