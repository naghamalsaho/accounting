import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../app/pages/Home'; // استيراد صفحة الهبوط الرئيسية
import Login from '../app/pages/login';
import Register from '../app/pages/register';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* تعيين الواجهة الرئيسية الجديدة كصفحة رئيسية */}
        <Route path="/" element={<Home />} />
        
        {/* مسارات تسجيل الدخول والتسجيل */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* إعادة التوجيه للصفحة الرئيسية في حال كتابة مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}