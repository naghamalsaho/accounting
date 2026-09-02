'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider } from '../i18n/LanguageContext'; // قم بتعديل المسار بناءً على مكان ملف الـ Context لديك

const AppRouter = dynamic(() => import('./router'), { ssr: false });

export default function Home() {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
}