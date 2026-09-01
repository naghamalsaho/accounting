'use client';

import dynamic from 'next/dynamic';

// استيراد الراوتر مع تعطيل الـ SSR تماماً ليعمل في المتصفح فقط
const AppRouter = dynamic(() => import('./router'), { ssr: false });

export default function Home() {
  return <AppRouter />;
}