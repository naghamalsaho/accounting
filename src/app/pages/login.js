'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { locale, toggleLanguage, t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* القسم الأيسر/الأيمن حسب الاتجاه: الصورة والنصوص الترحيبية */}
      <div className="relative hidden w-1/2 flex-col justify-between p-12 lg:flex overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/acc.jpg"
            alt="Accounting Services"
            fill
            className="object-cover brightness-90 contrast-105 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/50 via-orange-900/20 to-transparent mix-blend-color" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* الشعار */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 font-bold text-white shadow-lg shadow-orange-500/30">
            BE
          </div>
          <div className="text-white drop-shadow-md">
            <h2 className="text-lg font-bold leading-none tracking-wide">ACCOUNTING</h2>
            <p className="text-xs font-semibold text-orange-400 mt-0.5">SERVICES</p>
          </div>
        </div>

        {/* النص الترحيبي */}
        <div className="relative z-10 my-auto max-w-lg">
          <span className="inline-block rounded-full bg-orange-500/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-300 border border-orange-400/40 backdrop-blur-sm">
            {t('portal')}
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight text-white drop-shadow-md">
            {t('heroTitle')}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-100 drop-shadow">
            {t('heroDesc')}
          </p>
        </div>

        {/* شارة الأمان */}
        <div className="relative z-10 flex items-center gap-2.5 rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white backdrop-blur-md w-fit border border-white/15 shadow-md">
          <svg className="h-4 w-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>{t('securityBadge')}</span>
        </div>
      </div>

      {/* نموذج تسجيل الدخول */}
      <div className="flex w-full flex-col justify-between p-6 lg:w-1/2 lg:p-12 bg-white">
        <div className="flex justify-between items-center text-xs font-medium text-gray-500">
          <div>
            {t('noAccount')}{' '}
            <Link
              to="/register"
              className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              {t('signUp')}
            </Link>
          </div>
          {/* أيقونة تبديل اللغة */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 hover:text-orange-500 transition-colors cursor-pointer"
          >
            🌐 {locale === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        <div className="mx-auto w-full max-w-md py-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">{t('welcomeBack')}</span>
          <h2 className="mt-1 text-3xl font-extrabold text-gray-900">{t('signIn')}</h2>
          <p className="mt-2 text-sm text-gray-500">
            {t('signInDesc')}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700">{t('emailLabel')}</label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 ps-10 pe-4 text-sm text-gray-900 outline-none transition-all focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">{t('passwordLabel')}</label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 ps-10 pe-10 text-sm text-gray-900 outline-none transition-all focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.97 8.97 0 012.122-.363c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/35 active:scale-[0.99]"
            >
              <span>{t('loginButton')}</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400">
          {t('trouble')}
        </p>
      </div>
    </div>
  );
}