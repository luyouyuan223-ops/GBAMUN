import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

function LanguageSwitch({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { language, toggleLanguage } = useLanguage();
  const label = language === 'zh' ? 'Switch to English' : '切换为中文';

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
      className={`inline-flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e7cc5] focus-visible:ring-offset-2 ${
        variant === 'dark'
          ? 'border-white/40 bg-stone-900/30 text-white backdrop-blur-md hover:bg-stone-900/50'
          : 'border-stone-200 bg-white text-stone-700 hover:border-[#0e7cc5] hover:text-[#0e7cc5]'
      }`}
    >
      <Globe aria-hidden="true" className="h-4 w-4" />
      <span lang={language === 'zh' ? 'en' : 'zh-CN'}>{language === 'zh' ? 'English' : '中文'}</span>
    </button>
  );
}

export default LanguageSwitch;
