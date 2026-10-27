import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import english from './en.json';

export type Language = 'zh' | 'en';
const storageKey = 'gbamun-language';
const translations: Record<string, string> = english;

export function translate(text: string, language: Language): string {
  return language === 'en' ? translations[text] ?? text : text;
}

export function localizeContent<T>(value: T, language: Language): T {
  if (typeof value === 'string') return translate(value, language) as T;
  if (Array.isArray(value)) return value.map((item) => localizeContent(item, language)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeContent(item, language)])) as T;
  }
  return value;
}

function initialLanguage(): Language {
  try {
    return window.localStorage.getItem(storageKey) === 'en' ? 'en' : 'zh';
  } catch {
    return 'zh';
  }
}

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const toggleLanguage = useCallback(() => setLanguage((current) => current === 'zh' ? 'en' : 'zh'), []);
  const t = useCallback((text: string) => translate(text, language), [language]);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh' ? 'GBAMUN—湾区模联' : 'GBAMUN — Greater Bay Area Model United Nations';
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', language === 'zh'
      ? 'GBAMUN湾区模联提供联合国青年发展项目、AFS青年大会、SDGs研学等国际交流项目，培养具备全球视野的未来领袖。专注研学教育，连接世界舞台。'
      : 'Explore GBAMUN’s UN Youth Development Program, AFS Youth Assembly and SDGs field research journeys. Developing future leaders with a global outlook.');
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // Language switching remains available when browser storage is disabled.
    }
  }, [language]);

  const value = useMemo(() => ({ language, toggleLanguage, t }), [language, toggleLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

export function useLocalizedContent<T>(content: T): T {
  const { language } = useLanguage();
  return useMemo(() => localizeContent(content, language), [content, language]);
}
