import LanguageSwitch from './LanguageSwitch';
import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function Hero() {
  const { t } = useLanguage();
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776668434161-%E6%88%90%E5%91%98%E7%85%A7.JPG?auth_key=7a8b92c23911c4171938bd818fdde9fdff81236330596118fe7734307475f85b')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

      {/* Navigation Bar with Logo */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://conversation.cdn.meoo.host/conversations/303390263236231168/image/2026-04-20/1776667742692-%E5%9B%BE%E7%89%879.png?auth_key=5eb11dc1dc5383e6d58f3b7fa87c7e54a16b4f92b8291c56d652fdb91c34cc92"
              alt="GBAMUN Logo"
              className="h-28 sm:h-48 max-w-[60vw] w-auto object-contain"
            />
          </div>
          <LanguageSwitch variant="dark" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-24 pt-20 flex-1 flex items-end">
        <div className="grid lg:grid-cols-2 gap-12 items-end w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] mb-6">
              GBAMUN
              <br />
              <span className="text-stone-200">{t('探索无限')}</span>
            </h1>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:text-right"
          >
            <p className="text-lg text-stone-200/90 max-w-md lg:ml-auto mb-8 leading-relaxed">{t('为下一代青年领袖启蒙国际视野和领导力 融合全球顶尖教育资源，培养具有世界竞争力的未来领袖')}</p>
            <div className="flex items-center gap-4 lg:justify-end">
              <button 
                onClick={scrollToProjects}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-stone-900 font-medium rounded-full hover:bg-stone-100 transition-all duration-300"
              >{t('探索项目')}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
