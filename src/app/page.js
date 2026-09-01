'use client';

import { useEffect } from 'react';
import AppRouter from './router';

export default function Home() {
  useEffect(() => {
    // التحقق من أن الكود يعمل في المتصفح
    if (typeof window !== 'undefined') {
      // يمكنك استخدام document هنا بأمان[cite: 13]
      console.log(document.title);
    }
  }, []);

  return <AppRouter />;
}