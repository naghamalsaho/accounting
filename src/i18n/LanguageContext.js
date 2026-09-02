'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { ar } from '../i18n/ar';
import { en } from '../i18n/en';

const LanguageContext = createContext();
const translations = { ar, en };

export function LanguageProvider({ children }) {
  // قراءة اللغة من localStorage مباشرة عند التحميل الأولي لتجنب استخدام setState داخل الـ useEffect
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'ar';
    }
    return 'ar';
  });

  // useEffect هنا مخصص فقط لتحديث خصائص المتصفح (الـ DOM) عند تغير اللغة بدون أي setState
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const toggleLanguage = () => {
    const newLang = locale === 'ar' ? 'en' : 'ar';
    setLocale(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key) => translations[locale]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};